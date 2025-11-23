# FoodFast Project - Mock Data and Mixed Code Scan Report

**Date:** 2025-11-23  
**Scope:** backend, web (frontend-web), frontend-mobile  
**Purpose:** Identify all mock data, mixed code, dead imports, API mismatches, and restaurant identifier inconsistencies

---

## 1. MOCK DATA FILES

### 1.1 Frontend Mobile - Mock API File
**File:** `frontend-mobile/src/api/mock.ts`  
**Lines:** 1-21  
**Issue:** File contains mock API configuration and comments referencing mock API server. The file is essentially empty but serves as a placeholder for removed mock data.

**Content Found:**
```typescript
// [Data Sync] Use shared mock API server instead of AxiosMockAdapter
// For mobile devices, you may need to use your computer's IP address instead of localhost
// Example: 'http://192.168.1.100:5000' (replace with your actual IP)
const API_BASE_URL = __DEV__ 
  ? 'http://192.168.0.100:8080/api'  // For iOS Simulator / Android Emulator
  : 'http://192.168.0.100:8080/api';  // For physical devices, replace with your computer's IP
```

**Problem:** Contains outdated comments referencing removed mock API server.  
**Impact:** Confusing for developers, but no runtime impact since it's just configuration.  
**Fix:** Remove outdated comments, rename file or delete if unused.

---

## 2. HARDCODED MOCK DATA IN COMPONENTS/SERVICES

### 2.1 Products Data File - Hardcoded Product Array
**File:** `web/src/data/products.ts`  
**Lines:** 15-139  
**Issue:** Contains a hardcoded array of 10 products (5 SweetDreams, 5 Aloha) that duplicates backend data.

**Content Found:**
```typescript
export const products: Product[] = [
  // SweetDreams Bakery Products
  {
    id: "sd-001",
    name: "Bánh Donut",
    price: 25000,
    restaurant: "SweetDreams",
    // ... 9 more products
  }
];
```

**Problem:** This hardcoded data competes with backend API calls. Components might import this directly instead of fetching from `/api/products`.  
**Impact:** Products displayed may be stale or inconsistent with backend. Real-time product updates from backend won't reflect in components using this file.  
**Fix:** Remove this file or convert it to a type-only export. Ensure all components fetch from `/api/products`.

---

### 2.2 Admin Restaurants Page - Hardcoded Restaurant Array
**File:** `web/src/pages/admin/AdminRestaurants.tsx`  
**Lines:** 130-179  
**Issue:** Initial state contains hardcoded restaurant array with 3 restaurants including a non-existent "Pizza Palace".

**Content Found:**
```typescript
const [restaurants, setRestaurants] = useState<Restaurant[]>([
  {
    id: 'rest_1',
    name: 'FoodFast Restaurant',
    // ... hardcoded data
  },
  {
    id: 'rest_2',
    name: 'SweetDreams Bakery',
    // ... hardcoded data
  },
  {
    id: 'rest_3',
    name: 'Pizza Palace', // ⚠️ This restaurant doesn't exist in backend
    // ... hardcoded data
  }
]);
```

**Problem:** Initial state contains fake data that should come from API. The "Pizza Palace" restaurant doesn't exist in backend `data.sql`.  
**Impact:** Admin sees incorrect restaurant list on initial load. If API fails, fake "Pizza Palace" remains visible.  
**Fix:** Initialize state as empty array `[]`, fetch from `/api/restaurants` or `/api/admin/restaurants` on mount.

---

### 2.3 Admin Auth Context - Hardcoded Credentials
**File:** `web/src/context/AdminAuthContext.tsx`  
**Lines:** 33-46  
**Issue:** Mock admin login with hardcoded credentials bypassing backend authentication.

**Content Found:**
```typescript
// Mock admin credentials
if (username === 'admin' && password === 'admin123') {
  const adminUser: User = {
    id: 'admin_1',
    name: 'System Administrator',
    username: 'admin',
    role: 'admin',
    email: 'admin@foodfast.com',
    createdAt: Date.now() - 86400000 * 365
  };
  setAdmin(adminUser);
  return { ok: true };
}
```

**Problem:** Admin authentication bypasses backend, using hardcoded credentials instead of calling `/api/auth/login`.  
**Impact:** Admin can login without backend validation. Session not managed by backend. Real-time admin updates won't work correctly.  
**Fix:** Replace with actual API call to `/api/auth/login` or `/api/admin/login` (if separate endpoint exists).

---

### 2.4 Drone Detail Modal - Mock Activity Timeline
**File:** `web/src/components/admin/DroneDetailModal.tsx`  
**Lines:** 254-269  
**Issue:** Mock activity timeline generated from drone data instead of real events.

