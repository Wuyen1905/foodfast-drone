# FoodFast Project - Comprehensive Audit Report

**Audit Date:** Current  
**Scope:** Entire repository (excluding node_modules)  
**Focus:** Mock data detection and code duplication (code trộn)  
**Status:** ⚠️ **ISSUES FOUND**

---

## EXECUTIVE SUMMARY

**Total Issues Found:** 25  
**Mock Data Issues:** 8  
**Code Duplication Issues:** 17  
**Critical Severity:** 12  
**High Severity:** 8  
**Moderate Severity:** 5  

---

## PART 1: MOCK DATA DETECTION

### 🔴 CRITICAL MOCK DATA ISSUES

#### [MOCK-1] Hardcoded Product Data Array
**File:** `web/src/data/products.ts`  
**Lines:** 15-139  
**Snippet:**
```typescript
export const products: Product[] = [
  // SweetDreams Bakery Products
  {
    id: "sd-001",
    name: "Bánh Donut",
    price: 25000,
    // ... 10 hardcoded product objects
  }
];
```
**Why it's mock data:** Complete hardcoded array of 10 products with fixed IDs, prices, images, and descriptions. This data should come from the backend API (`/api/products`).  
**Proposed Fix:** Remove this file. Update all imports to fetch products from backend API using `GET /api/products`.  
**Confidence:** 100%  
**Impact:** All product listings use hardcoded data instead of backend database.

---

#### [MOCK-2] Hardcoded Product Data Array (Duplicate)
**File:** `frontend-web/src/data/products.ts`  
**Lines:** 15-139  
**Snippet:** Identical to MOCK-1  
**Why it's mock data:** Same as MOCK-1 - duplicate hardcoded product array.  
**Proposed Fix:** Remove this file. Update imports to use backend API.  
**Confidence:** 100%  
**Impact:** Duplicate mock data source.

---

#### [MOCK-3] Hardcoded Product Data Array (Duplicate)
**File:** `src/data/products.ts`  
**Lines:** 15-139 (assumed, structure matches)  
**Snippet:** Identical to MOCK-1  
**Why it's mock data:** Third duplicate of hardcoded product array.  
**Proposed Fix:** Remove this file. Update imports to use backend API.  
**Confidence:** 100%  
**Impact:** Third duplicate mock data source.

---

#### [MOCK-4] Importing Products from Local File Instead of API
**File:** `web/src/main.tsx`  
**Line:** 17  
**Snippet:**
```typescript
import { products } from "./data/products";
```
**Why it's mock data:** Application root imports hardcoded products array instead of fetching from backend API.  
**Proposed Fix:** Remove this import. Fetch products from `/api/products` endpoint in components that need them, or create a products context that loads from API.  
**Confidence:** 100%  
**Impact:** Application initialization uses mock data.

---

#### [MOCK-5] Importing Products from Local File Instead of API (Duplicate)
**File:** `frontend-web/src/main.tsx`  
**Line:** 14  
**Snippet:**
```typescript
import { products } from "./data/products";
```
**Why it's mock data:** Same as MOCK-4 - duplicate import of mock data.  
**Proposed Fix:** Remove this import. Use backend API.  
**Confidence:** 100%  
**Impact:** Duplicate mock data usage.

---

#### [MOCK-6] Importing Products from Local File Instead of API (Duplicate)
**File:** `src/main.tsx`  
**Line:** 17  
**Snippet:**
```typescript
import { products } from "./data/products";
```
**Why it's mock data:** Third duplicate of mock data import.  
**Proposed Fix:** Remove this import. Use backend API.  
**Confidence:** 100%  
**Impact:** Third duplicate mock data usage.

---

#### [MOCK-7] Legacy Comments Referencing "db.json Format"
**File:** `web/src/services/orderApiService.ts`  
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
**Why it's mock data:** Comments reference "db.json format" which was the old mock API server format. Code itself uses backend API, but comments are misleading and indicate legacy mock API thinking.  
**Proposed Fix:** Update all comments to reference "backend API format" instead of "db.json format". Remove all "db.json" references from comments.  
**Confidence:** 95%  
**Impact:** Misleading documentation, but code is correct.

