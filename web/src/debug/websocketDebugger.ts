/**
 * Minimal WebSocket debugger for orderSyncService.
 * Monkey-patches WebSocket subscriptions to log events.
 * Writes to analysis/realtime_websocket.md via backend endpoint.
 * Does NOT modify existing WebSocket flows.
 */

// Debug log helper - sends logs to backend
const appendLog = async (event: string, data: any) => {
  try {
    const timestamp = new Date().toISOString();
    const logData = {
      event,
      data,
      timestamp,
    };
    
    // Try to send to backend debug endpoint
    try {
      await fetch('/api/debug/websocket-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logData),
      });
    } catch (e) {
      // Fallback to console if backend not available
      console.log(`[WS_DEBUG] ${event}`, data);
    }
  } catch (e) {
    // Silent fail
  }
};

// Monkey-patch orderSyncService by intercepting the module
let isPatched = false;

export const patchOrderSyncService = async () => {
  if (isPatched) return;
  
  // Wait a bit for orderSyncService to be fully loaded
  await new Promise(resolve => setTimeout(resolve, 200));
  
  try {
    const orderSyncModule = await import('../services/orderSyncService');
    const originalConnect = orderSyncModule.connectOrderSync;
    
    // Patch connectOrderSync to wrap callbacks
    (orderSyncModule as any).connectOrderSync = async (
      onOrderUpdate: (order: any) => void,
      optionalRestaurantId?: string | null
    ) => {
      // Log connection attempt
      await appendLog('WS_CONNECT_ATTEMPT', {
        restaurantId: optionalRestaurantId || null,
      });
      
      // Wrap callback to intercept order events
      const wrappedCallback = (order: any) => {
        // Log the order event with raw message body
        appendLog('WS_ORDER_EVENT', {
          rawMessage: order,
          messageBody: typeof order === 'string' ? order : JSON.stringify(order),
        });
        
        // Call original callback
        onOrderUpdate(order);
      };
      
      // Call original with wrapped callback
      const result = await originalConnect(wrappedCallback, optionalRestaurantId);
      
      if (result) {
        await appendLog('WS_CONNECTED', {
          restaurantId: optionalRestaurantId || null,
        });
        
        // Log subscription to global topic (always subscribed)
        await appendLog('WS_SUBSCRIBED', {
          topic: '/topic/orders',
        });
        
        // Log subscription to restaurant-specific topic if restaurantId provided
        if (optionalRestaurantId) {
          await appendLog('WS_SUBSCRIBED', {
            topic: `/topic/orders/${optionalRestaurantId}`,
          });
        }
      }
      
      return result;
    };
    
    isPatched = true;
  } catch (e) {
    console.warn('[WS_DEBUG] Failed to patch orderSyncService:', e);
  }
};

// Auto-patch on module load
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      patchOrderSyncService();
    });
  } else {
    patchOrderSyncService();
  }
}

export default patchOrderSyncService;
