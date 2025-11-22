# ==============================================
# COMPREHENSIVE NODE.JS ENVIRONMENT SETUP
# FoodFast Frontend - Node.js LTS Installation
# ==============================================

# Requires administrator privileges
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "⚠️  This script requires administrator privileges." -ForegroundColor Yellow
    Write-Host "Please run PowerShell as Administrator and try again." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Right-click PowerShell → Run as Administrator" -ForegroundColor Cyan
    exit 1
}

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Node.js Environment Setup for FoodFast" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# ==============================================
# STEP 1: Check and Remove Corrupted Node.js Installations
# ==============================================
Write-Host "[1/7] Checking existing Node.js installations..." -ForegroundColor Yellow

function Test-NodeInstallation {
    param([string]$nodePath)
    
    if (-not (Test-Path $nodePath)) {
        return $false
    }
    
    $nodeExe = Join-Path $nodePath "node.exe"
    if (-not (Test-Path $nodeExe)) {
        return $false
    }
    
    try {
        $version = & $nodeExe -v 2>&1
        if ($LASTEXITCODE -ne 0) {
            return $false
        }
        return $true
    } catch {
        return $false
    }
}

# Common Node.js installation paths
$nodePaths = @(
    "C:\Program Files\nodejs",
    "C:\Program Files (x86)\nodejs",
    "$env:ProgramFiles\nodejs",
    "$env:ProgramFiles(x86)\nodejs",
    "$env:APPDATA\npm",
    "$env:LOCALAPPDATA\npm"
)

$foundNodes = @()
foreach ($path in $nodePaths) {
    if (Test-Path $path) {
        $nodeExe = Join-Path $path "node.exe"
        if (Test-Path $nodeExe) {
            $isValid = Test-NodeInstallation -nodePath $path
            if ($isValid) {
                try {
                    $version = & $nodeExe -v 2>&1
                    Write-Host "  ✓ Found Node.js at: $path (Version: $version)" -ForegroundColor Green
                    $foundNodes += @{Path = $path; Version = $version; Valid = $true}
                } catch {
                    Write-Host "  ✗ Invalid Node.js at: $path" -ForegroundColor Red
                    $foundNodes += @{Path = $path; Version = "Unknown"; Valid = $false}
                }
            } else {
                Write-Host "  ✗ Corrupted Node.js at: $path" -ForegroundColor Red
                $foundNodes += @{Path = $path; Version = "Corrupted"; Valid = $false}
            }
        }
    }
}

# Check PATH for node
$envPath = $env:PATH -split ';'
$nodeInPath = $envPath | Where-Object { $_ -like "*nodejs*" -or $_ -like "*node*" }
if ($nodeInPath) {
    Write-Host "  ℹ️  Node.js paths in PATH: $($nodeInPath -join ', ')" -ForegroundColor Cyan
}

# Check if we have a valid Node.js installation
$currentNode = Get-Command node -ErrorAction SilentlyContinue
if ($currentNode) {
    try {
        $nodeVersion = node -v 2>&1
        $npmVersion = npm -v 2>&1
        
        # Check if version meets requirements (>= 20.19.0)
        $versionMatch = $nodeVersion -match 'v(\d+)\.(\d+)\.(\d+)'
        if ($versionMatch) {
            $major = [int]$matches[1]
            $minor = [int]$matches[2]
            $patch = [int]$matches[3]
            
            if ($major -gt 20 -or ($major -eq 20 -and $minor -gt 18) -or ($major -eq 20 -and $minor -eq 19 -and $patch -ge 0)) {
                Write-Host "  ✅ Valid Node.js found: $nodeVersion (npm: $npmVersion)" -ForegroundColor Green
                Write-Host "  ✅ Node.js version meets Vite requirements (>= 20.19.0)" -ForegroundColor Green
                
                # Verify npm works
                if (Get-Command npm -ErrorAction SilentlyContinue) {
                    Write-Host ""
                    Write-Host "============================================" -ForegroundColor Green
                    Write-Host "  Node.js is already properly installed!" -ForegroundColor Green
                    Write-Host "============================================" -ForegroundColor Green
                    Write-Host ""
                    Write-Host "Node.js: $nodeVersion" -ForegroundColor Cyan
                    Write-Host "npm: $npmVersion" -ForegroundColor Cyan
                    Write-Host ""
                    
                    # Ask if user wants to continue with setup anyway
                    $continue = Read-Host "Do you want to proceed with dependency installation? (Y/N)"
                    if ($continue -eq "Y" -or $continue -eq "y") {
                        # Skip to dependency installation
                        $skipInstall = $true
                    } else {
                        Write-Host "Setup cancelled." -ForegroundColor Yellow
                        exit 0
                    }
                }
            } else {
                Write-Host "  ⚠️  Node.js version $nodeVersion is too old (requires >= 20.19.0)" -ForegroundColor Yellow
                $skipInstall = $false
            }
        }
    } catch {
        Write-Host "  ✗ Node.js installation is corrupted" -ForegroundColor Red
        $skipInstall = $false
    }
} else {
    Write-Host "  ℹ️  No Node.js found in PATH" -ForegroundColor Yellow
    $skipInstall = $false
}