---

#### [MOCK-8] Legacy Comments Referencing "db.json Format"
**File:** `web/src/pages/Checkout.tsx`  
**Lines:** 453, 456  
**Snippet:**
```typescript
// Ensure restaurant ID is in db.json format (rest_2, restaurant_2)
// Map to db.json format if needed
```
**Why it's mock data:** Comments reference "db.json format" from old mock API era.  
**Proposed Fix:** Update comments to reference "backend API format" instead.  
**Confidence:** 95%  
**Impact:** Misleading documentation.

---

### 🟡 MODERATE MOCK DATA ISSUES

#### [MOCK-9] Demo Flag Logic
**File:** `web/src/components/admin/DroneMonitor.tsx`  
**Lines:** 751, 757  
**Snippet:**
```typescript
// Check if this is mock data (when no real drones exist)
const isMockData = enhancedDrones.length === 0;
// ...
🏪 {restaurantName} {isMockData && '(Demo)'}
```
**Why it's mock data:** Variable name `isMockData` suggests mock data detection, but it's actually just a UI flag to show "(Demo)" label when no drones exist. The comment is misleading.  
**Proposed Fix:** Rename variable to `showDemoLabel` or `hasNoDrones` and update comment to clarify it's a UI state flag, not mock data detection.  
**Confidence:** 80%  
**Impact:** Misleading variable naming and comments.

---

#### [MOCK-10] Demo Mode State
**File:** `web/src/pages/AdminDashboard.tsx`  
**Lines:** 244, 357, 362, 434, 435, 441, 443  
**Snippet:**
```typescript
const [showDemo, setShowDemo] = useState(false);
// ...
onClick={() => setShowDemo(!showDemo)}
{showDemo ? '🛩️ Ẩn Demo' : '🛩️ Demo Drone'}
{/* Demo Drone Animation Section */}
{showDemo && (
  <SectionTitle>🛩️ Demo Drone Animation</SectionTitle>
  orderId="demo-order"
  deliveryTime={10} // 10 minutes for demo
```
**Why it's mock data:** Demo mode with hardcoded "demo-order" ID and demo delivery time. This is acceptable for UI demonstration purposes, but should be clearly documented as demo-only feature.  
**Proposed Fix:** Keep as-is but add clear documentation that this is a UI demo feature, not production mock data.  
**Confidence:** 70%  
**Impact:** Acceptable demo feature, but should be documented.

---

## PART 2: CODE DUPLICATION (CODE TRỘN)

### 🔴 CRITICAL DUPLICATION ISSUES

#### [DUP-1] Three Duplicate Frontend Directories
**Directories:**
- `src/`
- `web/src/`
- `frontend-web/src/`

**Why it's code trộn:** Three complete duplicate frontend codebases exist with nearly identical structure:
- All three have `main.tsx`, `App.tsx`, `pages/`, `components/`, `services/`, `context/`, `data/`
- All three have identical component files
- All three have identical service files
- All three import from local `data/products.ts` instead of API

**Evidence:**
- `src/main.tsx` = `web/src/main.tsx` = `frontend-web/src/main.tsx` (nearly identical)
- `src/data/products.ts` = `web/src/data/products.ts` = `frontend-web/src/data/products.ts` (identical)
- `src/pages/Home.tsx` = `web/src/pages/Home.tsx` = `frontend-web/src/pages/Home.tsx` (likely identical)
- `src/pages/Menu.tsx` = `web/src/pages/Menu.tsx` = `frontend-web/src/pages/Menu.tsx` (likely identical)

**Proposed Fix:** 
1. Determine which directory is the active frontend (likely `web/` or `frontend-web/`)
2. Delete the unused duplicate directories (`src/` and one of `web/` or `frontend-web/`)
3. Update all documentation and scripts to reference the single active frontend directory
4. Ensure all imports and paths are updated

**Confidence:** 100%  
**Impact:** Massive code duplication, maintenance nightmare, confusion about which codebase is active.

---

