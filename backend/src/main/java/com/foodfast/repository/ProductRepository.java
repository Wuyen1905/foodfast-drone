package com.foodfast.repository;

import com.foodfast.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, String> {

    List<Product> findByRestaurantIgnoreCase(String restaurant);
}

