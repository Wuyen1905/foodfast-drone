package com.foodfast.controller;

import com.foodfast.entity.Drone;
import com.foodfast.entity.Order;
import com.foodfast.repository.DroneRepository;
import com.foodfast.repository.OrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Realtime Controller
 * Provides real-time statistics for admin dashboard
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://192.168.0.100:5173",
        "http://192.168.0.100:5174",
        "http://192.168.0.100:5175",
        "http://localhost:8081",
        "http://192.168.0.100:8081",
        "exp://localhost:8081",
        "exp://192.168.0.100:8081"
})
public class RealtimeController {

    private final OrderRepository orderRepository;
    private final DroneRepository droneRepository;

    public RealtimeController(OrderRepository orderRepository, DroneRepository droneRepository) {
        this.orderRepository = orderRepository;
        this.droneRepository = droneRepository;
    }

    /**
     * GET /api/realtimeStats
     * Get real-time order and drone statistics for admin dashboard
     * Matches frontend RealtimeStats interface
     */
    @GetMapping("/realtimeStats")
    public ResponseEntity<Map<String, Object>> getRealtimeStats() {
        List<Order> orders = orderRepository.findAll();
        List<Drone> drones = droneRepository.findAll();

        // Count orders by status (matching frontend status values)
        long pending = orders.stream()
                .filter(o -> {
                    String status = o.getStatusString();
                    return "Pending".equalsIgnoreCase(status) || 
                           "Confirmed".equalsIgnoreCase(status) ||
                           "In Progress".equalsIgnoreCase(status) ||
                           "preparing".equalsIgnoreCase(status);
                })
                .count();

        long inProgress = orders.stream()
                .filter(o -> {
                    String status = o.getStatusString();
                    return "Ready".equalsIgnoreCase(status) || 
                           "Delivering".equalsIgnoreCase(status);
                })
                .count();

        long delivered = orders.stream()
                .filter(o -> {
                    String status = o.getStatusString();
                    return "Delivered".equalsIgnoreCase(status) ||
                           "Hoàn thành".equalsIgnoreCase(status);
                })
                .count();

        long cancelled = orders.stream()
                .filter(o -> {
                    String status = o.getStatusString();
                    return "Cancelled".equalsIgnoreCase(status) ||
                           "cancelled".equalsIgnoreCase(status);
                })
                .count();

        // Count active drones (delivering status)
        long activeDrones = drones.stream()
                .filter(d -> "Delivering".equalsIgnoreCase(d.getStatus()))
                .count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalOrders", orders.size());
        stats.put("pending", (int) pending);
        stats.put("inProgress", (int) inProgress);
        stats.put("delivered", (int) delivered);
        stats.put("cancelled", (int) cancelled);
        stats.put("activeDrones", (int) activeDrones);

        return ResponseEntity.ok(stats);
    }
}