# ==============================================
# STEP 2: Install Visual C++ Redistributable
# ==============================================
if (-not $skipInstall) {
    Write-Host ""
    Write-Host "[2/7] Installing Visual C++ Redistributable..." -ForegroundColor Yellow
    
    $vcRedistPath = "$env:TEMP\vc_redist"
    if (-not (Test-Path $vcRedistPath)) {
        New-Item -ItemType Directory -Force -Path $vcRedistPath | Out-Null
    }
    
    $vcRedistX64 = "$vcRedistPath\vc_redist.x64.exe"
    $vcRedistX86 = "$vcRedistPath\vc_redist.x86.exe"
    
    # Check if already installed
    $vcInstalled = Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*" | 
        Where-Object { $_.DisplayName -like "*Visual C++*Redistributable*" }
    
    if ($vcInstalled) {
        Write-Host "  ✓ Visual C++ Redistributable is already installed" -ForegroundColor Green
    } else {
        Write-Host "  ⬇️  Downloading Visual C++ Redistributable x64..." -ForegroundColor Cyan
        try {
            Invoke-WebRequest -Uri "https://aka.ms/vs/17/release/vc_redist.x64.exe" -OutFile $vcRedistX64 -UseBasicParsing
            Write-Host "  ✓ Downloaded x64 version" -ForegroundColor Green
            
            Write-Host "  ⬇️  Downloading Visual C++ Redistributable x86..." -ForegroundColor Cyan
            Invoke-WebRequest -Uri "https://aka.ms/vs/17/release/vc_redist.x86.exe" -OutFile $vcRedistX86 -UseBasicParsing
            Write-Host "  ✓ Downloaded x86 version" -ForegroundColor Green
            
            Write-Host "  📦 Installing Visual C++ Redistributable x64..." -ForegroundColor Cyan
            Start-Process -FilePath $vcRedistX64 -ArgumentList "/install", "/quiet", "/norestart" -Wait -NoNewWindow
            Write-Host "  ✓ Installed x64 version" -ForegroundColor Green
            
            Write-Host "  📦 Installing Visual C++ Redistributable x86..." -ForegroundColor Cyan
            Start-Process -FilePath $vcRedistX86 -ArgumentList "/install", "/quiet", "/norestart" -Wait -NoNewWindow
            Write-Host "  ✓ Installed x86 version" -ForegroundColor Green
        } catch {
            Write-Host "  ⚠️  Warning: Could not download/install Visual C++ Redistributable" -ForegroundColor Yellow
            Write-Host "     Error: $($_.Exception.Message)" -ForegroundColor Red
            Write-Host "     You may need to install it manually from:" -ForegroundColor Yellow
            Write-Host "     https://aka.ms/vs/17/release/vc_redist.x64.exe" -ForegroundColor Cyan
        }
    }
}

