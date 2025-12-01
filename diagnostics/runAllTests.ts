/**
 * Master Script: Run All Runtime API Tests
 * Executes all tests sequentially and generates a summary report
 */

import { testLiveProducts } from './runtime-tests/testLiveProducts';
import { testLiveProductById } from './runtime-tests/testLiveProductById';
import { testLiveOrders } from './runtime-tests/testLiveOrders';
import { testLiveRestaurants } from './runtime-tests/testLiveRestaurants';
import { testLiveHealth } from './runtime-tests/testLiveHealth';
import * as fs from 'fs';
import * as path from 'path';

interface TestResult {
  testName: string;
  pass: boolean;
  reason: string;
  statusCode?: number;
  errorCode?: string;
  errorMessage?: string;
  itemCount?: number;
  [key: string]: any;
}

async function runAllTests() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║     RUNTIME API TESTS - MASTER SCRIPT                     ║');
  console.log('║     Testing Backend Connectivity & Data                    ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');

  const results: TestResult[] = [];
  const startTime = Date.now();

  // Test 1: GET /api/products
  console.log('\n[TEST 1/5] Testing GET /api/products...');
  try {
    const result = await testLiveProducts();
    results.push({
      testName: 'GET /api/products',
      ...result
    });
  } catch (err: any) {
    results.push({
      testName: 'GET /api/products',
      pass: false,
      reason: `Test execution error: ${err.message}`,
      errorMessage: err.message
    });
  }

  // Wait 1 second between tests
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Test 2: GET /api/products/:id
  console.log('\n[TEST 2/5] Testing GET /api/products/:id...');
  try {
    const result = await testLiveProductById();
    results.push({
      testName: 'GET /api/products/:id',
      ...result
    });
  } catch (err: any) {
    results.push({
      testName: 'GET /api/products/:id',
      pass: false,
      reason: `Test execution error: ${err.message}`,
      errorMessage: err.message
    });
  }

  await new Promise(resolve => setTimeout(resolve, 1000));

  // Test 3: POST /api/orders
  console.log('\n[TEST 3/5] Testing POST /api/orders...');
  try {
    const result = await testLiveOrders();
    results.push({
      testName: 'POST /api/orders',
      ...result
    });
  } catch (err: any) {
    results.push({
      testName: 'POST /api/orders',
      pass: false,
      reason: `Test execution error: ${err.message}`,
      errorMessage: err.message
    });
  }

  await new Promise(resolve => setTimeout(resolve, 1000));

  // Test 4: GET /api/restaurants
  console.log('\n[TEST 4/5] Testing GET /api/restaurants...');
  try {
    const result = await testLiveRestaurants();
    results.push({
      testName: 'GET /api/restaurants',
      ...result
    });
  } catch (err: any) {
    results.push({
      testName: 'GET /api/restaurants',
      pass: false,
      reason: `Test execution error: ${err.message}`,
      errorMessage: err.message
    });
  }

  await new Promise(resolve => setTimeout(resolve, 1000));

  // Test 5: GET /api/health
  console.log('\n[TEST 5/5] Testing GET /api/health...');
  try {
    const result = await testLiveHealth();
    results.push({
      testName: 'GET /api/health',
      ...result
    });
  } catch (err: any) {
    results.push({
      testName: 'GET /api/health',
      pass: false,
      reason: `Test execution error: ${err.message}`,
      errorMessage: err.message
    });
  }

  // Calculate summary
  const duration = Date.now() - startTime;
  const passed = results.filter(r => r.pass).length;
  const failed = results.filter(r => !r.pass).length;

  // Print summary
  console.log('\n\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                    TEST SUMMARY                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`Total Tests: ${results.length}`);
  console.log(`Passed: ${passed} ✅`);
  console.log(`Failed: ${failed} ❌`);
  console.log(`Duration: ${duration}ms`);
  console.log('');

  // Print detailed results
  console.log('Detailed Results:');
  console.log('─────────────────────────────────────────────────────────────');
  results.forEach((result, index) => {
    const status = result.pass ? '✅ PASS' : '❌ FAIL';
    console.log(`${index + 1}. ${result.testName}: ${status}`);
    console.log(`   Reason: ${result.reason}`);
    if (result.statusCode) {
      console.log(`   Status Code: ${result.statusCode}`);
    }
    if (result.itemCount !== undefined) {
      console.log(`   Items Returned: ${result.itemCount}`);
    }
    if (result.errorCode) {
      console.log(`   Error Code: ${result.errorCode}`);
    }
    console.log('');
  });

  // Generate report file
  const reportPath = path.join(__dirname, 'RUNTIME_API_REPORT.md');
  generateReport(results, reportPath, duration);

  console.log(`\n📄 Full report generated: ${reportPath}`);
  console.log('\n[ALL TESTS COMPLETE]');

  return results;
}

