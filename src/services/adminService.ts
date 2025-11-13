// Admin Service - Mock data for admin management
export interface Restaurant {
  id: string;
  name: string;
  location: string;
  rating: number;
  revenue: number;
  droneCount: number;
  owner: string;
  status: 'active' | 'inactive' | 'maintenance';
  cuisine: string;
  ordersToday: number;
  avgDeliveryTime: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: 'active' | 'inactive';
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
  source: string;
  details?: any;
}

export interface DroneFleet {
  id: string;
  status: 'active' | 'maintenance' | 'offline';
  battery: number;
  location: string;
  restaurantId: string;
  lastUpdate: string;
}

export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  avgDeliveryTime: number;
  systemUptime: number;
  activeDrones: number;
  totalCustomers: number;
}

export interface SystemStats {
  totalRestaurants: number;
  totalDrones: number;
  totalCustomers: number;
  totalRevenue: number;
  avgDeliveryTime: number;
  activeOrders: number;
  completedOrdersToday: number;
}

// Mock data for restaurants
const mockRestaurants: Restaurant[] = [
  {
    id: "sweetdreams",
    name: "SweetDreams Bakery",
    location: "Quận 1, TP.HCM",
    rating: 4.8,
    revenue: 12450000,
    droneCount: 3,
    owner: "Nguyễn Thị Lan",
    status: "active",
    cuisine: "Bakery & Desserts",
    ordersToday: 23,
    avgDeliveryTime: 18
  },
  {
    id: "aloha",
    name: "Aloha Kitchen",
    location: "Quận 3, TP.HCM",
    rating: 4.6,
    revenue: 8450000,
    droneCount: 2,
    owner: "Trần Minh Đức",
    status: "active",
    cuisine: "Asian Fusion",
    ordersToday: 18,
    avgDeliveryTime: 22
  },
  {
    id: "pizza_palace",
    name: "Pizza Palace",
    location: "Quận 7, TP.HCM",
    rating: 4.4,
    revenue: 15600000,
    droneCount: 4,
    owner: "Lê Văn Hùng",
    status: "active",
    cuisine: "Italian",
    ordersToday: 31,
    avgDeliveryTime: 25
  },
  {
    id: "sushi_master",
    name: "Sushi Master",
    location: "Quận 2, TP.HCM",
    rating: 4.9,
    revenue: 18900000,
    droneCount: 5,
    owner: "Yamamoto Hiroshi",
    status: "active",
    cuisine: "Japanese",
    ordersToday: 28,
    avgDeliveryTime: 20
  }
];

// Mock data for system logs
const mockSystemLogs: SystemLog[] = [
  {
    id: 'log_001',
    timestamp: '2024-01-15 14:30:25',
    level: 'info',
    message: 'Drone DRONE-SD-001 completed delivery to Quận 1',
    source: 'DroneController',
    details: { orderId: 'ORD-SD-69628', deliveryTime: '18 phút' }
  },
  {
    id: 'log_002',
    timestamp: '2024-01-15 14:25:10',
    level: 'warning',
    message: 'Drone DRONE-AK-002 battery low (45%)',
    source: 'BatteryMonitor',
    details: { droneId: 'DRONE-AK-002', battery: 45 }
  },
  {
    id: 'log_003',
    timestamp: '2024-01-15 14:20:15',
    level: 'success',
    message: 'New order received from SweetDreams Bakery',
    source: 'OrderProcessor',
    details: { orderId: 'ORD-SD-71245', amount: 320000 }
  },
  {
    id: 'log_004',
    timestamp: '2024-01-15 14:15:30',
    level: 'error',
    message: 'Connection timeout to drone DRONE-SD-003',
    source: 'DroneController',
    details: { droneId: 'DRONE-SD-003', timeout: 30 }
  },
  {
    id: 'log_005',
    timestamp: '2024-01-15 14:10:45',
    level: 'info',
    message: 'System maintenance completed successfully',
    source: 'SystemMaintenance',
    details: { duration: '2 giờ 15 phút', components: ['Database', 'API Gateway'] }
  }
];