**Content Found:**
```typescript
// Mock activity timeline (last 3 actions)
const activities = [
  {
    icon: '📦',
    title: drone.status === 'delivering' ? 'Đang giao hàng' : 'Hoàn thành giao hàng',
    time: drone.lastUpdate ? dayjs(drone.lastUpdate).format('DD/MM/YYYY HH:mm') : 'N/A'
  },
  {
    icon: '🔋',
    title: 'Sạc pin',
    time: drone.lastMaintenance ? dayjs(drone.lastMaintenance).subtract(1, 'day').format('DD/MM/YYYY HH:mm') : 'N/A'
  },
  {
    icon: '🔧',
    title: 'Bảo trì định kỳ',
    time: drone.lastMaintenance ? dayjs(drone.lastMaintenance).format('DD/MM/YYYY HH:mm') : 'N/A'
  }
];
```

**Problem:** Activity timeline is mocked/fabricated from existing drone fields, not from actual event log.  
**Impact:** Shows fake activity history. Real-time activity updates from backend won't reflect here.  
**Fix:** Fetch from real activity log API endpoint or generate from backend event stream.

---

### 2.5 Scenario Service - Mock API Simulation
**File:** `web/src/services/scenarioService.ts`  
**Lines:** 164-167  
**Issue:** Comment indicates mock API simulation instead of real backend call.

**Content Found:**
```typescript
// In a real system, this would POST to API
// For mock API, we'll simulate it
console.log('[scenarioService] Scenario added:', newScenario);
return true;
```

**Problem:** Scenario creation is mocked - no actual API call to backend.  
**Impact:** Scenarios are not persisted in backend. Real-time scenario notifications won't work.  
**Fix:** Replace with actual `api.post('/scenarios', newScenario)` call.

---

### 2.6 Drone Realtime Service - Mock ETA Calculation
**File:** `web/src/services/droneRealtimeService.ts`  
**Lines:** 111-113  
**Issue:** ETA calculation is randomly generated, not based on real data.

**Content Found:**
```typescript
// Mock ETA calculation (in minutes)
eta = Math.floor(5 + Math.random() * 15); // 5-20 minutes
```

**Problem:** ETA is randomly generated instead of calculated from real GPS/route data.  
**Impact:** Shows inaccurate delivery times. Real-time ETA updates from backend won't work.  
**Fix:** Calculate from backend GPS data or use backend-provided ETA field.

---

## 3. MIXED CODE (MOCK + REAL API)

### 3.1 Restaurant Order Service - Mixed Parameter Handling
**File:** `web/src/services/restaurantOrderService.ts`  
**Lines:** 25-35  
**Issue:** Function accepts restaurant name or ID, converts to ID, but then uses wrong query parameter.

**Content Found:**
```typescript
export const getRestaurantOrders = async (restaurantId: string): Promise<Order[]> => {
  try {
    // Normalize restaurant ID
    let restaurantIdParam = restaurantId;
    if (restaurantId.toLowerCase() === 'sweetdreams') {
      restaurantIdParam = 'rest_2';
    } else if (restaurantId.toLowerCase() === 'aloha') {
      restaurantIdParam = 'restaurant_2';
    }
    
    const response = await api.get(`/orders?restaurant=${restaurantIdParam}`);
```

**Problem:** Converts restaurantId to backend ID but uses `restaurant=` query parameter instead of `restaurantId=`. Backend `OrderController.getOrders()` prefers `restaurantId` parameter.  
**Impact:** May return wrong results if backend `restaurant` field doesn't match IDs. Filtering may fail.  
**Fix:** Change to `/orders?restaurantId=${restaurantIdParam}`.

---

### 3.2 Restaurant Analytics Component - Mixed Parameter Usage
**File:** `web/src/components/restaurant/RestaurantAnalytics.tsx`  
**Lines:** 297-308  
**Issue:** Converts restaurant name to ID but uses inconsistent query parameters.

**Content Found:**
```typescript
let restaurantIdParam = restaurant;
if (restaurant.toLowerCase() === 'sweetdreams') {
  restaurantIdParam = 'rest_2';
} else if (restaurant.toLowerCase() === 'aloha') {
  restaurantIdParam = 'restaurant_2';
}

const [analyticsResponse, overviewResponse, ordersResponse] = await Promise.all([
  api.get(`/analytics/restaurant/${restaurantIdParam}?period=day`).catch(() => null),
  api.get(`/analytics/restaurant/${restaurantIdParam}/overview`).catch(() => null),
  api.get(`/orders?restaurant=${restaurantIdParam}`).catch(() => null) // ⚠️ Should use restaurantId=
]);
```

**Problem:** Uses `restaurant=` for orders query while other endpoints use `restaurantIdParam` in path. Inconsistent parameter naming.  
**Impact:** Order filtering may fail or return incorrect results.  
**Fix:** Change `/orders?restaurant=` to `/orders?restaurantId=` for consistency.

---

## 4. DEAD CODE / UNUSED IMPORTS

