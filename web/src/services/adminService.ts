/**
 * Admin Service Layer
 * Handles all admin-related operations with localStorage persistence
 */

import { AdminDrone, AdminRestaurant, AdminCustomer, SystemLog, AdminStats } from '../types/admin';
import { getInitialAdminData } from '../data/adminData';
import toast from 'react-hot-toast';

const STORAGE_KEYS = {
  RESTAURANTS: 'admin_restaurants',
  CUSTOMERS: 'admin_customers',
  DRONES: 'admin_drones',
  LOGS: 'admin_system_logs'
};

// Helper to get data from localStorage
const getStorageData = <T>(key: string, defaultData: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultData;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultData;
  }
};

// Helper to save data to localStorage
const saveStorageData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Initialize admin data
const initializeAdminData = () => {
  const initialData = getInitialAdminData();
  
  if (!localStorage.getItem(STORAGE_KEYS.RESTAURANTS)) {
    saveStorageData(STORAGE_KEYS.RESTAURANTS, initialData.restaurants);
  }
  if (!localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) {
    saveStorageData(STORAGE_KEYS.CUSTOMERS, initialData.customers);
  }
  if (!localStorage.getItem(STORAGE_KEYS.DRONES)) {
    saveStorageData(STORAGE_KEYS.DRONES, initialData.drones);
  }
  if (!localStorage.getItem(STORAGE_KEYS.LOGS)) {
    saveStorageData(STORAGE_KEYS.LOGS, initialData.logs);
  }
};

// Initialize on module load
initializeAdminData();

// ==================== RESTAURANT OPERATIONS ====================

export const getAllRestaurants = (): AdminRestaurant[] => {
  const initialData = getInitialAdminData();
  return getStorageData(STORAGE_KEYS.RESTAURANTS, initialData.restaurants);
};

export const updateRestaurantStatus = (
  restaurantId: string,
  status: AdminRestaurant['status'],
  adminId: string,
  adminName: string
): boolean => {
  try {
    const restaurants = getAllRestaurants();
    const restaurantIndex = restaurants.findIndex(r => r.id === restaurantId);
    
    if (restaurantIndex === -1) {
      toast.error('Không tìm thấy nhà hàng');
      return false;
    }
    
    const restaurant = restaurants[restaurantIndex];
    restaurants[restaurantIndex] = { ...restaurant, status };
    saveStorageData(STORAGE_KEYS.RESTAURANTS, restaurants);
    
    // Log the action
    const action = status === 'Active' ? 'restaurant_activated' : 
                   status === 'Inactive' ? 'restaurant_suspended' : 'restaurant_approved';
    
    addSystemLog({
      adminId,
      adminName,
      action,
      targetType: 'restaurant',
      targetId: restaurantId,
      targetName: restaurant.name,
      details: `Status changed to ${status}`,
      severity: status === 'Inactive' ? 'warning' : 'info'
    });
    
    const statusText = status === 'Active' ? 'Hoạt động' : status === 'Inactive' ? 'Không hoạt động' : 'Chờ duyệt';
    toast.success(`Cập nhật trạng thái nhà hàng ${restaurant.name} thành ${statusText}`);
    return true;
  } catch (error) {
    console.error('Error updating restaurant status:', error);
    toast.error('Cập nhật trạng thái nhà hàng thất bại');
    return false;
  }
};

export const updateRestaurantInfo = (
  restaurantId: string,
  updates: Partial<AdminRestaurant>,
  adminId: string,
  adminName: string
): boolean => {
  try {
    const restaurants = getAllRestaurants();
    const restaurantIndex = restaurants.findIndex(r => r.id === restaurantId);
    
    if (restaurantIndex === -1) {
      toast.error('Không tìm thấy nhà hàng');
      return false;
    }
    
    const restaurant = restaurants[restaurantIndex];
    restaurants[restaurantIndex] = { ...restaurant, ...updates };
    saveStorageData(STORAGE_KEYS.RESTAURANTS, restaurants);
    
    addSystemLog({
      adminId,
      adminName,
      action: 'restaurant_approved',
      targetType: 'restaurant',
      targetId: restaurantId,
      targetName: restaurant.name,
      details: `Updated restaurant information`,
      severity: 'info'
    });
    
    toast.success(`Cập nhật nhà hàng ${restaurant.name} thành công`);
    return true;
  } catch (error) {
    console.error('Error updating restaurant:', error);
    toast.error('Cập nhật nhà hàng thất bại');
    return false;
  }
};

// ==================== CUSTOMER OPERATIONS ====================

