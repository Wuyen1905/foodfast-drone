# FINAL MOCK SCAN REPORT - Post Phase 1.2 Cleanup
## Deep Scan Verification After Mock Logic Removal

**Scan Date:** Current  
**Scope:** Entire project (excluding node_modules)  
**Goal:** Verify complete removal of mock logic, mock data, fallback-to-mock behavior, and mock API structures after Phase 1.2 cleanup

---

## EXECUTIVE SUMMARY

**Total Issues Found:** 19  
**Critical Mock Logic:** 8  
**High Risk:** 6  
**Moderate:** 4  
**Low/False Positives:** 1  

**Status:** ⚠️ **PARTIALLY CLEAN** - Most mock logic removed, but several critical issues remain in `web/` directory.

---

## DETAILED FINDINGS

### 🔴 CRITICAL MOCK LOGIC (8 issues)

#### [1] File: `web/src/pages/admin/AdminOrders.tsx`
**Lines:** 136-194  
**Snippet:**
```typescript
const [orders, setOrders] = useState<Order[]>([
  {
    id: 'ORD-001',
    userId: 'u2',
    restaurantId: 'rest_1',
    items: [
      { id: 'item1', productId: 'prod1', productName: 'Burger Deluxe', quantity: 2, price: 15.99 },
      { id: 'item2', productId: 'prod2', productName: 'French Fries', quantity: 1, price: 5.99 }
    ],
    total: 37.97,
    status: 'delivered',
    createdAt: Date.now() - 86400000 * 2,
    // ... more hardcoded orders
  },
  // ... 3 more hardcoded order objects
]);
```
**Severity:** CRITICAL  
**Reason:** Hardcoded array of 4 mock order objects initialized in component state. This is mock data, not fetched from backend.  
**Is Mock:** ✅ YES  
**Recommended Fix:** Replace with empty array `useState<Order[]>([])` and add `useEffect` to load orders from backend API on mount.

---

#### [2] File: `web/src/pages/admin/AdminDashboard.tsx`
**Lines:** 393-411  
**Snippet:**
```typescript
// Fallback to mock data
setRestaurants([
  { id: '1', name: 'Aloha Kitchen', status: 'Đang hoạt động', category: 'Asian Fusion', totalOrders: 0, totalRevenue: 0, rating: 0, droneCount: 2 },
  { id: '2', name: 'SweetDreams Bakery', status: 'Đang hoạt động', category: 'Bakery', totalOrders: 0, totalRevenue: 0, rating: 0, droneCount: 3 }
]);
setCustomers([]);
setDrones([]);
setLogs([]);
setStats({
  totalRestaurants: 2,
  totalCustomers: 0,
  // ... more hardcoded stats
});
```
**Severity:** CRITICAL  
**Reason:** Fallback to hardcoded mock data when API fails. Comment explicitly says "Fallback to mock data". Hardcoded restaurant array and stats object.  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove fallback mock data. Set empty arrays/objects on error instead. Show error message to user.

---

#### [3] File: `web/src/components/admin/DroneMonitor.tsx`
**Lines:** 576-596, 742-750  
**Snippet:**
```typescript
// For mock drones without realtime data, create it on the fly
const mockData: DroneRealtimeData = {
  id: drone.id,
  code: drone.id,
  battery: drone.battery,
  status: drone.status === 'Delivering' ? 'delivering' as const :
          drone.status === 'Charging' ? 'charging' as const :
          'active' as const,
  restaurantId: drone.restaurantId,
  orderId: drone.currentOrderId,
  missionsCompleted: 0,
  lastMaintenance: new Date(drone.lastMaintenance).toISOString(),
  position: {
    lat: 10.7769,
    lng: 106.7009
  },
  speed: drone.status === 'Delivering' ? 20.5 : 0,
  connectionStatus: 'online' as const,
  eta: drone.status === 'Delivering' ? 12 : undefined,
  lastUpdate: new Date().toISOString()
};
setSelectedDrone(mockData);

// ... later in code
if (isMockData && !realtime) {
  realtime = {
    id: drone.id,
    // ... creates mock realtime data
  };
}
```
**Severity:** CRITICAL  
**Reason:** Creates mock realtime data objects on the fly. Variable named `mockData`. Comment says "For mock drones". Creates fake position, speed, ETA data.  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove mock data generation. If no realtime data exists, show error state or loading indicator instead of creating fake data.

---

#### [4] File: `web/src/components/restaurant/OrderTracking.tsx`
**Lines:** 469, 477  
**Snippet:**
```typescript
// Trigger a refresh by updating orders from localStorage
const orders = JSON.parse(localStorage.getItem('orders') || '[]');
// This will trigger the useEffect above

// ... later
const handleOrderUpdate = (event: CustomEvent) => {
  // Refresh orders when order is updated
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  // This will trigger the useEffect above
};
```
**Severity:** CRITICAL  
**Reason:** Reads orders from localStorage as database. Used in event handlers to refresh order data. This is localStorage-as-database pattern.  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove localStorage access. Use OrderContext or backend API to refresh orders.

