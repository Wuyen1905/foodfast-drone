// Restaurant Notification Service
// Handles notifying restaurants when new orders are placed

import { Order } from '@/context/OrderContext';
import apiClient from '@/config/axios';

/**
 * Notify restaurant about a new order
 * Uses WebSocket or API endpoint for real-time notifications
 */
export const notifyRestaurant = async (order: Order): Promise<boolean> => {
  try {
    const restaurantId = order.restaurantId;
    
    if (!restaurantId) {
      console.warn('Order notification: No restaurantId found in order', order);
      return false;
    }

    // In a real application, this would use WebSockets or a notification endpoint
    // For now, just dispatch a custom event (WebSocket would handle this in production)
    const notification = {
      orderId: order.id,
      restaurantId: restaurantId,
      customerName: order.name,
      customerPhone: order.phone,
      total: order.total,
      status: order.status,
      timestamp: Date.now(),
      items: order.items
    };

    // Trigger a custom event for real-time updates (if restaurant dashboard is open)
    window.dispatchEvent(new CustomEvent('newOrderNotification', {
      detail: notification
    }));

    // Note: Backend automatically creates notifications when orders are created
    // No need to call a separate notification endpoint here

    console.log(`✅ Restaurant notification sent: ${restaurantId}`, notification);
    return true;
  } catch (error) {
    console.error('Error notifying restaurant:', error);
    return false;
  }
};

/**
 * Get restaurant ID from product ID
 * Product IDs follow pattern: "sd-001" (SweetDreams) or "ak-001" (Aloha)
 * Returns normalized restaurant ID: 'sweetdreams' or 'aloha'
 */
export const getRestaurantIdFromProductId = (productId: string): string | null => {
  if (productId.startsWith('sd-')) {
    return 'sweetdreams';
  } else if (productId.startsWith('ak-')) {
    return 'aloha';
  }
  return null;
};

/**
 * Normalize restaurant ID to handle different formats
 * Maps 'rest_2' -> 'sweetdreams', 'restaurant_2' -> 'aloha'
 * Also handles 'sweetdreams' and 'aloha' directly
 */
export const normalizeRestaurantId = (restaurantId: string): string => {
  const normalizedMap: Record<string, string> = {
    'rest_2': 'sweetdreams',
    'restaurant_2': 'aloha',
    'sweetdreams': 'sweetdreams',
    'aloha': 'aloha',
  };
  
  return normalizedMap[restaurantId.toLowerCase()] || restaurantId;
};

/**
 * Determine restaurant ID from cart items
 * If all items belong to the same restaurant, return that restaurant ID
 * If items are from different restaurants, return the first restaurant found
 */
export const determineRestaurantFromCartItems = (
  cartItems: Array<{ id: string; name: string; qty: number; price: number }>
): string | null => {
  if (!cartItems || cartItems.length === 0) {
    return null;
  }

  // Get restaurant ID from first item
  const firstRestaurantId = getRestaurantIdFromProductId(cartItems[0].id);
  
  // Check if all items belong to the same restaurant
  const allSameRestaurant = cartItems.every(item => {
    const itemRestaurantId = getRestaurantIdFromProductId(item.id);
    return itemRestaurantId === firstRestaurantId;
  });

  if (allSameRestaurant && firstRestaurantId) {
    return firstRestaurantId;
  }

  // If mixed restaurants, return the first one found
  return firstRestaurantId;
};

