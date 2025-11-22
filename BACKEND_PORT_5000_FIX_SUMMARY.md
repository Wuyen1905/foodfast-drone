# Backend Port 5000 Fix & WebSocket Connection Fix

## Summary
Fixed backend 500 Internal Server Errors and WebSocket connection failures by:
1. Changing backend port from 8080 to 5000
2. Updating frontend proxy to point to port 5000
3. Implementing proper error handling in OrderController
4. Ensuring WebSocket configuration allows all origins
5. Using constructor injection for better dependency management

## Changes Made

### 1. Backend Port Configuration (`backend/src/main/resources/application.properties`)
- **Changed**: `server.port=8080` → `server.port=5000`
- **Added**: `spring.main.web-application-type=servlet`
- Backend now runs on port 5000 to match frontend proxy configuration

### 2. Frontend Proxy Configuration (`web/vite.config.ts`)
- **Changed**: Proxy target from `http://localhost:8080` → `http://localhost:5000`
- Updated both `/api` and `/ws` proxy targets
- WebSocket proxy enabled with `ws: true`

### 3. OrderController Improvements (`backend/src/main/java/com/foodfast/controller/OrderController.java`)
- **Changed**: Replaced `@Autowired` with constructor injection
- **Improved**: Error handling with proper exception catching
- **Fixed**: `restaurantId` validation uses `isBlank()` instead of `isEmpty()`
- **Fixed**: Status validation uses `isBlank()` for consistency
- **Removed**: Null checks for `orderEventPublisher` (now required dependency)
- All endpoints return structured JSON error responses

### 4. OrderService Improvements (`backend/src/main/java/com/foodfast/service/OrderService.java`)
- **Fixed**: `restaurantId` validation uses `isBlank()` instead of `isEmpty()`
- Better handling of empty/blank restaurant IDs

### 5. WebSocket Configuration (Verified)
- `WebSocketConfig` uses `setAllowedOriginPatterns("*")` for development
- WebSocket endpoint `/ws` properly configured with SockJS support
- Message broker enabled for `/topic` and `/queue`
- Application destination prefix set to `/app`

### 6. OrderEventPublisher (Verified)
- Properly configured with `SimpMessagingTemplate`
- Publishes events to `/topic/orders`
- Broadcasts `NEW_ORDER`, `STATUS_CHANGED`, `ORDER_UPDATED` events

## Key Fixes

### ✅ REST Endpoint Fixes
- **GET /api/orders**: Now handles `restaurantId` query parameter correctly
- **GET /api/orders?restaurantId=restaurant_2**: Returns filtered orders without 500 error
- All endpoints have proper error handling and return structured JSON responses

### ✅ WebSocket Connection Fixes
- WebSocket endpoint `/ws` properly configured
- CORS allows all origins (development only)
- Frontend proxy correctly forwards WebSocket connections
- Connection stays open (no immediate close)

### ✅ Real-Time Synchronization
- Order creation broadcasts `NEW_ORDER` event
- Status updates broadcast `STATUS_CHANGED` event
- Events include full order data for frontend synchronization

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

**Expected Output:**
```
[OrderSync] ✅ WebSocket connected - Real-time sync active
[WS Connected] Order sync active
[OrderSync] ✅ Subscribed to /topic/orders
```

### 3. Test REST Endpoints

#### Get All Orders
```bash
curl http://localhost:5000/api/orders
```
**Expected**: `[]` (empty array, no 500 error)

#### Get Orders by Restaurant
```bash
curl http://localhost:5000/api/orders?restaurantId=restaurant_2
```
**Expected**: `[]` (empty array, no 500 error)

#### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "restaurantId": "restaurant_2",
    "customerName": "John Doe",
    "customerPhone": "1234567890",
    "items": [{"name": "Pizza", "quantity": 1}],
    "total": 25.99,
    "status": "Pending"
  }'
```
**Expected**: Order object with auto-generated ID (201 Created)

#### Update Order Status
```bash
curl -X PUT http://localhost:5000/api/orders/{orderId}/status \
  -H "Content-Type: application/json" \
  -d '{"status": "Confirmed"}'
