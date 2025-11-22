# 🚀 Start Here - Node.js Setup for FoodFast

## Quick Start

### Option 1: Automated Setup (Recommended) ⚡

1. **Open PowerShell as Administrator**
   - Right-click PowerShell → "Run as Administrator"

2. **Run the setup script**
   ```powershell
   .\QUICK_SETUP_NODEJS.ps1
   ```

3. **Wait for setup to complete**
   - The script will automatically:
     - Install Node.js LTS (v22.21.1)
     - Install Visual C++ Redistributable
     - Install dependencies
     - Start the dev server

### Option 2: Verify Existing Setup 🔍

If you already have Node.js installed:

```powershell
.\verify-nodejs-setup.ps1
```

This will check:
- ✅ Node.js version (>= 20.19.0)
- ✅ npm version
- ✅ Visual C++ Redistributable
- ✅ Port 5173 availability
- ✅ Dependencies installation

## What You Need

- **Windows 10/11** (64-bit)
- **Administrator privileges** (for installation)
- **Internet connection** (for downloading Node.js and dependencies)

## What Gets Installed

1. **Node.js LTS** (v22.21.1)
   - Meets Vite 7.x requirement (>= 20.19.0)
   - Globally accessible via PATH

2. **npm** (10.x.x)
   - Comes with Node.js
   - Globally accessible via PATH

3. **Visual C++ Redistributable** (2015-2022)
   - Required for native Node.js modules
   - Both x64 and x86 versions

4. **FoodFast Dependencies**
   - All npm packages in `web` directory
   - WebSocket libraries for real-time sync
   - React, Vite, and all other dependencies

## After Setup

Once setup is complete, you can:

1. **Start the backend** (in another terminal):
   ```powershell
   cd backend
   mvn spring-boot:run
   ```

2. **Access the frontend**: http://localhost:5173

3. **Test real-time sync**:
   - Open restaurant dashboard: http://localhost:5173/restaurant/dashboard
   - Open customer order tracking: http://localhost:5173/orders
   - Update order status in restaurant dashboard
   - Verify customer view updates immediately

## Troubleshooting

### "Node.js not found" error
**Solution**: Run the setup script as Administrator

### "Vite requires Node.js version 20.19+" error
**Solution**: Run the setup script to install Node.js LTS

### "Port 5173 already in use" error
**Solution**: The setup script automatically frees the port

### "Visual C++ Redistributable missing" error
**Solution**: The setup script automatically installs it

## Documentation

- **Full Setup Guide**: [NODEJS_SETUP_GUIDE.md](NODEJS_SETUP_GUIDE.md)
- **Setup Complete**: [NODEJS_SETUP_COMPLETE.md](NODEJS_SETUP_COMPLETE.md)
- **Verification Script**: `verify-nodejs-setup.ps1`

## Support

If you encounter issues:

1. Run the verification script: `.\verify-nodejs-setup.ps1`
2. Check the troubleshooting section in [NODEJS_SETUP_GUIDE.md](NODEJS_SETUP_GUIDE.md)
3. Ensure you're running PowerShell as Administrator
4. Check that you have internet connection

## Success Indicators

✅ Node.js v22.21.1+ installed  
✅ npm 10.x.x installed  
✅ Visual C++ Redistributable installed  
✅ Dependencies installed  
✅ Port 5173 available  
✅ Dev server starts successfully  
✅ No "Vite requires Node.js version 20.19+" error  
✅ Real-time sync works between restaurant and customer views  

---

**Ready to start? Run**: `.\QUICK_SETUP_NODEJS.ps1` (as Administrator)

