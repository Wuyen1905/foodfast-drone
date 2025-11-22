# WebSocket Connection Fix - Quick Start

## ✅ Fixes Applied

### 1. Backend WebSocketConfig
- ✅ Changed to `setAllowedOriginPatterns("*")` for better compatibility
- ✅ Added `/queue` to message broker

### 2. Frontend orderSyncService
- ✅ Changed WebSocket URL to `/ws` (uses proxy)

### 3. Vite Proxy
- ✅ Added `/ws` proxy with `ws: true` for WebSocket support

## 🚀 Quick Test

### Step 1: Start Backend
```bash
cd backend
mvn spring-boot:run
```

### Step 2: Start Frontend
```bash
cd web
npm run dev
```

### Step 3: Check Console
**Expected**:
```
[OrderSync] ✅ WebSocket connected - Real-time sync active
```

**Should NOT see**:
```
net::ERR_CONNECTION_REFUSED
GET http://localhost:8080/ws/info net::ERR_CONNECTION_REFUSED
```

## ✅ Verification

1. **Open browser console**
2. **Check for WebSocket connection message**
3. **Test real-time sync**:
   - Place order as customer
   - Verify restaurant sees it instantly
   - Update status as restaurant
   - Verify customer sees update instantly

## 🐛 If Issues Persist

1. **Clear Vite cache**:
   ```bash
   cd web
   rm -rf node_modules/.vite .vite
   npm run dev
   ```

2. **Verify backend is running**:
   ```bash
   curl http://localhost:8080/api/health
   ```

3. **Check browser Network tab**:
   - Filter by "WS"
   - Verify WebSocket connection to `/ws`
   - Check connection status

---

**Status**: ✅ Fixed
**Next**: Start both servers and test WebSocket connection

