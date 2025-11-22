package com.foodfast.repository;

import com.foodfast.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, String> {
    List<Restaurant> findByIsActiveTrue();
    Optional<Restaurant> findByOwnerId(String ownerId);
    List<Restaurant> findByCategoryIgnoreCase(String category);
}

