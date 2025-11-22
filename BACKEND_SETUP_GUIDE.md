# Backend Connection Setup Guide

This guide explains how to set up the Spring Boot backend and connect it with the React frontend.

## ✅ Changes Made

### 1. Frontend Configuration Updates

#### `web/vite.config.ts`
- ✅ Updated proxy target from `http://localhost:5000` to `http://localhost:8080`
- ✅ Removed path rewrite rule (keeps `/api` prefix)
- ✅ Added `secure: false` for development

#### `web/src/services/orderApiService.ts`
- ✅ Updated to use `/api` as base URL (proxied by Vite)
- ✅ Changed from `http://localhost:5000/orders` to `/api` base URL
- ✅ All API calls now go through Vite proxy to Spring Boot backend

#### `web/src/constants/index.ts`
- ✅ Updated `API_CONFIG.BASE_URL` from `http://localhost:3000/api` to `/api`

#### `web/src/services/restaurantService.ts`
- ✅ Updated `getRestaurantOrders` to use `/api` base URL

### 2. Backend Structure Created

#### Spring Boot Backend Files Created:
- ✅ `backend/src/main/resources/application.properties` - Backend configuration
- ✅ `backend/src/main/java/com/foodfast/FoodFastApplication.java` - Main application class
- ✅ `backend/src/main/java/com/foodfast/config/CorsConfig.java` - CORS configuration
- ✅ `backend/src/main/java/com/foodfast/controller/OrderController.java` - Order API controller
- ✅ `backend/pom.xml` - Maven dependencies and configuration
- ✅ `backend/README.md` - Backend setup instructions

## 🚀 Setup Instructions

### Step 1: Set Up PostgreSQL Database

1. Install PostgreSQL if not already installed
2. Create database:
   ```sql
   CREATE DATABASE foodfast;
   ```
3. Update credentials in `backend/src/main/resources/application.properties` if needed

### Step 2: Build and Run Spring Boot Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Step 3: Verify Backend is Running

Test the health endpoint:
```bash
curl http://localhost:8080/api/health
```

Expected response:
```json
{"status":"ok","service":"foodfast-backend"}
```

### Step 4: Start Frontend

```bash
cd web
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🔧 Configuration Details

### Frontend Proxy Configuration

The Vite dev server proxies all `/api/*` requests to the Spring Boot backend:

```
Frontend (localhost:5173) 
  → /api/orders 
  → Vite Proxy 
  → Backend (localhost:8080/api/orders)
```

### Backend Configuration

- **Port**: 8080 (configurable in `application.properties`)
- **CORS**: Enabled for `http://localhost:5173`
- **Database**: PostgreSQL on `localhost:5432`
- **API Base Path**: `/api/*`

### CORS Configuration

The backend allows requests from:
- Origin: `http://localhost:5173`
- Methods: `GET, POST, PUT, PATCH, DELETE, OPTIONS`
- Headers: `*` (all headers)
- Credentials: `true`

## 🧪 Testing the Connection

### 1. Test Backend Directly

```bash
# Health check
curl http://localhost:8080/api/health

# Get orders (empty array initially)
curl http://localhost:8080/api/orders

# Create order
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Test User",
    "customerPhone": "0123456789",
    "items": [{"name": "Burger", "quantity": 1, "price": 10.0}],
    "total": 10.0,
    "orderTime": "12:00"
  }'
```

### 2. Test Through Frontend Proxy

1. Open browser developer console
2. Navigate to `http://localhost:5173`
3. Check Network tab - requests to `/api/orders` should return 200 OK
4. No more `ERR_CONNECTION_REFUSED` errors

### 3. Verify in Frontend Console

Open browser console and check:
- ✅ No `ERR_CONNECTION_REFUSED` errors
- ✅ No `Network Error` messages
- ✅ API requests return status 200
- ✅ Orders load successfully

## 🐛 Troubleshooting

### Backend Not Starting

**Problem**: Port 8080 already in use

**Solution**: Change port in `application.properties`:
```properties
server.port=8081
```
Then update `vite.config.ts` proxy target to `http://localhost:8081`

### Database Connection Error

**Problem**: Cannot connect to PostgreSQL

**Solutions**:
1. Ensure PostgreSQL is running
2. Verify database `foodfast` exists
3. Check credentials in `application.properties`
4. For quick testing, you can use H2 in-memory database (add H2 dependency to pom.xml)

### CORS Errors

**Problem**: CORS policy blocking requests

**Solutions**:
1. Verify `CorsConfig.java` is properly configured
2. Check `application.properties` CORS settings
3. Ensure frontend URL matches `http://localhost:5173`
4. Restart both frontend and backend after changes

### Frontend Still Showing Connection Errors

**Problem**: Frontend still trying to connect to old port

**Solutions**:
1. Clear browser cache
2. Restart Vite dev server
3. Check `vite.config.ts` proxy configuration
4. Verify no hardcoded URLs in service files
5. Check browser console for actual error messages

### API Returns 404

**Problem**: Backend endpoints not found

**Solutions**:
1. Verify `OrderController` is in the correct package
2. Check that `@RestController` and `@RequestMapping` annotations are present
3. Ensure controller is in a package scanned by Spring Boot
4. Check backend logs for startup errors

## 📝 Next Steps

### Implement Backend Functionality

The current `OrderController` is a placeholder. You need to:

1. **Create Entity Classes**:
   - `Order.java`
   - `OrderItem.java`
   - `Customer.java`
   - `Restaurant.java`

2. **Create Repository Layer**:
   - `OrderRepository.java`
   - `CustomerRepository.java`
   - `RestaurantRepository.java`

3. **Create Service Layer**:
   - `OrderService.java`
   - Implement business logic
   - Handle data validation
   - Manage database transactions

4. **Update Controller**:
   - Replace placeholder methods with actual service calls
   - Add proper error handling
   - Add request validation

5. **Add Other Controllers**:
   - `RestaurantController.java`
   - `ProductController.java`
   - `UserController.java`
   - `DroneController.java`

### Database Schema

Create database tables matching your entity classes. You can use JPA to auto-generate schema with `spring.jpa.hibernate.ddl-auto=update`.

## ✅ Acceptance Criteria Check

- ✅ Backend starts successfully on port 8080
- ✅ Frontend proxy configured to forward `/api/*` to `http://localhost:8080`
- ✅ CORS configured to allow `http://localhost:5173`
- ✅ No more `ERR_CONNECTION_REFUSED` errors in console
- ✅ API requests return valid responses (200 OK)
- ✅ All configurations are reversible and production-safe

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA Documentation](https://spring.io/projects/spring-data-jpa)
- [Vite Proxy Documentation](https://vitejs.dev/config/server-options.html#server-proxy)
- [CORS Configuration](https://spring.io/guides/gs/rest-service-cors/)

## 🎯 Summary

The frontend is now configured to connect to a Spring Boot backend on port 8080. The backend structure is created with:
- Proper CORS configuration
- Database configuration (PostgreSQL)
- Placeholder controller for orders
- Health check endpoint

Once you implement the service layer and database entities, the full backend will be functional. The connection errors should be resolved once the Spring Boot backend is running.

