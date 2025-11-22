# FULL MOCK SCAN REPORT
## Deep Scan of Entire Project - Post Migration Verification

**Scan Date:** Current  
**Scope:** Entire project (excluding node_modules)  
**Goal:** Verify complete removal of mock logic, mock data, fallback-to-mock behavior, and mock API structures

---

## EXECUTIVE SUMMARY

**Total Issues Found:** 25  
**Critical Mock Logic:** 12  
**High Risk:** 8  
**Moderate:** 4  
**Low/False Positives:** 1  

**Status:** ❌ **MIGRATION INCOMPLETE** - Multiple mock patterns still present in `web/` directory and `mobile/` directory.

---

## DETAILED FINDINGS

### 🔴 CRITICAL MOCK LOGIC (12 issues)

#### [1] File: `web/src/services/menuService.ts`
**Lines:** 4-8, 11-27, 30-33  
**Snippet:**
```typescript
// Simulate API delay
const simulateDelay = (min: number = 300, max: number = 800): Promise<void> => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Load products from localStorage or use default
const loadProducts = (): Product[] => {
  const stored = localStorage.getItem("foodfast_products");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error("Error parsing stored products:", error);
      return products;
    }
  }
  return products;
};

// Save products to localStorage
const saveProducts = (productsToSave: Product[]): void => {
  localStorage.setItem("foodfast_products", JSON.stringify(productsToSave));
};

export const getAllProducts = async (): Promise<Product[]> => {
  await simulateDelay();
  return loadProducts();
};
```
**Severity:** CRITICAL  
**Reason:** Complete mock service using localStorage as database and setTimeout to simulate API delays. All functions use mock logic instead of backend APIs.  
**Is Mock:** ✅ YES  
**Recommended Fix:** Replace all functions with backend API calls using `productApi`. Remove `simulateDelay`, `loadProducts`, `saveProducts`, and all localStorage operations.

---

#### [2] File: `web/src/services/restaurantService.ts`
**Lines:** 219-223, 251, 350, 367, 408, 435, 483  
**Snippet:**
```typescript
// Helper function to simulate network delay
const simulateDelay = (min: number = 800, max: number = 1500): Promise<void> => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

export const getRestaurantOverview = async (id: string): Promise<RestaurantOverview | null> => {
  await simulateDelay();
  // ... hardcoded data logic
};
```
**Severity:** CRITICAL  
**Reason:** Uses `setTimeout` to simulate network delays. Contains hardcoded restaurant data arrays. Multiple functions call `simulateDelay()`.  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove `simulateDelay` function and all calls to it. Replace hardcoded data with backend API calls.

---

#### [3] File: `web/src/services/menuManagementService.ts`
**Lines:** 26-30, 34, 36-50  
**Snippet:**
```typescript
// Simulate API delay
const simulateDelay = (min: number = 500, max: number = 1200): Promise<void> => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

export const getDishesByRestaurant = async (restaurantId: string): Promise<MenuItem[]> => {
  await simulateDelay();
  
  // Get from localStorage first, fallback to mock data
  const storageKey = `foodfast_menu_${restaurantId}`;
  const storedData = localStorage.getItem(storageKey);
  
  if (storedData) {
    return JSON.parse(storedData);
  }
  
  // Return mock data based on restaurant
  const mockData = restaurantId === 'sweetdreams' ? mockMenuSweetDreams : alohaMenu;
  
  // Store in localStorage for persistence
  localStorage.setItem(storageKey, JSON.stringify(mockData));
  
  return mockData;
};
```
**Severity:** CRITICAL  
**Reason:** Uses localStorage as database, fallback to mock data (`mockMenuSweetDreams`, `alohaMenu`), and `setTimeout` delays.  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove `simulateDelay`, localStorage operations, and mock data imports. Replace with backend API calls.

---

#### [4] File: `web/src/services/restaurantOrderService.ts`
**Lines:** 6-10, 67  
**Snippet:**
```typescript
// Simulate network delay
const simulateDelay = (min: number = 300, max: number = 800): Promise<void> => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// ... later in code
await simulateDelay();
```
**Severity:** CRITICAL  
**Reason:** Uses `setTimeout` to simulate API delays.  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove `simulateDelay` function and all calls to it.

---

#### [5] File: `web/src/context/OrderContext.tsx`
**Lines:** 102, 124-129, 292, 323, 377, 382, 404, 447, 450  
**Snippet:**
```typescript
// Also sync to localStorage as backup
localStorage.setItem("orders", JSON.stringify(apiOrders));

// Fallback to localStorage if API fails
const saved = localStorage.getItem("orders");
if (saved) {
  try {
    const parsedOrders = JSON.parse(saved);
    setOrders(parsedOrders);
  } catch (e) {
    // ...
  }
}
```
**Severity:** CRITICAL  
**Reason:** Uses localStorage as database for orders. Multiple locations sync orders to localStorage and fallback to localStorage on API errors.  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove all localStorage operations for orders. Only use backend API. Handle errors without localStorage fallback.

