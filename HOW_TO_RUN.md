# 🚀 How to Run FoodFast Drone Delivery Web App

## ⚠️ IMPORTANT: Correct Project Directory

The web application's `package.json` is located in the **`/web`** subdirectory, NOT the project root.

### 📂 Project Structure:
```
food_delivery_meal-main/           ← Project root (DO NOT run npm here)
├── web/                           ← ✅ RUN NPM COMMANDS HERE
│   ├── package.json              ← The correct package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── src/
│   └── ...
├── mobile/                        ← Separate mobile app
├── lib/                           ← Flutter library (if any)
└── README.md
```

---

## ✅ Quick Start (Copy & Paste)

### **Step 1: Navigate to the web directory**
```bash
cd C:\Users\LENOVO\OneDrive\Documents\W\CNPM\food_delivery_meal-main\web
```

### **Step 2: Install dependencies (first time only)**
```bash
npm install
```

### **Step 3: Start development server**
```bash
npm run dev
```

### **Step 4: Open your browser**
- URL: **http://localhost:5173**
- The server will automatically open this for you

---

## 🔧 Common Commands

### Development:
```bash
cd web
npm run dev          # Start dev server with hot reload
```

### Production Build:
```bash
cd web
npm run build        # Build for production
npm run preview      # Preview production build
```

### Code Quality:
```bash
cd web
npm run lint         # Check for linting errors
npm run lint:fix     # Auto-fix linting errors
npm run type-check   # TypeScript type checking
```

### Testing:
```bash
cd web
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
```

---

## 🐛 Troubleshooting

### Error: "npm ERR! enoent Could not read package.json"
**Problem:** You're running npm from the wrong directory

**Solution:**
```bash
# Always run from /web directory
cd C:\Users\LENOVO\OneDrive\Documents\W\CNPM\food_delivery_meal-main\web
npm run dev
```

### Error: Module not found or import errors
**Solution:** Clear cache and reinstall
```bash
cd web
Remove-Item -Recurse -Force node_modules\.vite
npm run dev
```

### Error: Port 5173 already in use
**Solution:** Kill the existing process
```powershell
# Find process using port 5173
netstat -ano | findstr :5173

# Kill it (replace PID with the number from above)
taskkill /PID <PID> /F

# Then restart
npm run dev
```

### Browser shows old/cached version
**Solution:** Hard refresh your browser
- **Chrome/Edge:** `Ctrl + Shift + R` or `Ctrl + F5`
- **Firefox:** `Ctrl + Shift + R`
- Or open DevTools → Network tab → Check "Disable cache"

---

## 📦 Tech Stack

- **Framework:** React 18.3.1
- **Build Tool:** Vite 5.4.0
- **Language:** TypeScript 5.0.2
- **Styling:** Styled Components 6.1.19
- **Routing:** React Router DOM 7.9.4
- **Notifications:** React Hot Toast 2.6.0
- **Animations:** Framer Motion 11.18.2
- **Charts:** Recharts 2.x

---

## 🎯 Test Credentials

| Role | Username | Password | Access |
|------|----------|----------|--------|
| 👤 Customer | `user` | `user123` | Can shop and order |
| 🏪 Restaurant | `sweetdreams` | `sweet123` | Manage SweetDreams Bakery |
| 🏪 Restaurant | `aloha_restaurant` | `aloha123` | Manage Aloha Kitchen |
| 👨‍💼 Admin | `admin` | `admin123` | Full system access |

---

## 📱 Available URLs

- **Home/Menu:** http://localhost:5173/menu
- **Login:** http://localhost:5173/login
- **Cart:** http://localhost:5173/cart (customers only)
- **Checkout:** http://localhost:5173/checkout
- **Orders:** http://localhost:5173/orders
- **Restaurant Dashboard:** http://localhost:5173/restaurant
- **Admin Dashboard:** http://localhost:5173/admin/dashboard

---

## 🎨 Features by Role

### 👤 Customer:
- Browse menu from all restaurants
- Add items to cart
- Add items to wishlist
- Place orders
- Track orders with drone delivery simulation

### 🏪 Restaurant:
- View restaurant dashboard
- Manage menu items (Add/Edit/Delete/Toggle availability)
- View active orders
- Track drone deliveries
- View analytics and statistics

### 👨‍💼 Admin:
- Manage all users
- Manage all restaurants
- View all orders
- System-wide analytics

---

## 💡 Development Tips

1. **Always run commands from `/web` directory**
2. **Use hot reload** - changes auto-refresh in browser
3. **Check browser console** for any runtime errors
4. **Clear Vite cache** if you see stale imports
5. **Use VS Code extensions:**
   - ESLint
   - Prettier
   - TypeScript
   - Styled Components

---

## 📚 Documentation

- [Role-Based Menu Enhancement](./web/ROLE_BASED_MENU_ENHANCEMENT_COMPLETE.md)
- [Critical Fixes Summary](./web/CRITICAL_FIXES_SUMMARY.md)
- [Quick Test Guide](./web/QUICK_TEST_GUIDE.md)
- [Diagnostic Report](./web/DIAGNOSTIC_REPAIR_COMPLETE.md)

---

**Last Updated:** October 22, 2025  
**Status:** ✅ Production Ready

