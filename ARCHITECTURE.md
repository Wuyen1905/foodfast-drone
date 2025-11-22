# FoodFast - Production-Ready Architecture

## 📁 Project Structure

```
FoodFast/
├── frontend-web/          # React.js Web Application (Vite + TypeScript)
│   ├── src/
│   │   ├── pages/         # All page components (unchanged)
│   │   ├── components/     # All UI components (unchanged)
│   │   ├── context/        # React Context providers (unchanged)
│   │   ├── services/       # API services (unchanged)
│   │   ├── config/         # Configuration (axios.ts)
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
│
├── frontend-mobile/        # React Native Mobile App (Expo + TypeScript)
│   ├── src/
│   │   ├── screens/        # All screen components (unchanged)
│   │   ├── api/            # API adapters (unchanged)
│   │   ├── config/         # Configuration (axios.ts)
│   │   └── ...
│   ├── App.tsx
│   ├── package.json
│   └── app.json
│
└── mock-api/              # JSON Server Mock API
    ├── db.json            # Database with restaurants, products, orders
    └── package.json
```

## 🎯 Architecture Principles

### ✅ What Was Preserved (100% Unchanged)
- **All UI Components**: Every button, form, menu, layout remains identical
- **All Business Logic**: Order flow, authentication, restaurant management unchanged
- **All Styling**: CSS, styled-components, themes preserved exactly
- **All Features**: Login, ordering, dashboards, drone tracking work as before
- **All Languages**: Vietnamese text and translations unchanged
- **All Routes**: Navigation and routing logic identical

### 🔧 What Was Changed (Structure Only)
- **Folder Organization**: Separated into frontend-web, frontend-mobile, mock-api
- **Import Paths**: Updated to use new folder structure
- **Configuration**: Added axios configs pointing to mock API
- **Build Tools**: Each project has its own package.json and build config

## 🚀 Quick Start

### Option 1: Use Launcher Scripts (Recommended)

**Windows:**
```bash
run_all.bat
```

**Mac/Linux:**
```bash
chmod +x run_all.sh
./run_all.sh
```

### Option 2: Manual Start

**Terminal 1 - Mock API:**
```bash
cd mock-api
npm install
npm start
# Runs on http://localhost:5000
```

**Terminal 2 - Web App:**
```bash
cd frontend-web
npm install
npm run dev
# Runs on http://localhost:5173
```

**Terminal 3 - Mobile App:**
```bash
cd frontend-mobile
npm install
npm start
# Opens Expo DevTools
```

## 📋 API Configuration

### Mock API Endpoints
- Base URL: `http://localhost:5000`
- Endpoints:
  - `GET /restaurants` - Get all restaurants
  - `GET /products` - Get all products
  - `GET /orders` - Get all orders
  - `GET /users` - Get all users
  - `GET /drones` - Get all drones

### Frontend Configuration
- **Web**: `frontend-web/src/config/axios.ts`
  - Uses environment variable: `VITE_API_BASE_URL` (defaults to `http://localhost:5000`)
  
- **Mobile**: `frontend-mobile/src/config/axios.ts`
  - Default: `http://localhost:5000`
  - For physical devices: Update to your computer's IP address

## 🔒 Business Logic (Unchanged)

### Order Flow
1. **Created** → Customer places order
2. **Confirmed** → Restaurant accepts order
3. **Completed** → Order delivered

### Restaurant Management
- Each restaurant has its own menu
- Separate dashboards (SweetDreams, Aloha Kitchen)
- Independent order management

### Drone Delivery
- Real-time tracking
- Status updates (Đang bay tới, Đang giao hàng, Đang trở về, Sẵn sàng, Bảo trì)
- Battery and location monitoring

## 📦 Dependencies

### Frontend Web
- React 18.3.1
- Vite 7.1.12
- TypeScript 5.0.2
- React Router 7.9.4
- Styled Components 6.1.19
- Axios 1.7.2

### Frontend Mobile
- React Native 0.74.3
- Expo ~51.0.14
- React Navigation 6.1.18
- Axios 1.7.2

### Mock API
- JSON Server 0.17.4

## ✅ Verification Checklist

- [x] All UI components render identically
- [x] All routes work correctly
- [x] All business logic preserved
- [x] All styling unchanged
- [x] All features functional
- [x] Mock API connects successfully
- [x] Axios configurations correct
- [x] Build processes work
- [x] Launcher scripts functional

## 🎨 UI/UX Preservation

### What Remains Identical
- ✅ All page layouts
- ✅ All component designs
- ✅ All color schemes and themes
- ✅ All Vietnamese text
- ✅ All button styles and interactions
- ✅ All form validations
- ✅ All navigation flows
- ✅ All dashboard layouts
- ✅ All order tracking screens
- ✅ All restaurant management interfaces

## 🔧 Development Workflow

1. **Start Mock API** (required first)
2. **Start Web App** (connects to mock API)
3. **Start Mobile App** (optional, connects to mock API)

All services can run simultaneously and independently.

## 📝 Notes

- **No Visual Changes**: All UI remains exactly as before
- **No Functional Changes**: All features work identically
- **No Logic Changes**: Business rules preserved
- **Structure Only**: Only folder organization changed
- **Production Ready**: Clean, maintainable architecture

## 🆘 Troubleshooting

**Port conflicts?**
- Mock API: Change port in `mock-api/package.json`
- Web: Change port in `frontend-web/vite.config.ts`

**Mobile can't connect?**
- Update IP in `frontend-mobile/src/config/axios.ts`
- Ensure device and computer on same network

**Build errors?**
- Run `npm install` in each project directory
- Check Node.js version (v16+ required)

