# Mock Data Removal Summary

## Progress Report

### ✅ Completed (2/12 tasks):

1. **Removed hardcoded products array** - Updated all pages to fetch from `/api/products`
   - Updated `web/src/data/products.ts` - Removed hardcoded array, kept type definition
   - Updated `web/src/pages/Menu.tsx` - Removed products import
   - Updated `web/src/pages/Home.tsx` - Removed products import
   - Updated `web/src/pages/Details.tsx` - Now fetches product by ID from API
   - Updated `web/src/pages/Cart.tsx` - Now fetches all products from API for productMap
   - Updated `web/src/main.tsx` - Removed products import, removed priceMap
   - Updated `web/src/admin/pages.tsx` - Removed products import, removed priceMap
   - Updated `web/src/context/CartContext.tsx` - Made priceMap optional (default empty object)

2. **Removed hardcoded restaurants array** - Updated AdminRestaurants.tsx to fetch from API
   - Updated `web/src/pages/admin/AdminRestaurants.tsx` - Now fetches from `getAllRestaurants()` API

### 🔄 In Progress (0/12 tasks):

### ⏳ Pending (10/12 tasks):

3. Remove mock activity timeline in DroneDetailModal.tsx
4. Remove mock ETA/speed calculations in droneRealtimeService.ts
5. Fix scenarioService to call real backend API
6. Fix restaurantNotificationService to call real backend API
7. Fix adminService placeholders (getSystemLogs, performEmergencyOverride)
8. Remove admin auth bypass - replace with real API call
9. Remove VNPay simulation function or mark as test-only
10. Remove development fallback in droneManager.ts
11. Remove outdated TODO comments about mock data
12. ✅ Update products.ts to be type-only (already completed)

## Files Modified:

1. `web/src/data/products.ts` - Removed hardcoded array, kept type and helper
2. `web/src/pages/Menu.tsx` - Removed products import
3. `web/src/pages/Home.tsx` - Removed products import
4. `web/src/pages/Details.tsx` - Fetch from API
5. `web/src/pages/Cart.tsx` - Fetch from API
6. `web/src/main.tsx` - Removed products import and priceMap
7. `web/src/admin/pages.tsx` - Removed products import and priceMap
8. `web/src/context/CartContext.tsx` - Made priceMap optional
9. `web/src/pages/admin/AdminRestaurants.tsx` - Fetch from API

## Next Steps:

Continue with remaining mock data removal tasks...

