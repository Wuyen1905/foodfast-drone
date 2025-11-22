import axios from 'axios';

// [Data Sync] Use shared mock API server instead of AxiosMockAdapter
// For mobile devices, you may need to use your computer's IP address instead of localhost
// Example: 'http://192.168.1.100:5000' (replace with your actual IP)
const API_BASE_URL = __DEV__ 
  ? 'http://192.168.0.100:8080/api'  // For iOS Simulator / Android Emulator
  : 'http://192.168.0.100:8080/api';  // For physical devices, replace with your computer's IP

export const api = axios.create({ 
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// [Data Sync] Note: Removed AxiosMockAdapter - now using backend API
// All requests now go to http://192.168.0.100:8080/api which is the same API used by web frontend

