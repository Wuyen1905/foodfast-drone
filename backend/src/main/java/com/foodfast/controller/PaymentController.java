package com.foodfast.controller;

import com.foodfast.service.VNPayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private VNPayService vnpayService;

    @PostMapping("/vnpay/create")
    public ResponseEntity<?> createPayment(@RequestBody Map<String, Object> body) {
        try {
            long amount = Long.parseLong(body.get("amount").toString());
            String orderId = body.get("orderId").toString();
            String url = vnpayService.createPaymentUrl(amount, orderId);
            return ResponseEntity.ok(Map.of("url", url));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Failed to create VNPay payment URL",
                "message", e.getMessage()
            ));
        }
    }
}

