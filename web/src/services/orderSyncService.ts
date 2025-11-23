import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { normalizeToRestaurantId } from '@/utils/restaurantUtils';

// Use environment variable - required for production
const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;
if (!WS_BASE_URL && !import.meta.env.DEV) {
  console.error('[WebSocket] VITE_WS_BASE_URL environment variable is required for production');
}
const WS_ENDPOINT = WS_BASE_URL ? `${WS_BASE_URL}/ws` : 'http://localhost:8080/ws';

let stompClient: any = null;
let connected = false;
let reconnectAttempts = 0;
let maxReconnectAttempts = 10;
let reconnectInterval: NodeJS.Timeout | null = null;
let subscriptionCallbacks: Set<(order: any) => void> = new Set();
let isConnecting = false;
let healthCheckInterval: NodeJS.Timeout | null = null;
let restaurantId: string | null = null; // Track restaurantId for restaurant-specific subscriptions

// Health check function to verify backend is ready before connecting
const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const healthUrl = import.meta.env.DEV 
      ? '/api/health' 
      : `${window.location.origin}/api/health`;
    
    // Create an AbortController for timeout (compatible with older browsers)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const response = await fetch(healthUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    // Suppress health check errors - backend might not be ready yet
    return false;
  }
};

// Wait for backend to be ready before attempting WebSocket connection
const waitForBackend = async (maxWaitTime = 30000, checkInterval = 2000): Promise<boolean> => {
  const startTime = Date.now();
  
  while (Date.now() - startTime < maxWaitTime) {
    const isReady = await checkBackendHealth();
    if (isReady) {
      return true;
    }
    // Wait before next check
    await new Promise(resolve => setTimeout(resolve, checkInterval));
  }
  
  return false;
};

// Auto-reconnect logic with 3s delay
const reconnect = () => {
  if (isConnecting || connected) {
    return;
  }
  
  if (reconnectAttempts >= maxReconnectAttempts) {
    console.error('[WebSocket] Max reconnection attempts reached');
    return;
  }
  
  reconnectAttempts++;
  const delay = 3000; // Fixed 3s delay as per patch
  
  console.warn(`[Realtime] Disconnected — retrying in ${delay}ms...`);
  
  reconnectInterval = setTimeout(() => {
    if (!connected && !isConnecting) {
      connectInternal();
    }
  }, delay);
};

const connectInternal = (): Promise<boolean> => {
  return new Promise(async (resolve) => {
    if (connected || isConnecting) {
      resolve(connected);
      return;
    }
    
    isConnecting = true;
    
    // Wait for backend to be ready before attempting connection
    // This prevents ECONNRESET errors when backend is starting up
    const backendReady = await waitForBackend(30000, 2000);
    if (!backendReady && reconnectAttempts === 0) {
      // Only log on first attempt, subsequent attempts will retry automatically
      console.log('[WebSocket] Backend not ready yet, will retry connection...');
    }
    
    try {
      const socket = new SockJS(WS_ENDPOINT);
      
      // Handle socket errors gracefully (ECONNRESET, ECONNREFUSED)
      socket.onerror = (error: any) => {
        // Suppress ECONNRESET and ECONNREFUSED errors - they're expected when backend is not ready
        if (error && (error.type === 'error' || error.code === 'ECONNRESET' || error.code === 'ECONNREFUSED')) {
          console.log('[WebSocket] Connection error (backend may be starting), will retry...');
        } else {
          console.error('[WebSocket] Socket error:', error);
        }
      };
      
      stompClient = Stomp.over(socket);
      stompClient.reconnect_delay = 3000; // Set reconnect delay to 3s
      stompClient.heartbeatIncoming = 10000;
      stompClient.heartbeatOutgoing = 10000;
      
      // Disable debug logs in production
      if (import.meta.env.DEV) {
        stompClient.debug = (str: string) => {
          console.log('[WebSocket Debug]', str);
        };
      } else {
        stompClient.debug = () => {};
      }
      
      // Connection headers
      const headers: any = {};
      
      stompClient.connect(headers, 
        () => {
          // Connection successful
          connected = true;
          isConnecting = false;
          reconnectAttempts = 0; // Reset reconnect attempts on successful connection
          
          console.log("[Realtime] Connected");
          
          // Subscribe to global order updates topic
          if (stompClient.connected) {
            stompClient.subscribe("/topic/orders", (msg: any) => {
              const order = JSON.parse(msg.body);
              subscriptionCallbacks.forEach((cb) => cb(order));
            });
            
            console.log('[WebSocket] ✅ Subscribed to /topic/orders');
            
            // Subscribe to restaurant-specific topic if restaurantId is provided
            if (restaurantId) {
              stompClient.subscribe(`/topic/orders/${restaurantId}`, (msg: any) => {
                const order = JSON.parse(msg.body);
                subscriptionCallbacks.forEach((cb) => cb(order));
              });
              
              console.log(`[WebSocket] ✅ Subscribed to /topic/orders/${restaurantId}`);
            }
          }
          
          resolve(true);
        },
        (error: any) => {
          console.warn("[Realtime] Disconnected — retrying...");
          connected = false;
          isConnecting = false;
          
          // Clear any existing reconnect interval
          if (reconnectInterval) {
            clearTimeout(reconnectInterval);
            reconnectInterval = null;
          }
          
          // Attempt to reconnect with 3s delay
          setTimeout(() => connectInternal(), 3000);
          resolve(false);
        }
      );
      
      // Handle WebSocket errors
      stompClient.onStompError = (frame: any) => {
        console.warn("[Realtime] Disconnected — retrying...");
        connected = false;
        isConnecting = false;
        
        // Clear any existing reconnect interval
        if (reconnectInterval) {
          clearTimeout(reconnectInterval);
          reconnectInterval = null;
        }
        
        // Attempt to reconnect with 3s delay
        setTimeout(() => connectInternal(), 3000);
      };
      
      // Handle WebSocket close
      socket.onclose = (event: CloseEvent) => {
        // Suppress close events that occur during connection when backend is not ready
        if (event.code === 1006 || event.code === 1000) {
          console.log('[WebSocket] Connection closed (backend may be starting), will retry...');
        } else {
          console.log('[WebSocket] Connection closed', event.code, event.reason);
        }
        
        connected = false;
        isConnecting = false;
        
        // Attempt to reconnect if not manually disconnected
        if (!reconnectInterval && subscriptionCallbacks.size > 0) {
          setTimeout(() => connectInternal(), 3000);
        }
      };
      
    } catch (error) {
      console.error('[WebSocket] ❌ Failed to create connection:', error);
      isConnecting = false;
      connected = false;
      
      // Attempt to reconnect
      reconnect();
      resolve(false);
    }
  });
};

