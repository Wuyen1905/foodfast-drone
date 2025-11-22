#!/bin/bash
# Clear Vite Cache Script for macOS/Linux
# Run this script to clear Vite cache and fix build errors

echo "Clearing Vite cache..."

# Remove Vite cache directories
if [ -d "node_modules/.vite" ]; then
    rm -rf node_modules/.vite
    echo "✓ Removed node_modules/.vite"
else
    echo "✓ node_modules/.vite not found (already clean)"
fi

if [ -d ".vite" ]; then
    rm -rf .vite
    echo "✓ Removed .vite"
else
    echo "✓ .vite not found (already clean)"
fi

if [ -d "dist" ]; then
    rm -rf dist
    echo "✓ Removed dist"
else
    echo "✓ dist not found (already clean)"
fi

echo ""
echo "Vite cache cleared successfully!"
echo "You can now run 'npm run dev' to start the development server."

