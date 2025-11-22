package com.foodfast.controller;

import com.foodfast.entity.Analytics;
import com.foodfast.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * Analytics Controller
 * Provides analytics endpoints matching frontend expectations
 */
@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://192.168.0.100:5173",
        "http://192.168.0.100:5174",
        "http://192.168.0.100:5175",
        "http://localhost:8081"
})
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    /**
     * GET /api/analytics/restaurant/{restaurantId}
     * Get analytics for a restaurant for a specific period
     * Returns Analytics matching frontend RestaurantAnalytics interface
     */
    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<?> getRestaurantAnalytics(
            @PathVariable String restaurantId,
            @RequestParam(defaultValue = "day") String period) {
        try {
            // Always calculate fresh analytics (don't rely on stored data)
            Analytics analytics = analyticsService.calculateAnalytics(restaurantId, period);
            
            // Return as Map to match frontend expectations exactly
            Map<String, Object> response = new HashMap<>();
            response.put("period", analytics.getPeriod());
            response.put("revenue", analytics.getRevenue());
            response.put("orders", analytics.getOrders());
            response.put("avgOrderValue", analytics.getAvgOrderValue());
            response.put("deliveryTime", analytics.getDeliveryTime());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("error", "Failed to get analytics: " + e.getMessage()));
        }
    }

    /**
     * GET /api/analytics/restaurant/{restaurantId}/overview
     * Get restaurant overview matching frontend RestaurantOverview interface
     */
    @GetMapping("/restaurant/{restaurantId}/overview")
    public ResponseEntity<?> getRestaurantOverview(@PathVariable String restaurantId) {
        try {
            Map<String, Object> overview = analyticsService.getRestaurantOverview(restaurantId);
            return ResponseEntity.ok(overview);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("error", "Failed to get overview: " + e.getMessage()));
        }
    }
}

