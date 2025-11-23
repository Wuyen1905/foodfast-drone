# Mock Data & Bypass Code Scan Report

**Date:** 2025-11-23  
**Scope:** Entire repository (backend, web, frontend-mobile, frontend-web)  
**Purpose:** Identify all mock data, hardcoded arrays, fake scenario logic, and temporary bypass code

---

## 1. HARDCODED PRODUCTS ARRAY

### Finding 1.1
**File:** `web/src/data/products.ts`  
**Lines:** 15-139  
**Category:** Mock Data / Hardcoded Array

**Code Snippet:**
```typescript
export const products: Product[] = [
  // SweetDreams Bakery Products
  {
    id: "sd-001",
    name: "Bánh Donut",
    price: 25000,
    restaurant: "SweetDreams",
    // ... 9 more hardcoded products
  }
];
```

**Problem:** Hardcoded array of 10 products (5 SweetDreams, 5 Aloha) competing with backend API `/api/products`. Components import this directly instead of fetching from API.

**Impact on Real-time Sync:** Products displayed may be stale. Real-time product updates from backend won't reflect in components using this file. Product availability changes won't update in real-time.

**Used In:**
- `web/src/pages/Cart.tsx:137` - `const productMap = useMemo(() => Object.fromEntries(products.map(p => [p.id, p])), []);`
- `web/src/pages/Details.tsx:100` - `const product = products.find(p => p.id === id);`
- `web/src/pages/Menu.tsx:5` - `import { products, Product } from '../data/products';`
- `web/src/pages/Home.tsx:5` - `import { products, Product } from '../data/products';`

---

## 2. HARDCODED RESTAURANTS ARRAY

### Finding 2.1
**File:** `web/src/pages/admin/AdminRestaurants.tsx`  
**Lines:** 130-179  
**Category:** Mock Data / Hardcoded Array

**Code Snippet:**
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
    name: 'Pizza Palace', // ⚠️ This restaurant doesn't exist in backend data.sql
    // ... hardcoded data
  }
]);
```

**Problem:** Initial state contains hardcoded restaurant array including fake "Pizza Palace" (rest_3) that doesn't exist in backend `data.sql`. Should fetch from `/api/restaurants` or `/api/admin/restaurants`.

**Impact on Real-time Sync:** Admin sees incorrect restaurant list on initial load. Real-time restaurant updates won't reflect until manual refresh.

---

## 3. ADMIN AUTHENTICATION BYPASS (CRITICAL)

### Finding 3.1
**File:** `web/src/context/AdminAuthContext.tsx`  
**Lines:** 33-46  
**Category:** Bypass / Security Risk

**Code Snippet:**
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

**Problem:** **CRITICAL SECURITY RISK** - Hardcoded admin credentials bypass backend authentication entirely. Credentials visible in client-side code. No backend validation.

**Impact on Real-time Sync:** Admin actions not tracked by backend. Real-time admin notifications won't work correctly (backend doesn't know admin is logged in). Security audit trail broken.

---

### Finding 3.2
**File:** `web/src/pages/admin/AdminLogin.tsx`  
**Lines:** 195-200  
**Category:** Bypass / Security Risk

**Code Snippet:**
```typescript
<CredentialsBox>
  <CredentialsTitle>🔐 Tài khoản Admin:</CredentialsTitle>
  <CredentialsList>
    <div><strong>Admin:</strong> admin / admin123</div>
  </CredentialsList>
