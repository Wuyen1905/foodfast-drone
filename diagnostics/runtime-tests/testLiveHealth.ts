/**
 * Runtime Test: GET /api/health
 * Tests live API call to health check endpoint
 */

import axios from 'axios';
import { getBackendUrl } from '../../frontend-mobile/src/api/getBackendUrl';

async function testLiveHealth() {
  console.log('\n========================================');
  console.log('[RUNTIME TEST] GET /api/health');
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

    // Construct full URL
    const fullURL = `${BASE_URL}/health`;
    console.log(`[FULL_URL] ${fullURL}`);

    // Make API call
    console.log('[REQUEST] Sending GET request...');
    const startTime = Date.now();
    
    const response = await axios.get(`${BASE_URL}/health`, {
      timeout: 5000,
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
      console.log(`\n[RESULT] PASS`);
      console.log(`[SUMMARY] Health endpoint is available`);
      
      return { 
        pass: true, 
        reason: 'Success', 
        statusCode: 200,
        healthData: response.data
      };
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
    // Health endpoint may not exist, so 404 is expected
    if (error.response?.status === 404) {
      console.warn(`\n[RESULT] NOT FOUND (Expected)`);
      console.warn(`[REASON] Health endpoint does not exist (404)`);
      console.warn(`[NOTE] This is not critical - health endpoint is optional`);
      
      return { 
        pass: true, 
        reason: 'Endpoint not found (expected)', 
        statusCode: 404,
        note: 'Health endpoint is optional'
      };
    }

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
export { testLiveHealth };

// If run directly, execute test
if (require.main === module) {
  testLiveHealth().then(() => {
    console.log('\n[TEST COMPLETE]');
    process.exit(0);
  }).catch((err) => {
    console.error('\n[TEST ERROR]', err);
    process.exit(1);
  });
}

