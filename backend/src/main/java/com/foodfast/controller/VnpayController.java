package com.foodfast.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * VNPAY Payment Integration Controller
 * Provides endpoints for VNPAY payment gateway integration
 */
@RestController
@RequestMapping("/api/vnpay")
@CrossOrigin(origins = "*")
public class VnpayController {

    // VNPAY Configuration from application.properties
    @Value("${vnpay.url:https://sandbox.vnpayment.vn/paymentv2/vpcpay.html}")
    private String vnpayUrl;

    @Value("${vnpay.tmnCode:YOUR_TMN_CODE}")
    private String tmnCode;

    @Value("${vnpay.hashSecret:YOUR_HASH_SECRET}")
    private String hashSecret;

    @Value("${vnpay.returnUrl:http://192.168.0.100:5173/payment-callback}")
    private String returnUrl;

    /**
     * Test endpoint to verify VNPAY controller is working
     */
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("OK");
    }

    /**
     * Create VNPAY payment URL
     * @param request Payment request containing amount and order info
     * @return VNPAY payment URL or error message
     */
    @PostMapping("/create-payment")
    public ResponseEntity<?> createPayment(@RequestBody Map<String, Object> request) {
        try {
            // Extract payment details
            Long amount = Long.valueOf(request.getOrDefault("amount", 0).toString());
            String orderId = request.getOrDefault("orderId", "ORDER-" + System.currentTimeMillis()).toString();
            String orderInfo = request.getOrDefault("orderInfo", "Thanh toan don hang").toString();
            String orderType = request.getOrDefault("orderType", "other").toString();
            String locale = request.getOrDefault("locale", "vn").toString();

            if (amount <= 0) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Invalid amount: " + amount));
            }

            // Build VNPAY payment parameters
            Map<String, String> vnpParams = new HashMap<>();
            vnpParams.put("vnp_Version", "2.1.0");
            vnpParams.put("vnp_Command", "pay");
            vnpParams.put("vnp_TmnCode", tmnCode);
            vnpParams.put("vnp_Amount", String.valueOf(amount * 100)); // VNPAY expects amount in cents
            vnpParams.put("vnp_CurrCode", "VND");
            vnpParams.put("vnp_TxnRef", orderId);
            vnpParams.put("vnp_OrderInfo", orderInfo);
            vnpParams.put("vnp_OrderType", orderType);
            vnpParams.put("vnp_Locale", locale);
            vnpParams.put("vnp_ReturnUrl", returnUrl);
            vnpParams.put("vnp_IpAddr", "192.168.0.100");
            vnpParams.put("vnp_CreateDate", new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()));

            // Sort parameters for hash generation
            List<String> fieldNames = new ArrayList<>(vnpParams.keySet());
            Collections.sort(fieldNames);
            
            StringBuilder queryString = new StringBuilder();
            
            for (String fieldName : fieldNames) {
                String fieldValue = vnpParams.get(fieldName);
                if (fieldValue != null && !fieldValue.isEmpty()) {
                    queryString.append(URLEncoder.encode(fieldName, StandardCharsets.UTF_8))
                            .append("=")
                            .append(URLEncoder.encode(fieldValue, StandardCharsets.UTF_8))
                            .append("&");
                }
            }

            // Remove trailing &
            if (queryString.length() > 0) {
                queryString.setLength(queryString.length() - 1);
            }

            // Generate secure hash
            String vnpSecureHash = generateSecureHash(hashSecret, vnpParams);
            queryString.append("&vnp_SecureHash=").append(vnpSecureHash);

            String paymentUrl = vnpayUrl + "?" + queryString.toString();

            System.out.println("[VNPAY] Created payment URL for order: " + orderId + ", amount: " + amount);
            System.out.println("[VNPAY] TMN Code: " + tmnCode);
            System.out.println("[VNPAY] Return URL: " + returnUrl);
            System.out.println("[VNPAY] Payment URL: " + paymentUrl);
            
            // Log warning if using default/placeholder values
            if ("YOUR_TMN_CODE".equals(tmnCode) || "YOUR_HASH_SECRET".equals(hashSecret)) {
                System.err.println("[VNPAY] WARNING: Using placeholder TMN code or hash secret. Please configure vnpay.tmnCode and vnpay.hashSecret in application.properties");
            }

            Map<String, Object> response = new HashMap<>();
            response.put("paymentUrl", paymentUrl);
            response.put("orderId", orderId);
            response.put("amount", amount);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.err.println("[VNPAY] Error creating payment URL: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body(Map.of("error", "Failed to create payment URL: " + e.getMessage()));
        }
    }

    /**
     * Generate HMAC SHA512 secure hash for VNPAY
     */
    private String generateSecureHash(String secretKey, Map<String, String> params) {
        try {
            List<String> fieldNames = new ArrayList<>(params.keySet());
            Collections.sort(fieldNames);

            StringBuilder data = new StringBuilder();
            for (String fieldName : fieldNames) {
                String fieldValue = params.get(fieldName);
                if (fieldValue != null && fieldValue.length() > 0) {
                    data.append(fieldName).append("=").append(fieldValue).append("&");
                }
            }

            if (data.length() > 0) data.deleteCharAt(data.length() - 1);

            String hashData = data.toString();

            Mac hmac = Mac.getInstance("HmacSHA512");
            SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
            hmac.init(secretKeySpec);

            return bytesToHex(hmac.doFinal(hashData.getBytes(StandardCharsets.UTF_8)));

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate VNPAY secure hash", e);
        }
    }

    /**
     * Convert byte array to hex string
     */
    private String bytesToHex(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString().toUpperCase();
    }
}