### 4.1 TODO Comments - Removed Mock References
**Files:** Multiple  
**Issue:** Numerous TODO comments reference removed mock data that no longer exists.

**Found in:**
- `web/src/components/restaurant/RestaurantAnalytics.tsx:287` - "TODO: Backend integration in Phase 2 - removed all hardcoded mock data"
- `web/src/components/admin/DroneMonitor.tsx:33,511,667,759` - "TODO: Backend integration in Phase 2 - removed mockDrones import/fallback"
- `web/src/pages/Login.tsx:4` - "TODO: Backend integration in Phase 2 - removed mockData import"
- `web/src/context/AuthContext.tsx:162` - "TODO: Backend integration in Phase 2 - removed USERS mock data"
- `web/src/pages/admin/AdminDashboard.tsx:393` - "TODO: Backend integration in Phase 2 - removed fallback to mock data"
- `web/src/pages/admin/AdminControlPanel.tsx:4` - "TODO: Backend integration in Phase 2 - removed mockData import"

**Problem:** These TODO comments are outdated and confusing. Mock data removal is complete, but comments remain.  
**Impact:** No runtime impact, but clutters code and confuses developers.  
**Fix:** Remove all these TODO comments or update them to reflect current state.

---

### 4.2 Test Setup - Mock Utilities (Expected)
**File:** `web/src/test/setup.ts`  
**Lines:** 3-35  
**Issue:** Mock localStorage, window.matchMedia, IntersectionObserver, ResizeObserver (but this is EXPECTED for testing).

**Problem:** None - these are legitimate test mocks for unit testing.  
**Impact:** No impact - this is standard testing practice.  
**Fix:** Keep as-is (this is correct for test environment).

---

## 5. INCONSISTENT RESTAURANT IDENTIFIERS

### 5.1 Multiple Normalization Functions
**Files:** Multiple service files  
**Issue:** Different files implement different restaurant name-to-ID mapping logic.

**Found in:**
1. `web/src/services/restaurantService.ts:53-61` - Maps SweetDreams->rest_2, Aloha->restaurant_2
2. `web/src/services/restaurantOrderService.ts:10-13` - Same mapping
3. `web/src/services/menuManagementService.ts:26-33` - Maps rest_2->SweetDreams, restaurant_2->Aloha (REVERSE!)
4. `web/src/services/restaurantNotificationService.ts:84-87` - Maps rest_2->sweetdreams, restaurant_2->aloha (lowercase)
5. `web/src/components/restaurant/RestaurantAnalytics.tsx:298-301` - Maps SweetDreams->rest_2, Aloha->restaurant_2
6. `web/src/pages/Details.tsx:133-138` - Maps SweetDreams->rest_2, Aloha/Aloha Kitchen->restaurant_2

**Problem:** 
- Inconsistent mapping logic scattered across files
- Some normalize to uppercase names, some to lowercase
- Some map name->ID, some map ID->name
- No single source of truth

**Impact:** 
- Bugs when restaurant filtering fails due to mismatched identifiers
- Orders/products may not filter correctly
- Real-time updates may not reach correct restaurant subscriptions
- API calls may use wrong restaurantId

**Fix:** 
- Create single utility function `web/src/utils/restaurantUtils.ts`
- Centralize all restaurant name/ID mappings
- Replace all scattered normalization logic with centralized utility

---

### 5.2 Frontend Uses Restaurant Names, Backend Uses IDs
**Issue:** Frontend components often use restaurant names ("SweetDreams", "Aloha") while backend uses IDs ("rest_2", "restaurant_2").

**Examples:**
- `web/src/context/RestaurantSelectionContext.tsx:18-23` - Uses "SweetDreams" | "Aloha" names
- `web/src/data/products.ts:8,23,85` - Products have `restaurant: "SweetDreams" | "Aloha"`
- `web/src/pages/Details.tsx:144` - Cart items store `restaurant: product.restaurant` (name, not ID)

**Problem:** Frontend state uses names, but API calls need IDs. Conversion logic is scattered and error-prone.  
**Impact:** 
- Cart items may have wrong restaurantId when creating orders
- Real-time subscriptions may use wrong restaurant identifier
- Filtering may fail

**Fix:** 
- Standardize on using restaurantId throughout frontend
- Store restaurantId in CartContext, not restaurant name
- Fetch restaurant names from backend when displaying UI

---

### 5.3 Backend Query Parameter Inconsistency
**File:** Multiple frontend service files  
**Issue:** Some calls use `?restaurant=` while backend prefers `?restaurantId=`.

**Found:**
- `web/src/services/restaurantOrderService.ts:35` - Uses `?restaurant=${restaurantIdParam}`
- `web/src/components/restaurant/RestaurantAnalytics.tsx:308` - Uses `?restaurant=${restaurantIdParam}`
- `web/src/services/menuManagementService.ts:184` - Uses `?restaurant=${restaurantIdParam}`
- `web/src/services/restaurantService.ts:93` - Uses `?restaurantId=${restaurantIdParam}` ✅ (correct)

