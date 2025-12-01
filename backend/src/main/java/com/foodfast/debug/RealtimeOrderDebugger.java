package com.foodfast.debug;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Minimal debug logger for realtime order flow.
 * Writes to analysis/realtime_backend_order.md
 * Does NOT modify existing realtime flows.
 */
public class RealtimeOrderDebugger {
    private static final String LOG_FILE = "analysis/realtime_backend_order.md";
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");

    private static synchronized void appendLog(String event, Object data) {
        try {
            Path logPath = Paths.get(LOG_FILE);
            
            // Create directory if it doesn't exist
            if (logPath.getParent() != null) {
                Files.createDirectories(logPath.getParent());
            }
            
            // Initialize file with header if it doesn't exist
            if (!Files.exists(logPath)) {
                try (FileWriter writer = new FileWriter(LOG_FILE, true)) {
                    writer.write("# Realtime Backend Order Debug Log\n\n");
                    writer.write("This file logs the order creation pipeline: MOBILE → POST /api/orders → WebSocket → WEB Dashboard\n\n");
                    writer.write("---\n\n");
                }
            }
            
            // Append log entry
            try (FileWriter writer = new FileWriter(LOG_FILE, true)) {
                String timestamp = LocalDateTime.now().format(formatter);
                String jsonData = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(data);
                
                writer.write(String.format("## [%s] %s\n\n", timestamp, event));
                writer.write("```json\n");
                writer.write(jsonData);
                writer.write("\n```\n\n");
                writer.write("---\n\n");
                writer.flush();
            }
        } catch (IOException e) {
            // Silent fail - don't break the application
            System.err.println("[RealtimeOrderDebugger] Failed to write log: " + e.getMessage());
        }
    }

    public static void logNewOrderRequest(Object request) {
        appendLog("NEW_ORDER_REQUEST", request);
    }

    public static void logOrderSaved(String orderId, String restaurantId) {
        java.util.Map<String, Object> data = new java.util.HashMap<>();
        data.put("orderId", orderId != null ? orderId : "null");
        data.put("restaurantId", restaurantId != null ? restaurantId : "null");
        appendLog("ORDER_SAVED", data);
    }

    public static void logWsPublishGlobal(Object order) {
        java.util.Map<String, Object> data = new java.util.HashMap<>();
        data.put("topic", "/topic/orders");
        data.put("order", order);
        appendLog("WS_PUBLISH_GLOBAL", data);
    }

    public static void logWsPublishRestaurant(String restaurantId, Object order) {
        java.util.Map<String, Object> data = new java.util.HashMap<>();
        data.put("topic", "/topic/orders/" + (restaurantId != null ? restaurantId : "null"));
        data.put("restaurantId", restaurantId != null ? restaurantId : "null");
        data.put("order", order);
        appendLog("WS_PUBLISH_RESTAURANT", data);
    }
}

