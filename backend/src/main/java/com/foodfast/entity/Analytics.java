package com.foodfast.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;

/**
 * Analytics entity for storing restaurant analytics data
 * Matches frontend RestaurantAnalytics interface
 */
@Entity
@Table(name = "analytics")
public class Analytics {

    @Id
    @Column(length = 50, nullable = false)
    private String id;

    @Column(name = "restaurant_id", nullable = false, length = 50)
    @JsonProperty("restaurantId")
    private String restaurantId;

    @Column(nullable = false)
    @JsonProperty("period")
    private String period; // 'day', 'week', 'month'

    @Column(nullable = false)
    @JsonProperty("revenue")
    private Integer revenue;

    @Column(nullable = false)
    @JsonProperty("orders")
    private Integer orders;

    @Column(name = "avg_order_value", nullable = false)
    @JsonProperty("avgOrderValue")
    private Integer avgOrderValue;

    @Column(name = "delivery_time", nullable = false)
    @JsonProperty("deliveryTime")
    private Integer deliveryTime; // in minutes

    @Column(name = "created_at")
    @JsonProperty("createdAt")
    private Long createdAt;

    public Analytics() {
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

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public Integer getRevenue() {
        return revenue;
    }

    public void setRevenue(Integer revenue) {
        this.revenue = revenue;
    }

    public void setRevenue(Long revenue) {
        this.revenue = revenue != null ? revenue.intValue() : 0;
    }

    public Integer getOrders() {
        return orders;
    }

    public void setOrders(Integer orders) {
        this.orders = orders;
    }

    public Integer getAvgOrderValue() {
        return avgOrderValue;
    }

    public void setAvgOrderValue(Integer avgOrderValue) {
        this.avgOrderValue = avgOrderValue;
    }

    public void setAvgOrderValue(Long avgOrderValue) {
        this.avgOrderValue = avgOrderValue != null ? avgOrderValue.intValue() : 0;
    }

    public Integer getDeliveryTime() {
        return deliveryTime;
    }

    public void setDeliveryTime(Integer deliveryTime) {
        this.deliveryTime = deliveryTime;
    }

    public Long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Long createdAt) {
        this.createdAt = createdAt;
    }
}

