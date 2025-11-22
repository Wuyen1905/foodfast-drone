# ==============================================
# NODE.JS SETUP VERIFICATION SCRIPT
# FoodFast Frontend - Quick Verification
# ==============================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Node.js Setup Verification" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Check Node.js
Write-Host "[1/5] Checking Node.js..." -ForegroundColor Yellow
$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCmd) {
    try {
        $nodeVersion = node -v 2>&1
        Write-Host "  ✅ Node.js: $nodeVersion" -ForegroundColor Green
        
        # Check version requirements
        $versionMatch = $nodeVersion -match 'v(\d+)\.(\d+)\.(\d+)'
        if ($versionMatch) {
            $major = [int]$matches[1]
            $minor = [int]$matches[2]
            $patch = [int]$matches[3]
            
            if ($major -gt 20 -or ($major -eq 20 -and $minor -gt 18) -or ($major -eq 20 -and $minor -eq 19 -and $patch -ge 0)) {
                Write-Host "  ✅ Version meets Vite requirements (>= 20.19.0)" -ForegroundColor Green
            } else {
                Write-Host "  ⚠️  Version may be too old for Vite 7.x (requires >= 20.19.0)" -ForegroundColor Yellow
                $allGood = $false
            }
        }
    } catch {
        Write-Host "  ✗ Node.js is installed but not working" -ForegroundColor Red
        $allGood = $false
    }
} else {
    Write-Host "  ✗ Node.js not found in PATH" -ForegroundColor Red
    $allGood = $false
}

# Check npm
Write-Host ""
Write-Host "[2/5] Checking npm..." -ForegroundColor Yellow
$npmCmd = Get-Command npm -ErrorAction SilentlyContinue
if ($npmCmd) {
    try {
        $npmVersion = npm -v 2>&1
        Write-Host "  ✅ npm: $npmVersion" -ForegroundColor Green
    } catch {
        Write-Host "  ✗ npm is installed but not working" -ForegroundColor Red
        $allGood = $false
    }
} else {
    Write-Host "  ✗ npm not found in PATH" -ForegroundColor Red
    $allGood = $false
}

# Check Visual C++ Redistributable
Write-Host ""
Write-Host "[3/5] Checking Visual C++ Redistributable..." -ForegroundColor Yellow
$vcInstalled = Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*" -ErrorAction SilentlyContinue | 
    Where-Object { $_.DisplayName -like "*Visual C++*Redistributable*" }
if ($vcInstalled) {
    Write-Host "  ✅ Visual C++ Redistributable is installed" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Visual C++ Redistributable not found (may cause issues)" -ForegroundColor Yellow
    Write-Host "     Download from: https://aka.ms/vs/17/release/vc_redist.x64.exe" -ForegroundColor Cyan
}

# Check port 5173
Write-Host ""
Write-Host "[4/5] Checking port 5173..." -ForegroundColor Yellow
$portCheck = netstat -ano | findstr ":5173"
if ($portCheck) {
    Write-Host "  ⚠️  Port 5173 is in use" -ForegroundColor Yellow
    $lines = $portCheck -split "`n"
    foreach ($line in $lines) {
        if ($line -match '\s+(\d+)\s*$') {
            $pid = $matches[1]
            if ($pid -match "^\d+$") {
                $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
                if ($process) {
                    Write-Host "     Process: $($process.ProcessName) (PID: $pid)" -ForegroundColor Cyan
                }
            }
        }
    }
} else {
    Write-Host "  ✅ Port 5173 is available" -ForegroundColor Green
}

# Check FoodFast web directory
Write-Host ""
Write-Host "[5/5] Checking FoodFast web directory..." -ForegroundColor Yellow
$webPath = Join-Path $PSScriptRoot "web"
if (Test-Path $webPath) {
    Write-Host "  ✅ Web directory found: $webPath" -ForegroundColor Green
    
    $packageJson = Join-Path $webPath "package.json"
    if (Test-Path $packageJson) {
        Write-Host "  ✅ package.json found" -ForegroundColor Green
        
        $nodeModules = Join-Path $webPath "node_modules"
        if (Test-Path $nodeModules) {
            Write-Host "  ✅ node_modules found" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  node_modules not found (run: npm install)" -ForegroundColor Yellow
            $allGood = $false
        }
    } else {
        Write-Host "  ✗ package.json not found" -ForegroundColor Red
        $allGood = $false
    }
} else {
    Write-Host "  ✗ Web directory not found: $webPath" -ForegroundColor Red
    $allGood = $false
}

# Summary
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
if ($allGood) {
    Write-Host "  ✅ All checks passed!" -ForegroundColor Green
    Write-Host "============================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can start the dev server with:" -ForegroundColor Cyan
    Write-Host "  cd web" -ForegroundColor Yellow
    Write-Host "  npm run dev" -ForegroundColor Yellow
} else {
    Write-Host "  ⚠️  Some issues were found" -ForegroundColor Yellow
    Write-Host "============================================" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please run the setup script:" -ForegroundColor Cyan
    Write-Host "  .\setup-nodejs-environment.ps1" -ForegroundColor Yellow
}
Write-Host ""

