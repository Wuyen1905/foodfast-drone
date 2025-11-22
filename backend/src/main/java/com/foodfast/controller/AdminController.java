package com.foodfast.controller;

import com.foodfast.entity.Drone;
import com.foodfast.entity.Order;
import com.foodfast.entity.Restaurant;
import com.foodfast.entity.User;
import com.foodfast.repository.DroneRepository;
import com.foodfast.repository.OrderRepository;
import com.foodfast.repository.RestaurantRepository;
import com.foodfast.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.Comparator;
import java.util.stream.Collectors;

/**
 * Admin Controller
 * Provides admin-specific endpoints matching frontend AdminApi expectations
 */
@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://192.168.0.100:5173",
        "http://192.168.0.100:5174",
        "http://192.168.0.100:5175",
        "http://localhost:8081"
})
public class AdminController {

    private final RestaurantRepository restaurantRepository;
    private final UserRepository userRepository;
    private final DroneRepository droneRepository;
    private final OrderRepository orderRepository;
    private final com.foodfast.service.AuthService authService;

    public AdminController(
            RestaurantRepository restaurantRepository,
            UserRepository userRepository,
            DroneRepository droneRepository,
            OrderRepository orderRepository,
            com.foodfast.service.AuthService authService) {
        this.restaurantRepository = restaurantRepository;
        this.userRepository = userRepository;
        this.droneRepository = droneRepository;
        this.orderRepository = orderRepository;
        this.authService = authService;
    }

    /**
     * GET /api/admin/stats
     * Get admin statistics matching AdminStats interface
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getAdminStats() {
        List<Restaurant> restaurants = restaurantRepository.findAll();
        List<User> users = userRepository.findAll();
        List<Drone> drones = droneRepository.findAll();
        List<Order> orders = orderRepository.findAll();

        List<User> customers = users.stream()
                .filter(u -> "customer".equals(u.getRole()))
                .collect(Collectors.toList());

        List<Restaurant> activeRestaurants = restaurants.stream()
                .filter(r -> Boolean.TRUE.equals(r.getIsActive()))
                .collect(Collectors.toList());

        long totalRevenue = orders.stream()
                .mapToLong(Order::getTotal)
                .sum();

        // Count drones by backend status (internal status, not frontend status)
        Map<String, Long> droneStatusCounts = drones.stream()
                .collect(Collectors.groupingBy(
                        d -> d.getStatus() != null ? d.getStatus() : "Idle",
                        Collectors.counting()
                ));

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalCustomers", (long) customers.size());
        stats.put("totalRestaurants", (long) restaurants.size());
        stats.put("activeRestaurants", (long) activeRestaurants.size());
        stats.put("pendingRestaurants", (long) (restaurants.size() - activeRestaurants.size()));
        stats.put("totalOrders", (long) orders.size());
        stats.put("totalRevenue", totalRevenue);
        stats.put("totalDrones", (long) drones.size());
        // Map backend status to frontend expected counts
        stats.put("activeDrones", droneStatusCounts.getOrDefault("Delivering", 0L).intValue());
        stats.put("idleDrones", droneStatusCounts.getOrDefault("Idle", 0L).intValue());
        stats.put("chargingDrones", droneStatusCounts.getOrDefault("Charging", 0L).intValue());
        stats.put("maintenanceDrones", droneStatusCounts.getOrDefault("Maintenance", 0L).intValue());

        return ResponseEntity.ok(stats);
    }

    /**
     * PATCH /api/admin/restaurants/{id}/status
     * Update restaurant status
     */
    @PatchMapping("/restaurants/{id}/status")
    public ResponseEntity<?> updateRestaurantStatus(
            @PathVariable String id,
            @RequestBody Map<String, Object> body) {
        Optional<Restaurant> restaurantOpt = restaurantRepository.findById(id);
        if (restaurantOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Restaurant restaurant = restaurantOpt.get();
        if (body.containsKey("isActive")) {
            Object isActiveObj = body.get("isActive");
            if (isActiveObj instanceof Boolean) {
                restaurant.setIsActive((Boolean) isActiveObj);
            } else if (isActiveObj instanceof String) {
                restaurant.setIsActive(Boolean.parseBoolean((String) isActiveObj));
            }
            restaurantRepository.save(restaurant);
            return ResponseEntity.ok(restaurant);
        }

        return ResponseEntity.badRequest().body(Map.of("error", "isActive field required"));
    }

    /**
     * PATCH /api/admin/users/{id}/suspend
     * Suspend a customer by changing role to "suspended"
     */
    @PatchMapping("/users/{id}/suspend")
    public ResponseEntity<?> suspendCustomer(@PathVariable String id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty() || !"customer".equals(userOpt.get().getRole())) {
            return ResponseEntity.notFound().build();
        }
        authService.updateUserRole(id, "suspended");
        return ResponseEntity.ok(Map.of("message", "Customer suspended"));
    }

