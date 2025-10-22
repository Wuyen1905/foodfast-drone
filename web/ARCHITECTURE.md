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
