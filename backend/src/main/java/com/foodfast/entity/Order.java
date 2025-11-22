package com.foodfast.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @Column(length = 60, nullable = false)
    private String id;

    @Column(nullable = false, name = "customer_name")
    @JsonProperty("name")
    private String customerName;

    @Column(nullable = false, name = "customer_phone")
    @JsonProperty("phone")
    private String customerPhone;

    private String customerEmail;

    @Column(length = 512)
    private String address;

    private String restaurant;

    private String restaurantId;

    private String userId;

    @Column(length = 80)
    private String paymentSessionId;

    private String paymentMethod;

    private String paymentStatus;

    @Column(length = 1000)
    private String note;

    @Column(name = "internal_notes", length = 2000)
    @JsonProperty("internalNotes")
    private String internalNotes;

    private String droneId;

    @Column(name = "drone_path", length = 2000)
    @JsonProperty("dronePath")
    private String dronePath; // JSON array as string, will be parsed to List<String>

    @Column(name = "vnpay_transaction_id", length = 100)
    @JsonProperty("vnpayTransactionId")
    private String vnpayTransactionId;

    @Column(name = "confirmed_at")
    @JsonProperty("confirmedAt")
    private Long confirmedAt;

    @Column(name = "cancelled_at")
    @JsonProperty("cancelledAt")
    private Long cancelledAt;

    @Column(name = "confirmed_by", length = 100)
    @JsonProperty("confirmedBy")
    private String confirmedBy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private OrderStatus status = OrderStatus.PENDING;

    // Getter that returns status as string matching frontend expectations
    @JsonProperty("status")
    public String getStatusString() {
        if (status == null) {
            return "Pending";
        }
        // Map enum to frontend string values
        return switch (status) {
            case PENDING -> "Pending";
            case CONFIRMED -> "Confirmed";
            case PREPARING -> "In Progress";
            case READY -> "Ready";
            case DELIVERING -> "Delivering";
            case DELIVERED -> "Delivered";
            case CANCELLED -> "Cancelled";
        };
    }

    @Column(nullable = false)
    private int total = 0;

    // Database columns (stored as Instant in DB)
    @Column(nullable = false, name = "created_at")
    @JsonIgnore
    private Instant createdAt;

    @Column(nullable = false, name = "updated_at")
    @JsonIgnore
    private Instant updatedAt;

    @JsonManagedReference
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = jakarta.persistence.FetchType.EAGER)
    private List<OrderItem> items = new ArrayList<>();

    public Order() {
    }

    @PrePersist
    public void prePersist() {
        Instant now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = Instant.now();
    }

    public void recalculateTotal() {
        int subtotal = 0;
        for (OrderItem item : items) {
            if (item != null && item.getQty() > 0 && item.getPrice() > 0) {
                subtotal += item.getQty() * item.getPrice();
            }
        }
        int shipping = 15000;
        int tax = (int)(subtotal * 0.10);
        this.total = subtotal + shipping + tax;
    }

    public void setItems(List<OrderItem> items) {
        this.items.clear();
        if (items != null) {
            items.forEach(this::addItem);
        }
    }

    public void addItem(OrderItem item) {
        if (item == null) {
            return;
        }
        item.setOrder(this);
        this.items.add(item);
    }

    public void removeItem(OrderItem item) {
        if (item == null) {
            return;
        }
        item.setOrder(null);
        this.items.remove(item);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(String restaurant) {
        this.restaurant = restaurant;
    }

    public String getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPaymentSessionId() {
        return paymentSessionId;
    }

    public void setPaymentSessionId(String paymentSessionId) {
        this.paymentSessionId = paymentSessionId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getInternalNotes() {
        return internalNotes;
    }

    public void setInternalNotes(String internalNotes) {
        this.internalNotes = internalNotes;
    }

    public String getDroneId() {
        return droneId;
    }

    public void setDroneId(String droneId) {
        this.droneId = droneId;
    }

    // JSON getter for dronePath as List<String>
    @JsonProperty("dronePath")
    public List<String> getDronePath() {
        if (dronePath == null || dronePath.trim().isEmpty()) {
            return new ArrayList<>();
        }
        try {
            // Parse JSON array string to List
            // Simple parsing - assumes format: ["path1", "path2"]
            String cleaned = dronePath.trim();
            if (cleaned.startsWith("[") && cleaned.endsWith("]")) {
                cleaned = cleaned.substring(1, cleaned.length() - 1);
                if (cleaned.trim().isEmpty()) {
                    return new ArrayList<>();
                }
                String[] parts = cleaned.split(",");
                List<String> result = new ArrayList<>();
                for (String part : parts) {
                    String trimmed = part.trim().replace("\"", "").replace("'", "");
                    if (!trimmed.isEmpty()) {
                        result.add(trimmed);
                    }
                }
                return result;
            }
        } catch (Exception e) {
            // If parsing fails, return empty list
        }
        return new ArrayList<>();
    }

    public void setDronePath(List<String> dronePathList) {
        if (dronePathList == null || dronePathList.isEmpty()) {
            this.dronePath = null;
        } else {
            // Convert List to JSON array string
            this.dronePath = "[" + String.join(",", dronePathList.stream()
                    .map(path -> "\"" + path + "\"")
                    .toList()) + "]";
        }
    }

    @JsonIgnore
    public String getDronePathString() {
        return dronePath;
    }

    public void setDronePathString(String dronePath) {
        this.dronePath = dronePath;
    }

    public String getVnpayTransactionId() {
        return vnpayTransactionId;
    }

    public void setVnpayTransactionId(String vnpayTransactionId) {
        this.vnpayTransactionId = vnpayTransactionId;
    }

    public Long getConfirmedAt() {
        return confirmedAt;
    }

    public void setConfirmedAt(Long confirmedAt) {
        this.confirmedAt = confirmedAt;
    }

    public Long getCancelledAt() {
        return cancelledAt;
    }

    public void setCancelledAt(Long cancelledAt) {
        this.cancelledAt = cancelledAt;
    }

    public String getConfirmedBy() {
        return confirmedBy;
    }

    public void setConfirmedBy(String confirmedBy) {
        this.confirmedBy = confirmedBy;
    }

    @JsonIgnore
    public OrderStatus getStatusEnum() {
        return status;
    }

    @JsonIgnore
    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    // Setter that accepts string status from frontend
    public void setStatus(String statusString) {
        if (statusString == null || statusString.trim().isEmpty()) {
            this.status = OrderStatus.PENDING;
            return;
        }
        // Map frontend string to enum
        String normalized = statusString.trim();
        this.status = switch (normalized.toLowerCase()) {
            case "pending" -> OrderStatus.PENDING;
            case "confirmed" -> OrderStatus.CONFIRMED;
            case "in progress", "preparing" -> OrderStatus.PREPARING;
            case "ready" -> OrderStatus.READY;
            case "delivering" -> OrderStatus.DELIVERING;
            case "delivered" -> OrderStatus.DELIVERED;
            case "cancelled", "canceled" -> OrderStatus.CANCELLED;
            default -> OrderStatus.PENDING;
        };
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = Math.max(total, 0);
    }
    
    // Backward compatibility getter
    public BigDecimal getTotalAmount() {
        return BigDecimal.valueOf(total);
    }

    // JSON getters (return milliseconds as Long for frontend)
    @JsonProperty("createdAt")
    public Long getCreatedAt() {
        if (createdAt != null) {
            return createdAt.toEpochMilli();
        }
        return System.currentTimeMillis();
    }

    @JsonProperty("updatedAt")
    public Long getUpdatedAt() {
        if (updatedAt != null) {
            return updatedAt.toEpochMilli();
        }
        return System.currentTimeMillis();
    }

    // Internal getters for Instant (for database operations)
    @JsonIgnore
    public Instant getCreatedAtInstant() {
        return createdAt;
    }

    @JsonIgnore
    public Instant getUpdatedAtInstant() {
        return updatedAt;
    }

    // Setters that accept both Instant and Long
    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public void setCreatedAt(Long createdAtMillis) {
        if (createdAtMillis != null) {
            this.createdAt = Instant.ofEpochMilli(createdAtMillis);
        }
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setUpdatedAt(Long updatedAtMillis) {
        if (updatedAtMillis != null) {
            this.updatedAt = Instant.ofEpochMilli(updatedAtMillis);
        }
    }

    public List<OrderItem> getItems() {
        if (items == null) {
            items = new ArrayList<>();
        }
        return items;
    }

    public void setCustomerAndRestaurantDefaults() {
        if (Objects.nonNull(this.restaurant)) {
            this.restaurant = this.restaurant.trim();
        }
        if (Objects.nonNull(this.restaurantId)) {
            this.restaurantId = this.restaurantId.trim();
        }
    }
}

