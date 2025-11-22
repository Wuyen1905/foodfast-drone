# 🚀 FoodFast - Start Here!

## Quick Start (Double-Click)

### Windows Users
**Simply double-click:** `run_all.bat`

This will automatically:
- ✅ Start Mock API on port 5000
- ✅ Start Web App on port 5173
- ✅ Start Mobile App (Expo)

### Mac/Linux Users
1. **First time only:** Right-click `run_all.sh` → Properties → Permissions → Check "Execute"
   OR run: `chmod +x run_all.sh`
2. **Then double-click:** `run_all.sh`

This will automatically:
- ✅ Start Mock API on port 5000
- ✅ Start Web App on port 5173
- ✅ Start Mobile App (Expo)

## What Happens

When you run the launcher script:

1. **Checks Prerequisites**
   - Verifies Node.js is installed
   - Shows error if missing

2. **Opens Three Terminal Windows**
   - **Terminal 1:** Mock API (http://localhost:5000)
   - **Terminal 2:** Web App (http://localhost:5173)
   - **Terminal 3:** Mobile App (Expo DevTools)

3. **Shows Success Message**
   - Displays service URLs
   - Provides helpful tips

## Access Your Apps

After the scripts run:

- **Web App:** Open http://localhost:5173 in your browser
- **Mobile App:** Check the Expo terminal window for QR code
- **Mock API:** Running at http://localhost:5000

## Troubleshooting

### Script Won't Run?
- **Windows:** Right-click → Run as Administrator
- **Mac/Linux:** Make executable: `chmod +x run_all.sh`

### Node.js Not Found?
- Install Node.js from https://nodejs.org/
- Restart your computer after installation

### Port Already in Use?
- Close other applications using ports 5000 or 5173
- Or modify ports in respective `package.json` files

### Services Don't Start?
- Check terminal windows for error messages
- Ensure npm packages are installed: `npm install` in each directory

## Manual Start (Alternative)

If scripts don't work, start manually:

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

## Need Help?

- See `README.md` for full documentation
- See `LAUNCHER_SCRIPTS_README.md` for script details
- See `ARCHITECTURE.md` for project structure

