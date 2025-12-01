package com.foodfast.debug;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

/**
 * Minimal endpoint to receive API debug logs from frontend.
 * Writes to analysis/realtime_order_api.md
 */
@RestController
@RequestMapping("/api/debug")
@CrossOrigin(origins = "*")
public class ApiLogController {
    private static final String LOG_FILE = "analysis/realtime_order_api.md";
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");

    @PostMapping("/api-log")
    public ResponseEntity<?> logApiEvent(@RequestBody Map<String, Object> logData) {
        try {
            Path logPath = Paths.get(LOG_FILE);
            
            // Create directory if it doesn't exist
            if (logPath.getParent() != null) {
                Files.createDirectories(logPath.getParent());
            }
            
            // Initialize file with header if it doesn't exist
            if (!Files.exists(logPath)) {
                try (FileWriter writer = new FileWriter(LOG_FILE, true)) {
                    writer.write("# Realtime Order API Debug Log\n\n");
                    writer.write("This file logs GET requests to /api/orders from the frontend.\n\n");
                    writer.write("---\n\n");
                }
            }
            
            // Append log entry
            try (FileWriter writer = new FileWriter(LOG_FILE, true)) {
                String event = (String) logData.get("event");
                Object data = logData.get("data");
                String timestamp = logData.containsKey("timestamp") 
                    ? (String) logData.get("timestamp")
                    : LocalDateTime.now().format(formatter);
                
                String jsonData = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(data);
                
                writer.write(String.format("## [%s] %s\n\n", timestamp, event));
                writer.write("```json\n");
                writer.write(jsonData);
                writer.write("\n```\n\n");
                writer.write("---\n\n");
                writer.flush();
            }
            
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            // Silent fail - don't break the application
            return ResponseEntity.status(500).build();
        }
    }
}