// Mock data for drone fleet
const mockDroneFleet: DroneFleet[] = [
  {
    id: 'DRONE-SD-001',
    status: 'active',
    battery: 78,
    location: 'Quận 1, TP.HCM',
    restaurantId: 'sweetdreams',
    lastUpdate: '2024-01-15 14:30:00'
  },
  {
    id: 'DRONE-SD-002',
    status: 'active',
    battery: 95,
    location: 'SweetDreams Bakery',
    restaurantId: 'sweetdreams',
    lastUpdate: '2024-01-15 14:25:00'
  },
  {
    id: 'DRONE-SD-003',
    status: 'maintenance',
    battery: 65,
    location: 'Service Center',
    restaurantId: 'sweetdreams',
    lastUpdate: '2024-01-15 13:45:00'
  },
  {
    id: 'DRONE-AK-001',
    status: 'active',
    battery: 85,
    location: 'Quận 3, TP.HCM',
    restaurantId: 'aloha',
    lastUpdate: '2024-01-15 14:28:00'
  },
  {
    id: 'DRONE-AK-002',
    status: 'active',
    battery: 45,
    location: 'Quận 7, TP.HCM',
    restaurantId: 'aloha',
    lastUpdate: '2024-01-15 14:20:00'
  }
];

// Mock data for customers
const mockCustomers: Customer[] = [
  {
    id: "customer_001",
    name: "Phạm Thị Mai",
    email: "mai.pham@email.com",
    phone: "0901234567",
    totalOrders: 15,
    totalSpent: 2450000,
    lastOrderDate: "2024-01-15",
    status: "active"
  },
  {
    id: "customer_002",
    name: "Nguyễn Văn Nam",
    email: "nam.nguyen@email.com",
    phone: "0902345678",
    totalOrders: 8,
    totalSpent: 1200000,
    lastOrderDate: "2024-01-14",
    status: "active"
  },
  {
    id: "customer_003",
    name: "Trần Thị Hoa",
    email: "hoa.tran@email.com",
    phone: "0903456789",
    totalOrders: 22,
    totalSpent: 3800000,
    lastOrderDate: "2024-01-15",
    status: "active"
  },
  {
    id: "customer_004",
    name: "Lê Văn Minh",
    email: "minh.le@email.com",
    phone: "0904567890",
    totalOrders: 5,
    totalSpent: 850000,
    lastOrderDate: "2024-01-10",
    status: "inactive"
  },
  {
    id: "customer_005",
    name: "Hoàng Thị Linh",
    email: "linh.hoang@email.com",
    phone: "0905678901",
    totalOrders: 12,
    totalSpent: 2100000,
    lastOrderDate: "2024-01-13",
    status: "active"
  }
];

// Helper function to simulate network delay
const simulateDelay = (min: number = 800, max: number = 1500): Promise<void> => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Helper function to add small random variations
const addVariation = (value: number, variationPercent: number = 5): number => {
  const variation = (Math.random() - 0.5) * 2 * (variationPercent / 100);
  return Math.round(value * (1 + variation));
};

/**
 * Get all restaurants with their profiles
 */
export const getAllRestaurants = async (): Promise<Restaurant[]> => {
  await simulateDelay();
  
  // Add small variations to make data more realistic
  return mockRestaurants.map(restaurant => ({
    ...restaurant,
    revenue: addVariation(restaurant.revenue, 3),
    rating: Math.round((restaurant.rating + (Math.random() - 0.5) * 0.2) * 10) / 10,
    ordersToday: addVariation(restaurant.ordersToday, 10),
    avgDeliveryTime: addVariation(restaurant.avgDeliveryTime, 8)
  }));
};

/**
 * Get all customers
 */
export const getAllCustomers = async (): Promise<Customer[]> => {
  await simulateDelay();
  
  return mockCustomers.map(customer => ({
    ...customer,
    totalSpent: addVariation(customer.totalSpent, 5),
    totalOrders: addVariation(customer.totalOrders, 8)
  }));
};

/**
 * Get system-wide statistics
 */
export const getSystemStats = async (): Promise<SystemStats> => {
  await simulateDelay();
  
  const totalRevenue = mockRestaurants.reduce((sum, r) => sum + r.revenue, 0);
  const totalDrones = mockRestaurants.reduce((sum, r) => sum + r.droneCount, 0);
  const totalOrdersToday = mockRestaurants.reduce((sum, r) => sum + r.ordersToday, 0);
  const avgDeliveryTime = mockRestaurants.reduce((sum, r) => sum + r.avgDeliveryTime, 0) / mockRestaurants.length;
  
  return {
    totalRestaurants: mockRestaurants.length,
    totalDrones: addVariation(totalDrones, 2),
    totalCustomers: mockCustomers.length,
    totalRevenue: addVariation(totalRevenue, 3),
    avgDeliveryTime: Math.round(avgDeliveryTime * 10) / 10,
    activeOrders: addVariation(totalOrdersToday, 15),
    completedOrdersToday: addVariation(Math.floor(totalOrdersToday * 0.85), 10)
  };
};

