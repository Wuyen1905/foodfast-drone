# Real-Time Order Sync Fix Patches

Based on MOCK_DATA_AND_MIXED_CODE_SCAN_REPORT.md analysis.

## Plan

1. Create centralized restaurant identifier utility (`web/src/utils/restaurantUtils.ts`)
2. Fix query parameters: Change `restaurant=` to `restaurantId=` in 3 service files
3. Update services to use centralized utility instead of scattered normalization
4. Ensure WebSocket subscriptions use correct restaurantId format

---

## Patch 1: Create Centralized Restaurant Identifier Utility

**File:** `web/src/utils/restaurantUtils.ts` (NEW FILE)

**Goal:** Create single source of truth for restaurant name/ID mapping to fix real-time WebSocket topic subscriptions.

```typescript
/**
 * Restaurant Identifier Utilities
 * Centralized mapping between restaurant names and IDs for consistent API/WebSocket usage
 */

/**
 * Maps restaurant name or ID to backend restaurantId
 * Used for API queries and WebSocket topic subscriptions
 * 
 * @param identifier - Restaurant name ("SweetDreams", "Aloha") or ID ("rest_2", "restaurant_2")
 * @returns Backend restaurantId ("rest_2" or "restaurant_2")
 */
export const normalizeToRestaurantId = (identifier: string): string => {
  if (!identifier) return identifier;
  
  const normalized = identifier.toLowerCase().trim();
  
  // Map restaurant names to backend IDs
  if (normalized === 'sweetdreams' || normalized === 'sweetdreams bakery') {
    return 'rest_2';
  }
  if (normalized === 'aloha' || normalized === 'aloha kitchen') {
    return 'restaurant_2';
  }
  
  // If already an ID format, return as-is
  if (normalized === 'rest_2' || normalized === 'restaurant_2') {
    return normalized === 'rest_2' ? 'rest_2' : 'restaurant_2';
  }
  
  // Default: assume it's already a valid ID
  return identifier;
};

/**
 * Maps backend restaurantId to display name
 * Used for UI display purposes only
 * 
 * @param restaurantId - Backend restaurantId ("rest_2", "restaurant_2")
 * @returns Display name ("SweetDreams", "Aloha")
 */
export const getRestaurantDisplayName = (restaurantId: string): string => {
  if (!restaurantId) return '';
  
  const normalized = restaurantId.toLowerCase().trim();
  
  if (normalized === 'rest_2') {
    return 'SweetDreams';
  }
  if (normalized === 'restaurant_2') {
    return 'Aloha';
  }
  
  return restaurantId; // Fallback to ID if unknown
};

/**
 * Check if identifier is a restaurant name (not ID)
 */
export const isRestaurantName = (identifier: string): boolean => {
  if (!identifier) return false;
  const normalized = identifier.toLowerCase().trim();
  return normalized === 'sweetdreams' || normalized === 'aloha' || 
         normalized === 'sweetdreams bakery' || normalized === 'aloha kitchen';
};
```

---

## Patch 2: Fix Query Parameters - restaurantOrderService.ts

**File:** `web/src/services/restaurantOrderService.ts`

**Goal:** Use `restaurantId=` parameter instead of `restaurant=` for correct backend filtering in real-time sync.

```typescript
// Fix restaurantId filter for real-time order sync (use restaurantId= parameter)
import { normalizeToRestaurantId } from '@/utils/restaurantUtils';

// ... existing code ...

export const getRestaurantOrders = async (restaurantId: string): Promise<Order[]> => {
  try {
    // Normalize restaurant ID using centralized utility
    const restaurantIdParam = normalizeToRestaurantId(restaurantId);
    
    // Use restaurantId= parameter (backend prefers this over restaurant=)
    const response = await api.get(`/orders?restaurantId=${restaurantIdParam}`);
    const apiOrders = response.data;
    
    // ... rest of existing code ...
  }
};
```

