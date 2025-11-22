# Data Synchronization Setup Guide

## Overview
Both the web (React.js) and mobile (React Native) frontends now read and write from the same mock API server (`http://localhost:5000`), ensuring data consistency across platforms.

## Architecture

### Shared Mock API Server
- **Location**: `mock-api/` directory
- **Technology**: JSON Server
- **Port**: 5000
- **Database**: `db.json`

### Data Flow
1. **Web Frontend**: Uses `OrderContext` which fetches from `/orders` endpoint
2. **Mobile Frontend**: Uses axios to directly call `/orders` endpoint
3. **Both platforms**: Write to the same `/orders` endpoint via POST/PUT/PATCH

## Setup Instructions

### 1. Start the Mock API Server

```bash
cd mock-api
npm install
npm start
```

The server will start on `http://localhost:5000`

### 2. Web Frontend Configuration

The web frontend is already configured to use `http://localhost:5000`:
- `web/src/services/orderApiService.ts` - Handles API communication
- `web/src/context/OrderContext.tsx` - Fetches and syncs orders from API

**Features**:
- Auto-refreshes orders every 5 seconds
- Falls back to localStorage if API is unavailable
- Syncs all CRUD operations to API

### 3. Mobile Frontend Configuration

The mobile frontend is configured to use `http://localhost:5000`:
- `frontend-mobile/src/api/mock.ts` - Axios instance pointing to shared API
- `frontend-mobile/src/screens/Checkout.tsx` - Creates orders in shared API
- `frontend-mobile/src/screens/Drone.tsx` - Fetches orders from shared API

**Note for Physical Devices**:
- For iOS Simulator / Android Emulator: Use `http://localhost:5000`
- For physical devices: Replace `localhost` with your computer's IP address
  - Example: `http://192.168.1.100:5000`
  - Update in `frontend-mobile/src/api/mock.ts`

## Data Mapping

### Order Structure Mapping

The API uses a different structure than the OrderContext type. The mapping is handled automatically:

**API Format** (db.json):
```json
{
  "id": "ORD-123",
  "restaurantId": "rest_2",
  "status": "pending",
  "customerName": "John Doe",
  "customerPhone": "0901234567",
  "address": "123 Main St",
  "items": [
    { "name": "Burger", "quantity": 2, "price": 50000 }
  ],
  "total": 100000
}
```

**OrderContext Format**:
```typescript
{
  id: "ORD-123",
  name: "John Doe",
  phone: "0901234567",
  address: "123 Main St",
  items: [
    { name: "Burger", qty: 2, price: 50000 }
  ],
  total: 100000,
  status: "Pending",
  restaurantId: "rest_2"
}
```

The mapping is handled by `web/src/services/orderApiService.ts`:
- `mapApiOrderToOrder()` - Converts API format to OrderContext format
- `mapOrderToApiOrder()` - Converts OrderContext format to API format

## Status Mapping

Status values are automatically mapped between formats:

| API Status | OrderContext Status |
|------------|---------------------|
| `pending` | `Pending` |
| `preparing` | `In Progress` |
| `ready` | `Ready` |
| `delivering` | `Delivering` |
| `Đang giao` | `Delivering` |
| `delivered` | `Delivered` |
| `Đã giao` | `Delivered` |
| `cancelled` | `Cancelled` |
| `Đã hủy` | `Cancelled` |

## Testing Synchronization

### Test Case 1: Create Order on Web, View on Mobile

1. Start the mock API server:
   ```bash
   cd mock-api && npm start
   ```

2. Start the web frontend:
   ```bash
   cd web && npm run dev
   ```

3. Create an order on the web frontend (checkout flow)

4. Start the mobile frontend:
   ```bash
   cd frontend-mobile && npm start
   ```

5. Verify the order appears on mobile (refresh if needed)

### Test Case 2: Update Order Status on Web, View on Mobile

1. Update an order status on the web frontend (e.g., change to "Delivering")

2. Wait up to 5 seconds (auto-refresh interval) or manually refresh on mobile

3. Verify the status change appears on mobile

### Test Case 3: Create Order on Mobile, View on Web

1. Create an order on the mobile frontend (checkout flow)

2. Wait up to 5 seconds (auto-refresh interval) or manually refresh on web

3. Verify the order appears on web

## Troubleshooting

### Orders Not Syncing

1. **Check if mock API server is running**:
   ```bash
   curl http://localhost:5000/orders
   ```

2. **Check browser console for errors**:
   - Open Developer Tools (F12)
   - Check Console tab for API errors

3. **Check network requests**:
   - Open Developer Tools (F12)
   - Check Network tab for failed requests to `localhost:5000`

### CORS Issues

If you encounter CORS errors, ensure the mock API server allows cross-origin requests. JSON Server should handle this by default, but if needed, you can add CORS headers.

### Mobile Device Can't Connect

For physical devices:
1. Ensure your computer and mobile device are on the same network
2. Find your computer's IP address:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig` or `ip addr`
3. Update `frontend-mobile/src/api/mock.ts` with your IP address
4. Restart the mobile app

## API Endpoints

The mock API server provides the following endpoints:

- `GET /orders` - Get all orders
- `GET /orders/:id` - Get order by ID
- `POST /orders` - Create new order
- `PUT /orders/:id` - Update order (full replacement)
- `PATCH /orders/:id` - Update order (partial update)
- `DELETE /orders/:id` - Delete order

## Notes

- The web frontend auto-refreshes orders every 5 seconds to stay in sync
- The mobile frontend fetches orders on-demand (when screens are loaded)
- Both platforms use the same API endpoint, ensuring data consistency
- localStorage is used as a backup/fallback if the API is unavailable
- All order operations (create, update, delete) are synced to the API