```
**Expected**: Updated order object (200 OK)

### 4. Test WebSocket Connection

1. Open browser console on frontend
2. Check for WebSocket connection messages:
   - `[OrderSync] ✅ WebSocket connected - Real-time sync active`
   - `[WS Connected] Order sync active`
   - `[OrderSync] ✅ Subscribed to /topic/orders`

3. Create an order from customer page
4. Check backend logs for: `🔥 Broadcasting event: {...}`
5. Restaurant dashboard should receive notification immediately

### 5. Verify Real-Time Sync

1. Open restaurant dashboard in one browser tab
2. Open customer order page in another tab
3. Create an order from customer page
4. Restaurant dashboard should show new order immediately (no page refresh)
5. Update order status from restaurant dashboard
6. Customer page should see status update immediately (no page refresh)

## Expected Results

✅ **No more 500 errors**:
- `/api/orders` returns `200 OK` with JSON array
- `/api/orders?restaurantId=restaurant_2` returns `200 OK` with filtered orders
- All endpoints return proper error messages instead of blank 500 errors

✅ **WebSocket connection stable**:
- Frontend connects to `/ws` successfully (no 500 error)
- WebSocket stays connected (no immediate close)
- Events are broadcast correctly

✅ **Real-time synchronization**:
- Customer places order → Restaurant receives `NEW_ORDER` event
- Restaurant updates status → Customer receives `STATUS_CHANGED` event
- Updates appear instantly without page refresh

✅ **Error handling**:
- All errors return structured JSON responses
- Error messages are descriptive
- No blank 500 errors

## Files Modified

1. `backend/src/main/resources/application.properties` - Port changed to 5000
2. `web/vite.config.ts` - Proxy target changed to port 5000
3. `backend/src/main/java/com/foodfast/controller/OrderController.java` - Constructor injection, improved error handling
4. `backend/src/main/java/com/foodfast/service/OrderService.java` - Improved validation

## Files Verified (No Changes Needed)

1. `backend/src/main/java/com/foodfast/config/WebSocketConfig.java` - ✅ Correct
2. `backend/src/main/java/com/foodfast/service/OrderEventPublisher.java` - ✅ Correct
3. `backend/src/main/java/com/foodfast/exception/GlobalExceptionHandler.java` - ✅ Correct
4. `backend/pom.xml` - ✅ WebSocket dependency present

## Configuration Summary

### Backend (Spring Boot)
- **Port**: 5000
- **WebSocket Endpoint**: `/ws`
- **REST API Base**: `/api`
- **CORS**: Allows `http://localhost:5173`
- **WebSocket Origins**: `*` (development only)

### Frontend (Vite)
- **Port**: 5173
- **Proxy Target**: `http://localhost:5000`
- **API Proxy**: `/api` → `http://localhost:5000/api`
- **WebSocket Proxy**: `/ws` → `http://localhost:5000/ws`

## Notes

- Backend uses in-memory order storage (ConcurrentHashMap) for development
- Restaurant ID normalization handles multiple formats (`rest_2`, `restaurant_2`, `sweetdreams`, `aloha`)
- WebSocket events include full order data for frontend synchronization
- All endpoints are thread-safe and handle concurrent requests
- Database configuration is present but not used by OrderService (can be integrated later)

## Troubleshooting

### Backend won't start on port 5000
- Check if port 5000 is already in use: `netstat -ano | findstr :5000` (Windows) or `lsof -i :5000` (Mac/Linux)
- Kill the process using port 5000 or change the port in `application.properties`

### WebSocket connection fails
- Verify backend is running on port 5000
- Check browser console for CORS errors
- Verify WebSocket proxy is configured in `vite.config.ts`
- Check backend logs for WebSocket connection attempts

### 500 errors still occur
- Check backend logs for exception stack traces
- Verify OrderService is properly initialized
- Check that OrderEventPublisher is properly injected
- Verify database connection (if using JPA) or ensure in-memory service is used

### Real-time updates not working
- Verify WebSocket connection is established (check browser console)
- Check backend logs for broadcast messages: `🔥 Broadcasting event: {...}`
- Verify frontend is subscribed to `/topic/orders`
- Check that OrderEventPublisher is called in OrderController

