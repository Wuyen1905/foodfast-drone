/**
 * Admin Service Integration
 * Helper functions to integrate new services with existing AdminDashboard
 * These functions enhance existing services without modifying UI
 */

import { fetchRealtimeStats, subscribeToStats, startRealtimePolling, stopRealtimePolling } from './adminRealtime';
import { getDroneList, startHealthMonitoring, stopHealthMonitoring } from './droneManager';
import { startScenarioProcessing, stopScenarioProcessing } from './scenarioService';
import { getAdminStats } from './adminService';

/**
 * Initialize all admin background services
 * Call this when AdminDashboard mounts to start realtime updates
 */
export const initializeAdminServices = (): (() => void) => {
  console.log('[adminServiceIntegration] Initializing admin background services');
  
  // Start realtime polling (every 4 seconds)
  startRealtimePolling(4000);
  
  // Start health monitoring (every 5 seconds)
  startHealthMonitoring(5000);
  
  // Start scenario processing (every 10 seconds)
  startScenarioProcessing(10000);
  
  // Return cleanup function
  return () => {
    console.log('[adminServiceIntegration] Cleaning up admin services');
    stopRealtimePolling();
    stopHealthMonitoring();
    stopScenarioProcessing();
  };
};

/**
 * Get enhanced admin stats with realtime data
 * Integrates realtime stats with existing admin stats
 */
export const getEnhancedAdminStats = async () => {
  try {
    // Fetch both admin stats and realtime stats in parallel
    const [adminStats, realtimeStats] = await Promise.all([
      getAdminStats(),
      fetchRealtimeStats().catch(() => null)
    ]);
    
    // Merge realtime stats into admin stats if available
    if (realtimeStats) {
      return {
        ...adminStats,
        totalOrders: realtimeStats.totalOrders || adminStats.totalOrders,
        // Add realtime order breakdown
        pendingOrders: realtimeStats.pending || 0,
        inProgressOrders: realtimeStats.inProgress || 0,
        deliveredOrders: realtimeStats.delivered || 0,
        cancelledOrders: realtimeStats.cancelled || 0
      };
    }
    
    return adminStats;
  } catch (error) {
    console.error('[adminServiceIntegration] Error getting enhanced stats:', error);
    // Fallback to regular admin stats
    return getAdminStats();
  }
};

/**
 * Subscribe to realtime stats updates
 * Returns unsubscribe function
 */
export const subscribeToRealtimeStats = (callback: (stats: any) => void): (() => void) => {
  return subscribeToStats((realtimeStats) => {
    // Transform realtime stats to match admin stats format
    const enhancedStats = {
      totalOrders: realtimeStats.totalOrders,
      pendingOrders: realtimeStats.pending,
      inProgressOrders: realtimeStats.inProgress,
      deliveredOrders: realtimeStats.delivered,
      cancelledOrders: realtimeStats.cancelled || 0
    };
    
    callback(enhancedStats);
  });
};

/**
 * Get enhanced drone fleet with health scores
 * Integrates droneManager with existing getDroneFleet
 */
export const getEnhancedDroneFleet = async () => {
  try {
    // Use droneManager for enhanced data
    const drones = await getDroneList();
    
    // Transform to DroneFleet format for backward compatibility
    return drones.map(drone => ({
      id: drone.id,
      status: drone.status === 'delivering' ? 'active' : 
              drone.status === 'returning' || drone.status === 'maintenance' ? 'maintenance' : 
              drone.status === 'offline' ? 'offline' : 'active',
      battery: drone.battery,
      location: drone.position ? `${drone.position.lat}, ${drone.position.lng}` : 'Unknown',
      restaurantId: drone.restaurantId || drone.restaurant || '',
      lastUpdate: drone.updatedAt || new Date().toISOString(),
      // Additional enhanced fields
      code: drone.code,
      healthScore: drone.healthScore,
      missionsCompleted: drone.missionsCompleted,
      lastMaintenance: drone.lastMaintenance
    }));
  } catch (error) {
    console.error('[adminServiceIntegration] Error getting enhanced drone fleet:', error);
    // Fallback to regular getDroneFleet
    const { getDroneFleet } = await import('./adminService');
    return getDroneFleet();
  }
};

