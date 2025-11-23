package com.foodfast.service;

import com.foodfast.entity.Analytics;
import com.foodfast.entity.Drone;
import com.foodfast.entity.Order;
import com.foodfast.entity.OrderItem;
import com.foodfast.entity.Restaurant;
import com.foodfast.repository.AnalyticsRepository;
import com.foodfast.repository.DroneRepository;
import com.foodfast.repository.OrderRepository;
import com.foodfast.repository.RestaurantRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Analytics Service
 * Calculates and provides analytics data for restaurants
 */
@Service
public class AnalyticsService {

    private final AnalyticsRepository analyticsRepository;
    private final OrderRepository orderRepository;
    private final RestaurantRepository restaurantRepository;
    private final DroneRepository droneRepository;

    public AnalyticsService(
            AnalyticsRepository analyticsRepository,
            OrderRepository orderRepository,
            RestaurantRepository restaurantRepository,
            DroneRepository droneRepository) {
        this.analyticsRepository = analyticsRepository;
        this.orderRepository = orderRepository;
        this.restaurantRepository = restaurantRepository;
        this.droneRepository = droneRepository;
    }

    /**
     * Get analytics for a restaurant for a specific period
     * Note: This method is not used since we always calculate fresh analytics
     */
    @Transactional(readOnly = true)
    public Optional<Analytics> getAnalytics(String restaurantId, String period) {
        // Map period parameter to Vietnamese label for lookup
        String periodLabel = switch (period.toLowerCase()) {
            case "day" -> "Hôm nay";
            case "week" -> "Tuần này";
            case "month" -> "Tháng này";
            default -> "Hôm nay";
        };
        return analyticsRepository.findByRestaurantIdAndPeriod(restaurantId, periodLabel);
    }

    /**
     * Calculate analytics from orders for a restaurant
     * Returns Analytics with period label matching frontend expectations
     */
    @Transactional(readOnly = true)
    public Analytics calculateAnalytics(String restaurantId, String period) {
        List<Order> orders = orderRepository.findByRestaurantId(restaurantId);
        
        // Filter orders by period
        Instant now = Instant.now();
        Instant startDate;
        String periodLabel;
        
        switch (period.toLowerCase()) {
            case "day":
                startDate = now.minusSeconds(24 * 60 * 60);
                periodLabel = "Hôm nay";
                break;
            case "week":
                startDate = now.minusSeconds(7 * 24 * 60 * 60);
                periodLabel = "Tuần này";
                break;
            case "month":
                startDate = now.minusSeconds(30 * 24 * 60 * 60);
                periodLabel = "Tháng này";
                break;
            default:
                startDate = now.minusSeconds(24 * 60 * 60);
                periodLabel = "Hôm nay";
        }
        
        List<Order> filteredOrders = orders.stream()
                .filter(order -> {
                    Instant orderDate = order.getCreatedAtInstant();
                    return orderDate != null && orderDate.isAfter(startDate);
                })
                .collect(Collectors.toList());
        
        long revenue = filteredOrders.stream()
                .mapToLong(Order::getTotal)
                .sum();
        
        int ordersCount = filteredOrders.size();
        int avgOrderValue = ordersCount > 0 ? (int) (revenue / ordersCount) : 0;
        
        // Default delivery time (should be calculated from actual delivery data)
        int deliveryTime = 18;
        
        Analytics analytics = new Analytics();
        analytics.setId(UUID.randomUUID().toString());
        analytics.setRestaurantId(restaurantId);
        analytics.setPeriod(periodLabel); // Use Vietnamese label for frontend
        analytics.setRevenue((int) revenue);
        analytics.setOrders(ordersCount);
        analytics.setAvgOrderValue(avgOrderValue);
        analytics.setDeliveryTime(deliveryTime);
        analytics.setCreatedAt(System.currentTimeMillis());
        
        return analytics;
    }

    /**
     * Get restaurant overview with KPIs
     */
    @Transactional(readOnly = true)
    public Map<String, Object> getRestaurantOverview(String restaurantId) {
        Optional<Restaurant> restaurantOpt = restaurantRepository.findById(restaurantId);
        if (restaurantOpt.isEmpty()) {
            return Collections.emptyMap();
        }
        
        Restaurant restaurant = restaurantOpt.get();
        List<Order> orders = orderRepository.findByRestaurantId(restaurantId);
        
        // Calculate today's orders
        LocalDate today = LocalDate.now();
        long todayOrders = orders.stream()
                .filter(order -> {
                    if (order.getCreatedAtInstant() == null) return false;
                    LocalDate orderDate = order.getCreatedAtInstant()
                            .atZone(ZoneId.systemDefault())
                            .toLocalDate();
                    return orderDate.equals(today);
                })
                .count();
        
        long todayRevenue = orders.stream()
                .filter(order -> {
                    if (order.getCreatedAtInstant() == null) return false;
                    LocalDate orderDate = order.getCreatedAtInstant()
                            .atZone(ZoneId.systemDefault())
                            .toLocalDate();
                    return orderDate.equals(today);
                })
                .mapToLong(Order::getTotal)
                .sum();
        
        // Calculate active drones
        List<Drone> restaurantDrones = droneRepository.findByRestaurantId(restaurantId);
        long activeDrones = restaurantDrones.stream()
                .filter(d -> "Delivering".equalsIgnoreCase(d.getStatus()))
                .count();

        // Calculate top items from today's orders
        Map<String, ItemStats> itemStatsMap = new HashMap<>();
        for (Order order : orders) {
            if (order.getCreatedAtInstant() == null) continue;
            LocalDate orderDate = order.getCreatedAtInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();
            if (!orderDate.equals(today)) continue;

            for (OrderItem item : order.getItems()) {
                String itemName = item.getName();
                ItemStats stats = itemStatsMap.getOrDefault(itemName, new ItemStats(itemName));
                stats.orders += item.getQty();
                stats.revenue += item.getPrice() * item.getQty();
                itemStatsMap.put(itemName, stats);
            }
        }

        List<Map<String, Object>> topItems = itemStatsMap.values().stream()
                .sorted((a, b) -> Long.compare(b.revenue, a.revenue))
                .limit(5)
                .map(stats -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("name", stats.name);
                    item.put("orders", stats.orders);
                    item.put("revenue", stats.revenue);
                    return item;
                })
                .collect(Collectors.toList());

        Map<String, Object> overview = new HashMap<>();
        overview.put("id", restaurant.getId());
        overview.put("name", restaurant.getName());
        overview.put("revenue", todayRevenue);
        overview.put("ordersToday", (int) todayOrders);
        overview.put("activeDrones", (int) activeDrones);
        overview.put("avgDeliveryTime", 18);
        overview.put("rating", restaurant.getRating() != null ? restaurant.getRating() : 0.0);
        overview.put("topItems", topItems);
        
        return overview;
    }

    // Helper class for item statistics
    private static class ItemStats {
        String name;
        int orders = 0;
        long revenue = 0;

        ItemStats(String name) {
            this.name = name;
        }
    }
}

