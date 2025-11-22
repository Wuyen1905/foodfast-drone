@echo off
echo ========================================
echo FoodFast Backend Startup Script
echo ========================================
echo.

echo [1/3] Checking for processes using port 8080...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080 ^| findstr LISTENING') do (
    echo Killing process %%a on port 8080...
    taskkill /PID %%a /F >nul 2>&1
)
echo Port 8080 is now free.
echo.

echo [2/3] Compiling project...
call mvn clean compile -q
if errorlevel 1 (
    echo Compilation failed!
    pause
    exit /b 1
)
echo Compilation successful.
echo.

echo [3/3] Starting Spring Boot backend on port 8080...
call mvn spring-boot:run

