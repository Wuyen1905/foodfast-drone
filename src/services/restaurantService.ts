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

// SweetDreams Bakery Data
const sweetDreamsData = {
  id: "sweetdreams",
  name: "SweetDreams Bakery",
  drones: [
    { 
      id: "DRONE-SD-001", 
      status: "Đang giao hàng" as const, 
      pin: 59, 
      speed: 46,
      battery: 78,
      location: "Quận 1, TP.HCM",
      currentOrder: "ORD-SD-69628",
      estimatedArrival: "15 phút"
    },
    { 
      id: "DRONE-SD-002", 
      status: "Sẵn sàng" as const, 
      pin: 95, 
      speed: 0,
      battery: 100,
      location: "SweetDreams Bakery",
      estimatedArrival: undefined
    },
    { 
      id: "DRONE-SD-003", 
      status: "Đang bay tới" as const, 
      pin: 72, 
      speed: 38,
      battery: 65,
      location: "Quận 3, TP.HCM",
      currentOrder: "ORD-SD-71245",
      estimatedArrival: "8 phút"
    }
  ],
  orders: [
    { 
      id: "ORD-SD-69628", 
      status: "Đang giao hàng" as const, 
      total: 450000,
      customerName: "Phạm Thị Mai",
      customerPhone: "0901234567",
      items: [
        { name: "Bánh mì thịt nướng", quantity: 2, price: 250000 },
        { name: "Cà phê sữa đá", quantity: 2, price: 200000 }
      ],
      orderTime: "14:30",
      estimatedDelivery: "15:00",
      droneId: "DRONE-SD-001"
    },
    { 
      id: "ORD-SD-71245", 
      status: "Đang chuẩn bị" as const, 
      total: 320000,
      customerName: "Nguyễn Văn Nam",
      customerPhone: "0902345678",
      items: [
        { name: "Bánh croissant", quantity: 3, price: 180000 },
        { name: "Trà sữa trân châu", quantity: 1, price: 140000 }
      ],
      orderTime: "14:45",
      estimatedDelivery: "15:15",
      droneId: "DRONE-SD-003"
    },
    { 
      id: "ORD-SD-68912", 
      status: "Hoàn thành" as const, 
      total: 280000,
      customerName: "Trần Thị Hoa",
      customerPhone: "0903456789",
      items: [
        { name: "Bánh mì pate", quantity: 1, price: 150000 },
        { name: "Nước cam tươi", quantity: 1, price: 130000 }
      ],
      orderTime: "13:20",
      estimatedDelivery: "13:50",
      droneId: "DRONE-SD-002"
    }
  ],
  revenue: 12450000,
  ordersToday: 23,
  avgDeliveryTime: 18,
  rating: 4.8,
  topItems: [
    { name: "Bánh mì thịt nướng", orders: 45, revenue: 5625000 },
    { name: "Cà phê sữa đá", orders: 38, revenue: 3800000 },
    { name: "Bánh croissant", orders: 32, revenue: 1920000 },
    { name: "Trà sữa trân châu", orders: 28, revenue: 3920000 }
  ]
};

// Aloha Kitchen Data
const alohaData = {
  id: "aloha",
  name: "Aloha Kitchen",
  drones: [
    { 
      id: "DRONE-AK-001", 
      status: "Đang bay tới" as const, 
      pin: 82, 
      speed: 40,
      battery: 85,
      location: "Quận 3, TP.HCM",
      currentOrder: "ORD-AK-81302",
      estimatedArrival: "12 phút"
    },
    { 
      id: "DRONE-AK-002", 
      status: "Đang trở về" as const, 
      pin: 67, 
      speed: 35,
      battery: 45,
      location: "Quận 7, TP.HCM",
      currentOrder: "ORD-AK-78945",
      estimatedArrival: "18 phút"
    }
  ],
  orders: [
    { 
      id: "ORD-AK-81302", 
      status: "Đang chuẩn bị" as const, 
      total: 320000,
      customerName: "Lê Văn Minh",
      customerPhone: "0904567890",
      items: [
        { name: "Phở bò", quantity: 1, price: 180000 },
        { name: "Chả cá Lã Vọng", quantity: 1, price: 140000 }
      ],
      orderTime: "14:50",
      estimatedDelivery: "15:20",
      droneId: "DRONE-AK-001"
    },
    { 
      id: "ORD-AK-78945", 
      status: "Hoàn thành" as const, 
      total: 450000,
      customerName: "Hoàng Thị Linh",
      customerPhone: "0905678901",
      items: [
        { name: "Bún bò Huế", quantity: 1, price: 200000 },
        { name: "Nem nướng", quantity: 2, price: 250000 }
      ],
      orderTime: "13:15",
      estimatedDelivery: "13:45",
      droneId: "DRONE-AK-002"
    },
    { 
      id: "ORD-AK-80123", 
      status: "Đang chuẩn bị" as const, 
      total: 280000,
      customerName: "Vũ Thị Lan",
      customerPhone: "0906789012",
      items: [
        { name: "Cơm tấm sườn nướng", quantity: 1, price: 150000 },
        { name: "Canh chua cá", quantity: 1, price: 130000 }
      ],
      orderTime: "15:00",
      estimatedDelivery: "15:30",
      droneId: undefined
    }
  ],
  revenue: 8450000,
  ordersToday: 18,
  avgDeliveryTime: 22,
  rating: 4.6,
  topItems: [
    { name: "Phở bò", orders: 32, revenue: 5760000 },
    { name: "Bún bò Huế", orders: 28, revenue: 5600000 },
    { name: "Cơm tấm sườn nướng", orders: 25, revenue: 3750000 },
    { name: "Chả cá Lã Vọng", orders: 22, revenue: 3080000 }
  ]
};

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

