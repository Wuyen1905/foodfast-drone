/**
 * Runtime Test: GET /api/categories
 * Tests live API call to categories endpoint (expected 404)
 * Note: Categories endpoint does not exist - categories are extracted from products
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
  responseTime?: number;
  note?: string;
}

export async function testCategories(): Promise<TestResult> {
  const testName = 'GET /api/categories';
  const startTime = Date.now();

  try {
    console.log(`\n[TEST] ${testName}`);
    console.log(`[URL] ${BASE_URL}/categories`);
    console.log(`[NOTE] This endpoint is expected to return 404 (does not exist)`);

    const response = await apiClient.get('/categories');
    const responseTime = Date.now() - startTime;

    console.log(`[STATUS] ${response.status} ${response.statusText}`);
    console.log(`[TIME] ${responseTime}ms`);

    // If endpoint exists, report it
    if (response.status === 200) {
      console.log(`[INFO] Endpoint exists and returned data`);
      console.log(`[RESULT] ✅ PASS`);
      return {
        testName,
        pass: true,
        statusCode: 200,
        reason: 'Categories endpoint exists and returned data',
        responseTime,
        note: 'Endpoint exists (unexpected - categories are usually extracted from products)',
      };
    } else {
      console.log(`[RESULT] ⚠️ UNEXPECTED`);
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

    // 404 is expected for this endpoint
    if (statusCode === 404) {
      console.log(`[STATUS] ${statusCode} Not Found`);
      console.log(`[NOTE] This is expected - categories endpoint does not exist`);
      console.log(`[INFO] Categories are extracted from products on the frontend`);
      console.log(`[RESULT] ✅ PASS (Expected 404)`);
      return {
        testName,
        pass: true,
        statusCode: 404,
        reason: 'Endpoint not found (404) - this is expected behavior',
        responseTime,
        note: 'Categories are extracted from products: Array.from(new Set(products.map(p => p.category)))',
      };
    }

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
    } else if (statusCode === 500) {
      reason = 'Server error (500) - backend processing failed';
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

