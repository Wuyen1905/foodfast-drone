<<<<<<< HEAD
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

=======
# Application Architecture - Dual App System

## Overview

This application uses a **dual-app architecture** with completely independent routing and authentication systems:

1. **User-Facing App** - Main customer and restaurant application
2. **Admin Management System** - Separate admin panel for system administration

## Architecture Diagram

```
main.tsx (Entry Point)
    │
    ├─── Conditional Router based on URL path
    │
    ├─── /admin/* → AdminApp (Independent Admin System)
    │   │
    │   ├── AdminAuthProvider (Separate Auth Context)
    │   ├── BrowserRouter (Independent Routing)
    │   ├── ThemeProvider + GlobalStyle
    │   │
    │   └── Admin Routes:
    │       ├── /admin/login (Public)
    │       ├── /admin/dashboard (Protected)
    │       ├── /admin/users (Protected)
    │       ├── /admin/restaurants (Protected)
    │       └── /admin/orders (Protected)
    │
    └─── /* → Root Component (User-Facing App)
        │
        ├── CustomThemeProvider
        ├── ThemeProvider + GlobalStyle
        ├── AuthProvider (User/Restaurant Auth)
        ├── OrderProvider
        ├── CartProvider
        ├── WishlistProvider
        │
        └── App Component:
            └── BrowserRouter (User Routes)
                ├── /login (User & Restaurant Login)
                ├── /menu
                ├── /cart
                ├── /checkout
                ├── /orders
                ├── /restaurant (Restaurant Dashboard)
                └── ... other user routes
```

## Key Features

### 🔀 **Conditional Rendering**

The entry point (`main.tsx`) uses a simple but powerful conditional render:

```tsx
root.render(
  <React.StrictMode>
    {window.location.pathname.startsWith("/admin") ? <AdminApp /> : <Root />}
  </React.StrictMode>
);
```

This ensures:
- **Complete isolation** between admin and user apps
- **No shared state** between the two systems
- **Independent routing** for each app
- **Separate authentication** systems

### 🔐 **Independent Authentication**

#### Admin System
- **Context**: `AdminAuthContext`
- **Storage**: `localStorage` key `admin_auth`
- **Credentials**: 
  - Username: `admin`
  - Password: `admin123`
- **Protected Routes**: `AdminProtectedRoute` component

#### User System
- **Context**: `AuthProvider` (AuthContext)
- **Storage**: `localStorage` key `auth_user`
- **Types**: Customer, Restaurant, Admin (legacy)
- **Protected Routes**: `ProtectedRoute` component with role checks

### 🛣️ **Routing Systems**

#### Admin Routes (`AdminApp`)
```tsx
/admin                    → Redirect to /admin/login
/admin/login             → Admin login page (public)
/admin/dashboard         → Dashboard with stats (protected)
/admin/users             → User management (protected)
/admin/restaurants       → Restaurant management (protected)
/admin/orders            → Order management (protected)
/admin/*                 → Catch-all redirect to /admin/login
```

#### User Routes (`App`)
```tsx
/                        → Home page
/login                   → User/Restaurant login
/menu                    → Menu listing
/cart                    → Shopping cart (protected)
/checkout                → Checkout page
/orders                  → Order tracking
/restaurant              → Restaurant dashboard (restaurant role)
/sweetdreams             → SweetDreams dashboard (restaurant role)
```

### 🎨 **Shared Resources**

Both apps share:
- **Styled Components Theme**: `theme.ts`
- **Global Styles**: `GlobalStyle`
- **TypeScript Types**: `types/auth.ts`
- **Utility Functions**: `utils/`

### 📦 **Component Structure**

```
src/
├── main.tsx                      # Entry point with conditional render
├── admin/
│   └── AdminApp.tsx             # Independent admin application
├── pages/
│   ├── App.tsx                  # User-facing app router
│   └── admin/                   # Admin pages
│       ├── AdminLogin.tsx
│       ├── AdminDashboard.tsx
│       ├── AdminUsers.tsx
│       ├── AdminRestaurants.tsx
│       └── AdminOrders.tsx
├── components/
│   ├── AdminProtectedRoute.tsx  # Admin route guard
│   ├── ProtectedRoute.tsx       # User route guard
│   └── admin/
│       └── AdminNavigation.tsx  # Admin navigation
├── context/
│   ├── AdminAuthContext.tsx     # Admin authentication
│   ├── AuthContext.tsx          # User authentication
│   ├── CartContext.tsx          # Shopping cart
│   ├── OrderContext.tsx         # Order management
│   ├── ThemeContext.tsx         # Theme switching
│   └── WishlistContext.tsx      # Wishlist
└── types/
    └── auth.ts                  # Shared type definitions
```

## Benefits of This Architecture

### ✅ **Complete Isolation**
- Admin and user apps never interfere with each other
- Separate authentication prevents cross-contamination
- Independent routing avoids conflicts

### ✅ **Security**
- Admin routes are completely separate
- Different authentication mechanisms
- Protected routes with role-based access control

### ✅ **Maintainability**
- Clear separation of concerns
- Easy to modify one app without affecting the other
- Independent deployment possibilities

### ✅ **Performance**
- Only loads necessary code for each app
- No unnecessary provider wrapping
- Efficient bundle splitting

### ✅ **Scalability**
- Easy to add new admin features
- Can evolve each app independently
- Simple to add more specialized apps

## Development Workflow

### Running the Application

```bash
cd web
npm run dev
```

### Accessing Each App

- **User App**: `http://localhost:5173/`
- **Admin Panel**: `http://localhost:5173/admin/login`

### Testing

```bash
# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Run tests
npm test
```

## Future Enhancements

### Potential Improvements

1. **Code Splitting**: Implement dynamic imports for better performance
2. **Lazy Loading**: Load admin pages only when needed
3. **API Integration**: Replace mock data with real backend APIs
4. **Advanced Analytics**: Add comprehensive reporting in admin panel
5. **Multi-tenancy**: Support multiple admin organizations
6. **Role Hierarchy**: Implement fine-grained admin permissions

### Migration Path

If you need to merge the apps in the future:

1. Keep the dual-app structure
2. Add a shared `AppShell` component
3. Implement a unified router with nested routes
4. Maintain separate auth contexts but with shared session management

## Troubleshooting

### Common Issues

**Issue**: Admin routes show 404
- **Solution**: Ensure URL starts with `/admin`

**Issue**: Authentication not persisting
- **Solution**: Check localStorage keys (`admin_auth` for admin, `auth_user` for users)

**Issue**: Styling conflicts
- **Solution**: Both apps use the same theme; modify `theme.ts` to affect both

**Issue**: Type errors
- **Solution**: Ensure all types are imported from `types/auth.ts`

## Best Practices

1. **Keep Authentication Separate**: Never mix admin and user auth
2. **Use Type Safety**: Leverage TypeScript interfaces
3. **Follow Convention**: Admin routes always start with `/admin`
4. **Test Both Apps**: Verify changes don't break either system
5. **Document Changes**: Update this file when modifying architecture

## Conclusion

This dual-app architecture provides a robust, scalable foundation for managing both customer-facing features and administrative functions. The complete isolation ensures security, maintainability, and flexibility for future growth.
>>>>>>> 8590ecfe07ab04f8a0c3cf3782761ee3315c13eb