**Problem:** Inconsistent query parameter names cause backend confusion. Backend `OrderController` accepts both but prefers `restaurantId`.  
**Impact:** May cause 500 errors or return incorrect results.  
**Fix:** Standardize all calls to use `restaurantId=` parameter.

---

## 6. API ENDPOINTS NOT EXISTING IN BACKEND

### 6.1 Scenarios Endpoint
**File:** `web/src/services/scenarioService.ts:35`  
**Issue:** Frontend calls `/scenarios` endpoint that doesn't exist in backend.

**Content Found:**
```typescript
export const getScenarios = async (): Promise<Scenario[]> => {
  try {
    const response = await api.get(`/scenarios`);
    return response.data || [];
  } catch (error) {
    console.error('[scenarioService] Error fetching scenarios:', error);
    return [];
  }
};
```

**Backend Check:** No `ScenarioController` found in `backend/src/main/java/com/foodfast/controller/`.  
**Problem:** API call will fail silently (returns empty array).  
**Impact:** Scenarios feature doesn't work. No error visible to user.  
**Fix:** Create `ScenarioController` in backend or remove frontend feature.

---

### 6.2 System Logs Endpoint
**File:** `web/src/data/adminData.ts:118-122`  
**Issue:** Function returns empty array with TODO comment about missing endpoint.

**Content Found:**
```typescript
export const getSystemLogs = async (): Promise<SystemLog[]> => {
  try {
    // System logs endpoint doesn't exist yet, return empty array
    // TODO: Implement system logs endpoint in backend
    return [];
  } catch (error) {
    console.error('[adminData] Error fetching system logs:', error);
    return [];
  }
};
```

**Backend Check:** No system logs endpoint found.  
**Problem:** Admin dashboard logs section always empty.  
**Impact:** No system logs visible in admin dashboard.  
**Fix:** Implement `/api/admin/logs` endpoint in backend or remove logs UI.

---

### 6.3 Users Endpoint for Admin
**File:** `web/src/data/adminData.ts:40,83`  
**Issue:** Calls `/auth/users` endpoint that may not exist.

**Content Found:**
```typescript
api.get('/auth/users')
```

**Backend Check:** `AuthController` exists but no `/auth/users` endpoint found. Only `/auth/login` and `/auth/register` exist.  
**Problem:** Admin customer list will be empty.  
**Impact:** Admin cannot see customer list.  
**Fix:** Add `GET /api/auth/users` endpoint in `AuthController` (with admin auth check) or use different endpoint.

---

## 7. API SHAPE MISMATCHES

### 7.1 Products - Restaurant Field Type Mismatch
**Frontend:** `web/src/data/products.ts:8` - `restaurant: "SweetDreams" | "Aloha"` (string literal)  
**Backend:** `backend/src/main/java/com/foodfast/entity/Product.java:43` - `restaurant: String` (plain string)

**Problem:** Frontend expects specific restaurant names, but backend allows any string.  
**Impact:** If backend returns different restaurant names, frontend filtering may fail.  
**Fix:** Update frontend type to accept any string, or ensure backend only returns valid restaurant names.

---

### 7.2 Orders - Restaurant vs RestaurantId Field Usage
**Frontend:** Some components access `order.restaurant`, others access `order.restaurantId`  
**Backend:** `Order` entity has both `restaurant` (String) and `restaurantId` (String) fields

**Problem:** Frontend code inconsistently accesses `restaurant` vs `restaurantId`.  
**Found:**
- `web/src/pages/admin/AdminOrders.tsx:17` - `restaurantId: o.restaurantId || o.restaurant || ''`
- `web/src/data/adminData.ts:51` - `o.restaurantId === r.id || o.restaurant === r.id`

**Impact:** Some components may not find restaurant correctly if field is missing.  
**Fix:** Standardize frontend to always use `restaurantId` field, map `restaurant` field to `restaurantId` on API response.

---

### 7.3 Drone Status - Enum Mismatch
**Frontend:** `web/src/types/admin.ts` - Status types may differ from backend  
**Backend:** `Drone` entity status field uses String, but values like "Idle", "Delivering", "Charging", "Maintenance"

**Problem:** Frontend status types might not match backend enum values exactly.  
**Impact:** Status badges may not display correctly.  
**Fix:** Ensure frontend status types exactly match backend enum/string values.

---

## 8. WEBSOCKET MOCK / FAKE NOTIFICATIONS

### 8.1 No WebSocket Mocks Found
**Status:** ✅ No mock WebSocket implementations found.

