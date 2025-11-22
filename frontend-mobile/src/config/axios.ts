import axios from 'axios';

// Base URL for the mock API
// Uses environment variable if available (React Native uses process.env)
// For development, use your computer's IP address for mobile devices
// Environment variable format: API_BASE_URL=http://192.168.10.9:8080/api
// Fallback to localhost if env var not set (for same-machine testing)
const API_BASE_URL = process.env.API_BASE_URL || 'http://192.168.0.100:8080/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - clear token
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default apiClient;

