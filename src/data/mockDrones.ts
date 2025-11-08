/**
 * Mock Drone Data
 * Simulated drones for demonstration when no real drone data is available
 */

import { AdminDrone } from '@/types/admin';

export const mockDrones: AdminDrone[] = [
  {
    id: 'DRONE-A001',
    restaurantId: 'restaurant_2',
    restaurantName: 'Aloha Kitchen',
    status: 'Delivering',
    battery: 80,
    currentOrderId: 'ORD-AK-DEMO-001',
    lastMaintenance: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
    flaggedForIssue: false,
    issueDescription: undefined
  },
  {
    id: 'DRONE-B002',
    restaurantId: 'rest_2',
    restaurantName: 'SweetDreams Bakery',
    status: 'Charging',
    battery: 45,
    currentOrderId: undefined,
    lastMaintenance: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
    flaggedForIssue: false,
    issueDescription: undefined
  }
];

