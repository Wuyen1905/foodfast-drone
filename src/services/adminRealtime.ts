/**
 * Admin Realtime Service
 * Background polling service for real-time order status updates
 * Updates every 3-5 seconds without modifying UI
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export interface RealtimeStats {
  totalOrders: number;
  pending: number;
  inProgress: number;
  delivered: number;
  cancelled?: number;
}

export interface OrderUpdate {
  id: string;
  status: string;
  restaurantId?: string;
  updatedAt: string;
}

let pollingInterval: NodeJS.Timeout | null = null;
let subscribers: Set<(stats: RealtimeStats) => void> = new Set();
let subscribersOrderUpdates: Set<(updates: OrderUpdate[]) => void> = new Set();

/**
 * Fetch realtime order statistics from backend API
 * Uses dedicated /api/realtimeStats endpoint
 */
export const fetchRealtimeStats = async (): Promise<RealtimeStats> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/realtimeStats`);
    const stats = response.data;
    
    // Backend already returns RealtimeStats format
    return {
      totalOrders: stats.totalOrders || 0,
      pending: stats.pending || 0,
      inProgress: stats.inProgress || 0,
      delivered: stats.delivered || 0,
      cancelled: stats.cancelled || 0
    };
  } catch (error) {
    console.error('[adminRealtime] Error fetching stats:', error);
    // Return default stats on error
    return {
      totalOrders: 0,
      pending: 0,
      inProgress: 0,
      delivered: 0,
      cancelled: 0
    };
  }
};

/**
 * Fetch recent order updates
 */
export const fetchOrderUpdates = async (): Promise<OrderUpdate[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`);
    const orders = response.data;
    
    // Transform to OrderUpdate format
    return orders.map((order: any) => ({
      id: order.id,
      status: order.status,
      restaurantId: order.restaurantId,
      updatedAt: order.updatedAt || new Date().toISOString()
    }));
  } catch (error) {
    console.error('[adminRealtime] Error fetching order updates:', error);
    return [];
  }
};

/**
 * Subscribe to realtime stats updates
 * @param callback Function to call when stats update
 * @returns Unsubscribe function
 */
export const subscribeToStats = (callback: (stats: RealtimeStats) => void): (() => void) => {
  subscribers.add(callback);
  
  // Return unsubscribe function
  return () => {
    subscribers.delete(callback);
  };
};

/**
 * Subscribe to order updates
 * @param callback Function to call when orders update
 * @returns Unsubscribe function
 */
export const subscribeToOrderUpdates = (callback: (updates: OrderUpdate[]) => void): (() => void) => {
  subscribersOrderUpdates.add(callback);
  
  // Return unsubscribe function
  return () => {
    subscribersOrderUpdates.delete(callback);
  };
};

/**
 * Notify all subscribers of new stats
 */
const notifyStatsSubscribers = (stats: RealtimeStats) => {
  subscribers.forEach(callback => {
    try {
      callback(stats);
    } catch (error) {
      console.error('[adminRealtime] Error notifying subscriber:', error);
    }
  });
};

/**
 * Notify all subscribers of new order updates
 */
const notifyOrderUpdateSubscribers = (updates: OrderUpdate[]) => {
  subscribersOrderUpdates.forEach(callback => {
    try {
      callback(updates);
    } catch (error) {
      console.error('[adminRealtime] Error notifying order subscriber:', error);
    }
  });
};

/**
 * Start realtime polling
 * @param intervalMs Polling interval in milliseconds (default: 4000 = 4 seconds)
 */
export const startRealtimePolling = (intervalMs: number = 4000): void => {
  if (pollingInterval) {
    console.warn('[adminRealtime] Polling already started');
    return;
  }

  console.log(`[adminRealtime] Starting polling every ${intervalMs}ms`);

  // Initial fetch
  fetchRealtimeStats().then(stats => {
    updateCachedStats(stats);
    lastUpdateTimestamp = new Date().toISOString();
    notifyStatsSubscribers(stats);
  });

  fetchOrderUpdates().then(updates => {
    notifyOrderUpdateSubscribers(updates);
  });

  // Set up interval
  pollingInterval = setInterval(async () => {
    try {
      const [stats, updates] = await Promise.all([
        fetchRealtimeStats(),
        fetchOrderUpdates()
      ]);

      updateCachedStats(stats);
      lastUpdateTimestamp = new Date().toISOString();
      notifyStatsSubscribers(stats);
      notifyOrderUpdateSubscribers(updates);
    } catch (error) {
      console.error('[adminRealtime] Error in polling loop:', error);
    }
  }, intervalMs);
};

/**
 * Stop realtime polling
 */
export const stopRealtimePolling = (): void => {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
    console.log('[adminRealtime] Polling stopped');
  }
};

/**
 * Get current stats synchronously (cached)
 */
let cachedStats: RealtimeStats | null = null;
let lastFetchTime: number = 0;
let lastUpdateTimestamp: string = new Date().toISOString();
const CACHE_DURATION = 1000; // 1 second cache

export const getCachedStats = (): RealtimeStats | null => {
  const now = Date.now();
  if (cachedStats && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedStats;
  }
  return null;
};

/**
 * Update cached stats
 */
export const updateCachedStats = (stats: RealtimeStats): void => {
  cachedStats = stats;
  lastFetchTime = Date.now();
  lastUpdateTimestamp = new Date().toISOString();
};

/**
 * Get last update timestamp for RealtimeBadge
 */
export const getLastUpdateTimestamp = (): string => {
  return lastUpdateTimestamp;
};

