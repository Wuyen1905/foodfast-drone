import apiClient from '../config/axios';

export interface AdminDrone {
  id: string;
  restaurantId: string;
  restaurantName: string;
  status: 'Idle' | 'Delivering' | 'Charging' | 'Maintenance';
  battery: number;
  currentOrderId?: string;
  lastMaintenance: number;
  flaggedForIssue?: boolean;
  issueDescription?: string;
}

export interface AdminRestaurant {
  id: string;
  name: string;
  category: string;
  status: 'Active' | 'Inactive' | 'Pending';
  ownerId: string;
  ownerName: string;
  totalOrders: number;
  totalRevenue: number;
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
  totalSpend: number;
  accountStatus: 'Active' | 'Suspended';
  createdAt: number;
  lastOrderDate?: number;
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

// Get all restaurants for admin
export const getAllRestaurants = async (): Promise<AdminRestaurant[]> => {
  const response = await apiClient.get('/admin/restaurants');
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
};

// Get all customers for admin
export const getAllCustomers = async (): Promise<AdminCustomer[]> => {
  const response = await apiClient.get('/admin/customers');
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
};

// Get all drones for admin
export const getAllDrones = async (): Promise<AdminDrone[]> => {
  const response = await apiClient.get('/admin/drones');
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
};

// Get admin statistics
export const getAdminStats = async (): Promise<AdminStats> => {
  // Use dedicated backend endpoint
  const response = await apiClient.get('/admin/stats');
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
};

// Update restaurant status
export const updateRestaurantStatus = async (id: string, status: 'active' | 'inactive'): Promise<boolean> => {
  try {
    await apiClient.patch(`/admin/restaurants/${id}/status`, { isActive: status === 'active' });
    return true;
  } catch (error) {
    console.error('Failed to update restaurant status:', error);
    return false;
  }
};

// Suspend customer
export const suspendCustomer = async (customerId: string): Promise<boolean> => {
  try {
    await apiClient.patch(`/admin/users/${customerId}/suspend`);
    return true;
  } catch (error) {
    console.error('Failed to suspend customer:', error);
    return false;
  }
};

// Reactivate customer
export const reactivateCustomer = async (customerId: string): Promise<boolean> => {
  try {
    await apiClient.patch(`/admin/users/${customerId}/reactivate`);
    return true;
  } catch (error) {
    console.error('Failed to reactivate customer:', error);
    return false;
  }
};

// Flag drone for maintenance
export const flagDrone = async (droneId: string, reason: string): Promise<boolean> => {
  try {
    await apiClient.patch(`/drones/${droneId}`, {
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
    await apiClient.patch(`/drones/${droneId}`, {
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
    await apiClient.patch(`/drones/${droneId}`, {
      restaurantId: newRestaurantId
    });
    return true;
  } catch (error) {
    console.error('Failed to reassign drone:', error);
    return false;
  }
};

