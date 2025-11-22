# Node.js Environment Setup Guide for FoodFast

## Overview

This guide helps you set up Node.js LTS (v22.x) and ensure the FoodFast frontend runs properly without modifying any UI or existing functionality.

## Quick Start

### Option 1: Automated Setup (Recommended)

1. **Open PowerShell as Administrator**
   - Right-click PowerShell → "Run as Administrator"

2. **Run the setup script**
   ```powershell
   .\setup-nodejs-environment.ps1
   ```

3. **Wait for setup to complete**
   - The script will:
     - Check and remove corrupted Node.js installations
     - Install Visual C++ Redistributable
     - Install Node.js LTS (v22.21.1)
     - Verify installation
     - Free up port 5173
     - Install dependencies
     - Start the dev server

### Option 2: Manual Setup

If you prefer manual setup, follow these steps:

#### Step 1: Install Visual C++ Redistributable

1. Download both installers:
   - **x64**: https://aka.ms/vs/17/release/vc_redist.x64.exe
   - **x86**: https://aka.ms/vs/17/release/vc_redist.x86.exe

2. Run both installers as Administrator
3. Accept the license terms and install

#### Step 2: Install Node.js LTS

**Option A: Using Chocolatey (Recommended)**
```powershell
# Install Chocolatey (if not installed)
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install Node.js LTS
choco install nodejs-lts -y
```

**Option B: Using Official Installer**
1. Download Node.js LTS from: https://nodejs.org/
2. Run the installer (`.msi` file)
3. Follow the installation wizard
4. Make sure "Add to PATH" is checked

#### Step 3: Verify Installation

```powershell
# Check Node.js version
node -v
# Expected: v22.21.1 or newer

# Check npm version
npm -v
# Expected: 10.x.x or newer
```

#### Step 4: Install Dependencies

```powershell
# Navigate to web directory
cd web

# Install dependencies
npm install --legacy-peer-deps
```

#### Step 5: Start Dev Server

```powershell
# Start development server
npm run dev
```

## Verification

Run the verification script to check your setup:

```powershell
.\verify-nodejs-setup.ps1
```

## Requirements

- **Node.js**: >= 20.19.0 (Vite 7.x requirement)
- **npm**: >= 10.0.0 (comes with Node.js)
- **Visual C++ Redistributable**: 2015-2022 (for native modules)
- **Windows**: Windows 10/11 (64-bit)

## Troubleshooting

### Node.js not found in PATH

**Solution:**
1. Check if Node.js is installed:
   ```powershell
   Test-Path "C:\Program Files\nodejs\node.exe"
   ```

2. Add Node.js to PATH manually:
   ```powershell
   # Run as Administrator
   [System.Environment]::SetEnvironmentVariable("Path", "$env:Path;C:\Program Files\nodejs", "Machine")
   ```

3. Restart your terminal

### "Vite requires Node.js version 20.19+" error

**Solution:**
1. Check your Node.js version:
   ```powershell
   node -v
   ```

2. If version is too old, update Node.js:
   ```powershell
   # Using Chocolatey
   choco upgrade nodejs-lts -y
   
   # Or download from https://nodejs.org/
   ```

### Port 5173 already in use

**Solution:**
```powershell
# Find process using port 5173
netstat -ano | findstr :5173

# Kill the process (replace PID with actual process ID)
taskkill /F /PID <PID>
```

### Visual C++ Redistributable missing

**Symptoms:**
- Native module compilation fails
- `node-gyp` errors
- Module installation fails

**Solution:**
1. Download and install Visual C++ Redistributable:
   - https://aka.ms/vs/17/release/vc_redist.x64.exe
   - https://aka.ms/vs/17/release/vc_redist.x86.exe

2. Run both installers as Administrator

### Dependencies installation fails

**Solution:**
```powershell
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# Reinstall dependencies
npm install --legacy-peer-deps
```

### npm not recognized

**Solution:**
1. Check if npm is installed:
   ```powershell
   Test-Path "C:\Program Files\nodejs\npm.cmd"
   ```

2. If not found, reinstall Node.js (npm comes with Node.js)

3. Add Node.js to PATH (see "Node.js not found in PATH" above)

## What the Setup Script Does

The `setup-nodejs-environment.ps1` script:

1. ✅ **Checks for corrupted Node.js installations** and removes them
2. ✅ **Downloads and installs Visual C++ Redistributable** (x64 and x86)
3. ✅ **Installs Node.js LTS** (v22.21.1) via Chocolatey or direct installer
4. ✅ **Verifies installation** (Node.js >= 20.19.0, npm working)
5. ✅ **Frees up port 5173** if it's in use
6. ✅ **Installs dependencies** in the `web` directory
7. ✅ **Starts the dev server** automatically

## Environment Variables

The script automatically sets up:
- `PATH`: Adds Node.js to system PATH
- Node.js and npm are globally accessible

## Notes

- **No UI Changes**: The setup script only modifies system environment and dependencies
- **No Code Changes**: All FoodFast source code remains unchanged
- **Preserves Features**: All existing features, including real-time WebSocket synchronization, are preserved
- **Requires Admin**: The script requires administrator privileges to install Node.js and Visual C++ Redistributable

## After Setup

Once setup is complete:

1. ✅ Node.js and npm are globally accessible
2. ✅ Dependencies are installed
3. ✅ Dev server starts automatically
4. ✅ Real-time sync between restaurant and customer views works
5. ✅ WebSocket connections function properly

## Support

If you encounter issues:

1. Run the verification script: `.\verify-nodejs-setup.ps1`
2. Check the troubleshooting section above
3. Review the setup script logs
4. Ensure you're running PowerShell as Administrator

## Next Steps

After successful setup:

1. **Start Backend** (in another terminal):
   ```powershell
   cd backend
   mvn spring-boot:run
   ```

2. **Access Frontend**: http://localhost:5173

3. **Test Real-Time Sync**:
   - Open restaurant dashboard: http://localhost:5173/restaurant/dashboard
   - Open customer order tracking: http://localhost:5173/orders
   - Update order status in restaurant dashboard
   - Verify customer view updates immediately

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

**Last Updated**: 2024-12-19  
**Node.js Version**: v22.21.1 (LTS)  
**Vite Version**: 7.1.12  

