package com.foodfast.repository;

import com.foodfast.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, String> {
    List<Notification> findByRestaurantIdOrderByTimestampDesc(String restaurantId);
    List<Notification> findByRestaurantIdAndIsReadFalseOrderByTimestampDesc(String restaurantId);
    long countByRestaurantIdAndIsReadFalse(String restaurantId);
}

