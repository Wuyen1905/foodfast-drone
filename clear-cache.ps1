# Clear Vite Cache Script for Windows PowerShell
# Run this script to clear Vite cache and fix build errors

Write-Host "Clearing Vite cache..." -ForegroundColor Yellow

# Remove Vite cache directories
if (Test-Path "node_modules\.vite") {
    Remove-Item -Recurse -Force "node_modules\.vite"
    Write-Host "✓ Removed node_modules\.vite" -ForegroundColor Green
} else {
    Write-Host "✓ node_modules\.vite not found (already clean)" -ForegroundColor Gray
}

if (Test-Path ".vite") {
    Remove-Item -Recurse -Force ".vite"
    Write-Host "✓ Removed .vite" -ForegroundColor Green
} else {
    Write-Host "✓ .vite not found (already clean)" -ForegroundColor Gray
}

if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "✓ Removed dist" -ForegroundColor Green
} else {
    Write-Host "✓ dist not found (already clean)" -ForegroundColor Gray
}

Write-Host "`nVite cache cleared successfully!" -ForegroundColor Green
Write-Host "You can now run 'npm run dev' to start the development server." -ForegroundColor Cyan

