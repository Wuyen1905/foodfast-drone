// Restaurant Notification Service
// Handles notifying restaurants when new orders are placed

import { Order } from '@/context/OrderContext';
import toast from 'react-hot-toast';

/**
 * Map restaurant names to restaurant IDs
 */
const restaurantIdMap: Record<string, string> = {
  'SweetDreams': 'sweetdreams',
  'Aloha': 'aloha'
};

/**
 * Notify restaurant about a new order
 * Note: Backend automatically creates notifications when orders are created via OrderService
 * This function only triggers local browser events for real-time UI updates
 * It does NOT create notifications in backend (backend handles that automatically)
 */
export const notifyRestaurant = async (order: Order): Promise<boolean> => {
  try {
    // Determine restaurant ID from order
    let restaurantId = order.restaurantId;
    
    if (!restaurantId) {
      console.warn('Order notification: No restaurantId found in order', order);
      return false;
    }

    // Normalize restaurant ID to handle different formats
    restaurantId = normalizeRestaurantId(restaurantId);

    // Backend automatically creates notifications when orders are created
    // This function only triggers local browser events for real-time UI updates
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

    // Don't log success as if we created notification - backend already did that
    return true;
  } catch (error) {
    console.error('[restaurantNotificationService] Error triggering notification event:', error);
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

