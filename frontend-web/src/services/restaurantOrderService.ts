// Restaurant Order Service
// Uses backend API for restaurant order management

import { Order, OrderStatus } from '@/context/OrderContext';
import { getOrdersByRestaurant, updateOrderStatus as updateOrderStatusApi } from '@/api/orderApi';
import apiClient from '@/config/axios';

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
 * Calls: GET /api/orders?restaurant={restaurantId}
 */
export const getRestaurantOrders = async (restaurantId: string): Promise<Order[]> => {
  const orders = await getOrdersByRestaurant(restaurantId);
  
  // Transform to frontend Order format
  return orders.map((o: any) => ({
    id: o.id,
    name: o.name || o.customerName,
    phone: o.phone || o.customerPhone,
    address: o.address,
    items: o.items?.map((item: any) => ({
      name: item.name,
      qty: item.qty || item.quantity,
      price: item.price
    })) || [],
    total: o.total,
    status: o.status as OrderStatus,
    restaurantId: o.restaurantId || o.restaurant,
    createdAt: o.createdAt,
    updatedAt: o.updatedAt,
    paymentMethod: o.paymentMethod,
    paymentStatus: o.paymentStatus
  }));
};

/**
 * Confirm an order
 * Calls: PATCH /api/orders/{orderId} with status='Confirmed'
 */
export const confirmOrder = async (orderId: string, confirmedBy?: string): Promise<boolean> => {
  try {
    await updateOrderStatusApi(orderId, 'Confirmed');
    
    // Dispatch event for real-time updates
    window.dispatchEvent(new CustomEvent('orderUpdated', {
      detail: { orderId, status: 'Confirmed' }
    }));
    
    return true;
  } catch (error) {
    console.error('Failed to confirm order:', error);
    return false;
  }
};

/**
 * Reject/Cancel an order
 * Calls: PATCH /api/orders/{orderId} with status='Cancelled'
 */
export const rejectOrder = async (orderId: string, reason?: string): Promise<boolean> => {
  try {
    await updateOrderStatusApi(orderId, 'Cancelled');
    
    // If reason provided, add note (would need separate endpoint)
    if (reason) {
      try {
        await apiClient.patch(`/orders/${orderId}`, {
          note: reason
        });
      } catch (e) {
        // Note update is optional
      }
    }
    
    // Dispatch event for real-time updates
    window.dispatchEvent(new CustomEvent('orderUpdated', {
      detail: { orderId, status: 'Cancelled' }
    }));
    
    return true;
  } catch (error) {
    console.error('Failed to reject order:', error);
    return false;
  }
};

/**
 * Update order status
 * Calls: PATCH /api/orders/{orderId} with status
 */
export const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<boolean> => {
  try {
    await updateOrderStatusApi(orderId, status);
    
    // Dispatch event for real-time updates
    window.dispatchEvent(new CustomEvent('orderUpdated', {
      detail: { orderId, status }
    }));
    
    return true;
  } catch (error) {
    console.error('Failed to update order status:', error);
    return false;
  }
};

/**
 * Add internal note to order
 * Calls: PATCH /api/orders/{orderId} with note
 */
export const addOrderNote = async (orderId: string, note: string): Promise<boolean> => {
  try {
    const timestamp = new Date().toLocaleString('vi-VN');
    const noteWithTimestamp = `[${timestamp}]: ${note}`;
    
    // Get existing order to append note
    const existingOrder = await apiClient.get(`/orders/${orderId}`);
    const existingNote = existingOrder.data.note || '';
    const updatedNote = existingNote ? `${existingNote}\n${noteWithTimestamp}` : noteWithTimestamp;
    
    await apiClient.patch(`/orders/${orderId}`, {
      note: updatedNote
    });
    
    return true;
  } catch (error) {
    console.error('Failed to add order note:', error);
    return false;
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
    'Ready': ['Delivered', 'Cancelled'],
    'Delivered': [],
    'Cancelled': []
  };
  
  return statusFlow[currentStatus] || [];
};