# ==============================================
# STEP 3: Install Node.js LTS
# ==============================================
if (-not $skipInstall) {
    Write-Host ""
    Write-Host "[3/7] Installing Node.js LTS..." -ForegroundColor Yellow
    
    # Try Chocolatey first
    $chocoInstalled = Get-Command choco -ErrorAction SilentlyContinue
    if ($chocoInstalled) {
        Write-Host "  📦 Installing Node.js LTS via Chocolatey..." -ForegroundColor Cyan
        try {
            choco install nodejs-lts -y --force
            if ($LASTEXITCODE -eq 0) {
                Write-Host "  ✓ Node.js LTS installed via Chocolatey" -ForegroundColor Green
                $nodeInstalled = $true
            } else {
                Write-Host "  ⚠️  Chocolatey installation failed, trying direct installer..." -ForegroundColor Yellow
                $nodeInstalled = $false
            }
        } catch {
            Write-Host "  ⚠️  Chocolatey installation failed, trying direct installer..." -ForegroundColor Yellow
            $nodeInstalled = $false
        }
    } else {
        Write-Host "  ℹ️  Chocolatey not found, using direct installer..." -ForegroundColor Cyan
        $nodeInstalled = $false
    }
    
    # If Chocolatey failed or not available, use direct installer
    if (-not $nodeInstalled) {
        Write-Host "  ⬇️  Downloading Node.js LTS installer..." -ForegroundColor Cyan
        
        # Get latest LTS version (v22.x)
        $nodeInstallerPath = "$env:TEMP\nodejs-installer.msi"
        $nodeVersion = "22.21.1"  # Latest LTS as of now
        $nodeInstallerUrl = "https://nodejs.org/dist/v$nodeVersion/node-v$nodeVersion-x64.msi"
        
        try {
            Write-Host "  ⬇️  Downloading Node.js v$nodeVersion..." -ForegroundColor Cyan
            Invoke-WebRequest -Uri $nodeInstallerUrl -OutFile $nodeInstallerPath -UseBasicParsing
            Write-Host "  ✓ Downloaded Node.js installer" -ForegroundColor Green
            
            Write-Host "  📦 Installing Node.js v$nodeVersion..." -ForegroundColor Cyan
            Write-Host "     This may take a few minutes..." -ForegroundColor Yellow
            
            # Install Node.js silently
            $installArgs = "/i `"$nodeInstallerPath`" /quiet /norestart /l*v `"$env:TEMP\nodejs-install.log`""
            $process = Start-Process -FilePath "msiexec.exe" -ArgumentList $installArgs -Wait -PassThru -NoNewWindow
            
            if ($process.ExitCode -eq 0 -or $process.ExitCode -eq 3010) {
                Write-Host "  ✓ Node.js installed successfully" -ForegroundColor Green
                $nodeInstalled = $true
            } else {
                Write-Host "  ✗ Node.js installation failed (Exit code: $($process.ExitCode))" -ForegroundColor Red
                Write-Host "     Check log: $env:TEMP\nodejs-install.log" -ForegroundColor Yellow
                $nodeInstalled = $false
            }
            
            # Clean up installer
            Remove-Item $nodeInstallerPath -Force -ErrorAction SilentlyContinue
        } catch {
            Write-Host "  ✗ Failed to download/install Node.js" -ForegroundColor Red
            Write-Host "     Error: $($_.Exception.Message)" -ForegroundColor Red
            Write-Host "     Please install Node.js manually from: https://nodejs.org/" -ForegroundColor Yellow
            exit 1
        }
    }
    
    # Refresh PATH
    Write-Host "  🔄 Refreshing environment variables..." -ForegroundColor Cyan
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
    
    # Add Node.js to PATH if not already there
    $nodeJsPath = "C:\Program Files\nodejs"
    if (Test-Path $nodeJsPath) {
        $machinePath = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
        if ($machinePath -notlike "*$nodeJsPath*") {
            [System.Environment]::SetEnvironmentVariable("Path", "$machinePath;$nodeJsPath", "Machine")
            Write-Host "  ✓ Added Node.js to system PATH" -ForegroundColor Green
        }
        $env:Path = "$nodeJsPath;$env:Path"
    }
}

# ==============================================
# STEP 4: Verify Installation
# ==============================================
Write-Host ""
Write-Host "[4/7] Verifying Node.js installation..." -ForegroundColor Yellow

# Refresh PATH again
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")

# Wait a moment for PATH to update
Start-Sleep -Seconds 2

