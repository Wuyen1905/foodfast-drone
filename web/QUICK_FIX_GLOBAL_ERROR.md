# Quick Fix: Global is Not Defined Error

## ✅ Fixes Applied

### 1. Build-Time Polyfill (vite.config.ts)
```ts
define: {
  global: 'window', // Fix SockJS "global is not defined" issue
},
```

### 2. Runtime Polyfill (main.tsx)
```ts
(window as any).global = window;
```

## 🚀 Next Steps

### Step 1: Clear Vite Cache

**Windows (PowerShell)**:
```powershell
cd web
rd /s /q node_modules\.vite
npm run dev
```

**Windows (Command Prompt)**:
```cmd
cd web
rd /s /q node_modules\.vite
npm run dev
```

**macOS/Linux**:
```bash
cd web
rm -rf node_modules/.vite
npm run dev
```

### Step 2: Verify Fix

1. **Check browser console** - No "global is not defined" error
2. **Check WebSocket connection** - Should see:
   ```
   [OrderSync] ✅ WebSocket connected - Real-time sync active
   ```
3. **Verify app renders** - No white screen, app loads normally

## ✅ Expected Results

- ✅ No "global is not defined" error
- ✅ Web page renders normally
- ✅ WebSocket connects successfully
- ✅ Real-time sync works
- ✅ No UI or functional changes

## 🐛 If Issues Persist

1. **Clear browser cache**: Hard refresh (`Ctrl+Shift+R` or `Cmd+Shift+R`)
2. **Delete node_modules and reinstall**:
   ```bash
   cd web
   rm -rf node_modules
   npm install
   npm run dev
   ```
3. **Verify both fixes are in place**:
   - Check `vite.config.ts` has `define: { global: 'window' }`
   - Check `main.tsx` has `(window as any).global = window;` at the top

---

**Status**: ✅ Fixed
**Date**: 2024

