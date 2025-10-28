# FoodFast Development Setup

## Quick Start

### Option 1: PowerShell (Recommended)
```powershell
cd web
npm run dev
```

### Option 2: Batch File
```cmd
cd web
start-dev.bat
```

### Option 3: PowerShell Script
```powershell
cd web
.\start-dev.ps1
```

## Troubleshooting

### Vite Cache Issues
If you encounter "soft-invalidated module" errors:

1. **Clean cache manually:**
   ```cmd
   cd web
   if exist node_modules\.vite rmdir /s /q node_modules\.vite
   if exist dist rmdir /s /q dist
   npm install
   npm run dev
   ```

2. **Use the provided scripts:**
   - `start-dev.bat` (Windows CMD)
   - `start-dev.ps1` (PowerShell)

### PowerShell Syntax Issues
- **Problem:** `&&` operator not supported in PowerShell
- **Solution:** Use `;` instead or run commands separately:
  ```powershell
  cd web; npm run dev
  ```

### Port Conflicts
- Default port: 5173
- If busy, Vite will try 5174, 5175, etc.
- Check running ports: `netstat -an | findstr :5173`

## Development Features

### Customer Registration
- **URL:** `http://localhost:5174/register`
- **Features:** Full form validation, phone formatting, email validation
- **Integration:** Seamless with existing AuthContext

### Admin Dashboard
- **URL:** `http://localhost:5174/admin/login`
- **Features:** Restaurant management, drone monitoring, system logs

### Restaurant Dashboards
- **SweetDreams:** `http://localhost:5174/restaurant/sweetdreams`
- **Aloha Kitchen:** `http://localhost:5174/aloha-dashboard`

## File Structure
```
web/
├── src/
│   ├── pages/
│   │   ├── RegisterPage.tsx      # New customer registration
│   │   ├── Login.tsx             # Updated with registration link
│   │   └── ...
│   ├── context/
│   │   └── AuthContext.tsx      # Enhanced with register function
│   ├── services/
│   │   └── customerService.ts    # Mock API for registration
│   └── types/
│       └── auth.ts               # Updated with RegisterPayload
├── start-dev.bat                 # Windows batch file
├── start-dev.ps1                 # PowerShell script
└── package.json                  # Updated with postinstall script
```

## Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - TypeScript type checking

### Testing
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

## Cache Management

The `postinstall` script automatically cleans Vite cache:
```json
"postinstall": "rimraf node_modules/.vite dist"
```

This prevents soft-invalidated module issues after dependency updates.

## Common Issues

1. **"soft-invalidated module" error**
   - Solution: Clean cache and restart
   - Use provided scripts for automatic cleanup

2. **PowerShell `&&` syntax error**
   - Solution: Use `;` or run commands separately
   - Use provided batch/PowerShell scripts

3. **Port already in use**
   - Solution: Vite will automatically find next available port
   - Check `netstat -an | findstr :5173` for port usage

4. **Module not found errors**
   - Solution: Run `npm install` to ensure all dependencies are installed
   - Check that you're in the correct directory (`web/`)

## Success Indicators

✅ Server starts without errors
✅ No "soft-invalidated module" warnings
✅ All pages load correctly:
- `/register` - Customer registration
- `/login` - User login
- `/admin/login` - Admin login
- `/menu` - Main menu

✅ Hot Module Replacement (HMR) works smoothly
✅ No console errors in browser
✅ All TypeScript types resolve correctly
