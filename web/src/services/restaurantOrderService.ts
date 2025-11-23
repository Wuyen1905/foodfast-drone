// Restaurant Order Service
// Restaurant order management using backend API

import { Order, OrderStatus } from '@/context/OrderContext';
import { api } from '@/config/axios';
import { normalizeToRestaurantId } from '@/utils/restaurantUtils';

/**
 * Get all orders for a restaurant from API
 */
export const getRestaurantOrders = async (restaurantId: string): Promise<Order[]> => {
  try {
    // Normalize restaurant ID using centralized utility
    const restaurantIdParam = normalizeToRestaurantId(restaurantId);
    
    // Use restaurantId= parameter (backend prefers this over restaurant=)
    const response = await api.get(`/orders?restaurantId=${restaurantIdParam}`);
    const apiOrders = response.data;
    
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
    return [];
  }
};

// Helper to map API status to OrderStatus
// Maps Java enum (uppercase) to frontend status
const mapApiStatusToOrderStatus = (apiStatus: string): OrderStatus => {
  const statusMap: Record<string, OrderStatus> = {
    'PENDING': 'Pending',
    'CONFIRMED': 'Confirmed',
    'PREPARING': 'In Progress',
    'READY': 'Ready',
    'DELIVERING': 'Delivering',
    'DELIVERED': 'Delivered',
    'CANCELLED': 'Cancelled',
    // Support lowercase for backward compatibility
    'pending': 'Pending',
    'confirmed': 'Confirmed',
    'preparing': 'In Progress',
    'ready': 'Ready',
    'delivering': 'Delivering',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled',
  };
  const normalizedStatus = apiStatus?.toUpperCase();
  return statusMap[normalizedStatus] || statusMap[apiStatus?.toLowerCase()] || 'Pending';
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
      status: 'Confirmed',
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
      status: 'Cancelled',
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
    throw error; // Re-throw to let caller handle the error
  }
};

// Helper to map OrderStatus to API status
// Maps frontend status to Java enum (uppercase)
const mapOrderStatusToApiStatus = (status: OrderStatus): string => {
  const statusMap: Record<OrderStatus, string> = {
    'Pending': 'PENDING',
    'Confirmed': 'CONFIRMED',
    'In Progress': 'PREPARING',
    'Ready': 'READY',
    'Delivering': 'DELIVERING',
    'Delivered': 'DELIVERED',
    'Cancelled': 'CANCELLED'
  };
  return statusMap[status] || 'PENDING';
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

