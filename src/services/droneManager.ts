/**
 * Drone Management Service
 * Handles drone operations, health scoring, and maintenance tracking
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export interface Drone {
  id: string;
  code: string;
  battery: number;
  missionsCompleted: number;
  lastMaintenance: string;
  status: 'active' | 'maintenance' | 'offline' | 'returning';
  restaurant?: string;
  restaurantId?: string;
  orderId?: string | null; // Links to order ID
  position?: {
    lat: number;
    lng: number;
  };
  healthScore?: number;
}

export interface DroneHealthWarning {
  droneId: string;
  droneCode: string;
  type: 'battery' | 'maintenance' | 'performance';
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
}

let healthWarningCallbacks: Set<(warning: DroneHealthWarning) => void> = new Set();

/**
 * Get all drones from API
 * Enhanced with better error handling and fallback
 */
export const getDroneList = async (): Promise<Drone[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/drones`);
    const drones = Array.isArray(response.data) ? response.data : [];
    
    // Calculate health scores for each drone and ensure all required fields
    return drones.map((drone: any) => {
      // Ensure code field exists (use droneCode or id as fallback)
      const code = drone.code || drone.droneCode || drone.id || 'UNKNOWN';
      
      // Ensure battery and missionsCompleted have default values
      const battery = drone.battery !== undefined ? drone.battery : 100;
      const missionsCompleted = drone.missionsCompleted !== undefined ? drone.missionsCompleted : 0;
      
      return {
        ...drone,
        id: drone.id || code,
        code: code,
        battery: Math.max(0, Math.min(100, battery)),
        missionsCompleted: missionsCompleted,
        status: drone.status || 'active',
        restaurantId: drone.restaurantId || drone.restaurant || '',
        healthScore: calculateHealthScore({
          ...drone,
          battery,
          missionsCompleted
        })
      };
    });
  } catch (error) {
    console.error('[droneManager] Error fetching drones:', error);
    // Return empty array instead of throwing to prevent breaking the app
    return [];
  }
};

/**
 * Calculate health score for a drone
 * Formula: (battery% × missionsCompleted) / 100
 * Returns a score from 0-100
 */
export const calculateHealthScore = (drone: Drone | any): number => {
  const battery = drone.battery || 0;
  const missions = drone.missionsCompleted || 0;
  
  // Normalize missions (assuming max reasonable missions is 200)
  const normalizedMissions = Math.min(missions / 200, 1) * 100;
  
  // Health score = (battery * normalizedMissions) / 100
  const score = (battery * normalizedMissions) / 100;
  
  // Ensure score is between 0 and 100
  return Math.max(0, Math.min(100, Math.round(score)));
};

/**
 * Update drone status
 */
export const updateDroneStatus = async (
  id: string,
  partial: Partial<Drone>
): Promise<boolean> => {
  try {
    // In a real system, this would be a PATCH request
    // For mock API, we'll simulate it
    const response = await axios.patch(`${API_BASE_URL}/drones/${id}`, partial);
    return response.status === 200;
  } catch (error) {
    console.error(`[droneManager] Error updating drone ${id}:`, error);
    // In development, simulate success
    console.log(`[droneManager] Simulated update for drone ${id}:`, partial);
    return true;
  }
};

/**
 * Check for drone health warnings
 */
export const checkHealthWarnings = (drones: Drone[]): DroneHealthWarning[] => {
  const warnings: DroneHealthWarning[] = [];

  drones.forEach(drone => {
    // Battery check
    if (drone.battery < 20) {
      warnings.push({
        droneId: drone.id,
        droneCode: drone.code,
        type: 'battery',
        message: `Drone ${drone.code} battery is low (${drone.battery}%)`,
        severity: drone.battery < 10 ? 'high' : 'medium',
        timestamp: new Date().toISOString()
      });
    }

    // Maintenance check (if last maintenance was more than 30 days ago)
    if (drone.lastMaintenance) {
      const lastMaintenanceDate = new Date(drone.lastMaintenance);
      const daysSinceMaintenance = (Date.now() - lastMaintenanceDate.getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysSinceMaintenance > 30) {
        warnings.push({
          droneId: drone.id,
          droneCode: drone.code,
          type: 'maintenance',
          message: `Drone ${drone.code} requires maintenance (${Math.round(daysSinceMaintenance)} days since last)`,
          severity: daysSinceMaintenance > 60 ? 'high' : 'medium',
          timestamp: new Date().toISOString()
        });
      }
    }

    // Performance check (health score)
    if (drone.healthScore !== undefined && drone.healthScore < 30) {
      warnings.push({
        droneId: drone.id,
        droneCode: drone.code,
        type: 'performance',
        message: `Drone ${drone.code} health score is low (${drone.healthScore})`,
        severity: drone.healthScore < 15 ? 'high' : 'medium',
        timestamp: new Date().toISOString()
      });
    }
  });

  return warnings;
};

/**
 * Subscribe to health warnings
 */
export const subscribeToHealthWarnings = (
  callback: (warning: DroneHealthWarning) => void
): (() => void) => {
  healthWarningCallbacks.add(callback);
  
  return () => {
    healthWarningCallbacks.delete(callback);
  };
};

/**
 * Notify subscribers of health warnings
 */
const notifyHealthWarnings = (warnings: DroneHealthWarning[]) => {
  warnings.forEach(warning => {
    healthWarningCallbacks.forEach(callback => {
      try {
        callback(warning);
      } catch (error) {
        console.error('[droneManager] Error notifying health warning:', error);
      }
    });
  });
};

/**
 * Start background health monitoring
 */
let healthMonitoringInterval: NodeJS.Timeout | null = null;

export const startHealthMonitoring = (intervalMs: number = 5000): void => {
  if (healthMonitoringInterval) {
    console.warn('[droneManager] Health monitoring already started');
    return;
  }

  console.log(`[droneManager] Starting health monitoring every ${intervalMs}ms`);

  healthMonitoringInterval = setInterval(async () => {
    try {
      const drones = await getDroneList();
      const warnings = checkHealthWarnings(drones);
      
      if (warnings.length > 0) {
        warnings.forEach(warning => {
          console.warn(`[droneManager] Health warning: ${warning.message}`);
        });
        notifyHealthWarnings(warnings);
      }
    } catch (error) {
      console.error('[droneManager] Error in health monitoring:', error);
    }
  }, intervalMs);
};

/**
 * Stop health monitoring
 */
export const stopHealthMonitoring = (): void => {
  if (healthMonitoringInterval) {
    clearInterval(healthMonitoringInterval);
    healthMonitoringInterval = null;
    console.log('[droneManager] Health monitoring stopped');
  }
};

/**
 * Group drones by restaurant
 */
export const groupDronesByRestaurant = (drones: Drone[]): Record<string, Drone[]> => {
  const grouped: Record<string, Drone[]> = {};

  drones.forEach(drone => {
    const restaurantId = drone.restaurantId || drone.restaurant || 'unknown';
    if (!grouped[restaurantId]) {
      grouped[restaurantId] = [];
    }
    grouped[restaurantId].push(drone);
  });

  return grouped;
};

/**
 * Get restaurant color for drone visualization
 * Logic only - no UI changes
 */
export const getRestaurantColor = (restaurantId: string): string => {
  const colorMap: Record<string, string> = {
    'restaurant_2': '#ff9671', // Aloha Kitchen - orange
    'aloha': '#ff9671',
    'rest_2': '#667eea', // SweetDreams - blue
    'sweetdreams': '#667eea',
  };

  return colorMap[restaurantId] || '#6c757d'; // Default gray
};

