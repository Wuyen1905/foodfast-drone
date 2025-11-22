# 🚀 FoodFast Launcher Scripts

## Overview

Two launcher scripts are provided to start all FoodFast services with a single double-click:

- **`run_all.bat`** - Windows batch script
- **`run_all.sh`** - Mac/Linux bash script

## Quick Start

### Windows
1. **Double-click** `run_all.bat`
2. Three terminal windows will open automatically:
   - Mock API (port 5000)
   - Web App (port 5173)
   - Mobile App (Expo)

### Mac/Linux
1. **Right-click** `run_all.sh` → Properties → Permissions → Check "Execute"
   OR run: `chmod +x run_all.sh`
2. **Double-click** `run_all.sh`
3. Three terminal windows will open automatically

## What the Scripts Do

### Step 1: Check Prerequisites
- ✅ Verifies Node.js is installed
- ✅ Shows error if Node.js is missing

### Step 2: Start Services
1. **Mock API** - Starts JSON Server on port 5000
2. **Web App** - Starts Vite dev server on port 5173
3. **Mobile App** - Starts Expo development tools

### Step 3: Display Status
- ✅ Shows success messages
- ✅ Displays service URLs
- ✅ Provides helpful tips

## Service URLs

After running the scripts:

- **Mock API**: http://localhost:5000
- **Web App**: http://localhost:5173
- **Mobile App**: Expo DevTools (check terminal window)

## Troubleshooting

### Windows Issues

**Script won't run:**
- Right-click → Run as Administrator
- Check that Node.js is installed: `node --version`

**Terminal windows close immediately:**
- Scripts use `/k` flag to keep windows open
- Check for errors in the terminal output

**Port already in use:**
- Close other applications using ports 5000 or 5173
- Or modify port numbers in respective `package.json` files

### Mac/Linux Issues

**Permission denied:**
```bash
chmod +x run_all.sh
```

**Terminal emulator not detected:**
- Script will fall back to background mode
- Manually start services in separate terminals

**Services don't start:**
- Check Node.js installation: `node --version`
- Ensure npm packages are installed in each directory

## Manual Start (Alternative)

If scripts don't work, start services manually:

**Terminal 1:**
```bash
cd mock-api
npm install
npm start
```

**Terminal 2:**
```bash
cd frontend-web
npm install
npm run dev
```

**Terminal 3:**
```bash
cd frontend-mobile
npm install
npm start
```

## Script Features

### Windows (`run_all.bat`)
- ✅ Node.js detection
- ✅ Automatic directory navigation
- ✅ Separate terminal windows for each service
- ✅ Progress messages
- ✅ Success confirmation
- ✅ Pause at end (keeps window open)

### Mac/Linux (`run_all.sh`)
- ✅ Node.js detection
- ✅ Automatic terminal emulator detection
- ✅ Support for multiple terminal emulators:
  - gnome-terminal (GNOME)
  - xterm (X11)
  - konsole (KDE)
  - x-terminal-emulator (generic)
- ✅ Progress messages
- ✅ Success confirmation
- ✅ Fallback to background mode if needed

## Notes

- **First Run**: Scripts will run `npm install` automatically if needed
- **Dependencies**: Ensure Node.js v16+ is installed
- **Ports**: Default ports are 5000 (API) and 5173 (Web)
- **Stopping**: Close individual terminal windows to stop specific services

## Support

For issues or questions:
1. Check the main `README.md`
2. Review `ARCHITECTURE.md` for structure details
3. See `VERIFICATION_REPORT.md` for setup verification