**Found:** All WebSocket code uses real SockJS + STOMP connections to backend:
- `web/src/services/orderSyncService.ts` - Real SockJS/STOMP connection
- `web/src/context/OrderContext.tsx` - Uses realtimeSocket.onOrderUpdate
- All WebSocket subscriptions point to real backend endpoints (`/topic/orders`, `/topic/orders/{restaurantId}`)

**Problem:** None - WebSocket implementation is clean.  
**Impact:** None.  
**Fix:** None needed.

---

### 8.2 Restaurant Notification Service - No Real Backend Call
**File:** `web/src/services/restaurantNotificationService.ts:18-53`  
**Issue:** Comment mentions WebSocket/API but implementation only logs to console.

**Content Found:**
```typescript
/**
 * In a real application, this would call an API endpoint or use WebSockets
 */
export const notifyRestaurant = async (order: Order): Promise<boolean> => {
  // ... normalization logic ...
  try {
    // This would typically POST to /api/notifications or use WebSocket
    console.log(`✅ Restaurant notification sent: ${restaurantId}`, notification);
    return true;
  } catch (error) {
    console.error('Error notifying restaurant:', error);
    return false;
  }
};
```

**Problem:** Notification function doesn't actually send notification to backend.  
**Impact:** Restaurant owners won't receive real-time notifications when orders are created.  
**Fix:** Implement real API call to `/api/notifications` or use WebSocket to send notifications.

---

## SUMMARY OF CRITICAL ISSUES

### High Priority:
1. **Admin Auth Context** (2.3) - Hardcoded credentials bypass backend
2. **Restaurant Query Parameters** (3.1, 5.3) - Inconsistent use of `restaurant=` vs `restaurantId=`
3. **Restaurant Identifier Inconsistency** (5.1, 5.2) - Scattered normalization logic
4. **Missing API Endpoints** (6.1, 6.2, 6.3) - Frontend calls non-existent endpoints
5. **Hardcoded Products** (2.1) - Competes with backend API

### Medium Priority:
6. **Hardcoded Restaurants** (2.2) - Fake data in AdminRestaurants
7. **Mock Activity Timeline** (2.4) - Fabricated drone activity
8. **Mock ETA Calculation** (2.6) - Random ETA instead of real calculation
9. **Notification Service** (8.2) - No real backend call

### Low Priority:
10. **Outdated TODO Comments** (4.1) - Code clutter
11. **API Shape Mismatches** (7.1, 7.2, 7.3) - Type inconsistencies

---

## IMPACT ON REALTIME SYNCHRONIZATION

1. **Restaurant Identifier Issues** prevent correct WebSocket topic subscriptions (`/topic/orders/{restaurantId}` may use wrong ID)
2. **Hardcoded Products/Restaurants** display stale data, not updated via real-time
3. **Missing API Endpoints** cause silent failures, breaking admin features
4. **Notification Service** doesn't actually send notifications, breaking restaurant real-time alerts
5. **Query Parameter Inconsistency** causes backend filtering failures, returning wrong orders

---

## 9. MOCK FOLDERS OR UTILITIES

### 9.1 No Mock Folders Found
**Status:** ✅ No dedicated mock folders found in project structure.

**Search Results:**
- No `mock/`, `mocks/`, `__mocks__/`, `fake/`, `sample/`, or `dummy/` folders found
- Test setup files (`web/src/test/setup.ts`) contain legitimate test mocks (expected behavior)

**Problem:** None - project structure is clean.  
**Impact:** None.  
**Fix:** None needed.

---

## 10. SECURITY RISKS

### 10.1 Admin Auth Context - Hardcoded Credentials (CRITICAL)
**File:** `web/src/context/AdminAuthContext.tsx`  
**Lines:** 33-46  
**Issue:** Hardcoded admin credentials bypass backend authentication entirely.

**Content Found:**
```typescript
const login = async (username: string, password: string) => {
  setLoading(true);
  await new Promise((r) => setTimeout(r, 400));
  
  // Mock admin credentials
  if (username === 'admin' && password === 'admin123') {
    const adminUser: User = {
      id: 'admin_1',
      name: 'System Administrator',
      username: 'admin',
      role: 'admin',
      email: 'admin@foodfast.com',
      createdAt: Date.now() - 86400000 * 365
    };
    setAdmin(adminUser);
    setLoading(false);
    return { ok: true };
  }
  
  setLoading(false);
  return { ok: false, message: "Invalid admin credentials" };
};
```

**Problem:** 
- **CRITICAL SECURITY RISK:** Admin authentication completely bypasses backend
- Credentials are hardcoded in client-side code (visible to anyone who views source)
- No backend validation of admin credentials
- Admin session stored only in localStorage, not validated by backend
- Any user can login as admin with known credentials (`admin`/`admin123`)

**Impact on Real-time Sync:**
- Admin actions (drone reassignment, order management) are not tracked by backend
- Real-time admin notifications won't work correctly (backend doesn't know admin is logged in)
- Security audit trail is broken (backend cannot log admin actions)
- Unauthorized users can gain admin access

