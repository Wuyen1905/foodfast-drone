import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

// Use environment variable or fallback to proxy URL (via Vite proxy) or current origin
// In dev mode, Vite proxy forwards /ws to http://localhost:5000/ws
// In production, use the same origin as the frontend
const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL || 
                    (import.meta.env.DEV ? '' : window.location.origin);
const WS_ENDPOINT = `${WS_BASE_URL}/ws`;

let stompClient: any = null;
let connected = false;
let reconnectAttempts = 0;
let maxReconnectAttempts = 10;
let reconnectInterval: NodeJS.Timeout | null = null;
let subscriptionCallbacks: Set<(order: any) => void> = new Set();
let isConnecting = false;
let healthCheckInterval: NodeJS.Timeout | null = null;

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

// Auto-reconnect logic
const reconnect = () => {
  if (isConnecting || connected) {
    return;
  }
  
  if (reconnectAttempts >= maxReconnectAttempts) {
    console.error('[WebSocket] Max reconnection attempts reached');
    return;
  }
  
  reconnectAttempts++;
  const delay = Math.min(1000 * Math.pow(2, reconnectAttempts - 1), 30000); // Exponential backoff, max 30s
  
  console.log(`[WebSocket] Attempting to reconnect (${reconnectAttempts}/${maxReconnectAttempts}) in ${delay}ms...`);
  
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
          
          console.log('[WebSocket] ✅ Connected to', WS_ENDPOINT);
          
          // Subscribe to order updates topic
          if (stompClient.connected) {
            const subscription = stompClient.subscribe("/topic/orders", (message: any) => {
              if (message.body) {
                try {
                  const orderUpdate = JSON.parse(message.body);
                  console.log('[WebSocket] 📦 Received order update:', orderUpdate.id, orderUpdate.status);
                  
                  // Notify all registered callbacks
                  subscriptionCallbacks.forEach((callback) => {
                    try {
                      callback(orderUpdate);
                    } catch (error) {
                      console.error('[WebSocket] Error in subscription callback:', error);
                    }
                  });
                } catch (error) {
                  console.error('[WebSocket] Error parsing order update:', error);
                }
              }
            });
            
            console.log('[WebSocket] ✅ Subscribed to /topic/orders');
          }
          
          resolve(true);
        },
        (error: any) => {
          // Connection error - handle gracefully
          // Suppress ECONNRESET and ECONNREFUSED errors as they're expected when backend is not ready
          const isConnectionError = error && (
            error.toString().includes('ECONNRESET') ||
            error.toString().includes('ECONNREFUSED') ||
            error.code === 'ECONNRESET' ||
            error.code === 'ECONNREFUSED'
          );
          
          if (isConnectionError) {
            console.log('[WebSocket] Connection error (backend may be starting), will retry...');
          } else {
            console.error('[WebSocket] ❌ Connection error:', error);
          }
          
          connected = false;
          isConnecting = false;
          
          // Clear any existing reconnect interval
          if (reconnectInterval) {
            clearTimeout(reconnectInterval);
            reconnectInterval = null;
          }
          
          // Attempt to reconnect with exponential backoff
          reconnect();
          resolve(false);
        }
      );
      
      // Handle WebSocket errors
      stompClient.onStompError = (frame: any) => {
        // Suppress STOMP errors that occur during connection when backend is not ready
        const errorMessage = frame?.headers?.['message'] || frame?.body || '';
        const isConnectionError = errorMessage.includes('ECONNRESET') || 
                                  errorMessage.includes('ECONNREFUSED') ||
                                  errorMessage.includes('Connection refused');
        
        if (isConnectionError) {
          console.log('[WebSocket] STOMP connection error (backend may be starting), will retry...');
        } else {
          console.error('[WebSocket] STOMP error:', frame);
        }
        
        connected = false;
        isConnecting = false;
        
        // Attempt to reconnect
        if (!reconnectInterval) {
          reconnect();
        }
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
          reconnect();
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

export const connectOrderSync = (onOrderUpdate: (order: any) => void): Promise<boolean> => {
  // Register callback
  subscriptionCallbacks.add(onOrderUpdate);
  
  // If already connected, resolve immediately
  if (connected) {
    console.log('[WebSocket] Already connected, callback registered');
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
