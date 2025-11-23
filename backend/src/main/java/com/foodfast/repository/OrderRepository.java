package com.foodfast.repository;

import com.foodfast.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, String>, JpaSpecificationExecutor<Order> {

    List<Order> findByPaymentSessionId(String paymentSessionId);

    List<Order> findByCustomerPhoneContainingIgnoreCase(String phone);

    // Filter by restaurantId instead of restaurant name
    List<Order> findByRestaurantId(String restaurantId);

    // Filter by phone + restaurantId
    List<Order> findByCustomerPhoneContainingIgnoreCaseAndRestaurantId(String phone, String restaurantId);
}