// Helper function to set restaurantId for restaurant-specific subscriptions
export const setRestaurantId = (id: string | null) => {
  if (id) {
    // Normalize restaurantId to ensure correct WebSocket topic subscription
    restaurantId = normalizeToRestaurantId(id);
  } else {
    restaurantId = null;
  }
};

export const connectOrderSync = (onOrderUpdate: (order: any) => void, optionalRestaurantId?: string | null): Promise<boolean> => {
  // Register callback
  subscriptionCallbacks.add(onOrderUpdate);
  
  // Update restaurantId if provided (normalize for correct WebSocket topic subscription)
  if (optionalRestaurantId) {
    restaurantId = normalizeToRestaurantId(optionalRestaurantId);
  }
  
  // If already connected, resolve immediately and subscribe to restaurant topic if needed
  if (connected) {
    console.log('[WebSocket] Already connected, callback registered');
    // Subscribe to restaurant-specific topic if restaurantId is provided
    if (restaurantId && stompClient && stompClient.connected) {
      try {
        stompClient.subscribe(`/topic/orders/${restaurantId}`, (msg: any) => {
          const order = JSON.parse(msg.body);
          subscriptionCallbacks.forEach((cb) => cb(order));
        });
        console.log(`[WebSocket] ✅ Subscribed to /topic/orders/${restaurantId}`);
      } catch (e) {
        // Already subscribed or error - ignore
        console.log(`[WebSocket] Note: Restaurant topic subscription skipped (may already be subscribed)`);
      }
    }
    return Promise.resolve(true);
  }
  
  // Clear any existing reconnect interval
  if (reconnectInterval) {
    clearTimeout(reconnectInterval);
    reconnectInterval = null;
  }
  
  // Connect if not already connecting
  if (!isConnecting) {
    return connectInternal();
  }
  
  return Promise.resolve(false);
};

export const disconnectOrderSync = () => {
  // Clear all callbacks
  subscriptionCallbacks.clear();
  
  // Clear reconnect interval
  if (reconnectInterval) {
    clearTimeout(reconnectInterval);
    reconnectInterval = null;
  }
  
  // Disconnect WebSocket
  if (stompClient && connected) {
    try {
      stompClient.disconnect();
      console.log('[WebSocket] Disconnected');
    } catch (error) {
      console.error('[WebSocket] Error during disconnect:', error);
    }
  }
  
  connected = false;
  isConnecting = false;
  reconnectAttempts = 0;
};

export const isOrderSyncConnected = () => connected;

export const sendOrderUpdate = (order: any) => {
  if (stompClient && connected) {
    try {
      stompClient.send("/app/order-update", {}, JSON.stringify(order));
      console.log('[WebSocket] 📤 Sent order update:', order.id);
    } catch (error) {
      console.error('[WebSocket] Error sending order update:', error);
    }
  } else {
    console.warn('[WebSocket] Cannot send order update: not connected');
  }
};

// Backward compatibility aliases for existing code
export const connectOrderSocket = connectOrderSync;
export const disconnectOrderSocket = disconnectOrderSync;

// Create a realtimeSocket-like object for compatibility with patch pattern
export const realtimeSocket = {
  onOrderUpdate: (callback: (order: any) => void): (() => void) => {
    subscriptionCallbacks.add(callback);
    connectOrderSync(callback); // Ensure connection
    
    // Return unsubscribe function
    return () => {
      subscriptionCallbacks.delete(callback);
    };
  }
};
