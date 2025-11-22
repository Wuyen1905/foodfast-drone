# Clear Vite Cache - Instructions

## Problem
Vite cache can become corrupted after adding new dependencies or changing import statements, causing build errors like:
- `[vite] Internal server error`
- `Failed to resolve import "sockjs-client"`
- `ERR_ABORTED 500 when reloading modules`

## Solution

### Windows (PowerShell)
```powershell
# Navigate to web directory
cd web

# Remove Vite cache
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .vite -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue

# Clear npm cache (optional)
npm cache clean --force

# Reinstall dependencies (if needed)
npm install

# Start dev server
npm run dev
```

### Windows (Command Prompt)
```cmd
cd web
rd /s /q node_modules\.vite
rd /s /q .vite
rd /s /q dist
npm cache clean --force
npm install
npm run dev
```

### macOS/Linux
```bash
cd web
rm -rf node_modules/.vite
rm -rf .vite
rm -rf dist
npm cache clean --force
npm install
npm run dev
```

## Quick Fix (One-liner)

### Windows
```powershell
cd web; Remove-Item -Recurse -Force node_modules\.vite,.vite,dist -ErrorAction SilentlyContinue; npm run dev
```

### macOS/Linux
```bash
cd web && rm -rf node_modules/.vite .vite dist && npm run dev
```

## Verify Fix

After clearing cache and starting dev server, check console for:
- ✅ No `[vite] Internal server error`
- ✅ No `Failed to resolve import` errors
- ✅ `[OrderSync] ✅ WebSocket connected - Real-time sync active` (if backend is running)
- ✅ All modules load successfully

## If Issues Persist

1. **Delete node_modules and reinstall**:
   ```bash
   cd web
   rm -rf node_modules
   npm install
   npm run dev
   ```

2. **Check package.json**:
   - Verify `sockjs-client` and `@stomp/stompjs` are in dependencies
   - Run `npm install` to ensure packages are installed

3. **Check TypeScript configuration**:
   - Verify `tsconfig.json` includes `"src"` in `include`
   - Verify `src/types/sockjs.d.ts` exists

4. **Check imports**:
   - Verify `orderSyncService.ts` uses static imports:
     ```ts
     import SockJS from "sockjs-client";
     import { Client } from "@stomp/stompjs";
     ```

5. **Restart IDE**:
   - Close and reopen your code editor
   - This helps TypeScript server pick up new type declarations

## Expected Output After Fix

```
VITE v7.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help

[OrderSync] ✅ WebSocket connected - Real-time sync active
[OrderContext] ✅ Real-time sync enabled via WebSocket
```

No errors should appear in the console.

