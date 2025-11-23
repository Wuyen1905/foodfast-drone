package com.foodfast.event;

import com.foodfast.entity.Order;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class OrderEventPublisher {

    private final SimpMessagingTemplate messagingTemplate;

    public OrderEventPublisher(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void publishOrderUpdate(Order order) {
        System.out.println("🔥 Broadcasting order update: " + order.getId());
        
        // Global realtime
        messagingTemplate.convertAndSend("/topic/orders", order);
        
        // Restaurant-specific realtime
        if (order.getRestaurantId() != null) {
            messagingTemplate.convertAndSend("/topic/orders/" + order.getRestaurantId(), order);
        }
    }
}
