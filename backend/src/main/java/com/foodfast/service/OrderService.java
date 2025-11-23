package com.foodfast.service;

import com.foodfast.controller.OrderController;
import com.foodfast.dto.CreateOrderRequest;
import com.foodfast.entity.Order;
import com.foodfast.entity.OrderItem;
import com.foodfast.entity.OrderStatus;
import com.foodfast.event.OrderEventPublisher;
import com.foodfast.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderEventPublisher orderEventPublisher;
    private final NotificationService notificationService;

    public OrderService(
            OrderRepository orderRepository, 
            OrderEventPublisher orderEventPublisher,
            NotificationService notificationService) {
        this.orderRepository = orderRepository;
        this.orderEventPublisher = orderEventPublisher;
        this.notificationService = notificationService;
    }

    @Transactional(readOnly = true)
    public List<Order> findOrders(String paymentSessionId, String phone, String restaurant) {
        try {
            System.out.println("[OrderService] findOrders - paymentSessionId: " 
                    + paymentSessionId + ", phone: " + phone + ", restaurant: " + restaurant);
            
            List<Order> orders;
            
            // Check paymentSessionId first (highest priority)
            if (StringUtils.hasText(paymentSessionId)) {
                orders = orderRepository.findByPaymentSessionId(paymentSessionId);
            } else {
                // Fall back to phone/restaurant filters
                boolean hasPhone = StringUtils.hasText(phone);
                boolean hasRestaurantId = StringUtils.hasText(restaurant);

                if (hasPhone && hasRestaurantId) {
                    orders = orderRepository.findByCustomerPhoneContainingIgnoreCaseAndRestaurantId(
                            phone, restaurant
                    );
                } else if (hasPhone) {
                    orders = orderRepository.findByCustomerPhoneContainingIgnoreCase(phone);
                } else if (hasRestaurantId) {
                    orders = orderRepository.findByRestaurantId(restaurant);
                } else {
                    orders = orderRepository.findAll();
                }
            }

            // Ensure items are initialized (safety check even with EAGER fetch)
            if (orders != null) {
                for (Order order : orders) {
                    if (order != null) {
                        // Ensure items list is initialized
                        List<OrderItem> items = order.getItems();
                        if (items != null) {
                            // Access items to ensure they're loaded
                            items.size();
                        }
                    }
                }
            }

            System.out.println("[OrderService] Returning " + (orders != null ? orders.size() : 0) + " orders");
            return orders != null ? orders : new ArrayList<>();
        } catch (Exception e) {
            System.err.println("[OrderService] ERROR in findOrders: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public Optional<Order> findById(String id) {
        return orderRepository.findById(id);
    }

    @Transactional
    public Order createOrderFromRequest(CreateOrderRequest req) {
        Order order = new Order();
        
        // Set ID if provided, otherwise generate
        if (req.id != null && !req.id.trim().isEmpty()) {
            order.setId(req.id);
        } else {
            order.setId(generateOrderId());
        }
        
        order.setCustomerName(req.customerName);
        order.setCustomerPhone(req.customerPhone);
        order.setAddress(req.address);
        order.setRestaurantId(req.restaurantId);
        order.setUserId(req.userId);
        order.setPaymentSessionId(req.paymentSessionId);
        
        // Convert timestamps from long to Instant
        if (req.createdAt > 0) {
            order.setCreatedAt(Instant.ofEpochMilli(req.createdAt));
        } else {
            order.setCreatedAt(Instant.now());
        }
        
        if (req.updatedAt > 0) {
            order.setUpdatedAt(Instant.ofEpochMilli(req.updatedAt));
        } else {
            order.setUpdatedAt(Instant.now());
        }
        
        // Convert status from String to OrderStatus enum
        if (req.status != null && !req.status.trim().isEmpty()) {
            try {
                order.setStatus(OrderStatus.valueOf(req.status.trim().toUpperCase(Locale.ROOT)));
            } catch (IllegalArgumentException e) {
                order.setStatus(OrderStatus.PENDING);
            }
        } else {
            order.setStatus(OrderStatus.PENDING);
        }
        
        order.setPaymentMethod(req.paymentMethod);
        order.setPaymentStatus(req.paymentStatus);
        
        // Convert items and validate prices
        List<OrderItem> items = new ArrayList<>();
        if (req.items != null && !req.items.isEmpty()) {
            for (CreateOrderRequest.Item i : req.items) {
                if (i == null) {
                    continue;
                }
                OrderItem item = new OrderItem();
                item.setName(i.name != null ? i.name : "");
                // Support both qty and quantity fields from frontend
                int itemQty = i.getQuantity();
                item.setQty(itemQty);
                // Ensure price is not zero - use price from request
                System.out.println("[DEBUG] Incoming item: " + i.name + " rawPrice=" + i.price);
                int itemPrice = 0;
                try {
                    itemPrice = Math.toIntExact(i.price);
                } catch (Exception e) {
                    System.err.println("[PRICE ERROR] Invalid price: " + i.price);
                    itemPrice = 0;
                }
                item.setPrice(itemPrice);
                item.setOrder(order);
                items.add(item);
                System.out.println("[OrderService] Added item: " + i.name + " x" + itemQty + " @ " + itemPrice + " (lineTotal: " + item.lineTotal() + ")");
            }
        }
        
        order.setItems(items);
        
        // Always recalculate total from items
        order.recalculateTotal();
        
        System.out.println("[DEBUG] Saving order " + order.getId() + " total=" + order.getTotal() + " items=" + order.getItems());
        System.out.println("[OrderService] Order " + order.getId() + " total calculated = " + order.getTotal());
        System.out.println("[OrderService] Order has " + (items != null ? items.size() : 0) + " items");
        
        Order saved = orderRepository.save(order);
        orderEventPublisher.publishOrderUpdate(saved);
        
        // Create notification for restaurant
        try {
            notificationService.createNotification(saved);
        } catch (Exception e) {
            // Log but don't fail order creation if notification fails
            System.err.println("[OrderService] Failed to create notification: " + e.getMessage());
        }
        
        return saved;
    }

    @Transactional
    public Order createOrder(CreateOrderRequest req) {
        Order order = new Order();
        
        // Set ID if provided, otherwise generate
        if (req.id != null && !req.id.trim().isEmpty()) {
            order.setId(req.id);
        } else {
            order.setId(generateOrderId());
        }
        
        // Copy basic fields
        order.setCustomerName(req.customerName);
        order.setCustomerPhone(req.customerPhone);
        order.setAddress(req.address);
        
        // Convert status from String to OrderStatus enum
        if (req.status != null && !req.status.trim().isEmpty()) {
            try {
                order.setStatus(OrderStatus.valueOf(req.status.trim().toUpperCase(Locale.ROOT)));
            } catch (IllegalArgumentException e) {
                order.setStatus(OrderStatus.PENDING);
            }
        } else {
            order.setStatus(OrderStatus.PENDING);
        }
        
        // Copy restaurant and user info
        order.setRestaurantId(req.restaurantId);
        order.setUserId(req.userId);
        order.setPaymentSessionId(req.paymentSessionId);
        
        // Copy payment info
        order.setPaymentMethod(req.paymentMethod);
        order.setPaymentStatus(req.paymentStatus);
        
        // Convert timestamps from long to Instant
        if (req.createdAt > 0) {
            order.setCreatedAt(Instant.ofEpochMilli(req.createdAt));
        } else {
            order.setCreatedAt(Instant.now());
        }
        
        if (req.updatedAt > 0) {
            order.setUpdatedAt(Instant.ofEpochMilli(req.updatedAt));
        } else {
            order.setUpdatedAt(Instant.now());
        }
        
        // Convert items and validate prices
        if (req.items != null && !req.items.isEmpty()) {
            for (CreateOrderRequest.Item itemReq : req.items) {
                if (itemReq == null) {
                    continue;
                }
                OrderItem item = new OrderItem();
                item.setName(itemReq.name != null ? itemReq.name : "");
                // Support both qty and quantity fields from frontend
                int itemQty = itemReq.getQuantity();
                item.setQty(itemQty);
                // Ensure price is not zero
                System.out.println("[DEBUG] Incoming item: " + itemReq.name + " rawPrice=" + itemReq.price);
                int itemPrice = 0;
                try {
                    itemPrice = Math.toIntExact(itemReq.price);
                } catch (Exception e) {
                    System.err.println("[PRICE ERROR] Invalid price: " + itemReq.price);
                    itemPrice = 0;
                }
                item.setPrice(itemPrice);
                item.setOrder(order);
                order.getItems().add(item);
                System.out.println("[OrderService] Added item: " + itemReq.name + " x" + itemQty + " @ " + itemPrice + " (lineTotal: " + item.lineTotal() + ")");
            }
        }
        
        // Always recalculate total from items
        order.recalculateTotal();
        
        System.out.println("[DEBUG] Saving order " + order.getId() + " total=" + order.getTotal() + " items=" + order.getItems());
        System.out.println("[OrderService] Order " + order.getId() + " total calculated = " + order.getTotal());
        System.out.println("[OrderService] Order has " + (order.getItems() != null ? order.getItems().size() : 0) + " items");
        
        Order saved = orderRepository.save(order);
        orderEventPublisher.publishOrderUpdate(saved);
        
        // Create notification for restaurant
        try {
            notificationService.createNotification(saved);
        } catch (Exception e) {
            // Log but don't fail order creation if notification fails
            System.err.println("[OrderService] Failed to create notification: " + e.getMessage());
        }
        
        return saved;
    }

    @Transactional
    public Order createOrder(Order order) {
        if (CollectionUtils.isEmpty(order.getItems())) {
            throw new IllegalArgumentException("Order must contain at least one item");
        }

        if (!StringUtils.hasText(order.getId())) {
            order.setId(generateOrderId());
        }

        if (order.getStatusEnum() == null) {
            order.setStatus(OrderStatus.PENDING);
        }

        // Always recalculate total from items
        order.recalculateTotal();
        
        System.out.println("[DEBUG] Saving order " + order.getId() + " total=" + order.getTotal() + " items=" + order.getItems());
        System.out.println("[OrderService] Order " + order.getId() + " total calculated = " + order.getTotal());
        System.out.println("[OrderService] Order has " + (order.getItems() != null ? order.getItems().size() : 0) + " items");
        
        Order saved = orderRepository.save(order);
        orderEventPublisher.publishOrderUpdate(saved);
        
        // Create notification for restaurant
        try {
            notificationService.createNotification(saved);
        } catch (Exception e) {
            // Log but don't fail order creation if notification fails
            System.err.println("[OrderService] Failed to create notification: " + e.getMessage());
        }
        
        return saved;
    }

    @Transactional
    public Order updateStatus(String id, OrderStatus status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Order not found: " + id));
        order.setStatus(status);
        Order saved = orderRepository.save(order);
        orderEventPublisher.publishOrderUpdate(saved);
        
        // Create notification for restaurant
        try {
            notificationService.createNotification(saved);
        } catch (Exception e) {
            // Log but don't fail order creation if notification fails
            System.err.println("[OrderService] Failed to create notification: " + e.getMessage());
        }
        
        return saved;
    }

    @Transactional
    public Order save(Order order) {
        Order saved = orderRepository.save(order);
        orderEventPublisher.publishOrderUpdate(saved);
        return saved;
    }

    /**
     * Calculate total from order items: sum(item.price * item.qty)
     */
    private int calculateTotal(List<OrderItem> items) {
        if (items == null || items.isEmpty()) {
            return 0;
        }
        int total = 0;
        for (OrderItem item : items) {
            if (item != null && item.getPrice() > 0 && item.getQty() > 0) {
                total += item.getPrice() * item.getQty();
            }
        }
        return total;
    }

    private int safeExtractPrice(long priceFromRequest) {
        try {
            return Math.toIntExact(priceFromRequest);
        } catch (Exception e) {
            System.err.println("[OrderService] INVALID PRICE VALUE: " + priceFromRequest);
            return 0;
        }
    }

    private int safeExtractTotal(long totalFromRequest) {
        try {
            return Math.toIntExact(totalFromRequest);
        } catch (Exception e) {
            System.err.println("[OrderService] INVALID TOTAL VALUE: " + totalFromRequest);
            return 0;
        }
    }

    private String generateOrderId() {
        return "ORDER-" + UUID.randomUUID().toString().replaceAll("-", "").substring(0, 12).toUpperCase();
    }
}

