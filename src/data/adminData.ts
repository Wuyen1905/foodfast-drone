/**
 * Admin Data Helpers
 * Backend API integration for admin dashboard data loading
 */

import { AdminDrone, AdminRestaurant, AdminCustomer, SystemLog } from '../types/admin';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get drones for admin dashboard
export const getAdminDrones = async (): Promise<AdminDrone[]> => {
  try {
    const response = await apiClient.get('/drones');
    const drones = Array.isArray(response.data) ? response.data : [];
    
    // Transform to AdminDrone format
    return drones.map((d: any) => ({
      id: d.id,
      restaurantId: d.restaurantId || d.restaurant || '',
      restaurantName: d.restaurantName || 'Unknown',
      status: (d.status || 'Idle') as 'Idle' | 'Delivering' | 'Charging' | 'Maintenance',
      battery: d.battery || d.batteryLevel || 100,
      currentOrderId: d.currentOrderId,
      lastMaintenance: d.lastMaintenance || Date.now(),
      flaggedForIssue: d.flaggedForIssue || false,
      issueDescription: d.issueDescription
    }));
  } catch (error) {
    console.error('[adminData] Error fetching drones:', error);
    return [];
  }
};

// Get restaurants for admin dashboard
export const getAdminRestaurants = async (): Promise<AdminRestaurant[]> => {
  try {
    const [restaurantsResponse, ordersResponse, dronesResponse, usersResponse] = await Promise.all([
      apiClient.get('/restaurants'),
      apiClient.get('/orders'),
      apiClient.get('/drones'),
      apiClient.get('/auth/users')
    ]);
    
    const restaurants = Array.isArray(restaurantsResponse.data) ? restaurantsResponse.data : [];
    const orders = Array.isArray(ordersResponse.data) ? ordersResponse.data : [];
    const drones = Array.isArray(dronesResponse.data) ? dronesResponse.data : [];
    const users = Array.isArray(usersResponse.data) ? usersResponse.data : [];
    
    // Transform to AdminRestaurant format
    return restaurants.map((r: any) => {
      const restaurantOrders = orders.filter((o: any) => 
        (o.restaurantId === r.id || o.restaurant === r.id)
      );
      const restaurantDrones = drones.filter((d: any) => 
        (d.restaurantId === r.id || d.restaurant === r.id)
      );
      const owner = users.find((u: any) => u.id === r.ownerId);
      
      return {
        id: r.id,
        name: r.name,
        category: r.category || 'General',
        status: r.isActive ? 'Active' as const : 'Pending' as const,
        ownerId: r.ownerId,
        ownerName: owner?.name || 'Unknown',
        totalOrders: restaurantOrders.length,
        totalRevenue: restaurantOrders.reduce((sum: number, o: any) => sum + (o.total || 0), 0),
        rating: r.rating || 0,
        droneCount: restaurantDrones.length,
        location: r.location || 'Unknown',
        createdAt: r.createdAt || Date.now()
      };
    });
  } catch (error) {
    console.error('[adminData] Error fetching restaurants:', error);
    return [];
  }
};

// Get customers for admin dashboard
export const getAdminCustomers = async (): Promise<AdminCustomer[]> => {
  try {
    const [usersResponse, ordersResponse] = await Promise.all([
      apiClient.get('/auth/users'),
      apiClient.get('/orders')
    ]);
    
    const users = Array.isArray(usersResponse.data) ? usersResponse.data : [];
    const orders = Array.isArray(ordersResponse.data) ? ordersResponse.data : [];
    
    // Filter customers and transform
    return users
      .filter((u: any) => u.role === 'customer')
      .map((u: any) => {
        const customerOrders = orders.filter((o: any) => o.userId === u.id);
        const lastOrder = customerOrders.length > 0 
          ? customerOrders.sort((a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0))[0]
          : null;
        
        return {
          id: u.id,
          name: u.name,
          phone: u.phone || '',
          email: u.email || '',
          totalOrders: customerOrders.length,
          totalSpend: customerOrders.reduce((sum: number, o: any) => sum + (o.total || 0), 0),
          accountStatus: 'Active' as const,
          createdAt: u.createdAt || Date.now(),
          lastOrderDate: lastOrder ? (lastOrder.createdAt || lastOrder.updatedAt) : undefined
        };
      });
  } catch (error) {
    console.error('[adminData] Error fetching customers:', error);
    return [];
  }
};

// Get system logs
export const getSystemLogs = async (): Promise<SystemLog[]> => {
  try {
    // System logs endpoint doesn't exist yet, return empty array
    // TODO: Implement system logs endpoint in backend
    return [];
  } catch (error) {
    console.error('[adminData] Error fetching system logs:', error);
    return [];
  }
};

// Export initial data as a function to get fresh copies
export const getInitialAdminData = async () => ({
  drones: await getAdminDrones(),
  restaurants: await getAdminRestaurants(),
  customers: await getAdminCustomers(),
  logs: await getSystemLogs()
});
