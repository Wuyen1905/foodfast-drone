package com.foodfast.service;

import com.foodfast.entity.CartItem;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RealtimeService {

    private final SimpMessagingTemplate messagingTemplate;

    public RealtimeService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendOrderUpdate(Object order) {
        messagingTemplate.convertAndSend("/topic/orders", order);
    }

    public void sendDroneUpdate(Object drone) {
        messagingTemplate.convertAndSend("/topic/drone", drone);
    }

    public void sendCartUpdate(List<CartItem> cartItems) {
        messagingTemplate.convertAndSend("/topic/cart", cartItems);
    }
}

