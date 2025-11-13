// Restaurant Order Service
// Simulates backend API calls for restaurant order management

import { Order, OrderStatus } from '@/context/OrderContext';

// Simulate network delay
const simulateDelay = (min: number = 300, max: number = 800): Promise<void> => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

/**
 * Normalize restaurant ID to handle different formats
 */
const normalizeRestaurantId = (id: string): string => {
  const map: Record<string, string> = {
    'rest_2': 'sweetdreams',
    'restaurant_2': 'aloha',
    'sweetdreams': 'sweetdreams',
    'aloha': 'aloha',
  };
  return map[id?.toLowerCase()] || id;
};

/**
 * Get all orders for a restaurant from API
 */
export const getRestaurantOrders = async (restaurantId: string): Promise<Order[]> => {
  try {
    const RESTAURANT_ORDERS_URL = import.meta.env.VITE_RESTAURANT_ORDERS_API || 'http://localhost:3001/orders';
    
    // Normalize restaurant ID for API query
    let restaurantIdParam = restaurantId;
    if (restaurantId.toLowerCase() === 'sweetdreams') {
      restaurantIdParam = 'rest_2';
    } else if (restaurantId.toLowerCase() === 'aloha') {
      restaurantIdParam = 'restaurant_2';
    }
    
    const response = await fetch(`${RESTAURANT_ORDERS_URL}?restaurantId=${restaurantIdParam}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status}`);
    }
    
    const apiOrders = await response.json();
    
    // Map API orders to OrderContext Order type
    return apiOrders.map((apiOrder: any) => ({
      id: apiOrder.id,
      name: apiOrder.customerName || apiOrder.name || '',
      phone: apiOrder.customerPhone || apiOrder.phone || '',
      address: apiOrder.address || apiOrder.customerAddress || '',
      items: (apiOrder.items || []).map((item: any) => ({
        name: item.name,
        qty: item.quantity || item.qty || 1,
        price: item.price || 0
      })),
      total: apiOrder.total || 0,
      status: mapApiStatusToOrderStatus(apiOrder.status),
      restaurantId: apiOrder.restaurantId,
      createdAt: apiOrder.createdAt || Date.now(),
      updatedAt: apiOrder.updatedAt || Date.now()
    }));
  } catch (error) {
    console.error('[RestaurantOrderService] Error fetching orders from API:', error);
    // Fallback to localStorage if API fails
    await simulateDelay();
    const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
    const normalizedId = normalizeRestaurantId(restaurantId);
    
    return orders.filter((order: Order) => {
      if (!order.restaurantId) return false;
      const normalizedOrderId = normalizeRestaurantId(order.restaurantId);
      return normalizedOrderId === normalizedId;
    });
  }
};

// Helper to map API status to OrderStatus
const mapApiStatusToOrderStatus = (apiStatus: string): OrderStatus => {
  const statusMap: Record<string, OrderStatus> = {
    'pending': 'Pending',
    'preparing': 'In Progress',
    'confirmed': 'Confirmed',
    'in progress': 'In Progress',
    'ready': 'Ready',
    'delivering': 'Delivering',
    'Đang giao': 'Delivering',
    'delivered': 'Delivered',
    'Đã giao': 'Delivered',
    'completed': 'Delivered',
    'cancelled': 'Cancelled',
    'Đã hủy': 'Cancelled'
  };
  return statusMap[apiStatus?.toLowerCase()] || 'Pending';
};

/**
 * Confirm an order
 * Uses backend API and triggers WebSocket broadcast
 */
export const confirmOrder = async (orderId: string, confirmedBy?: string): Promise<boolean> => {
  try {
    // Use backend API service
    const { patchOrder } = await import('./orderApiService');
    
    // Update order status to Confirmed via backend API
    await patchOrder(orderId, {
      status: 'confirmed',
      confirmedAt: Date.now(),
      confirmedBy: confirmedBy,
      updatedAt: Date.now()
    });
    
    console.log(`✅ [restaurantOrderService] Order ${orderId} confirmed via API`);
    
    // Note: WebSocket broadcast is handled by backend
    return true;
  } catch (error) {
    console.error('[RestaurantOrderService] Error confirming order:', error);
    throw error;
  }
};

/**
 * Reject/Cancel an order
 * Uses backend API and triggers WebSocket broadcast
 */
export const rejectOrder = async (orderId: string, reason?: string): Promise<boolean> => {
  try {
    // Use backend API service
    const { patchOrder, fetchOrderById } = await import('./orderApiService');
    
    // Get existing order to preserve internalNotes
    const existingOrder = await fetchOrderById(orderId);
    const updatedNotes = reason
      ? (existingOrder?.internalNotes
          ? `${existingOrder.internalNotes}\n[Rejected]: ${reason}`
          : `[Rejected]: ${reason}`)
      : existingOrder?.internalNotes;
    
    // Update order status to Cancelled via backend API
    await patchOrder(orderId, {
      status: 'cancelled',
      cancelledAt: Date.now(),
      internalNotes: updatedNotes,
      updatedAt: Date.now()
    });
    
    console.log(`✅ [restaurantOrderService] Order ${orderId} rejected via API`);
    
    // Note: WebSocket broadcast is handled by backend
    return true;
  } catch (error) {
    console.error('[RestaurantOrderService] Error rejecting order:', error);
    throw error;
  }
};

