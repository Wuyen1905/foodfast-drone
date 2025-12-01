# Comprehensive Mock Data Scan Report
**Date:** Current  
**Scope:** Entire repository (backend, frontend-web, frontend-mobile, web)  
**Purpose:** Identify ALL mock data usage, hardcoded arrays, fake data, and legacy mock references

---

## EXECUTIVE SUMMARY

**Total Findings:** 25  
**Critical Mock Data:** 8  
**Legacy Comments/References:** 10  
**File Name Issues:** 2  
**Script References:** 2  
**UI State Variables (False Positives):** 3

**Status:** ⚠️ **MOCK DATA STILL PRESENT** - Multiple hardcoded data arrays and legacy mock references found

---

## DETAILED FINDINGS TABLE

| # | File Path | Line Numbers | Type of Mock | Why It's Considered "Mock" | Exact Suggested Fix |
|---|-----------|--------------|--------------|---------------------------|----------------------|
| 1 | `frontend-web/src/data/products.ts` | 15-139 | Hardcoded Array | ✅ **CONFIRMED** - Contains hardcoded array of 10 products (5 SweetDreams, 5 Aloha) with fixed IDs, prices, images. Should come from backend API `/api/products`. | Remove the `products` array export (lines 15-139). Keep only the `Product` interface and `getProductImage()` helper. Update all imports to fetch from backend API. |
| 2 | `web/src/data/products.ts` | N/A | Type Definition Only | ✅ **VERIFIED** - File only contains `Product` interface and `getProductImage()` helper. No hardcoded array present. This file is clean. | No action needed - file is already clean. |
| 3 | `web/src/pages/Home.tsx` | 5 | Import from Mock File | Imports `Product` type from `../data/products` which may reference mock data structure. | Keep import for type only. Ensure data comes from `getAvailableMenuByRestaurant()` API call (already implemented). |
| 4 | `web/src/pages/Menu.tsx` | 5 | Import from Mock File | Imports `Product` type from `../data/products`. | Keep import for type only. Ensure data comes from `getAvailableMenuByRestaurant()` API call (already implemented). |
| 5 | `web/src/pages/Cart.tsx` | 7 | Import from Mock File | Imports `Product` type from `../data/products`. | Keep import for type only. Ensure data comes from `getAllProducts()` API call (already implemented). |
| 6 | `web/src/pages/Details.tsx` | 5 | Import from Mock File | Imports `Product` and `getProductImage` from `../data/products`. | Keep imports. Ensure product data comes from `getProductById()` API call (already implemented). |
| 7 | `frontend-mobile/src/api/mock.ts` | 1-11 | Misleading File Name | File named `mock.ts` but actually exports real API client (`apiClient`). Contains outdated comments referencing removed mock API server. | Rename file to `api.ts` or `apiClient.ts`. Remove outdated comments about mock API server. Update all imports from `'../api/mock'` to `'../api/api'` or new name. |
| 8 | `frontend-mobile/src/screens/Drone.tsx` | 3 | Import from Mock File | Imports `api` from `'../api/mock'` - misleading file name suggests mock data. | Change import to: `import { api } from '../api/api';` (after renaming mock.ts) |
| 9 | `frontend-mobile/src/screens/Cart.tsx` | 3 | Import from Mock File | Imports `api` from `'../api/mock'` - misleading file name. | Change import to: `import { api } from '../api/api';` (after renaming mock.ts) |
| 10 | `frontend-mobile/src/screens/Checkout.tsx` | 3 | Import from Mock File | Imports `api` from `'../api/mock'` - misleading file name. | Change import to: `import { api } from '../api/api';` (after renaming mock.ts) |
| 11 | `frontend-mobile/src/screens/Details.tsx` | 3 | Import from Mock File | Imports `api` from `'../api/mock'` - misleading file name. | Change import to: `import { api } from '../api/api';` (after renaming mock.ts) |
| 12 | `web/src/services/orderApiService.ts` | 3, 98, 106, 161, 177, 185 | Legacy Comments | Comments reference "db.json format" and "db.json structure" - legacy from mock API era. Code uses backend API correctly. | Update all comments: Replace "db.json format" with "backend API format". Replace "db.json structure" with "backend API structure". Remove all "db.json" references. |
| 13 | `web/src/pages/Checkout.tsx` | 453, 456 | Legacy Comments | Comments reference "db.json format" - legacy from mock API era. | Update comments: Replace "db.json format" with "backend API format". Remove "db.json" references. |
| 14 | `web/src/components/admin/DroneMonitor.tsx` | 741, 747 | UI State Variable | Variable named `isMockData` but it's just a UI flag to show "(Demo)" label when no drones exist. Not actual mock data. | Rename variable to `isEmptyData` or `showDemoLabel` for clarity. This is acceptable UI state management, not mock logic. |
| 15 | `web/src/pages/Login.tsx` | 4 | Legacy Comment | Comment: "TODO: Backend integration in Phase 2 - removed mockData import" | Remove outdated comment. Backend integration is complete. |
| 16 | `web/src/pages/admin/AdminControlPanel.tsx` | 4 | Legacy Comment | Comment: "TODO: Backend integration in Phase 2 - removed mockData import" | Remove outdated comment. Backend integration is complete. |
| 17 | `web/src/components/restaurant/RestaurantAnalytics.tsx` | 286 | Legacy Comment | Comment: "TODO: Backend integration in Phase 2 - removed all hardcoded mock data" | Remove outdated comment. Backend integration is complete. |
| 18 | `run_all.bat` | 22 | Script Reference | Script starts `json-server --watch db.json --port 5000` - references mock API server. | Update script to start Spring Boot backend instead. Remove or comment out mock API server startup. |
| 19 | `run_all.sh` | 64 | Script Reference | Script starts `json-server --watch db.json --port 5000` - references mock API server. | Update script to start Spring Boot backend instead. Remove or comment out mock API server startup. |
| 20 | `mobile-app/src/screens/Drone.tsx` | 300, 315 | Fallback to Mock API | Code falls back to `api.get('/drone/status')` when backend API fails. This may be calling a mock endpoint. | Verify `/drone/status` endpoint exists in backend. If not, remove fallback or implement proper error handling. |
| 21 | `web/src/context/CartContext.tsx` | 27, 30 | localStorage Usage | Uses `localStorage.getItem('cart')` and `localStorage.setItem('cart', ...)` for cart persistence. This is acceptable for client-side state, but should sync with backend. | Keep localStorage for offline support, but ensure cart syncs with backend API on login/network available. This is acceptable pattern, not mock data. |
| 22 | `web/src/context/AuthContext.tsx` | 72, 75, 76 | localStorage Usage | Uses `localStorage` for auth token and user data persistence. This is acceptable for session management. | Keep localStorage for session persistence. Ensure tokens come from backend API. This is acceptable pattern, not mock data. |
| 23 | `mobile-app/src/utils/syncVerification.ts` | 6 | Legacy Comment | Comment: "Note: Mobile uses direct connection to json-server (no proxy)" - references removed json-server. | Update comment to reference Spring Boot backend. Remove "json-server" reference. |
| 24 | `web/src/context/OrderContext.tsx` | (Multiple) | localStorage Fallback | Uses `localStorage.getItem('orders')` as fallback when API fails. This is acceptable resilience pattern. | Keep as fallback for offline support. Ensure primary data source is backend API. This is acceptable pattern, not mock data. |
| 25 | Documentation Files | Various | Legacy References | Multiple `.md` files reference `mock-api/`, `db.json`, `json-server`, and mock data patterns. | Update documentation to remove references to mock API. Update setup guides to reference Spring Boot backend only. |

