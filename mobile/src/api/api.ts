import axios from 'axios';

// Backend API client for mobile app
// Uses environment variable - required for production
const API_BASE_URL = process.env.API_BASE_URL || 'https://api.foodfast.com/api';

export const api = axios.create({ 
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

