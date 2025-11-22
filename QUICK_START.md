# FoodFast - Quick Start Guide

## 🚀 Quick Setup (3 Steps)

### Step 1: Start Mock API
```bash
cd mock-api
npm install
npm start
```
✅ API will run on `http://localhost:5000`

### Step 2: Start Web App
```bash
cd frontend-web
npm install
npm run dev
```
✅ Web app will run on `http://localhost:5173`

### Step 3: Start Mobile App (Optional)
```bash
cd frontend-mobile
npm install
npm start
```
✅ Opens Expo development tools

## 📋 Prerequisites

- Node.js v16+ installed
- npm or yarn installed
- For mobile: Expo Go app on your device (optional)

## 🎯 What You Get

### Web Application
- Customer ordering interface
- Restaurant dashboards (SweetDreams, Aloha Kitchen)
- Admin control panel
- Real-time drone tracking
- Shopping cart and checkout

### Mobile Application
- Native mobile experience
- Menu browsing
- Order tracking
- Drone delivery tracking

### Mock API
- RESTful endpoints for all data
- Easy to modify via `mock-api/db.json`

## 🔑 Default Login Credentials

**Customer:**
- Username: `user` / Password: `user123`

**Restaurant:**
- SweetDreams: `sweetdreams` / `sweet123`
- Aloha Kitchen: `aloha_restaurant` / `aloha123`

## 📝 Notes

- All three services can run simultaneously
- The mock API must be running for API calls to work
- For mobile devices, update IP address in `frontend-mobile/src/config/axios.ts`

## 🆘 Troubleshooting

**Port already in use?**
- Mock API: Change port in `mock-api/package.json` (default: 5000)
- Web: Change port in `frontend-web/vite.config.ts` (default: 5173)

**Mobile can't connect to API?**
- Update `API_BASE_URL` in `frontend-mobile/src/config/axios.ts` to your computer's IP address
- Ensure your device and computer are on the same network

## 📚 More Information

See `README.md` for detailed documentation.