**Apply Patch:**
```diff
--- a/web/src/services/restaurantOrderService.ts
+++ b/web/src/services/restaurantOrderService.ts
@@ -1,10 +1,12 @@
 // Restaurant Order Service
 // Restaurant order management using backend API
 
 import { Order, OrderStatus } from '@/context/OrderContext';
 import { api } from '@/config/axios';
+import { normalizeToRestaurantId } from '@/utils/restaurantUtils';
 
 /**
  * Normalize restaurant ID to handle different formats
  */
 const normalizeRestaurantId = (id: string): string => {
   const map: Record<string, string> = {
@@ -25,17 +27,10 @@ import { api } from '@/config/axios';
 
 export const getRestaurantOrders = async (restaurantId: string): Promise<Order[]> => {
   try {
-    // Normalize restaurant ID for API query
-    let restaurantIdParam = restaurantId;
-    if (restaurantId.toLowerCase() === 'sweetdreams') {
-      restaurantIdParam = 'rest_2';
-    } else if (restaurantId.toLowerCase() === 'aloha') {
-      restaurantIdParam = 'restaurant_2';
-    }
+    // Normalize restaurant ID using centralized utility
+    const restaurantIdParam = normalizeToRestaurantId(restaurantId);
     
-    const response = await api.get(`/orders?restaurant=${restaurantIdParam}`);
+    // Use restaurantId= parameter (backend prefers this over restaurant=)
+    const response = await api.get(`/orders?restaurantId=${restaurantIdParam}`);
     const apiOrders = response.data;
     
     // ... rest remains unchanged ...
```

---

## Patch 3: Fix Query Parameters - RestaurantAnalytics.tsx

**File:** `web/src/components/restaurant/RestaurantAnalytics.tsx`

**Goal:** Use `restaurantId=` parameter for orders API call to ensure correct filtering in real-time sync.

```diff
--- a/web/src/components/restaurant/RestaurantAnalytics.tsx
+++ b/web/src/components/restaurant/RestaurantAnalytics.tsx
@@ -1,6 +1,7 @@
 import React, { useState, useEffect } from 'react';
 import styled from 'styled-components';
 import { api } from '@/config/axios';
+import { normalizeToRestaurantId } from '@/utils/restaurantUtils';
 
 // ... existing imports ...
 
@@ -293,15 +294,10 @@ const RestaurantAnalytics: React.FC<AnalyticsProps> = ({ theme, restaurant = "
   // Load analytics from backend API
   const loadAnalytics = async () => {
     try {
-      // Normalize restaurant ID
-      let restaurantIdParam = restaurant;
-      if (restaurant.toLowerCase() === 'sweetdreams') {
-        restaurantIdParam = 'rest_2';
-      } else if (restaurant.toLowerCase() === 'aloha') {
-        restaurantIdParam = 'restaurant_2';
-      }
+      // Normalize restaurant ID using centralized utility
+      const restaurantIdParam = normalizeToRestaurantId(restaurant);
       
       // Fetch analytics and overview data
       const [analyticsResponse, overviewResponse, ordersResponse] = await Promise.all([
         api.get(`/analytics/restaurant/${restaurantIdParam}?period=day`).catch(() => null),
         api.get(`/analytics/restaurant/${restaurantIdParam}/overview`).catch(() => null),
-        api.get(`/orders?restaurant=${restaurantIdParam}`).catch(() => null)
+        api.get(`/orders?restaurantId=${restaurantIdParam}`).catch(() => null)
       ]);
```

---

## Patch 4: Fix Query Parameters - menuManagementService.ts

**File:** `web/src/services/menuManagementService.ts`

**Goal:** Use `restaurantId=` parameter for orders API call to ensure correct filtering.

```diff
--- a/web/src/services/menuManagementService.ts
+++ b/web/src/services/menuManagementService.ts
@@ -1,6 +1,7 @@
 import { api } from '@/config/axios';
+import { normalizeToRestaurantId } from '@/utils/restaurantUtils';
 
 // ... existing code ...
 
 // Get order history by restaurant
 export const getOrderHistoryByRestaurant = async (restaurantId: string): Promise<OrderHistoryItem[]> => {
   try {
-    // Normalize restaurant ID
-    let restaurantIdParam = restaurantId;
-    if (restaurantId.toLowerCase() === 'sweetdreams') {
-      restaurantIdParam = 'rest_2';
-    } else if (restaurantId.toLowerCase() === 'aloha') {
-      restaurantIdParam = 'restaurant_2';
-    }
+    // Normalize restaurant ID using centralized utility
+    const restaurantIdParam = normalizeToRestaurantId(restaurantId);
     
-    const response = await api.get(`/orders?restaurant=${restaurantIdParam}`);
+    // Use restaurantId= parameter for correct backend filtering
+    const response = await api.get(`/orders?restaurantId=${restaurantIdParam}`);
     const orders = response.data;
```