---

## SUMMARY BY FOLDER

### Backend (`backend/`)
**Status:** ✅ **CLEAN** - No mock data found  
**Findings:** 0  
**Notes:** Backend uses Spring Boot with H2 database. All data comes from `data.sql` initialization or API endpoints. No mock data patterns detected.

---

### Frontend-Web (`web/` and `frontend-web/`)

#### Critical Issues:
1. **Hardcoded Products Array** (`frontend-web/src/data/products.ts`) ✅ **CONFIRMED**
   - Contains 10 hardcoded products (lines 15-139)
   - Should be removed, data should come from `/api/products`
   - Note: `web/src/data/products.ts` is already clean (only types, no array)

2. **Legacy Comments** (Multiple files)
   - References to "db.json format" in `orderApiService.ts` and `Checkout.tsx`
   - Outdated "TODO: Backend integration" comments

3. **Type Imports** (Multiple pages)
   - Pages import `Product` type from `data/products.ts`
   - Currently only used for types (acceptable), but file name suggests mock data

#### Moderate Issues:
1. **Misleading Variable Names** (`DroneMonitor.tsx`)
   - `isMockData` variable is just UI state, not actual mock data
   - Should be renamed for clarity

2. **localStorage Usage** (Context files)
   - Used for cart/auth persistence (acceptable pattern)
   - Should ensure backend sync

