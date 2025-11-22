# Setup Node.js and run FoodFast frontend
$nodePath = "D:\NodePortable"
$nodeFolder = Get-ChildItem -Path $nodePath -Directory | Where-Object { $_.Name -like "node-v22*" } | Select-Object -First 1

if (-not $nodeFolder) {
    Write-Host "Node.js v22 not found. Please run setup-node-and-run.ps1 first."
    exit 1
}

$realNode = $nodeFolder.FullName
Write-Host "Using Node.js from: $realNode"

# Set PATH
$env:Path = "$realNode;$realNode\node_modules\npm\bin;$env:Path"

# Free up port 5173 if in use
Write-Host "Checking port 5173..."
$portCheck = netstat -ano | findstr :5173
if ($portCheck) {
    $lines = $portCheck -split "`n"
    foreach ($line in $lines) {
        if ($line -match '\s+(\d+)\s*$') {
            $pid = $matches[1]
            if ($pid -match "^\d+$") {
                Write-Host "Port 5173 is in use by PID $pid. Killing process..."
                Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
                Start-Sleep -Seconds 2
            }
        }
    }
    Write-Host "Port 5173 freed"
} else {
    Write-Host "Port 5173 is available"
}

# Change to web directory
Set-Location "D:\FoodFast\web"
Write-Host "Current directory: $(Get-Location)"

# Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..."
    & "$realNode\npm.cmd" install --legacy-peer-deps
} else {
    Write-Host "Dependencies already installed"
}

# Verify realtime packages
Write-Host "Checking realtime packages..."
& "$realNode\npm.cmd" list sockjs-client @stomp/stompjs 2>&1 | Out-Null

# Start dev server
Write-Host "Starting FoodFast frontend dev server..."
& "$realNode\npm.cmd" run dev
