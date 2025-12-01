/**
 * API Test: GET /api/categories
 * NOTE: This endpoint does not exist in the backend.
 * Categories are extracted from products on the frontend.
 * This test verifies that /api/categories returns 404 and documents the workaround.
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

async function testCategories() {
  try {
    const BASE_URL = getBackendUrl();
    
    if (!BASE_URL || BASE_URL.trim() === '') {
      console.error('[API TEST] /categories → FAIL');
      console.error('Reason: BASE_URL is empty or invalid');
      return;
    }

    const fullURL = `${BASE_URL}/categories`;
    console.log(`[API TEST] Testing: GET ${fullURL}`);

    const response = await axios.get(`${BASE_URL}/categories`, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // If endpoint exists, test it
    if (response.status === 200) {
      console.log(`[API TEST] /categories → PASS (200 OK)`);
      console.log(`Returned categories:`, response.data);
    }
  } catch (error: any) {
    // Expected: 404 Not Found (endpoint doesn't exist)
    if (error.response?.status === 404) {
      console.warn('[API TEST] /categories → NOT FOUND (404)');
      console.warn('Reason: Endpoint does not exist in backend');
      console.warn('Workaround: Categories are extracted from products on frontend');
      console.warn('Frontend code: Array.from(new Set(products.map(p => p.category)))');
    } else if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      console.error('[API TEST] /categories → FAIL');
      console.error('Reason: Network error - Backend server not reachable');
    } else if (error.response) {
      console.error(`[API TEST] /categories → FAIL`);
      console.error(`Reason: HTTP ${error.response.status} - ${error.response.statusText}`);
    } else if (error.message) {
      console.error(`[API TEST] /categories → FAIL`);
      console.error(`Reason: ${error.message}`);
    } else {
      console.error('[API TEST] /categories → FAIL');
      console.error('Reason: Unknown error');
    }
  }
}

// Run test
testCategories();

