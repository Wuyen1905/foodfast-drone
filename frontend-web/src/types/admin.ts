/**
 * Admin Dashboard Type Definitions
 */

export type DroneStatus = 'Idle' | 'Delivering' | 'Charging' | 'Maintenance';
export type RestaurantStatus = 'Active' | 'Inactive' | 'Pending';
export type CustomerAccountStatus = 'Active' | 'Suspended';

export interface AdminDrone {
  id: string;
  restaurantId: string;
  restaurantName: string;
  status: DroneStatus;
  battery: number; // 0-100
  currentOrderId?: string;
  lastMaintenance: number; // timestamp
  flaggedForIssue?: boolean;
  issueDescription?: string;
}

export interface AdminRestaurant {
  id: string;
  name: string;
  category: string;
  status: RestaurantStatus;
  ownerId: string;
  ownerName: string;
  totalOrders: number;
  totalRevenue: number; // in VND
  rating: number;
  droneCount: number;
  location: string;
  createdAt: number;
}

export interface AdminCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalOrders: number;
  totalSpend: number; // in VND
  accountStatus: CustomerAccountStatus;
  createdAt: number;
  lastOrderDate?: number;
}

export interface SystemLog {
  id: string;
  timestamp: number;
  adminId: string;
  adminName: string;
  action: 'restaurant_approved' | 'restaurant_suspended' | 'restaurant_activated' | 
          'customer_suspended' | 'customer_activated' | 'drone_flagged' | 'drone_cleared' |
          'emergency_override' | 'order_status_changed';
  targetType: 'restaurant' | 'customer' | 'drone' | 'order';
  targetId: string;
  targetName: string;
  details: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface AdminStats {
  totalCustomers: number;
  totalRestaurants: number;
  activeRestaurants: number;
  pendingRestaurants: number;
  totalOrders: number;
  totalRevenue: number;
  totalDrones: number;
  activeDrones: number;
  idleDrones: number;
  chargingDrones: number;
  maintenanceDrones: number;
}

