@echo off
echo Checking for processes using port 8080...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080 ^| findstr LISTENING') do (
    echo Killing process %%a on port 8080...
    taskkill /PID %%a /F >nul 2>&1
)
echo Port 8080 is now free.
pause

