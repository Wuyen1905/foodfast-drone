/**
 * Notification Store
 * Lightweight notification state management for admin dashboard
 * Triggers notifications for key events without modifying UI
 */

export type NotificationType = 'order' | 'drone' | 'system' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  metadata?: Record<string, any>;
}

class NotificationStore {
  private notifications: Notification[] = [];
  private subscribers: Set<(notifications: Notification[]) => void> = new Set();
  private maxNotifications = 100;

  /**
   * Add a new notification
   */
  add(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): void {
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      read: false
    };

    this.notifications.unshift(newNotification);
    
    // Keep only the last maxNotifications
    if (this.notifications.length > this.maxNotifications) {
      this.notifications = this.notifications.slice(0, this.maxNotifications);
    }

    this.notifySubscribers();
    
    // Log to console (as per requirements)
    console.log(`[Notification] ${newNotification.type.toUpperCase()}: ${newNotification.title} - ${newNotification.message}`);
  }

  /**
   * Mark notification as read
   */
  markAsRead(id: string): void {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
      this.notifySubscribers();
    }
  }

  /**
   * Mark all notifications as read
   */
  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
    this.notifySubscribers();
  }

  /**
   * Remove notification
   */
  remove(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notifySubscribers();
  }

  /**
   * Clear all notifications
   */
  clear(): void {
    this.notifications = [];
    this.notifySubscribers();
  }

  /**
   * Get all notifications
   */
  getAll(): Notification[] {
    return [...this.notifications];
  }

  /**
   * Get unread notifications
   */
  getUnread(): Notification[] {
    return this.notifications.filter(n => !n.read);
  }

  /**
   * Get unread count
   */
  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  /**
   * Subscribe to notification changes
   */
  subscribe(callback: (notifications: Notification[]) => void): () => void {
    this.subscribers.add(callback);
    
    // Immediately call with current notifications
    callback(this.getAll());
    
    return () => {
      this.subscribers.delete(callback);
    };
  }

  /**
   * Notify all subscribers
   */
  private notifySubscribers(): void {
    this.subscribers.forEach(callback => {
      try {
        callback(this.getAll());
      } catch (error) {
        console.error('[notificationStore] Error notifying subscriber:', error);
      }
    });
  }
}

// Singleton instance
export const notificationStore = new NotificationStore();

/**
 * Helper functions for common notification types
 */

/**
 * Notify about new order
 */
export const notifyNewOrder = (orderId: string, restaurantName: string, amount: number): void => {
  notificationStore.add({
    type: 'order',
    title: 'New Order Created',
    message: `Order ${orderId} from ${restaurantName} - ${amount.toLocaleString('vi-VN')}₫`,
    metadata: { orderId, restaurantName, amount }
  });
};

/**
 * Notify about drone battery low
 */
export const notifyDroneBatteryLow = (droneCode: string, battery: number): void => {
  notificationStore.add({
    type: 'drone',
    title: 'Drone Battery Low',
    message: `Drone ${droneCode} battery is ${battery}% - requires attention`,
    metadata: { droneCode, battery }
  });
};

/**
 * Notify about delivery completed
 */
export const notifyDeliveryCompleted = (orderId: string, droneCode: string): void => {
  notificationStore.add({
    type: 'order',
    title: 'Delivery Completed',
    message: `Order ${orderId} delivered by ${droneCode}`,
    metadata: { orderId, droneCode }
  });
};

/**
 * Notify about system events
 */
export const notifySystemEvent = (message: string, metadata?: Record<string, any>): void => {
  notificationStore.add({
    type: 'system',
    title: 'System Event',
    message,
    metadata
  });
};

/**
 * Notify about warnings
 */
export const notifyWarning = (message: string, metadata?: Record<string, any>): void => {
  notificationStore.add({
    type: 'warning',
    title: 'Warning',
    message,
    metadata
  });
};

