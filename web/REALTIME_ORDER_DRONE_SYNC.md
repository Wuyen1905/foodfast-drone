# Real-Time Order-Drone Synchronization

## ✅ Overview

Successfully implemented lightweight polling-based real-time synchronization between restaurant order status updates and customer drone tracking. When restaurants update orders to "Đang giao" (Delivering), customers automatically see their assigned drone appear and move. When orders are marked "Đã giao" (Delivered), the drone is immediately removed from the customer view.

## 🔍 Implementation Details

### 1. Order Service Functions

#### `web/src/services/orderService.ts`
- **Added**: `getOrderById(orderId)` - Alias for `fetchOrderById()` for mobile/web compatibility
- **Existing**: `fetchOrderById()` - Fetches order by ID from mock API
- **Purpose**: Enables polling to fetch latest order status

#### `mobile/src/services/orderService.ts`
- **Created**: New service file for mobile
- **Function**: `getOrderById(orderId)` - Fetches order from mock API
- **Purpose**: Provides order data for polling in mobile app

### 2. Drone Service Functions

#### `web/src/services/droneService.ts`
- **Added**: `getDroneByOrderId(orderId)` - Async function that fetches drone by order ID from API
- **Added**: `releaseDrone(orderId)` - Alias for `releaseDroneFromOrder()` for compatibility
- **Existing**: `assignDroneToOrder()` - Assigns drone when status changes to "Delivering"
- **Existing**: `releaseDroneFromOrder()` - Releases drone when status changes to "Delivered"

#### `mobile/src/services/droneService.ts`
- **Created**: New service file for mobile
- **Function**: `getDroneByOrder(orderId)` - Fetches drone assigned to order from API
- **Function**: `releaseDrone(orderId)` - Releases drone from order
- **Purpose**: Provides drone data for polling in mobile app

### 3. Mobile Polling Implementation

#### `mobile/src/screens/Drone.tsx`
- **Added**: Real-time polling logic (5-second interval)
- **Features**:
  - Polls order status every 5 seconds
  - Detects status changes automatically
  - Shows drone when status = "Delivering" or "Đang giao"
  - Hides drone when status = "Delivered" or "Đã giao" or "Đã hủy"
  - Starts path simulation when drone appears
  - Cleans up path simulation when order completes
  - Stops polling when screen unmounts or order completes

### 4. Status Mapping

#### Status Values Supported:
- **Delivering**: `'Delivering'`, `'delivering'`, `'Đang giao'`
- **Delivered**: `'Delivered'`, `'delivered'`, `'Đã giao'`
- **Cancelled**: `'Cancelled'`, `'cancelled'`, `'Đã hủy'`

## 📋 Implementation Flow

### 1. Restaurant Updates Order Status
```
Restaurant Dashboard → Update Status to "Đang giao" 
→ restaurantOrderService.updateOrderStatus() 
→ assignDroneToOrder() 
→ Mock API updates order.status and drone.orderId
```

### 2. Customer Polling Detects Change
```
Mobile Drone Screen → Polling (every 5s) 
→ getOrderById(orderId) 
→ Detects status change: "Ready" → "Delivering" 
→ getDroneByOrder(orderId) 
→ Sets activeDrone 
→ Starts path simulation
```

### 3. Customer Sees Drone Movement
```
activeDrone set → Path simulation starts 
→ simulateDronePath() 
→ Updates dronePosition every 2 seconds 
→ UI re-renders with new position 
→ Drone marker moves along path
```

### 4. Restaurant Marks Order Delivered
```
Restaurant Dashboard → Update Status to "Đã giao" 
→ releaseDroneFromOrder() 
→ Mock API updates order.status and clears drone.orderId
```

### 5. Customer Polling Removes Drone
```
Mobile Drone Screen → Polling (every 5s) 
→ getOrderById(orderId) 
→ Detects status change: "Delivering" → "Delivered" 
→ Cleans up path simulation 
→ Sets activeDrone = null 
→ Sets dronePosition = null 
→ Drone disappears from map
```

## 🎯 Key Features

### 1. Automatic Status Sync
- ✅ Polls order status every 5 seconds
- ✅ Detects status changes automatically
- ✅ Updates order state without page reload
- ✅ Handles both English and Vietnamese status values

### 2. Drone Appearance Logic
- ✅ Shows drone when status = "Delivering" or "Đang giao"
- ✅ Fetches assigned drone from API
- ✅ Starts path simulation automatically
- ✅ Updates drone position in real-time

### 3. Drone Removal Logic
- ✅ Hides drone when status = "Delivered" or "Đã giao"
- ✅ Hides drone when status = "Cancelled" or "Đã hủy"
- ✅ Cleans up path simulation
- ✅ Removes drone from map immediately

### 4. Performance Optimization
- ✅ Lightweight polling (5-second interval)
- ✅ Stops polling when screen unmounts
- ✅ Stops polling when order completes
- ✅ Prevents memory leaks with proper cleanup
- ✅ Uses `isMounted` flag to prevent state updates on unmounted components

## 📁 Files Modified

### 1. Created
- `mobile/src/services/orderService.ts`: Order service for mobile
- `mobile/src/services/droneService.ts`: Drone service for mobile

### 2. Modified
- `web/src/services/orderService.ts`: Added `getOrderById()` alias
- `web/src/services/droneService.ts`: Added `getDroneByOrderId()` and `releaseDrone()` alias
- `mobile/src/screens/Drone.tsx`: Added polling logic and real-time sync

