/**
 * Runtime Test: GET /api/health
 * Tests live API call to health check endpoint
 */

import axios from 'axios';

const BASE_URL = "http://192.168.0.101:8080/api";

// Common axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
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
  healthData?: any;
  note?: string;
}

export async function testHealth(): Promise<TestResult> {
  const testName = 'GET /api/health';
  const startTime = Date.now();

  try {
    console.log(`\n[TEST] ${testName}`);
    console.log(`[URL] ${BASE_URL}/health`);
    console.log(`[NOTE] Health endpoint is optional - 404 is acceptable`);

    const response = await apiClient.get('/health');
    const responseTime = Date.now() - startTime;

    console.log(`[STATUS] ${response.status} ${response.statusText}`);
    console.log(`[TIME] ${responseTime}ms`);

    if (response.status === 200) {
      console.log(`[HEALTH_DATA]`, JSON.stringify(response.data, null, 2));
      console.log(`[RESULT] ✅ PASS`);
      return {
        testName,
        pass: true,
        statusCode: 200,
        reason: 'Health endpoint is available and responding',
        responseTime,
        healthData: response.data,
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

    // 404 is acceptable for health endpoint (it's optional)
    if (statusCode === 404) {
      console.log(`[STATUS] ${statusCode} Not Found`);
      console.log(`[NOTE] Health endpoint does not exist - this is acceptable`);
      console.log(`[RESULT] ✅ PASS (Expected 404)`);
      return {
        testName,
        pass: true,
        statusCode: 404,
        reason: 'Health endpoint not found (404) - this is acceptable',
        responseTime,
        note: 'Health endpoint is optional and may not exist in all backends',
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

