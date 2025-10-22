# 🔧 Dev Server Recovery Guide - PAD.AutomationServer.exe Error

## ⚠️ Error Description

**Error:** `PAD.AutomationServer.exe – Application Error (0xe0434352)`

**Cause:** Power Automate Desktop (PAD) automation server interfering with Node.js/Vite processes on Windows.

**Impact:** Vite dev server may crash or fail to start.

---

## ✅ Quick Recovery Steps

### Option 1: Force Restart (Fastest)

```powershell
# Navigate to web directory
cd web

# Kill all node processes (if needed)
taskkill /F /IM node.exe

# Clear Vite cache and restart
npm run dev -- --force
```

### Option 2: Clean Rebuild (Recommended if issues persist)

```powershell
# Stop all node processes
taskkill /F /IM node.exe

# Navigate to web directory
cd web

# Remove node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# Clean npm cache
npm cache clean --force

# Reinstall dependencies
npm install

# Start dev server
npm run dev
```

### Option 3: Nuclear Option (Last Resort)

```powershell
# Stop all node processes
taskkill /F /IM node.exe

# Navigate to web directory
cd web

# Remove all caches and temp files
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force .vite
Remove-Item -Recurse -Force dist
Remove-Item -Force package-lock.json

# Clean npm and system temp
npm cache clean --force
$env:TEMP | Get-ChildItem -Filter "vite*" -Recurse | Remove-Item -Force -Recurse

# Reinstall and start
npm install
npm run dev
```

---

## 🛡️ Prevention Strategies

### 1. Disable Power Automate Desktop (If Not Needed)

**Windows Services:**
1. Press `Win + R` → type `services.msc`
2. Find "Power Automate Desktop"
3. Right-click → Properties
4. Set Startup type to "Disabled"
5. Stop the service

**Or via PowerShell (Admin):**
```powershell
Stop-Service -Name "PAD.AutomationServer" -Force
Set-Service -Name "PAD.AutomationServer" -StartupType Disabled
```

### 2. Exclude Node.js from Power Automate

If you need Power Automate Desktop running:

1. Open Power Automate Desktop settings
2. Go to "Advanced" → "Exceptions"
3. Add `node.exe` to the exception list
4. Add `vite` to the exception list

### 3. Use Vite in Safe Mode

Add to `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    // Prevent external automation hooks
    strictPort: true,
    // Use localhost only
    host: 'localhost',
    // Custom port to avoid conflicts
    port: 5174,
  },
  // Disable file watching if issues persist
  // server: { watch: { usePolling: true } }
})
```

### 4. Node.js Process Isolation

Add to `package.json` scripts:

```json
{
  "scripts": {
    "dev:safe": "set NODE_OPTIONS=--max-old-space-size=4096 && vite --force",
    "dev:isolated": "node --no-warnings --trace-warnings node_modules/vite/bin/vite.js"
  }
}
```

---

## 🔍 Troubleshooting

### Check Running Processes

```powershell
# List all node processes
tasklist | Select-String "node"

# List processes using ports 5173-5174
netstat -ano | Select-String ":5173|:5174"

# Check Power Automate processes
tasklist | Select-String "PAD"
```

### Verify Server is Running

```powershell
# Wait 3 seconds then check
Start-Sleep -Seconds 3
netstat -ano | Select-String ":5174"

# Or use curl
curl http://localhost:5174
```

### Common Port Conflicts

If port 5173/5174 is occupied:

```powershell
# Find process using port
netstat -ano | Select-String ":5174"

# Kill specific process by PID (replace 12345 with actual PID)
taskkill /F /PID 12345
```

---

## 🚀 Current Status

✅ **Dev server running on:** http://localhost:5174/

**Verified:** 
```
TCP    [::1]:5174    LISTENING    (node.exe)
```

---

## 📋 Error Code Reference

| Error Code | Meaning | Solution |
|------------|---------|----------|
| 0xe0434352 | CLR Exception (Power Automate) | Disable PAD or exclude node.exe |
| EADDRINUSE | Port already in use | Kill node process or use different port |
| EPERM | Permission denied | Run as administrator or change port |

---

## 🆘 If Nothing Works

1. **Reboot Windows** - Clears all process locks
2. **Update Node.js** - Ensure you're using LTS version
3. **Check Windows Defender** - May be blocking Node.js
4. **Disable antivirus temporarily** - Test if it's causing interference
5. **Use WSL2** - Run dev server in Linux environment

---

## ✅ Verification Checklist

After recovery, verify:

- [ ] Dev server starts without errors
- [ ] No PAD.AutomationServer.exe errors
- [ ] Port 5174 is listening
- [ ] Hot reload works (edit a file and check browser)
- [ ] No node.exe processes hanging after stop
- [ ] Console shows no automation-related warnings

---

**Last Updated:** October 21, 2025

**Status:** ✅ Server recovered and running on http://localhost:5174/

**Note:** If PAD errors persist, consider using WSL2 for development or completely uninstalling Power Automate Desktop if not needed for your workflow.

