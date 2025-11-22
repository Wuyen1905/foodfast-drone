package com.foodfast.repository;

import com.foodfast.entity.Analytics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnalyticsRepository extends JpaRepository<Analytics, String> {
    List<Analytics> findByRestaurantId(String restaurantId);
    Optional<Analytics> findByRestaurantIdAndPeriod(String restaurantId, String period);
    List<Analytics> findByRestaurantIdOrderByCreatedAtDesc(String restaurantId);
}