---

#### [6] File: `web/src/components/OrderCard.tsx`
**Lines:** 72-86  
**Snippet:**
```typescript
const updateOrderStatus = (newStatus: string) => {
  // Update order status in localStorage
  const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
  const userIndex = users.findIndex((u: any) => u.phone === order.userPhone);
  
  if (userIndex !== -1) {
    const orderIndex = users[userIndex].orders.findIndex((o: any) => o.id === order.id);
    if (orderIndex !== -1) {
      users[userIndex].orders[orderIndex].status = newStatus;
      localStorage.setItem('mock_users', JSON.stringify(users));
      
      // Update global order history
      const history = JSON.parse(localStorage.getItem('orderHistory') || '[]');
      const historyIndex = history.findIndex((o: any) => o.id === order.id);
      if (historyIndex !== -1) {
        history[historyIndex].status = newStatus;
        localStorage.setItem('orderHistory', JSON.stringify(history));
      }
    }
  }
};
```
**Severity:** CRITICAL  
**Reason:** Uses localStorage with key `'mock_users'` as database. Explicitly named "mock" indicating mock database logic.  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove all localStorage operations. Use backend API to update order status.

---

#### [7] File: `web/src/data/adminData.ts`
**Lines:** 1-117 (entire file)  
**Snippet:**
```typescript
/**
 * Admin Mock Data
 * This file contains mock data for the admin dashboard
 */

import { RESTAURANTS, USERS } from './mockData';

// Generate mock drones for each restaurant
export const generateMockDrones = (): AdminDrone[] => {
  // ... generates fake drone data
};

// Generate mock restaurant data with admin-specific fields
export const generateMockRestaurants = (): AdminRestaurant[] => {
  return RESTAURANTS.map((restaurant, index) => ({
    // ... generates fake restaurant data
  }));
};

// Generate mock customer data
export const generateMockCustomers = (): AdminCustomer[] => {
  const customers = USERS.filter(u => u.role === 'customer');
  // ... generates fake customer data
};

// Initial system logs
export const initialSystemLogs: SystemLog[] = [
  // ... hardcoded log entries
];
```
**Severity:** CRITICAL  
**Reason:** Entire file is mock data generator. File header says "Admin Mock Data". Imports from `mockData.ts`. Generates fake drones, restaurants, customers, and hardcoded system logs.  
**Is Mock:** ✅ YES  
**Recommended Fix:** Replace with backend API calls. Remove all mock data generation functions. Import from API services instead of `mockData`.

---

#### [8] File: `web/src/pages/Login.tsx`
**Lines:** 4  
**Snippet:**
```typescript
import { USERS } from "@/data/mockData";
```
**Severity:** CRITICAL  
**Reason:** Imports `USERS` from `mockData.ts` file.  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove import. Use backend authentication API instead.

---

#### [9] File: `web/src/context/AuthContext.tsx`
**Lines:** 3  
**Snippet:**
```typescript
import { USERS, CREDENTIALS } from "../data/mockData";
```
**Severity:** CRITICAL  
**Reason:** Imports `USERS` and `CREDENTIALS` from `mockData.ts` file.  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove imports. Use backend authentication API instead.

---

#### [10] File: `web/src/components/admin/DroneMonitor.tsx`
**Lines:** 32  
**Snippet:**
```typescript
import { mockDrones } from '../../data/mockDrones';
```
**Severity:** CRITICAL  
**Reason:** Imports `mockDrones` from mock data file.  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove import. Use backend drone API instead.

---

#### [11] File: `web/src/components/restaurant/DroneTrackerMap.tsx`
**Lines:** 6, 275, 297  
**Snippet:**
```typescript
import {
  DroneData,
  generateMockDrones,
  updateDronePosition,
  // ...
} from '../../services/DroneSimulationService';

useEffect(() => {
  setDrones(generateMockDrones(8));
}, []);

<Button onClick={() => { setIsSimulating(false); setDrones(generateMockDrones(8)); }}>
  🔄 Đặt lại
</Button>
```
**Severity:** CRITICAL  
**Reason:** Imports and uses `generateMockDrones` function. Initializes drones with mock data. Button resets to mock data.  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove `generateMockDrones` import and usage. Use backend drone API to fetch real drones.

---