/**
 * Update order status via API
 * Uses backend API and triggers WebSocket broadcast for real-time sync
 */
export const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<boolean> => {
  try {
    // Use backend API service for status updates
    const { patchOrder } = await import('./orderApiService');
    
    // Map OrderStatus to API status format
    const apiStatus = mapOrderStatusToApiStatus(status);
    
    // Handle drone assignment/release based on status
    if (status === 'Delivering') {
      // Assign drone to order when status changes to "Delivering"
      try {
        const { assignDroneToOrder } = await import('./droneService');
        // Get order to find restaurantId
        const { fetchOrderById } = await import('./orderApiService');
        const order = await fetchOrderById(orderId);
        if (order && order.restaurantId) {
          await assignDroneToOrder(orderId, order.restaurantId);
          console.log(`✅ [restaurantOrderService] Drone assigned to order ${orderId}`);
        }
      } catch (error) {
        console.error(`❌ [restaurantOrderService] Error assigning drone to order ${orderId}:`, error);
        // Continue with status update even if drone assignment fails
      }
    } else if (status === 'Delivered' || status === 'Completed') {
      // Release drone from order when status changes to "Delivered"
      try {
        const { releaseDroneFromOrder } = await import('./droneService');
        await releaseDroneFromOrder(orderId);
        console.log(`✅ [restaurantOrderService] Drone released from order ${orderId}`);
      } catch (error) {
        console.error(`❌ [restaurantOrderService] Error releasing drone from order ${orderId}:`, error);
        // Continue with status update even if drone release fails
      }
    }
    
    // Update order status via backend API (this will trigger WebSocket broadcast on backend)
    const updatedOrder = await patchOrder(orderId, { 
      status: apiStatus,
      updatedAt: Date.now()
    });
    
    console.log(`✅ [restaurantOrderService] Order ${orderId} status updated to ${status} via API`);
    
    // Note: WebSocket broadcast is handled by backend OrderController.patchOrder()
    // The backend will automatically publish the update to /topic/orders
    // Frontend components listening to WebSocket will receive the update automatically
    
    return true;
  } catch (error) {
    console.error('[RestaurantOrderService] Error updating order status:', error);
    // Fallback: Still update local state for UI responsiveness
    // But note that WebSocket won't broadcast this change
    const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex !== -1) {
      const order = orders[orderIndex];
      orders[orderIndex] = {
        ...order,
        status,
        updatedAt: Date.now()
      };
      localStorage.setItem('orders', JSON.stringify(orders));
    }
    
    throw error; // Re-throw to let caller handle the error
  }
};

// Helper to map OrderStatus to API status
const mapOrderStatusToApiStatus = (status: OrderStatus): string => {
  const statusMap: Record<OrderStatus, string> = {
    'Pending': 'pending',
    'Confirmed': 'confirmed',
    'In Progress': 'preparing',
    'Ready': 'ready',
    'Delivering': 'delivering',
    'Delivered': 'delivered',
    'Cancelled': 'cancelled'
  };
  return statusMap[status] || 'pending';
};

/**
 * Add internal note to order
 * Uses backend API and triggers WebSocket broadcast
 */
export const addOrderNote = async (orderId: string, note: string): Promise<boolean> => {
  try {
    // Use backend API service
    const { patchOrder, fetchOrderById } = await import('./orderApiService');
    
    // Get existing order to preserve internalNotes
    const existingOrder = await fetchOrderById(orderId);
    const timestamp = new Date().toLocaleString('vi-VN');
    const noteWithTimestamp = `[${timestamp}]: ${note}`;
    const updatedNotes = existingOrder?.internalNotes
      ? `${existingOrder.internalNotes}\n${noteWithTimestamp}`
      : noteWithTimestamp;
    
    // Update order with new note via backend API
    await patchOrder(orderId, {
      internalNotes: updatedNotes,
      updatedAt: Date.now()
    });
    
    console.log(`✅ [restaurantOrderService] Note added to order ${orderId} via API`);
    
    // Note: WebSocket broadcast is handled by backend
    return true;
  } catch (error) {
    console.error('[RestaurantOrderService] Error adding order note:', error);
    throw error;
  }
};

/**
 * Get order status flow (next possible statuses)
 */
export const getNextStatuses = (currentStatus: OrderStatus): OrderStatus[] => {
  const statusFlow: Record<OrderStatus, OrderStatus[]> = {
    'Pending': ['Confirmed', 'Cancelled'],
    'Confirmed': ['In Progress', 'Cancelled'],
    'In Progress': ['Ready', 'Cancelled'],
    'Ready': ['Delivering', 'Cancelled'],
    'Delivering': ['Delivered', 'Cancelled'],
    'Delivered': [],
    'Cancelled': []
  };
  
  return statusFlow[currentStatus] || [];
};