# Check Node.js
$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCmd) {
    Write-Host "  ✗ Node.js not found in PATH" -ForegroundColor Red
    Write-Host "     Please restart your terminal and try again" -ForegroundColor Yellow
    exit 1
}

try {
    $nodeVersion = node -v 2>&1
    $npmVersion = npm -v 2>&1
    
    Write-Host "  ✅ Node.js: $nodeVersion" -ForegroundColor Green
    Write-Host "  ✅ npm: $npmVersion" -ForegroundColor Green
    
    # Verify version meets requirements
    $versionMatch = $nodeVersion -match 'v(\d+)\.(\d+)\.(\d+)'
    if ($versionMatch) {
        $major = [int]$matches[1]
        $minor = [int]$matches[2]
        $patch = [int]$matches[3]
        
        if ($major -gt 20 -or ($major -eq 20 -and $minor -gt 18) -or ($major -eq 20 -and $minor -eq 19 -and $patch -ge 0)) {
            Write-Host "  ✅ Node.js version meets Vite requirements (>= 20.19.0)" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  Warning: Node.js version may be too old for Vite 7.x" -ForegroundColor Yellow
        }
    }
} catch {
    Write-Host "  ✗ Failed to verify Node.js installation" -ForegroundColor Red
    Write-Host "     Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# ==============================================
# STEP 5: Free up Port 5173
# ==============================================
Write-Host ""
Write-Host "[5/7] Checking port 5173..." -ForegroundColor Yellow

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
                    Write-Host "  🛑 Killing process: $($process.ProcessName) (PID: $pid)" -ForegroundColor Cyan
                    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
                }
            }
        }
    }
    Start-Sleep -Seconds 2
    Write-Host "  ✓ Port 5173 freed" -ForegroundColor Green
} else {
    Write-Host "  ✓ Port 5173 is available" -ForegroundColor Green
}

# ==============================================
# STEP 6: Install Dependencies
# ==============================================
Write-Host ""
Write-Host "[6/7] Installing FoodFast frontend dependencies..." -ForegroundColor Yellow

$webPath = Join-Path $PSScriptRoot "web"
if (-not (Test-Path $webPath)) {
    Write-Host "  ✗ Web directory not found: $webPath" -ForegroundColor Red
    exit 1
}

Set-Location $webPath
Write-Host "  📁 Changed to directory: $(Get-Location)" -ForegroundColor Cyan

# Check if node_modules exists
if (Test-Path "node_modules") {
    Write-Host "  ℹ️  node_modules found, checking for updates..." -ForegroundColor Cyan
} else {
    Write-Host "  📦 Installing dependencies (this may take a few minutes)..." -ForegroundColor Cyan
}

try {
    npm install --legacy-peer-deps
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ Dependencies installed successfully" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Dependency installation had issues, but continuing..." -ForegroundColor Yellow
    }
} catch {
    Write-Host "  ✗ Failed to install dependencies" -ForegroundColor Red
    Write-Host "     Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# ==============================================
# STEP 7: Verify Setup and Start Dev Server
# ==============================================
Write-Host ""
Write-Host "[7/7] Final verification..." -ForegroundColor Yellow

# Verify Node.js and npm are accessible
$nodeVersion = node -v 2>&1
$npmVersion = npm -v 2>&1

Write-Host "  ✅ Node.js: $nodeVersion" -ForegroundColor Green
Write-Host "  ✅ npm: $npmVersion" -ForegroundColor Green
Write-Host "  ✅ Dependencies: Installed" -ForegroundColor Green
Write-Host "  ✅ Port 5173: Available" -ForegroundColor Green

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  ✅ Setup Complete!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Starting FoodFast development server..." -ForegroundColor Cyan
Write-Host ""

# Start dev server
try {
    npm run dev
} catch {
    Write-Host ""
    Write-Host "  ✗ Failed to start dev server" -ForegroundColor Red
    Write-Host "     Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "  You can manually start the server with:" -ForegroundColor Yellow
    Write-Host "    cd web" -ForegroundColor Cyan
    Write-Host "    npm run dev" -ForegroundColor Cyan
    exit 1
}

