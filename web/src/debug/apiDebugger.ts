/**
 * Minimal API debugger for /api/orders GET requests.
 * Wraps fetch/axios calls to log request/response.
 * Writes to analysis/realtime_order_api.md via backend endpoint.
 * Does NOT modify UI or behavior.
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
      await fetch('/api/debug/api-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logData),
      });
    } catch (e) {
      // Fallback to console if backend not available
      console.log(`[API_DEBUG] ${event}`, data);
    }
  } catch (e) {
    // Silent fail
  }
};

// Monkey-patch fetch for /api/orders GET requests
let isPatched = false;

export const patchApiCalls = () => {
  if (isPatched) return;
  
  const originalFetch = window.fetch;
  
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    
    // Only intercept GET requests to /api/orders
    if (url.includes('/api/orders') && (!init || !init.method || init.method.toUpperCase() === 'GET')) {
      const urlObj = new URL(url, window.location.origin);
      const params: Record<string, string> = {};
      urlObj.searchParams.forEach((value, key) => {
        params[key] = value;
      });
      
      // Log request
      await appendLog('API_GET_ORDERS_REQUEST', {
        url: url,
        queryParams: params,
        restaurantId: params.restaurantId || params.restaurant || null,
      });
      
      // Call original fetch
      const response = await originalFetch(input, init);
      
      // Clone response to read body without consuming it
      const clonedResponse = response.clone();
      
      try {
        const data = await clonedResponse.json();
        const resultsLength = Array.isArray(data) ? data.length : (data ? 1 : 0);
        
        // Log response
        await appendLog('API_GET_ORDERS_RESPONSE', {
          url: url,
          queryParams: params,
          resultsLength: resultsLength,
          restaurantId: params.restaurantId || params.restaurant || null,
        });
      } catch (e) {
        // Response might not be JSON, ignore
      }
      
      return response;
    }
    
    // For all other requests, call original fetch
    return originalFetch(input, init);
  };
  
  // Also patch axios instance from config
  // Use setTimeout to ensure axios config is loaded
  setTimeout(() => {
    import('../config/axios').then((axiosModule) => {
      const api = axiosModule.api;
      const originalGet = api.get;
      
      api.get = async (url: string, config?: any) => {
        // Normalize URL - might be relative or absolute
        const fullUrl = url.startsWith('http') ? url : (api.defaults.baseURL || '') + url;
        
        if (fullUrl.includes('/api/orders') || fullUrl.includes('/orders')) {
          const params = config?.params || {};
          
          appendLog('API_GET_ORDERS_REQUEST', {
            url: fullUrl,
            queryParams: params,
            restaurantId: params.restaurantId || params.restaurant || null,
          });
          
          const response = await originalGet(url, config);
          
          const data = response.data;
          const resultsLength = Array.isArray(data) ? data.length : (data ? 1 : 0);
          
          appendLog('API_GET_ORDERS_RESPONSE', {
            url: fullUrl,
            queryParams: params,
            resultsLength: resultsLength,
            restaurantId: params.restaurantId || params.restaurant || null,
          });
          
          return response;
        }
        
        return originalGet(url, config);
      };
    }).catch(() => {
      // Silent fail if axios module not available
    });
  }, 500);
  
  isPatched = true;
};

// Auto-patch on module load
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', patchApiCalls);
  } else {
    patchApiCalls();
  }
}

export default patchApiCalls;

