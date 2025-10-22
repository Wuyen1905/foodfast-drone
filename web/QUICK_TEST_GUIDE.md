# 🚀 Quick Test Guide - Role-Based Menu System

## 📋 Prerequisites
```bash
cd web
npm install  # If not already installed
npm run dev  # Start the development server
```

Server will run at: **http://localhost:5173**

---

## 🧪 Test Scenarios

### 🏪 Test 1: Restaurant Account (SweetDreams Bakery)

**Login:**
- Username: `sweetdreams`
- Password: `sweet123`

**Expected Behavior:**
1. ✅ Auto-redirect to `/restaurant` dashboard
2. ✅ See "Bảng điều khiển nhà hàng" header
3. ✅ Click on "🍽️ Quản lý Menu" tab

**Menu Management Features to Test:**
- [x] See 6 dessert items (Strawberry Dream, Chocolate Heaven, etc.)
- [x] Use search bar to find "Chocolate" → filters results
- [x] Use category filter to show only "Dessert" items
- [x] Click "➕ Thêm món mới" → modal opens
  - Fill in: Name, Price, Description, Image URL, Category, Tag
  - Check "Available" checkbox
  - Click "Thêm món ăn" → success toast
- [x] Click "✏️ Sửa" on any dish → edit modal opens
  - Modify price or description
  - Click "Cập nhật món ăn" → update toast
- [x] Click "⏸️ Tạm ngưng" → badge changes to "⛔ Tạm ngưng"
- [x] Click "▶️ Kích hoạt" → badge changes back to "✅ Đang phục vụ"
- [x] Click "🗑️ Xóa" → confirmation dialog → deleted

**What Should NOT Work:**
- ❌ Navigate to `/menu` → auto-redirect back to `/restaurant`
- ❌ Navigate to `/cart` → blocked (no access)
- ❌ Try to add items to cart → not possible (no cart button visible)

---

### 🏪 Test 2: Restaurant Account (Aloha Kitchen)

**Login:**
- Username: `aloha_restaurant`
- Password: `aloha123`

**Expected Behavior:**
1. ✅ Auto-redirect to `/restaurant` dashboard
2. ✅ See 9 Asian/Hawaiian dishes (Hawaiian Fried Rice, Bento Box, Dim Sum, etc.)
3. ✅ All menu management features work same as above
4. ✅ Only sees dishes with `restaurantId === 'restaurant_2'`

---

### 👤 Test 3: Customer Account

**Login:**
- Username: `user`
- Password: `user123`

**Expected Behavior:**
1. ✅ Can access `/menu` page
2. ✅ See ALL products from all restaurants (21 total items)
3. ✅ Can search and filter products
4. ✅ Each product card shows:
   - "Thêm vào giỏ" button → click → success toast
   - Heart icon for wishlist → click → success toast

**What Should Work:**
- ✅ Click "Thêm vào giỏ" → toast: "🛒 Đã thêm vào giỏ hàng!"
- ✅ Click heart icon → toast: "Đã thêm vào danh sách yêu thích ❤️"
- ✅ Navigate to `/cart` → view cart items
- ✅ Navigate to `/checkout` → proceed to checkout
- ✅ Navigate to `/orders` → view order history

**What Should NOT Work:**
- ❌ Navigate to `/restaurant` → auto-redirect to `/menu`
- ❌ Access restaurant dashboard

---

### 🏪 Test 4: Restaurant Tries to Add to Cart (Error Case)

**Login as:** `sweetdreams` / `sweet123`

**Steps:**
1. Navigate to `/menu` → auto-redirected to `/restaurant` ✅
2. Try to manually navigate to `/menu` → redirected again ✅
3. System prevents restaurant from shopping ✅

**Expected:**
- Toast notification: "🏪 Chuyển hướng đến bảng điều khiển nhà hàng..."

---

### 👨‍💼 Test 5: Admin Account

**Login:**
- Username: `admin`
- Password: `admin123`

**Expected Behavior:**
1. ✅ Redirect to admin dashboard
2. ✅ Can view all users, restaurants, orders
3. ✅ Cannot access restaurant or customer routes
4. ✅ Has separate admin interface

---

## 🎯 Quick Feature Checklist

### Restaurant Features:
- [x] View only their own dishes
- [x] Add new dish with full form
- [x] Edit existing dish
- [x] Toggle availability (Available ↔ Tạm ngưng)
- [x] Delete dish with confirmation
- [x] Search dishes by name/description
- [x] Filter dishes by category
- [x] Cannot add to cart (blocked with message)
- [x] Cannot access customer routes
- [x] See analytics dashboard

### Customer Features:
- [x] Browse all products from all restaurants
- [x] Add items to cart
- [x] Add items to wishlist
- [x] Search and filter products
- [x] Proceed to checkout
- [x] Cannot access restaurant dashboard

### Admin Features:
- [x] Access admin control panel
- [x] View all data
- [x] Cannot be mistaken for other roles

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot add to cart" button not showing
**Solution:** Make sure you're logged in as a customer (`user`/`user123`)

### Issue: Restaurant sees wrong products
**Solution:** Check that `restaurantId` matches in product data

### Issue: Modal doesn't open
**Solution:** Check browser console for errors, refresh page

### Issue: Toast notifications not showing
**Solution:** Verify `react-hot-toast` is installed: `npm install react-hot-toast`

### Issue: Redirect loop
**Solution:** Clear localStorage and login again

---

## 📊 Test Data Summary

### Restaurants:
| ID | Name | Owner | Dish Count |
|----|------|-------|------------|
| rest_2 | SweetDreams Bakery | sweetdreams | 6 desserts |
| restaurant_2 | Aloha Kitchen | aloha_restaurant | 9 Asian/Hawaiian |
| rest_1 | FoodFast Restaurant | (admin) | 6 burgers/pizza/sushi |

### Users:
| Username | Password | Role | Access |
|----------|----------|------|--------|
| sweetdreams | sweet123 | restaurant | Manage SweetDreams menu |
| aloha_restaurant | aloha123 | restaurant | Manage Aloha Kitchen menu |
| user | user123 | customer | Shop & order |
| user1 | user1123 | customer | Shop & order |
| admin | admin123 | admin | Full system access |

---

## ✅ Success Indicators

You'll know the system works correctly when:

1. **Restaurant login** → Auto-redirect to dashboard → See only their dishes
2. **Customer login** → Can shop → Add to cart works → See all products
3. **Admin login** → Access admin panel → Cannot shop
4. **Role protection** → Each role cannot access other role's features
5. **Toast notifications** → Clear feedback for all actions
6. **Search & filter** → Works in both restaurant and customer views
7. **Availability toggle** → Instant visual feedback with badge change
8. **No errors** → Clean console, no broken imports

---

## 🎉 Testing Complete!

If all the above scenarios work as expected, the role-based menu system is **production-ready**!

**Next Steps:**
1. Test on different browsers (Chrome, Firefox, Safari)
2. Test on mobile devices (responsive design)
3. Test edge cases (empty states, long descriptions, etc.)
4. Perform load testing with multiple concurrent users
5. Integrate with real backend API
6. Deploy to staging environment

---

**Happy Testing! 🚀**

