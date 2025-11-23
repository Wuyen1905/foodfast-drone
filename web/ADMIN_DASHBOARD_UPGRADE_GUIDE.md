# Admin Dashboard Upgrade - Integration Guide

## 🚀 Quick Start

This guide explains how to integrate the new Admin Dashboard logic features into your existing dashboard.

---

## 📦 New Services & Features

### 1. Realtime Order Dashboard

**Service:** `web/src/services/adminRealtime.ts`

**Usage in AdminDashboard:**
```typescript
import { 
  subscribeToStats, 
  startRealtimePolling, 
  stopRealtimePolling 
} from '@/services/adminRealtime';
import { useRealtimeStats } from '@/hooks/useAdminData';

// In your component
const { stats, loading } = useRealtimeStats(4000); // Poll every 4 seconds

// Or use subscriber pattern
useEffect(() => {
  startRealtimePolling(4000);
  const unsubscribe = subscribeToStats((stats) => {
    // Update your state
    setRealtimeStats(stats);
  });
  
  return () => {
    stopRealtimePolling();
    unsubscribe();
  };
}, []);
```

**Integration:** Update existing stat cards with realtime data from `stats` object.

---

### 2. Drone Management

**Service:** `web/src/services/droneManager.ts`

**Usage:**
```typescript
import { 
  getDroneList, 
  updateDroneStatus, 
  calculateHealthScore,
  startHealthMonitoring,
  groupDronesByRestaurant,
  getRestaurantColor
} from '@/services/droneManager';
import { useDrones } from '@/hooks/useAdminData';

// In your component
const { drones, loading, refetch } = useDrones(5000); // Refresh every 5 seconds

// Group drones by restaurant
const groupedDrones = groupDronesByRestaurant(drones);

// Get restaurant color for visualization
const color = getRestaurantColor('rest_2'); // Returns '#667eea'

// Update drone status
await updateDroneStatus('DRONE-SD-001', { status: 'maintenance' });

// Start health monitoring (logs warnings to console)
startHealthMonitoring(5000);
```

**Integration:** Use `drones` array in existing DroneMonitor component. Health scores are automatically calculated.

---

### 3. Analytics Charts

**Components:** 
- `web/src/components/charts/RevenueChart.tsx`
- `web/src/components/charts/DronePerformanceChart.tsx`

**Usage:**
```typescript
import RevenueChart from '@/components/charts/RevenueChart';
import DronePerformanceChart from '@/components/charts/DronePerformanceChart';
import { useAnalytics } from '@/hooks/useAdminData';

// In your component
const { analytics, loading } = useAnalytics('day'); // or 'week', 'month'

// Revenue chart
<RevenueChart 
  data={analytics?.revenue || []} 
  type="line" 
  height={300}
  showOrders={true}
/>

// Drone performance chart
<DronePerformanceChart 
  data={{
    deliveryTime: analytics?.averageDeliveryTime || [],
    batteryLevels: drones.map(d => ({ 
      droneCode: d.code, 
      battery: d.battery 
    }))
  }}
  type="deliveryTime"
  height={300}
/>
```

**Integration:** Add charts to existing dashboard containers. No new UI cards needed.

---

### 4. Role-Based Permissions

**Service:** `web/src/state/authStore.ts`

**Usage:**
```typescript
import { 
  hasPermission, 
  checkPermission, 
  getRoleFeatures,
  createPermissionGuard
} from '@/state/authStore';
import { useAdminAuth } from '@/context/AdminAuthContext';

// In your component
const { admin } = useAdminAuth();
const userRole = admin?.role as 'admin' | 'restaurant' | 'staff';

// Check permission
if (hasPermission('admin', 'analytics')) {
  // Show analytics
}

// Check with user role
if (checkPermission(userRole, 'drone-management')) {
  // Access drone management
}

// Get all features for role
const features = getRoleFeatures('admin');

// Permission guard
const guard = createPermissionGuard(userRole);
guard('analytics', () => {
  // Execute if permission granted
});
```

**Integration:** Use permission checks to conditionally render features (logic only, no UI removal).

---

### 5. Notifications

**Service:** `web/src/state/notificationStore.ts`

**Usage:**
```typescript
import { 
  notificationStore,
  notifyNewOrder,
  notifyDroneBatteryLow,
  notifyDeliveryCompleted
} from '@/state/notificationStore';

// Subscribe to notifications
useEffect(() => {
  const unsubscribe = notificationStore.subscribe((notifications) => {
    // Handle notifications (e.g., update badge count)
    setUnreadCount(notificationStore.getUnreadCount());
  });
  
  return unsubscribe;
}, []);

// Trigger notifications
notifyNewOrder('ORD-123', 'SweetDreams Bakery', 450000);
notifyDroneBatteryLow('DRN-001', 15);
notifyDeliveryCompleted('ORD-123', 'DRN-001');
```

**Integration:** Use notification store to track events. Notifications are logged to console (no UI popups added).

---

### 6. Scenario Simulation

**Service:** `web/src/services/scenarioService.ts`

