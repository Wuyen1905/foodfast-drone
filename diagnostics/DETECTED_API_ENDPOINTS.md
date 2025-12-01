# Detected API Endpoints

**Report Date:** Current  
**Scope:** frontend-web + frontend-mobile  
**Method:** Static code analysis

---

## Summary

**Total Endpoints Detected:** 29  
**Active Endpoints:** 28  
**Optional/May Not Exist:** 1 (`/api/health`)

---

## Complete List

### Product Endpoints

| Method | Endpoint | Used By | Description |
|--------|----------|---------|-------------|
| GET | `/api/products` | Web, Mobile | Get all products (optionally filtered by `?restaurant=X`) |
| GET | `/api/products/:id` | Web, Mobile | Get single product by ID |
| POST | `/api/products` | Web (Admin) | Create new product |
| PATCH | `/api/products/:id` | Web (Admin) | Update product |
| DELETE | `/api/products/:id` | Web (Admin) | Delete product |

**Files Using:**
- `frontend-web/src/api/productApi.ts`
- `frontend-web/src/services/menuService.ts`
- `frontend-mobile/src/screens/Menu.tsx`
- `frontend-mobile/src/screens/Home.tsx`
- `frontend-mobile/src/screens/Cart.tsx`

---

### Order Endpoints

| Method | Endpoint | Used By | Description |
|--------|----------|---------|-------------|
| GET | `/api/orders` | Web, Mobile | Get all orders (optionally filtered by `?phone=X`, `?restaurant=X`, `?userId=X`) |
| POST | `/api/orders` | Web, Mobile | Create new order |
| GET | `/api/orders/:id` | Web, Mobile | Get single order by ID |
| PATCH | `/api/orders/:id` | Web, Mobile | Update order (status, etc.) |

**Files Using:**
- `frontend-web/src/api/orderApi.ts`
- `frontend-web/src/services/restaurantOrderService.ts`
- `frontend-mobile/src/screens/Checkout.tsx`
- `frontend-mobile/src/screens/Drone.tsx`
- `frontend-mobile/src/services/orderApiService.ts`

---

### Cart Endpoints

| Method | Endpoint | Used By | Description |
|--------|----------|---------|-------------|
| GET | `/api/cart` | Web, Mobile | Get current cart |
| POST | `/api/cart/add` | Web | Add item to cart |
| POST | `/api/cart` | Mobile | Add item to cart |
| DELETE | `/api/cart/:id` | Web, Mobile | Remove item from cart |
| DELETE | `/api/cart/clear` | Web | Clear entire cart |

**Files Using:**
- `frontend-web/src/api/cartApi.ts`
- `frontend-web/src/context/CartContext.tsx`
- `frontend-mobile/src/screens/Cart.tsx`
- `frontend-mobile/src/screens/Checkout.tsx`

---

### Restaurant Endpoints

| Method | Endpoint | Used By | Description |
|--------|----------|---------|-------------|
| GET | `/api/restaurants` | Web | Get all restaurants (optionally filtered by `?category=X`) |
| GET | `/api/restaurants/:id` | Web | Get single restaurant by ID |
| GET | `/api/restaurants/owner/:ownerId` | Web | Get restaurants by owner ID |

**Files Using:**
- `frontend-web/src/api/restaurantApi.ts`

---

### Authentication Endpoints

| Method | Endpoint | Used By | Description |
|--------|----------|---------|-------------|
| POST | `/api/auth/login` | Web, Mobile | User login |
| POST | `/api/auth/register` | Web, Mobile | User registration |
| GET | `/api/auth/users` | Web (Admin) | Get all users |

**Files Using:**
- `frontend-web/src/api/authApi.ts`
- `frontend-web/src/context/AuthContext.tsx`
- `frontend-web/src/context/AdminAuthContext.tsx`

---

### Drone Endpoints

| Method | Endpoint | Used By | Description |
|--------|----------|---------|-------------|
| GET | `/api/drones` | Web, Mobile | Get all drones |
| GET | `/api/drones/:id` | Web, Mobile | Get single drone by ID |
| PATCH | `/api/drones/:id` | Web, Mobile | Update drone (status, position, etc.) |
| GET | `/api/drone/status` | Mobile | Get drone status (custom endpoint) |

**Files Using:**
- `frontend-web/src/services/droneApi.ts`
- `frontend-web/src/services/restaurantService.ts`
- `frontend-mobile/src/screens/Drone.tsx`
- `frontend-mobile/src/services/droneService.ts`
- `frontend-mobile/src/services/droneApi.ts`

---

