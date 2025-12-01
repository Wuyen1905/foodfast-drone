#!/bin/bash

echo ""
echo "========================================"
echo "  🚀 Starting FoodFast Environment..."
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed or not in PATH"
    echo "   Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Error: Java is not installed or not in PATH"
    echo "   Please install Java 17+ from https://adoptium.net/"
    exit 1
fi

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "❌ Error: Maven is not installed or not in PATH"
    echo "   Please install Maven from https://maven.apache.org/"
    exit 1
fi

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Function to detect terminal emulator
detect_terminal() {
    if command -v gnome-terminal &> /dev/null; then
        echo "gnome-terminal"
    elif command -v xterm &> /dev/null; then
        echo "xterm"
    elif command -v konsole &> /dev/null; then
        echo "konsole"
    elif command -v x-terminal-emulator &> /dev/null; then
        echo "x-terminal-emulator"
    else
        echo "unknown"
    fi
}

TERMINAL=$(detect_terminal)

# Function to start service in new terminal
start_service() {
    local name=$1
    local dir=$2
    local cmd=$3
    
    case $TERMINAL in
        gnome-terminal)
            gnome-terminal --title="$name" -- bash -c "cd '$SCRIPT_DIR/$dir' && echo '✅ $name starting...' && $cmd; exec bash"
            ;;
        xterm)
            xterm -T "$name" -e bash -c "cd '$SCRIPT_DIR/$dir' && echo '✅ $name starting...' && $cmd; exec bash" &
            ;;
        konsole)
            konsole --new-tab -e bash -c "cd '$SCRIPT_DIR/$dir' && echo '✅ $name starting...' && $cmd; exec bash" &
            ;;
        x-terminal-emulator)
            x-terminal-emulator -e bash -c "cd '$SCRIPT_DIR/$dir' && echo '✅ $name starting...' && $cmd; exec bash" &
            ;;
        *)
            echo "⚠️  Warning: Unknown terminal emulator. Starting services in background..."
            cd "$SCRIPT_DIR/$dir" && $cmd &
            ;;
    esac
}

echo "[1/3] Starting Spring Boot Backend on port 8080..."
start_service "FoodFast Backend" "backend" "mvn spring-boot:run"
sleep 5

echo "[2/3] Starting Frontend Web on port 5173..."
start_service "FoodFast Web App" "frontend-web" "npm install && npm run dev"
sleep 3

echo "[3/3] Starting Frontend Mobile (Expo)..."
start_service "FoodFast Mobile App" "frontend-mobile" "npm install && npx expo start"
sleep 3

echo ""
echo "========================================"
echo "  ✅ All servers launched successfully!"
echo "========================================"
echo ""
echo "📋 Services running:"
echo "   • Backend API:  http://localhost:8080"
echo "   • Web App:      http://localhost:5173"
echo "   • Mobile App:   Expo DevTools (check terminal)"
echo ""
echo "💡 Tip: Each service runs in its own terminal window."
echo "   Close individual windows to stop specific services."
echo ""

