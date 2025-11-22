# ==============================================
# AUTO FIX NODE + PORT + RUN FOODFAST FRONTEND
# ==============================================

# 1. Folder chua Node Portable
$nodePath = "D:\NodePortable"
if (-not (Test-Path $nodePath)) {
  New-Item -ItemType Directory -Force -Path $nodePath | Out-Null
  Write-Host "Created folder D:\NodePortable"
}

# 2. Don dep Node cu (neu co)
Write-Host "Cleaning up old Node.js installations..."
Get-ChildItem $nodePath -Filter "node-v*" -Recurse -Directory | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
Get-ChildItem $nodePath -Filter "*.zip" | Remove-Item -Force -ErrorAction SilentlyContinue

# 3. Download Node.js v22.12.0 (portable)
$zipPath = "$nodePath\node-v22.zip"
Write-Host "Downloading Node.js v22.12.0..."
try {
    Invoke-WebRequest -Uri "https://nodejs.org/dist/v22.12.0/node-v22.12.0-win-x64.zip" -OutFile $zipPath
    Write-Host "Download completed"
} catch {
    Write-Host "Download failed, trying latest v22.x..."
    try {
        Invoke-WebRequest -Uri "https://nodejs.org/dist/latest-v22.x/node-v22.12.0-win-x64.zip" -OutFile $zipPath
    } catch {
        Write-Host "Error: Could not download Node.js. Please check your internet connection."
        exit 1
    }
}

# 4. Giai nen Node.js
Write-Host "Extracting Node.js..."
Expand-Archive -Path $zipPath -DestinationPath $nodePath -Force
$nodeFolder = Get-ChildItem -Path $nodePath -Directory | Where-Object { $_.Name -like "node-v22*" } | Select-Object -First 1

if ($null -eq $nodeFolder) {
    Write-Host "Error: Could not find extracted Node.js folder"
    exit 1
}

$realNode = $nodeFolder.FullName
Write-Host "Using Node.js from: $realNode"

# 5. Add Node + npm vao PATH tam thoi
$env:Path = "$realNode;$realNode\node_modules\npm\bin;$env:Path"
Write-Host "PATH configured for Node.js"
Write-Host "Node.js version:"
& "$realNode\node.exe" -v
Write-Host "npm version:"
& "$realNode\npm.cmd" -v

# 6. Giai phong port 5173 neu dang bi chiem
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

# 7. Chay FoodFast frontend
Write-Host "Running FoodFast frontend..."
Set-Location "D:\FoodFast\web"
Write-Host "Current directory: $(Get-Location)"

# Install dependencies
Write-Host "Installing dependencies..."
& "$realNode\npm.cmd" install --legacy-peer-deps

# Install realtime packages (if not already installed)
Write-Host "Checking realtime packages..."
& "$realNode\npm.cmd" install sockjs-client @stomp/stompjs --legacy-peer-deps

# Run dev server
Write-Host "Starting FoodFast frontend dev server..."
& "$realNode\npm.cmd" run dev
