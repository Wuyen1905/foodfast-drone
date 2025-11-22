package com.foodfast.controller;

import com.foodfast.entity.CartItem;
import com.foodfast.repository.CartItemRepository;
import com.foodfast.service.RealtimeService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://192.168.0.100:5173",
        "http://192.168.0.100:5174",
        "http://192.168.0.100:5175",
        "http://localhost:8081"
})
public class CartController {

    private final CartItemRepository cartItemRepository;
    private final RealtimeService realtimeService;

    public CartController(CartItemRepository cartItemRepository, RealtimeService realtimeService) {
        this.cartItemRepository = cartItemRepository;
        this.realtimeService = realtimeService;
    }

    @GetMapping
    public List<CartItem> getCart() {
        return cartItemRepository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<List<CartItem>> addToCart(@Valid @RequestBody AddCartItemRequest request) {
        CartItem item = new CartItem();
        item.setProductId(request.getProductId());
        item.setProductName(request.getProductName());
        item.setUnitPrice(request.getUnitPrice());
        item.setQuantity(request.getQuantity());
        item.setRestaurantCode(request.getRestaurantCode());

        cartItemRepository.save(item);
        List<CartItem> updatedCart = cartItemRepository.findAll();
        realtimeService.sendCartUpdate(updatedCart);
        return ResponseEntity.ok(updatedCart);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<CartItem>> removeFromCart(@PathVariable Long id) {
        if (!cartItemRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        cartItemRepository.deleteById(id);
        List<CartItem> updatedCart = cartItemRepository.findAll();
        realtimeService.sendCartUpdate(updatedCart);
        return ResponseEntity.ok(updatedCart);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<List<CartItem>> clearCart() {
        cartItemRepository.deleteAll();
        List<CartItem> updatedCart = cartItemRepository.findAll();
        realtimeService.sendCartUpdate(updatedCart);
        return ResponseEntity.ok(updatedCart);
    }

    public static class AddCartItemRequest {
        @NotNull
        private Long productId;

        @NotBlank
        private String productName;

        @NotNull
        private Double unitPrice;

        @NotNull
        @Min(1)
        private Integer quantity;

        @NotBlank
        private String restaurantCode;

        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }

        public String getProductName() {
            return productName;
        }

        public void setProductName(String productName) {
            this.productName = productName;
        }

        public Double getUnitPrice() {
            return unitPrice;
        }

        public void setUnitPrice(Double unitPrice) {
            this.unitPrice = unitPrice;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }

        public String getRestaurantCode() {
            return restaurantCode;
        }

        public void setRestaurantCode(String restaurantCode) {
            this.restaurantCode = restaurantCode;
        }
    }
}

