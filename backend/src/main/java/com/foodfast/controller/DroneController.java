package com.foodfast.controller;

import com.foodfast.entity.Drone;
import com.foodfast.repository.DroneRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Drone Controller
 * Provides drone endpoints matching frontend DroneApi expectations
 */
@RestController
@RequestMapping("/api/drones")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://192.168.0.100:5173",
        "http://192.168.0.100:5174",
        "http://192.168.0.100:5175",
        "http://localhost:8081"
})
public class DroneController {

    private final DroneRepository droneRepository;

    public DroneController(DroneRepository droneRepository) {
        this.droneRepository = droneRepository;
    }

    /**
     * GET /api/drones
     * Get all drones, optionally filtered by restaurant or restaurantId
     */
    @GetMapping
    public List<Drone> getDrones(
            @RequestParam(required = false) String restaurant,
            @RequestParam(required = false) String restaurantId) {
        if (StringUtils.hasText(restaurantId)) {
            return droneRepository.findByRestaurantId(restaurantId);
        }
        if (StringUtils.hasText(restaurant)) {
            return droneRepository.findByRestaurantIgnoreCase(restaurant);
        }
        return droneRepository.findAll();
    }

    /**
     * GET /api/drones/{id}
     * Get a single drone by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Drone> getDrone(@PathVariable String id) {
        Optional<Drone> drone = droneRepository.findById(id);
        return drone.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * PATCH /api/drones/{id}
     * Update drone properties (status, battery, position, etc.)
     * Matches frontend patchDrone function
     */
    @PatchMapping("/{id}")
    public ResponseEntity<?> updateDrone(
            @PathVariable String id,
            @RequestBody Map<String, Object> updates) {
        Optional<Drone> droneOpt = droneRepository.findById(id);
        if (droneOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Drone drone = droneOpt.get();

        if (updates.containsKey("status")) {
            String statusValue = String.valueOf(updates.get("status"));
            // Map frontend status to backend status
            String backendStatus = switch (statusValue.toLowerCase()) {
                case "delivering" -> "Delivering";
                case "arrived" -> "Idle";
                case "returning" -> "Idle";
                default -> statusValue;
            };
            drone.setStatus(backendStatus);
        }
        if (updates.containsKey("battery")) {
            Object batteryObj = updates.get("battery");
            if (batteryObj instanceof Number) {
                drone.setBattery(((Number) batteryObj).intValue());
            }
        }
        if (updates.containsKey("batteryLevel")) {
            Object batteryObj = updates.get("batteryLevel");
            if (batteryObj instanceof Number) {
                drone.setBatteryLevel(((Number) batteryObj).intValue());
            }
        }
        if (updates.containsKey("currentOrderId")) {
            Object orderIdObj = updates.get("currentOrderId");
            drone.setCurrentOrderId(orderIdObj != null ? String.valueOf(orderIdObj) : null);
        }
        if (updates.containsKey("orderId")) {
            // Support orderId alias for frontend compatibility
            Object orderIdObj = updates.get("orderId");
            drone.setCurrentOrderId(orderIdObj != null ? String.valueOf(orderIdObj) : null);
        }
        if (updates.containsKey("droneCode")) {
            drone.setDroneCode(String.valueOf(updates.get("droneCode")));
        }
        if (updates.containsKey("position")) {
            Object positionObj = updates.get("position");
            if (positionObj instanceof Map) {
                Map<?, ?> positionMap = (Map<?, ?>) positionObj;
                Object latObj = positionMap.get("lat");
                Object lngObj = positionMap.get("lng");
                if (latObj instanceof Number && lngObj instanceof Number) {
                    drone.setPositionLat(((Number) latObj).doubleValue());
                    drone.setPositionLng(((Number) lngObj).doubleValue());
                }
            }
        }
        if (updates.containsKey("speedMps")) {
            Object speedObj = updates.get("speedMps");
            if (speedObj instanceof Number) {
                drone.setSpeedMps(((Number) speedObj).doubleValue());
            }
        }
        if (updates.containsKey("updatedAt")) {
            Object updatedAtObj = updates.get("updatedAt");
            if (updatedAtObj instanceof Number) {
                drone.setUpdatedAt(((Number) updatedAtObj).longValue());
            } else if (updatedAtObj instanceof String) {
                try {
                    drone.setUpdatedAt(Long.parseLong((String) updatedAtObj));
                } catch (NumberFormatException e) {
                    drone.setUpdatedAt(System.currentTimeMillis());
                }
            } else {
                drone.setUpdatedAt(System.currentTimeMillis());
            }
        }
        if (updates.containsKey("restaurantId")) {
            drone.setRestaurantId(String.valueOf(updates.get("restaurantId")));
        }
        if (updates.containsKey("restaurantName")) {
            drone.setRestaurantName(String.valueOf(updates.get("restaurantName")));
        }
        if (updates.containsKey("lastMaintenance")) {
            Object maintenanceObj = updates.get("lastMaintenance");
            if (maintenanceObj instanceof Number) {
                drone.setLastMaintenance(((Number) maintenanceObj).longValue());
            }
        }
        if (updates.containsKey("flaggedForIssue")) {
            Object flaggedObj = updates.get("flaggedForIssue");
            if (flaggedObj instanceof Boolean) {
                drone.setFlaggedForIssue((Boolean) flaggedObj);
            } else if (flaggedObj instanceof String) {
                drone.setFlaggedForIssue(Boolean.parseBoolean((String) flaggedObj));
            }
        }
        if (updates.containsKey("issueDescription")) {
            Object issueObj = updates.get("issueDescription");
            drone.setIssueDescription(issueObj != null ? String.valueOf(issueObj) : null);
        }

        Drone saved = droneRepository.save(drone);
        return ResponseEntity.ok(saved);
    }
}