### Admin Endpoints

| Method | Endpoint | Used By | Description |
|--------|----------|---------|-------------|
| GET | `/api/admin/restaurants` | Web (Admin) | Get all restaurants (admin view) |
| GET | `/api/admin/customers` | Web (Admin) | Get all customers |
| GET | `/api/admin/drones` | Web (Admin) | Get all drones (admin view) |
| GET | `/api/admin/stats` | Web (Admin) | Get admin statistics |
| PATCH | `/api/admin/restaurants/:id/status` | Web (Admin) | Update restaurant status (active/inactive) |
| PATCH | `/api/admin/users/:customerId/suspend` | Web (Admin) | Suspend user |
| PATCH | `/api/admin/users/:customerId/reactivate` | Web (Admin) | Reactivate user |

**Files Using:**
- `frontend-web/src/api/adminApi.ts`

---

### Analytics Endpoints

| Method | Endpoint | Used By | Description |
|--------|----------|---------|-------------|
| GET | `/api/analytics/restaurant/:restaurantId` | Web | Get restaurant analytics |
| GET | `/api/analytics/restaurant/:restaurantId/overview` | Web | Get restaurant overview stats |

**Files Using:**
- `frontend-web/src/api/analyticsApi.ts`

---

### Payment Endpoints

| Method | Endpoint | Used By | Description |
|--------|----------|---------|-------------|
| POST | `/api/payment/vnpay/create` | Web | Create VNPay payment session |

**Files Using:**
- `frontend-web/src/services/vnpay.ts`

---

### Health/Status Endpoints

| Method | Endpoint | Used By | Description |
|--------|----------|---------|-------------|
| GET | `/api/health` | Web | Health check endpoint (may not exist) |

**Files Using:**
- `frontend-web/src/services/orderSyncService.ts`

**Note:** This endpoint may not exist in the backend. It's used for WebSocket connection health checks.

---

## Endpoints NOT Found

### Categories Endpoint

**Expected:** `GET /api/categories`  
**Status:** ❌ **DOES NOT EXIST**

**Reason:** Categories are extracted from products on the frontend, not provided by a separate endpoint.

**Frontend Implementation:**
```typescript
// Extract categories from products
const categories = Array.from(new Set(products.map(p => p.category)));
```

**Files Using:**
- `frontend-web/src/services/menuService.ts` (line 139)
- `frontend-web/src/pages/Menu.tsx` (line 249)

---

## API Base URL Configuration

### Web Frontend

**File:** `frontend-web/src/config/axios.ts`  
**BASE_URL:** `import.meta.env.VITE_API_BASE_URL ?? "http://192.168.0.101:8080/api"`

### Mobile Frontend

**File:** `frontend-mobile/src/api/apiClient.ts`  
**BASE_URL:** `getBackendUrl()` (from `getBackendUrl.ts`)

**Fallback Chain:**
1. `process.env.API_BASE_URL`
2. `process.env.EXPO_PUBLIC_BACKEND_URL`
3. Expo Constants IP extraction
4. Config file `BASE_URL`
5. Hardcoded: `"http://192.168.0.101:8080/api"`

---

## Endpoint Usage Statistics

| Category | Count |
|----------|-------|
| Product Management | 5 |
| Order Management | 4 |
| Cart Management | 5 |
| Restaurant Management | 3 |
| Authentication | 3 |
| Drone Management | 4 |
| Admin Operations | 7 |
| Analytics | 2 |
| Payment | 1 |
| Health/Status | 1 |
| **Total** | **29** |

---

## Notes

1. **All endpoints use `/api` prefix** - Base URL includes `/api`, so endpoints are called as `/products`, not `/api/products` in axios calls.

2. **Query Parameters:**
   - `/api/products?restaurant=SweetDreams` - Filter products by restaurant
   - `/api/orders?phone=0123456789` - Filter orders by phone
   - `/api/orders?restaurant=sweetdreams` - Filter orders by restaurant
   - `/api/orders?userId=123` - Filter orders by user ID
   - `/api/restaurants?category=FastFood` - Filter restaurants by category

3. **Authentication:**
   - Most endpoints require authentication token in `Authorization: Bearer <token>` header
   - Token stored in `localStorage` (web) or `AsyncStorage` (mobile)

4. **CORS:**
   - Backend controllers have `@CrossOrigin` annotations
   - Allowed origins include `localhost:5173` and `192.168.0.100:5173`
   - May need to add `192.168.0.101:5173` for mobile browser access

---

**Report Generated:** Current  
**Next Step:** Run API tests to verify endpoint availability