**Total Frontend-Web Findings:** 15

---

### Frontend-Mobile (`frontend-mobile/`)

#### Critical Issues:
1. **Misleading File Name** (`src/api/mock.ts`)
   - File named `mock.ts` but exports real API client
   - Contains outdated comments about mock API server
   - Should be renamed to `api.ts`

2. **Import References** (4 screen files)
   - All import from `'../api/mock'` - misleading
   - Should import from renamed file

**Total Frontend-Mobile Findings:** 5

---

### Scripts & Configuration

#### Issues:
1. **Launch Scripts** (`run_all.bat`, `run_all.sh`)
   - Reference `json-server --watch db.json --port 5000`
   - Should start Spring Boot backend instead

**Total Script Findings:** 2

---

### Documentation

#### Issues:
1. **Legacy References** (Multiple `.md` files)
   - References to `mock-api/`, `db.json`, `json-server`
   - Should be updated to reference Spring Boot backend

**Total Documentation Findings:** Multiple (not counted in code findings)

---

## IMPACT ANALYSIS

### Removing Mock Data Will Affect:

1. **`frontend-web/src/data/products.ts`** - Hardcoded Array
   - **Impact:** HIGH - If any code still imports the `products` array directly, it will break
   - **Current Status:** Appears safe - pages use API calls (`getAllProducts()`, `getAvailableMenuByRestaurant()`)
   - **Action:** Verify no direct imports of `products` array, then remove array

2. **`frontend-mobile/src/api/mock.ts`** - File Rename
   - **Impact:** MEDIUM - Requires updating 4+ import statements
   - **Action:** Rename file and update imports

3. **Legacy Comments** - References to "db.json"
   - **Impact:** LOW - Only affects code readability, no runtime impact
   - **Action:** Update comments for clarity

4. **Launch Scripts** - Mock API Server
   - **Impact:** MEDIUM - Scripts won't start mock server (which may be intentional)
   - **Action:** Update to start Spring Boot backend

---

## RECOMMENDED FIX PRIORITY

### Priority 1 (Critical - Remove Mock Data):
1. ✅ Verify `frontend-web/src/data/products.ts` - Remove hardcoded array if present
2. ✅ Rename `frontend-mobile/src/api/mock.ts` to `api.ts`
3. ✅ Update all imports from `'../api/mock'` to `'../api/api'`

### Priority 2 (High - Update References):
4. ✅ Update comments in `orderApiService.ts` - Remove "db.json" references
5. ✅ Update comments in `Checkout.tsx` - Remove "db.json" references
6. ✅ Update launch scripts (`run_all.bat`, `run_all.sh`) - Remove mock API server

### Priority 3 (Medium - Code Clarity):
7. ✅ Rename `isMockData` variable in `DroneMonitor.tsx` to `isEmptyData`
8. ✅ Remove outdated "TODO: Backend integration" comments

### Priority 4 (Low - Documentation):
9. ✅ Update documentation files to remove mock API references

---

## FALSE POSITIVES (Not Actually Mock Data)

1. **`isMockData` in `DroneMonitor.tsx`** - UI state flag, not mock data
2. **`localStorage` usage in contexts** - Acceptable client-side persistence pattern
3. **Type imports from `data/products.ts`** - Only importing types, not data

---

## VERIFICATION CHECKLIST

After fixes are applied, verify:

- [ ] No hardcoded product arrays exist
- [ ] All product data comes from `/api/products` endpoint
- [ ] No files named `mock.ts` or `mockData.ts` (except documentation)
- [ ] No imports from `'../api/mock'` or similar
- [ ] No comments referencing "db.json format"
- [ ] Launch scripts start Spring Boot backend, not json-server
- [ ] All `localStorage` usage is for client-side persistence only (not as database)
- [ ] No `simulateDelay()` functions exist
- [ ] No `setTimeout` used to simulate API delays

---

## CONCLUSION

**Current State:** Mock data migration is **mostly complete**, but several cleanup items remain:
- 1 hardcoded products array (if present in `frontend-web/src/data/products.ts`)
- 1 misleading file name (`mock.ts`)
- Multiple legacy comments and script references
- Documentation updates needed

**Recommendation:** Complete cleanup by addressing Priority 1-2 items. Priority 3-4 can be done incrementally.

---

**Report Generated:** Current Date  
**Scan Method:** Comprehensive file search, pattern matching, and code analysis