### 3. No Changes
- ✅ All UI components unchanged
- ✅ All layouts unchanged
- ✅ All styles unchanged
- ✅ All existing features preserved

## 🔄 Data Flow

### Polling Cycle (Every 5 Seconds)

1. **Fetch Latest Order**:
   ```typescript
   const latestOrder = await getOrderById(orderId);
   ```

2. **Check Status Change**:
   ```typescript
   if (latestOrder.status !== order.status) {
     setOrder(latestOrder);
   }
   ```

3. **Handle "Delivering" Status**:
   ```typescript
   if (isDelivering) {
     const assignedDrone = await getDroneByOrder(orderId);
     if (assignedDrone) {
       setActiveDrone(assignedDrone);
       // Path simulation starts automatically via useEffect
     }
   }
   ```

4. **Handle "Delivered" Status**:
   ```typescript
   if (isCompleted) {
     // Cleanup path simulation
     pathCleanupRef.current?.();
     // Hide drone
     setActiveDrone(null);
     setDronePosition(null);
   }
   ```

## ✅ Verification

### Test Scenarios

1. **Restaurant Updates to "Đang giao"**:
   - ✅ Restaurant changes order status to "Delivering"
   - ✅ Polling detects status change (within 5 seconds)
   - ✅ Drone appears on customer screen
   - ✅ Path simulation starts automatically
   - ✅ Drone moves along path

2. **Restaurant Updates to "Đã giao"**:
   - ✅ Restaurant changes order status to "Delivered"
   - ✅ Polling detects status change (within 5 seconds)
   - ✅ Path simulation stops
   - ✅ Drone disappears from customer screen
   - ✅ Order status updates in customer view

3. **Order Cancelled**:
   - ✅ Restaurant cancels order
   - ✅ Polling detects status change
   - ✅ Drone disappears immediately
   - ✅ No path simulation running

4. **Multiple Status Transitions**:
   - ✅ Order: "Ready" → "Delivering" → "Delivered"
   - ✅ Drone appears at "Delivering"
   - ✅ Drone disappears at "Delivered"
   - ✅ All transitions handled correctly

## 🔐 Safety & Compatibility

- ✅ **No UI changes**: All visual components unchanged
- ✅ **No layout changes**: Existing layout preserved
- ✅ **No style changes**: Existing styles preserved
- ✅ **Backward compatible**: Works with existing orders
- ✅ **Type-safe**: All changes fully typed
- ✅ **Modular**: Clean, isolated services
- ✅ **Performance**: Lightweight polling, minimal overhead
- ✅ **Memory safe**: Proper cleanup on unmount

## 🚀 Performance Metrics

- **Polling Interval**: 5 seconds
- **Requests per Minute**: 12 requests/minute max per order
- **Memory**: No leaks (proper cleanup)
- **CPU**: Minimal overhead (lightweight polling)
- **Network**: Small payloads (order + drone data)
- **Battery**: Efficient (stops when not needed)

## 📝 Usage

### Restaurant Side
```typescript
// Restaurant updates order status
await updateOrderStatus(orderId, 'Delivering');
// → Automatically assigns drone
// → Customer sees drone within 5 seconds

await updateOrderStatus(orderId, 'Delivered');
// → Automatically releases drone
// → Customer sees drone disappear within 5 seconds
```

### Customer Side
```typescript
// Polling runs automatically when Drone screen is open
// No manual intervention required
// Status syncs every 5 seconds
// Drone appears/disappears based on order status
```

## 🎯 Status Mapping

### Order Status → Drone Behavior

| Order Status | Drone Behavior |
|-------------|----------------|
| `Pending` | No drone |
| `Confirmed` | No drone |
| `In Progress` | No drone |
| `Ready` | No drone |
| `Delivering` / `Đang giao` | **Drone appears, path simulation starts** |
| `Delivered` / `Đã giao` | **Drone disappears, path simulation stops** |
| `Cancelled` / `Đã hủy` | **Drone disappears, path simulation stops** |

## 🔄 Real-Time Sync Logic

### Polling Implementation
```typescript
useEffect(() => {
  if (!currentOrderId) return;
  
  let isMounted = true;
  const pollingInterval = setInterval(async () => {
    if (!isMounted) return;
    
    const latestOrder = await getOrderById(currentOrderId);
    // ... handle status changes and drone updates ...
  }, 5000);
  
  return () => {
    isMounted = false;
    clearInterval(pollingInterval);
  };
}, [currentOrderId]);
```

### Status Change Detection
```typescript
setOrder(prevOrder => {
  if (!prevOrder || prevOrder.status !== latestOrder.status) {
    console.log(`Status changed: ${prevOrder?.status} → ${latestOrder.status}`);
    return latestOrder;
  }
  return prevOrder;
});
```

### Drone Assignment Detection
```typescript
if (isDelivering) {
  const assignedDrone = await getDroneByOrder(orderId);
  if (assignedDrone) {
    setActiveDrone(assignedDrone);
    // Path simulation starts automatically via useEffect
  }
}
```

### Drone Removal
```typescript
if (isCompleted) {
  pathCleanupRef.current?.();
  setActiveDrone(null);
  setDronePosition(null);
}
```

---

**Implementation Date**: 2025-11-08  
**Status**: ✅ Complete  
**No Breaking Changes**: All existing functionality preserved  
**UI Unchanged**: All visual components untouched  
**Logic Only**: Pure service layer implementation  
**Performance**: Lightweight polling (5s interval), minimal overhead  
**Memory Safe**: Proper cleanup on unmount  
**Real-Time Sync**: Automatic status and drone synchronization

