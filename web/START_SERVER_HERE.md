# ⚠️ IMPORTANT: START SERVER FROM THIS DIRECTORY

## ✅ Correct Directory

You are in the **CORRECT** directory if you see:
```
C:\Users\LENOVO\OneDrive\Documents\W\CNPM\food_delivery_meal-main\web\
```

## ❌ Wrong Directories

You are in the **WRONG** directory if you see:
```
❌ C:\Users\LENOVO\OneDrive\Documents\W\CNPM\food_delivery_meal-main\
❌ C:\Users\LENOVO\OneDrive\Documents\W\CNPM\food_delivery_meal-main\web\web\
```

---

## 🚀 How to Start the Server (Step by Step)

### Method 1: Copy & Paste This Command
```powershell
cd C:\Users\LENOVO\OneDrive\Documents\W\CNPM\food_delivery_meal-main\web; npm run dev
```

### Method 2: Manual Navigation
```powershell
# Step 1: Go to project root
cd C:\Users\LENOVO\OneDrive\Documents\W\CNPM\food_delivery_meal-main

# Step 2: Enter the web directory
cd web

# Step 3: Verify you see package.json
Get-ChildItem package.json

# Step 4: Start the server
npm run dev
```

---

## 🔍 How to Check Your Current Directory

Run this command:
```powershell
Get-Location
```

**Expected output:**
```
Path
----
C:\Users\LENOVO\OneDrive\Documents\W\CNPM\food_delivery_meal-main\web
```

---

## 🎯 Quick Verification

Before running `npm run dev`, verify these files exist:
```powershell
# Check for package.json
Test-Path package.json

# Check for vite.config.ts
Test-Path vite.config.ts

# Check for src folder
Test-Path src
```

All three should return `True`.

---

## 🐛 If You Get "Cannot find package.json"

This means you're in the **wrong directory**. Fix it:

```powershell
# Force navigate to the correct directory
cd C:\Users\LENOVO\OneDrive\Documents\W\CNPM\food_delivery_meal-main\web

# Verify
Get-Location

# Then start
npm run dev
```

---

## 📂 Project Structure Reminder

```
food_delivery_meal-main/              ← PROJECT ROOT (don't run npm here)
│
├── web/                              ← ✅ START SERVER HERE
│   ├── package.json                 ← Must exist here
│   ├── vite.config.ts               ← Must exist here
│   ├── src/                         ← Source code
│   │   ├── main.tsx
│   │   ├── pages/
│   │   │   └── Menu.tsx
│   │   └── ...
│   └── node_modules/
│
├── mobile/                           ← Separate mobile app
├── lib/                              ← Flutter library
└── HOW_TO_RUN.md                    ← Main instructions
```

---

## ✅ Success Indicators

You'll know it's working when you see:
```
  VITE v5.4.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

## 🌐 Access the App

Once the server is running, open your browser to:
```
http://localhost:5173
```

**Test Login:**
- Username: `sweetdreams`
- Password: `sweet123`

---

## 🛑 Stop the Server

Press `Ctrl + C` in the terminal where the server is running.

---

## 💡 Pro Tip: Save This Command

Add this to a `.bat` file for easy access:

**File:** `start-dev-server.bat`
```batch
@echo off
cd /d C:\Users\LENOVO\OneDrive\Documents\W\CNPM\food_delivery_meal-main\web
echo Starting FoodFast Development Server...
npm run dev
```

Then just double-click the .bat file to start the server!

---

**Last Updated:** October 22, 2025  
**Status:** ✅ Server Configuration Complete

