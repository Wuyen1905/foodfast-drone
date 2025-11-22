# Quick Start - Backend Connection

## 🚀 Quick Setup (3 Steps)

### Step 1: Fix pom.xml (Optional)
Open `backend/pom.xml` and remove line 18:
```xml
<n>FoodFast Backend</n>
```
This line is invalid and can be removed. Maven will work fine without it.

### Step 2: Start Backend
```bash
cd backend
mvn spring-boot:run
```
Backend will start on `http://localhost:8080`

### Step 3: Start Frontend
```bash
cd web
npm run dev
```
Frontend will start on `http://localhost:5173`

## ✅ Verify Connection

1. Open browser to `http://localhost:5173`
2. Open browser console (F12)
3. Check Network tab
4. You should see:
   - ✅ Requests to `/api/orders` return 200 OK
   - ✅ No `ERR_CONNECTION_REFUSED` errors
   - ✅ No CORS errors

## 🔧 Configuration Summary

- **Frontend Proxy**: `/api/*` → `http://localhost:8080/api/*`
- **Backend Port**: 8080
- **Database**: PostgreSQL (localhost:5432/foodfast)
- **CORS**: Enabled for http://localhost:5173

## 📝 Next Steps

1. Set up PostgreSQL database (see `backend/README.md`)
2. Implement service layer in backend
3. Create database entities
4. Test API endpoints

For detailed instructions, see `BACKEND_SETUP_GUIDE.md`