**Usage:**
```typescript
import { 
  handleDroneFailure,
  handleBatteryDepletion,
  startScenarioProcessing,
  getScenarios
} from '@/services/scenarioService';

// Handle drone failure
await handleDroneFailure('DRONE-SD-003');
// Logs: "Drone DRN-003 returning to base due to simulated failure."

// Handle battery depletion
await handleBatteryDepletion('DRONE-SD-001');

// Start background scenario processing
startScenarioProcessing(10000); // Process every 10 seconds

// Get scenarios
const scenarios = await getScenarios();
```

**Integration:** Use scenario service for admin-only logic. Scenarios are logged to console (no visual alerts).

---

### 7. Export Reports

**Service:** `web/src/utils/exportHelper.ts`

**Usage:**
```typescript
import { 
  exportOrdersReport,
  exportDronesReport,
  exportAnalyticsReport,
  exportToCSV,
  exportToJSON
} from '@/utils/exportHelper';

// Export orders
exportOrdersReport(orders);

// Export drones
exportDronesReport(drones);

// Export analytics
exportAnalyticsReport(analytics);

// Custom export
exportToCSV({
  headers: ['Column 1', 'Column 2'],
  rows: [['Value 1', 'Value 2']],
  title: 'My Report'
}, 'report.csv');
```

**Integration:** Expose export functions for later use. No UI buttons added (as per requirements).

---

## 🔧 Integration Steps

### Step 1: Update AdminDashboard Component

1. Import new hooks:
```typescript
import { useRealtimeStats, useDrones, useAnalytics } from '@/hooks/useAdminData';
```

2. Use hooks in component:
```typescript
const { stats: realtimeStats } = useRealtimeStats(4000);
const { drones } = useDrones(5000);
const { analytics } = useAnalytics('day');
```

3. Update existing stat cards with realtime data:
```typescript
// Replace static stats with realtime stats
<StatValue>{realtimeStats?.totalOrders || 0}</StatValue>
<StatLabel>Total Orders (Realtime)</StatLabel>
```

### Step 2: Add Charts (Optional)

Add charts to existing dashboard containers:
```typescript
import RevenueChart from '@/components/charts/RevenueChart';

// In your overview tab
<RevenueChart 
  data={analytics?.revenue || []} 
  type="line" 
  height={300}
/>
```

### Step 3: Enable Health Monitoring

Start health monitoring in useEffect:
```typescript
import { startHealthMonitoring } from '@/services/droneManager';

useEffect(() => {
  startHealthMonitoring(5000);
  return () => stopHealthMonitoring();
}, []);
```

### Step 4: Enable Scenario Processing

Start scenario processing:
```typescript
import { startScenarioProcessing } from '@/services/scenarioService';

useEffect(() => {
  startScenarioProcessing(10000);
  return () => stopScenarioProcessing();
}, []);
```

---

## 📊 Data Flow

```
Mock API (db.json)
    ↓
Services (adminRealtime, droneManager, etc.)
    ↓
Hooks (useAdminData)
    ↓
AdminDashboard Component
    ↓
Existing UI Components (unchanged)
```

---

## 🎯 Key Points

1. **No UI Changes:** All new features are logic-only. Existing UI remains unchanged.

2. **Backward Compatible:** All existing functionality is preserved. New features are additive.

3. **Performance Optimized:** Caching and debouncing implemented for optimal performance.

4. **Type Safe:** All functions are properly typed with TypeScript.

5. **Console Logging:** Important events are logged to console for debugging.

---

## 🐛 Troubleshooting

### Charts not rendering?
- Ensure Recharts is installed: `npm install recharts`
- Check that data is in correct format (see component props)

### Realtime stats not updating?
- Ensure `startRealtimePolling()` is called
- Check mock API is running on `http://localhost:3001`
- Verify `realtimeStats` exists in `db.json`

### Health warnings not showing?
- Ensure `startHealthMonitoring()` is called
- Check console for warnings (no UI alerts)
- Verify drones have `battery` and `missionsCompleted` fields

### Export not working?
- PDF export requires `jsPDF` library (optional, falls back to CSV)
- Check browser console for errors
- Ensure data is in correct format

---

## 📝 Next Steps

1. **Test Integration:** Test all new features in development environment
2. **Update Documentation:** Update internal documentation with new features
3. **Add UI Integration:** (Optional) Add UI elements to expose new features
4. **Monitor Performance:** Monitor performance with new realtime updates
5. **Extend Features:** Add more scenarios, analytics, or reports as needed

---

## ✅ Verification

All features have been implemented and verified:
- ✅ Realtime order dashboard
- ✅ Multi-restaurant drone map
- ✅ Drone & maintenance management
- ✅ Revenue & performance analytics
- ✅ Role-based access control
- ✅ Smart notification system
- ✅ Scenario simulation
- ✅ Auto reports
- ✅ Performance optimizations

See `VERIFICATION_REPORT.md` for detailed verification.

---

**Last Updated:** 2025-11-07  
**Status:** ✅ Ready for Integration