export const getAllCustomers = (): AdminCustomer[] => {
  const initialData = getInitialAdminData();
  return getStorageData(STORAGE_KEYS.CUSTOMERS, initialData.customers);
};

export const suspendCustomer = (
  customerId: string,
  adminId: string,
  adminName: string
): boolean => {
  try {
    const customers = getAllCustomers();
    const customerIndex = customers.findIndex(c => c.id === customerId);
    
    if (customerIndex === -1) {
      toast.error('Không tìm thấy khách hàng');
      return false;
    }
    
    const customer = customers[customerIndex];
    customers[customerIndex] = { ...customer, accountStatus: 'Suspended' };
    saveStorageData(STORAGE_KEYS.CUSTOMERS, customers);
    
    addSystemLog({
      adminId,
      adminName,
      action: 'customer_suspended',
      targetType: 'customer',
      targetId: customerId,
      targetName: customer.name,
      details: `Customer account suspended`,
      severity: 'warning'
    });
    
    toast.success(`Tạm ngưng khách hàng ${customer.name} thành công`);
    return true;
  } catch (error) {
    console.error('Error suspending customer:', error);
    toast.error('Tạm ngưng khách hàng thất bại');
    return false;
  }
};

export const reactivateCustomer = (
  customerId: string,
  adminId: string,
  adminName: string
): boolean => {
  try {
    const customers = getAllCustomers();
    const customerIndex = customers.findIndex(c => c.id === customerId);
    
    if (customerIndex === -1) {
      toast.error('Không tìm thấy khách hàng');
      return false;
    }
    
    const customer = customers[customerIndex];
    customers[customerIndex] = { ...customer, accountStatus: 'Active' };
    saveStorageData(STORAGE_KEYS.CUSTOMERS, customers);
    
    addSystemLog({
      adminId,
      adminName,
      action: 'customer_activated',
      targetType: 'customer',
      targetId: customerId,
      targetName: customer.name,
      details: `Customer account reactivated`,
      severity: 'info'
    });
    
    toast.success(`Kích hoạt lại khách hàng ${customer.name} thành công`);
    return true;
  } catch (error) {
    console.error('Error reactivating customer:', error);
    toast.error('Kích hoạt lại khách hàng thất bại');
    return false;
  }
};

// ==================== DRONE OPERATIONS ====================

export const getDroneFleet = (): AdminDrone[] => {
  const initialData = getInitialAdminData();
  return getStorageData(STORAGE_KEYS.DRONES, initialData.drones);
};

export const flagDrone = (
  droneId: string,
  issueDescription: string,
  adminId: string,
  adminName: string
): boolean => {
  try {
    const drones = getDroneFleet();
    const droneIndex = drones.findIndex(d => d.id === droneId);
    
    if (droneIndex === -1) {
      toast.error('Không tìm thấy máy bay');
      return false;
    }
    
    const drone = drones[droneIndex];
    drones[droneIndex] = {
      ...drone,
      flaggedForIssue: true,
      issueDescription,
      status: 'Maintenance'
    };
    saveStorageData(STORAGE_KEYS.DRONES, drones);
    
    addSystemLog({
      adminId,
      adminName,
      action: 'drone_flagged',
      targetType: 'drone',
      targetId: droneId,
      targetName: droneId,
      details: `Flagged for issue: ${issueDescription}`,
      severity: 'warning'
    });
    
    toast.success(`Đánh dấu máy bay ${droneId} cần bảo trì`);
    return true;
  } catch (error) {
    console.error('Error flagging drone:', error);
    toast.error('Đánh dấu máy bay thất bại');
    return false;
  }
};

export const clearDroneFlag = (
  droneId: string,
  adminId: string,
  adminName: string
): boolean => {
  try {
    const drones = getDroneFleet();
    const droneIndex = drones.findIndex(d => d.id === droneId);
    
    if (droneIndex === -1) {
      toast.error('Không tìm thấy máy bay');
      return false;
    }
    
    const drone = drones[droneIndex];
    drones[droneIndex] = {
      ...drone,
      flaggedForIssue: false,
      issueDescription: undefined,
      status: 'Idle'
    };
    saveStorageData(STORAGE_KEYS.DRONES, drones);
    
    addSystemLog({
      adminId,
      adminName,
      action: 'drone_cleared',
      targetType: 'drone',
      targetId: droneId,
      targetName: droneId,
      details: `Cleared maintenance flag`,
      severity: 'info'
    });
    
    toast.success(`Xóa cờ máy bay ${droneId} và đặt về Rảnh rỗi`);
    return true;
  } catch (error) {
    console.error('Error clearing drone flag:', error);
    toast.error('Xóa cờ máy bay thất bại');
    return false;
  }
};