**Fix:** 
- Remove hardcoded credentials check
- Call `/api/auth/login` with admin credentials
- Use JWT token or session token from backend
- Validate admin session on every protected route
- Store token in secure httpOnly cookie or localStorage (with backend validation)

---

### 10.2 Admin Login Page - Exposed Credentials in UI (MEDIUM)
**File:** `web/src/pages/admin/AdminLogin.tsx`  
**Lines:** 195-200  
**Issue:** Admin credentials are displayed directly in the login page UI.

**Content Found:**
```typescript
<CredentialsBox>
  <CredentialsTitle>🔐 Tài khoản Admin:</CredentialsTitle>
  <CredentialsList>
    {/* Credentials displayed here */}
  </CredentialsList>
</CredentialsBox>
```

**Problem:** Admin credentials may be visible in the UI for demo purposes.  
**Impact:** Security risk if exposed in production - anyone viewing the page can see credentials.  
**Fix:** Remove credentials display from production builds, use environment variable or remove entirely.

---

### 10.3 Documentation Files - Exposed Credentials
**Files:** 
- `web/ADMIN_INDEPENDENCE_DOCUMENTATION.md:363-364`
- `ADMIN_DASHBOARD_COMPLETE.md:256-335`

**Issue:** Documentation files contain hardcoded admin credentials in plain text.

**Content Found:**
```
**Admin Credentials:**
- Username: `admin`
- Password: `admin123`
```

**Problem:** Credentials documented in markdown files are committed to repository.  
**Impact:** Anyone with repository access can see admin credentials.  
**Fix:** Remove credentials from documentation, use environment variables or secrets management.

---

### 10.4 LocalStorage Admin Session - No Backend Validation
**File:** `web/src/context/AdminAuthContext.tsx`  
**Lines:** 11-22, 24-27  
**Issue:** Admin session stored in localStorage without backend validation.

**Content Found:**
```typescript
useEffect(() => {
  try {
    const saved = localStorage.getItem("admin_auth");
    if (saved) {
      setAdmin(JSON.parse(saved)); // ⚠️ No backend validation
    }
  } catch (error) {
    console.error("Error parsing saved admin:", error);
  } finally {
    setLoading(false);
  }
}, []);

useEffect(() => {
  if (admin) localStorage.setItem("admin_auth", JSON.stringify(admin));
  else localStorage.removeItem("admin_auth");
}, [admin]);
```

**Problem:** 
- Admin session can be forged by modifying localStorage
- No token expiration or refresh mechanism
- Backend has no knowledge of admin login state
- Anyone can manually set localStorage item to gain admin access

**Impact on Real-time Sync:**
- Fake admin sessions won't receive real-time updates correctly
- Backend cannot enforce proper authorization on WebSocket subscriptions
- Admin actions are not properly tracked/audited

**Fix:** 
- Store JWT token from backend instead of full user object
- Validate token with backend on app initialization
- Implement token refresh mechanism
- Use httpOnly cookies if possible

---

## RECOMMENDED FIX PRIORITY

1. **CRITICAL: Fix admin authentication** - Replace hardcoded credentials with backend API call, implement JWT tokens
2. **Fix restaurant identifier consistency** - Create centralized utility, replace all scattered mappings
3. **Fix query parameters** - Standardize all to use `restaurantId=`
4. **Remove hardcoded data** - Replace with API calls
5. **Implement missing endpoints** - Add `/api/scenarios`, `/api/admin/logs`, `/api/auth/users`
6. **Implement notification service** - Add real API/WebSocket calls
7. **Remove credentials from documentation** - Clean up exposed passwords in markdown files
8. **Clean up TODO comments** - Remove outdated references

---

## SUMMARY (FOR CHATGPT)

This summary contains all findings in clean bullet points for patch generation. Each finding includes file path, line numbers, issue type, and recommended fix.

### MOCK DATA FILES:
- `frontend-mobile/src/api/mock.ts` (Lines 1-21) - Outdated mock API comments, delete or update

### HARDCODED MOCK DATA IN COMPONENTS/SERVICES:
- `web/src/data/products.ts` (Lines 15-139) - Hardcoded array of 10 products, remove or convert to types-only export
- `web/src/pages/admin/AdminRestaurants.tsx` (Lines 130-179) - Hardcoded restaurant array with fake "Pizza Palace", initialize as empty array `[]`
- `web/src/context/AdminAuthContext.tsx` (Lines 33-46) - **CRITICAL:** Hardcoded admin credentials `admin`/`admin123`, replace with API call to `/api/auth/login`
- `web/src/components/admin/DroneDetailModal.tsx` (Lines 254-269) - Mock activity timeline fabricated from drone data, fetch from real event log API
- `web/src/services/scenarioService.ts` (Lines 164-167) - Mock API simulation, replace with `api.post('/scenarios', newScenario)`
- `web/src/services/droneRealtimeService.ts` (Lines 111-113) - Mock ETA calculation using random numbers, calculate from real GPS data

