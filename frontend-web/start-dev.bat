@echo off
echo Starting FoodFast Development Server...
echo.

REM Clean Vite cache if it exists
if exist node_modules\.vite (
    echo Cleaning Vite cache...
    rmdir /s /q node_modules\.vite
)

REM Clean dist folder if it exists
if exist dist (
    echo Cleaning dist folder...
    rmdir /s /q dist
)

echo Starting development server...
npm run dev

pause
