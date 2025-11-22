/**
 * Drone Realtime Service
 * Handles real-time updates for drone GPS, battery, speed, and status
 */

import axios from 'axios';
import { getDroneList, type Drone } from './droneManager';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export interface DroneRealtimeData extends Drone {
  // GPS coordinates
  position?: {
    lat: number;
    lng: number;
  };
  // Speed in km/h
  speed?: number;
  // Connection status
  connectionStatus?: 'online' | 'lost_signal' | 'disconnected';
  // Current order ID if assigned
  orderId?: string;
  // Estimated time of arrival (minutes)
  eta?: number;
  // Last update timestamp
  lastUpdate?: string;
}

export interface DroneUpdate {
  droneId: string;
  data: Partial<DroneRealtimeData>;
  timestamp: string;
}

// Cache for real-time data
let cachedDrones: DroneRealtimeData[] = [];
let lastFetchTime: number = 0;
const CACHE_DURATION = 2000; // 2 seconds cache

// Subscribers for real-time updates
let subscribers: Set<(drones: DroneRealtimeData[]) => void> = new Set();

// Polling interval
let pollingInterval: NodeJS.Timeout | null = null;

/**
 * Fetch real-time drone data from API
 */
export const fetchRealtimeDroneData = async (): Promise<DroneRealtimeData[]> => {
  try {
    // Check cache first
    const now = Date.now();
    if (cachedDrones.length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
      return cachedDrones;
    }

    // Fetch from API
    const response = await axios.get(`${API_BASE_URL}/drones`);
    const drones = Array.isArray(response.data) ? response.data : [];

    // Enhance with real-time data
    const enhancedDrones: DroneRealtimeData[] = drones.map((drone: any) => {
      // Get base drone data
      const baseDrone = {
        id: drone.id || drone.droneCode || '',
        code: drone.code || drone.droneCode || drone.id || 'UNKNOWN',
        battery: drone.battery !== undefined ? Math.max(0, Math.min(100, drone.battery)) : 100,
        status: drone.status || 'active',
        restaurantId: drone.restaurantId || drone.restaurant || '',
        orderId: drone.orderId || undefined,
        missionsCompleted: drone.missionsCompleted || 0,
        lastMaintenance: drone.lastMaintenance || new Date().toISOString(),
      };

      // Get position (GPS coordinates)
      const position = drone.position || (drone.lat && drone.lng ? {
        lat: drone.lat,
        lng: drone.lng
      } : undefined);

      // Calculate speed (convert from m/s to km/h if speedMps exists, or mock)
      let speed = drone.speed || 0;
      if (drone.speedMps && !speed) {
        // Convert m/s to km/h (multiply by 3.6)
        speed = drone.speedMps * 3.6;
      } else if (!speed && drone.status === 'delivering') {
        // Simulate speed based on delivery progress
        speed = 15 + Math.random() * 10; // 15-25 km/h
      } else if (!speed && (drone.status === 'active' || drone.status === 'arrived')) {
        speed = 0; // Idle
      }

      // Determine connection status
      let connectionStatus: 'online' | 'lost_signal' | 'disconnected' = 'online';
      if (drone.connectionStatus) {
        connectionStatus = drone.connectionStatus as 'online' | 'lost_signal' | 'disconnected';
      } else {
        // Simulate connection based on last update
        const lastUpdate = drone.updatedAt ? new Date(drone.updatedAt).getTime() : Date.now();
        const timeSinceUpdate = Date.now() - lastUpdate;
        if (timeSinceUpdate > 60000) { // > 1 minute
          connectionStatus = 'lost_signal';
        } else if (timeSinceUpdate > 30000) { // > 30 seconds
          connectionStatus = 'lost_signal';
        } else {
          connectionStatus = 'online';
        }
      }

      // Calculate ETA if delivering
      let eta: number | undefined = undefined;
      if (drone.status === 'delivering' && drone.orderId) {
        // Mock ETA calculation (in minutes)
        eta = Math.floor(5 + Math.random() * 15); // 5-20 minutes
      }

      return {
        ...baseDrone,
        position,
        speed: Math.round(speed * 10) / 10, // Round to 1 decimal
        connectionStatus,
        eta,
        lastUpdate: drone.updatedAt || new Date().toISOString(),
        healthScore: drone.healthScore,
      };
    });

    // Update cache
    cachedDrones = enhancedDrones;
    lastFetchTime = now;

    return enhancedDrones;
  } catch (error) {
    console.error('[droneRealtimeService] Error fetching real-time data:', error);
    // Return cached data if available
    return cachedDrones;
  }
};

/**
 * Subscribe to real-time drone updates
 */
export const subscribeToRealtimeUpdates = (
  callback: (drones: DroneRealtimeData[]) => void
): (() => void) => {
  subscribers.add(callback);

  // Immediately call with current data
  if (cachedDrones.length > 0) {
    callback(cachedDrones);
  }

  return () => {
    subscribers.delete(callback);
  };
};

/**
 * Notify all subscribers of updates
 */
const notifySubscribers = (drones: DroneRealtimeData[]) => {
  subscribers.forEach(callback => {
    try {
      callback(drones);
    } catch (error) {
      console.error('[droneRealtimeService] Error notifying subscriber:', error);
    }
  });
};

/**
 * Start real-time polling
 */
export const startRealtimePolling = (intervalMs: number = 3000): void => {
  if (pollingInterval) {
    console.warn('[droneRealtimeService] Polling already started');
    return;
  }

  console.log(`[droneRealtimeService] Starting real-time polling every ${intervalMs}ms`);

  // Initial fetch
  fetchRealtimeDroneData().then(notifySubscribers);

  // Set up polling
  pollingInterval = setInterval(async () => {
    try {
      const drones = await fetchRealtimeDroneData();
      notifySubscribers(drones);
    } catch (error) {
      console.error('[droneRealtimeService] Error in polling:', error);
    }
  }, intervalMs);
};

/**
 * Stop real-time polling
 */
export const stopRealtimePolling = (): void => {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
    console.log('[droneRealtimeService] Polling stopped');
  }
};

/**
 * Get cached drone data
 */
export const getCachedDroneData = (): DroneRealtimeData[] => {
  return cachedDrones;
};

/**
 * Get last update timestamp
 */
export const getLastUpdateTimestamp = (): string => {
  return lastFetchTime > 0 ? new Date(lastFetchTime).toISOString() : new Date().toISOString();
};

/**
 * Update drone position (for simulation)
 */
export const updateDronePosition = async (
  droneId: string,
  position: { lat: number; lng: number }
): Promise<boolean> => {
  try {
    // Update in API
    await axios.patch(`${API_BASE_URL}/drones/${droneId}`, {
      position,
      updatedAt: new Date().toISOString()
    });

    // Update cache
    cachedDrones = cachedDrones.map(drone =>
      drone.id === droneId
        ? { ...drone, position, lastUpdate: new Date().toISOString() }
        : drone
    );

    notifySubscribers(cachedDrones);
    return true;
  } catch (error) {
    console.error(`[droneRealtimeService] Error updating position for ${droneId}:`, error);
    return false;
  }
};