---

#### [5] File: `web/src/services/restaurantNotificationService.ts`
**Lines:** 33-34  
**Snippet:**
```typescript
// Simulate API call delay
await new Promise(resolve => setTimeout(resolve, 300));
```
**Severity:** CRITICAL  
**Reason:** Uses `setTimeout` to simulate API call delay (300ms). This is mock behavior.  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove `setTimeout` delay. Make actual API call or remove delay entirely.

---

#### [6] File: `web/src/services/vnpay.ts`
**Lines:** 254-255  
**Snippet:**
```typescript
// Simulate network delay
setTimeout(() => {
```
**Severity:** CRITICAL  
**Reason:** Uses `setTimeout` to simulate network delay. Comment explicitly says "Simulate network delay".  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove `setTimeout` delay. Return Promise immediately without artificial delay.

---

#### [7] File: `web/src/context/AuthContext.tsx`
**Lines:** 139-140  
**Snippet:**
```typescript
// Simulate API call delay
await new Promise((r) => setTimeout(r, 800));
```
**Severity:** CRITICAL  
**Reason:** Uses `setTimeout` to simulate API call delay (800ms) in registration function.  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove `setTimeout` delay. Make actual backend API call.

---

#### [8] File: `web/src/pages/OrderTracking.tsx`
**Lines:** 257-259  
**Snippet:**
```typescript
// Simulate loading delay
setTimeout(() => {
  const result = getOrdersByPhone(phone);
```
**Severity:** CRITICAL  
**Reason:** Uses `setTimeout` to simulate loading delay. Comment says "Simulate loading delay".  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove `setTimeout` delay. Call `getOrdersByPhone` immediately.

---

### 🟠 HIGH RISK (6 issues)

#### [9] File: `web/src/pages/Orders.tsx`
**Lines:** 195-197  
**Snippet:**
```typescript
// Simulate loading delay
setTimeout(() => {
  const result = getOrdersByPhone(phone);
```
**Severity:** HIGH  
**Reason:** Uses `setTimeout` to simulate loading delay. Comment says "Simulate loading delay".  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove `setTimeout` delay. Call `getOrdersByPhone` immediately.

---

#### [10] File: `web/src/pages/VNPayReturn.tsx`
**Lines:** 105-106  
**Snippet:**
```typescript
// Simulate processing delay
await new Promise(resolve => setTimeout(resolve, 1500));
```
**Severity:** HIGH  
**Reason:** Uses `setTimeout` to simulate processing delay (1500ms). Comment says "Simulate processing delay".  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove `setTimeout` delay. Process payment callback immediately.

---

#### [11] File: `web/src/pages/AdminDashboard.tsx`
**Lines:** 271-272  
**Snippet:**
```typescript
// Simulate refresh delay
await new Promise(resolve => setTimeout(resolve, 1000));
```
**Severity:** HIGH  
**Reason:** Uses `setTimeout` to simulate refresh delay (1000ms). Comment says "Simulate refresh delay".  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove `setTimeout` delay. Call `refreshData()` immediately without artificial delay.

---

#### [12] File: `web/package.json`
**Lines:** 29  
**Snippet:**
```json
"axios-mock-adapter": "^2.1.0",
```
**Severity:** HIGH  
**Reason:** Dependency on `axios-mock-adapter` package still present. May be unused but indicates mock infrastructure.  
**Is Mock:** ⚠️ POTENTIALLY  
**Recommended Fix:** Remove from dependencies if unused. Verify no imports of AxiosMockAdapter exist in source code.

---

#### [13] File: `mobile/package.json`
**Lines:** 22  
**Snippet:**
```json
"axios-mock-adapter": "^2.1.0"
```
**Severity:** HIGH  
**Reason:** Dependency on `axios-mock-adapter` package still present.  
**Is Mock:** ⚠️ POTENTIALLY  
**Recommended Fix:** Remove from dependencies. Already replaced `mobile/src/api/mock.ts` with `api.ts`, so this dependency is no longer needed.

---

#### [14] File: `mock-api-restaurant/` directory
**Files:** `server.js`, `package.json`, `validate-json.js`, `README.md`  
**Severity:** HIGH  
**Reason:** Entire mock API server directory still exists. Uses `db.json` file pattern. Provides mock endpoints for restaurant operations.  
**Is Mock:** ✅ YES  
**Recommended Fix:** Delete entire `mock-api-restaurant/` directory if backend is fully functional. If still needed for development, document it clearly as development-only and separate from production codebase.

