# 🚀 Quick Start Guide - User Dashboard Upgrade

## ⚡ Get Started in 60 Seconds

---

## 1️⃣ Start the Application

```bash
cd web
npm run dev
```

**Expected Output:**
```
  VITE v5.4.20  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## 2️⃣ Open Your Browser

Visit: **http://localhost:5173**

You will **automatically** be redirected to `/menu`

---

## 3️⃣ Test as Guest

### What You'll See:
```
🚁 Giao hàng bằng drone nhanh chóng
Đặt món ăn yêu thích và nhận giao hàng bằng drone trong vài phút.
[ Đăng nhập để đặt món ]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chào mừng đến với FoodFast!
Đăng nhập để có thể đặt món ăn, theo dõi đơn hàng...
[ Đăng nhập ngay ]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Khám phá món ăn

[Product Grid with images and prices]
```

---

## 4️⃣ Login as User

### Click "Đăng nhập ngay"

**Credentials:**
```
Username: user
Password: user123
```

**OR**

```
Username: user1
Password: user123
```

---

## 5️⃣ Test Unified Menu

### After Login, You'll See:

#### ✅ Hero Section (Top)
- Welcome banner with drone icon
- "Xem giỏ hàng" button

#### ✅ Search & Filters
- Search box: "🔍 Tìm kiếm món ăn..."
- Category dropdown
- Tag filter (Hot 🔥 / New ✨)

#### ✅ Product Grid
- All available dishes
- Add to cart buttons
- View details links

---

## 6️⃣ Test Key Features

### Search
```
1. Type "rice" in search box
2. Products filter instantly
3. Try "pho" or "burger"
```

### Category Filter
```
1. Click category dropdown
2. Select "Asian" or "Dessert"
3. Products update
```

### Add to Cart
```
1. Click "Thêm vào giỏ" on any product
2. See success notification
3. Cart counter updates in navbar
```

### View Cart
```
1. Click "Xem giỏ hàng" in hero
   OR
2. Click "Giỏ hàng" in navbar
3. Review added items
```

---

## 7️⃣ Verify Navigation

### Check Navigation Bar

**Should show:**
- ✅ `Thực đơn` (active)
- ✅ `Giỏ hàng` (with counter)
- ✅ `Thanh toán`
- ✅ `Theo dõi đơn hàng`
- ✅ User greeting: "Xin chào, [name]!"
- ✅ `Đăng xuất` button

**Should NOT show:**
- ❌ `Trang chủ` tab (removed!)

---

## 8️⃣ Test URL Redirects

### Try These URLs:

```bash
# All should redirect to /menu:
http://localhost:5173/
http://localhost:5173/home
http://localhost:5173/homepage
```

**Expected:** All redirect to `/menu` automatically

---

## 9️⃣ Test Mobile View

### Resize Browser

**Steps:**
1. Press `F12` (DevTools)
2. Click device toolbar icon
3. Select "iPhone 12" or "iPad"

**What to Check:**
- ✅ Hamburger menu (☰) appears
- ✅ Hero section stacks vertically
- ✅ Search/filters stack in column
- ✅ Product grid: 1 column on mobile
- ✅ All buttons are tappable

---

## 🔟 Test Complete Flow

### End-to-End Test (2 minutes)

```
1. Visit site → lands on /menu ✅
2. See hero + login prompt ✅
3. Click login ✅
4. Enter user/user123 ✅
5. Back to unified /menu ✅
6. Search "fried rice" ✅
7. Filter by category ✅
8. Add 2 items to cart ✅
9. Click "Xem giỏ hàng" ✅
10. View cart contents ✅
11. Logout ✅
12. Redirected back to /menu ✅
```

**If all ✅, you're done!**

---

## 🎯 Common Test Scenarios

### Scenario 1: New User
```
Visit → See welcome → Login → Browse → Add to cart → Checkout
Time: ~30 seconds
```

### Scenario 2: Returning User
```
Visit → Already logged in → Browse → Quick add → Checkout
Time: ~15 seconds
```

### Scenario 3: Search & Filter
```
Visit → Login → Search "noodles" → Filter "Asian" → Add → Cart
Time: ~20 seconds
```

---

## 🐛 Troubleshooting

### Issue: Home page still shows
**Solution:**
```bash
# Clear browser cache
Ctrl + Shift + Delete (Chrome)
# Hard reload
Ctrl + Shift + R
```

### Issue: Navigation shows "Trang chủ"
**Solution:**
```bash
cd web
npm run build
npm run dev
# Force refresh browser
```

### Issue: Filters not working
**Solution:**
```bash
# Check console (F12)
# Look for JavaScript errors
# Verify React is loaded
```

### Issue: Can't add to cart
**Solution:**
```bash
# Make sure you're logged in
# Check CartContext is working
# Verify product has valid ID
```

---

## 📊 Success Indicators

### ✅ Everything is working if:

- [ ] URL redirects to `/menu`
- [ ] No "Trang chủ" in navigation
- [ ] Hero banner displays
- [ ] Search works instantly
- [ ] Filters update products
- [ ] Add to cart succeeds
- [ ] Cart counter updates
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Smooth animations

---

## 🎉 You're Done!

If all tests pass, the unified Menu page is working perfectly!

---

## 📚 Additional Resources

### Full Documentation:
- **Technical Details:** `USER_DASHBOARD_UPGRADE.md`
- **Test Checklist:** `USER_DASHBOARD_TEST_CHECKLIST.md`
- **Visual Guide:** `VISUAL_COMPARISON.md`
- **Summary:** `USER_DASHBOARD_SUMMARY.md`

### Code Locations:
- **Menu Page:** `web/src/pages/Menu.tsx`
- **Navigation:** `web/src/components/Navbar.tsx`
- **Routing:** `web/src/pages/App.tsx`

---

## 🆘 Need Help?

### Check These First:
1. Build successful? `npm run build`
2. Dev server running? `npm run dev`
3. Browser console clear? (F12)
4. Cache cleared? (Ctrl+Shift+Del)

### Quick Fixes:
```bash
# Clean restart
cd web
npm install
npm run build
npm run dev
```

---

## ⏱️ Time Estimate

| Task | Time |
|------|------|
| Start server | 30 sec |
| Test as guest | 1 min |
| Login & browse | 2 min |
| Test features | 3 min |
| Mobile test | 2 min |
| **Total** | **~8 min** |

---

## 🏁 Quick Status Check

Run this quick checklist:

```bash
✓ Server running? → Yes/No
✓ Opens on /menu? → Yes/No
✓ Login works? → Yes/No
✓ Search works? → Yes/No
✓ Cart works? → Yes/No
✓ Mobile works? → Yes/No
```

**All Yes?** → 🎉 **SUCCESS!**

---

*Happy Testing! 🚀*

*Generated: October 21, 2025*
*FoodFast Drone Delivery - User Dashboard Upgrade*