### MIXED CODE (MOCK + REAL API):
- `web/src/services/restaurantOrderService.ts` (Lines 25-35) - Uses `restaurant=` parameter, change to `restaurantId=`
- `web/src/components/restaurant/RestaurantAnalytics.tsx` (Lines 297-308) - Uses `restaurant=` parameter, change to `restaurantId=`

### DEAD CODE / OUTDATED COMMENTS:
- Multiple files (Lines: `RestaurantAnalytics.tsx:287`, `DroneMonitor.tsx:33,511,667,759`, `Login.tsx:4`, `AuthContext.tsx:162`, `AdminDashboard.tsx:393`, `AdminControlPanel.tsx:4`) - TODO comments referencing removed mock data, delete comments

### INCONSISTENT RESTAURANT IDENTIFIERS:
- `web/src/services/restaurantService.ts` (Lines 53-61) - Restaurant normalization logic, create centralized utility
- `web/src/services/restaurantOrderService.ts` (Lines 10-13) - Restaurant normalization logic, use centralized utility
- `web/src/services/menuManagementService.ts` (Lines 26-33) - REVERSE restaurant normalization (maps ID->name), fix or use centralized utility
- `web/src/services/restaurantNotificationService.ts` (Lines 84-87) - Restaurant normalization to lowercase, use centralized utility
- `web/src/components/restaurant/RestaurantAnalytics.tsx` (Lines 298-301) - Restaurant normalization logic, use centralized utility
- `web/src/pages/Details.tsx` (Lines 133-138) - Restaurant normalization logic, use centralized utility
- `web/src/context/RestaurantSelectionContext.tsx` (Lines 18-23) - Uses restaurant names instead of IDs, standardize to use IDs
- `web/src/data/products.ts` (Lines 8,23,85) - Products have restaurant names, backend uses IDs, map on API response
- `web/src/services/restaurantOrderService.ts` (Line 35) - Uses `?restaurant=` parameter, change to `?restaurantId=`
- `web/src/components/restaurant/RestaurantAnalytics.tsx` (Line 308) - Uses `?restaurant=` parameter, change to `?restaurantId=`
- `web/src/services/menuManagementService.ts` (Line 184) - Uses `?restaurant=` parameter, change to `?restaurantId=`

### MISSING API ENDPOINTS:
- `web/src/services/scenarioService.ts` (Line 35) - Calls `/scenarios` endpoint, create `ScenarioController` in backend or remove frontend feature
- `web/src/data/adminData.ts` (Lines 118-122) - System logs endpoint missing, implement `/api/admin/logs` or remove UI
- `web/src/data/adminData.ts` (Lines 40,83) - Calls `/auth/users` endpoint, add `GET /api/auth/users` in `AuthController` with admin auth check

### API SHAPE MISMATCHES:
- `web/src/data/products.ts` (Line 8) - Frontend expects `restaurant: "SweetDreams" | "Aloha"`, backend allows any string, update frontend type
- `web/src/pages/admin/AdminOrders.tsx` (Line 17) - Inconsistent access to `order.restaurant` vs `order.restaurantId`, standardize to `restaurantId`
- `web/src/data/adminData.ts` (Line 51) - Checks both `restaurantId` and `restaurant` fields, standardize to `restaurantId` only
- `web/src/types/admin.ts` - Drone status enum may not match backend string values, verify exact match

### WEBSOCKET / NOTIFICATIONS:
- `web/src/services/restaurantNotificationService.ts` (Lines 18-53) - Notification function only logs to console, implement real API call to `/api/notifications` or WebSocket

### SECURITY RISKS (CRITICAL):
- `web/src/context/AdminAuthContext.tsx` (Lines 33-46) - **CRITICAL:** Hardcoded admin credentials bypassing backend, replace with `/api/auth/login` call and JWT token storage
- `web/src/pages/admin/AdminLogin.tsx` (Lines 195-200) - Admin credentials displayed in UI, remove from production builds
- `web/ADMIN_INDEPENDENCE_DOCUMENTATION.md` (Lines 363-364) - Exposed credentials in documentation, remove or use environment variables
- `web/src/context/AdminAuthContext.tsx` (Lines 11-22, 24-27) - Admin session in localStorage without backend validation, implement JWT token validation on app init

### IMPACT ON REAL-TIME ORDER SYNC (MOBILE → RESTAURANT DASHBOARD):
1. Restaurant identifier inconsistencies prevent correct WebSocket topic subscriptions (`/topic/orders/{restaurantId}` may use wrong ID)
2. Hardcoded products/restaurants display stale data, not updated via real-time
3. Missing API endpoints cause silent failures, breaking admin features that manage orders
4. Admin authentication bypass means backend cannot track admin actions or send admin-specific real-time updates
5. Notification service doesn't send notifications, breaking restaurant real-time alerts when mobile orders are created
6. Query parameter inconsistency causes backend filtering failures, returning wrong orders to restaurant dashboards