---

### 🟡 MODERATE (4 issues)

#### [15] File: `web/src/services/orderApiService.ts`
**Lines:** 15, 110, 118, 173, 189, 197  
**Snippet:**
```typescript
// [Data Sync] Map db.json order structure to OrderContext Order type
// [Data Sync] Map OrderContext Order type to db.json order structure
// Normalize restaurant ID to db.json format
// [Fix 500 Error] Generate orderTime (format: "HH:MM") - required by db.json
// [Fix 500 Error] Build order payload matching db.json structure exactly
orderTime: orderTime, // Required by db.json
```
**Severity:** MODERATE  
**Reason:** Multiple comments reference "db.json format" and "db.json structure". These are legacy comments from mock API era. Code itself uses backend API, but comments are misleading.  
**Is Mock:** ⚠️ COMMENT RESIDUE  
**Recommended Fix:** Update comments to reference "backend API format" instead of "db.json format". Remove all "db.json" references from comments.

---

#### [16] File: `web/src/pages/Checkout.tsx`
**Lines:** 538, 541  
**Snippet:**
```typescript
// Ensure restaurant ID is in db.json format (rest_2, restaurant_2)
// Map to db.json format if needed
```
**Severity:** MODERATE  
**Reason:** Comments reference "db.json format". Legacy comment from mock API era.  
**Is Mock:** ⚠️ COMMENT RESIDUE  
**Recommended Fix:** Update comments to reference "backend API format" instead of "db.json format".

---

#### [17] File: `web/src/services/adminRealtime.ts`
**Lines:** 31  
**Snippet:**
```typescript
/**
 * Fetch realtime order statistics from mock API
 * Enhanced to calculate stats from orders if realtimeStats endpoint doesn't exist
 */
```
**Severity:** MODERATE  
**Reason:** Comment says "from mock API" but code actually uses backend API. Misleading comment.  
**Is Mock:** ⚠️ COMMENT RESIDUE  
**Recommended Fix:** Update comment to say "from backend API" instead of "from mock API".

---

#### [18] File: `frontend-mobile/src/api/mock.ts`
**Lines:** 3, 18  
**Snippet:**
```typescript
// [Data Sync] Use shared mock API server instead of AxiosMockAdapter
// [Data Sync] Note: Removed AxiosMockAdapter - now using backend API
```
**Severity:** MODERATE  
**Reason:** File name is `mock.ts` (misleading). Comments reference "mock API server" and "AxiosMockAdapter". File actually uses backend API now, but name and comments are misleading.  
**Is Mock:** ⚠️ RESIDUE (file uses backend, but name/comments are misleading)  
**Recommended Fix:** Rename file from `mock.ts` to `api.ts` or `apiClient.ts`. Remove mock-related comments.

---

### 🟢 LOW / FALSE POSITIVES (1 issue)

#### [19] File: `web/src/components/admin/DroneMonitor.tsx`
**Lines:** 725, 731, 742  
**Snippet:**
```typescript
// Check if this is mock data (when no real drones exist)
const isMockData = enhancedDrones.length === 0;

🏪 {restaurantName} {isMockData && '(Demo)'}

if (isMockData && !realtime) {
  // Creates realtime data
}
```
**Severity:** LOW  
**Reason:** Variable named `isMockData` and comment mentions "mock data", but this is just a flag to indicate when no real data exists (for UI display purposes). The actual mock data generation was removed. This is acceptable UI state management.  
**Is Mock:** ❌ NO (False Positive - UI state flag, not mock data)  
**Recommended Fix:** None needed. Consider renaming variable to `isEmptyData` or `hasNoData` for clarity, but not critical.

---

## SUMMARY BY DIRECTORY

### `frontend-web/` Directory
**Status:** ✅ **CLEAN**  
- All mock logic removed
- All localStorage database logic removed
- All setTimeout delays removed
- Only acceptable localStorage usage (auth tokens, UI preferences)

### `web/` Directory
**Status:** ⚠️ **CONTAINS MOCK LOGIC**  
- **Critical Issues:**
  - Hardcoded order array in `AdminOrders.tsx`
  - Fallback to mock data in `AdminDashboard.tsx`
  - Mock realtime data generation in `DroneMonitor.tsx`
  - localStorage database usage in `OrderTracking.tsx`
  - Multiple `setTimeout` delays (6 locations)
- **High Issues:**
  - `axios-mock-adapter` dependency in package.json
  - Comments referencing "db.json format"
- **Moderate Issues:**
  - Misleading comments about mock API

### `mobile/` Directory
**Status:** ⚠️ **DEPENDENCY RESIDUE**  
- `axios-mock-adapter` dependency in package.json (but `api.ts` created correctly)

