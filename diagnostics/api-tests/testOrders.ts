/**
 * API Test: POST /api/orders
 * Tests creating a new order
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

async function testOrders() {
  try {
    const BASE_URL = getBackendUrl();
    
    if (!BASE_URL || BASE_URL.trim() === '') {
      console.error('[API TEST] POST /orders → FAIL');
      console.error('Reason: BASE_URL is empty or invalid');
      return;
    }

    // First, get a product to use in the order
    const productsResponse = await axios.get(`${BASE_URL}/products`, { timeout: 5000 });
    const products = productsResponse.data;
    
    if (!Array.isArray(products) || products.length === 0) {
      console.error('[API TEST] POST /orders → FAIL');
      console.error('Reason: No products available to create order with');
      return;
    }

    const testProduct = products[0];
    const fullURL = `${BASE_URL}/orders`;
    console.log(`[API TEST] Testing: POST ${fullURL}`);

    const orderPayload = {
      customerName: "Test Customer",
      customerPhone: "0123456789",
      address: "123 Test Street",
      restaurant: testProduct.restaurant,
      items: [
        {
          productId: testProduct.id,
          name: testProduct.name,
          quantity: 1,
          price: testProduct.price
        }
      ],
      paymentMethod: "cod"
    };

    const response = await axios.post(`${BASE_URL}/orders`, orderPayload, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 201 || response.status === 200) {
      console.log(`[API TEST] POST /orders → PASS (${response.status} ${response.status === 201 ? 'Created' : 'OK'})`);
      console.log(`Created order:`, {
        id: response.data.id,
        customerName: response.data.customerName || response.data.name,
        total: response.data.total,
        status: response.data.status
      });
    } else {
      console.error('[API TEST] POST /orders → FAIL');
      console.error(`Reason: Unexpected status code ${response.status}`);
    }
  } catch (error: any) {
    console.error('[API TEST] POST /orders → FAIL');
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      console.error('Reason: Network error - Backend server not reachable');
    } else if (error.response?.status === 400) {
      console.error('Reason: Bad request (400) - Invalid order payload');
      console.error('Details:', error.response.data);
    } else if (error.response?.status === 500) {
      console.error('Reason: Server error (500) - Backend processing failed');
      console.error('Details:', error.response.data);
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
testOrders();