/**
 * Get restaurant by ID
 * Handles different restaurant ID formats: rest_2, restaurant_2, sweetdreams, aloha
 */
export const getRestaurantById = async (id: string): Promise<Restaurant | null> => {
  await simulateDelay();
  
  if (!id) return null;
  
  // Normalize restaurant ID to match mock data format
  // Map database IDs (rest_2, restaurant_2) to mock data IDs (sweetdreams, aloha)
  const normalizeRestaurantId = (restaurantId: string): string => {
    const normalized = restaurantId.toLowerCase().trim();
    
    // Map database format to mock data format
    if (normalized === 'rest_2' || normalized === 'sweetdreams') {
      return 'sweetdreams';
    }
    if (normalized === 'restaurant_2' || normalized === 'aloha' || normalized === 'aloha kitchen') {
      return 'aloha';
    }
    
    // Return as-is if already in correct format
    return normalized;
  };
  
  const normalizedId = normalizeRestaurantId(id);
  const restaurant = mockRestaurants.find(r => r.id === normalizedId || r.id === id);
  
  if (!restaurant) return null;
  
  return {
    ...restaurant,
    revenue: addVariation(restaurant.revenue, 3),
    rating: Math.round((restaurant.rating + (Math.random() - 0.5) * 0.2) * 10) / 10,
    ordersToday: addVariation(restaurant.ordersToday, 10),
    avgDeliveryTime: addVariation(restaurant.avgDeliveryTime, 8)
  };
};

/**
 * Get customer by ID
 */
export const getCustomerById = async (id: string): Promise<Customer | null> => {
  await simulateDelay();
  
  const customer = mockCustomers.find(c => c.id === id);
  if (!customer) return null;
  
  return {
    ...customer,
    totalSpent: addVariation(customer.totalSpent, 5),
    totalOrders: addVariation(customer.totalOrders, 8)
  };
};

/**
 * Update restaurant status
 */
export const updateRestaurantStatus = async (id: string, status: Restaurant['status']): Promise<boolean> => {
  await simulateDelay();
  
  const restaurant = mockRestaurants.find(r => r.id === id);
  if (!restaurant) return false;
  
  restaurant.status = status;
  return true;
};

/**
 * Get drone fleet status
 * Enhanced to integrate with droneManager for health scores and extended data
 */
export const getDroneFleet = async (): Promise<DroneFleet[]> => {
  await simulateDelay();
  
  try {
    // Try to fetch from API first (if available)
    const axios = (await import('axios')).default;
    try {
      const response = await axios.get('http://localhost:3001/drones');
      const apiDrones = response.data || [];
      
      // Transform API drones to DroneFleet format with health scores
      return apiDrones.map((drone: any) => {
        // Calculate health score if not present
        const battery = drone.battery || 0;
        const missions = drone.missionsCompleted || 0;
        const normalizedMissions = Math.min(missions / 200, 1) * 100;
        const healthScore = (battery * normalizedMissions) / 100;
        
        return {
          id: drone.id || drone.droneCode || '',
          status: drone.status === 'delivering' ? 'active' : 
                  drone.status === 'returning' ? 'maintenance' : 
                  drone.status === 'offline' ? 'offline' : 'active',
          battery: Math.max(0, Math.min(100, battery)),
          location: drone.position ? `${drone.position.lat}, ${drone.position.lng}` : 'Unknown',
          restaurantId: drone.restaurantId || drone.restaurant || '',
          lastUpdate: drone.updatedAt || new Date().toISOString()
        };
      });
    } catch (apiError) {
      // Fallback to mock data if API fails
      console.warn('[adminService] API fetch failed, using mock data');
    }
  } catch (error) {
    console.warn('[adminService] Error importing axios, using mock data');
  }
  
  // Fallback to mock data
  return mockDroneFleet.map(drone => ({
    ...drone,
    battery: Math.max(0, Math.min(100, addVariation(drone.battery || 75, 5)))
  }));
};

