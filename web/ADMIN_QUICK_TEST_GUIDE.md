# 🚀 Admin Dashboard - Quick Test Guide

## ⚡ Quick Start (30 seconds)

1. **Start the development server:**
   ```bash
   cd web
   npm run dev
   ```

2. **Open browser:**
   Navigate to: `http://localhost:5173/admin/login`

3. **Login with admin credentials:**
   - Username: `admin`
   - Password: `admin123`

4. **You're in!** 🎉

---

## ✅ 5-Minute Feature Test Checklist

### Test 1: Admin Login (30 seconds)
- [ ] Navigate to `/admin/login`
- [ ] Enter username: `admin`, password: `admin123`
- [ ] Click "Sign In"
- [ ] **Expected:** Redirect to `/admin/dashboard`
- [ ] **Expected:** See "System Administrator" in sidebar

---

### Test 2: Overview Dashboard (1 minute)
- [ ] Click "📊 Overview" in sidebar (should be default)
- [ ] **Expected:** See 6 metric cards:
  - Total Restaurants
  - Total Customers
  - Total Orders
  - Total Revenue (in VND)
  - Total Drones
  - Pending Approvals
- [ ] **Expected:** Restaurant table below metrics
- [ ] Click "🔄 Refresh" button
- [ ] **Expected:** Toast notification "Data refreshed"

---

### Test 3: Restaurant Management (1 minute)
- [ ] Click "🏪 Restaurants" in sidebar
- [ ] **Expected:** See table with all restaurants
- [ ] Try search bar (type "Aloha")
- [ ] **Expected:** Filters to show only matching restaurants
- [ ] Click filter buttons (Active, Pending, Inactive)
- [ ] **Expected:** List updates based on filter
- [ ] Find an "Active" restaurant
- [ ] Click "Suspend" button
- [ ] **Expected:** Confirmation modal appears
- [ ] Click "Confirm"
- [ ] **Expected:**
  - Toast: "Restaurant [name] suspended successfully"
  - Status badge changes to 🔴 Suspended
  - Filter count updates

---

### Test 4: Customer Management (1 minute)
- [ ] Click "👥 Customers" in sidebar
- [ ] **Expected:** See table with all customers
- [ ] Click "View" on any customer
- [ ] **Expected:** Modal shows customer details
- [ ] Close modal
- [ ] Find an "Active" customer
- [ ] Click "Suspend"
- [ ] **Expected:** Confirmation modal with warnings
- [ ] Click "Confirm Suspension"
- [ ] **Expected:**
  - Toast: "Customer [name] suspended successfully"
  - Status changes to Suspended
  - Action appears in logs

---

### Test 5: Drone Fleet Monitor (1.5 minutes)
- [ ] Click "🚁 Drone Fleet" in sidebar
- [ ] **Expected:** Drones grouped by restaurant
- [ ] Click status filters (Idle, Delivering, Charging, Maintenance)
- [ ] **Expected:** List filters accordingly
- [ ] Find an "Idle" drone
- [ ] **Expected:** See two buttons: "🚩 Flag Issue" and "🔄 Reassign"

#### Test 5a: Flag Drone
- [ ] Click "🚩 Flag Issue"
- [ ] **Expected:** Modal opens
- [ ] Enter issue description (e.g., "Battery degradation detected")
- [ ] Click "Flag Drone"
- [ ] **Expected:**
  - Toast: "Drone [ID] flagged for maintenance"
  - Drone card shows red border
  - Red flag 🚩 appears on card
  - Status changes to "Maintenance"
  - Issue description appears in yellow box

#### Test 5b: Reassign Drone (🆕 NEW FEATURE)
- [ ] Find a different "Idle" drone (not flagged)
- [ ] Click "🔄 Reassign"
- [ ] **Expected:** Modal shows dropdown with active restaurants
- [ ] Select a different restaurant
- [ ] Click "Confirm Reassignment"
- [ ] **Expected:**
  - Toast: "Drone [ID] reassigned to [Restaurant]"
  - Drone moves to new restaurant section
  - Log entry created

---

### Test 6: System Logs (30 seconds)
- [ ] Click "📋 System Logs" in sidebar
- [ ] **Expected:** See all previous actions logged
- [ ] **Expected:** Recent actions at top (newest first)
- [ ] Try severity filters (Info, Warning, Critical)
- [ ] **Expected:** Logs filter by severity
- [ ] Try target filters (Restaurant, Customer, Drone)
- [ ] **Expected:** Logs filter by target type
- [ ] **Expected:** See timestamps like "2m ago", "1h ago"

---

