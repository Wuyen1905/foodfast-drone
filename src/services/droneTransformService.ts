/**
 * Drone Transform Service
 * Transforms DroneFleet data to AdminDrone format for Admin Dashboard
 */

import { DroneFleet } from './adminService';
import { AdminDrone } from '../types/admin';
import { getAllRestaurants } from './adminService';

/**
 * Transform DroneFleet[] to AdminDrone[]
 */
export const transformToAdminDrones = (droneFleet: DroneFleet[]): AdminDrone[] => {
  const restaurants = getAllRestaurants();
  
  return droneFleet.map((drone: any) => {
    // Find restaurant name
    const restaurant = restaurants.find(r => r.id === drone.restaurantId);
    const restaurantName = restaurant?.name || drone.restaurantId || 'Unknown';
    
    // Map status - check if drone has realtime status field
    let status: AdminDrone['status'] = 'Idle';
    if (drone.status === 'delivering') {
      status = 'Delivering';
    } else if (drone.status === 'active' && drone.orderId) {
      status = 'Delivering';
    } else if (drone.status === 'active') {
      status = 'Idle';
    } else if (drone.status === 'maintenance' || drone.status === 'returning') {
      status = 'Maintenance';
    } else if (drone.status === 'offline') {
      status = 'Idle';
    }
    
    // Parse lastMaintenance (could be string date or timestamp)
    let lastMaintenance: number;
    if (drone.lastMaintenance) {
      if (typeof drone.lastMaintenance === 'string') {
        lastMaintenance = new Date(drone.lastMaintenance).getTime();
      } else {
        lastMaintenance = drone.lastMaintenance;
      }
    } else if (drone.lastUpdate) {
      lastMaintenance = new Date(drone.lastUpdate).getTime();
    } else {
      lastMaintenance = Date.now() - 7 * 24 * 60 * 60 * 1000; // Default to 7 days ago
    }
    
    return {
      id: drone.id,
      restaurantId: drone.restaurantId,
      restaurantName,
      status,
      battery: drone.battery || 100,
      currentOrderId: drone.orderId || undefined, // Use orderId from realtime data if available
      lastMaintenance,
      flaggedForIssue: false,
      issueDescription: undefined
    };
  });
};

