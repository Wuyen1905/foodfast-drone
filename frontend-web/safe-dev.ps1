# Safe Dev Server Launcher - Handles PAD.AutomationServer.exe conflicts
# Usage: .\safe-dev.ps1

Write-Host "🔧 FoodFast Safe Dev Server Launcher" -ForegroundColor Cyan
Write-Host "====================================`n" -ForegroundColor Cyan

# Step 1: Stop existing node processes
Write-Host "1️⃣ Stopping existing node processes..." -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "   Found $($nodeProcesses.Count) node process(es), stopping..." -ForegroundColor Gray
    Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
    Write-Host "   ✅ Node processes stopped" -ForegroundColor Green
} else {
    Write-Host "   ℹ️ No node processes running" -ForegroundColor Gray
}

# Step 2: Check for PAD interference
Write-Host "`n2️⃣ Checking for Power Automate Desktop..." -ForegroundColor Yellow
$padProcesses = Get-Process | Where-Object { $_.ProcessName -like "*PAD*" -or $_.ProcessName -like "*AutomationServer*" }
if ($padProcesses) {
    Write-Host "   ⚠️ Power Automate Desktop is running" -ForegroundColor Red
    Write-Host "   Consider disabling it if you encounter errors" -ForegroundColor Yellow
} else {
    Write-Host "   ✅ No PAD processes detected" -ForegroundColor Green
}

# Step 3: Check port availability
Write-Host "`n3️⃣ Checking port availability..." -ForegroundColor Yellow
$port5173 = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
$port5174 = Get-NetTCPConnection -LocalPort 5174 -ErrorAction SilentlyContinue

if ($port5173 -or $port5174) {
    Write-Host "   ⚠️ Ports 5173/5174 are in use, clearing..." -ForegroundColor Yellow
    
    if ($port5173) {
        $pid = $port5173[0].OwningProcess
        Write-Host "   Killing process $pid on port 5173" -ForegroundColor Gray
        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    }
    
    if ($port5174) {
        $pid = $port5174[0].OwningProcess
        Write-Host "   Killing process $pid on port 5174" -ForegroundColor Gray
        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    }
    
    Start-Sleep -Seconds 1
    Write-Host "   ✅ Ports cleared" -ForegroundColor Green
} else {
    Write-Host "   ✅ Ports 5173/5174 are available" -ForegroundColor Green
}

# Step 4: Navigate to web directory
Write-Host "`n4️⃣ Navigating to web directory..." -ForegroundColor Yellow
if (Test-Path ".\web") {
    Set-Location ".\web"
    Write-Host "   ✅ In web directory" -ForegroundColor Green
} else {
    Write-Host "   ❌ web directory not found!" -ForegroundColor Red
    exit 1
}

# Step 5: Clear Vite cache
Write-Host "`n5️⃣ Clearing Vite cache..." -ForegroundColor Yellow
if (Test-Path ".\.vite") {
    Remove-Item -Recurse -Force ".\.vite" -ErrorAction SilentlyContinue
    Write-Host "   ✅ Vite cache cleared" -ForegroundColor Green
} else {
    Write-Host "   ℹ️ No Vite cache to clear" -ForegroundColor Gray
}

# Step 6: Start dev server
Write-Host "`n6️⃣ Starting dev server..." -ForegroundColor Yellow
Write-Host "   Press Ctrl+C to stop the server`n" -ForegroundColor Gray
Write-Host "========================================" -ForegroundColor Cyan

# Set environment variables to prevent automation hooks
$env:NODE_OPTIONS = "--max-old-space-size=4096"

# Start the dev server
npm run dev

# Cleanup on exit
Write-Host "`n`n🛑 Server stopped" -ForegroundColor Red
Write-Host "Cleaning up..." -ForegroundColor Yellow
Set-Location ".."