function generateReport(results: TestResult[], filePath: string, duration: number) {
  const passed = results.filter(r => r.pass).length;
  const failed = results.filter(r => !r.pass).length;
  const productsTest = results.find(r => r.testName === 'GET /api/products');
  const productByIdTest = results.find(r => r.testName === 'GET /api/products/:id');
  const ordersTest = results.find(r => r.testName === 'POST /api/orders');
  const restaurantsTest = results.find(r => r.testName === 'GET /api/restaurants');
  const healthTest = results.find(r => r.testName === 'GET /api/health');

  // Determine backend reachability
  const backendReachable = results.some(r => 
    r.pass && r.statusCode && r.statusCode >= 200 && r.statusCode < 300
  );

  // Determine if products endpoint returned data
  const productsReturnedData = productsTest?.pass && 
    (productsTest.itemCount !== undefined && productsTest.itemCount > 0);

  // Determine root cause for empty menu
  let menuEmptyReason = 'Unknown';
  if (!backendReachable) {
    menuEmptyReason = 'Backend server is not reachable at http://192.168.0.101:8080/api';
  } else if (productsTest && !productsTest.pass) {
    menuEmptyReason = `Products endpoint failed: ${productsTest.reason}`;
  } else if (productsTest && productsTest.itemCount === 0) {
    menuEmptyReason = 'Backend returned empty array - database has no products';
  } else if (productsTest && productsTest.pass && productsTest.itemCount! > 0) {
    menuEmptyReason = 'Backend is working correctly - products are available';
  }

  const report = `# Runtime API Test Report

**Report Generated:** ${new Date().toISOString()}  
**Test Duration:** ${duration}ms  
**Total Tests:** ${results.length}  
**Passed:** ${passed} ✅  
**Failed:** ${failed} ❌

---

## Executive Summary

### Backend Reachability

**Status:** ${backendReachable ? '✅ **REACHABLE**' : '❌ **NOT REACHABLE**'}

**Backend URL:** \`http://192.168.0.101:8080/api\`

${backendReachable 
  ? '✅ Backend server is running and responding to requests.' 
  : '❌ Backend server is not reachable. Check if Spring Boot is running on port 8080.'}

---

## Test Results

### 1. GET /api/products

**Status:** ${productsTest?.pass ? '✅ **PASS**' : '❌ **FAIL**'}  
**Status Code:** ${productsTest?.statusCode || 'N/A'}  
**Items Returned:** ${productsTest?.itemCount !== undefined ? productsTest.itemCount : 'N/A'}  
**Reason:** ${productsTest?.reason || 'Test not executed'}

${productsTest?.errorCode ? `**Error Code:** ${productsTest.errorCode}\n` : ''}
${productsTest?.errorMessage ? `**Error Message:** ${productsTest.errorMessage}\n` : ''}

**Analysis:**
${productsTest?.pass 
  ? productsTest.itemCount === 0
    ? '- ✅ Backend is reachable and responding correctly\n- ⚠️ **Database is empty** - no products found\n- ⚠️ This explains why Menu.tsx shows empty array'
    : `- ✅ Backend is reachable and responding correctly\n- ✅ Database has ${productsTest.itemCount} products\n- ✅ Products endpoint is working correctly`
  : `- ❌ Backend is not reachable or endpoint failed\n- ❌ Reason: ${productsTest?.reason || 'Unknown'}\n- ❌ This explains why Menu.tsx shows empty array`}

---

### 2. GET /api/products/:id

**Status:** ${productByIdTest?.pass ? '✅ **PASS**' : '❌ **FAIL**'}  
**Status Code:** ${productByIdTest?.statusCode || 'N/A'}  
**Reason:** ${productByIdTest?.reason || 'Test not executed'}

${productByIdTest?.errorCode ? `**Error Code:** ${productByIdTest.errorCode}\n` : ''}
${productByIdTest?.errorMessage ? `**Error Message:** ${productByIdTest.errorMessage}\n` : ''}

---

### 3. POST /api/orders

**Status:** ${ordersTest?.pass ? '✅ **PASS**' : '❌ **FAIL**'}  
**Status Code:** ${ordersTest?.statusCode || 'N/A'}  
**Reason:** ${ordersTest?.reason || 'Test not executed'}

${ordersTest?.errorCode ? `**Error Code:** ${ordersTest.errorCode}\n` : ''}
${ordersTest?.errorMessage ? `**Error Message:** ${ordersTest.errorMessage}\n` : ''}

---

### 4. GET /api/restaurants

**Status:** ${restaurantsTest?.pass ? '✅ **PASS**' : '❌ **FAIL**'}  
**Status Code:** ${restaurantsTest?.statusCode || 'N/A'}  
**Items Returned:** ${restaurantsTest?.itemCount !== undefined ? restaurantsTest.itemCount : 'N/A'}  
**Reason:** ${restaurantsTest?.reason || 'Test not executed'}

${restaurantsTest?.errorCode ? `**Error Code:** ${restaurantsTest.errorCode}\n` : ''}
${restaurantsTest?.errorMessage ? `**Error Message:** ${restaurantsTest.errorMessage}\n` : ''}

---

### 5. GET /api/health

**Status:** ${healthTest?.pass ? '✅ **PASS**' : '❌ **FAIL**'}  
**Status Code:** ${healthTest?.statusCode || 'N/A'}  
**Reason:** ${healthTest?.reason || 'Test not executed'}

${healthTest?.note ? `**Note:** ${healthTest.note}\n` : ''}
${healthTest?.errorCode ? `**Error Code:** ${healthTest.errorCode}\n` : ''}
${healthTest?.errorMessage ? `**Error Message:** ${healthTest.errorMessage}\n` : ''}

---

## Root Cause Analysis

### Why Menu.tsx Receives Empty Array

**Root Cause:** ${menuEmptyReason}

### Detailed Analysis

${!backendReachable 
  ? `1. **Backend Not Running**
   - Backend server is not reachable at \`http://192.168.0.101:8080/api\`
   - Check if Spring Boot is running: \`cd backend && mvn spring-boot:run\`
   - Verify backend is listening on \`0.0.0.0:8080\` (not just localhost)
   - Check firewall allows port 8080

2. **Network Connectivity**
   - Verify IP address \`192.168.0.101\` is correct for your network
   - Check if backend is accessible from this machine
   - Test in browser: \`http://192.168.0.101:8080/api/products\`

3. **CORS Issues**
   - If backend is running but requests fail, check CORS configuration
   - Verify \`@CrossOrigin\` annotation includes correct origins`
  : productsTest?.itemCount === 0
    ? `1. **Database Empty**
   - Backend is reachable and responding correctly
   - Database has no products (returned empty array)
   - Check \`backend/src/main/resources/data.sql\` has product inserts
   - Verify H2 database is initialized on startup
   - Check backend logs for database initialization errors

2. **Database Not Initialized**
   - Products may not be loaded from \`data.sql\`
   - Verify Spring Boot is configured to run \`data.sql\` on startup
   - Check backend logs for SQL execution errors`
    : `1. **Backend Working Correctly**
   - Backend is reachable and returning ${productsTest?.itemCount || 0} products
   - API endpoints are responding correctly
   - If Menu.tsx still shows empty, check:
     - Frontend BASE_URL resolution
     - Network requests in browser DevTools
     - CORS headers in response
     - Frontend filtering logic`}

