/**
 * Drone Service
 * Service layer for drone-order relationship management
 * Logic only - no UI changes
 */

import axios from 'axios';
import { Drone } from './droneManager';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Get drone by order ID
 * Finds the drone assigned to a specific order
 */
export function getDroneByOrder(orderId: string, drones: Drone[]): Drone | undefined {
  if (!orderId || !drones || drones.length === 0) {
    return undefined;
  }

  const assignedDrone = drones.find(d => d.orderId === orderId);
  
  if (!assignedDrone) {
    console.warn(`⚠️ No drone assigned for order ${orderId}.`);
  }

  return assignedDrone;
}

/**
 * Get all drones from API
 * Fetches drones and includes orderId matching logic
 */
export async function fetchAllDrones(): Promise<Drone[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/drones`);
    const drones = Array.isArray(response.data) ? response.data : [];
    
    return drones.map((drone: any) => ({
      id: drone.id,
      code: drone.code || drone.droneCode || drone.id,
      battery: drone.battery !== undefined ? drone.battery : 100,
      missionsCompleted: drone.missionsCompleted || 0,
      lastMaintenance: drone.lastMaintenance,
      status: drone.status || 'active',
      restaurantId: drone.restaurantId || drone.restaurant,
      orderId: drone.orderId || null, // Explicitly include orderId
      position: drone.position,
      speed: drone.speed,
      connectionStatus: drone.connectionStatus,
      healthScore: calculateHealthScore(drone)
    })) as Drone[];
  } catch (error) {
    console.error('[droneService] Error fetching drones:', error);
    return [];
  }
}

/**
 * Calculate health score for a drone
 */
function calculateHealthScore(drone: any): number {
  const battery = drone.battery || 0;
  const missions = drone.missionsCompleted || 0;
  const normalizedMissions = Math.min(missions / 200, 1) * 100;
  const score = (battery * normalizedMissions) / 100;
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Get drones by restaurant ID
 */
export function getDronesByRestaurant(restaurantId: string, drones: Drone[]): Drone[] {
  if (!restaurantId || !drones) {
    return [];
  }

  return drones.filter(d => {
    const droneRestaurantId = d.restaurantId || d.restaurant;
    return droneRestaurantId === restaurantId;
  });
}

/**
 * Get available drones (not assigned to any order)
 */
export function getAvailableDrones(drones: Drone[]): Drone[] {
  if (!drones) {
    return [];
  }

  return drones.filter(d => !d.orderId || d.orderId === null);
}

/**
 * Validate drone-order assignment
 * Checks if a drone is correctly assigned to an order
 */
export function validateDroneOrderAssignment(
  orderId: string,
  droneId: string | undefined,
  drones: Drone[]
): { isValid: boolean; message?: string } {
  if (!orderId) {
    return { isValid: false, message: 'Order ID is required' };
  }

  if (!droneId) {
    return { isValid: false, message: `No drone assigned to order ${orderId}` };
  }

  const drone = drones.find(d => d.id === droneId);
  if (!drone) {
    return { isValid: false, message: `Drone ${droneId} not found` };
  }

  if (drone.orderId !== orderId) {
    return { 
      isValid: false, 
      message: `Drone ${droneId} is assigned to order ${drone.orderId}, not ${orderId}` 
    };
  }

  return { isValid: true };
}

/**
 * Assign a drone to an order
 * Finds an available drone for the restaurant and assigns it to the order
 */
export async function assignDroneToOrder(orderId: string, restaurantId: string): Promise<boolean> {
  try {
    // Fetch all drones
    const response = await axios.get(`${API_BASE_URL}/drones`);
    const drones = Array.isArray(response.data) ? response.data : [];
    
    // Find an available drone for this restaurant
    const availableDrone = drones.find((d: any) => {
      const droneRestaurantId = d.restaurantId || d.restaurant;
      const isAvailable = !d.orderId || d.orderId === null;
      const isActive = d.status === 'active' || d.status === 'delivering';
      const hasBattery = (d.battery || 100) > 20; // At least 20% battery
      
      return droneRestaurantId === restaurantId && isAvailable && isActive && hasBattery;
    });
    
    if (!availableDrone) {
      console.warn(`⚠️ No available drone found for restaurant ${restaurantId} to assign to order ${orderId}`);
      return false;
    }
    
    // Update drone to assign it to the order
    const updateResponse = await axios.patch(`${API_BASE_URL}/drones/${availableDrone.id}`, {
      orderId: orderId,
      status: 'delivering'
    });
    
    console.log(`✅ Drone ${availableDrone.id} assigned to order ${orderId}`);
    return true;
  } catch (error) {
    console.error(`[droneService] Error assigning drone to order ${orderId}:`, error);
    return false;
  }
}

/**
 * Release a drone from an order
 * Marks the drone as idle and clears the orderId
 */
export async function releaseDroneFromOrder(orderId: string): Promise<boolean> {
  try {
    // Fetch all drones
    const response = await axios.get(`${API_BASE_URL}/drones`);
    const drones = Array.isArray(response.data) ? response.data : [];
    
    // Find the drone assigned to this order
    const assignedDrone = drones.find((d: any) => d.orderId === orderId);
    
    if (!assignedDrone) {
      console.warn(`⚠️ No drone found assigned to order ${orderId}`);
      return false;
    }
    
    // Update drone to release it from the order
    const updateResponse = await axios.patch(`${API_BASE_URL}/drones/${assignedDrone.id}`, {
      orderId: null,
      status: 'active'
    });
    
    console.log(`✅ Drone ${assignedDrone.id} released from order ${orderId}`);
    return true;
  } catch (error) {
    console.error(`[droneService] Error releasing drone from order ${orderId}:`, error);
    return false;
  }
}

/**
 * Get drone by order ID from API
 * Async version that fetches from API
 */
export async function getDroneByOrderId(orderId: string): Promise<Drone | null> {
  try {
    const response = await axios.get(`${API_BASE_URL}/drones`);
    const drones = Array.isArray(response.data) ? response.data : [];
    
    // Find drone assigned to this order
    const assignedDrone = drones.find((d: any) => d.orderId === orderId);
    
    if (!assignedDrone) {
      return null;
    }
    
    // Map to Drone format
    return {
      id: assignedDrone.id,
      code: assignedDrone.code || assignedDrone.droneCode || assignedDrone.id,
      battery: assignedDrone.battery !== undefined ? assignedDrone.battery : 100,
      missionsCompleted: assignedDrone.missionsCompleted || 0,
      lastMaintenance: assignedDrone.lastMaintenance || new Date().toISOString(),
      status: assignedDrone.status || 'active',
      restaurantId: assignedDrone.restaurantId || assignedDrone.restaurant,
      orderId: assignedDrone.orderId || null,
      position: assignedDrone.position,
      healthScore: calculateHealthScore(assignedDrone)
    } as Drone;
  } catch (error) {
    console.error(`[droneService] Error fetching drone for order ${orderId}:`, error);
    return null;
  }
}

/**
 * Release drone (alias for releaseDroneFromOrder)
 * Exported for mobile and web compatibility
 */
export async function releaseDrone(orderId: string): Promise<boolean> {
  return releaseDroneFromOrder(orderId);
}

