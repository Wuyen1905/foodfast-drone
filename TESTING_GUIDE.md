# Restaurant Dashboard Testing Guide

## 🧪 Quick Test Scenarios

### Prerequisites
```bash
cd web
npm run dev
```

---

## Test 1: SweetDreams Bakery 🧁

### Login
- **URL:** `http://localhost:5173/login`
- **Username:** `sweetdreams`
- **Password:** `sweet123`

### Expected Behavior
1. ✅ Login successful without errors
2. ✅ Redirects to SweetDreams dashboard
3. ✅ Dashboard loads with pink theme
4. ✅ No blank white screen

### Test Menu Management
1. Click **"🍽️ Thực đơn"** tab
2. ✅ See list of desserts (cupcakes, ice cream, tiramisu, etc.)
3. Click **"✏️ Sửa"** on any dish
   - ✅ Modal opens with "✏️ Sửa Dish" title
   - ✅ Form populated with dish data
   - ✅ Can edit and save
4. Click **"➕ Thêm món mới"**
   - ✅ Modal opens with "➕ Add New Dish" title
   - ✅ Can add new dish
5. Try to add dish with invalid price (e.g., "-5" or "abc")
   - ✅ Shows validation error message

### Test Order Tracking
1. Click **"📦 Theo dõi đơn hàng"** tab
2. ✅ Stats cards display correctly
3. ✅ Orders list shows (if any orders exist)
4. ✅ Can update order status

### Console Check
- ✅ No red error messages
- ✅ No styled-components warnings

---

## Test 2: Aloha Kitchen 🌺

### Login
- **URL:** `http://localhost:5173/login`
- **Username:** `aloha_restaurant`
- **Password:** `aloha123`

### Expected Behavior
1. ✅ Login successful without errors
2. ✅ Redirects to Aloha dashboard
3. ✅ Dashboard loads with orange/yellow theme
4. ✅ No blank white screen

### Test Menu Management
1. Click **"🍽️ Thực đơn"** tab
2. ✅ See list of Asian fusion dishes
3. Test edit/add functionality (same as SweetDreams)
4. ✅ All buttons work correctly

### Test Order Tracking
1. Click **"📦 Theo dõi đơn hàng"** tab
2. ✅ Stats display correctly
3. ✅ Vietnamese labels show properly

---

## Test 3: Original Restaurant Dashboard 🍕

### Login
- **URL:** `http://localhost:5173/login`
- **Username:** `admin`
- **Password:** `admin123`

### Navigate to Restaurant
- **URL:** `http://localhost:5173/restaurant`

### Expected Behavior
1. ✅ Dashboard loads without errors
2. ✅ No "Cannot read properties of null (reading 'user')" error
3. ✅ Loading state shows briefly (⏳ icon)
4. ✅ Statistics cards display correctly:
   - Total customers
   - Total orders
   - Active drones
   - Completed deliveries

### Test Order Management
1. ✅ Orders table displays
2. Click action buttons:
   - **"Chuẩn bị"** (Processing)
   - **"Giao hàng"** (Delivering)
   - **"Hoàn tất"** (Completed)
3. ✅ Status updates successfully
4. ✅ Toast notifications appear
5. ✅ No console errors

### Test Refresh & Demo
1. Click **"🔄 Làm mới"**
   - ✅ Shows loading state
   - ✅ Success message appears
2. Click **"🛩️ Demo Drone"**
   - ✅ Drone animation appears
   - ✅ Can pause/resume animation

---

## Test 4: Error Handling

### Invalid Login
1. Try logging in with wrong credentials
2. ✅ Shows error message
3. ✅ Doesn't crash

### Network Simulation
1. Open DevTools → Network tab
2. Set to "Offline"
3. Try updating order status
4. ✅ Shows error toast
5. ✅ Doesn't crash app

### Invalid Input
1. In Menu Management, try to add dish with:
   - Empty name → ✅ Browser validation
   - Negative price → ✅ Shows validation error
   - Invalid image URL → ✅ Handles gracefully

---

## Test 5: Navigation & Routing

### Direct URL Access
1. Try accessing `/sweetdreams` without login
   - ✅ Redirects to login
2. Try accessing `/aloha` without login
   - ✅ Redirects to login
3. Try accessing restaurant pages with customer account
   - ✅ Shows "Access Denied" message

---

## Test 6: Browser Console Checks

### What to Look For

**✅ GOOD - Should see:**
- React DevTools installed messages
- API request logs (if any)
- Successful state updates

**❌ BAD - Should NOT see:**
- ❌ Uncaught TypeError
- ❌ Cannot read properties of null
- ❌ ReferenceError: [variable] is not defined
- ❌ Warning: React does not recognize the `variant` prop
- ❌ Warning: React does not recognize the `status` prop

---

## Test 7: Mobile Responsiveness

### Test on Different Screens
1. Open DevTools → Toggle device toolbar (Ctrl+Shift+M)
2. Test sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)

### Expected Behavior
- ✅ Menu cards stack on mobile
- ✅ Tables scroll horizontally on mobile
- ✅ Buttons remain accessible
- ✅ Modals fit screen size

---

## 🐛 Known Issues (If Any)

### None! All critical issues resolved ✅

---

## 📊 Success Criteria

### All Tests Pass When:
- [ ] All 3 restaurant dashboards load without errors
- [ ] No console errors (red text)
- [ ] No styled-components warnings
- [ ] All buttons and forms work correctly
- [ ] Error handling works (shows toast messages)
- [ ] Loading states display properly
- [ ] Can add/edit/delete menu items
- [ ] Can update order statuses
- [ ] Mobile layout works

---

## 🚨 If Tests Fail

### Debugging Steps:
1. Check console for specific error messages
2. Verify you're logged in with correct credentials
3. Clear browser cache and localStorage
4. Restart dev server (`npm run dev`)
5. Check if you're on the latest code (git pull)

### Common Solutions:
- **White screen:** Check console, likely missing loading state
- **User null error:** Verify auth context is working
- **Styled warnings:** Check for props without `$` prefix
- **Build errors:** Run `npm install` to update dependencies

---

## 📞 Support

If you encounter issues not covered here:
1. Check `CRITICAL_FIXES_SUMMARY.md` for detailed fix information
2. Review console error messages
3. Verify all files are saved and server restarted

---

**Happy Testing! 🎉**

