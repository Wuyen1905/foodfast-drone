# 🔧 Complete Fix Guide: Disk Space + OneDrive + Import Resolution

## 🚨 Current Issues Identified

### Issue 1: DISK SPACE FULL (CRITICAL ⚠️)
```
[ERROR] Failed to write to output file: There is not enough space on the disk.
```

### Issue 2: OneDrive Location (Problematic 📁)
```
Current Path: C:\Users\LENOVO\OneDrive\Documents\W\CNPM\food_delivery_meal-main
```

### Issue 3: Import Paths (Already Fixed ✅)
- ✅ All imports corrected
- ✅ 0 linter errors
- ✅ Path aliases configured

---

## 🎯 Solution: Move Project Out of OneDrive + Free Disk Space

### Option A: Quick Fix (Stay in OneDrive, Free Space)

**If you want to keep the project in OneDrive:**

```powershell
# 1. Free up disk space
cleanmgr

# 2. Delete temp files
Remove-Item -Recurse -Force $env:TEMP\* -ErrorAction SilentlyContinue

# 3. Exclude node_modules from OneDrive sync
cd "C:\Users\LENOVO\OneDrive\Documents\W\CNPM\food_delivery_meal-main"
attrib +P web\node_modules /S /D

# 4. Clear Vite cache
cd web
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue

# 5. Restart dev server
npm run dev
```

### Option B: Recommended Fix (Move to Local Drive)

**Move project out of OneDrive for better performance:**

```powershell
# Step 1: Create local projects folder
New-Item -ItemType Directory -Force -Path "C:\Projects"

# Step 2: Move project (this will take a few minutes)
# IMPORTANT: Close any open files/editors first!
Move-Item -Path "C:\Users\LENOVO\OneDrive\Documents\W\CNPM\food_delivery_meal-main" `
          -Destination "C:\Projects\food_delivery_meal"

# Step 3: Navigate to new location
cd C:\Projects\food_delivery_meal

# Step 4: Clear Vite cache
cd web
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue

# Step 5: Start dev server
npm run dev
```

---

## 📋 Step-by-Step: Recommended Approach

### Step 1: Check Available Disk Space

```powershell
Get-PSDrive C | Select-Object Name, @{Name="Free(GB)";Expression={[math]::Round($_.Free/1GB,2)}}, @{Name="Used(GB)";Expression={[math]::Round($_.Used/1GB,2)}}
```

**Required:** At least 3-5 GB free for comfortable development

### Step 2: Free Up Disk Space

#### A. Run Windows Disk Cleanup
```powershell
cleanmgr
```
Select all options and clean.

#### B. Delete Windows Temp Files
```powershell
Remove-Item -Recurse -Force $env:TEMP\* -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force C:\Windows\Temp\* -ErrorAction SilentlyContinue
```

#### C. Clear Browser Cache
- Open Chrome/Edge
- Press Ctrl+Shift+Delete
- Clear cached images and files

#### D. Delete Old Windows Updates (Safe)
```powershell
# Run as Administrator
Dism.exe /online /Cleanup-Image /StartComponentCleanup /ResetBase
```

### Step 3: Move Project Out of OneDrive (Recommended)

**Why move?**
- ✅ Faster file access
- ✅ No sync conflicts
- ✅ No OneDrive file locking
- ✅ Better Vite performance
- ✅ Avoid path encoding issues

**How to move:**

```powershell
# 1. Close VS Code/Cursor and all editors
# 2. Create new folder
New-Item -ItemType Directory -Force -Path "C:\Projects"

# 3. Copy project (safer than move)
Copy-Item -Path "C:\Users\LENOVO\OneDrive\Documents\W\CNPM\food_delivery_meal-main" `
          -Destination "C:\Projects\food_delivery_meal" `
          -Recurse

# 4. Verify copy completed
Test-Path "C:\Projects\food_delivery_meal\web\package.json"

# 5. Open new location in your editor
cd C:\Projects\food_delivery_meal
code .  # or cursor .
```

### Step 4: Clear Vite Cache

```powershell
cd C:\Projects\food_delivery_meal\web
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
```

### Step 5: Verify Configuration

**Check vite.config.ts:**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@context': path.resolve(__dirname, './src/context'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  // ... rest
});
```

