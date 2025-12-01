/**
 * API Test: GET /api/health
 * Tests backend health check endpoint
 */

import axios from 'axios';

// Import getBackendUrl from mobile app
let getBackendUrl: () => string;
try {
  const getBackendUrlModule = require('../../frontend-mobile/src/api/getBackendUrl');
  getBackendUrl = getBackendUrlModule.getBackendUrl;
} catch (e) {
  // Web version fallback
  getBackendUrl = () => {
    return (typeof import !== 'undefined' && import.meta?.env?.VITE_API_BASE_URL) 
      ? import.meta.env.VITE_API_BASE_URL 
      : "http://192.168.0.101:8080/api";
  };
}

async function testHealth() {
  try {
    const BASE_URL = getBackendUrl();
    
    if (!BASE_URL || BASE_URL.trim() === '') {
      console.error('[API TEST] /health → FAIL');
      console.error('Reason: BASE_URL is empty or invalid');
      return;
    }

    const fullURL = `${BASE_URL}/health`;
    console.log(`[API TEST] Testing: GET ${fullURL}`);

    const response = await axios.get(`${BASE_URL}/health`, {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      console.log(`[API TEST] /health → PASS (200 OK)`);
      console.log(`Health status:`, response.data);
    } else {
      console.error('[API TEST] /health → FAIL');
      console.error(`Reason: Unexpected status code ${response.status}`);
    }
  } catch (error: any) {
    console.error('[API TEST] /health → FAIL');
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      console.error('Reason: Network error - Backend server not reachable');
      console.error('This indicates the backend is not running or BASE_URL is incorrect');
    } else if (error.response?.status === 404) {
      console.warn('[API TEST] /health → NOT FOUND (404)');
      console.warn('Reason: Health endpoint does not exist in backend');
      console.warn('Note: This is not critical - health endpoint is optional');
    } else if (error.response) {
      console.error(`Reason: HTTP ${error.response.status} - ${error.response.statusText}`);
    } else if (error.message) {
      console.error(`Reason: ${error.message}`);
    } else {
      console.error('Reason: Unknown error');
    }
  }
}

// Run test
testHealth();

