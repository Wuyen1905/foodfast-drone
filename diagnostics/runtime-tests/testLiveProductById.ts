/**
 * Runtime Test: GET /api/products/:id
 * Tests live API call to fetch a single product by ID
 */

import axios from 'axios';
import { getBackendUrl } from '../../frontend-mobile/src/api/getBackendUrl';

async function testLiveProductById() {
  console.log('\n========================================');
  console.log('[RUNTIME TEST] GET /api/products/:id');
  console.log('========================================\n');

  try {
    // Resolve BASE_URL exactly the same way as mobile app
    const BASE_URL = getBackendUrl();
    console.log(`[BASE_URL] Resolved: ${BASE_URL}`);

    if (!BASE_URL || BASE_URL.trim() === '') {
      console.error('[RESULT] FAIL');
      console.error('[REASON] BASE_URL is empty or invalid');
      return { pass: false, reason: 'BASE_URL empty' };
    }

    // First, get a product ID from the products list
    console.log('[STEP 1] Fetching products list to get a test ID...');
    const productsResponse = await axios.get(`${BASE_URL}/products`, { 
      timeout: 5000 
    });
    
    const products = productsResponse.data;
    
    if (!Array.isArray(products) || products.length === 0) {
      console.error('[RESULT] FAIL');
      console.error('[REASON] No products available to test with');
      return { 
        pass: false, 
        reason: 'No products in database to test product/:id endpoint' 
      };
    }

    const testProductId = products[0].id;
    console.log(`[TEST_PRODUCT_ID] ${testProductId}`);

    // Construct full URL
    const fullURL = `${BASE_URL}/products/${testProductId}`;
    console.log(`[FULL_URL] ${fullURL}`);

    // Make API call
    console.log('[REQUEST] Sending GET request...');
    const startTime = Date.now();
    
    const response = await axios.get(`${BASE_URL}/products/${testProductId}`, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const duration = Date.now() - startTime;
    console.log(`[RESPONSE] Received in ${duration}ms`);

    // Print status code
    console.log(`[STATUS_CODE] ${response.status} ${response.statusText}`);

    // Print response JSON (stringified)
    console.log(`[RESPONSE_DATA] Type: ${typeof response.data}`);
    console.log(`[RESPONSE_DATA] Full JSON:`, JSON.stringify(response.data, null, 2));

    // Validate response
    if (response.status === 200) {
      if (response.data && response.data.id) {
        console.log(`\n[RESULT] PASS`);
        console.log(`[SUMMARY] Successfully fetched product: ${response.data.name}`);
        
        return { 
          pass: true, 
          reason: 'Success', 
          statusCode: 200,
          product: response.data
        };
      } else {
        console.error(`\n[RESULT] FAIL`);
        console.error(`[REASON] Response missing product data`);
        return { 
          pass: false, 
          reason: 'Invalid product data',
          statusCode: 200
        };
      }
    } else {
      console.error(`\n[RESULT] FAIL`);
      console.error(`[REASON] Unexpected status code: ${response.status}`);
      return { 
        pass: false, 
        reason: `Unexpected status: ${response.status}`,
        statusCode: response.status
      };
    }
  } catch (error: any) {
    console.error(`\n[RESULT] FAIL`);
    
    // Print detailed error information
    console.error(`[ERROR_MESSAGE] ${error.message || 'Unknown error'}`);
    console.error(`[ERROR_CODE] ${error.code || 'N/A'}`);
    
    if (error.response) {
      console.error(`[ERROR_RESPONSE_STATUS] ${error.response.status} ${error.response.statusText}`);
      console.error(`[ERROR_RESPONSE_DATA]`, JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(`[ERROR_RESPONSE] No response received`);
    }

    // Root cause analysis
    let rootCause = 'Unknown error';
    
    if (error.code === 'ECONNREFUSED') {
      rootCause = 'Backend server not running or not reachable';
    } else if (error.code === 'ENOTFOUND' || error.code === 'EAI_AGAIN') {
      rootCause = 'DNS resolution failed - IP address may be incorrect';
    } else if (error.code === 'ETIMEDOUT' || error.message?.includes('timeout')) {
      rootCause = 'Request timeout - backend may be slow or unreachable';
    } else if (error.response?.status === 404) {
      rootCause = 'Product not found (404) - product ID may not exist';
    } else if (error.response?.status === 500) {
      rootCause = 'Server error (500) - backend processing failed';
    }

    console.error(`[ROOT_CAUSE] ${rootCause}`);

    return { 
      pass: false, 
      reason: rootCause,
      errorCode: error.code,
      errorMessage: error.message,
      statusCode: error.response?.status
    };
  }
}

// Export for use in master script
export { testLiveProductById };

// If run directly, execute test
if (require.main === module) {
  testLiveProductById().then(() => {
    console.log('\n[TEST COMPLETE]');
    process.exit(0);
  }).catch((err) => {
    console.error('\n[TEST ERROR]', err);
    process.exit(1);
  });
}

