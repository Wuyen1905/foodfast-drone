/**
 * Restaurant Order Sync Hook
 * Subscribes to WebSocket order events and shows notifications to restaurants
 */

import { useEffect } from 'react';
import { connectOrderSync, disconnectOrderSync } from '../services/orderSyncService';
import toast from 'react-hot-toast';

/**
 * Hook to sync restaurant orders via WebSocket
 * Shows toast notifications when new orders arrive
 */
export const useRestaurantOrderSync = (restaurantId?: string) => {
  useEffect(() => {
    if (!restaurantId) {
      return;
    }

    // Handle order events from WebSocket
    const handleOrderEvent = (event: any) => {
      if (event.event === 'NEW_ORDER') {
        const order = event.order;
        const orderRestaurantId = order?.restaurantId;
        
        // Check if this order is for this restaurant
        if (orderRestaurantId && (
          orderRestaurantId === restaurantId ||
          orderRestaurantId.toLowerCase() === restaurantId.toLowerCase() ||
          (orderRestaurantId === 'rest_2' && restaurantId.toLowerCase() === 'sweetdreams') ||
          (orderRestaurantId === 'restaurant_2' && restaurantId.toLowerCase() === 'aloha')
        )) {
          // Show toast notification
          toast.success(`Đơn hàng mới cần xác nhận: ${order.customerName || 'Khách hàng'}`, {
            duration: 5000,
            icon: '📦',
          });
          
          // Trigger custom event for restaurant dashboard
          window.dispatchEvent(new CustomEvent('newOrderNotification', {
            detail: {
              orderId: event.orderId,
              restaurantId: orderRestaurantId,
              customerName: order.customerName,
              customerPhone: order.customerPhone,
              total: order.total,
              status: order.status,
              timestamp: Date.now(),
            }
          }));
        }
      } else if (event.event === 'STATUS_CHANGED') {
        // Optionally show status change notifications
        console.log('[RestaurantSync] Order status changed:', event);
      }
    };

    // Connect to WebSocket
    let wsConnected = false;
    connectOrderSync(handleOrderEvent).then((connected) => {
      wsConnected = connected;
      if (connected) {
        console.log(`[RestaurantSync] ✅ Real-time sync enabled for restaurant: ${restaurantId}`);
      } else {
        console.log(`[RestaurantSync] ⚠️ WebSocket not available for restaurant: ${restaurantId}`);
      }
    }).catch((error) => {
      console.warn(`[RestaurantSync] WebSocket connection error for restaurant ${restaurantId}:`, error);
    });

    // Cleanup on unmount
    return () => {
      if (wsConnected) {
        disconnectOrderSync();
      }
    };
  }, [restaurantId]);
};

