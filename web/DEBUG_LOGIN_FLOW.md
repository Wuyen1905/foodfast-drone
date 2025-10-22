# 🔍 Restaurant Login Flow - Debug Guide

## ✅ Debug Logging Added

Comprehensive console logging has been added to trace the entire restaurant login flow from form submission to dashboard rendering.

## 📋 What Was Changed

### 1. **AuthContext.tsx** - Authentication State Management
Added logging for:
- Login attempt initiation
- User authentication success/failure
- User state updates
- localStorage synchronization

### 2. **Login.tsx** - Login Form & Redirect Logic
Added logging for:
- Form submission
- Login API call and response
- loginSuccess flag setting
- useEffect trigger for navigation
- Redirect path calculation
- navigate() execution

### 3. **Restaurant Dashboard Components**
Added mount logging for:
- `SweetDreamsDashboard.tsx`
- `AlohaKitchenDashboard.tsx`

### 4. **Fixed Redirect Paths** ⚠️ **CRITICAL FIX**
Updated the redirect URLs to match the new route structure:
- ✅ SweetDreams: `/sweetdreams` → `/restaurant/sweetdreams`
- ✅ Aloha: `/aloha` → `/restaurant/aloha`

## 🧪 How to Test

### Step 1: Open Browser Console
1. Open the app at `http://localhost:5174/`
2. Press `F12` to open DevTools
3. Go to the **Console** tab
4. Clear the console (`Ctrl+L` or click 🚫)

### Step 2: Test SweetDreams Login
1. Navigate to `/login`
2. Enter credentials:
   - Username: `sweetdreams`
   - Password: `sweet123`
3. Click "Đăng nhập"
4. Watch the console for the following sequence:

```
📝 [Login] Form submitted with username: sweetdreams
📞 [Login] Calling login() function...
🔐 [AuthContext] Login attempt: { username: 'sweetdreams' }
✅ [AuthContext] User found: { username: 'sweetdreams', role: 'restaurant', restaurantId: 'rest_2', name: 'SweetDreams Owner' }
✅ [AuthContext] Login successful, user state updated
💾 [AuthContext] Storing user in localStorage: { username: 'sweetdreams', role: 'restaurant', restaurantId: 'rest_2' }
✅ [AuthContext] User state synchronized to localStorage
📨 [Login] Login response received: { ok: true }
✅ [Login] Login succeeded, showing success toast
🎯 [Login] Setting loginSuccess flag to true
✅ [Login] loginSuccess flag set, useEffect should trigger soon
🔄 [Login useEffect] Triggered with: { loginSuccess: true, hasUser: true, username: 'sweetdreams', role: 'restaurant' }
🧭 [Login] Calculating redirect path for user: { username: 'sweetdreams', role: 'restaurant', restaurantId: 'rest_2' }
🍰 [Login] Redirecting to SweetDreams dashboard
✅ [Login] Auto-redirecting authenticated user to: /restaurant/sweetdreams
👤 [Login] Full user data: { id: 'u3', name: 'SweetDreams Owner', username: 'sweetdreams', role: 'restaurant', restaurantId: 'rest_2', ... }
🚀 [Login] Executing navigate() to: /restaurant/sweetdreams
✅ [Login] navigate() called successfully
🍰 [SweetDreamsDashboard] Component mounted!
👤 [SweetDreamsDashboard] Current user: { id: 'u3', name: 'SweetDreams Owner', ... }
```

### Step 3: Test Aloha Login
1. Logout (if logged in)
2. Go to `/login`
3. Enter credentials:
   - Username: `aloha_restaurant`
   - Password: `aloha123`
4. Click "Đăng nhập"
5. Watch for similar console output with:

```
🧭 [Login] Calculating redirect path for user: { username: 'aloha_restaurant', role: 'restaurant', restaurantId: 'restaurant_2' }
🍜 [Login] Redirecting to Aloha dashboard
✅ [Login] Auto-redirecting authenticated user to: /restaurant/aloha
🚀 [Login] Executing navigate() to: /restaurant/aloha
🌺 [AlohaKitchenDashboard] Component mounted!
```

