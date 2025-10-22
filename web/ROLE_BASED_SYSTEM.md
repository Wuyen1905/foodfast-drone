# FoodFast Drone Delivery - Role-Based System

## 🚀 Overview

FoodFast Drone Delivery has been completely restructured with a comprehensive role-based system supporting three distinct user types: **Admin**, **Restaurant**, and **Customer**.

## 🏗️ Architecture

### Folder Structure
```
web/src/
├── pages/
│   ├── admin/                    # Admin Control Panel
│   │   └── AdminControlPanel.tsx
│   ├── restaurant/               # Restaurant Dashboards
│   │   ├── RestaurantDashboard.tsx
│   │   └── SweetDreamsDashboard.tsx
│   ├── customer/                 # Customer-specific pages
│   └── [shared pages]
├── components/
│   ├── admin/                    # Admin-specific components
│   ├── restaurant/               # Restaurant-specific components
│   ├── customer/                 # Customer-specific components
│   └── shared/                   # Shared components
├── types/
│   └── auth.ts                   # Authentication types
└── data/
    └── mockData.ts              # Mock data for users and restaurants
```

## 👥 User Roles & Access

### 1. Admin (`admin` / `admin123`)
- **Access**: Full system control
- **Features**:
  - View system overview with statistics
  - Manage all user accounts (view, suspend, delete)
  - Manage all restaurant accounts
  - Monitor all orders across the platform
  - Access detailed reports and analytics
- **Routes**: `/admin`

### 2. Restaurant Owners
#### FoodFast Restaurant (`admin` / `admin123`)
- **Access**: Original restaurant dashboard
- **Features**: Product management, order tracking, delivery monitoring
- **Routes**: `/restaurant`

#### SweetDreams Bakery (`sweetdreams` / `sweet123`)
- **Access**: Pink-themed bakery dashboard
- **Features**: Dessert management, order tracking, drone monitoring
- **Routes**: `/sweetdreams`
- **Theme**: Pink color palette (#E91E63, #F06292, #F8BBD9)

### 3. Customers
#### Customer 1 (`user` / `user123`)
- **Access**: Standard customer features
- **Features**: Browse menu, add to cart, place orders, track deliveries

#### Customer 2 (`user1` / `user1123`)
- **Access**: Standard customer features
- **Features**: Browse menu, add to cart, place orders, track deliveries
- **Routes**: `/cart`, `/checkout`, `/orders`

## 🎨 Theming System

### SweetDreams Bakery Theme
```typescript
const SWEETDREAMS_THEME = {
  primary: '#E91E63',    // Pink
  secondary: '#F06292',  // Light Pink
  accent: '#F8BBD9',    // Very Light Pink
  background: '#FCE4EC', // Pink Background
  light: '#FFF0F3'       // Light Pink Background
};
```

## 🛡️ Authentication & Authorization

### Role-Based Access Control
- **Protected Routes**: Each role has specific route access
- **Navigation**: Dynamic navigation based on user role
- **Session Management**: Persistent login with localStorage
- **Route Protection**: Automatic redirection for unauthorized access

### Authentication Flow
1. User logs in with credentials
2. System validates credentials against mock data
3. User role determines dashboard and feature access
4. Navigation updates based on role permissions

## 📊 Admin Control Panel Features

### Overview Tab
- Total users count
- Total restaurants count
- Total orders count
- Total revenue statistics

### Users Management
- View all user accounts
- Suspend/activate users
- Delete user accounts
- Role-based filtering

### Restaurants Management
- View all restaurant accounts
- Manage restaurant status
- View restaurant details
- Owner information

### Orders Management
- View all orders across platform
- Order status tracking
- Customer information
- Revenue tracking

### Reports (Future Enhancement)
- Detailed analytics
- Performance metrics
- Revenue reports
- User activity logs

## 🍰 SweetDreams Bakery Features

### Product Management
- Dessert-specific product categories
- Pink-themed UI components
- Cake and dessert management
- Special bakery branding

### Order Management
- Order status updates
- Drone delivery tracking
- Customer communication
- Revenue monitoring

## 🛒 Customer Features

### Shopping Experience
- Browse full menu including desserts
- Add items to cart
- Secure checkout process
- Order tracking with drone animation

### Order Management
- View order history
- Track active deliveries
- Real-time drone status
- Delivery notifications

## 🔧 Technical Implementation

### State Management
- **AuthContext**: Centralized authentication state
- **OrderContext**: Order management across roles
- **CartContext**: Shopping cart for customers
- **ThemeContext**: Dynamic theming support

### Component Architecture
- **Modular Design**: Separate components for each role
- **Shared Components**: Reusable UI components
- **Protected Routes**: Role-based route protection
- **Responsive Design**: Mobile-first approach

### Data Management
- **Mock Data**: Comprehensive test data
- **Local Storage**: Persistent state management
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Graceful error management

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
cd web
npm install
npm run dev
```

### Test Accounts
| Role | Username | Password | Access |
|------|----------|----------|---------|
| Admin | admin | admin123 | Full system control |
| Customer | user | user123 | Customer features |
| Customer | user1 | user1123 | Customer features |
| Restaurant | sweetdreams | sweet123 | SweetDreams Bakery |

## 🧪 Testing Workflows

### Admin Testing
1. Login as `admin` / `admin123`
2. Access `/admin` dashboard
3. Navigate through all tabs
4. Test user management features
5. Test restaurant management
6. View order analytics

### Restaurant Testing
1. Login as `sweetdreams` / `sweet123`
2. Access `/sweetdreams` dashboard
3. Test pink theme implementation
4. Manage dessert products
5. Update order statuses
6. Test drone animation

### Customer Testing
1. Login as `user1` / `user1123`
2. Browse menu including desserts
3. Add items to cart
4. Complete checkout process
5. Track order status
6. View drone delivery animation

## 🔮 Future Enhancements

### Planned Features
- Real-time notifications
- Advanced analytics dashboard
- Multi-restaurant support
- Payment integration
- Inventory management
- Customer reviews and ratings

### Technical Improvements
- Database integration
- API development
- Real-time updates
- Mobile app development
- Performance optimization

## 📝 Development Notes

### Key Changes Made
1. **Role System**: Implemented comprehensive role-based access
2. **Folder Structure**: Organized code by user roles
3. **Theming**: Added restaurant-specific themes
4. **Authentication**: Enhanced with role validation
5. **Navigation**: Dynamic navigation based on roles
6. **Product Management**: Added dessert category
7. **Admin Panel**: Complete management interface

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code quality enforcement
- **Modular Design**: Maintainable architecture
- **Documentation**: Comprehensive comments
- **Error Handling**: Graceful error management

## 🤝 Contributing

1. Follow the established folder structure
2. Maintain role-based access control
3. Use TypeScript for all new code
4. Test all user workflows
5. Update documentation for new features

## 📄 License

This project is part of the FoodFast Drone Delivery system.