### `frontend-mobile/` Directory
**Status:** ⚠️ **RESIDUE ONLY**  
- `src/api/mock.ts` has misleading name and comments but uses backend API
- Should be renamed

### `mock-api-restaurant/` Directory
**Status:** ❌ **ENTIRE MOCK API SERVER STILL EXISTS**  
- Complete mock API server using db.json pattern
- Should be deleted or clearly documented as dev-only

---

## RECOMMENDATIONS

### Immediate Actions Required:

1. **Remove hardcoded order array** from `web/src/pages/admin/AdminOrders.tsx`
2. **Remove fallback mock data** from `web/src/pages/admin/AdminDashboard.tsx`
3. **Remove mock realtime data generation** from `web/src/components/admin/DroneMonitor.tsx`
4. **Remove localStorage database usage** from `web/src/components/restaurant/OrderTracking.tsx`
5. **Remove all `setTimeout` delays** (6 locations):
   - `web/src/services/restaurantNotificationService.ts`
   - `web/src/services/vnpay.ts`
   - `web/src/context/AuthContext.tsx`
   - `web/src/pages/OrderTracking.tsx`
   - `web/src/pages/Orders.tsx`
   - `web/src/pages/VNPayReturn.tsx`
   - `web/src/pages/AdminDashboard.tsx`
6. **Remove `axios-mock-adapter`** from `web/package.json` and `mobile/package.json`
7. **Delete `mock-api-restaurant/` directory** (or document as dev-only)
8. **Rename `frontend-mobile/src/api/mock.ts`** to `api.ts`
9. **Update comments** in `orderApiService.ts` and `Checkout.tsx` to remove "db.json" references

---

## VERIFICATION CHECKLIST

- [ ] No `simulateDelay()` functions exist
- [ ] No `setTimeout` used for API delays
- [ ] No localStorage used as database (orders, products, users, restaurants, drones)
- [ ] No imports from `mockData.ts` files
- [ ] No `generateMock*` functions
- [ ] No `AxiosMockAdapter` usage
- [ ] No `mock-api/` or `mock-api-restaurant/` directories (or documented as dev-only)
- [ ] No hardcoded arrays of orders/products/restaurants/users
- [ ] No fallback to mock data on API errors
- [ ] All services use backend APIs
- [ ] All components fetch data from backend
- [ ] `axios-mock-adapter` removed from package.json files
- [ ] No misleading "mock" file names

---

## DETAILED FILE-BY-FILE BREAKDOWN

### Critical Issues Details:

**File: `web/src/pages/admin/AdminOrders.tsx`**
- **Issue:** Hardcoded 4-order array in `useState` initializer
- **Fix:** Replace with `useState<Order[]>([])` and load from API in `useEffect`

**File: `web/src/pages/admin/AdminDashboard.tsx`**
- **Issue:** Fallback to hardcoded restaurants array and stats object
- **Fix:** Remove fallback. Set empty arrays/objects and show error message

**File: `web/src/components/admin/DroneMonitor.tsx`**
- **Issue:** Creates `mockData` object with fake position, speed, ETA
- **Fix:** Remove mock data generation. Show error/loading state instead

**File: `web/src/components/restaurant/OrderTracking.tsx`**
- **Issue:** `localStorage.getItem('orders')` in event handlers
- **Fix:** Use OrderContext or backend API to refresh orders

**File: `web/src/services/restaurantNotificationService.ts`**
- **Issue:** `setTimeout(resolve, 300)` to simulate delay
- **Fix:** Remove setTimeout, make actual API call

**File: `web/src/services/vnpay.ts`**
- **Issue:** `setTimeout(() => {...})` to simulate network delay
- **Fix:** Remove setTimeout, return Promise immediately

**File: `web/src/context/AuthContext.tsx`**
- **Issue:** `setTimeout(r, 800)` in registration function
- **Fix:** Remove setTimeout, make actual backend API call

**File: `web/src/pages/OrderTracking.tsx`**
- **Issue:** `setTimeout(() => {...})` to simulate loading delay
- **Fix:** Remove setTimeout, call function immediately

---

## ACCEPTABLE USAGE (Not Mock Logic)

The following localStorage usage is **ACCEPTABLE** and should **NOT** be removed:
- `AuthContext.tsx` - Auth tokens and user data (standard practice)
- `AdminAuthContext.tsx` - Admin auth tokens (standard practice)
- `ThemeContext.tsx` - UI theme preferences
- `WishlistContext.tsx` - UI wishlist preferences
- `RestaurantSelectionContext.tsx` - UI selection preferences
- `DroneJourney.tsx` - UI animation state (`drone-state-${orderId}`)

---

**END OF REPORT**

