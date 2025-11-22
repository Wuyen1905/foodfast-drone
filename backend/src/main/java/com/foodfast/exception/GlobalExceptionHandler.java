package com.foodfast.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Global Exception Handler
 * Handles all exceptions and returns structured error responses
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handle(Exception ex, WebRequest req) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("error", ex.getClass().getSimpleName());
        body.put("message", ex.getMessage() != null ? ex.getMessage() : "An error occurred");
        body.put("path", req.getDescription(false).replace("uri=", ""));
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }
}

