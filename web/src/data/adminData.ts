/**
 * Admin Mock Data
 * This file contains mock data for the admin dashboard
 */

import { AdminDrone, AdminRestaurant, AdminCustomer, SystemLog } from '../types/admin';
import { RESTAURANTS, USERS } from './mockData';

// Generate mock drones for each restaurant
export const generateMockDrones = (): AdminDrone[] => {
  const drones: AdminDrone[] = [];
  const statuses: AdminDrone['status'][] = ['Idle', 'Delivering', 'Charging', 'Maintenance'];
  
  RESTAURANTS.forEach((restaurant, restaurantIndex) => {
    const droneCount = restaurantIndex === 0 ? 5 : restaurantIndex === 1 ? 4 : 6;
    
    for (let i = 0; i < droneCount; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      drones.push({
        id: `DRONE-${restaurant.id}-${String(i + 1).padStart(3, '0')}`,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        status,
        battery: status === 'Charging' ? 30 + Math.random() * 40 : 60 + Math.random() * 40,
        currentOrderId: status === 'Delivering' ? `ORD-${Math.floor(10000 + Math.random() * 90000)}` : undefined,
        lastMaintenance: Date.now() - Math.floor(Math.random() * 30) * 86400000, // Random date within last 30 days
        flaggedForIssue: Math.random() > 0.9,
        issueDescription: Math.random() > 0.9 ? 'Battery degradation detected' : undefined
      });
    }
  });
  
  return drones;
};

// Generate mock restaurant data with admin-specific fields
export const generateMockRestaurants = (): AdminRestaurant[] => {
  return RESTAURANTS.map((restaurant, index) => ({
    id: restaurant.id,
    name: restaurant.name,
    category: restaurant.category || 'General',
    status: restaurant.isActive ? 'Active' : index % 5 === 0 ? 'Pending' : 'Inactive',
    ownerId: restaurant.ownerId,
    ownerName: USERS.find(u => u.id === restaurant.ownerId)?.name || 'Unknown',
    totalOrders: Math.floor(Math.random() * 1000) + 100,
    totalRevenue: Math.floor(Math.random() * 50000000) + 10000000,
    rating: restaurant.rating || 4.5,
    droneCount: index === 0 ? 5 : index === 1 ? 4 : 6,
    location: restaurant.location || 'Unknown',
    createdAt: restaurant.createdAt
  }));
};

// Generate mock customer data
export const generateMockCustomers = (): AdminCustomer[] => {
  const customers = USERS.filter(u => u.role === 'customer');
  
  return customers.map((user, index) => ({
    id: user.id,
    name: user.name,
    phone: user.phone || `098765${String(index).padStart(4, '0')}`,
    email: user.email || `${user.username}@example.com`,
    totalOrders: user.orderCount || Math.floor(Math.random() * 50) + 1,
    totalSpend: Math.floor(Math.random() * 10000000) + 500000,
    accountStatus: Math.random() > 0.95 ? 'Suspended' : 'Active',
    createdAt: user.createdAt || Date.now() - Math.floor(Math.random() * 180) * 86400000,
    lastOrderDate: Date.now() - Math.floor(Math.random() * 30) * 86400000
  }));
};

// Initial system logs
export const initialSystemLogs: SystemLog[] = [
  {
    id: 'log_001',
    timestamp: Date.now() - 3600000, // 1 hour ago
    adminId: 'admin_1',
    adminName: 'System Administrator',
    action: 'restaurant_approved',
    targetType: 'restaurant',
    targetId: 'restaurant_2',
    targetName: 'Aloha Kitchen',
    details: 'Approved restaurant application after verification',
    severity: 'info'
  },
  {
    id: 'log_002',
    timestamp: Date.now() - 7200000, // 2 hours ago
    adminId: 'admin_1',
    adminName: 'System Administrator',
    action: 'drone_flagged',
    targetType: 'drone',
    targetId: 'DRONE-rest_1-001',
    targetName: 'DRONE-rest_1-001',
    details: 'Flagged for battery degradation issue',
    severity: 'warning'
  },
  {
    id: 'log_003',
    timestamp: Date.now() - 86400000, // 1 day ago
    adminId: 'admin_1',
    adminName: 'System Administrator',
    action: 'customer_suspended',
    targetType: 'customer',
    targetId: 'u2',
    targetName: 'Customer User',
    details: 'Temporarily suspended due to payment disputes',
    severity: 'warning'
  }
];

// Export initial data as a function to get fresh copies
export const getInitialAdminData = () => ({
  drones: generateMockDrones(),
  restaurants: generateMockRestaurants(),
  customers: generateMockCustomers(),
  logs: [...initialSystemLogs]
});

