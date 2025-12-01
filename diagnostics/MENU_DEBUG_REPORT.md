# Menu Debug Report - Why Menu Page Does Not Show Products

**Report Date:** Current  
**Scope:** frontend-web + frontend-mobile  
**Issue:** Menu page not displaying products  
**Method:** Static code analysis

---

## A. BASE URL RESOLUTION

### A.1 getBackendUrl() Analysis

**File:** `frontend-mobile/src/api/getBackendUrl.ts`

**Fallback Chain:**
1. `process.env.API_BASE_URL` (if set)
2. `process.env.EXPO_PUBLIC_BACKEND_URL` (if set)
3. Expo Constants IP extraction (if `hostUri` available)
4. Config file `BASE_URL` (if valid)
5. **Hardcoded fallback:** `"http://192.168.0.101:8080/api"` ✅

**Status:** ✅ **FIXED** - Fallback ensures valid URL is always returned.

---

### A.2 axios.ts / apiClient.ts Analysis

#### **Web Frontend:**
**File:** `frontend-web/src/config/axios.ts`  
**Line:** 6-8

```typescript
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  "http://192.168.0.101:8080/api";
```

**Status:** ✅ **CORRECT** - Uses `192.168.0.101:8080/api`

#### **Mobile Frontend:**
**File:** `frontend-mobile/src/api/apiClient.ts`  
**Line:** 6

```typescript
const BASE_URL = getBackendUrl();
```

**Status:** ✅ **CORRECT** - Uses `getBackendUrl()` which has fallback to `192.168.0.101:8080/api`

---

### A.3 Fallback Behavior

| Environment | BASE_URL Resolution | Status |
|-------------|---------------------|--------|
| Web (env var set) | Uses `VITE_API_BASE_URL` | ✅ |
| Web (no env var) | Falls back to `192.168.0.101:8080/api` | ✅ |
| Mobile (env var set) | Uses `API_BASE_URL` or `EXPO_PUBLIC_BACKEND_URL` | ✅ |
| Mobile (Expo Constants) | Uses IP from `expoConfig.hostUri` | ✅ |
| Mobile (all fail) | Falls back to `192.168.0.101:8080/api` | ✅ |

**Status:** ✅ **CONSISTENT** - Both web and mobile resolve to same fallback IP.

---

### A.4 IP Consistency Between Mobile & Web

| Location | IP Address | Status |
|----------|------------|--------|
| Web fallback | `192.168.0.101:8080/api` | ✅ |
| Mobile fallback | `192.168.0.101:8080/api` | ✅ |
| Mobile hardcoded (Drone.tsx) | `192.168.0.100:8080/api` | ⚠️ **MISMATCH** |
| Mobile hardcoded (droneService.ts) | `192.168.0.100:8080/api` | ⚠️ **MISMATCH** |
| Mobile hardcoded (droneApi.ts) | `192.168.0.100:8080/api` | ⚠️ **MISMATCH** |
| Mobile hardcoded (syncVerification.ts) | `192.168.0.100:8080/api` | ⚠️ **MISMATCH** |
| Mobile config/axios.ts | `192.168.0.100:8080/api` | ⚠️ **MISMATCH** |

**Warning:** ⚠️ **IP MISMATCH DETECTED**
- Main API client uses: `192.168.0.101` ✅
- Some utility files use: `192.168.0.100` ⚠️
- **Impact:** Low (Menu.tsx uses correct apiClient, not these files)

---

### A.5 Vite Proxy Rewriting (frontend-web)

**File:** `frontend-web/vite.config.ts`  
**Lines:** 36-59

**Status:** ✅ **DISABLED** - `/api` proxy is commented out.

**Analysis:**
- Vite proxy for `/api` is disabled (commented out)
- Axios uses direct LAN IP: `http://192.168.0.101:8080/api`
- No proxy rewriting occurs
- **Result:** Requests go directly to backend ✅

---

## B. Menu.tsx LOGIC

### B.1 Web Menu.tsx Code Path

**File:** `frontend-web/src/pages/Menu.tsx`  
**Lines:** 208-227

**Code Flow:**
```typescript
const restaurantProducts = await getAvailableMenuByRestaurant(selectedRestaurant);
setItems(restaurantProducts);
```

**Analysis:**
1. Calls `getAvailableMenuByRestaurant(selectedRestaurant)` (line 213)
2. `getAvailableMenuByRestaurant` → `getProducts(restaurant)` → `apiClient.get('/products', { params: { restaurant } })`
3. Backend filters by restaurant parameter
4. Frontend filters `available: true` products
5. Sets items state

**Status:** ✅ **CORRECT** - Web filters by restaurant and availability.

---

### B.2 Mobile Menu.tsx Code Path

**File:** `frontend-mobile/src/screens/Menu.tsx`  
**Lines:** 12-47

