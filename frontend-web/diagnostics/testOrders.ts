/**
 * Runtime Test: POST /api/orders
 * Tests live API call to create a new order
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
  orderId?: string;
  orderData?: any;
}

export async function testOrders(): Promise<TestResult> {
  const testName = 'POST /api/orders';
  const startTime = Date.now();

  try {
    console.log(`\n[TEST] ${testName}`);

    // First, get a product to use in the order
    console.log(`[STEP 1] Fetching products list to create test order...`);
    const productsResponse = await apiClient.get('/products', { timeout: 5000 });
    const products = productsResponse.data;

    if (!Array.isArray(products) || products.length === 0) {
      console.log(`[ERROR] No products available to create order with`);
      console.log(`[RESULT] ❌ FAIL`);
      return {
        testName,
        pass: false,
        reason: 'No products in database to create order',
        responseTime: Date.now() - startTime,
      };
    }

    const testProduct = products[0];
    console.log(`[PRODUCT] Using: ${testProduct.name || testProduct.id}`);

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
          price: testProduct.price,
        },
      ],
      paymentMethod: "cod",
    };

    console.log(`[URL] ${BASE_URL}/orders`);
    console.log(`[PAYLOAD] Customer: ${orderPayload.customerName}, Items: ${orderPayload.items.length}`);

    // Make API call
    const response = await apiClient.post('/orders', orderPayload);
    const responseTime = Date.now() - startTime;

    console.log(`[STATUS] ${response.status} ${response.statusText}`);
    console.log(`[TIME] ${responseTime}ms`);

    if (response.status === 201 || response.status === 200) {
      const order = response.data;
      const orderId = order.id || order.orderId;

      if (orderId) {
        console.log(`[ORDER_ID] ${orderId}`);
        console.log(`[RESULT] ✅ PASS`);
        return {
          testName,
          pass: true,
          statusCode: response.status,
          reason: `Successfully created order: ${orderId}`,
          responseTime,
          orderId,
          orderData: order,
        };
      } else {
        console.log(`[ERROR] Response missing order ID`);
        console.log(`[RESULT] ❌ FAIL`);
        return {
          testName,
          pass: false,
          statusCode: response.status,
          reason: 'Invalid order response - missing order ID',
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
    const errorData = error.response?.data;

    console.log(`[ERROR] ${errorMessage || 'Unknown error'}`);
    if (errorCode) console.log(`[ERROR_CODE] ${errorCode}`);
    if (statusCode) console.log(`[STATUS] ${statusCode}`);
    if (errorData) console.log(`[ERROR_DATA]`, JSON.stringify(errorData, null, 2));

    let reason = 'Unknown error';
    if (errorCode === 'ECONNREFUSED') {
      reason = 'Backend server not running or not reachable';
    } else if (errorCode === 'ENOTFOUND' || errorCode === 'EAI_AGAIN') {
      reason = 'DNS resolution failed - IP address may be incorrect';
    } else if (errorCode === 'ETIMEDOUT' || errorMessage?.includes('timeout')) {
      reason = 'Request timeout - backend may be slow or unreachable';
    } else if (statusCode === 400) {
      reason = 'Bad request (400) - order payload may be invalid';
    } else if (statusCode === 404) {
      reason = 'Endpoint not found (404) - orders endpoint may not exist';
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

