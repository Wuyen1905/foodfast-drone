# 🛸 FoodFast Drone Delivery

A modern, professional-grade food delivery application featuring real-time drone tracking, built with React.js and React Native.

## ✨ Features

### 🚀 Core Functionality
- **Real-time Drone Tracking**: Live ETA countdown with animated flight paths
- **Unified Order Management**: Combined order tracking and drone monitoring
- **Vietnamese Dong Currency**: Proper VND formatting throughout the app
- **Responsive Design**: Works seamlessly on desktop and mobile

### 👥 User Experience
- **Guest Checkout**: Unauthenticated users can order via Customer Info Form
- **Order Limits**: Maximum 2 active orders per phone number for logged-in users
- **Form Validation**: Comprehensive validation with Vietnamese error messages
- **Dark Mode**: Toggle between light and dark themes

### 🔐 Authentication & Roles
- **User Authentication**: Login/Register system
- **Admin Dashboard**: Complete order management and menu editing
- **Role-based Access**: Different features for users vs admins
- **Protected Routes**: Secure access control

### 🛩️ Drone Simulation
- **Realistic ETA Calculation**: Based on distance (2-10km) and drone speed
- **Animated Flight Paths**: Smooth drone movement with Framer Motion
- **Progress Synchronization**: Real-time progress bar updates
- **Status Management**: Preparing → Delivering → Completed workflow

## 🏗️ Architecture

### 📁 Project Structure
```
web/src/
├── api/              # Backend mock or Firebase connections
├── components/       # Reusable UI components
├── contexts/         # React contexts (Auth, Cart, Theme)
├── pages/            # Main application pages
├── utils/            # Utility functions (validation, currency)
├── constants/        # Application constants
├── hooks/            # Custom React hooks
├── services/         # API services
└── assets/           # Static assets
```

### 🎨 Design System
- **Styled Components**: CSS-in-JS with TypeScript
- **Framer Motion**: Smooth animations and transitions
- **Theme System**: Centralized color and spacing tokens
- **Responsive Grid**: Mobile-first design approach

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/foodfast-drone-delivery.git
   cd foodfast-drone-delivery
   ```

2. **Install dependencies**
   ```bash
   # Web application
   cd web
   npm install
   
   # Mobile application (optional)
   cd ../mobile
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment files
   cp .env.development.example .env.development
   cp .env.production.example .env.production
   
   # Edit environment variables
   nano .env.development
   ```

4. **Start development server**
   ```bash
   # Web app
   cd web
   npm run dev
   
   # Mobile app (with Expo)
   cd mobile
   npm start
   ```

### Environment Variables

```env
# Development Configuration
VITE_APP_NAME=FoodFast Drone Delivery
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=http://localhost:3000/api
VITE_MAPBOX_TOKEN=your_mapbox_token_here
VITE_DRONE_SPEED_KM_PER_MIN=1.5
VITE_MAX_ORDERS_PER_PHONE=2
VITE_DEFAULT_CURRENCY=VND
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_ANIMATIONS=true
VITE_DEBUG_MODE=true
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format with Prettier
npm run type-check   # TypeScript type checking

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Code Quality Tools

- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **TypeScript**: Static type checking
- **Husky**: Git hooks for pre-commit checks

### Testing

```bash
# Run all tests
npm test

# Run specific test files
npm test -- --testNamePattern="DroneJourney"

# Run tests with coverage
npm run test:coverage
```

## 📱 Mobile Development

### React Native Setup

1. **Install Expo CLI**
   ```bash
   npm install -g @expo/cli
   ```

2. **Start mobile development**
   ```bash
   cd mobile
   npm start
   ```

3. **Run on device**
   - Install Expo Go app on your phone
   - Scan QR code from terminal
   - Or use iOS Simulator/Android Emulator

## 🚀 Deployment

### Web Application (Vercel)

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy**
   ```bash
   cd web
   vercel --prod
   ```

### Mobile Application

1. **Build for production**
   ```bash
   cd mobile
   expo build:android
   expo build:ios
   ```

2. **Publish to app stores**
   ```bash
   expo publish
   ```

## 🧪 Testing

### Test Structure
```
web/src/
├── __tests__/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── hooks/
```

### Writing Tests

```typescript
// Example test for DroneJourney component
import { render, screen } from '@testing-library/react';
import { DroneJourney } from '../components/DroneJourney';

describe('DroneJourney', () => {
  it('renders drone tracking when active', () => {
    render(<DroneJourney orderId="test-123" isActive={true} />);
    expect(screen.getByText('🛩️ Hành trình Drone Giao Hàng')).toBeInTheDocument();
  });
});
```

## 📊 Performance

### Optimization Features
- **Code Splitting**: Lazy loading of components
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Webpack bundle analyzer
- **Caching**: Service worker for offline support

### Performance Metrics
- **Lighthouse Score**: 95+ across all categories
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run test
   npm run lint
   npm run format
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Standardized commit messages
- **Test Coverage**: Minimum 80% coverage required

## 📝 API Documentation

### Endpoints

```typescript
// Order Management
GET    /api/orders           # Get all orders
POST   /api/orders           # Create new order
PUT    /api/orders/:id       # Update order status
DELETE /api/orders/:id       # Cancel order

// Drone Tracking
GET    /api/drone/:orderId   # Get drone status
POST   /api/drone/start      # Start drone delivery
PUT    /api/drone/:orderId   # Update drone position

// User Management
POST   /api/auth/login       # User login
POST   /api/auth/register    # User registration
GET    /api/auth/profile     # Get user profile
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **TypeScript Errors**
   ```bash
   # Check type definitions
   npm run type-check
   ```

3. **ESLint Errors**
   ```bash
   # Auto-fix issues
   npm run lint:fix
   ```

### Debug Mode

Enable debug mode in development:
```env
VITE_DEBUG_MODE=true
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Framer Motion** for smooth animations
- **Styled Components** for CSS-in-JS
- **React Hot Toast** for notifications
- **Day.js** for date manipulation
- **Expo** for React Native development

## 📞 Support

For support and questions:
- 📧 Email: support@foodfast.com
- 💬 Discord: [FoodFast Community](https://discord.gg/foodfast)
- 📖 Documentation: [docs.foodfast.com](https://docs.foodfast.com)

---

**Made with ❤️ by the FoodFast Team**