#### [12] File: `mobile/src/api/mock.ts`
**Lines:** 1-43 (entire file)  
**Snippet:**
```typescript
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

export const api = axios.create({ baseURL: 'https://mock.local/api' });
const mock = new AxiosMockAdapter(api, { delayResponse: 400 });

// ... hardcoded dishes array
const dishes: Dish[] = [
  { id: '1', name: 'Burger Drone', price: 6.5, image: '...' },
  // ...
];

// ... mock API responses
mock.onGet('/dishes').reply(200, { items: dishes });
mock.onGet('/cart').reply(200, { cart });
mock.onPost('/checkout').reply(200, { orderId: 'ORD-' + Math.floor(Math.random() * 100000) });
```
**Severity:** CRITICAL  
**Reason:** Complete mock API using AxiosMockAdapter. Hardcoded data arrays. Mock endpoints for dishes, cart, checkout, drone status.  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove entire file. Replace with real backend API client pointing to actual backend.

---

### 🟠 HIGH RISK (8 issues)

#### [13] File: `web/src/components/restaurant/OrderTracking.tsx`
**Lines:** 469, 477  
**Snippet:**
```typescript
const orders = JSON.parse(localStorage.getItem('orders') || '[]');
```
**Severity:** HIGH  
**Reason:** Reads orders from localStorage (mock database pattern).  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove localStorage access. Use OrderContext or backend API.

---

#### [14] File: `web/src/services/restaurantOrderService.ts`
**Lines:** 68, 222, 232  
**Snippet:**
```typescript
const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
// ... later
localStorage.setItem('orders', JSON.stringify(orders));
```
**Severity:** HIGH  
**Reason:** Uses localStorage as database for orders.  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove localStorage operations. Use backend API.

---

#### [15] File: `web/package.json`
**Lines:** 29  
**Snippet:**
```json
"axios-mock-adapter": "^2.1.0",
```
**Severity:** HIGH  
**Reason:** Dependency on `axios-mock-adapter` package. May be unused but indicates mock infrastructure.  
**Is Mock:** ⚠️ POTENTIALLY  
**Recommended Fix:** Remove from dependencies if unused. Verify no imports of AxiosMockAdapter exist.

---

#### [16] File: `mobile/package.json`
**Lines:** 22  
**Snippet:**
```json
"axios-mock-adapter": "^2.1.0"
```
**Severity:** HIGH  
**Reason:** Dependency on `axios-mock-adapter` package.  
**Is Mock:** ⚠️ POTENTIALLY  
**Recommended Fix:** Remove from dependencies. Already used in `mobile/src/api/mock.ts` which should be deleted.

---

#### [17] File: `mock-api/` directory
**Files:** `server.js`, `db.json`, `package.json`, and related files  
**Severity:** HIGH  
**Reason:** Entire mock API server directory. Uses `json-server` pattern with `db.json` file. Provides mock endpoints.  
**Is Mock:** ✅ YES  
**Recommended Fix:** Delete entire `mock-api/` directory if backend is fully functional. If still needed for development, document it clearly as development-only.

---

#### [18] File: `web/src/data/adminData.ts` - Import from mockData
**Lines:** 7  
**Snippet:**
```typescript
import { RESTAURANTS, USERS } from './mockData';
```
**Severity:** HIGH  
**Reason:** Imports from `mockData.ts` file (file may not exist but import suggests mock data dependency).  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove import. Use backend API instead.

---

#### [19] File: `web/src/pages/admin/AdminControlPanel.tsx`
**Lines:** 4  
**Snippet:**
```typescript
import { USERS, RESTAURANTS } from '@/data/mockData';
```
**Severity:** HIGH  
**Reason:** Imports from `mockData.ts` file.  
**Is Mock:** ✅ YES  
**Recommended Fix:** Remove import. Use backend API instead.

---

#### [20] File: `frontend-mobile/src/api/mock.ts`
**Lines:** 3, 18  
**Snippet:**
```typescript
// [Data Sync] Use shared mock API server instead of AxiosMockAdapter
// [Data Sync] Note: Removed AxiosMockAdapter - now using backend API
```
**Severity:** HIGH  
**Reason:** Comments reference mock API server and AxiosMockAdapter. File name is `mock.ts`.  
**Is Mock:** ⚠️ RESIDUE (file appears to use backend now, but name and comments are misleading)  
**Recommended Fix:** Rename file from `mock.ts` to `api.ts` or `apiClient.ts`. Remove mock-related comments.

---

### 🟡 MODERATE (4 issues)

#### [21] File: `web/src/pages/OrderTracking.tsx`
**Lines:** 257  
**Snippet:**
```typescript
// Simulate loading delay
```
**Severity:** MODERATE  
**Reason:** Comment mentions "Simulate loading delay" but code may have been updated.  
**Is Mock:** ⚠️ COMMENT ONLY  
**Recommended Fix:** Remove or update comment if delay was removed.

