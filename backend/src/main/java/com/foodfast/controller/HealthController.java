package com.foodfast.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Health Check Controller
 * Provides health check endpoint for monitoring and testing
 */
@RestController
public class HealthController {
    
    @GetMapping("/api/health")
    public Map<String, String> health() {
        return Map.of("status", "UP");
    }
}