**Code Flow:**
```typescript
const response = await apiClient.get('/products');
const products = Array.isArray(response.data) ? response.data : [];
const transformed = products.map(...);
setItems(transformed);
```

**Analysis:**
1. Calls `apiClient.get('/products')` (line 17) - **NO restaurant filter**
2. Gets ALL products from backend
3. Transforms to Dish format
4. Sets items state

**Status:** ⚠️ **POTENTIAL ISSUE** - Mobile doesn't filter by restaurant.

**Comparison:**
- **Web:** `GET /api/products?restaurant=SweetDreams` (filtered)
- **Mobile:** `GET /api/products` (all products)

**Impact:** 
- If backend has products from both restaurants, mobile shows all
- If backend has no products, mobile shows empty
- **This is NOT the root cause** if menu is completely empty

---

### B.3 Restaurant Name Matching

**Web Menu.tsx:**
- Uses `selectedRestaurant` from `RestaurantSelectionContext`
- Values: `"SweetDreams"` or `"Aloha"`
- Passed to `getAvailableMenuByRestaurant(selectedRestaurant)`
- Backend query: `?restaurant=SweetDreams` or `?restaurant=Aloha`

**Mobile Menu.tsx:**
- **NO restaurant filtering**
- Gets all products regardless of restaurant

**Backend ProductController:**
- Accepts `?restaurant` parameter (line 41)
- Filters by `restaurant` field (case-insensitive)

**Status:** ⚠️ **MOBILE DOESN'T FILTER BY RESTAURANT** - But this shouldn't cause empty menu if products exist.

---

### B.4 Filtering Analysis

**Web Filtering:**
1. Backend filter: `?restaurant=SweetDreams`
2. Frontend filter: `.filter(p => p.available)`

**Mobile Filtering:**
1. Backend filter: None (gets all products)
2. Frontend filter: None (shows all products)

**Question:** Does empty array come from API or frontend filter?

**Answer:** If Menu.tsx shows empty array, it's likely:
1. API returns empty array (no products in backend)
2. API call fails (network error, wrong URL)
3. API returns non-array data (unexpected format)

**Status:** Need to check API response.

---

## C. ISSUE DETECTION TABLE

| Issue Detected | Location | Severity | Fix |
|----------------|----------|----------|-----|
| Mobile doesn't filter by restaurant | `frontend-mobile/src/screens/Menu.tsx:17` | **MEDIUM** | Add restaurant filter parameter if needed |
| IP mismatch in utility files | `frontend-mobile/src/screens/Drone.tsx:9` | **LOW** | Update to `192.168.0.101` or use `apiClient` |
| IP mismatch in utility files | `frontend-mobile/src/services/droneService.ts:10` | **LOW** | Update to `192.168.0.101` or use `apiClient` |
| IP mismatch in utility files | `frontend-mobile/src/services/droneApi.ts:8` | **LOW** | Update to `192.168.0.101` or use `apiClient` |
| IP mismatch in utility files | `frontend-mobile/src/utils/syncVerification.ts:7` | **LOW** | Update to `192.168.0.101` or use `apiClient` |
| IP mismatch in unused config | `frontend-mobile/src/config/axios.ts:8` | **LOW** | Update to `192.168.0.101` (file not used by Menu.tsx) |
| No /api/categories endpoint | Backend | **INFO** | Categories extracted from products (expected behavior) |

---

## D. ROOT CAUSE ANALYSIS

### D.1 Most Likely Causes

1. **BASE_URL Resolution Failure (FIXED)**
   - ✅ **Status:** Fixed with hardcoded fallback
   - ✅ **Result:** BASE_URL always resolves to valid URL

2. **Network Error**
   - ⚠️ **Possible:** Backend not running on `192.168.0.101:8080`
   - ⚠️ **Possible:** CORS blocking requests
   - ⚠️ **Possible:** Firewall blocking port 8080

3. **Backend Returns Empty Array**
   - ⚠️ **Possible:** No products in database
   - ⚠️ **Possible:** Database not initialized

4. **API Response Format Mismatch**
   - ✅ **Unlikely:** Menu.tsx handles both array and non-array responses

---

## E. VERIFICATION CHECKLIST

- [x] BASE_URL resolves correctly (fallback in place)
- [x] apiClient.ts uses correct BASE_URL
- [x] Menu.tsx calls correct endpoint (`/products`)
- [x] Menu.tsx handles empty array gracefully
- [x] Menu.tsx handles errors gracefully
- [ ] Backend is running on `192.168.0.101:8080` (requires runtime check)
- [ ] Backend has products in database (requires runtime check)
- [ ] Network connectivity works (requires runtime check)

---

**Report Generated:** Current  
**Next Step:** Run API tests to verify backend connectivity