/**
 * Get system logs
 */
export const getSystemLogs = async (): Promise<SystemLog[]> => {
  await simulateDelay();
  
  return [...mockSystemLogs].reverse(); // Most recent first
};

/**
 * Get admin statistics
 * Enhanced to integrate with realtime stats when available
 */
export const getAdminStats = async (): Promise<AdminStats & { 
  totalRestaurants?: number;
  activeRestaurants?: number;
  pendingRestaurants?: number;
  maintenanceDrones?: number;
}> => {
  await simulateDelay();
  
  try {
    // Try to fetch realtime stats from API
    const axios = (await import('axios')).default;
    try {
      const [realtimeResponse, restaurantsResponse] = await Promise.all([
        axios.get('http://localhost:3001/realtimeStats').catch(() => null),
        axios.get('http://localhost:3001/restaurants').catch(() => null)
      ]);
      
      const realtimeStats = realtimeResponse?.data;
      const apiRestaurants = restaurantsResponse?.data || [];
      const apiDrones = await getDroneFleet();
      
      const totalRevenue = apiRestaurants.reduce((sum: number, r: any) => sum + (r.revenue || 0), 0) ||
                          mockRestaurants.reduce((sum, r) => sum + r.revenue, 0);
      const totalOrders = realtimeStats?.totalOrders || 
                         apiRestaurants.reduce((sum: number, r: any) => sum + (r.ordersToday || 0), 0) ||
                         mockRestaurants.reduce((sum, r) => sum + r.ordersToday, 0);
      const avgDeliveryTime = apiRestaurants.length > 0 ?
        apiRestaurants.reduce((sum: number, r: any) => sum + (r.avgDeliveryTime || 0), 0) / apiRestaurants.length :
        mockRestaurants.reduce((sum, r) => sum + r.avgDeliveryTime, 0) / mockRestaurants.length;
      const activeDrones = apiDrones.filter(d => d.status === 'active').length;
      const maintenanceDrones = apiDrones.filter(d => d.status === 'maintenance').length;
      const activeRestaurants = apiRestaurants.filter((r: any) => r.isActive !== false).length;
      
      return {
        totalRevenue: addVariation(totalRevenue, 3),
        totalOrders: addVariation(totalOrders, 8),
        avgDeliveryTime: Math.round(avgDeliveryTime * 10) / 10,
        systemUptime: addVariation(99.8, 0.5),
        activeDrones: activeDrones,
        totalCustomers: mockCustomers.length,
        totalRestaurants: apiRestaurants.length || mockRestaurants.length,
        activeRestaurants: activeRestaurants || mockRestaurants.filter(r => r.status === 'active').length,
        pendingRestaurants: 0, // Can be extended later
        maintenanceDrones: maintenanceDrones
      };
    } catch (apiError) {
      console.warn('[adminService] API fetch failed, using mock data');
    }
  } catch (error) {
    console.warn('[adminService] Error fetching stats, using mock data');
  }
  
  // Fallback to mock data
  const totalRevenue = mockRestaurants.reduce((sum, r) => sum + r.revenue, 0);
  const totalOrders = mockRestaurants.reduce((sum, r) => sum + r.ordersToday, 0);
  const avgDeliveryTime = mockRestaurants.reduce((sum, r) => sum + r.avgDeliveryTime, 0) / mockRestaurants.length;
  const activeDrones = mockDroneFleet.filter(d => d.status === 'active').length;
  
  return {
    totalRevenue: addVariation(totalRevenue, 3),
    totalOrders: addVariation(totalOrders, 8),
    avgDeliveryTime: Math.round(avgDeliveryTime * 10) / 10,
    systemUptime: addVariation(99.8, 0.5),
    activeDrones: activeDrones,
    totalCustomers: mockCustomers.length,
    totalRestaurants: mockRestaurants.length,
    activeRestaurants: mockRestaurants.filter(r => r.status === 'active').length,
    pendingRestaurants: 0,
    maintenanceDrones: mockDroneFleet.filter(d => d.status === 'maintenance').length
  };
};

/**
 * Suspend customer account
 */
export const suspendCustomer = async (customerId: string): Promise<boolean> => {
  await simulateDelay();
  
  const customer = mockCustomers.find(c => c.id === customerId);
  if (!customer) return false;
  
  customer.status = 'inactive';
  return true;
};

