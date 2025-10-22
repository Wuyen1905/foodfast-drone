# 🏪 FoodFast Restaurant Dashboard

> **A modern, full-featured restaurant management platform built with React + TypeScript**

![Status](https://img.shields.io/badge/status-production--ready-success)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 🎯 Overview

The **FoodFast Restaurant Dashboard** is a comprehensive web application designed for restaurant owners to manage their drone delivery operations. It features a beautiful tabbed interface with real-time statistics, menu management, order tracking, and interactive drone monitoring.

### ✨ Key Features

- 📊 **Real-time Analytics** - Live statistics with animated cards
- 🍽️ **Menu Management** - Full CRUD operations for dishes
- 📦 **Order Tracking** - Advanced search and filtering
- 🚁 **Drone Monitoring** - Visual map with live tracking
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI/UX** - Smooth animations and transitions

---

## 🚀 Quick Start

### Prerequisites
```bash
Node.js >= 18.x
npm >= 9.x
```

### Installation
```bash
# Navigate to web directory
cd web

# Install dependencies
npm install

# Start development server
npm run dev
```

### Access Dashboard
```
URL: http://localhost:5174/restaurant

Login Credentials:
  Username: sweetdreams
  Password: sweet123
```

---

## 📸 Screenshots

### Overview Tab - Quick Statistics
```
┌─────────────────────────────────────────────────────────┐
│  🏪 Bảng điều khiển nhà hàng        [🚪 Đăng xuất]     │
│  Chào mừng trở lại, Sweet Dreams!                       │
└─────────────────────────────────────────────────────────┘

┌──────────┬──────────┬──────────┬──────────┐
│ 👥       │ 📦       │ 🚁       │ ✅       │
│ 42       │ 156      │ 8        │ 142      │
│ Khách    │ Đơn hàng │ Drones   │ Hoàn tất │
└──────────┴──────────┴──────────┴──────────┘

┌─────────────────────────────────────────────┐
│ 👨‍🍳 Chào mừng Sweet Dreams!              │
│    Quản lý nhà hàng dễ dàng với FoodFast   │
└─────────────────────────────────────────────┘
```

### Menu Management Tab
```
┌─────────────────────────────────────────────┐
│ 🍽️ Quản lý Menu         [+ Thêm món ăn]    │
├─────────────────────────────────────────────┤
│ [Tất cả] [Món chính] [Tráng miệng] [Đồ uống]│
├─────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │  🍜     │  │  🍕     │  │  🍰     │    │
│  │  Phở Bò │  │  Pizza  │  │  Bánh   │    │
│  │ 65,000đ │  │ 120,000 │  │ 45,000  │    │
│  │ [✏️] [🗑️]│  │ [✏️] [🗑️]│  │ [✏️] [🗑️]│    │
│  └─────────┘  └─────────┘  └─────────┘    │
└─────────────────────────────────────────────┘
```

### Order Tracking Tab
```
┌─────────────────────────────────────────────┐
│ 📦 Đơn hàng                     [🔍 Tìm...] │
├─────────────────────────────────────────────┤
│ ID      │ Khách    │ SĐT       │ Trạng thái │
├─────────┼──────────┼───────────┼────────────┤
│ #123456 │ Nguyễn A │ 090...123 │ 🔵 Giao    │
│ #123457 │ Trần B   │ 091...456 │ 🟡 Chuẩn bị│
│ #123458 │ Lê C     │ 092...789 │ 🟢 Hoàn tất│
└─────────┴──────────┴───────────┴────────────┘
```

### Drone Tracker Tab
```
┌─────────────────────────────────────────────┐
│ 🚁 Theo dõi Drone                           │
│ [🗺️ Bản đồ] [📋 Danh sách] [▶️ Mô phỏng]   │
├─────────────────────────────────────────────┤
│                                             │
│    🏪 (Nhà hàng)                            │
│        \                                    │
│         \  🚁 (Drone đang bay)              │
│          \                                  │
│           📍 (Khách hàng)                   │
│                                             │
│    🏪                   📍                  │
│        \               /                    │
│         \  🚁  🚁     /                     │
│          \           /                      │
│           📍       📍                       │
└─────────────────────────────────────────────┘
```

---

## 🏗️ Architecture

### Component Structure
```
RestaurantDashboard/
│
├── 📊 Overview Tab
│   ├── QuickStats (Stat cards)
│   └── WelcomeBanner
│
├── 🍽️ Menu Tab
│   └── MyMenu
│       └── MenuManagement
│           ├── Add Dish Modal
│           ├── Edit Dish Modal
│           ├── Category Filter
│           └── Search Bar
│
├── 📦 Orders Tab
│   └── ActiveOrders
│       └── OrderTracking
│           ├── Order Table
│           ├── Status Badges
│           ├── Search Filter
│           └── Action Buttons
│
└── 🚁 Drones Tab
    └── DroneTracker
        ├── Map View
        │   ├── Restaurant Marker
        │   ├── Customer Markers
        │   ├── Drone Icons
        │   └── Flight Paths
        └── List View
            └── Drone Cards
```

### Technology Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18 |
| **Language** | TypeScript 5 |
| **Styling** | Styled-Components 6 |
| **Animation** | Framer Motion 10 |
| **Routing** | React Router 6 |
| **State** | React Context API |
| **Notifications** | React Hot Toast |
| **Date** | Day.js |
| **Build** | Vite 5 |

---

## 📚 Component API

### QuickStats
```typescript
<QuickStats 
  stats={{
    totalCustomers: number;
    totalOrders: number;
    activeDrones: number;
    completedDeliveries: number;
    todayRevenue?: number;
    avgDeliveryTime?: number;
  }}
  theme={{
    primary: string;
    secondary: string;
  }}
/>
```

### DroneTracker
```typescript
<DroneTracker 
  restaurantId="restaurant-id"
  theme={{
    primary: string;
    secondary: string;
  }}
/>
```

**Features:**
- 🗺️ Map view with animated markers
- 📋 List view with drone cards
- ▶️ Simulation mode for demos
- 🎨 Custom theming support

### MyMenu
```typescript
<MyMenu 
  restaurantId="restaurant-id"
  theme={{
    primary: string;
    secondary: string;
    accent: string;
  }}
/>
```

**Operations:**
- ➕ Add new dishes
- ✏️ Edit existing dishes
- 🗑️ Delete dishes
- 🔍 Search and filter
- 📂 Category organization

### ActiveOrders
```typescript
<ActiveOrders 
  restaurantId="restaurant-id"
  theme={{
    primary: string;
    secondary: string;
    accent: string;
  }}
/>
```

**Features:**
- 📊 Order statistics
- 🔍 Search by customer
- 🏷️ Filter by status
- ⚡ Quick status updates
- 📱 Responsive table

---

## 🎨 Theming

### Default Theme
```typescript
const restaurantTheme = {
  primary: '#FF6600',    // FoodFast Orange
  secondary: '#e55a00',  // Darker Orange
  accent: '#ff8534',     // Light Orange
};
```

### Custom Theme
```typescript
// In RestaurantDashboard.tsx
const customTheme = {
  primary: '#YOUR_COLOR',
  secondary: '#YOUR_COLOR',
  accent: '#YOUR_COLOR',
};
```

### Color Palette
```css
/* Status Colors */
--processing: #ffc107;  /* Yellow */
--delivering: #007bff;  /* Blue */
--completed: #28a745;   /* Green */
--cancelled: #dc3545;   /* Red */

/* UI Colors */
--background: #f8f9fa;
--surface: #ffffff;
--border: #e1e5e9;
--text: #333333;
--text-light: #6c757d;
```

---

## 🔐 Authentication

### Access Control
```typescript
// Protected route in App.tsx
<Route path="/restaurant" element={
  <ProtectedRoute requireRole="restaurant">
    <RestaurantDashboard />
  </ProtectedRoute>
} />
```

### Auth Checks
1. ✅ Token validation
2. ✅ Role verification (restaurant/admin only)
3. ✅ User object consistency
4. ✅ localStorage sync

### Error Handling
- 🔴 Missing auth → Error message + Login link
- 🔴 Wrong role → Unauthorized message
- 🔴 Expired token → Auto-logout
- 🔴 Data mismatch → Clear & re-login

---

## 📱 Responsive Design

### Breakpoints
```scss
/* Desktop */
@media (min-width: 1200px) {
  /* Full layout with sidebar */
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1199px) {
  /* Adjusted grid, 2 columns */
}

/* Mobile */
@media (max-width: 767px) {
  /* Stacked layout, 1 column */
  /* Horizontal tab scrolling */
}
```

### Mobile Optimizations
- ✅ Touch-friendly buttons (min 44px)
- ✅ Swipeable tabs
- ✅ Collapsible sections
- ✅ Simplified map view
- ✅ Reduced animations
- ✅ Optimized images

---

## ⚡ Performance

### Build Stats
```
Bundle Size:  543.79 KB
Gzipped:      169.37 KB
Build Time:   4.63s
Load Time:    < 2s
```

### Optimizations
- ✅ Code splitting per tab
- ✅ Lazy loading components
- ✅ Memoized calculations
- ✅ Debounced search
- ✅ Throttled animations
- ✅ Virtual scrolling (planned)

### Lighthouse Score (Target)
- 🟢 Performance: 90+
- 🟢 Accessibility: 95+
- 🟢 Best Practices: 100
- 🟢 SEO: 90+

---

## 🧪 Testing

### Manual Test Checklist
- [ ] Login with restaurant credentials
- [ ] Navigate to /restaurant
- [ ] Verify all 4 tabs load
- [ ] Test Overview tab stats
- [ ] Add/Edit/Delete menu items
- [ ] Search and filter orders
- [ ] Switch drone tracker views
- [ ] Start simulation mode
- [ ] Test on mobile device
- [ ] Verify logout works

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari 14+
- ✅ Chrome Mobile 90+

---

## 📖 Documentation

### Available Guides
1. **RESTAURANT_DASHBOARD_GUIDE.md**
   - Complete feature documentation
   - Component API reference
   - Troubleshooting guide
   - Best practices

2. **ENHANCEMENT_SUMMARY.md**
   - Project overview
   - Before/after comparison
   - Technical achievements
   - Success metrics

3. **RESTAURANT_AUTH_FIX.md**
   - Authentication system
   - Security improvements
   - localStorage management

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Server
```bash
# Build output is in dist/
npm run preview  # Test production build locally

# Deploy to hosting (example: Vercel)
vercel deploy --prod
```

### Environment Variables
```env
VITE_API_URL=https://api.yourserver.com
VITE_APP_ENV=production
```

---

## 🛠️ Development

### Project Structure
```
web/
├── src/
│   ├── components/
│   │   └── restaurant/
│   │       ├── QuickStats.tsx
│   │       ├── DroneTracker.tsx
│   │       ├── MyMenu.tsx
│   │       ├── ActiveOrders.tsx
│   │       ├── MenuManagement.tsx
│   │       └── OrderTracking.tsx
│   │
│   ├── pages/
│   │   └── restaurant/
│   │       └── RestaurantDashboard.tsx
│   │
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── OrderContext.tsx
│   │
│   └── utils/
│       └── currency.ts
│
└── docs/
    ├── RESTAURANT_DASHBOARD_GUIDE.md
    ├── ENHANCEMENT_SUMMARY.md
    └── README_RESTAURANT_DASHBOARD.md
```

### Adding a New Tab
```typescript
// 1. Define tab type
type TabType = 'overview' | 'menu' | 'orders' | 'drones' | 'custom';

// 2. Add to tabs array
const tabs = [
  { id: 'custom' as TabType, icon: '🔧', label: 'Custom' },
];

// 3. Add render case
const renderTabContent = () => {
  switch (activeTab) {
    case 'custom':
      return <CustomComponent />;
  }
};
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Blank screen**
```
Solution:
1. Check browser console for errors
2. Verify authentication (token + role)
3. Clear localStorage and re-login
4. Check ErrorBoundary logs
```

**Issue: Stats show 0**
```
Solution:
1. Verify OrderContext has data
2. Check mockData.ts is loaded
3. Add test orders via customer flow
4. Refresh the page
```

**Issue: Tabs not switching**
```
Solution:
1. Check activeTab state updates
2. Verify tab content renders
3. Clear browser cache
4. Check console for errors
```

**Issue: Drone animation frozen**
```
Solution:
1. Click "▶️ Mô phỏng" to start
2. Ensure orders exist with status "Delivering"
3. Check Framer Motion is installed
4. Verify setInterval is running
```

---

## 🤝 Contributing

### Code Style
- Use TypeScript for type safety
- Follow React hooks best practices
- Use styled-components for styling
- Add comments for complex logic
- Write descriptive commit messages

### Pull Request Process
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Run linter: `npm run lint`
5. Build: `npm run build`
6. Submit PR with description

---

## 📜 License

MIT License - feel free to use this project for learning or commercial purposes.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Styled-Components** - For powerful CSS-in-JS
- **Framer Motion** - For smooth animations
- **Vite** - For lightning-fast builds

---

## 📞 Support

**Issues**: Open an issue on GitHub  
**Email**: support@foodfast.com  
**Docs**: See documentation files  

---

## 🎉 Status

✅ **Production Ready**  
⭐ **Version**: 2.0.0  
📅 **Last Updated**: October 21, 2025  
🚀 **Ready to Deploy**  

---

**Built with ❤️ by the FoodFast Team**

