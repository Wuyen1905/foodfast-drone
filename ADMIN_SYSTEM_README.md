# Admin Management System

## Overview
A comprehensive admin management system for the FoodFast delivery application, providing complete control over users, restaurants, and orders.

## Features

### 🔐 Authentication
- **Separate Admin Login**: Independent authentication system at `/admin/login`
- **Mock Credentials**: 
  - Username: `admin`
  - Password: `admin123`
- **Session Management**: Persistent admin sessions with localStorage
- **Route Protection**: All admin routes are protected and redirect to login if not authenticated

### 📊 Dashboard
- **Summary Statistics**: Total users, restaurants, orders, and revenue
- **Modern UI**: Clean cards with hover animations and responsive design
- **Quick Navigation**: Direct access to all management sections

### 👥 User Management (`/admin/users`)
- **User Overview**: View all user accounts with detailed information
- **User Data**: Name, email, phone, role, order count, creation date
- **CRUD Operations**: Add, edit, and delete user accounts
- **Role Management**: Admin, Restaurant, and Customer roles

### 🏪 Restaurant Management (`/admin/restaurants`)
- **Restaurant Overview**: Manage all restaurant accounts
- **Restaurant Data**: Name, category, location, rating, status
- **Status Control**: Activate/deactivate restaurants
- **CRUD Operations**: Add, edit, and delete restaurant accounts

### 📦 Order Management (`/admin/orders`)
- **Order Overview**: Monitor all orders in the system
- **Order Data**: Order ID, customer, restaurant, items, total, status
- **Status Filtering**: Filter orders by status (pending, confirmed, preparing, delivering, delivered, cancelled)
- **Order Actions**: View, update status, and cancel orders

## Technical Implementation

### 🏗️ Project Structure
```
src/
├── pages/admin/
│   ├── AdminLogin.tsx          # Admin login page
│   ├── AdminDashboard.tsx     # Main dashboard
│   ├── AdminUsers.tsx         # User management
│   ├── AdminRestaurants.tsx   # Restaurant management
│   └── AdminOrders.tsx        # Order management
├── components/admin/
│   └── AdminNavigation.tsx    # Navigation component
├── context/
│   └── AdminAuthContext.tsx   # Admin authentication context
└── types/
    └── auth.ts               # Enhanced TypeScript interfaces
```

### 🛣️ Routing
- `/admin/login` → AdminLogin.tsx
- `/admin/dashboard` → AdminDashboard.tsx (protected)
- `/admin/users` → AdminUsers.tsx (protected)
- `/admin/restaurants` → AdminRestaurants.tsx (protected)
- `/admin/orders` → AdminOrders.tsx (protected)

### 🎨 Design Features
- **Modern UI**: Clean, professional design with consistent styling
- **Responsive Design**: Mobile-friendly with CSS Grid and Flexbox
- **Hover Effects**: Smooth animations and transitions
- **Color Scheme**: Professional blue gradient theme
- **Typography**: Consistent font weights and sizes
- **Icons**: Emoji icons for better visual representation

### 🔧 Technical Features
- **TypeScript**: Full type safety with comprehensive interfaces
- **Styled Components**: CSS-in-JS for component styling
- **React Context**: State management for admin authentication
- **Protected Routes**: Route guards for admin-only access
- **Mock Data**: Realistic sample data for demonstration
- **Performance**: Optimized with React.memo and useCallback where needed

## Usage

1. **Access Admin Panel**: Navigate to `/admin/login`
2. **Login**: Use credentials `admin` / `admin123`
3. **Dashboard**: View system overview and navigate to management sections
4. **Manage Data**: Use CRUD operations to manage users, restaurants, and orders
5. **Logout**: Click logout button to return to login screen

## Integration

The admin system is fully integrated with the existing application:
- **Preserves Existing Routes**: All original user and restaurant routes remain functional
- **Separate Authentication**: Admin auth is independent from user/restaurant auth
- **Consistent Styling**: Matches the main application's design language
- **Responsive Layout**: Works seamlessly across all device sizes

## Future Enhancements

- **Real API Integration**: Replace mock data with actual API calls
- **Advanced Filtering**: More sophisticated search and filter options
- **Bulk Operations**: Select multiple items for batch operations
- **Export Features**: Export data to CSV/Excel formats
- **Analytics**: Advanced reporting and analytics dashboard
- **Notifications**: Real-time notifications for order updates
- **Audit Logs**: Track all admin actions and changes
