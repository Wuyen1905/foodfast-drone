package com.foodfast.repository;

import com.foodfast.entity.Drone;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DroneRepository extends JpaRepository<Drone, String> {

    List<Drone> findByRestaurantIgnoreCase(String restaurant);

    List<Drone> findByRestaurantId(String restaurantId);
}

