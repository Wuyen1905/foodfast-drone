// API Configuration for mobile app
// Base URL for Spring Boot backend
// 
// NOTE: This file is kept for backward compatibility.
// Prefer using getBackendUrl() from './getBackendUrl' which auto-detects the correct IP.
// Or set EXPO_PUBLIC_BACKEND_URL environment variable.

// Use environment variable if available, otherwise undefined
// getBackendUrl() will handle auto-detection when this is undefined
export const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL || 
                        process.env.API_BASE_URL || 
                        undefined;

// Auto-detect development mode
export const isDevelopment = __DEV__ || process.env.NODE_ENV === 'development';

