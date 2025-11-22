// Restaurant Service - Individual restaurant data management
export interface Drone {
  id: string;
  status: 'Đang bay tới' | 'Đang giao hàng' | 'Đang trở về' | 'Sẵn sàng' | 'Bảo trì';
  pin: number;
  speed: number;
  battery: number;
  location: string;
  currentOrder?: string;
  estimatedArrival?: string;
}

export interface Order {
  id: string;
  status: 'Đang chuẩn bị' | 'Đang giao hàng' | 'Hoàn thành' | 'Hủy';
  total: number;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  orderTime: string;
  estimatedDelivery?: string;
  droneId?: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface RestaurantOverview {
  id: string;
  name: string;
  revenue: number;
  ordersToday: number;
  activeDrones: number;
  avgDeliveryTime: number;
  rating: number;
  topItems: Array<{
    name: string;
    orders: number;
    revenue: number;
  }>;
}

/**
 * Get restaurant overview data
 */
export const getRestaurantOverview = async (id: string): Promise<RestaurantOverview | null> => {
  try {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
    
    // Normalize restaurant ID
    let restaurantIdParam = id;
    if (id.toLowerCase() === 'sweetdreams') {
      restaurantIdParam = 'rest_2';
    } else if (id.toLowerCase() === 'aloha') {
      restaurantIdParam = 'restaurant_2';
    }
    
    const response = await fetch(`${API_BASE_URL}/analytics/restaurant/${restaurantIdParam}/overview`);
    if (!response.ok) {
      throw new Error(`Failed to fetch overview: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Map to RestaurantOverview format
    return {
      id: data.id || restaurantIdParam,
      name: data.name || '',
      revenue: data.revenue || 0,
      ordersToday: data.ordersToday || 0,
      activeDrones: data.activeDrones || 0,
      avgDeliveryTime: data.avgDeliveryTime || 18,
      rating: data.rating || 0,
      topItems: data.topItems || []
    };
  } catch (error) {
    console.error('[RestaurantService] Error fetching overview:', error);
    return null;
  }
};

/**
 * Get restaurant orders from API
 */
export const getRestaurantOrders = async (id: string): Promise<Order[]> => {
  try {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
    
    // Normalize restaurant ID for API query
    let restaurantIdParam = id;
    if (id.toLowerCase() === 'sweetdreams') {
      restaurantIdParam = 'rest_2';
    } else if (id.toLowerCase() === 'aloha') {
      restaurantIdParam = 'restaurant_2';
    }
    
    const response = await fetch(`${API_BASE_URL}/orders?restaurantId=${restaurantIdParam}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status}`);
    }
    
    const apiOrders = await response.json();
    
    // Map API orders to restaurant service Order type
    return apiOrders.map((apiOrder: any) => ({
      id: apiOrder.id,
      status: mapApiStatusToRestaurantStatus(apiOrder.status),
      total: apiOrder.total || 0,
      customerName: apiOrder.customerName || apiOrder.name || '',
      customerPhone: apiOrder.customerPhone || apiOrder.phone || '',
      items: (apiOrder.items || []).map((item: any) => ({
        name: item.name,
        quantity: item.quantity || item.qty || 1,
        price: item.price || 0
      })),
      orderTime: apiOrder.orderTime || new Date(apiOrder.createdAt || Date.now()).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      estimatedDelivery: apiOrder.estimatedDelivery,
      droneId: apiOrder.droneId
    }));
  } catch (error) {
    console.error('[RestaurantService] Error fetching orders from API:', error);
    return [];
  }
};

// Helper to map API status to restaurant service status
const mapApiStatusToRestaurantStatus = (apiStatus: string): Order['status'] => {
  const statusMap: Record<string, Order['status']> = {
    'pending': 'Đang chuẩn bị',
    'preparing': 'Đang chuẩn bị',
    'confirmed': 'Đang chuẩn bị',
    'in progress': 'Đang chuẩn bị',
    'ready': 'Đang chuẩn bị',
    'delivering': 'Đang giao hàng',
    'Đang giao': 'Đang giao hàng',
    'delivered': 'Hoàn thành',
    'Đã giao': 'Hoàn thành',
    'completed': 'Hoàn thành',
    'cancelled': 'Hủy',
    'Đã hủy': 'Hủy'
  };
  return statusMap[apiStatus?.toLowerCase()] || 'Đang chuẩn bị';
};

/**
 * Get restaurant drones
 */
export const getRestaurantDrones = async (id: string): Promise<Drone[]> => {
  try {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
    
    // Normalize restaurant ID
    let restaurantIdParam = id;
    if (id.toLowerCase() === 'sweetdreams') {
      restaurantIdParam = 'rest_2';
    } else if (id.toLowerCase() === 'aloha') {
      restaurantIdParam = 'restaurant_2';
    }
    
    const response = await fetch(`${API_BASE_URL}/drones?restaurantId=${restaurantIdParam}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch drones: ${response.status}`);
    }
    
    const apiDrones = await response.json();
    
    // Map API drones to restaurant service Drone format
    return apiDrones.map((d: any) => ({
      id: d.id,
      status: mapDroneStatusToRestaurantStatus(d.status),
      pin: d.battery || d.batteryLevel || 100,
      speed: 0, // Not available from backend
      battery: d.battery || d.batteryLevel || 100,
      location: d.restaurantName || '',
      currentOrder: d.currentOrderId || undefined,
      estimatedArrival: undefined
    }));
  } catch (error) {
    console.error('[RestaurantService] Error fetching drones:', error);
    return [];
  }
};

// Helper to map API drone status to restaurant service status
const mapDroneStatusToRestaurantStatus = (apiStatus: string): Drone['status'] => {
  const statusMap: Record<string, Drone['status']> = {
    'Idle': 'Sẵn sàng',
    'Delivering': 'Đang giao hàng',
    'Charging': 'Bảo trì',
    'Maintenance': 'Bảo trì'
  };
  return statusMap[apiStatus] || 'Sẵn sàng';
};

/**
 * Update drone status
 */
export const updateDroneStatus = async (id: string, droneId: string, status: Drone['status']): Promise<boolean> => {
  try {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
    
    // Map restaurant status to API status
    const apiStatus = mapRestaurantDroneStatusToApiStatus(status);
    
    const response = await fetch(`${API_BASE_URL}/drones/${droneId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: apiStatus
      })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update drone status: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('[RestaurantService] Error updating drone status:', error);
    return false;
  }
};

// Helper to map restaurant drone status to API status
const mapRestaurantDroneStatusToApiStatus = (status: Drone['status']): string => {
  const statusMap: Record<Drone['status'], string> = {
    'Đang bay tới': 'Delivering',
    'Đang giao hàng': 'Delivering',
    'Đang trở về': 'Idle',
    'Sẵn sàng': 'Idle',
    'Bảo trì': 'Maintenance'
  };
  return statusMap[status] || 'Idle';
};

/**
 * Update order status via API
 */
export const updateOrderStatus = async (id: string, orderId: string, status: Order['status']): Promise<boolean> => {
  try {
    const RESTAURANT_ORDERS_URL = import.meta.env.VITE_API_BASE_URL || '/api';
    
    // Map restaurant status to API status
    const apiStatus = mapRestaurantStatusToApiStatus(status);
    
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
    
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: apiStatus
      })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update order status: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('[RestaurantService] Error updating order status:', error);
    return false;
  }
};

