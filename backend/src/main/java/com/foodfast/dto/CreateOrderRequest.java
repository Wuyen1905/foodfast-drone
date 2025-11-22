package com.foodfast.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

public class CreateOrderRequest {
    public String id;
    public String customerName;
    public String customerPhone;
    public String address;
    public String restaurantId;
    public String userId;
    public String paymentSessionId;

    public long createdAt;
    public long updatedAt;
    public String orderTime;

    @JsonIgnore
    public long total;
    public String status;
    public String paymentMethod;
    public String paymentStatus;

    public List<Item> items;

    public static class Item {
        public String name;
        public int quantity;
        public int qty; // Support both qty and quantity from frontend
        public long price;
        
        // Getter to handle both qty and quantity
        public int getQuantity() {
            return quantity > 0 ? quantity : (qty > 0 ? qty : 1);
        }
    }
}

