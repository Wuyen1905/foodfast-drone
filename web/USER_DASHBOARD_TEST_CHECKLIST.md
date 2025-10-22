# ✅ User Dashboard Test Checklist

## 🎯 Quick Verification Guide

Use this checklist to verify the merged Menu page is working correctly for both `user` and `user1` accounts.

---

## 📋 Pre-Test Setup

### 1. Start Development Server
```bash
cd web
npm run dev
```

### 2. Open Browser
```
URL: http://localhost:5173
```

---

## 🧪 Test Cases

### ✅ Test 1: Home Route Redirect
**Steps:**
1. Navigate to `http://localhost:5173/`
2. Check URL changes to `/menu`

**Expected Result:**
- ✅ URL automatically redirects to `/menu`
- ✅ Unified Menu page displays

---

### ✅ Test 2: Legacy Route Redirects
**Steps:**
1. Try `http://localhost:5173/home`
2. Try `http://localhost:5173/homepage`

**Expected Result:**
- ✅ Both redirect to `/menu`
- ✅ No 404 errors

---

### ✅ Test 3: Guest User Experience
**Steps:**
1. Logout if logged in
2. Visit `/menu` as guest

**Expected Result:**
- ✅ Hero banner displays: "Giao hàng bằng drone nhanh chóng 🚁"
- ✅ Login prompt shows: "Chào mừng đến với FoodFast!"
- ✅ CTA button: "Đăng nhập ngay"
- ✅ Can see product preview (limited functionality)

---

### ✅ Test 4: User Account Login
**Credentials:**
```
Username: user
Password: user123
```

**Steps:**
1. Click "Đăng nhập ngay"
2. Enter credentials
3. Submit login form

**Expected Result:**
- ✅ Redirects to `/menu` after login
- ✅ Hero banner displays with "Xem giỏ hàng" button
- ✅ Welcome message shows
- ✅ Full menu catalog visible
- ✅ Search bar and filters appear

---

### ✅ Test 5: User1 Account Login
**Credentials:**
```
Username: user1
Password: user123
```

**Steps:**
1. Logout from `user` account
2. Login with `user1` credentials

**Expected Result:**
- ✅ Same unified Menu page experience
- ✅ All features accessible
- ✅ No role conflicts

---

### ✅ Test 6: Navigation Bar
**Steps:**
1. Check navigation tabs (logged in as user)

**Expected Result:**
- ✅ "Trang chủ" tab is **removed**
- ✅ "Thực đơn" tab is present and active
- ✅ "Giỏ hàng" shows (for customers)
- ✅ "Thanh toán" shows (for customers)
- ✅ "Theo dõi đơn hàng" shows (for logged-in users)
- ✅ Brand logo links to `/menu`

---

### ✅ Test 7: Search Functionality
**Steps:**
1. Login as `user`
2. Type "rice" in search bar
3. Type "pho" in search bar

**Expected Result:**
- ✅ Results filter in real-time
- ✅ Product count updates
- ✅ "No results" message if no matches

---

### ✅ Test 8: Category Filter
**Steps:**
1. Select different categories from dropdown

**Expected Result:**
- ✅ Products filter by selected category
- ✅ "Tất cả danh mục" shows all products
- ✅ Combines with search filter

---

### ✅ Test 9: Tag Filter
**Steps:**
1. Select "🔥 Hot" tag
2. Select "✨ New" tag
3. Select "Tất cả" (All)

**Expected Result:**
- ✅ Products filter by tag
- ✅ Hot items show red 🔥 badge
- ✅ New items show blue ✨ badge
- ✅ "All" shows everything

---

### ✅ Test 10: Add to Cart
**Steps:**
1. Click "Thêm vào giỏ" on any product
2. Check cart counter in navigation

**Expected Result:**
- ✅ Success toast notification
- ✅ Cart counter increments
- ✅ Product added to cart

---

### ✅ Test 11: View Product Details
**Steps:**
1. Click on any product card
2. Should open details page

**Expected Result:**
- ✅ Navigates to `/menu/:id` or `/details/:id`
- ✅ Product details display
- ✅ Can add to cart from details page

---

### ✅ Test 12: Hero Section CTA
**Steps:**
1. Click "Xem giỏ hàng" in hero section

**Expected Result:**
- ✅ Navigates to `/cart`
- ✅ Cart page displays
- ✅ Added items visible

---

### ✅ Test 13: Responsive Design
**Steps:**
1. Resize browser to mobile width (< 768px)
2. Check layout and controls

