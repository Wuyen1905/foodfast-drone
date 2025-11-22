# PowerShell script to kill process using port 8080
Write-Host "Checking for processes using port 8080..." -ForegroundColor Yellow

$processes = netstat -ano | findstr :8080 | findstr LISTENING

if ($processes) {
    foreach ($line in $processes) {
        $processId = ($line -split '\s+')[-1]
        if ($processId -match '^\d+$') {
            Write-Host "Killing process $processId on port 8080..." -ForegroundColor Red
            taskkill /PID $processId /F 2>$null
        }
    }
    Write-Host "Port 8080 is now free." -ForegroundColor Green
} else {
    Write-Host "Port 8080 is already free." -ForegroundColor Green
}

