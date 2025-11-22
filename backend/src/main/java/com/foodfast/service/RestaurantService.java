package com.foodfast.service;

import com.foodfast.entity.Restaurant;
import com.foodfast.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public List<Restaurant> getAllActiveRestaurants() {
        return restaurantRepository.findByIsActiveTrue();
    }

    public Optional<Restaurant> findById(String id) {
        return restaurantRepository.findById(id);
    }

    public Optional<Restaurant> findByOwnerId(String ownerId) {
        return restaurantRepository.findByOwnerId(ownerId);
    }

    public List<Restaurant> findByCategory(String category) {
        return restaurantRepository.findByCategoryIgnoreCase(category);
    }

    public List<Restaurant> getAll() {
        return restaurantRepository.findAll();
    }
}

