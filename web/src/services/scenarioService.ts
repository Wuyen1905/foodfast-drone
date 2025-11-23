/**
 * Scenario Simulation Service
 * Admin-only logic for handling system scenarios and incidents
 */

import { api } from '@/config/axios';
import { updateDroneStatus } from './droneManager';
import { notifyWarning, notifySystemEvent } from '@/state/notificationStore';

export type ScenarioType = 
  | 'droneFailure'
  | 'batteryDepletion'
  | 'weatherAlert'
  | 'networkOutage'
  | 'maintenanceRequired'
  | 'orderCancellation'
  | 'restaurantOffline';

export interface Scenario {
  id: string;
  type: ScenarioType;
  affectedDrone?: string;
  affectedOrder?: string;
  affectedRestaurant?: string;
  timestamp: string;
  resolved: boolean;
  metadata?: Record<string, any>;
}

/**
 * Get all scenarios from API
 */
export const getScenarios = async (): Promise<Scenario[]> => {
  try {
    const response = await api.get(`/scenarios`);
    return response.data || [];
  } catch (error) {
    console.error('[scenarioService] Error fetching scenarios:', error);
    return [];
  }
};

/**
 * Handle drone failure scenario
 */
export const handleDroneFailure = async (droneId: string): Promise<boolean> => {
  try {
    console.log(`[scenarioService] Drone ${droneId} returning to base due to simulated failure.`);
    
    // Update drone status to returning
    const success = await updateDroneStatus(droneId, {
      status: 'returning'
    });

    if (success) {
      // Notify system
      notifySystemEvent(`Drone ${droneId} returning to base due to failure`, {
        droneId,
        scenario: 'droneFailure'
      });

      // Add scenario to API (simulated)
      await addScenario({
        type: 'droneFailure',
        affectedDrone: droneId,
        metadata: {
          action: 'returning_to_base',
          timestamp: new Date().toISOString()
        }
      });
    }

    return success;
  } catch (error) {
    console.error(`[scenarioService] Error handling drone failure for ${droneId}:`, error);
    return false;
  }
};

/**
 * Handle battery depletion scenario
 */
export const handleBatteryDepletion = async (droneId: string): Promise<boolean> => {
  try {
    console.log(`[scenarioService] Drone ${droneId} battery depleted - emergency landing.`);
    
    const success = await updateDroneStatus(droneId, {
      status: 'offline',
      battery: 0
    });

    if (success) {
      notifyWarning(`Drone ${droneId} battery depleted - emergency landing required`, {
        droneId,
        scenario: 'batteryDepletion'
      });

      await addScenario({
        type: 'batteryDepletion',
        affectedDrone: droneId,
        metadata: {
          action: 'emergency_landing',
          batteryLevel: 0
        }
      });
    }

    return success;
  } catch (error) {
    console.error(`[scenarioService] Error handling battery depletion for ${droneId}:`, error);
    return false;
  }
};

/**
 * Handle weather alert scenario
 */
export const handleWeatherAlert = async (affectedDrones: string[]): Promise<boolean> => {
  try {
    console.log(`[scenarioService] Weather alert - ${affectedDrones.length} drones affected.`);
    
    // Update all affected drones
    const updates = await Promise.all(
      affectedDrones.map(droneId => 
        updateDroneStatus(droneId, { status: 'returning' })
      )
    );

    if (updates.every(Boolean)) {
      notifyWarning(`Weather alert: ${affectedDrones.length} drones returning to base`, {
        affectedDrones,
        scenario: 'weatherAlert'
      });

      await addScenario({
        type: 'weatherAlert',
        metadata: {
          affectedDrones,
          action: 'return_to_base',
          severity: 'high'
        }
      });
    }

    return updates.every(Boolean);
  } catch (error) {
    console.error('[scenarioService] Error handling weather alert:', error);
    return false;
  }
};

/**
 * Add scenario to API
 * Note: Backend /api/scenarios endpoint does not exist yet
 * This function currently logs only and returns false
 */
export const addScenario = async (scenario: Omit<Scenario, 'id' | 'timestamp' | 'resolved'>): Promise<boolean> => {
  try {
    // TODO: Implement backend /api/scenarios POST endpoint
    console.warn('[scenarioService] Backend /api/scenarios endpoint does not exist yet. Scenario not persisted:', scenario);
    return false; // Don't fake success - backend endpoint doesn't exist
  } catch (error) {
    console.error('[scenarioService] Error adding scenario:', error);
    return false;
  }
};

/**
 * Resolve scenario
 * Note: Backend /api/scenarios/{id} PATCH endpoint does not exist yet
 * This function currently logs only and returns false
 */
export const resolveScenario = async (scenarioId: string): Promise<boolean> => {
  try {
    // TODO: Implement backend /api/scenarios/{id} PATCH endpoint
    console.warn(`[scenarioService] Backend /api/scenarios/${scenarioId} PATCH endpoint does not exist yet. Scenario not resolved.`);
    return false; // Don't fake success - backend endpoint doesn't exist
  } catch (error) {
    console.error(`[scenarioService] Error resolving scenario ${scenarioId}:`, error);
    return false;
  }
};

/**
 * Process scenarios automatically (background service)
 */
let scenarioProcessingInterval: NodeJS.Timeout | null = null;

export const startScenarioProcessing = (intervalMs: number = 10000): void => {
  if (scenarioProcessingInterval) {
    console.warn('[scenarioService] Scenario processing already started');
    return;
  }

  console.log(`[scenarioService] Starting scenario processing every ${intervalMs}ms`);

  scenarioProcessingInterval = setInterval(async () => {
    try {
      const scenarios = await getScenarios();
      const unresolvedScenarios = scenarios.filter(s => !s.resolved);

      // Process each unresolved scenario
      for (const scenario of unresolvedScenarios) {
        switch (scenario.type) {
          case 'droneFailure':
            if (scenario.affectedDrone) {
              await handleDroneFailure(scenario.affectedDrone);
            }
            break;
          case 'batteryDepletion':
            if (scenario.affectedDrone) {
              await handleBatteryDepletion(scenario.affectedDrone);
            }
            break;
          case 'weatherAlert':
            // Handle weather alert
            break;
          default:
            console.log(`[scenarioService] Unhandled scenario type: ${scenario.type}`);
        }
      }
    } catch (error) {
      console.error('[scenarioService] Error in scenario processing:', error);
    }
  }, intervalMs);
};

/**
 * Stop scenario processing
 */
export const stopScenarioProcessing = (): void => {
  if (scenarioProcessingInterval) {
    clearInterval(scenarioProcessingInterval);
    scenarioProcessingInterval = null;
    console.log('[scenarioService] Scenario processing stopped');
  }
};

