/**
 * Admin Service
 * Provides admin-specific API functions for the web frontend
 * Uses backend /api/admin/* endpoints
 */

import axios from 'axios';
import type { AdminRestaurant, AdminCustomer, AdminDrone, AdminStats } from '@/types/admin';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Get all restaurants for admin
export const getAllRestaurants = async (): Promise<AdminRestaurant[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/restaurants`);
    const restaurants = response.data;
    
    // Backend already returns AdminRestaurant format with all enriched fields
    return restaurants.map((r: any) => ({
      id: r.id,
      name: r.name,
      category: r.category || 'General',
      status: r.status || (r.isActive ? 'Active' : 'Pending'),
      ownerId: r.ownerId,
      ownerName: r.ownerName || 'Unknown',
      totalOrders: r.totalOrders || 0,
      totalRevenue: r.totalRevenue || 0,
      rating: r.rating || 0,
      droneCount: r.droneCount || 0,
      location: r.location || 'Unknown',
      createdAt: r.createdAt || Date.now()
    }));
  } catch (error) {
    console.error('Failed to get restaurants:', error);
    return [];
  }
};

// Get restaurant by ID
export const getRestaurantById = async (id: string): Promise<AdminRestaurant | null> => {
  try {
    const restaurants = await getAllRestaurants();
    return restaurants.find(r => r.id === id) || null;
  } catch (error) {
    console.error('Failed to get restaurant:', error);
    return null;
  }
};

// Get all customers for admin
export const getAllCustomers = async (): Promise<AdminCustomer[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/customers`);
    const customers = response.data;
    
    // Backend already returns AdminCustomer format with all enriched fields
    return customers.map((c: any) => ({
      id: c.id,
      name: c.name,
      phone: c.phone || '',
      email: c.email || '',
      totalOrders: c.totalOrders || 0,
      totalSpend: c.totalSpend || 0,
      accountStatus: c.accountStatus || 'Active',
      createdAt: c.createdAt || Date.now(),
      lastOrderDate: c.lastOrderDate || undefined
    }));
  } catch (error) {
    console.error('Failed to get customers:', error);
    return [];
  }
};

// Get all drones for admin
export const getAllDrones = async (): Promise<AdminDrone[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/drones`);
    const drones = response.data;
    
    // Backend already returns AdminDrone format with all enriched fields
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
  } catch (error) {
    console.error('Failed to get drones:', error);
    return [];
  }
};

// Get drone fleet (alias for getAllDrones for backward compatibility)
export const getDroneFleet = async (): Promise<any[]> => {
  const drones = await getAllDrones();
  // Transform to DroneFleet format
  return drones.map(d => ({
    id: d.id,
    status: d.status === 'Delivering' ? 'active' : 
            d.status === 'Charging' || d.status === 'Maintenance' ? 'maintenance' : 
            'offline',
    battery: d.battery,
    location: 'Unknown', // Will be enriched by droneManager
    restaurantId: d.restaurantId,
    lastUpdate: new Date(d.lastMaintenance).toISOString()
  }));
};

// Get admin statistics
export const getAdminStats = async (): Promise<AdminStats> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/stats`);
    const stats = response.data;
    
    // Backend already returns AdminStats format
    return {
      totalCustomers: stats.totalCustomers || 0,
      totalRestaurants: stats.totalRestaurants || 0,
      activeRestaurants: stats.activeRestaurants || 0,
      pendingRestaurants: stats.pendingRestaurants || 0,
      totalOrders: stats.totalOrders || 0,
      totalRevenue: stats.totalRevenue || 0,
      totalDrones: stats.totalDrones || 0,
      activeDrones: stats.activeDrones || 0,
      idleDrones: stats.idleDrones || 0,
      chargingDrones: stats.chargingDrones || 0,
      maintenanceDrones: stats.maintenanceDrones || 0
    };
  } catch (error) {
    console.error('Failed to get admin stats:', error);
    return {
      totalCustomers: 0,
      totalRestaurants: 0,
      activeRestaurants: 0,
      pendingRestaurants: 0,
      totalOrders: 0,
      totalRevenue: 0,
      totalDrones: 0,
      activeDrones: 0,
      idleDrones: 0,
      chargingDrones: 0,
      maintenanceDrones: 0
    };
  }
};

// Update restaurant status
export const updateRestaurantStatus = async (id: string, status: 'active' | 'inactive'): Promise<boolean> => {
  try {
    await axios.patch(`${API_BASE_URL}/admin/restaurants/${id}/status`, { isActive: status === 'active' });
    return true;
  } catch (error) {
    console.error('Failed to update restaurant status:', error);
    return false;
  }
};

// Suspend customer
export const suspendCustomer = async (customerId: string): Promise<boolean> => {
  try {
    await axios.patch(`${API_BASE_URL}/admin/users/${customerId}/suspend`);
    return true;
  } catch (error) {
    console.error('Failed to suspend customer:', error);
    return false;
  }
};

// Reactivate customer
export const reactivateCustomer = async (customerId: string): Promise<boolean> => {
  try {
    await axios.patch(`${API_BASE_URL}/admin/users/${customerId}/reactivate`);
    return true;
  } catch (error) {
    console.error('Failed to reactivate customer:', error);
    return false;
  }
};

// Flag drone for maintenance
export const flagDrone = async (droneId: string, reason: string): Promise<boolean> => {
  try {
    await axios.patch(`${API_BASE_URL}/drones/${droneId}`, {
      flaggedForIssue: true,
      issueDescription: reason
    });
    return true;
  } catch (error) {
    console.error('Failed to flag drone:', error);
    return false;
  }
};

// Clear drone flag
export const clearDroneFlag = async (droneId: string): Promise<boolean> => {
  try {
    await axios.patch(`${API_BASE_URL}/drones/${droneId}`, {
      flaggedForIssue: false,
      issueDescription: null
    });
    return true;
  } catch (error) {
    console.error('Failed to clear drone flag:', error);
    return false;
  }
};

// Reassign drone
export const reassignDrone = async (droneId: string, newRestaurantId: string): Promise<boolean> => {
  try {
    await axios.patch(`${API_BASE_URL}/drones/${droneId}`, {
      restaurantId: newRestaurantId
    });
    return true;
  } catch (error) {
    console.error('Failed to reassign drone:', error);
    return false;
  }
};

// Get system logs (placeholder - backend endpoint may not exist yet)
export const getSystemLogs = async (): Promise<any[]> => {
  try {
    // TODO: Implement backend endpoint for system logs
    return [];
  } catch (error) {
    console.error('Failed to get system logs:', error);
    return [];
  }
};

// Perform emergency override (placeholder - backend endpoint may not exist yet)
export const performEmergencyOverride = async (
  targetType: 'order' | 'restaurant' | 'drone',
  targetId: string,
  action: string
): Promise<boolean> => {
  try {
    // TODO: Implement backend endpoint for emergency override
    console.log('Emergency override:', { targetType, targetId, action });
    return true;
  } catch (error) {
    console.error('Failed to perform emergency override:', error);
    return false;
  }
};

