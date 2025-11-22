@echo off
cls
echo ========================================
echo  FoodFast Drone Delivery - Dev Server
echo ========================================
echo.
echo Navigating to web directory...
cd /d "%~dp0web"
echo.
echo Current directory: %CD%
echo.
echo Checking for package.json...
if exist package.json (
    echo [OK] package.json found
) else (
    echo [ERROR] package.json NOT found!
    echo Make sure you're running this from the project root.
    pause
    exit /b 1
)
echo.
echo Starting development server...
echo.
echo ========================================
echo  Server will be available at:
echo  http://localhost:5173
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.
npm run dev
pause

