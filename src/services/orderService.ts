/**
 * Order Service
 * Service layer for order-drone relationship management
 * Logic only - no UI changes
 */

import axios from 'axios';
import { Order } from '../context/OrderContext';
import { Drone } from './droneManager';
import { getDroneByOrder, fetchAllDrones } from './droneService';

const API_BASE_URL = 'http://localhost:3001';

/**
 * Get order by ID from API
 */
export async function fetchOrderById(orderId: string): Promise<Order | null> {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`);
    return response.data as Order;
  } catch (error) {
    console.error(`[orderService] Error fetching order ${orderId}:`, error);
    return null;
  }
}

/**
 * Get order by ID (alias for fetchOrderById)
 * Exported for mobile and web compatibility
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
  return fetchOrderById(orderId);
}

/**
 * Get all orders from API
 */
export async function fetchAllOrders(): Promise<Order[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`);
    const orders = Array.isArray(response.data) ? response.data : [];
    return orders.map((order: any) => ({
      id: order.id,
      name: order.customerName || order.name,
      phone: order.customerPhone || order.phone,
      address: order.address || '',
      items: order.items || [],
      total: order.total || 0,
      status: order.status || 'Pending',
      restaurantId: order.restaurantId,
      userId: order.userId,
      droneId: order.droneId, // Include droneId from API
      createdAt: order.createdAt || order.orderTime,
      updatedAt: order.updatedAt,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      vnpayTransactionId: order.vnpayTransactionId,
      paymentSessionId: order.paymentSessionId
    })) as Order[];
  } catch (error) {
    console.error('[orderService] Error fetching orders:', error);
    return [];
  }
}

/**
 * Get order with associated drone
 * Fetches order and finds its assigned drone
 */
export async function getOrderWithDrone(orderId: string): Promise<{
  order: Order | null;
  drone: Drone | undefined;
}> {
  try {
    // Fetch order and drones in parallel
    const [order, drones] = await Promise.all([
      fetchOrderById(orderId),
      fetchAllDrones()
    ]);

    if (!order) {
      console.warn(`⚠️ Order ${orderId} not found.`);
      return { order: null, drone: undefined };
    }

    // Try to find drone by orderId field in drone
    let drone = getDroneByOrder(orderId, drones);

    // Fallback: if order has droneId, try to find drone by ID
    if (!drone && (order as any).droneId) {
      drone = drones.find(d => d.id === (order as any).droneId);
    }

    // Validation
    if (!drone) {
      console.warn(`⚠️ No drone assigned for order ${orderId}.`);
    } else if (drone.orderId !== orderId && (order as any).droneId !== drone.id) {
      console.warn(`⚠️ Drone ${drone.id} orderId (${drone.orderId}) does not match order ${orderId}.`);
    }

    return { order, drone };
  } catch (error) {
    console.error(`[orderService] Error getting order with drone for ${orderId}:`, error);
    return { order: null, drone: undefined };
  }
}

/**
 * Get orders by user ID with their drones
 */
export async function getOrdersWithDronesByUserId(userId: string): Promise<Array<{
  order: Order;
  drone: Drone | undefined;
}>> {
  try {
    const [orders, drones] = await Promise.all([
      fetchAllOrders(),
      fetchAllDrones()
    ]);

    const userOrders = orders.filter(o => o.userId === userId);

    return userOrders.map(order => {
      const drone = getDroneByOrder(order.id, drones) || 
                    ((order as any).droneId ? drones.find(d => d.id === (order as any).droneId) : undefined);
      
      return { order, drone };
    });
  } catch (error) {
    console.error(`[orderService] Error getting orders with drones for user ${userId}:`, error);
    return [];
  }
}

/**
 * Validate order-drone relationship
 * Ensures order and drone IDs are correctly linked
 */
export function validateOrderDroneRelationship(
  order: Order,
  drone: Drone | undefined
): { isValid: boolean; message?: string } {
  if (!drone) {
    return { isValid: false, message: `No drone assigned to order ${order.id}` };
  }

  const orderDroneId = (order as any).droneId;
  if (orderDroneId && orderDroneId !== drone.id) {
    return { 
      isValid: false, 
      message: `Order ${order.id} expects drone ${orderDroneId}, but drone ${drone.id} was found` 
    };
  }

  if (drone.orderId && drone.orderId !== order.id) {
    return { 
      isValid: false, 
      message: `Drone ${drone.id} is assigned to order ${drone.orderId}, not ${order.id}` 
    };
  }

  return { isValid: true };
}

/**
 * Normalize order status for consistent comparison
 * Treats "Delivering" (case-insensitive) and "Đang giao" as the same logical state
 */
function normalizeOrderStatus(status: string | undefined | null): string {
  if (!status) return '';
  const raw = status.trim().toLowerCase();
  if (raw === 'delivering') return 'Đang giao';
  return status;
}

/**
 * Check if order should show drone tracking
 * Logic to determine if drone animation should be displayed
 */
export function shouldShowDroneTracking(order: Order, drone: Drone | undefined): boolean {
  // Normalize order status for comparison
  const normalizedStatus = normalizeOrderStatus(order.status);
  
  // Don't show if order is cancelled
  if (order.status === 'Cancelled' || order.status === 'cancelled' || normalizedStatus === 'Đã hủy') {
    return false;
  }

  // Don't show if order is delivered (drone should have returned)
  if (order.status === 'Delivered' || order.status === 'delivered' || normalizedStatus === 'Đã giao') {
    return false;
  }

  // Show if order is in progress and has a drone
  // Treats "Delivering" (case-insensitive) and "Đang giao" as the same logical state
  if (drone && (
    order.status === 'In Progress' || 
    order.status === 'Ready' || 
    normalizedStatus === 'Đang giao' ||
    order.status === 'preparing'
  )) {
    return true;
  }

  return false;
}

