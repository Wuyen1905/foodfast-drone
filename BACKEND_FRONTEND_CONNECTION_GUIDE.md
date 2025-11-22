# ✅ Backend & Frontend Connection Guide

## Configuration Verification

### ✅ 1. Backend Configuration (`backend/src/main/resources/application.properties`)

All settings are correctly configured:

```properties
server.port=5000
spring.datasource.url=jdbc:postgresql://localhost:5432/foodfast
spring.datasource.username=postgres
spring.datasource.password=12345
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.mvc.cors.allowed-origins=http://localhost:5173
spring.mvc.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
```

**Status:** ✅ Verified and correct

---

### ✅ 2. Frontend Proxy Configuration (`web/vite.config.ts`)

Proxy settings are correctly configured:

```typescript
server: {
  host: true,
  port: 5173,
  cors: true,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      secure: false,
    },
    '/ws': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      ws: true,
      secure: false,
    },
  },
}
```

**Status:** ✅ Verified and correct

---

### ✅ 3. WebSocket Connection (`web/src/services/orderSyncService.ts`)

WebSocket endpoint is correctly configured:

```typescript
const socket = new SockJS("http://localhost:5000/ws");
```

**Status:** ✅ Verified and correct

---

## 🚀 Startup Sequence

### Step 1: Start Backend (Spring Boot)

Open a terminal at `D:\FoodFast\backend` and run:

```bash
mvn spring-boot:run
```

**OR** if using wrapper:

```bash
.\mvnw.cmd spring-boot:run
```

**✅ Expected Output:**
```
Tomcat started on port(s): 5000 (http)
Started FoodFastApplication in X.XXX seconds
```

**⚠️ Important:** Wait until you see "Tomcat started on port 5000" before proceeding.

---

### Step 2: Start Frontend (Vite)

Open a **new terminal** at `D:\FoodFast\web` and run:

```bash
& "D:\NodePortable\node-v22.12.0-win-x64\npm.cmd" run dev
```

**OR** if Node.js is in PATH:

```bash
npm run dev
```

**✅ Expected Output:**
```
✅ Backend is running on port 5000
✅ Development server started successfully!
✅ Server ready: VITE v7.1.12  ready in XXX ms
```

---

## ✅ Verification Checklist

After both servers are running:

1. **Backend Health Check:**
   - Open: `http://localhost:5000/api/health`
   - Should return: `{"status":"UP"}`

2. **Frontend Access:**
   - Open: `http://localhost:5173`
   - Should load without errors

3. **API Connection:**
   - Open DevTools → Network tab
   - Check `/api/orders` requests
   - Should return 200 OK (not 500 or ECONNREFUSED)

4. **WebSocket Connection:**
   - Open DevTools → Network tab → WS filter
   - Look for `/ws` connection
   - Status should show: **"101 Switching Protocols"**

5. **Real-time Sync:**
   - Restaurant dashboard updates order status
   - Customer dashboard should update instantly (no page refresh)

---

## 🔧 Troubleshooting

### Issue: `ECONNREFUSED ::1:5000`

**Cause:** Backend is not running

**Solution:**
1. Start backend first (Step 1 above)
2. Wait for "Tomcat started on port 5000"
3. Then start frontend (Step 2 above)

---

### Issue: `Port 5173 is already in use`

**Solution:**
```powershell
# Find process using port 5173
netstat -ano | findstr :5173

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

---

### Issue: Backend fails to start

**Common Causes:**
1. **Database not running:** Start PostgreSQL
2. **Port 5000 in use:** Check if another service is using port 5000
3. **Missing dependencies:** Run `mvn clean install` in backend folder

---

## 📋 Configuration Summary

| Component | Status | Details |
|-----------|--------|---------|
| Backend Port | ✅ | 5000 |
| Frontend Port | ✅ | 5173 |
| CORS | ✅ | Configured for both |
| API Proxy | ✅ | `/api` → `http://localhost:5000` |
| WebSocket Proxy | ✅ | `/ws` → `http://localhost:5000` |
| WebSocket Endpoint | ✅ | `http://localhost:5000/ws` |
| Health Check | ✅ | `/api/health` |

---

## 🎯 Expected Final State

When everything is working:

✅ Backend running on port 5000  
✅ Frontend running on port 5173  
✅ API requests proxied correctly  
✅ WebSocket connection established  
✅ Real-time order sync working  
✅ No ECONNREFUSED errors  
✅ No 500 Internal Server errors  

---

**Last Updated:** Configuration verified and ready for use.

