/**
 * Runtime Test: GET /api/products
 * Tests live API call to backend products endpoint
 */

import axios from 'axios';

const BASE_URL = "http://192.168.0.101:8080/api";

// Common axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface TestResult {
  testName: string;
  pass: boolean;
  statusCode?: number;
  errorCode?: string;
  errorMessage?: string;
  reason: string;
  itemCount?: number;
  responseTime?: number;
  sampleData?: any;
}

export async function testProducts(): Promise<TestResult> {
  const testName = 'GET /api/products';
  const startTime = Date.now();

  try {
    console.log(`\n[TEST] ${testName}`);
    console.log(`[URL] ${BASE_URL}/products`);

    const response = await apiClient.get('/products');
    const responseTime = Date.now() - startTime;

    console.log(`[STATUS] ${response.status} ${response.statusText}`);
    console.log(`[TIME] ${responseTime}ms`);

    if (response.status === 200) {
      const data = response.data;
      const isArray = Array.isArray(data);
      const itemCount = isArray ? data.length : 0;

      console.log(`[RESPONSE] Type: ${typeof data}, Is Array: ${isArray}`);
      console.log(`[ITEMS] ${itemCount} products returned`);

      if (isArray) {
        if (itemCount > 0) {
          console.log(`[SAMPLE] First product: ${data[0].name || data[0].id}`);
          console.log(`[RESULT] ✅ PASS`);
          return {
            testName,
            pass: true,
            statusCode: 200,
            reason: `Successfully retrieved ${itemCount} products`,
            itemCount,
            responseTime,
            sampleData: data[0],
          };
        } else {
          console.log(`[WARNING] Empty array returned - database may be empty`);
          console.log(`[RESULT] ⚠️ PASS (Empty)`);
          return {
            testName,
            pass: true,
            statusCode: 200,
            reason: 'Backend returned empty array - database has no products',
            itemCount: 0,
            responseTime,
          };
        }
      } else {
        console.log(`[ERROR] Response is not an array`);
        console.log(`[RESULT] ❌ FAIL`);
        return {
          testName,
          pass: false,
          statusCode: 200,
          reason: 'Response is not an array',
          responseTime,
        };
      }
    } else {
      console.log(`[ERROR] Unexpected status code: ${response.status}`);
      console.log(`[RESULT] ❌ FAIL`);
      return {
        testName,
        pass: false,
        statusCode: response.status,
        reason: `Unexpected status code: ${response.status}`,
        responseTime,
      };
    }
  } catch (error: any) {
    const responseTime = Date.now() - startTime;
    const errorCode = error.code;
    const errorMessage = error.message;
    const statusCode = error.response?.status;

    console.log(`[ERROR] ${errorMessage || 'Unknown error'}`);
    if (errorCode) console.log(`[ERROR_CODE] ${errorCode}`);
    if (statusCode) console.log(`[STATUS] ${statusCode}`);

    let reason = 'Unknown error';
    if (errorCode === 'ECONNREFUSED') {
      reason = 'Backend server not running or not reachable';
    } else if (errorCode === 'ENOTFOUND' || errorCode === 'EAI_AGAIN') {
      reason = 'DNS resolution failed - IP address may be incorrect';
    } else if (errorCode === 'ETIMEDOUT' || errorMessage?.includes('timeout')) {
      reason = 'Request timeout - backend may be slow or unreachable';
    } else if (statusCode === 404) {
      reason = 'Endpoint not found (404)';
    } else if (statusCode === 500) {
      reason = 'Server error (500) - backend processing failed';
    } else if (statusCode === 403 || errorMessage?.includes('CORS')) {
      reason = 'CORS blocked - backend may not allow this origin';
    } else if (statusCode) {
      reason = `HTTP ${statusCode} error`;
    }

    console.log(`[REASON] ${reason}`);
    console.log(`[RESULT] ❌ FAIL`);

    return {
      testName,
      pass: false,
      statusCode,
      errorCode,
      errorMessage,
      reason,
      responseTime,
    };
  }
}