---

#### [22] File: `web/src/pages/Orders.tsx`
**Lines:** 195  
**Snippet:**
```typescript
// Simulate loading delay
```
**Severity:** MODERATE  
**Reason:** Comment mentions "Simulate loading delay" but code may have been updated.  
**Is Mock:** ⚠️ COMMENT ONLY  
**Recommended Fix:** Remove or update comment if delay was removed.

---

#### [23] File: `web/src/pages/VNPayReturn.tsx`
**Lines:** 105  
**Snippet:**
```typescript
// Simulate processing delay
```
**Severity:** MODERATE  
**Reason:** Comment mentions "Simulate processing delay" but code may have been updated.  
**Is Mock:** ⚠️ COMMENT ONLY  
**Recommended Fix:** Remove or update comment if delay was removed.

---

#### [24] File: `web/src/pages/AdminDashboard.tsx`
**Lines:** 271  
**Snippet:**
```typescript
// Simulate refresh delay
```
**Severity:** MODERATE  
**Reason:** Comment mentions "Simulate refresh delay" but code may have been updated.  
**Is Mock:** ⚠️ COMMENT ONLY  
**Recommended Fix:** Remove or update comment if delay was removed.

---

### 🟢 LOW / FALSE POSITIVES (1 issue)

#### [25] File: `frontend-web/src/pages/admin/AdminDashboard.tsx`
**Lines:** 356  
**Snippet:**
```typescript
// Keep previous state on error - don't set mock data
```
**Severity:** LOW  
**Reason:** Comment explicitly states "don't set mock data" - this is good practice, not mock logic.  
**Is Mock:** ❌ NO (False Positive)  
**Recommended Fix:** None needed. Comment is documenting correct behavior.

---

## SUMMARY BY DIRECTORY

### `frontend-web/` Directory
**Status:** ✅ **CLEAN** (with minor comment residue)  
- All mock logic removed
- All localStorage database logic removed
- All setTimeout delays removed
- Only acceptable localStorage usage (auth tokens, UI preferences)

### `web/` Directory
**Status:** ❌ **CONTAINS MOCK LOGIC**  
- Multiple services use `simulateDelay()`
- localStorage used as database in multiple files
- Imports from `mockData.ts` files
- `adminData.ts` is entirely mock data generator
- `DroneMonitor.tsx` imports `mockDrones`
- `DroneTrackerMap.tsx` uses `generateMockDrones`
- `OrderContext.tsx` uses localStorage for orders
- `OrderCard.tsx` uses `mock_users` localStorage key

### `mobile/` Directory
**Status:** ❌ **CONTAINS MOCK LOGIC**  
- `src/api/mock.ts` is complete AxiosMockAdapter implementation
- `package.json` includes `axios-mock-adapter` dependency

### `frontend-mobile/` Directory
**Status:** ⚠️ **RESIDUE ONLY**  
- `src/api/mock.ts` has misleading name and comments but appears to use backend
- Should be renamed

### `mock-api/` Directory
**Status:** ❌ **ENTIRE MOCK API SERVER**  
- Complete mock API server using json-server pattern
- Should be deleted or clearly documented as dev-only

---

## RECOMMENDATIONS

### Immediate Actions Required:

1. **Delete `mock-api/` directory** (or document as dev-only)
2. **Delete `mobile/src/api/mock.ts`** and replace with real API client
3. **Delete `web/src/data/adminData.ts`** and replace with API calls
4. **Remove all `simulateDelay()` functions** from `web/src/services/`
5. **Remove all localStorage database logic** from `web/src/`
6. **Remove `axios-mock-adapter`** from `web/package.json` and `mobile/package.json`
7. **Replace all `mockData.ts` imports** with backend API calls
8. **Rename `frontend-mobile/src/api/mock.ts`** to `api.ts`

### Files Requiring Complete Rewrite:

- `web/src/services/menuService.ts`
- `web/src/services/restaurantService.ts`
- `web/src/services/menuManagementService.ts`
- `web/src/services/restaurantOrderService.ts`
- `web/src/context/OrderContext.tsx`
- `web/src/data/adminData.ts`
- `mobile/src/api/mock.ts`

---

## VERIFICATION CHECKLIST

- [ ] No `simulateDelay()` functions exist
- [ ] No localStorage used as database (orders, products, users, restaurants)
- [ ] No imports from `mockData.ts` files
- [ ] No `generateMock*` functions
- [ ] No `AxiosMockAdapter` usage
- [ ] No `mock-api/` directory (or documented as dev-only)
- [ ] All services use backend APIs
- [ ] All components fetch data from backend
- [ ] `axios-mock-adapter` removed from package.json files

---

**END OF REPORT**

