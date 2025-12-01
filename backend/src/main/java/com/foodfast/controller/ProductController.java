package com.foodfast.controller;

import com.foodfast.entity.Product;
import com.foodfast.repository.ProductRepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Product Controller
 * Provides full CRUD operations for products matching frontend ProductApi
 */
@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * GET /api/products
     * Get all products, optionally filtered by restaurant
     */
    @GetMapping
    public List<Product> getProducts(@RequestParam(required = false) String restaurant) {
        if (restaurant == null || restaurant.trim().isEmpty()) {
            return productRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
        }
        return productRepository.findByRestaurantIgnoreCase(restaurant);
    }

    /**
     * GET /api/products/{id}
     * Get a single product by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable String id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * POST /api/products
     * Create a new product
     */
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        if (product.getId() == null || product.getId().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Product saved = productRepository.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /**
     * PATCH /api/products/{id}
     * Update a product
     */
    @PatchMapping("/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable String id,
            @RequestBody Map<String, Object> updates) {
        Optional<Product> productOpt = productRepository.findById(id);
        if (productOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Product product = productOpt.get();
        
        if (updates.containsKey("name")) {
            product.setName(String.valueOf(updates.get("name")));
        }
        if (updates.containsKey("description")) {
            product.setDescription(String.valueOf(updates.get("description")));
        }
        if (updates.containsKey("price")) {
            Object priceObj = updates.get("price");
            if (priceObj instanceof Number) {
                product.setPrice(((Number) priceObj).intValue());
            }
        }
        if (updates.containsKey("category")) {
            product.setCategory(String.valueOf(updates.get("category")));
        }
        if (updates.containsKey("imageUrl") || updates.containsKey("image")) {
            Object imageObj = updates.get("imageUrl");
            if (imageObj == null) {
                imageObj = updates.get("image");
            }
            product.setImageUrl(imageObj != null ? String.valueOf(imageObj) : null);
        }
        if (updates.containsKey("restaurant")) {
            product.setRestaurant(String.valueOf(updates.get("restaurant")));
        }
        if (updates.containsKey("available")) {
            Object availableObj = updates.get("available");
            if (availableObj instanceof Boolean) {
                product.setAvailable((Boolean) availableObj);
            } else if (availableObj instanceof String) {
                product.setAvailable(Boolean.parseBoolean((String) availableObj));
            }
        }

        Product saved = productRepository.save(product);
        return ResponseEntity.ok(saved);
    }

    /**
     * DELETE /api/products/{id}
     * Delete a product
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable String id) {
        if (!productRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        productRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

