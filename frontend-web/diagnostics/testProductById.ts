/**
 * Runtime Test: GET /api/products/:id
 * Tests live API call to fetch a single product by ID
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
  productId?: string;
  productData?: any;
}

export async function testProductById(): Promise<TestResult> {
  const testName = 'GET /api/products/:id';
  const startTime = Date.now();

  try {
    console.log(`\n[TEST] ${testName}`);

    // First, get a product ID from the products list
    console.log(`[STEP 1] Fetching products list to get a test ID...`);
    const productsResponse = await apiClient.get('/products', { timeout: 5000 });
    const products = productsResponse.data;

    if (!Array.isArray(products) || products.length === 0) {
      console.log(`[ERROR] No products available to test with`);
      console.log(`[RESULT] ❌ FAIL`);
      return {
        testName,
        pass: false,
        reason: 'No products in database to test product/:id endpoint',
        responseTime: Date.now() - startTime,
      };
    }

    const testProductId = products[0].id;
    console.log(`[PRODUCT_ID] ${testProductId}`);
    console.log(`[URL] ${BASE_URL}/products/${testProductId}`);

    // Now test the product/:id endpoint
    const response = await apiClient.get(`/products/${testProductId}`);
    const responseTime = Date.now() - startTime;

    console.log(`[STATUS] ${response.status} ${response.statusText}`);
    console.log(`[TIME] ${responseTime}ms`);

    if (response.status === 200) {
      const product = response.data;
      if (product && product.id) {
        console.log(`[PRODUCT] ${product.name || product.id}`);
        console.log(`[RESULT] ✅ PASS`);
        return {
          testName,
          pass: true,
          statusCode: 200,
          reason: `Successfully retrieved product: ${product.name || product.id}`,
          responseTime,
          productId: testProductId,
          productData: product,
        };
      } else {
        console.log(`[ERROR] Response missing product data`);
        console.log(`[RESULT] ❌ FAIL`);
        return {
          testName,
          pass: false,
          statusCode: 200,
          reason: 'Invalid product data in response',
          responseTime,
          productId: testProductId,
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
      reason = 'Product not found (404) - product ID may not exist';
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