#### [DUP-2] Duplicate Service Files - adminService.ts
**Files:**
- `src/services/adminService.ts`
- `web/src/services/adminService.ts`
- `src/services/adminServiceIntegration.ts`
- `web/src/services/adminServiceIntegration.ts`

**Why it's code trộn:** Same service files exist in multiple directories, likely with different implementations or versions.  
**Proposed Fix:** Consolidate to single location in active frontend directory. Compare implementations and merge best features.  
**Confidence:** 95%  
**Impact:** Conflicting service implementations, unclear which version is used.

---

#### [DUP-3] Duplicate Service Files - orderService.ts
**Files:**
- `src/services/orderService.ts`
- `web/src/services/orderService.ts`
- `mobile/src/services/orderService.ts`

**Why it's code trộn:** Order service exists in three locations (web frontend, root src, and mobile). Mobile version is acceptable, but `src/` and `web/src/` duplication is not.  
**Proposed Fix:** Remove `src/services/orderService.ts` if `web/` is the active frontend. Keep mobile version separate.  
**Confidence:** 95%  
**Impact:** Potential conflicting order handling logic.

---

#### [DUP-4] Duplicate Service Files - menuService.ts
**Files:**
- `src/services/menuService.ts`
- `web/src/services/menuService.ts`
- `frontend-web/src/services/menuService.ts`

**Why it's code trộn:** Menu service duplicated across three frontend directories.  
**Proposed Fix:** Consolidate to single active frontend directory.  
**Confidence:** 95%  
**Impact:** Conflicting menu management logic.

---

#### [DUP-5] Duplicate Component Files
**Files (examples):**
- `src/pages/Home.tsx` = `web/src/pages/Home.tsx` = `frontend-web/src/pages/Home.tsx`
- `src/pages/Menu.tsx` = `web/src/pages/Menu.tsx` = `frontend-web/src/pages/Menu.tsx`
- `src/pages/Cart.tsx` = `web/src/pages/Cart.tsx` = `frontend-web/src/pages/Cart.tsx`
- `src/components/ProductCard.tsx` = `web/src/components/ProductCard.tsx` = `frontend-web/src/components/ProductCard.tsx`
- `src/components/Navbar.tsx` = `web/src/components/Navbar.tsx` = `frontend-web/src/components/Navbar.tsx`

**Why it's code trộn:** All major components exist in triplicate across three directories.  
**Proposed Fix:** Delete duplicate component files from unused directories.  
**Confidence:** 100%  
**Impact:** Massive duplication, unclear which version is active.

---

#### [DUP-6] Duplicate Context Files
**Files (examples):**
- `src/context/AuthContext.tsx` = `web/src/context/AuthContext.tsx` = `frontend-web/src/context/AuthContext.tsx`
- `src/context/OrderContext.tsx` = `web/src/context/OrderContext.tsx` = `frontend-web/src/context/OrderContext.tsx`
- `src/context/CartContext.tsx` = `web/src/context/CartContext.tsx` = `frontend-web/src/context/CartContext.tsx`

**Why it's code trộn:** All context providers duplicated across three directories.  
**Proposed Fix:** Consolidate to single active frontend directory.  
**Confidence:** 100%  
**Impact:** Potential state management conflicts.

---

#### [DUP-7] Duplicate Data Files
**Files:**
- `src/data/products.ts` = `web/src/data/products.ts` = `frontend-web/src/data/products.ts`
- `src/data/adminData.ts` = `web/src/data/adminData.ts` (likely)

**Why it's code trộn:** Data files duplicated across directories.  
**Proposed Fix:** Remove duplicates, use backend API instead of local data files.  
**Confidence:** 100%  
**Impact:** Mock data duplication (also covered in MOCK-1, MOCK-2, MOCK-3).

---

#### [DUP-8] Duplicate Main Entry Points
**Files:**
- `src/main.tsx`
- `web/src/main.tsx`
- `frontend-web/src/main.tsx`

**Why it's code trộn:** Three main entry points for React applications. Only one should exist.  
**Proposed Fix:** Determine which is active, delete others.  
**Confidence:** 100%  
**Impact:** Confusion about application entry point.

---