**Expected Result:**
- ✅ Navigation collapses to hamburger menu
- ✅ Search/filters stack vertically
- ✅ Product grid shows 1 column
- ✅ Hero section responsive
- ✅ All buttons touchable

---

### ✅ Test 14: Tablet View
**Steps:**
1. Resize to tablet width (768px - 1024px)

**Expected Result:**
- ✅ Grid adjusts to available space
- ✅ Filters remain usable
- ✅ Navigation readable

---

### ✅ Test 15: Animation Performance
**Steps:**
1. Reload `/menu` page
2. Observe product card animations

**Expected Result:**
- ✅ Hero section fades in smoothly
- ✅ Product cards animate in sequence
- ✅ Hover effects work on cards
- ✅ No lag or jank

---

### ✅ Test 16: Logout & Re-login
**Steps:**
1. Click "Đăng xuất"
2. Verify redirect to `/menu`
3. Login again

**Expected Result:**
- ✅ Logout successful toast
- ✅ Redirects to `/menu` as guest
- ✅ Login prompt reappears
- ✅ Can login again successfully

---

### ✅ Test 17: Direct URL Access
**Steps:**
1. Type `http://localhost:5173/menu` directly in address bar

**Expected Result:**
- ✅ Page loads correctly
- ✅ Hero section visible
- ✅ Products load properly

---

### ✅ Test 18: Browser Back Button
**Steps:**
1. Navigate: Menu → Cart → Back button

**Expected Result:**
- ✅ Returns to Menu page
- ✅ State preserved (search, filters)
- ✅ No errors

---

### ✅ Test 19: Empty Search Results
**Steps:**
1. Type gibberish in search: "xyz123abc"

**Expected Result:**
- ✅ Shows message: "Không tìm thấy món ăn phù hợp. Hãy thử tìm kiếm khác!"
- ✅ No error thrown
- ✅ Can clear search to see all products

---

### ✅ Test 20: Multi-Filter Combination
**Steps:**
1. Search: "rice"
2. Category: "Asian"
3. Tag: "Hot"

**Expected Result:**
- ✅ All three filters apply simultaneously
- ✅ Results match all criteria
- ✅ Clear filters restores full list

---

## 🎯 Success Criteria

### All Tests Must Pass:
- ✅ **20/20** tests passing
- ✅ No console errors
- ✅ No broken links
- ✅ Responsive on all devices
- ✅ Fast load times
- ✅ Smooth animations

---

## 🐛 Common Issues & Solutions

### Issue 1: Home page still appears
**Solution:** Clear browser cache and hard reload (Ctrl+Shift+R)

### Issue 2: Navigation shows "Trang chủ"
**Solution:** Verify `Navbar.tsx` changes, rebuild project

### Issue 3: Filters not working
**Solution:** Check browser console for errors, verify state management

### Issue 4: Cart not updating
**Solution:** Verify CartContext is properly wrapped in App

### Issue 5: Login redirect issues
**Solution:** Check AuthContext and ProtectedRoute logic

---

## 📊 Test Results

| Test # | Test Name | Status | Notes |
|--------|-----------|--------|-------|
| 1 | Home Redirect | ⬜ | |
| 2 | Legacy Redirects | ⬜ | |
| 3 | Guest Experience | ⬜ | |
| 4 | User Login | ⬜ | |
| 5 | User1 Login | ⬜ | |
| 6 | Navigation | ⬜ | |
| 7 | Search | ⬜ | |
| 8 | Category Filter | ⬜ | |
| 9 | Tag Filter | ⬜ | |
| 10 | Add to Cart | ⬜ | |
| 11 | View Details | ⬜ | |
| 12 | Hero CTA | ⬜ | |
| 13 | Mobile View | ⬜ | |
| 14 | Tablet View | ⬜ | |
| 15 | Animations | ⬜ | |
| 16 | Logout/Login | ⬜ | |
| 17 | Direct URL | ⬜ | |
| 18 | Back Button | ⬜ | |
| 19 | Empty Results | ⬜ | |
| 20 | Multi-Filter | ⬜ | |

---

## ✅ Sign-Off

**Tester Name:** _________________

**Date:** _________________

**Build Version:** _________________

**All Tests Passed:** ⬜ Yes  ⬜ No

**Notes:**
```
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
```

---

*Generated: October 21, 2025*
*Project: FoodFast Drone Delivery - User Dashboard Upgrade*

