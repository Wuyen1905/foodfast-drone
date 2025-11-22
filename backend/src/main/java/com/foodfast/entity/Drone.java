package com.foodfast.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "drones")
public class Drone {

    @Id
    @Column(length = 40, nullable = false)
    private String id;

    @Column(name = "restaurant_id", nullable = false, length = 50)
    @JsonProperty("restaurantId")
    private String restaurantId;

    @Column(name = "restaurant_name", length = 200)
    @JsonProperty("restaurantName")
    private String restaurantName;

    @Column(nullable = false, length = 50)
    @JsonIgnore
    private String status; // 'Idle', 'Delivering', 'Charging', 'Maintenance' (internal)

    @Column(nullable = false)
    @JsonProperty("battery")
    private int battery; // 0-100

    @Column(name = "current_order_id", length = 60)
    @JsonProperty("currentOrderId")
    private String currentOrderId;

    @Column(name = "last_maintenance")
    @JsonProperty("lastMaintenance")
    private Long lastMaintenance; // timestamp

    @Column(name = "flagged_for_issue")
    @JsonProperty("flaggedForIssue")
    private Boolean flaggedForIssue = false;

    @Column(name = "issue_description", length = 500)
    @JsonProperty("issueDescription")
    private String issueDescription;

    // Legacy fields for backward compatibility
    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "restaurant", length = 100)
    private String restaurant;

    @Column(name = "battery_level")
    private Integer batteryLevel;

    // Frontend DroneApi fields
    @Column(name = "drone_code", length = 50)
    @JsonProperty("droneCode")
    private String droneCode;

    @Column(name = "position_lat")
    @JsonIgnore
    private Double positionLat;

    @Column(name = "position_lng")
    @JsonIgnore
    private Double positionLng;

    @Column(name = "speed_mps")
    @JsonProperty("speedMps")
    private Double speedMps = 0.0;

    @Column(name = "updated_at")
    @JsonProperty("updatedAt")
    private Long updatedAt;

    public Drone() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @JsonIgnore
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCurrentOrderId() {
        return currentOrderId;
    }

    public void setCurrentOrderId(String currentOrderId) {
        this.currentOrderId = currentOrderId;
    }

    public String getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public int getBattery() {
        return battery;
    }

    public void setBattery(int battery) {
        this.battery = Math.max(0, Math.min(100, battery));
    }

    public Long getLastMaintenance() {
        return lastMaintenance;
    }

    public void setLastMaintenance(Long lastMaintenance) {
        this.lastMaintenance = lastMaintenance;
    }

    public Boolean getFlaggedForIssue() {
        return flaggedForIssue != null ? flaggedForIssue : false;
    }

    public void setFlaggedForIssue(Boolean flaggedForIssue) {
        this.flaggedForIssue = flaggedForIssue != null ? flaggedForIssue : false;
    }

    public String getIssueDescription() {
        return issueDescription;
    }

    public void setIssueDescription(String issueDescription) {
        this.issueDescription = issueDescription;
    }

    // Legacy getters/setters for backward compatibility with fallback logic
    public String getName() {
        return name != null ? name : id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRestaurant() {
        return restaurant != null ? restaurant : restaurantId;
    }

    public void setRestaurant(String restaurant) {
        this.restaurant = restaurant;
    }

    public Integer getBatteryLevel() {
        return batteryLevel != null ? batteryLevel : battery;
    }

    public void setBatteryLevel(Integer batteryLevel) {
        this.batteryLevel = batteryLevel;
        if (batteryLevel != null) {
            this.battery = batteryLevel;
        }
    }
    
    // Overload for int type
    public void setBatteryLevel(int batteryLevel) {
        this.batteryLevel = batteryLevel;
        this.battery = batteryLevel;
    }

    public String getDroneCode() {
        return droneCode != null ? droneCode : id;
    }

    public void setDroneCode(String droneCode) {
        this.droneCode = droneCode;
    }

    // JSON getter for position object
    @JsonProperty("position")
    public PositionObject getPosition() {
        if (positionLat != null && positionLng != null) {
            return new PositionObject(positionLat, positionLng);
        }
        // Default position (Ho Chi Minh City)
        return new PositionObject(10.762622, 106.660172);
    }

    public void setPosition(PositionObject position) {
        if (position != null) {
            this.positionLat = position.lat;
            this.positionLng = position.lng;
        }
    }

    @JsonIgnore
    public Double getPositionLat() {
        return positionLat;
    }

    public void setPositionLat(Double positionLat) {
        this.positionLat = positionLat;
    }

    @JsonIgnore
    public Double getPositionLng() {
        return positionLng;
    }

    public void setPositionLng(Double positionLng) {
        this.positionLng = positionLng;
    }

    // JSON getter for waypoints (empty array for now, can be populated later)
    @JsonProperty("waypoints")
    public List<PositionObject> getWaypoints() {
        return new ArrayList<>();
    }

    public Double getSpeedMps() {
        return speedMps != null ? speedMps : 0.0;
    }

    public void setSpeedMps(Double speedMps) {
        this.speedMps = speedMps != null ? speedMps : 0.0;
    }

    public Long getUpdatedAt() {
        return updatedAt != null ? updatedAt : System.currentTimeMillis();
    }

    public void setUpdatedAt(Long updatedAt) {
        this.updatedAt = updatedAt;
    }

    // Map backend status to frontend status format (for DroneApi interface)
    @JsonProperty("status")
    public String getStatusForFrontend() {
        if (status == null) {
            return "returning";
        }
        // Map backend status to frontend DroneApi status
        // Frontend expects: 'delivering' | 'arrived' | 'returning'
        return switch (status.toLowerCase()) {
            case "delivering" -> "delivering";
            case "idle", "charging", "maintenance" -> "returning";
            default -> "returning";
        };
    }

    // Also provide orderId alias for frontend compatibility
    @JsonProperty("orderId")
    public String getOrderId() {
        return currentOrderId;
    }

    // Inner class for position object
    public static class PositionObject {
        public double lat;
        public double lng;

        public PositionObject() {
        }

        public PositionObject(double lat, double lng) {
            this.lat = lat;
            this.lng = lng;
        }
    }
}

