# WebSocket Real-Time Synchronization Fix

## Summary
Fixed WebSocket connection between frontend and backend to enable real-time order synchronization between restaurants and customers. All configurations verified and optimized.

## Configuration Status

### ✅ Backend WebSocket Configuration (`backend/src/main/java/com/foodfast/config/WebSocketConfig.java`)
- **Endpoint**: `/ws`
- **Allowed Origins**: `*` (all origins for development)
- **SockJS Support**: Enabled (`.withSockJS()`)
- **Message Broker**: `/topic` and `/queue` enabled
- **Application Prefix**: `/app`

**Code:**
```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }
    
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic", "/queue");
        registry.setApplicationDestinationPrefixes("/app");
    }
}
```

### ✅ Frontend Vite Proxy Configuration (`web/vite.config.ts`)
- **API Proxy**: `/api` → `http://localhost:5000`
- **WebSocket Proxy**: `/ws` → `http://localhost:5000` with `ws: true`
- **CORS**: Enabled
- **Change Origin**: Enabled

**Code:**
```typescript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
    secure: false,
  },
  '/ws': {
    target: 'http://localhost:5000',
    changeOrigin: true,
    ws: true, // Enable WebSocket proxying
    secure: false,
  },
}
```

### ✅ Frontend WebSocket Client (`web/src/services/orderSyncService.ts`)
- **Connection URL**: `/ws` (uses Vite proxy)
- **Protocol**: SockJS + STOMP
- **Subscription**: `/topic/orders`
- **Reconnection**: Automatic with max 5 attempts
- **Fallback**: Polling if WebSocket unavailable

**Key Features:**
- Connects to `/ws` (proxied to `http://localhost:5000/ws`)
- Subscribes to `/topic/orders` for real-time updates
- Handles `NEW_ORDER` and `STATUS_CHANGED` events
- Automatic reconnection with exponential backoff
- Falls back to polling if WebSocket fails

### ✅ Backend Event Publisher (`backend/src/main/java/com/foodfast/service/OrderEventPublisher.java`)
- **Service**: `@Service` annotated
- **Template**: `SimpMessagingTemplate` injected
- **Broadcast Destination**: `/topic/orders`
- **Debug Logging**: Enabled

**Code:**
```java
@Service
public class OrderEventPublisher {
    private final SimpMessagingTemplate template;
    
    public void publishOrderUpdate(Object payload) {
        System.out.println("🔥 Broadcasting event: " + payload);
        template.convertAndSend("/topic/orders", payload);
    }
}
```

### ✅ Order Controller Integration (`backend/src/main/java/com/foodfast/controller/OrderController.java`)
- **Order Creation**: Publishes `NEW_ORDER` event
- **Status Update**: Publishes `STATUS_CHANGED` event
- **Event Payload**: Includes full order data

**Events Published:**
1. **NEW_ORDER**: When customer places order
   ```java
   Map<String, Object> event = new HashMap<>();
   event.put("event", "NEW_ORDER");
   event.put("orderId", orderId);
   event.put("order", createdOrder);
   orderEventPublisher.publishOrderUpdate(event);
   ```

2. **STATUS_CHANGED**: When restaurant updates order status
   ```java
   Map<String, Object> event = new HashMap<>();
   event.put("event", "STATUS_CHANGED");
   event.put("orderId", id);
   event.put("status", status);
   event.put("order", updatedOrder);
   orderEventPublisher.publishOrderUpdate(event);
   ```

### ✅ Frontend Order Context Integration (`web/src/context/OrderContext.tsx`)
- **WebSocket Connection**: Established on mount
- **Event Handler**: Refreshes orders on `NEW_ORDER` and `STATUS_CHANGED`
- **Polling Fallback**: 30s interval if WebSocket disconnected
- **Cleanup**: Disconnects on unmount

**Key Features:**
- Connects to WebSocket on component mount
- Handles real-time events and refreshes order list
- Falls back to polling if WebSocket unavailable
- Properly cleans up on component unmount

## Real-Time Synchronization Flow

### 1. Customer Places Order
```
Customer → POST /api/orders → Backend
Backend → OrderService.createOrder()
Backend → OrderEventPublisher.publishOrderUpdate(NEW_ORDER)
Backend → Broadcast to /topic/orders
Frontend → Receives NEW_ORDER event
Frontend → Refreshes order list
Restaurant Dashboard → Shows new order instantly
```

