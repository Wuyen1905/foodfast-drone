/**
 * Runtime Test: GET /api/products
 * Tests live API call to backend
 */

import axios from 'axios';
import { getBackendUrl } from '../../frontend-mobile/src/api/getBackendUrl';

async function testLiveProducts() {
  console.log('\n========================================');
  console.log('[RUNTIME TEST] GET /api/products');
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

    if (BASE_URL.includes('localhost') || BASE_URL.includes('127.0.0.1')) {
      console.warn('[WARNING] BASE_URL contains localhost - may not work on physical devices');
    }

    // Construct full URL
    const fullURL = `${BASE_URL}/products`;
    console.log(`[FULL_URL] ${fullURL}`);

    // Make API call
    console.log('[REQUEST] Sending GET request...');
    const startTime = Date.now();
    
    const response = await axios.get(`${BASE_URL}/products`, {
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
    console.log(`[RESPONSE_DATA] Is Array: ${Array.isArray(response.data)}`);
    
    if (Array.isArray(response.data)) {
      console.log(`[RESPONSE_DATA] Array Length: ${response.data.length}`);
      if (response.data.length > 0) {
        console.log(`[RESPONSE_DATA] First Item:`, JSON.stringify(response.data[0], null, 2));
      } else {
        console.log(`[RESPONSE_DATA] Array is empty: []`);
      }
    } else {
      console.log(`[RESPONSE_DATA] Full JSON:`, JSON.stringify(response.data, null, 2));
    }

    // Validate response
    if (response.status === 200) {
      if (Array.isArray(response.data)) {
        const itemCount = response.data.length;
        console.log(`\n[RESULT] PASS`);
        console.log(`[SUMMARY] Backend returned ${itemCount} products`);
        
        if (itemCount === 0) {
          console.warn(`[WARNING] Backend returned empty array - database may be empty`);
          return { 
            pass: true, 
            reason: 'Empty array returned', 
            itemCount: 0,
            statusCode: 200
          };
        }
        
        return { 
          pass: true, 
          reason: 'Success', 
          itemCount,
          statusCode: 200,
          sampleProduct: response.data[0]
        };
      } else {
        console.error(`\n[RESULT] FAIL`);
        console.error(`[REASON] Response is not an array`);
        return { 
          pass: false, 
          reason: 'Response not array',
          statusCode: 200,
          dataType: typeof response.data
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
      rootCause = 'Backend server not running or not reachable at the specified IP:port';
    } else if (error.code === 'ENOTFOUND' || error.code === 'EAI_AGAIN') {
      rootCause = 'DNS resolution failed - IP address may be incorrect';
    } else if (error.code === 'ETIMEDOUT' || error.message?.includes('timeout')) {
      rootCause = 'Request timeout - backend may be slow or unreachable';
    } else if (error.response?.status === 404) {
      rootCause = 'Endpoint not found (404) - backend route may not exist';
    } else if (error.response?.status === 500) {
      rootCause = 'Server error (500) - backend processing failed';
    } else if (error.response?.status === 403 || error.message?.includes('CORS')) {
      rootCause = 'CORS blocked - backend may not allow this origin';
    } else if (error.response?.status === 401) {
      rootCause = 'Unauthorized (401) - authentication required';
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
export { testLiveProducts };

// If run directly, execute test
if (require.main === module) {
  testLiveProducts().then(() => {
    console.log('\n[TEST COMPLETE]');
    process.exit(0);
  }).catch((err) => {
    console.error('\n[TEST ERROR]', err);
    process.exit(1);
  });
}