---

## Network Error Analysis

${results.some(r => r.errorCode === 'ECONNREFUSED')
  ? `### ECONNREFUSED Detected

**Meaning:** Connection refused - backend server is not running or not listening on the specified port.

**Fix:**
1. Start backend: \`cd backend && mvn spring-boot:run\`
2. Verify backend is listening on \`0.0.0.0:8080\` (not just localhost)
3. Check backend logs for startup errors

`
  : ''}

${results.some(r => r.errorCode === 'ENOTFOUND' || r.errorCode === 'EAI_AGAIN')
  ? `### DNS Resolution Failed

**Meaning:** IP address cannot be resolved or is incorrect.

**Fix:**
1. Verify IP address \`192.168.0.101\` is correct for your network
2. Check network configuration
3. Try accessing backend in browser: \`http://192.168.0.101:8080/api/products\`

`
  : ''}

${results.some(r => r.errorCode === 'ETIMEDOUT' || r.errorMessage?.includes('timeout'))
  ? `### Request Timeout

**Meaning:** Backend is not responding within timeout period (10 seconds).

**Fix:**
1. Check if backend is running but slow
2. Check backend logs for errors
3. Verify network connectivity

`
  : ''}

${results.some(r => r.statusCode === 404)
  ? `### 404 Not Found

**Meaning:** Endpoint does not exist in backend.

**Fix:**
1. Verify backend controller has the endpoint
2. Check request URL is correct
3. Verify Spring Boot is mapping routes correctly

`
  : ''}