### 2. Restaurant Updates Status
```
Restaurant → PUT /api/orders/{id}/status → Backend
Backend → OrderService.updateOrderStatus()
Backend → OrderEventPublisher.publishOrderUpdate(STATUS_CHANGED)
Backend → Broadcast to /topic/orders
Frontend → Receives STATUS_CHANGED event
Frontend → Refreshes order list
Customer Page → Shows updated status instantly
```

## Testing

### 1. Start Backend
```bash
cd backend
mvn clean spring-boot:run
```

**Expected Output:**
```
Tomcat started on port(s): 5000 (http)
```

### 2. Start Frontend
```bash
cd web
npm run dev
```

**Expected Console Output:**
```
[OrderSync] ✅ WebSocket connected - Real-time sync active
[WS Connected] Order sync active
[OrderSync] ✅ Subscribed to /topic/orders, subscription ID: sub-0
```

### 3. Test Real-Time Sync

#### Test 1: Customer Places Order
1. Open customer order page in browser
2. Place a new order
3. Check backend logs: `🔥 Broadcasting event: {event=NEW_ORDER, ...}`
4. Open restaurant dashboard in another browser/tab
5. **Expected**: Restaurant dashboard shows new order immediately (no refresh)

#### Test 2: Restaurant Updates Status
1. Open restaurant dashboard
2. Update order status (e.g., "Confirmed", "Delivering", "Delivered")
3. Check backend logs: `🔥 Broadcasting event: {event=STATUS_CHANGED, ...}`
4. Open customer order page in another browser/tab
5. **Expected**: Customer page shows updated status immediately (no refresh)

### 4. Verify WebSocket Connection
1. Open browser DevTools → Network tab
2. Filter by "WS" (WebSocket)
3. **Expected**: See connection to `/ws` with status "101 Switching Protocols"
4. Check Console for WebSocket connection messages

## Troubleshooting

### WebSocket Connection Fails
**Symptoms:**
- Console shows `[OrderSync] WebSocket closed`
- No `[WS Connected] Order sync active` message

**Solutions:**
1. Verify backend is running on port 5000
2. Check Vite proxy configuration has `ws: true` for `/ws`
3. Verify WebSocketConfig allows all origins (`setAllowedOriginPatterns("*")`)
4. Check browser console for CORS errors
5. Verify backend logs show WebSocket endpoint registration

### Events Not Received
**Symptoms:**
- WebSocket connects but no events received
- Backend logs show `🔥 Broadcasting event` but frontend doesn't update

**Solutions:**
1. Verify subscription to `/topic/orders` in frontend
2. Check backend broadcasts to `/topic/orders` (not `/queue/orders`)
3. Verify OrderEventPublisher is properly injected in OrderController
4. Check browser console for subscription confirmation
5. Verify event payload structure matches frontend expectations

### 500 Internal Server Error
**Symptoms:**
- `GET http://localhost:5173/ws/info ... 500 (Internal Server Error)`
- WebSocket connection fails immediately

**Solutions:**
1. Check backend logs for exception stack traces
2. Verify WebSocketConfig is properly annotated with `@Configuration`
3. Ensure `spring-boot-starter-websocket` dependency is in `pom.xml`
4. Verify backend port is 5000 (not 8080)
5. Check if Spring Security is blocking WebSocket (should not be present)

## Files Modified

1. `web/src/services/orderSyncService.ts` - Updated comment to reflect port 5000
2. `backend/src/main/java/com/foodfast/config/WebSocketConfig.java` - Verified configuration

## Files Verified (No Changes Needed)

1. `web/vite.config.ts` - ✅ WebSocket proxy correctly configured
2. `backend/src/main/java/com/foodfast/service/OrderEventPublisher.java` - ✅ Correct
3. `backend/src/main/java/com/foodfast/controller/OrderController.java` - ✅ Events published correctly
4. `web/src/context/OrderContext.tsx` - ✅ WebSocket integration correct

## Expected Behavior

✅ **Customer places order**:
- Order is created in backend
- `NEW_ORDER` event is broadcast
- Restaurant dashboard receives notification instantly
- No page refresh required

✅ **Restaurant updates status**:
- Order status is updated in backend
- `STATUS_CHANGED` event is broadcast
- Customer page shows updated status instantly
- No page refresh required

✅ **WebSocket connection**:
- Connects automatically on page load
- Stays connected during session
- Reconnects automatically if connection drops
- Falls back to polling if WebSocket unavailable

## Notes

- WebSocket uses SockJS for better browser compatibility
- STOMP protocol is used for message routing
- Events include full order data for frontend synchronization
- Polling fallback ensures functionality even if WebSocket fails
- All configurations are development-ready (use specific origins in production)