**Check tsconfig.json:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@context/*": ["./src/context/*"],
      "@components/*": ["./src/components/*"],
      "@pages/*": ["./src/pages/*"],
      "@utils/*": ["./src/utils/*"],
      "@types/*": ["./src/types/*"]
    }
  }
}
```

### Step 6: Start Dev Server

```powershell
npm run dev
```

**Expected output:**
```
  VITE v5.4.20  ready in XXX ms
  ➜  Local:   http://localhost:5173/
```

**NO disk space errors!** ✅

---

## 🔍 Troubleshooting

### Problem: Still getting disk space errors

**Solutions:**
1. Check if OneDrive is syncing node_modules (disable it)
2. Delete old project from OneDrive after successful copy
3. Move to different drive (D:, E:, etc.)

### Problem: Imports still failing

**Check:**
```powershell
# Verify AuthContext exists
Test-Path "web\src\context\AuthContext.tsx"

# Verify index exports
Get-Content "web\src\context\index.ts"
```

Should show:
```typescript
export { AuthProvider, useAuth } from './AuthContext';
```

### Problem: Module not found after moving

**Solution:**
```powershell
cd web
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

---

## 📊 Current Status Check

### ✅ Already Fixed
- [x] AuthContext moved to correct location
- [x] All imports updated (12 files)
- [x] Path aliases configured
- [x] 0 linter errors
- [x] TypeScript paths configured

### ⏳ Needs Action
- [ ] Free up disk space (at least 3 GB)
- [ ] (Optional) Move project out of OneDrive
- [ ] Clear Vite cache
- [ ] Restart dev server

---

## 🎯 Quick Command Reference

### Check Disk Space
```powershell
Get-PSDrive C
```

### Free Disk Space (Quick)
```powershell
cleanmgr
```

### Move Project (if needed)
```powershell
Copy-Item -Path "C:\Users\LENOVO\OneDrive\Documents\W\CNPM\food_delivery_meal-main" -Destination "C:\Projects\food_delivery_meal" -Recurse
```

### Clear Vite Cache
```powershell
cd web
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
```

### Start Dev Server
```powershell
cd web
npm run dev
```

---

## 🚀 After Fix - Testing Checklist

Once the server starts successfully:

### 1. Verify No Import Errors
- [ ] Open http://localhost:5173/
- [ ] Open DevTools (F12) → Console
- [ ] Should see **NO** "Cannot find module" errors

### 2. Test SweetDreams Login
- [ ] Navigate to `/login`
- [ ] Enter: `sweetdreams` / `sweet123`
- [ ] Should redirect to `/restaurant/sweetdreams`
- [ ] Pink theme loads correctly

### 3. Test Aloha Login
- [ ] Logout
- [ ] Enter: `aloha_restaurant` / `aloha123`
- [ ] Should redirect to `/restaurant/aloha`
- [ ] Orange theme loads correctly

### 4. Test Hot Module Replacement
- [ ] Edit any component file
- [ ] Save
- [ ] Browser should auto-update WITHOUT full reload
- [ ] Console shows: `[vite] hot updated: ...`

---

## 💡 Best Practices Going Forward

### 1. Keep Project Outside OneDrive
```
✅ C:\Projects\food_delivery_meal
❌ C:\Users\...\OneDrive\Documents\...
```

### 2. Add .gitignore for OneDrive
If you must use OneDrive, add to `.gitignore`:
```
node_modules/
.vite/
dist/
*.log
```

### 3. Exclude node_modules from OneDrive Sync
```powershell
attrib +P node_modules /S /D
```

### 4. Maintain Free Space
- Keep at least 5 GB free on C: drive
- Run `cleanmgr` monthly
- Clear browser cache regularly

---

## 📖 Import Resolution Status

### Current Import Structure (Working)
```typescript
// Using centralized index exports
import { useAuth } from "../context";
import { useOrders } from "../context";
import { useCart } from "../context/CartContext";
```

### Alternative: Absolute Aliases (Optional)
```typescript
// If you prefer absolute imports
import { useAuth } from "@/context";
import { useOrders } from "@/context";
import { useCart } from "@/context/CartContext";
```

**Both styles work!** Current relative imports are fine.

---

## ✅ Summary

| Issue | Status | Action Required |
|-------|--------|----------------|
| Disk Space | 🔴 Critical | Free 3+ GB |
| OneDrive Location | 🟡 Problematic | Move to C:\Projects (optional) |
| Import Paths | ✅ Fixed | None |
| Path Aliases | ✅ Configured | None |
| Linter Errors | ✅ 0 errors | None |

**Next Steps:**
1. Free up disk space (REQUIRED)
2. Move project out of OneDrive (RECOMMENDED)
3. Clear Vite cache
4. Start dev server
5. Test login flows

---

**Last Updated:** October 21, 2025

**Status:** Code is ready. Waiting for disk space to be freed.

