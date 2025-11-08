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
 * Get all orders for a restaurant
 * Simulates: GET /api/restaurants/{id}/orders
 */
export const getRestaurantOrders = async (restaurantId: string): Promise<Order[]> => {
  await simulateDelay();
  
  // In a real application, this would be:
  // const response = await fetch(`/api/restaurants/${restaurantId}/orders`, {
  //   method: 'GET',
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });
  // if (!response.ok) throw new Error('Failed to fetch orders');
  // return response.json();
  
  // For now, get from localStorage via OrderContext
  const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
  const normalizedId = normalizeRestaurantId(restaurantId);
  
  return orders.filter((order: Order) => {
    if (!order.restaurantId) return false;
    const normalizedOrderId = normalizeRestaurantId(order.restaurantId);
    return normalizedOrderId === normalizedId;
  });
};

/**
 * Confirm an order
 * Simulates: POST /api/orders/{orderId}/confirm
 */
export const confirmOrder = async (orderId: string, confirmedBy?: string): Promise<boolean> => {
  await simulateDelay();
  
  // In a real application, this would be:
  // const response = await fetch(`/api/orders/${orderId}/confirm`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ confirmedBy })
  // });
  // return response.ok;
  
  // For now, update localStorage
  const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
  const orderIndex = orders.findIndex(o => o.id === orderId);
  
  if (orderIndex === -1) {
    return false;
  }
  
  orders[orderIndex] = {
    ...orders[orderIndex],
    status: 'Confirmed',
    confirmedAt: Date.now(),
    confirmedBy: confirmedBy || orders[orderIndex].confirmedBy,
    updatedAt: Date.now()
  };
  
  localStorage.setItem('orders', JSON.stringify(orders));
  
  // Dispatch event for real-time updates
  window.dispatchEvent(new CustomEvent('orderUpdated', {
    detail: { orderId, status: 'Confirmed' }
  }));
  
  return true;
};

/**
 * Reject/Cancel an order
 * Simulates: POST /api/orders/{orderId}/reject
 */
export const rejectOrder = async (orderId: string, reason?: string): Promise<boolean> => {
  await simulateDelay();
  
  // In a real application, this would be:
  // const response = await fetch(`/api/orders/${orderId}/reject`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ reason })
  // });
  // return response.ok;
  
  // For now, update localStorage
  const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
  const orderIndex = orders.findIndex(o => o.id === orderId);
  
  if (orderIndex === -1) {
    return false;
  }
  
  orders[orderIndex] = {
    ...orders[orderIndex],
    status: 'Cancelled',
    cancelledAt: Date.now(),
    internalNotes: reason ? 
      (orders[orderIndex].internalNotes ? 
        `${orders[orderIndex].internalNotes}\n[Rejected]: ${reason}` : 
        `[Rejected]: ${reason}`) : 
      orders[orderIndex].internalNotes,
    updatedAt: Date.now()
  };
  
  localStorage.setItem('orders', JSON.stringify(orders));
  
  // Dispatch event for real-time updates
  window.dispatchEvent(new CustomEvent('orderUpdated', {
    detail: { orderId, status: 'Cancelled' }
  }));
  
  return true;
};

/**
 * Update order status
 * Simulates: PATCH /api/orders/{orderId}/status
 * Includes drone assignment/release logic
 */
export const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<boolean> => {
  await simulateDelay();
  
  // In a real application, this would be:
  // const response = await fetch(`/api/orders/${orderId}/status`, {
  //   method: 'PATCH',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ status })
  // });
  // return response.ok;
  
  // For now, update localStorage
  const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
  const orderIndex = orders.findIndex(o => o.id === orderId);
  
  if (orderIndex === -1) {
    return false;
  }
  
  const order = orders[orderIndex];
  
  // Handle drone assignment/release based on status
  if (status === 'Delivering') {
    // Assign drone to order when status changes to "Delivering"
    if (order.restaurantId) {
      try {
        const { assignDroneToOrder } = await import('./droneService');
        await assignDroneToOrder(orderId, order.restaurantId);
        console.log(`✅ [restaurantOrderService] Drone assigned to order ${orderId}`);
      } catch (error) {
        console.error(`❌ [restaurantOrderService] Error assigning drone to order ${orderId}:`, error);
        // Continue with status update even if drone assignment fails
      }
    }
  } else if (status === 'Delivered') {
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
  
  orders[orderIndex] = {
    ...order,
    status,
    updatedAt: Date.now()
  };
  
  localStorage.setItem('orders', JSON.stringify(orders));
  
  // Dispatch event for real-time updates
  window.dispatchEvent(new CustomEvent('orderUpdated', {
    detail: { orderId, status }
  }));
  
  return true;
};

/**
 * Add internal note to order
 * Simulates: POST /api/orders/{orderId}/notes
 */
export const addOrderNote = async (orderId: string, note: string): Promise<boolean> => {
  await simulateDelay();
  
  // In a real application, this would be:
  // const response = await fetch(`/api/orders/${orderId}/notes`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ note })
  // });
  // return response.ok;
  
  // For now, update localStorage
  const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
  const orderIndex = orders.findIndex(o => o.id === orderId);
  
  if (orderIndex === -1) {
    return false;
  }
  
  const timestamp = new Date().toLocaleString('vi-VN');
  const noteWithTimestamp = `[${timestamp}]: ${note}`;
  
  orders[orderIndex] = {
    ...orders[orderIndex],
    internalNotes: orders[orderIndex].internalNotes ? 
      `${orders[orderIndex].internalNotes}\n${noteWithTimestamp}` : 
      noteWithTimestamp,
    updatedAt: Date.now()
  };
  
  localStorage.setItem('orders', JSON.stringify(orders));
  
  return true;
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