### Test 7: Emergency Override (🆕 NEW FEATURE) (30 seconds)
- [ ] Click "⚠️ Emergency Override" button (top bar)
- [ ] **Expected:** Modal opens with warning box
- [ ] Select Target Type (e.g., "Order")
- [ ] Enter Target ID (e.g., "ORD-12345")
- [ ] Enter Target Name (e.g., "Critical Order")
- [ ] Enter Action Details (e.g., "Force cancel due to emergency")
- [ ] **Expected:** "Execute" button is disabled until all fields filled
- [ ] Click "Execute Emergency Override"
- [ ] **Expected:**
  - Toast warning appears
  - Modal closes
  - Action logged with CRITICAL severity in System Logs

---

### Test 8: Data Persistence (30 seconds)
- [ ] Make a change (suspend a restaurant or customer)
- [ ] Click "Logout" button
- [ ] **Expected:** Redirect to `/admin/login`
- [ ] Login again (admin / admin123)
- [ ] Navigate to where you made the change
- [ ] **Expected:** Change persists (still suspended)
- [ ] Navigate to System Logs
- [ ] **Expected:** Previous actions still logged

---

### Test 9: Responsive Design (30 seconds)
- [ ] Open browser DevTools (F12)
- [ ] Toggle device toolbar (mobile view)
- [ ] **Expected:**
  - Sidebar adapts to mobile
  - Tables scroll horizontally
  - Buttons stack vertically
  - Everything remains functional

---

### Test 10: Navigation & Logout (30 seconds)
- [ ] Click through all tabs in sidebar
- [ ] **Expected:** Page title updates
- [ ] **Expected:** Content changes
- [ ] **Expected:** Active tab highlighted in sidebar
- [ ] Click "Logout"
- [ ] **Expected:** Redirect to `/admin/login`
- [ ] Try navigating to `/admin/dashboard` directly
- [ ] **Expected:** Redirected back to `/admin/login`

---

## 🎯 Expected Results Summary

If all tests pass, you should see:

✅ **Smooth navigation** between all admin sections  
✅ **Real-time toast notifications** on all actions  
✅ **Confirmation modals** before critical operations  
✅ **Data persistence** across logout/login  
✅ **Color-coded status badges** (🟢 🟠 🔴)  
✅ **Search and filter** functionality working  
✅ **System logs** tracking all admin actions  
✅ **Emergency override** working with critical warnings  
✅ **Drone reassignment** between restaurants  
✅ **Responsive design** on mobile devices  

---

## 🐛 Common Issues & Solutions

### Issue: "Admin not found" error
**Solution:** Make sure you're using the correct credentials:
- Username: `admin` (lowercase)
- Password: `admin123`

### Issue: Changes don't persist
**Solution:** Check browser localStorage:
1. Open DevTools → Application → Local Storage
2. Look for keys starting with `admin_`
3. If missing, refresh the page to reinitialize

### Issue: Build fails
**Solution:**
```bash
cd web
rm -rf node_modules
npm install
npm run build
```

### Issue: Dev server won't start
**Solution:** Check if port 5173 is available:
```bash
# Kill any process using port 5173
# Then restart:
npm run dev
```

---

## 📊 Performance Expectations

- **Page Load:** < 2 seconds
- **Tab Switch:** Instant
- **Search/Filter:** < 100ms
- **Modal Open/Close:** Smooth animation (300ms)
- **Toast Notifications:** 3 seconds display time
- **Data Refresh:** < 500ms

---

## 🔍 Inspection Points

### LocalStorage Keys to Check
Open DevTools → Application → Local Storage:
```
✅ admin_auth              - Admin session
✅ admin_restaurants       - Restaurant data
✅ admin_customers         - Customer data
✅ admin_drones           - Drone fleet data
✅ admin_system_logs      - Action logs
```

### Console Errors
Should see **zero errors** in browser console.

### Network Tab
Should see **no failed requests** (all data is localStorage-based).

---

## 🎉 Success Criteria

**Your admin dashboard is working correctly if:**

1. ✅ You can login and logout
2. ✅ All 5 tabs are accessible and functional
3. ✅ Actions trigger appropriate toasts
4. ✅ Modals open/close smoothly
5. ✅ Data persists across sessions
6. ✅ Filters and search work
7. ✅ System logs track all actions
8. ✅ Emergency override executes
9. ✅ Drone reassignment works
10. ✅ No console errors

---

## 📞 Quick Reference

| Feature | Location | Action |
|---------|----------|--------|
| Login | `/admin/login` | admin / admin123 |
| Overview | Dashboard → Overview | View metrics |
| Manage Restaurants | Dashboard → Restaurants | Approve/Suspend |
| Manage Customers | Dashboard → Customers | Suspend/View |
| Monitor Drones | Dashboard → Drone Fleet | Flag/Reassign |
| View Logs | Dashboard → System Logs | Filter logs |
| Emergency Action | Top bar button | Override modal |
| Logout | Top bar button | End session |

---

**Test Duration:** ~5 minutes for full walkthrough  
**Difficulty:** Easy  
**Prerequisites:** Node.js, npm, browser with DevTools

Happy Testing! 🚀

