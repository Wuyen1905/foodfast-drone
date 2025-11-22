package com.foodfast.controller;

import com.foodfast.dto.CreateOrderRequest;
import com.foodfast.entity.Order;
import com.foodfast.entity.OrderItem;
import com.foodfast.entity.OrderStatus;
import com.foodfast.service.OrderService;
import com.foodfast.service.RealtimeService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping({"/api/orders", "/orders"})
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;
    private final RealtimeService realtimeService;
    private final SimpMessagingTemplate messagingTemplate;

    public OrderController(OrderService orderService, RealtimeService realtimeService, SimpMessagingTemplate messagingTemplate) {
        this.orderService = orderService;
        this.realtimeService = realtimeService;
        this.messagingTemplate = messagingTemplate;
    }

    @GetMapping
    public ResponseEntity<?> getOrders(@RequestParam(required = false) String paymentSessionId,
                                       @RequestParam(required = false) String phone,
                                       @RequestParam(required = false) String restaurant) {
        try {
            System.out.println("[OrderController] GET /api/orders - psId: " + paymentSessionId + ", phone: " + phone + ", restaurant: " + restaurant);
            List<Order> orders = orderService.findOrders(paymentSessionId, phone, restaurant);
            return ResponseEntity.ok(orders != null ? orders : List.of());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to fetch orders: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrder(@PathVariable String id) {
        Optional<Order> order = orderService.findById(id);
        return order.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody @Valid CreateOrderRequest request) {
        Order saved = orderService.createOrderFromRequest(request);
        if (request.paymentSessionId != null && !request.paymentSessionId.isBlank()) {
            saved.setPaymentSessionId(request.paymentSessionId);
        }
        messagingTemplate.convertAndSend("/topic/orders", saved);
        realtimeService.sendOrderUpdate(saved);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> patchOrder(
            @PathVariable String id,
            @RequestBody Map<String, Object> body
    ) {
        try {
            Optional<Order> orderOpt = orderService.findById(id);
            if (orderOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Order order = orderOpt.get();
            boolean updated = false;

            // Process status
            if (body.containsKey("status")) {
                String rawStatus = String.valueOf(body.get("status"));
                OrderStatus status = OrderStatus.valueOf(
                        rawStatus.trim().toUpperCase(Locale.ROOT)
                );
                order = orderService.updateStatus(id, status);
                messagingTemplate.convertAndSend("/topic/orders", order);
                updated = true;
            }

            // Process other fields
            if (body.containsKey("confirmedAt")) {
                Object confirmedAtObj = body.get("confirmedAt");
                if (confirmedAtObj instanceof Number) {
                    order.setConfirmedAt(((Number) confirmedAtObj).longValue());
                    updated = true;
                }
            }

            if (body.containsKey("cancelledAt")) {
                Object cancelledAtObj = body.get("cancelledAt");
                if (cancelledAtObj instanceof Number) {
                    order.setCancelledAt(((Number) cancelledAtObj).longValue());
                    updated = true;
                }
            }

            if (body.containsKey("internalNotes")) {
                order.setInternalNotes(String.valueOf(body.get("internalNotes")));
                updated = true;
            }

            if (body.containsKey("confirmedBy")) {
                order.setConfirmedBy(String.valueOf(body.get("confirmedBy")));
                updated = true;
            }

            if (body.containsKey("dronePath")) {
                Object dronePathObj = body.get("dronePath");
                if (dronePathObj instanceof List) {
                    @SuppressWarnings("unchecked")
                    List<String> dronePathList = (List<String>) dronePathObj;
                    order.setDronePath(dronePathList);
                    updated = true;
                }
            }

            if (body.containsKey("vnpayTransactionId")) {
                order.setVnpayTransactionId(String.valueOf(body.get("vnpayTransactionId")));
                updated = true;
            }

            if (updated) {
                order = orderService.save(order);
                realtimeService.sendOrderUpdate(order);
                return ResponseEntity.ok(order);
            }

            // No changes applied
            return ResponseEntity.ok(
                Map.of("message", "No changes applied")
            );

        } catch (IllegalArgumentException e) {
            // Invalid status value
            return ResponseEntity.badRequest().body(
                    Map.of("error", "Invalid status: " + e.getMessage())
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    public static class OrderItemRequest {
        private String productId;

        @NotBlank
        private String name;

        @NotNull
        @Min(1)
        private Integer quantity;

        @NotNull
        @Min(0)
        private Integer price;

        public OrderItem toEntity() {
            OrderItem item = new OrderItem();
            item.setProductId(productId);
            item.setName(name);
            item.setQuantity(quantity);
            item.setPrice(price != null ? price : 0);
            return item;
        }

        public String getProductId() { return productId; }
        public void setProductId(String productId) { this.productId = productId; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }

        public Integer getPrice() { return price; }
        public void setPrice(Integer price) { this.price = price; }
    }
}
