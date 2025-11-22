package com.foodfast.service;

import com.foodfast.entity.Notification;
import com.foodfast.entity.Order;
import com.foodfast.repository.NotificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Notification Service
 * Handles restaurant notifications for new orders
 */
@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    /**
     * Create a notification for a new order
     */
    @Transactional
    public Notification createNotification(Order order) {
        Notification notification = new Notification();
        notification.setId(UUID.randomUUID().toString());
        notification.setRestaurantId(order.getRestaurantId() != null ? order.getRestaurantId() : order.getRestaurant());
        notification.setOrderId(order.getId());
        notification.setCustomerName(order.getCustomerName());
        notification.setCustomerPhone(order.getCustomerPhone());
        notification.setTotal((long) order.getTotal());
        notification.setStatus(order.getStatusString());
        notification.setTimestamp(System.currentTimeMillis());
        notification.setIsRead(false);
        
        return notificationRepository.save(notification);
    }

    /**
     * Get notifications for a restaurant
     */
    @Transactional(readOnly = true)
    public List<Notification> getNotifications(String restaurantId) {
        return notificationRepository.findByRestaurantIdOrderByTimestampDesc(restaurantId);
    }

    /**
     * Get unread notifications for a restaurant
     */
    @Transactional(readOnly = true)
    public List<Notification> getUnreadNotifications(String restaurantId) {
        return notificationRepository.findByRestaurantIdAndIsReadFalseOrderByTimestampDesc(restaurantId);
    }

    /**
     * Mark notification as read
     */
    @Transactional
    public void markAsRead(String notificationId) {
        notificationRepository.findById(notificationId).ifPresent(notification -> {
            notification.setIsRead(true);
            notificationRepository.save(notification);
        });
    }

    /**
     * Get unread count for a restaurant
     */
    @Transactional(readOnly = true)
    public long getUnreadCount(String restaurantId) {
        return notificationRepository.countByRestaurantIdAndIsReadFalse(restaurantId);
    }
}