// Helper function to get restaurant data by ID
const getRestaurantData = (id: string) => {
  switch (id.toLowerCase()) {
    case 'sweetdreams':
    case 'rest_2':
    case 'sweetdreams_restaurant':
      return sweetDreamsData;
    case 'aloha':
    case 'restaurant_2':
    case 'aloha_restaurant':
      return alohaData;
    default:
      return null;
  }
};

/**
 * Get restaurant overview data
 */
export const getRestaurantOverview = async (id: string): Promise<RestaurantOverview | null> => {
  await simulateDelay();
  
  const data = getRestaurantData(id);
  if (!data) return null;
  
  return {
    id: data.id,
    name: data.name,
    revenue: addVariation(data.revenue, 3),
    ordersToday: addVariation(data.ordersToday, 8),
    activeDrones: data.drones.filter(d => d.status !== 'Sẵn sàng' && d.status !== 'Bảo trì').length,
    avgDeliveryTime: addVariation(data.avgDeliveryTime, 5),
    rating: Math.round((data.rating + (Math.random() - 0.5) * 0.1) * 10) / 10,
    topItems: data.topItems.map(item => ({
      ...item,
      orders: addVariation(item.orders, 10),
      revenue: addVariation(item.revenue, 5)
    }))
  };
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
    // Fallback to mock data if API fails
    const data = getRestaurantData(id);
    if (!data) return [];
    
    return data.orders.map(order => ({
      ...order,
      total: addVariation(order.total, 3),
      items: order.items.map(item => ({
        ...item,
        price: addVariation(item.price, 2)
      }))
    }));
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
  await simulateDelay();
  
  const data = getRestaurantData(id);
  if (!data) return [];
  
  return data.drones.map(drone => ({
    ...drone,
    pin: Math.max(0, Math.min(100, addVariation(drone.pin, 8))),
    speed: Math.max(0, addVariation(drone.speed, 10)),
    battery: Math.max(0, Math.min(100, addVariation(drone.battery, 5)))
  }));
};

/**
 * Update drone status
 */
export const updateDroneStatus = async (id: string, droneId: string, status: Drone['status']): Promise<boolean> => {
  await simulateDelay();
  
  const data = getRestaurantData(id);
  if (!data) return false;
  
  const drone = data.drones.find(d => d.id === droneId);
  if (!drone) return false;
  
  drone.status = status;
  return true;
};

/**
 * Update order status via API
 */
export const updateOrderStatus = async (id: string, orderId: string, status: Order['status']): Promise<boolean> => {
  try {
    const RESTAURANT_ORDERS_URL = import.meta.env.VITE_RESTAURANT_ORDERS_API || 'http://localhost:3001/orders';
    
    // Map restaurant status to API status
    const apiStatus = mapRestaurantStatusToApiStatus(status);
    
    const response = await fetch(`${RESTAURANT_ORDERS_URL}/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: apiStatus,
        updatedAt: Date.now()
      })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update order status: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('[RestaurantService] Error updating order status:', error);
    // Fallback to mock data update if API fails
    await simulateDelay();
    const data = getRestaurantData(id);
    if (!data) return false;
    
    const order = data.orders.find(o => o.id === orderId);
    if (!order) return false;
    
    order.status = status;
    return true;
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
  await simulateDelay();
  
  const data = getRestaurantData(id);
  if (!data) return null;
  
  const baseRevenue = data.revenue;
  const baseOrders = data.ordersToday;
  
  switch (period) {
    case 'day':
      return {
        period: 'Hôm nay',
        revenue: addVariation(baseRevenue, 8),
        orders: addVariation(baseOrders, 12),
        avgOrderValue: addVariation(Math.floor(baseRevenue / baseOrders), 5),
        deliveryTime: addVariation(data.avgDeliveryTime, 8)
      };
    case 'week':
      return {
        period: 'Tuần này',
        revenue: addVariation(baseRevenue * 7, 5),
        orders: addVariation(baseOrders * 7, 8),
        avgOrderValue: addVariation(Math.floor(baseRevenue / baseOrders), 3),
        deliveryTime: addVariation(data.avgDeliveryTime, 5)
      };
    case 'month':
      return {
        period: 'Tháng này',
        revenue: addVariation(baseRevenue * 30, 3),
        orders: addVariation(baseOrders * 30, 5),
        avgOrderValue: addVariation(Math.floor(baseRevenue / baseOrders), 2),
        deliveryTime: addVariation(data.avgDeliveryTime, 3)
      };
    default:
      return {
        period: 'Hôm nay',
        revenue: addVariation(baseRevenue, 8),
        orders: addVariation(baseOrders, 12),
        avgOrderValue: addVariation(Math.floor(baseRevenue / baseOrders), 5),
        deliveryTime: addVariation(data.avgDeliveryTime, 8)
      };
  }
};

/**
 * Get real-time drone tracking data
 */
export const getDroneTrackingData = async (id: string) => {
  await simulateDelay();
  
  const data = getRestaurantData(id);
  if (!data) return [];
  
  return data.drones.map(drone => ({
    id: drone.id,
    status: drone.status,
    battery: Math.max(0, Math.min(100, addVariation(drone.battery, 3))),
    speed: Math.max(0, addVariation(drone.speed, 5)),
    location: drone.location,
    currentOrder: drone.currentOrder,
    estimatedArrival: drone.estimatedArrival,
    coordinates: {
      lat: 10.7769 + (Math.random() - 0.5) * 0.1,
      lng: 106.7009 + (Math.random() - 0.5) * 0.1
    }
  }));
};