export const reassignDrone = (
  droneId: string,
  newRestaurantId: string,
  newRestaurantName: string,
  adminId: string,
  adminName: string
): boolean => {
  try {
    const drones = getDroneFleet();
    const restaurants = getAllRestaurants();
    
    const droneIndex = drones.findIndex(d => d.id === droneId);
    const newRestaurant = restaurants.find(r => r.id === newRestaurantId);
    
    if (droneIndex === -1) {
      toast.error('Không tìm thấy máy bay');
      return false;
    }
    
    if (!newRestaurant) {
      toast.error('Không tìm thấy nhà hàng đích');
      return false;
    }
    
    if (newRestaurant.status !== 'Active') {
      toast.error('Không thể phân công cho nhà hàng không hoạt động');
      return false;
    }
    
    const drone = drones[droneIndex];
    const oldRestaurantName = drone.restaurantName;
    
    drones[droneIndex] = {
      ...drone,
      restaurantId: newRestaurantId,
      restaurantName: newRestaurantName,
      status: 'Idle',
      currentOrderId: undefined
    };
    saveStorageData(STORAGE_KEYS.DRONES, drones);
    
    addSystemLog({
      adminId,
      adminName,
      action: 'drone_cleared',
      targetType: 'drone',
      targetId: droneId,
      targetName: droneId,
      details: `Reassigned from ${oldRestaurantName} to ${newRestaurantName}`,
      severity: 'info'
    });
    
    toast.success(`Phân công lại máy bay ${droneId} cho ${newRestaurantName}`);
    return true;
  } catch (error) {
    console.error('Error reassigning drone:', error);
    toast.error('Phân công lại máy bay thất bại');
    return false;
  }
};

// ==================== SYSTEM LOGS ====================

export const getSystemLogs = (): SystemLog[] => {
  const initialData = getInitialAdminData();
  return getStorageData(STORAGE_KEYS.LOGS, initialData.logs);
};

export const addSystemLog = (logData: Omit<SystemLog, 'id' | 'timestamp'>): void => {
  try {
    const logs = getSystemLogs();
    const newLog: SystemLog = {
      ...logData,
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now()
    };
    
    logs.unshift(newLog); // Add to beginning
    
    // Keep only last 100 logs
    if (logs.length > 100) {
      logs.splice(100);
    }
    
    saveStorageData(STORAGE_KEYS.LOGS, logs);
  } catch (error) {
    console.error('Error adding system log:', error);
  }
};

// ==================== STATISTICS ====================

export const getAdminStats = (): AdminStats => {
  const restaurants = getAllRestaurants();
  const customers = getAllCustomers();
  const drones = getDroneFleet();
  
  const activeRestaurants = restaurants.filter(r => r.status === 'Active').length;
  const pendingRestaurants = restaurants.filter(r => r.status === 'Pending').length;
  
  const totalOrders = restaurants.reduce((sum, r) => sum + r.totalOrders, 0);
  const totalRevenue = restaurants.reduce((sum, r) => sum + r.totalRevenue, 0);
  
  const activeDrones = drones.filter(d => d.status === 'Delivering').length;
  const idleDrones = drones.filter(d => d.status === 'Idle').length;
  const chargingDrones = drones.filter(d => d.status === 'Charging').length;
  const maintenanceDrones = drones.filter(d => d.status === 'Maintenance').length;
  
  return {
    totalCustomers: customers.length,
    totalRestaurants: restaurants.length,
    activeRestaurants,
    pendingRestaurants,
    totalOrders,
    totalRevenue,
    totalDrones: drones.length,
    activeDrones,
    idleDrones,
    chargingDrones,
    maintenanceDrones
  };
};

// ==================== EMERGENCY OVERRIDE ====================

export const performEmergencyOverride = (
  targetType: 'order' | 'restaurant' | 'drone',
  targetId: string,
  targetName: string,
  action: string,
  adminId: string,
  adminName: string
): boolean => {
  try {
    addSystemLog({
      adminId,
      adminName,
      action: 'emergency_override',
      targetType,
      targetId,
      targetName,
      details: `Emergency override: ${action}`,
      severity: 'critical'
    });
    
    toast.warning(`Thực hiện can thiệp khẩn cấp: ${action}`);
    return true;
  } catch (error) {
    console.error('Error performing emergency override:', error);
    toast.error('Thực hiện can thiệp khẩn cấp thất bại');
    return false;
  }
};