    /**
     * PATCH /api/admin/users/{id}/reactivate
     * Reactivate a customer by changing role back to "customer"
     */
    @PatchMapping("/users/{id}/reactivate")
    public ResponseEntity<?> reactivateCustomer(@PathVariable String id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty() || !"suspended".equals(userOpt.get().getRole())) {
            return ResponseEntity.notFound().build();
        }
        authService.updateUserRole(id, "customer");
        return ResponseEntity.ok(Map.of("message", "Customer reactivated"));
    }

    /**
     * GET /api/admin/restaurants
     * Get all restaurants with admin-specific enriched data
     */
    @GetMapping("/restaurants")
    public ResponseEntity<List<Map<String, Object>>> getAllAdminRestaurants() {
        List<Restaurant> restaurants = restaurantRepository.findAll();
        List<Order> orders = orderRepository.findAll();
        List<Drone> drones = droneRepository.findAll();
        List<User> users = userRepository.findAll();

        List<Map<String, Object>> adminRestaurants = restaurants.stream().map(restaurant -> {
            // Calculate restaurant-specific stats
            List<Order> restaurantOrders = orders.stream()
                    .filter(o -> restaurant.getId().equals(o.getRestaurantId()) || restaurant.getId().equals(o.getRestaurant()))
                    .collect(Collectors.toList());

            List<Drone> restaurantDrones = drones.stream()
                    .filter(d -> restaurant.getId().equals(d.getRestaurantId()) || restaurant.getId().equals(d.getRestaurant()))
                    .collect(Collectors.toList());

            Optional<User> owner = users.stream()
                    .filter(u -> restaurant.getOwnerId().equals(u.getId()))
                    .findFirst();

            Map<String, Object> adminRestaurant = new HashMap<>();
            adminRestaurant.put("id", restaurant.getId());
            adminRestaurant.put("name", restaurant.getName());
            adminRestaurant.put("category", restaurant.getCategory() != null ? restaurant.getCategory() : "General");
            adminRestaurant.put("status", restaurant.getIsActive() != null && restaurant.getIsActive() ? "Active" : "Pending");
            adminRestaurant.put("ownerId", restaurant.getOwnerId());
            adminRestaurant.put("ownerName", owner.map(User::getName).orElse("Unknown"));
            adminRestaurant.put("totalOrders", restaurantOrders.size());
            adminRestaurant.put("totalRevenue", restaurantOrders.stream().mapToLong(Order::getTotal).sum());
            adminRestaurant.put("rating", restaurant.getRating() != null ? restaurant.getRating() : 0.0);
            adminRestaurant.put("droneCount", restaurantDrones.size());
            adminRestaurant.put("location", restaurant.getLocation() != null ? restaurant.getLocation() : "Unknown");
            adminRestaurant.put("createdAt", restaurant.getCreatedAt() != null ? restaurant.getCreatedAt() : System.currentTimeMillis());

            return adminRestaurant;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(adminRestaurants);
    }

    /**
     * GET /api/admin/customers
     * Get all customers with admin-specific enriched data
     */
    @GetMapping("/customers")
    public ResponseEntity<List<Map<String, Object>>> getAllAdminCustomers() {
        List<User> users = userRepository.findAll();
        List<Order> orders = orderRepository.findAll();

        List<Map<String, Object>> adminCustomers = users.stream()
                .filter(u -> "customer".equals(u.getRole()) || "suspended".equals(u.getRole()))
                .map(user -> {
                    List<Order> customerOrders = orders.stream()
                            .filter(o -> user.getId().equals(o.getUserId()))
                            .collect(Collectors.toList());

                    Optional<Order> lastOrder = customerOrders.stream()
                            .max(Comparator.comparing(o -> o.getCreatedAtInstant() != null ? o.getCreatedAtInstant().toEpochMilli() : 0L));

                    Map<String, Object> adminCustomer = new HashMap<>();
                    adminCustomer.put("id", user.getId());
                    adminCustomer.put("name", user.getName());
                    adminCustomer.put("phone", user.getPhone() != null ? user.getPhone() : "");
                    adminCustomer.put("email", user.getEmail() != null ? user.getEmail() : "");
                    adminCustomer.put("totalOrders", customerOrders.size());
                    adminCustomer.put("totalSpend", customerOrders.stream().mapToLong(Order::getTotal).sum());
                    // Map role to accountStatus: "customer" -> "Active", "suspended" -> "Suspended"
                    String accountStatus = "suspended".equals(user.getRole()) ? "Suspended" : "Active";
                    adminCustomer.put("accountStatus", accountStatus);
                    adminCustomer.put("createdAt", user.getCreatedAt() != null ? user.getCreatedAt() : System.currentTimeMillis());
                    // Convert Instant to Long timestamp for frontend
                    adminCustomer.put("lastOrderDate", lastOrder
                            .map(o -> o.getCreatedAtInstant() != null ? o.getCreatedAtInstant().toEpochMilli() : null)
                            .orElse(null));

                    return adminCustomer;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(adminCustomers);
    }

    /**
     * GET /api/admin/drones
     * Get all drones with admin-specific enriched data
     * Returns drones with status mapped to frontend AdminDrone format
     */
    @GetMapping("/drones")
    public ResponseEntity<List<Map<String, Object>>> getAllAdminDrones() {
        List<Drone> drones = droneRepository.findAll();
        
        // Transform to AdminDrone format matching frontend expectations
        List<Map<String, Object>> adminDrones = drones.stream().map(drone -> {
            Map<String, Object> adminDrone = new HashMap<>();
            adminDrone.put("id", drone.getId());
            adminDrone.put("restaurantId", drone.getRestaurantId() != null ? drone.getRestaurantId() : drone.getRestaurant());
            adminDrone.put("restaurantName", drone.getRestaurantName() != null ? drone.getRestaurantName() : "Unknown");
            // Map backend status to frontend AdminDrone status format
            String backendStatus = drone.getStatus() != null ? drone.getStatus() : "Idle";
            String frontendStatus = switch (backendStatus) {
                case "Idle" -> "Idle";
                case "Delivering" -> "Delivering";
                case "Charging" -> "Charging";
                case "Maintenance" -> "Maintenance";
                default -> "Idle";
            };
            adminDrone.put("status", frontendStatus);
            Integer battery = drone.getBatteryLevel();
            if (battery == null) {
                battery = drone.getBattery();
            }
            adminDrone.put("battery", battery);
            adminDrone.put("currentOrderId", drone.getCurrentOrderId());
            adminDrone.put("lastMaintenance", drone.getLastMaintenance() != null ? drone.getLastMaintenance() : System.currentTimeMillis());
            adminDrone.put("flaggedForIssue", drone.getFlaggedForIssue() != null ? drone.getFlaggedForIssue() : false);
            adminDrone.put("issueDescription", drone.getIssueDescription());
            return adminDrone;
        }).collect(Collectors.toList());
        
        return ResponseEntity.ok(adminDrones);
    }
}

