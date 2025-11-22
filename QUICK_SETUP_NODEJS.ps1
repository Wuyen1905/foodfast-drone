# ==============================================
# QUICK NODE.JS SETUP FOR FOODFAST
# Run this script to quickly set up Node.js environment
# ==============================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  FoodFast - Quick Node.js Setup" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "⚠️  Administrator privileges required!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please run this script as Administrator:" -ForegroundColor Cyan
    Write-Host "  1. Right-click PowerShell" -ForegroundColor White
    Write-Host "  2. Select 'Run as Administrator'" -ForegroundColor White
    Write-Host "  3. Run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "Or run the full setup script:" -ForegroundColor Cyan
    Write-Host "  .\setup-nodejs-environment.ps1" -ForegroundColor Yellow
    Write-Host ""
    
    # Offer to run verification instead
    $verify = Read-Host "Would you like to verify your current setup instead? (Y/N)"
    if ($verify -eq "Y" -or $verify -eq "y") {
        & .\verify-nodejs-setup.ps1
        exit 0
    }
    
    exit 1
}

# Check if Node.js is already installed
Write-Host "Checking for existing Node.js installation..." -ForegroundColor Yellow
$nodeCmd = Get-Command node -ErrorAction SilentlyContinue

if ($nodeCmd) {
    try {
        $nodeVersion = node -v 2>&1
        $npmVersion = npm -v 2>&1
        
        Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
        Write-Host "✅ npm found: $npmVersion" -ForegroundColor Green
        
        # Check version
        $versionMatch = $nodeVersion -match 'v(\d+)\.(\d+)\.(\d+)'
        if ($versionMatch) {
            $major = [int]$matches[1]
            $minor = [int]$matches[2]
            
            if ($major -gt 20 -or ($major -eq 20 -and $minor -gt 18)) {
                Write-Host ""
                Write-Host "✅ Node.js version meets requirements!" -ForegroundColor Green
                Write-Host ""
                
                $continue = Read-Host "Node.js is already installed. Continue with setup anyway? (Y/N)"
                if ($continue -ne "Y" -and $continue -ne "y") {
                    Write-Host "Setup cancelled." -ForegroundColor Yellow
                    exit 0
                }
            }
        }
    } catch {
        Write-Host "⚠️  Node.js found but may be corrupted" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Starting full setup..." -ForegroundColor Cyan
Write-Host ""

# Run the full setup script
& .\setup-nodejs-environment.ps1