/**
 * Reactivate customer account
 */
export const reactivateCustomer = async (customerId: string): Promise<boolean> => {
  await simulateDelay();
  
  const customer = mockCustomers.find(c => c.id === customerId);
  if (!customer) return false;
  
  customer.status = 'active';
  return true;
};

/**
 * Flag drone for maintenance
 */
export const flagDrone = async (droneId: string, reason: string): Promise<boolean> => {
  await simulateDelay();
  
  const drone = mockDroneFleet.find(d => d.id === droneId);
  if (!drone) return false;
  
  drone.status = 'maintenance';
  console.log(`Drone ${droneId} flagged for maintenance: ${reason}`);
  return true;
};

/**
 * Clear drone flag
 */
export const clearDroneFlag = async (droneId: string): Promise<boolean> => {
  await simulateDelay();
  
  const drone = mockDroneFleet.find(d => d.id === droneId);
  if (!drone) return false;
  
  drone.status = 'active';
  console.log(`Drone ${droneId} flag cleared`);
  return true;
};

/**
 * Reassign drone to different restaurant
 */
export const reassignDrone = async (droneId: string, newRestaurantId: string): Promise<boolean> => {
  await simulateDelay();
  
  const drone = mockDroneFleet.find(d => d.id === droneId);
  if (!drone) return false;
  
  drone.restaurantId = newRestaurantId;
  console.log(`Drone ${droneId} reassigned to restaurant ${newRestaurantId}`);
  return true;
};

/**
 * Perform emergency override
 * Extended signature to support AdminDashboard requirements
 */
export const performEmergencyOverride = async (
  targetType: 'order' | 'restaurant' | 'drone',
  targetId: string,
  targetName: string,
  action: string,
  adminId?: string,
  adminName?: string
): Promise<boolean> => {
  await simulateDelay();
  
  console.log(`Emergency override: ${action} on ${targetType} ${targetId} (${targetName}) by ${adminName || 'admin'}`);
  
  // Simulate emergency actions based on target type
  switch (targetType) {
    case 'drone':
      const drone = mockDroneFleet.find(d => d.id === targetId);
      if (drone) {
        if (action.includes('stop') || action.includes('offline')) {
          drone.status = 'offline';
        } else if (action.includes('return') || action.includes('recall')) {
          drone.status = 'returning';
        } else if (action.includes('maintenance')) {
          drone.status = 'maintenance';
        }
        return true;
      }
      break;
    case 'restaurant':
      const restaurant = mockRestaurants.find(r => r.id === targetId);
      if (restaurant) {
        if (action.includes('pause') || action.includes('suspend') || action.includes('deactivate')) {
          restaurant.status = 'inactive';
        } else if (action.includes('activate') || action.includes('resume')) {
          restaurant.status = 'active';
        }
        return true;
      }
      break;
    case 'order':
      // Order override logic (would need access to orders array)
      console.log(`Order override: ${action} on order ${targetId}`);
      return true;
    default:
      return false;
  }
  
  return false;
};

/**
 * Get revenue analytics for a specific period
 */
export const getRevenueAnalytics = async (period: 'day' | 'week' | 'month' = 'day') => {
  await simulateDelay();
  
  const baseRevenue = mockRestaurants.reduce((sum, r) => sum + r.revenue, 0);
  
  switch (period) {
    case 'day':
      return {
        period: 'Hôm nay',
        revenue: addVariation(baseRevenue, 8),
        orders: addVariation(45, 12),
        avgOrderValue: addVariation(Math.floor(baseRevenue / 45), 5)
      };
    case 'week':
      return {
        period: 'Tuần này',
        revenue: addVariation(baseRevenue * 7, 5),
        orders: addVariation(315, 8),
        avgOrderValue: addVariation(Math.floor(baseRevenue / 45), 3)
      };
    case 'month':
      return {
        period: 'Tháng này',
        revenue: addVariation(baseRevenue * 30, 3),
        orders: addVariation(1350, 5),
        avgOrderValue: addVariation(Math.floor(baseRevenue / 45), 2)
      };
    default:
      return {
        period: 'Hôm nay',
        revenue: addVariation(baseRevenue, 8),
        orders: addVariation(45, 12),
        avgOrderValue: addVariation(Math.floor(baseRevenue / 45), 5)
      };
  }
};