### PRIORITY FIX ORDER:
1. **CRITICAL:** Fix admin authentication (Security risk + breaks real-time tracking)
2. Fix restaurant identifier consistency (Breaks WebSocket subscriptions + filtering)
3. Standardize query parameters to use `restaurantId=` (Causes 500 errors + wrong data)
4. Remove hardcoded data arrays (Stale data not updated in real-time)
5. Implement missing endpoints or remove frontend calls (Silent failures)
6. Implement notification service API calls (Breaks restaurant alerts)
7. Remove credentials from documentation (Security risk)
8. Clean up TODO comments (Code clutter)

---

## SUMMARY (FOR CHATGPT)

### MOCK DATA FILES:
1. `frontend-mobile/src/api/mock.ts` (Lines 1-21) - Outdated mock API comments, no runtime impact

### HARDCODED MOCK DATA:
2. `web/src/data/products.ts` (Lines 15-139) - Hardcoded array of 10 products competing with backend API
3. `web/src/pages/admin/AdminRestaurants.tsx` (Lines 130-179) - Hardcoded restaurant array including fake "Pizza Palace"
4. `web/src/context/AdminAuthContext.tsx` (Lines 33-46) - Hardcoded admin credentials `admin`/`admin123` bypassing backend
5. `web/src/components/admin/DroneDetailModal.tsx` (Lines 254-269) - Mock activity timeline fabricated from drone data
6. `web/src/services/scenarioService.ts` (Lines 164-167) - Mock API simulation, no real backend call
7. `web/src/services/droneRealtimeService.ts` (Lines 111-113) - Mock ETA calculation using random numbers

### MIXED CODE (MOCK + REAL API):
8. `web/src/services/restaurantOrderService.ts` (Lines 25-35) - Uses `restaurant=` parameter instead of `restaurantId=`
9. `web/src/components/restaurant/RestaurantAnalytics.tsx` (Lines 297-308) - Uses `restaurant=` parameter instead of `restaurantId=`

### DEAD CODE / OUTDATED COMMENTS:
10. Multiple files with TODO comments referencing removed mock data (Low priority cleanup)

### INCONSISTENT RESTAURANT IDENTIFIERS:
11. 6+ files implement different restaurant name-to-ID mapping logic scattered across codebase
12. Frontend uses restaurant names ("SweetDreams", "Aloha") while backend uses IDs ("rest_2", "restaurant_2")
13. Inconsistent query parameter usage: some use `?restaurant=`, others use `?restaurantId=`

### MISSING API ENDPOINTS:
14. `web/src/services/scenarioService.ts:35` - Calls `/scenarios` endpoint that doesn't exist in backend
15. `web/src/data/adminData.ts:118-122` - System logs endpoint missing, returns empty array
16. `web/src/data/adminData.ts:40,83` - Calls `/auth/users` endpoint that may not exist

### API SHAPE MISMATCHES:
17. Products restaurant field: Frontend expects "SweetDreams" | "Aloha", backend allows any string
18. Orders: Frontend inconsistently accesses `order.restaurant` vs `order.restaurantId`
19. Drone status: Frontend enum types may not match backend string values exactly

### WEBSOCKET / NOTIFICATIONS:
20. `web/src/services/restaurantNotificationService.ts:18-53` - Notification function doesn't actually call backend, only logs to console

### SECURITY RISKS:
21. `web/src/context/AdminAuthContext.tsx:33-46` - **CRITICAL:** Hardcoded admin credentials bypassing backend authentication
22. `web/src/pages/admin/AdminLogin.tsx:195-200` - Admin credentials displayed in UI (if visible)
23. Documentation files expose admin credentials in plain text
24. Admin session stored in localStorage without backend validation, can be forged

### IMPACT ON REAL-TIME SYNC:
- Restaurant identifier inconsistencies prevent correct WebSocket topic subscriptions
- Hardcoded data displays stale information, not updated via real-time
- Missing endpoints cause silent failures
- Admin authentication bypass means backend cannot track admin actions or send admin-specific real-time updates
- Notification service doesn't send notifications, breaking restaurant real-time alerts
- Query parameter inconsistency causes backend filtering failures

### PRIORITY FIXES:
1. **CRITICAL:** Replace hardcoded admin credentials with backend API authentication
2. Create centralized restaurant identifier utility (`web/src/utils/restaurantUtils.ts`)
3. Standardize all API calls to use `restaurantId=` parameter
4. Remove hardcoded products/restaurants arrays, fetch from API
5. Implement missing backend endpoints or remove frontend calls
6. Implement real notification service API calls
7. Remove credentials from documentation files

