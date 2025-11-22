# FoodFast Backend Startup Script
# Automatically frees port 8080 and starts Spring Boot backend

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "FoodFast Backend Startup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Kill any process using port 8080
Write-Host "[1/3] Checking for processes using port 8080..." -ForegroundColor Yellow
$processes = netstat -ano | findstr :8080 | findstr LISTENING

if ($processes) {
    foreach ($line in $processes) {
        $pid = ($line -split '\s+')[-1]
        if ($pid -match '^\d+$') {
            Write-Host "Killing process $pid on port 8080..." -ForegroundColor Red
            taskkill /PID $pid /F 2>$null
        }
    }
    Write-Host "Port 8080 is now free." -ForegroundColor Green
} else {
    Write-Host "Port 8080 is already free." -ForegroundColor Green
}
Write-Host ""

# Step 2: Compile project
Write-Host "[2/3] Compiling project..." -ForegroundColor Yellow
& mvn clean compile -q
if ($LASTEXITCODE -ne 0) {
    Write-Host "Compilation failed!" -ForegroundColor Red
    exit 1
}
Write-Host "Compilation successful." -ForegroundColor Green
Write-Host ""

# Step 3: Start Spring Boot
Write-Host "[3/3] Starting Spring Boot backend on port 8080..." -ForegroundColor Yellow
& mvn spring-boot:run

