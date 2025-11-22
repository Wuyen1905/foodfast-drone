# Order Data Synchronization - Verification Guide

## Overview
Both web (React.js) and mobile (React Native) frontends now read/write from the same mock API endpoint (`http://localhost:5000/orders`), ensuring data consistency across platforms.

## Sync Verification Logging

### Console Logs

The system automatically logs sync status in the console:

**✅ Success Logs:**
- `[SYNC OK ✅] Web orders synchronized: X orders match between local and API`
- `[SYNC OK ✅] Web created X order(s) in shared API: [order IDs]`
- `[SYNC OK ✅] Mobile fetched order [ID] from API`
- `[SYNC OK ✅] Mobile created order [ID] in shared API`
- `[SYNC OK ✅] Mobile order [ID] synced with API (status: [status])`

**⚠️ Warning Logs:**
- `[DESYNC ⚠️] Web orders desynchronized: [differences]`
- `[DESYNC ⚠️] Mobile failed to fetch order [ID] from API`
- `[DESYNC ⚠️] Mobile orders desynchronized: [differences]`

### Verification Utility

The web frontend includes a sync verification utility (`web/src/utils/syncVerification.ts`) that:
- Compares local orders with API orders
- Detects count mismatches
- Identifies missing or extra orders
- Checks for status mismatches
- Logs detailed sync status

## How Synchronization Works

### Web Frontend
1. **Initial Load**: Fetches all orders from `http://localhost:5000/orders` on mount
2. **Auto-Refresh**: Refreshes orders every 3 seconds to sync with mobile
3. **Write Operations**: All create/update/delete operations sync to API immediately
4. **Verification**: Automatically verifies sync after each operation

### Mobile Frontend
1. **Order Fetching**: Fetches orders from `http://localhost:5000/orders` when needed
2. **Polling**: Polls order status every 3 seconds when viewing an order
3. **Write Operations**: Creates orders directly in the shared API
4. **Verification**: Logs sync status when fetching orders

## Testing Synchronization

### Test 1: Create Order on Web, View on Mobile

1. **Start Mock API Server:**
   ```bash
   cd mock-api
   npm start
   ```

2. **Start Web Frontend:**
   ```bash
   cd web
   npm run dev
   ```

3. **Create an order on web** (go through checkout flow)

4. **Check Console (Web):**
   - Should see: `[SYNC OK ✅] Web created X order(s) in shared API: [order IDs]`
   - Should see: `[SYNC OK ✅] Web orders synchronized: X orders match between local and API`

5. **Start Mobile Frontend:**
   ```bash
   cd frontend-mobile
   npm start
   ```

6. **Navigate to Drone screen with the order ID** on mobile

7. **Check Console (Mobile):**
   - Should see: `[SYNC OK ✅] Mobile fetched order [ID] from API`
   - Should see: `[SYNC OK ✅] Mobile order [ID] synced with API`

8. **Wait up to 3 seconds** (auto-refresh interval) for the order to appear

### Test 2: Create Order on Mobile, View on Web

1. **Create an order on mobile** (go through checkout flow)

2. **Check Console (Mobile):**
   - Should see: `[SYNC OK ✅] Mobile created order [ID] in shared API`

3. **Check Web Frontend:**
   - Orders should appear within 3 seconds (auto-refresh interval)
   - Check Console (Web): Should see: `[SYNC OK ✅] Web orders synchronized: X orders match between local and API`

### Test 3: Update Order Status on Web, View on Mobile

1. **Update an order status on web** (e.g., change to "Delivering")

2. **Check Console (Web):**
   - Should see: `[SYNC OK ✅] Web orders synchronized: X orders match between local and API`

3. **Check Mobile Frontend:**
   - Order status should update within 3 seconds (polling interval)
   - Check Console (Mobile): Should see: `[SYNC OK ✅] Mobile order [ID] synced with API (status: [status])`

### Test 4: Verify Sync Status

1. **Open Browser Console (Web)**
2. **Look for sync verification logs:**
   - `[SYNC OK ✅]` = Orders are synchronized
   - `[DESYNC ⚠️]` = Orders are desynchronized (check differences)

3. **Open React Native Debugger (Mobile)**
4. **Look for sync verification logs:**
   - `[SYNC OK ✅]` = Orders are synchronized
   - `[DESYNC ⚠️]` = Orders are desynchronized

## Expected Console Output

### When Orders are Synchronized:
```
[SYNC OK ✅] Web orders synchronized: 5 orders match between local and API
[SYNC OK ✅] All order IDs in sync: ORD-001, ORD-002, ORD-003, ORD-004, ORD-005
[SYNC OK ✅] Web created 1 order(s) in shared API: ORD-006
[SYNC OK ✅] Mobile fetched order ORD-006 from API
[SYNC OK ✅] Mobile order ORD-006 synced with API (status: pending)
```

### When Orders are Desynchronized:
```
[DESYNC ⚠️] Web orders desynchronized: [
  "Count mismatch: local=5, api=6",
  "Missing in local: ORD-006"
]
[DESYNC ⚠️] Local order IDs: ORD-001, ORD-002, ORD-003, ORD-004, ORD-005
[DESYNC ⚠️] API order IDs: ORD-001, ORD-002, ORD-003, ORD-004, ORD-005, ORD-006
```

## Troubleshooting

### Orders Not Syncing

1. **Check if mock API server is running:**
   ```bash
   curl http://localhost:5000/orders
   ```

2. **Check browser console for errors:**
   - Look for `[DESYNC ⚠️]` warnings
   - Check for network errors

3. **Verify API endpoint:**
   - Web: `http://localhost:5000/orders`
   - Mobile: `http://localhost:5000/orders` (or your computer's IP for physical devices)

### Sync Verification Not Working

1. **Check if sync verification utility is imported:**
   - Web: `web/src/context/OrderContext.tsx` imports `verifySyncAfterOperation`
   - Mobile: Uses direct API calls with logging

2. **Check console logs:**
   - Should see `[SYNC OK ✅]` or `[DESYNC ⚠️]` messages
   - If no logs appear, check if the verification is being called

### Mobile Can't Connect to API

1. **For Physical Devices:**
   - Replace `localhost` with your computer's IP address
   - Update `frontend-mobile/src/api/mock.ts`
   - Example: `http://192.168.1.100:5000`

2. **Check Network:**
   - Ensure mobile device and computer are on the same network
   - Check firewall settings

## API Endpoints

All endpoints are served by JSON Server on `http://localhost:5000`:

- `GET /orders` - Get all orders
- `GET /orders/:id` - Get order by ID
- `POST /orders` - Create new order
- `PUT /orders/:id` - Update order (full replacement)
- `PATCH /orders/:id` - Update order (partial update)
- `DELETE /orders/:id` - Delete order

## Sync Timing

- **Web Auto-Refresh**: Every 3 seconds
- **Mobile Polling**: Every 3 seconds (when viewing an order)
- **Immediate Sync**: All write operations sync immediately
- **Maximum Delay**: 3 seconds (next refresh/poll cycle)

## Data Mapping

Orders are automatically mapped between API format and app format:
- API uses `customerName`, `customerPhone`, `items[].quantity`
- App uses `name`, `phone`, `items[].qty`
- Status values are normalized (e.g., "pending" ↔ "Pending")

## Notes

- All UI, layout, and visual design remain unchanged
- All existing functionality is preserved
- Sync verification is non-intrusive (console logs only)
- Fallback to localStorage if API is unavailable (web only)
- No code mixing between web and mobile platforms

