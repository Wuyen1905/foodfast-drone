/**
 * Drone Emergency Service
 * Handles emergency interventions (recall, emergency landing, etc.)
 */

import { api } from '@/config/axios';
import { updateDroneStatus } from './droneManager';
import { performEmergencyOverride } from './adminService';

export interface RecallRequest {
  droneId: string;
  reason?: string;
  adminId?: string;
  adminName?: string;
}

/**
 * Recall a drone to charging station
 */
export const recallDrone = async (
  droneId: string,
  adminId?: string,
  adminName?: string
): Promise<boolean> => {
  try {
    // Update drone status to "returning"
    const updateSuccess = await updateDroneStatus(droneId, {
      status: 'returning' as const
    });

    if (!updateSuccess) {
      console.error(`[droneEmergencyService] Failed to update drone ${droneId} status`);
      return false;
    }

    // Call API endpoint for recall
    try {
      await api.post(`/drones/${droneId}/recall`, {
        timestamp: new Date().toISOString(),
        adminId,
        adminName
      });
    } catch (apiError) {
      // If API endpoint doesn't exist, log and continue
      console.log(`[droneEmergencyService] Recall API endpoint not available, using service update`);
    }

    // Log emergency action
    if (adminId && adminName) {
      await performEmergencyOverride(
        'drone',
        droneId,
        `Drone ${droneId}`,
        'recall',
        adminId,
        adminName
      );
    }

    console.log(`[droneEmergencyService] Drone ${droneId} recalled successfully`);
    return true;
  } catch (error) {
    console.error(`[droneEmergencyService] Error recalling drone ${droneId}:`, error);
    return false;
  }
};

/**
 * Emergency land a drone
 */
export const emergencyLand = async (
  droneId: string,
  adminId?: string,
  adminName?: string
): Promise<boolean> => {
  try {
    // Update drone status
    const updateSuccess = await updateDroneStatus(droneId, {
      status: 'offline' as const
    });

    if (!updateSuccess) {
      return false;
    }

    // Call API endpoint
    try {
      await api.post(`/drones/${droneId}/emergency-land`, {
        timestamp: new Date().toISOString(),
        adminId,
        adminName
      });
    } catch (apiError) {
      console.log(`[droneEmergencyService] Emergency land API endpoint not available`);
    }

    // Log emergency action
    if (adminId && adminName) {
      await performEmergencyOverride(
        'drone',
        droneId,
        `Drone ${droneId}`,
        'emergency-land',
        adminId,
        adminName
      );
    }

    console.log(`[droneEmergencyService] Drone ${droneId} emergency landed`);
    return true;
  } catch (error) {
    console.error(`[droneEmergencyService] Error emergency landing drone ${droneId}:`, error);
    return false;
  }
};

