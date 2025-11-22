# FoodFast Development Server Startup Script
Write-Host "Starting FoodFast Development Server..." -ForegroundColor Green
Write-Host ""

# Clean Vite cache if it exists
if (Test-Path "node_modules\.vite") {
    Write-Host "Cleaning Vite cache..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "node_modules\.vite"
}

# Clean dist folder if it exists
if (Test-Path "dist") {
    Write-Host "Cleaning dist folder..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "dist"
}

Write-Host "Starting development server..." -ForegroundColor Green
npm run dev