## 🔍 Troubleshooting Guide

### ❌ Problem: No redirect after login

**Check Console For:**

1. **Is `loginSuccess` set?**
   - Look for: `🎯 [Login] Setting loginSuccess flag to true`
   - If missing: Login API failed, check credentials

2. **Is `useEffect` triggered?**
   - Look for: `🔄 [Login useEffect] Triggered with: { loginSuccess: true, hasUser: true, ... }`
   - If `hasUser: false`: AuthContext not updating user state
   - If not triggered: Dependencies issue in useEffect

3. **Is redirect path calculated?**
   - Look for: `🧭 [Login] Calculating redirect path for user: ...`
   - Check if path is correct (`/restaurant/sweetdreams` or `/restaurant/aloha`)

4. **Is navigate() called?**
   - Look for: `🚀 [Login] Executing navigate() to: ...`
   - If missing: Something blocked the setTimeout

5. **Does dashboard mount?**
   - Look for: `🍰 [SweetDreamsDashboard] Component mounted!` or `🌺 [AlohaKitchenDashboard] Component mounted!`
   - If missing: Route not matching or ProtectedRoute blocking

### ⚠️ Common Issues

| Symptom | Possible Cause | Solution |
|---------|---------------|----------|
| `loginSuccess: true, hasUser: false` | AuthContext setUser() not completing | Check AuthContext loading state |
| useEffect not triggered | Missing dependencies | Verify [user, loginSuccess, navigate, getRedirectPath] |
| Wrong redirect path | restaurantId mismatch | Check mockData.ts for correct IDs |
| Dashboard doesn't mount | Route mismatch | Verify App.tsx routes match redirect paths |
| ProtectedRoute blocks | Role validation failing | Check requireRole="restaurant" and user.role |

## 📊 Expected Flow Diagram

```
1. User clicks "Đăng nhập"
   ↓
2. onSubmit() → login() API call
   ↓
3. AuthContext.login() validates credentials
   ↓
4. setUser() updates auth state
   ↓
5. useEffect (in AuthContext) syncs to localStorage
   ↓
6. Login.tsx receives updated `user` via useAuth()
   ↓
7. useEffect (in Login.tsx) triggers on [user, loginSuccess] change
   ↓
8. getRedirectPath() calculates destination
   ↓
9. setTimeout → navigate() after 100ms
   ↓
10. React Router changes route
   ↓
11. Restaurant Dashboard component mounts
   ↓
12. ✅ Success!
```

## 🧹 Cleanup Instructions

Once the issue is identified and fixed, remove all debug logs by:

1. Search for `console.log` in:
   - `web/src/AuthContext.tsx`
   - `web/src/pages/Login.tsx`
   - `web/src/pages/restaurant/SweetDreamsDashboard.tsx`
   - `web/src/pages/restaurant/AlohaKitchenDashboard.tsx`

2. Remove all lines containing `console.log`, `console.warn`, or `console.error` that were added for debugging.

3. Keep only essential error logs (if any).

## ✅ Key Fixes Applied

1. ✅ **Updated redirect paths** in `Login.tsx`:
   - SweetDreams: `/restaurant/sweetdreams`
   - Aloha: `/restaurant/aloha`

2. ✅ **Added comprehensive logging** throughout the login flow

3. ✅ **Added mount logging** to restaurant dashboards

4. ✅ **No linter errors** - All code compiles cleanly

## 🚀 Next Steps

1. **Test in browser** using the steps above
2. **Observe console logs** to identify where the flow breaks
3. **Share console output** if issue persists (copy-paste the exact sequence)
4. **Check browser Network tab** to ensure no API errors
5. **Verify localStorage** after login (F12 → Application → Local Storage)

---

**Status:** ✅ Debug logging ready for testing

**Last Updated:** October 21, 2025

**Note:** The redirect paths have been FIXED to use `/restaurant/sweetdreams` and `/restaurant/aloha`. This was the primary issue preventing successful navigation.

