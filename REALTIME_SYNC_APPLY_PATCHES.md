# Apply Patch Blocks - Real-Time Order Sync Fixes

These patches fix restaurant identifier inconsistency and query parameter mismatches for real-time order sync.

---

## Patch 1: Create Centralized Restaurant Identifier Utility

**File:** `web/src/utils/restaurantUtils.ts` (NEW FILE)

```typescript
/**
 * Restaurant Identifier Utilities
 * Centralized mapping between restaurant names and IDs for consistent API/WebSocket usage
 */

/**
 * Maps restaurant name or ID to backend restaurantId
 * Used for API queries and WebSocket topic subscriptions
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
  
  return restaurantId;
};
```

---

## Patch 2: Fix restaurantOrderService.ts - Use restaurantId= parameter

**File:** `web/src/services/restaurantOrderService.ts`

Apply Patch:
```diff
@@ -1,6 +1,7 @@
 // Restaurant Order Service
 // Restaurant order management using backend API
 
 import { Order, OrderStatus } from '@/context/OrderContext';
 import { api } from '@/config/axios';
+import { normalizeToRestaurantId } from '@/utils/restaurantUtils';
 
 /**
  * Normalize restaurant ID to handle different formats
  */
 const normalizeRestaurantId = (id: string): string => {
@@ -25,17 +26,10 @@ import { api } from '@/config/axios';
 
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
     
     // Map API orders to OrderContext Order type
```

---

## Patch 3: Fix RestaurantAnalytics.tsx - Use restaurantId= parameter

**File:** `web/src/components/restaurant/RestaurantAnalytics.tsx`

Apply Patch:
```diff
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

## Patch 4: Fix menuManagementService.ts - Use restaurantId= parameter

**File:** `web/src/services/menuManagementService.ts`

Apply Patch:
```diff
@@ -1,6 +1,7 @@
 import { api } from '@/config/axios';
+import { normalizeToRestaurantId } from '@/utils/restaurantUtils';
 
 // ... existing imports ...
 
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

**Also update getRestaurantMenuStats function:**
```diff
@@ -274,11 +275,7 @@ export const getRestaurantMenuStats = async (restaurantId: string): Promise<{
     const dishes = await getDishesByRestaurant(restaurantId);
     
-    // Normalize restaurant ID for orders query
-    let restaurantIdParam = restaurantId;
-    if (restaurantId.toLowerCase() === 'sweetdreams') {
-      restaurantIdParam = 'rest_2';
-    } else if (restaurantId.toLowerCase() === 'aloha') {
-      restaurantIdParam = 'restaurant_2';
-    }
+    // Normalize restaurant ID using centralized utility
+    const restaurantIdParam = normalizeToRestaurantId(restaurantId);
     
-    const ordersResponse = await api.get(`/orders?restaurant=${restaurantIdParam}`);
+    const ordersResponse = await api.get(`/orders?restaurantId=${restaurantIdParam}`);
```

---

## Patch 5: Update restaurantService.ts - Use centralized utility

**File:** `web/src/services/restaurantService.ts`

Apply Patch for getRestaurantOverview:
```diff
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

Apply Patch for getRestaurantOrders (already uses restaurantId=, just normalize):
```diff
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
```

Apply Patch for getRestaurantDrones:
```diff
 export const getRestaurantDrones = async (id: string): Promise<Drone[]> => {
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
     
     const response = await api.get(`/drones?restaurantId=${restaurantIdParam}`);
```

Apply Patch for getRestaurantAnalytics:
```diff
 export const getRestaurantAnalytics = async (id: string, period: 'day' | 'week' | 'month' = 'day') => {
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
     
     const response = await api.get(`/analytics/restaurant/${restaurantIdParam}?period=${period}`);
```

Apply Patch for getRestaurantDroneHealth:
```diff
 export const getRestaurantDroneHealth = async (id: string) => {
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
     
     const response = await api.get(`/drones?restaurantId=${restaurantIdParam}`);
```

---

## Patch 6: Fix WebSocket - Use normalized restaurantId

**File:** `web/src/services/orderSyncService.ts`

Apply Patch:
```diff
@@ -1,6 +1,7 @@
 import SockJS from "sockjs-client";
 import { Stomp } from "@stomp/stompjs";
+import { normalizeToRestaurantId } from '@/utils/restaurantUtils';
 
 const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;
 // ... existing code ...
 
@@ -227,7 +228,8 @@ export const setRestaurantIdForSubscription = (id: string | null): void => {
 // Helper function to set restaurantId for restaurant-specific subscriptions
 export const setRestaurantIdForSubscription = (id: string | null): void => {
   if (id) {
-    restaurantId = id;
+    // Normalize restaurantId to ensure correct WebSocket topic subscription
+    restaurantId = normalizeToRestaurantId(id);
   } else {
     restaurantId = null;
   }
@@ -237,7 +239,8 @@ export const connectOrderSync = (
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

**Files Modified:**
1. ✅ `web/src/utils/restaurantUtils.ts` (NEW) - Centralized utility
2. ✅ `web/src/services/restaurantOrderService.ts` - Fix query parameter
3. ✅ `web/src/components/restaurant/RestaurantAnalytics.tsx` - Fix query parameter
4. ✅ `web/src/services/menuManagementService.ts` - Fix query parameters (2 functions)
5. ✅ `web/src/services/restaurantService.ts` - Use centralized utility (5 functions)
6. ✅ `web/src/services/orderSyncService.ts` - Normalize WebSocket restaurantId

**Fixes:**
- ✅ Restaurant identifier inconsistency - Single source of truth
- ✅ Query parameter standardization - All use `restaurantId=`
- ✅ WebSocket topic subscriptions - Use normalized restaurantId
- ✅ Real-time order sync - Correct filtering and subscriptions

**No Breaking Changes:**
- UI components unchanged
- Routing unchanged  
- Authentication unchanged
- Backward compatible (handles both name and ID inputs)

