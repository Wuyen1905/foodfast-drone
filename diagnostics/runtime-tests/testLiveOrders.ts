/**
 * Runtime Test: POST /api/orders
 * Tests live API call to create a new order
 */

import axios from 'axios';
import { getBackendUrl } from '../../frontend-mobile/src/api/getBackendUrl';

async function testLiveOrders() {
  console.log('\n========================================');
  console.log('[RUNTIME TEST] POST /api/orders');
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

    // First, get a product to use in the order
    console.log('[STEP 1] Fetching products list to create test order...');
    const productsResponse = await axios.get(`${BASE_URL}/products`, { 
      timeout: 5000 
    });
    
    const products = productsResponse.data;
    
    if (!Array.isArray(products) || products.length === 0) {
      console.error('[RESULT] FAIL');
      console.error('[REASON] No products available to create order with');
      return { 
        pass: false, 
        reason: 'No products in database to create order' 
      };
    }

    const testProduct = products[0];
    console.log(`[TEST_PRODUCT] Using: ${testProduct.name} (ID: ${testProduct.id})`);

    // Construct order payload
    const orderPayload = {
      customerName: "Test Customer (Runtime Test)",
      customerPhone: "0123456789",
      address: "123 Test Street, Test City",
      restaurant: testProduct.restaurant || "SweetDreams",
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

    console.log(`[ORDER_PAYLOAD]`, JSON.stringify(orderPayload, null, 2));

    // Construct full URL
    const fullURL = `${BASE_URL}/orders`;
    console.log(`[FULL_URL] ${fullURL}`);

    // Make API call
    console.log('[REQUEST] Sending POST request...');
    const startTime = Date.now();
    
    const response = await axios.post(`${BASE_URL}/orders`, orderPayload, {
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
    if (response.status === 201 || response.status === 200) {
      if (response.data && (response.data.id || response.data.orderId)) {
        console.log(`\n[RESULT] PASS`);
        console.log(`[SUMMARY] Successfully created order: ${response.data.id || response.data.orderId}`);
        
        return { 
          pass: true, 
          reason: 'Success', 
          statusCode: response.status,
          order: response.data
        };
      } else {
        console.error(`\n[RESULT] FAIL`);
        console.error(`[REASON] Response missing order ID`);
        return { 
          pass: false, 
          reason: 'Invalid order response',
          statusCode: response.status
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
    } else if (error.response?.status === 400) {
      rootCause = 'Bad request (400) - order payload may be invalid';
    } else if (error.response?.status === 404) {
      rootCause = 'Endpoint not found (404) - orders endpoint may not exist';
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
export { testLiveOrders };

// If run directly, execute test
if (require.main === module) {
  testLiveOrders().then(() => {
    console.log('\n[TEST COMPLETE]');
    process.exit(0);
  }).catch((err) => {
    console.error('\n[TEST ERROR]', err);
    process.exit(1);
  });
}