// Helper to map restaurant service status to API status
const mapRestaurantStatusToApiStatus = (status: Order['status']): string => {
  const statusMap: Record<Order['status'], string> = {
    'Đang chuẩn bị': 'preparing',
    'Đang giao hàng': 'delivering',
    'Hoàn thành': 'delivered',
    'Hủy': 'cancelled'
  };
  return statusMap[status] || 'preparing';
};

/**
 * Get restaurant analytics for different periods
 */
export const getRestaurantAnalytics = async (id: string, period: 'day' | 'week' | 'month' = 'day') => {
  try {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
    
    // Normalize restaurant ID
    let restaurantIdParam = id;
    if (id.toLowerCase() === 'sweetdreams') {
      restaurantIdParam = 'rest_2';
    } else if (id.toLowerCase() === 'aloha') {
      restaurantIdParam = 'restaurant_2';
    }
    
    const response = await fetch(`${API_BASE_URL}/analytics/restaurant/${restaurantIdParam}?period=${period}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch analytics: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('[RestaurantService] Error fetching analytics:', error);
    return null;
  }
};

/**
 * Get real-time drone tracking data
 */
export const getDroneTrackingData = async (id: string) => {
  try {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
    
    // Normalize restaurant ID
    let restaurantIdParam = id;
    if (id.toLowerCase() === 'sweetdreams') {
      restaurantIdParam = 'rest_2';
    } else if (id.toLowerCase() === 'aloha') {
      restaurantIdParam = 'restaurant_2';
    }
    
    const response = await fetch(`${API_BASE_URL}/drones?restaurantId=${restaurantIdParam}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch drone tracking: ${response.status}`);
    }
    
    const drones = await response.json();
    
    // Map to tracking data format
    return drones.map((d: any) => ({
      id: d.id,
      status: d.status,
      battery: d.battery || d.batteryLevel || 100,
      currentOrder: d.currentOrderId,
      restaurantId: d.restaurantId || d.restaurant
    }));
  } catch (error) {
    console.error('[RestaurantService] Error fetching drone tracking:', error);
    return [];
  }
};