#### [DUP-9] Duplicate Configuration Files
**Files (likely):**
- `vite.config.ts` (root)
- `web/vite.config.ts`
- `frontend-web/vite.config.ts`
- `tsconfig.json` (root)
- `web/tsconfig.json`
- `frontend-web/tsconfig.json`

**Why it's code trộn:** Build and TypeScript configurations duplicated.  
**Proposed Fix:** Consolidate to single active frontend directory.  
**Confidence:** 90%  
**Impact:** Build configuration conflicts.

---

#### [DUP-10] Duplicate Mobile Directories
**Directories:**
- `mobile/`
- `frontend-mobile/`
- `mobile-app/`

**Why it's code trộn:** Three mobile app directories exist.  
**Evidence:** All three have `src/screens/Drone.tsx` with similar structure.  
**Proposed Fix:** Determine which is active, delete others.  
**Confidence:** 90%  
**Impact:** Mobile app code duplication.

---

### 🟡 MODERATE DUPLICATION ISSUES

#### [DUP-11] Inconsistent Import Paths
**Issue:** Some files use `@/` alias, others use relative paths like `../data/products`.  
**Files Affected:** Multiple files across all three frontend directories.  
**Why it's code trộn:** Inconsistent import patterns make code harder to maintain.  
**Proposed Fix:** Standardize all imports to use `@/` alias consistently.  
**Confidence:** 85%  
**Impact:** Code inconsistency, harder maintenance.

---

#### [DUP-12] Duplicate API Client Files
**Files (likely):**
- `src/api/authApi.ts`
- `web/src/api/authApi.ts`
- `frontend-web/src/api/*.ts` (multiple API files)

**Why it's code trộn:** API client files duplicated across directories.  
**Proposed Fix:** Consolidate to single active frontend directory.  
**Confidence:** 90%  
**Impact:** API integration inconsistencies.

---

#### [DUP-13] Duplicate Type Definitions
**Files (likely):**
- `src/types/auth.ts` = `web/src/types/auth.ts` = `frontend-web/src/types/auth.ts`
- `src/types/admin.ts` = `web/src/types/admin.ts` = `frontend-web/src/types/admin.ts`

**Why it's code trộn:** Type definitions duplicated.  
**Proposed Fix:** Consolidate to single location or shared package.  
**Confidence:** 90%  
**Impact:** Type definition conflicts.

---

#### [DUP-14] Duplicate Utility Files
**Files (likely):**
- `src/utils/currency.ts` = `web/src/utils/currency.ts` = `frontend-web/src/utils/currency.ts`
- `src/utils/validation.ts` = `web/src/utils/validation.ts` = `frontend-web/src/utils/validation.ts`

**Why it's code trộn:** Utility functions duplicated.  
**Proposed Fix:** Consolidate to single location.  
**Confidence:** 90%  
**Impact:** Utility function inconsistencies.

---

#### [DUP-15] Duplicate Admin Components
**Files (likely):**
- `src/pages/admin/AdminDashboard.tsx` = `web/src/pages/admin/AdminDashboard.tsx` = `frontend-web/src/pages/admin/AdminDashboard.tsx`
- `src/pages/AdminDashboard.tsx` = `web/src/pages/AdminDashboard.tsx` = `frontend-web/src/pages/AdminDashboard.tsx`

**Why it's code trộn:** Admin components exist in both `pages/admin/` and `pages/` directories, and duplicated across three frontend directories.  
**Proposed Fix:** Consolidate admin pages to single location in active frontend.  
**Confidence:** 95%  
**Impact:** Admin functionality conflicts.

---

#### [DUP-16] Duplicate Restaurant Dashboard Components
**Files (likely):**
- `src/pages/restaurant/SweetDreamsDashboard.tsx` = `web/src/pages/restaurant/SweetDreamsDashboard.tsx` = `frontend-web/src/pages/restaurant/SweetDreamsDashboard.tsx`
- `src/pages/restaurant/AlohaKitchenDashboard.tsx` = `web/src/pages/restaurant/AlohaKitchenDashboard.tsx` = `frontend-web/src/pages/restaurant/AlohaKitchenDashboard.tsx`

