/**
 * API Test: GET /api/products
 * Tests fetching all products from backend
 */

import axios from 'axios';

// Import getBackendUrl from mobile app
// For web, use: import.meta.env.VITE_API_BASE_URL ?? "http://192.168.0.101:8080/api"
// For mobile, use: getBackendUrl() from '../api/getBackendUrl'

// Mobile version
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

async function testProducts() {
  try {
    const BASE_URL = getBackendUrl();
    
    if (!BASE_URL || BASE_URL.trim() === '') {
      console.error('[API TEST] /products → FAIL');
      console.error('Reason: BASE_URL is empty or invalid');
      return;
    }

    if (BASE_URL.includes('localhost') || BASE_URL.includes('127.0.0.1')) {
      console.error('[API TEST] /products → FAIL');
      console.error('Reason: BASE_URL contains localhost (will not work on physical devices)');
      return;
    }

    const fullURL = `${BASE_URL}/products`;
    console.log(`[API TEST] Testing: GET ${fullURL}`);

    const response = await axios.get(`${BASE_URL}/products`, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200 && Array.isArray(response.data)) {
      const itemCount = response.data.length;
      console.log(`[API TEST] /products → PASS (200 OK)`);
      console.log(`Returned items: ${itemCount}`);
      
      if (itemCount > 0) {
        console.log(`[API TEST] First product:`, {
          id: response.data[0].id,
          name: response.data[0].name,
          price: response.data[0].price,
          restaurant: response.data[0].restaurant
        });
      }
    } else {
      console.error('[API TEST] /products → FAIL');
      console.error(`Reason: Invalid response format. Status: ${response.status}, Data type: ${typeof response.data}`);
    }
  } catch (error: any) {
    console.error('[API TEST] /products → FAIL');
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      console.error('Reason: Network error - Backend server not reachable');
      console.error(`Attempted URL: ${error.config?.url || 'unknown'}`);
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
testProducts();