---

## Patch 5: Update restaurantService.ts to Use Centralized Utility

**File:** `web/src/services/restaurantService.ts`

**Goal:** Replace scattered normalization logic with centralized utility for consistency.

```diff
--- a/web/src/services/restaurantService.ts
+++ b/web/src/services/restaurantService.ts
@@ -1,6 +1,7 @@
 import { api } from '@/config/axios';
+import { normalizeToRestaurantId } from '@/utils/restaurantUtils';
 
 // ... existing code ...
 
 export const getRestaurantOverview = async (id: string): Promise<RestaurantOverview | null> => {
   try {
-    // Normalize restaurant ID
-    let restaurantIdParam = id;
-    if (id.toLowerCase() === 'sweetdreams') {
-      restaurantIdParam = 'rest_2';
-    } else if (id.toLowerCase() === 'aloha') {
-      restaurantIdParam = 'restaurant_2';
-    }
+    // Normalize restaurant ID using centralized utility
+    const restaurantIdParam = normalizeToRestaurantId(id);
     
     const response = await api.get(`/analytics/restaurant/${restaurantIdParam}/overview`);
```

**Also update other functions in same file:**
```diff
@@ -83,17 +84,10 @@ export const getRestaurantOrders = async (id: string): Promise<Order[]> => {
 export const getRestaurantOrders = async (id: string): Promise<Order[]> => {
   try {
-    // Normalize restaurant ID for API query
-    let restaurantIdParam = id;
-    if (id.toLowerCase() === 'sweetdreams') {
-      restaurantIdParam = 'rest_2';
-    } else if (id.toLowerCase() === 'aloha') {
-      restaurantIdParam = 'restaurant_2';
-    }
+    // Normalize restaurant ID using centralized utility
+    const restaurantIdParam = normalizeToRestaurantId(id);
     
     const response = await api.get(`/orders?restaurantId=${restaurantIdParam}`);
     // ... rest unchanged ...
```

**Apply same pattern to:**
- `getRestaurantDrones` function
- `getRestaurantAnalytics` function  
- `getRestaurantDroneHealth` function

---

## Patch 6: Ensure WebSocket Uses Normalized restaurantId

**File:** `web/src/services/orderSyncService.ts`

**Goal:** Ensure WebSocket subscriptions use normalized restaurantId for correct topic subscriptions.

```diff
--- a/web/src/services/orderSyncService.ts
+++ b/web/src/services/orderSyncService.ts
@@ -1,6 +1,7 @@
 import SockJS from "sockjs-client";
 import { Stomp } from "@stomp/stompjs";
+import { normalizeToRestaurantId } from '@/utils/restaurantUtils';
 
 // ... existing code ...
 
@@ -227,6 +228,8 @@ export const setRestaurantIdForSubscription = (id: string | null): void => {
 // Helper function to set restaurantId for restaurant-specific subscriptions
 export const setRestaurantIdForSubscription = (id: string | null): void => {
   if (id) {
-    restaurantId = id;
+    // Normalize restaurantId to ensure correct WebSocket topic subscription
+    restaurantId = normalizeToRestaurantId(id);
   } else {
     restaurantId = null;
   }
@@ -237,6 +240,8 @@ export const connectOrderSync = (
   onOrderUpdate: (order: any) => void,
   optionalRestaurantId?: string | null
 ): Promise<boolean> => {
   subscriptionCallbacks.add(onOrderUpdate);
   if (optionalRestaurantId) {
-    restaurantId = optionalRestaurantId;
+    // Normalize restaurantId to ensure correct WebSocket topic subscription
+    restaurantId = normalizeToRestaurantId(optionalRestaurantId);
   }
```

---

## Summary

These patches fix:
1. ✅ Restaurant identifier inconsistency - Single source of truth
2. ✅ Query parameter mismatch - All use `restaurantId=` now
3. ✅ WebSocket topic subscriptions - Use normalized restaurantId
4. ✅ Real-time order sync - Correct filtering and subscriptions

**No breaking changes:**
- UI components unchanged
- Routing unchanged
- Authentication unchanged
- Backward compatible (handles both name and ID inputs)

