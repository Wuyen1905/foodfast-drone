/**
 * API Test: GET /api/products/:id
 * Tests fetching a single product by ID
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

async function testProductById() {
  try {
    const BASE_URL = getBackendUrl();
    
    if (!BASE_URL || BASE_URL.trim() === '') {
      console.error('[API TEST] /products/:id → FAIL');
      console.error('Reason: BASE_URL is empty or invalid');
      return;
    }

    // First, get a product ID from the products list
    const productsResponse = await axios.get(`${BASE_URL}/products`, { timeout: 5000 });
    const products = productsResponse.data;
    
    if (!Array.isArray(products) || products.length === 0) {
      console.error('[API TEST] /products/:id → FAIL');
      console.error('Reason: No products available to test with');
      return;
    }

    const testProductId = products[0].id;
    const fullURL = `${BASE_URL}/products/${testProductId}`;
    console.log(`[API TEST] Testing: GET ${fullURL}`);

    const response = await axios.get(`${BASE_URL}/products/${testProductId}`, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200 && response.data && response.data.id) {
      console.log(`[API TEST] /products/:id → PASS (200 OK)`);
      console.log(`Returned product:`, {
        id: response.data.id,
        name: response.data.name,
        price: response.data.price,
        restaurant: response.data.restaurant
      });
    } else {
      console.error('[API TEST] /products/:id → FAIL');
      console.error(`Reason: Invalid response format. Status: ${response.status}`);
    }
  } catch (error: any) {
    console.error('[API TEST] /products/:id → FAIL');
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      console.error('Reason: Network error - Backend server not reachable');
    } else if (error.response?.status === 404) {
      console.error('Reason: Product not found (404)');
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
testProductById();