</CredentialsBox>
```

**Problem:** Admin credentials displayed directly in UI. Security risk if visible in production.

**Impact on Real-time Sync:** Minor - doesn't directly affect sync, but security risk could allow unauthorized access.

---

## 4. MOCK ACTIVITY TIMELINE

### Finding 4.1
**File:** `web/src/components/admin/DroneDetailModal.tsx`  
**Lines:** 254-271  
**Category:** Mock Data / Fabricated Data

**Code Snippet:**
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

**Problem:** Activity timeline is mocked/fabricated from existing drone fields, not from actual event log API.

**Impact on Real-time Sync:** Shows fake activity history. Real-time activity updates from backend won't reflect here.

---

## 5. MOCK SCENARIO SERVICE

### Finding 5.1
**File:** `web/src/services/scenarioService.ts`  
**Lines:** 155-172  
**Category:** Mock Data / No Backend Call

**Code Snippet:**
```typescript
export const addScenario = async (scenario: Omit<Scenario, 'id' | 'timestamp' | 'resolved'>): Promise<boolean> => {
  try {
    const newScenario: Scenario = {
      ...scenario,
      id: `scenario_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      resolved: false
    };

    // In a real system, this would POST to API
    // For mock API, we'll simulate it
    console.log('[scenarioService] Scenario added:', newScenario);
    return true;
  } catch (error) {
    console.error('[scenarioService] Error adding scenario:', error);
    return false;
  }
};
```

**Problem:** Scenario creation is mocked - no actual API call to backend. Only logs to console.

**Impact on Real-time Sync:** Scenarios not persisted in backend. Real-time scenario notifications won't work. Admin scenario management broken.

---

### Finding 5.2
**File:** `web/src/services/scenarioService.ts`  
**Lines:** 177-186  
**Category:** Mock Data / No Backend Call

**Code Snippet:**
```typescript
export const resolveScenario = async (scenarioId: string): Promise<boolean> => {
  try {
    // In a real system, this would PATCH to API
    console.log(`[scenarioService] Scenario ${scenarioId} resolved.`);
    return true;
  } catch (error) {
    console.error(`[scenarioService] Error resolving scenario ${scenarioId}:`, error);
    return false;
  }
};
```

**Problem:** Scenario resolution is mocked - no actual API call. Only logs to console.

**Impact on Real-time Sync:** Scenario status changes not persisted. Real-time updates won't reflect.

---

## 6. MOCK DRONE REALTIME DATA

### Finding 6.1
**File:** `web/src/services/droneRealtimeService.ts`  
**Lines:** 111-113  
**Category:** Mock Data / Calculated Data

**Code Snippet:**
```typescript
// Calculate ETA if delivering
let eta: number | undefined = undefined;
if (drone.status === 'delivering' && drone.orderId) {
  // Mock ETA calculation (in minutes)
  eta = Math.floor(5 + Math.random() * 15); // 5-20 minutes
}
```

**Problem:** ETA is randomly generated instead of calculated from real GPS/route data from backend.

**Impact on Real-time Sync:** Shows inaccurate delivery times. Real-time ETA updates from backend won't work. Restaurant/customer see wrong delivery estimates.

---

### Finding 6.2
**File:** `web/src/services/droneRealtimeService.ts`  
**Lines:** 79-89  
**Category:** Mock Data / Simulated Data

**Code Snippet:**
```typescript
// Calculate speed (convert from m/s to km/h if speedMps exists, or mock)
let speed = drone.speed || 0;
if (drone.speedMps && !speed) {
  speed = drone.speedMps * 3.6;
} else if (!speed && drone.status === 'delivering') {
  // Simulate speed based on delivery progress
  speed = 15 + Math.random() * 10; // 15-25 km/h
}
```

**Problem:** Speed is simulated with random numbers when not available from backend.

**Impact on Real-time Sync:** Shows inaccurate drone speeds. Real-time speed updates from backend GPS won't reflect.

---

## 7. MOCK NOTIFICATION SERVICE

### Finding 7.1
**File:** `web/src/services/restaurantNotificationService.ts`  
**Lines:** 15-63  
**Category:** Mock Data / No Backend Call

**Code Snippet:**
```typescript
/**
 * Notify restaurant about a new order
 * This function simulates sending a notification to the restaurant
 * In a real application, this would call an API endpoint or use WebSockets
 */
export const notifyRestaurant = async (order: Order): Promise<boolean> => {
  try {
    // ... normalization logic ...
    
    // Send notification to backend API
    try {
      // Backend automatically creates notifications when orders are created
      // This function is kept for backward compatibility and custom events
      const notification = {
        orderId: order.id,
        restaurantId: restaurantId,
        // ... notification object
      };

      // Trigger a custom event for real-time updates (if restaurant dashboard is open)
      window.dispatchEvent(new CustomEvent('newOrderNotification', {
        detail: notification
      }));

      console.log(`✅ Restaurant notification sent: ${restaurantId}`, notification);
      return true;
    } catch (error) {
      // ... error handling
    }
  }
};
```

**Problem:** Notification function doesn't actually call backend API. Only dispatches custom browser event and logs to console.

**Impact on Real-time Sync:** Restaurant owners won't receive real-time notifications when orders are created. Breaks restaurant real-time alerts. Relies on WebSocket only (no backup notification mechanism).

---

## 8. ADMIN SERVICE PLACEHOLDERS (NO BACKEND CALLS)

### Finding 8.1
**File:** `web/src/services/adminService.ts`  
**Lines:** 224-233  
**Category:** Mock Data / No Backend Call

**Code Snippet:**
```typescript
// Get system logs (placeholder - backend endpoint may not exist yet)
export const getSystemLogs = async (): Promise<any[]> => {
  try {
    // TODO: Implement backend endpoint for system logs
    return [];
  } catch (error) {
    console.error('Failed to get system logs:', error);
    return [];
  }
};
```

**Problem:** System logs endpoint doesn't exist. Function returns empty array without calling backend.

**Impact on Real-time Sync:** Admin dashboard logs section always empty. System events not logged or displayed.

---

### Finding 8.2
**File:** `web/src/services/adminService.ts`  
**Lines:** 235-249  
**Category:** Mock Data / No Backend Call

**Code Snippet:**
```typescript
// Perform emergency override (placeholder - backend endpoint may not exist yet)
export const performEmergencyOverride = async (
  targetType: 'order' | 'restaurant' | 'drone',
  targetId: string,
  action: string
): Promise<boolean> => {
  try {
    // TODO: Implement backend endpoint for emergency override
    console.log('Emergency override:', { targetType, targetId, action });
    return true;
  } catch (error) {
    console.error('Failed to perform emergency override:', error);
    return false;
  }
};
```

**Problem:** Emergency override doesn't call backend. Only logs to console and returns true.

**Impact on Real-time Sync:** Emergency actions not actually performed. Real-time emergency notifications won't work. Admin emergency controls are non-functional.

---

## 9. DRONE MANAGER MOCK LOGIC

### Finding 9.1
**File:** `web/src/services/droneManager.ts`  
**Lines:** 100-110  
**Category:** Mock Data / Development Fallback

**Code Snippet:**
```typescript
export const updateDroneStatus = async (
  id: string,
  partial: Partial<Drone>
): Promise<boolean> => {
  try {
    // In a real system, this would be a PATCH request
    // For mock API, we'll simulate it
    const response = await api.patch(`/drones/${id}`, partial);
    return response.status === 200;
  } catch (error) {
    console.error(`[droneManager] Error updating drone ${id}:`, error);
    // In development, simulate success
    console.log(`[droneManager] Simulated update for drone ${id}:`, partial);
    return true; // ⚠️ Returns true even on error in development
  }
};
```

**Problem:** Returns `true` even when API call fails (development fallback). Comment mentions "simulate" but actually calls API, then simulates success on error.

**Impact on Real-time Sync:** Drone status updates may appear successful but aren't persisted. Real-time status changes won't broadcast to other clients.

---

## 10. MISSING BACKEND ENDPOINTS

### Finding 10.1
**File:** `web/src/services/scenarioService.ts`  
**Lines:** 33-40  
**Category:** Inconsistency / Missing Endpoint

**Code Snippet:**
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

**Problem:** Frontend calls `/scenarios` endpoint that doesn't exist in backend. No `ScenarioController` found.

**Impact on Real-time Sync:** Scenarios feature doesn't work. Silent failure (returns empty array). No error visible to user.

---

### Finding 10.2
**File:** `web/src/data/adminData.ts`  
**Lines:** 118-127  
**Category:** Inconsistency / Missing Endpoint

**Code Snippet:**
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

**Problem:** System logs endpoint missing. Function always returns empty array.

**Impact on Real-time Sync:** Admin cannot see system logs. Real-time system events not displayed.

---

### Finding 10.3
**File:** `web/src/data/adminData.ts`  
**Lines:** 40, 83  
**Category:** Inconsistency / Missing Endpoint

**Code Snippet:**
```typescript
api.get('/auth/users')
```

**Problem:** Frontend calls `/auth/users` endpoint that may not exist. `AuthController` only has `/auth/login` and `/auth/register`.

**Impact on Real-time Sync:** Admin customer list will be empty. Cannot manage customers in real-time.

---

## 11. OUTDATED MOCK REFERENCES (DEAD CODE)

### Finding 11.1
**Files:** Multiple  
**Lines:** Various  
**Category:** Dead Code / Outdated Comments

**Found in:**
- `web/src/components/restaurant/RestaurantAnalytics.tsx:288` - "TODO: Backend integration in Phase 2 - removed all hardcoded mock data"
- `web/src/components/admin/DroneMonitor.tsx:33,511,667,759` - "TODO: Backend integration in Phase 2 - removed mockDrones import/fallback"
- `web/src/pages/Login.tsx:4` - "TODO: Backend integration in Phase 2 - removed mockData import"
- `web/src/context/AuthContext.tsx:162` - "TODO: Backend integration in Phase 2 - removed USERS mock data"
- `web/src/pages/admin/AdminDashboard.tsx:393` - "TODO: Backend integration in Phase 2 - removed fallback to mock data"
- `web/src/pages/admin/AdminControlPanel.tsx:4` - "TODO: Backend integration in Phase 2 - removed mockData import"

**Problem:** Outdated TODO comments referencing removed mock data. Code clutter and confusing for developers.

**Impact on Real-time Sync:** No runtime impact, but clutters codebase.

---

## 12. FRONTEND MOBILE MOCK API FILE

### Finding 12.1
**File:** `frontend-mobile/src/api/mock.ts`  
**Lines:** 1-21  
**Category:** Mock Data / Outdated Comments

**Code Snippet:**
```typescript
// [Data Sync] Use shared mock API server instead of AxiosMockAdapter
// For mobile devices, you may need to use your computer's IP address instead of localhost
// Example: 'http://192.168.1.100:5000' (replace with your actual IP)
const API_BASE_URL = __DEV__ 
  ? 'http://192.168.0.100:8080/api'  // For iOS Simulator / Android Emulator
  : 'http://192.168.0.100:8080/api';  // For physical devices, replace with your computer's IP

export const api = axios.create({ 
  baseURL: API_BASE_URL,
  // ...
});

// [Data Sync] Note: Removed AxiosMockAdapter - now using backend API
// All requests now go to http://192.168.0.100:8080/api which is the same API used by web frontend
```

**Problem:** File name suggests mock, but actually contains real API configuration. Outdated comments reference removed mock API server.

**Impact on Real-time Sync:** No runtime impact (config is correct), but misleading file name.

---

## 13. SIMULATION FUNCTIONS

### Finding 13.1
**File:** `web/src/services/vnpay.ts`  
**Lines:** 246-261  
**Category:** Mock Data / Development Function

**Code Snippet:**
```typescript
/**
 * Simulate VNPay payment response (for development/testing)
 * In production, this would redirect to actual VNPay URL
 */
export const simulateVNPayPayment = (): Promise<{
  success: boolean;
  transactionId?: string;
  message: string;
}> => {
  // Backend integration complete - removed setTimeout delay
  // In real implementation, this would redirect to VNPay payment gateway
  return Promise.resolve({
    success: true,
    transactionId: `VNPAY${Date.now()}`,
    message: 'Thanh toán thành công qua VNPay'
  });
};
```

**Problem:** Simulation function for VNPay payment that returns mock success. Should only be used in test environment.

**Impact on Real-time Sync:** If used in production, payments won't actually process. Order status won't update correctly.

---

## 14. PRODUCT DATA USAGE IN PAGES

### Finding 14.1
**Files:** Multiple pages import hardcoded products array  
**Category:** Mock Data / Hardcoded Array Usage

**Found in:**
- `web/src/pages/Cart.tsx:137` - Uses `products` array for product map
- `web/src/pages/Details.tsx:100` - Uses `products.find()` instead of API call
- `web/src/pages/Menu.tsx:5` - Imports `products` array
- `web/src/pages/Home.tsx:5` - Imports `products` array

**Problem:** Pages import and use hardcoded products array instead of fetching from `/api/products` endpoint.

**Impact on Real-time Sync:** Products displayed are stale. Product availability, prices, or new products won't update in real-time. Menu changes from backend won't reflect in UI.

---

## SUMMARY BY CATEGORY

### Mock Data (7 findings):
1. ✅ `web/src/data/products.ts` - Hardcoded products array (10 products)
2. ✅ `web/src/pages/admin/AdminRestaurants.tsx` - Hardcoded restaurants array (including fake "Pizza Palace")
3. ✅ `web/src/components/admin/DroneDetailModal.tsx` - Mock activity timeline
4. ✅ `web/src/services/droneRealtimeService.ts` - Mock ETA calculation (random numbers)
5. ✅ `web/src/services/droneRealtimeService.ts` - Simulated speed calculation
6. ✅ `web/src/services/vnpay.ts` - Simulate VNPay payment function
7. ✅ Multiple pages import hardcoded `products` array instead of API

### Bypass / Security (2 findings):
8. ✅ `web/src/context/AdminAuthContext.tsx` - **CRITICAL:** Hardcoded admin credentials (`admin`/`admin123`)
9. ✅ `web/src/pages/admin/AdminLogin.tsx` - Admin credentials displayed in UI

### No Backend Call (5 findings):
10. ✅ `web/src/services/scenarioService.ts` - `addScenario()` only logs, no API call
11. ✅ `web/src/services/scenarioService.ts` - `resolveScenario()` only logs, no API call
12. ✅ `web/src/services/restaurantNotificationService.ts` - `notifyRestaurant()` only dispatches event, no API call
13. ✅ `web/src/services/adminService.ts` - `getSystemLogs()` returns empty array, no API call
14. ✅ `web/src/services/adminService.ts` - `performEmergencyOverride()` only logs, no API call

### Inconsistency / Missing Endpoints (3 findings):
15. ✅ `web/src/services/scenarioService.ts` - Calls `/scenarios` endpoint that doesn't exist
16. ✅ `web/src/data/adminData.ts` - System logs endpoint missing
17. ✅ `web/src/data/adminData.ts` - `/auth/users` endpoint may not exist

### Dead Code / Outdated Comments (1 finding):
18. ✅ Multiple files - Outdated TODO comments referencing removed mock data (6+ files)

### Development Fallback (1 finding):
19. ✅ `web/src/services/droneManager.ts` - Returns `true` on API error (simulation mode)

### File Naming (1 finding):
20. ✅ `frontend-mobile/src/api/mock.ts` - File named "mock" but contains real API config

---

## REAL-TIME SYNC IMPACT SUMMARY

### Critical Impact (Blocks Real-time Sync):
1. ❌ **Admin Authentication Bypass** - Backend doesn't track admin actions
2. ❌ **Notification Service Mock** - Restaurant alerts don't actually notify backend
3. ❌ **Hardcoded Products** - Stale product data not updated in real-time
4. ❌ **Scenario Service Mock** - Scenario management completely non-functional

### Medium Impact (Partially Blocks Real-time Sync):
5. ⚠️ **Mock ETA Calculation** - Shows inaccurate delivery times
6. ⚠️ **Mock Speed Calculation** - Shows inaccurate drone speeds
7. ⚠️ **Hardcoded Restaurants** - Wrong restaurant list on initial load
8. ⚠️ **Missing Endpoints** - Silent failures, features don't work

### Low Impact (Doesn't Block Sync):
9. ℹ️ **Mock Activity Timeline** - UI display only
10. ℹ️ **Outdated Comments** - Code clutter only
11. ℹ️ **Development Fallbacks** - May cause confusion

---

## TOTAL FINDINGS: 20

- **Mock Data:** 7 findings
- **Bypass / Security:** 2 findings (1 CRITICAL)
- **No Backend Call:** 5 findings
- **Inconsistency:** 3 findings
- **Dead Code:** 1 finding
- **Development Fallback:** 1 finding
- **File Naming:** 1 finding

---

**Report Generated:** 2025-11-23  
**No Code Modifications Made** - Analysis Only