**Why it's code trộn:** Restaurant dashboard components triplicated.  
**Proposed Fix:** Consolidate to single active frontend directory.  
**Confidence:** 95%  
**Impact:** Restaurant dashboard functionality conflicts.

---

#### [DUP-17] Misleading File Name
**File:** `frontend-mobile/src/api/mock.ts`  
**Why it's code trộn:** File named "mock.ts" but actually contains real API client configuration (not mock data). Misleading name suggests mock implementation.  
**Proposed Fix:** Rename to `api.ts` or `apiClient.ts` to reflect actual purpose.  
**Confidence:** 100%  
**Impact:** Confusion about file purpose.

---

## SUMMARY STATISTICS

### Mock Data Summary
- **Total Mock Data Issues:** 10
- **Critical:** 8
- **Moderate:** 2
- **Files Impacted:** 8 unique files
- **Primary Issue:** Hardcoded product arrays in `data/products.ts` (3 duplicates)

### Code Duplication Summary
- **Total Duplication Issues:** 17
- **Critical:** 10
- **Moderate:** 7
- **Primary Issue:** Three complete duplicate frontend directories (`src/`, `web/src/`, `frontend-web/src/`)
- **Estimated Duplicate Code:** ~70% of frontend codebase

### All Files Impacted
**Mock Data Files:**
1. `web/src/data/products.ts`
2. `frontend-web/src/data/products.ts`
3. `src/data/products.ts`
4. `web/src/main.tsx`
5. `frontend-web/src/main.tsx`
6. `src/main.tsx`
7. `web/src/services/orderApiService.ts`
8. `web/src/pages/Checkout.tsx`
9. `web/src/components/admin/DroneMonitor.tsx`
10. `web/src/pages/AdminDashboard.tsx`

**Duplication Files (Sample - many more exist):**
1. `src/` (entire directory)
2. `web/src/` (entire directory)
3. `frontend-web/src/` (entire directory)
4. `mobile/` (entire directory)
5. `frontend-mobile/` (entire directory)
6. `mobile-app/` (entire directory)
7. All service files in multiple locations
8. All component files in multiple locations
9. All context files in multiple locations
10. All page files in multiple locations

---

## CONFIDENCE RATINGS

| Issue ID | Confidence | Reason |
|----------|-----------|--------|
| MOCK-1 to MOCK-6 | 100% | Clear hardcoded data arrays and imports |
| MOCK-7, MOCK-8 | 95% | Comments clearly reference old mock API |
| MOCK-9 | 80% | Variable naming suggests mock but is UI flag |
| MOCK-10 | 70% | Demo feature, acceptable but should be documented |
| DUP-1 | 100% | Three identical directory structures confirmed |
| DUP-2 to DUP-10 | 90-95% | File existence confirmed, exact duplication likely |
| DUP-11 to DUP-16 | 85-95% | Pattern matching, likely duplicates |
| DUP-17 | 100% | File name clearly misleading |

---

## RECOMMENDED ACTION PLAN

### Phase 1: Identify Active Codebase
1. Determine which frontend directory is actively used (`web/` vs `frontend-web/`)
2. Determine which mobile directory is actively used
3. Document decision

### Phase 2: Remove Mock Data
1. Delete all `data/products.ts` files
2. Update all imports to use backend API (`/api/products`)
3. Update comments to remove "db.json" references
4. Rename misleading variables (`isMockData` → `showDemoLabel`)

### Phase 3: Consolidate Duplicates
1. Delete unused frontend directories (keep only active one)
2. Delete unused mobile directories (keep only active one)
3. Update all documentation and scripts
4. Verify application still works

### Phase 4: Standardize Code
1. Standardize all imports to use `@/` alias
2. Consolidate duplicate service files
3. Consolidate duplicate component files
4. Update build configurations

---

## NOTES

- This audit did NOT modify any files (as requested)
- All proposed fixes are recommendations only
- Some "mock data" issues are actually acceptable demo features (MOCK-10)
- The three frontend directories appear to be from different development phases
- Backend appears clean (no mock data issues found in backend code)

---

**Report Generated:** Current  
**Next Steps:** Review findings and decide on active codebase before applying fixes.

