package com.foodfast.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Notification entity for restaurant notifications
 */
@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @Column(length = 50, nullable = false)
    private String id;

    @Column(name = "restaurant_id", nullable = false, length = 50)
    @JsonProperty("restaurantId")
    private String restaurantId;

    @Column(name = "order_id", length = 60)
    @JsonProperty("orderId")
    private String orderId;

    @Column(name = "customer_name")
    @JsonProperty("customerName")
    private String customerName;

    @Column(name = "customer_phone")
    @JsonProperty("customerPhone")
    private String customerPhone;

    @Column(nullable = false)
    @JsonProperty("total")
    private Long total;

    @Column(nullable = false, length = 32)
    @JsonProperty("status")
    private String status;

    @Column(nullable = false)
    @JsonProperty("timestamp")
    private Long timestamp;

    @Column(name = "is_read")
    @JsonProperty("isRead")
    private Boolean isRead = false;

    public Notification() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
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

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public Boolean getIsRead() {
        return isRead != null ? isRead : false;
    }

    public void setIsRead(Boolean isRead) {
        this.isRead = isRead != null ? isRead : false;
    }
}