${results.some(r => r.statusCode === 500)
  ? `### 500 Server Error

**Meaning:** Backend processing failed.

**Fix:**
1. Check backend logs for detailed error
2. Verify database connection
3. Check backend configuration

`
  : ''}

---

## CORS Analysis

${results.some(r => r.errorMessage?.includes('CORS') || r.reason?.includes('CORS'))
  ? `### CORS Blocking Detected

**Status:** ⚠️ **CORS may be blocking requests**

**Fix:**
1. Check \`@CrossOrigin\` annotation in backend controllers
2. Add mobile browser origin to allowed origins
3. Verify CORS configuration in Spring Boot

`
  : backendReachable
    ? `### CORS Status

**Status:** ✅ **No CORS errors detected**

Backend is responding correctly, indicating CORS is configured properly.

`
    : `### CORS Status

**Status:** ⚠️ **Cannot determine CORS status**

Backend is not reachable, so CORS cannot be tested.

`}

---

## Recommendations

${!backendReachable
  ? `1. **Start Backend Server**
   \`\`\`bash
   cd backend
   mvn spring-boot:run
   \`\`\`

2. **Verify Backend is Listening**
   - Check backend logs for "Started Application"
   - Verify it's listening on \`0.0.0.0:8080\`
   - Test in browser: \`http://192.168.0.101:8080/api/products\`

3. **Check Network Configuration**
   - Verify IP address \`192.168.0.101\` is correct
   - Check firewall allows port 8080
   - Verify backend and frontend are on same network
`
  : productsTest?.itemCount === 0
    ? `1. **Initialize Database**
   - Check \`backend/src/main/resources/data.sql\` has product inserts
   - Verify Spring Boot is configured to run \`data.sql\` on startup
   - Check backend logs for SQL execution

2. **Verify Database Connection**
   - Check H2 database is initialized
   - Verify database schema is created
   - Check backend logs for database errors

3. **Add Products Manually (if needed)**
   - Use backend admin interface
   - Or insert products via SQL
`
    : `1. **Backend is Working Correctly** ✅
   - Backend is reachable and returning data
   - If Menu.tsx still shows empty, check frontend code

2. **Verify Frontend BASE_URL**
   - Check \`frontend-mobile/src/api/getBackendUrl.ts\`
   - Verify it resolves to \`http://192.168.0.101:8080/api\`
   - Check browser DevTools Network tab

3. **Check Frontend Filtering**
   - Verify Menu.tsx is not filtering out all products
   - Check restaurant filter logic
   - Verify API response is being processed correctly
`}

---

## Test Execution Details

**Test Files:**
- \`diagnostics/runtime-tests/testLiveProducts.ts\`
- \`diagnostics/runtime-tests/testLiveProductById.ts\`
- \`diagnostics/runtime-tests/testLiveOrders.ts\`
- \`diagnostics/runtime-tests/testLiveRestaurants.ts\`
- \`diagnostics/runtime-tests/testLiveHealth.ts\`

**Master Script:** \`diagnostics/runAllTests.ts\`

**BASE_URL Resolution:** Uses \`getBackendUrl()\` from \`frontend-mobile/src/api/getBackendUrl.ts\`

---

**Report End**
`;

  fs.writeFileSync(filePath, report, 'utf-8');
}

// Run tests if executed directly
if (require.main === module) {
  runAllTests()
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      console.error('\n[FATAL ERROR]', err);
      process.exit(1);
    });
}

export { runAllTests };

