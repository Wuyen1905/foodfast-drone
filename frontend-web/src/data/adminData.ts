/**
 * Admin Data Helpers
 * Helper functions for admin dashboard data loading
 */

import { AdminDrone, AdminRestaurant, AdminCustomer, SystemLog } from '../types/admin';

// Get drones for admin dashboard - uses backend API
export const getAdminDrones = async (): Promise<AdminDrone[]> => {
  const { getAllDrones } = await import('../api/adminApi');
  const drones = await getAllDrones();
  
  // Transform to AdminDrone format if needed
  return drones.map((d: any) => ({
    id: d.id,
    restaurantId: d.restaurantId || d.restaurant,
    restaurantName: d.restaurantName || 'Unknown',
    status: d.status || 'Idle',
    battery: d.battery || d.batteryLevel || 100,
    currentOrderId: d.currentOrderId,
    lastMaintenance: d.lastMaintenance || Date.now(),
    flaggedForIssue: d.flaggedForIssue || false,
    issueDescription: d.issueDescription
  }));
};

// Get restaurants for admin dashboard - uses backend API
export const getAdminRestaurants = async (): Promise<AdminRestaurant[]> => {
  const { getAllRestaurants } = await import('../api/adminApi');
  return await getAllRestaurants();
};

// Get customers for admin dashboard - uses backend API
export const getAdminCustomers = async (): Promise<AdminCustomer[]> => {
  const { getAllCustomers } = await import('../api/adminApi');
  return await getAllCustomers();
};

// Get system logs - would need backend endpoint
export const getSystemLogs = async (): Promise<SystemLog[]> => {
  // System logs would need a dedicated backend endpoint
  // For now, return empty array
  return [];
};

// Export initial data as a function to get fresh copies
export const getInitialAdminData = async () => ({
  drones: await getAdminDrones(),
  restaurants: await getAdminRestaurants(),
  customers: await getAdminCustomers(),
  logs: await getSystemLogs()
});

