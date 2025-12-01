/**
 * Master Test Runner
 * Executes all runtime API tests sequentially and generates a comprehensive report
 */

import { testProducts, TestResult as ProductsResult } from './testProducts';
import { testProductById, TestResult as ProductByIdResult } from './testProductById';
import { testCategories, TestResult as CategoriesResult } from './testCategories';
import { testOrders, TestResult as OrdersResult } from './testOrders';
import { testHealth, TestResult as HealthResult } from './testHealth';
import * as fs from 'fs';
import * as path from 'path';

type TestResult = ProductsResult | ProductByIdResult | CategoriesResult | OrdersResult | HealthResult;

const BASE_URL = "http://192.168.0.101:8080/api";

async function runAllTests() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║          Frontend-Web Runtime API Test Suite              ║');
  console.log('║          Testing Backend Connectivity & Data              ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`\n[CONFIG] Base URL: ${BASE_URL}`);
  console.log(`[TIME] Started: ${new Date().toISOString()}\n`);

  const results: TestResult[] = [];
  const startTime = Date.now();

  // Test 1: GET /api/products
  try {
    const result = await testProducts();
    results.push(result);
  } catch (err: any) {
    results.push({
      testName: 'GET /api/products',
      pass: false,
      reason: `Test execution error: ${err.message}`,
      errorMessage: err.message,
    });
  }

  // Wait 1 second between tests
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Test 2: GET /api/products/:id
  try {
    const result = await testProductById();
    results.push(result);
  } catch (err: any) {
    results.push({
      testName: 'GET /api/products/:id',
      pass: false,
      reason: `Test execution error: ${err.message}`,
      errorMessage: err.message,
    });
  }

  await new Promise(resolve => setTimeout(resolve, 1000));

  // Test 3: GET /api/categories
  try {
    const result = await testCategories();
    results.push(result);
  } catch (err: any) {
    results.push({
      testName: 'GET /api/categories',
      pass: false,
      reason: `Test execution error: ${err.message}`,
      errorMessage: err.message,
    });
  }

  await new Promise(resolve => setTimeout(resolve, 1000));

  // Test 4: POST /api/orders
  try {
    const result = await testOrders();
    results.push(result);
  } catch (err: any) {
    results.push({
      testName: 'POST /api/orders',
      pass: false,
      reason: `Test execution error: ${err.message}`,
      errorMessage: err.message,
    });
  }

  await new Promise(resolve => setTimeout(resolve, 1000));

  // Test 5: GET /api/health
  try {
    const result = await testHealth();
    results.push(result);
  } catch (err: any) {
    results.push({
      testName: 'GET /api/health',
      pass: false,
      reason: `Test execution error: ${err.message}`,
      errorMessage: err.message,
    });
  }

  // Calculate summary
  const duration = Date.now() - startTime;
  const passed = results.filter(r => r.pass).length;
  const failed = results.filter(r => !r.pass).length;

  // Print summary table
  console.log('\n\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                    TEST SUMMARY                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('┌────────────────────────────────────────────────────────────┐');
  console.log('│ Test Name                    │ Status │ Status Code │ Time │');
  console.log('├────────────────────────────────────────────────────────────┤');
  
  results.forEach((result) => {
    const status = result.pass ? '✅ PASS' : '❌ FAIL';
    const statusCode = result.statusCode ? result.statusCode.toString() : 'N/A';
    const responseTime = result.responseTime ? `${result.responseTime}ms` : 'N/A';
    const testName = result.testName.padEnd(28);
    const statusPadded = status.padEnd(7);
    const statusCodePadded = statusCode.padEnd(12);
    
    console.log(`│ ${testName} │ ${statusPadded} │ ${statusCodePadded} │ ${responseTime.padEnd(4)} │`);
  });
  
  console.log('└────────────────────────────────────────────────────────────┘');
  console.log('');
  console.log(`Total Tests: ${results.length}`);
  console.log(`Passed: ${passed} ✅`);
  console.log(`Failed: ${failed} ❌`);
  console.log(`Duration: ${duration}ms`);
  console.log('');

  // Generate report file
  const reportPath = path.join(__dirname, 'RUNTIME_API_REPORT.md');
  generateReport(results, reportPath, duration);

  console.log(`📄 Full report generated: ${reportPath}`);
  console.log(`\n[COMPLETE] All tests finished at ${new Date().toISOString()}\n`);

  return results;
}

function generateReport(results: TestResult[], filePath: string, duration: number) {
  const passed = results.filter(r => r.pass).length;
  const failed = results.filter(r => !r.pass).length;
  const productsTest = results.find(r => r.testName === 'GET /api/products') as ProductsResult;
  const productByIdTest = results.find(r => r.testName === 'GET /api/products/:id');
  const categoriesTest = results.find(r => r.testName === 'GET /api/categories');
  const ordersTest = results.find(r => r.testName === 'POST /api/orders');
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
    menuEmptyReason = `Backend server is not reachable at ${BASE_URL}`;
  } else if (productsTest && !productsTest.pass) {
    menuEmptyReason = `Products endpoint failed: ${productsTest.reason}`;
  } else if (productsTest && productsTest.itemCount === 0) {
    menuEmptyReason = 'Backend returned empty array - database has no products';
  } else if (productsTest && productsTest.pass && productsTest.itemCount! > 0) {
    menuEmptyReason = 'Backend is working correctly - products are available';
  }

  const report = `# Frontend-Web Runtime API Test Report

**Report Generated:** ${new Date().toISOString()}  
**Test Duration:** ${duration}ms  
**Base URL:** \`${BASE_URL}\`  
**Total Tests:** ${results.length}  
**Passed:** ${passed} ✅  
**Failed:** ${failed} ❌

---

## Executive Summary

### Backend Reachability

**Status:** ${backendReachable ? '✅ **REACHABLE**' : '❌ **NOT REACHABLE**'}

**Backend URL:** \`${BASE_URL}\`

${backendReachable 
  ? '✅ Backend server is running and responding to requests.' 
  : '❌ Backend server is not reachable. Check if Spring Boot is running on port 8080.'}

---

## Test Results

### 1. GET /api/products

**Status:** ${productsTest?.pass ? '✅ **PASS**' : '❌ **FAIL**'}  
**Status Code:** ${productsTest?.statusCode || 'N/A'}  
**Items Returned:** ${productsTest?.itemCount !== undefined ? productsTest.itemCount : 'N/A'}  
**Response Time:** ${productsTest?.responseTime ? `${productsTest.responseTime}ms` : 'N/A'}  
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
**Response Time:** ${productByIdTest?.responseTime ? `${productByIdTest.responseTime}ms` : 'N/A'}  
**Reason:** ${productByIdTest?.reason || 'Test not executed'}

${productByIdTest?.errorCode ? `**Error Code:** ${productByIdTest.errorCode}\n` : ''}
${productByIdTest?.errorMessage ? `**Error Message:** ${productByIdTest.errorMessage}\n` : ''}

---

### 3. GET /api/categories

**Status:** ${categoriesTest?.pass ? '✅ **PASS**' : '❌ **FAIL**'}  
**Status Code:** ${categoriesTest?.statusCode || 'N/A'}  
**Response Time:** ${categoriesTest?.responseTime ? `${categoriesTest.responseTime}ms` : 'N/A'}  
**Reason:** ${categoriesTest?.reason || 'Test not executed'}

${categoriesTest?.note ? `**Note:** ${categoriesTest.note}\n` : ''}
${categoriesTest?.errorCode ? `**Error Code:** ${categoriesTest.errorCode}\n` : ''}
${categoriesTest?.errorMessage ? `**Error Message:** ${categoriesTest.errorMessage}\n` : ''}

---

### 4. POST /api/orders

**Status:** ${ordersTest?.pass ? '✅ **PASS**' : '❌ **FAIL**'}  
**Status Code:** ${ordersTest?.statusCode || 'N/A'}  
**Response Time:** ${ordersTest?.responseTime ? `${ordersTest.responseTime}ms` : 'N/A'}  
**Reason:** ${ordersTest?.reason || 'Test not executed'}

${ordersTest?.orderId ? `**Order ID:** ${ordersTest.orderId}\n` : ''}
${ordersTest?.errorCode ? `**Error Code:** ${ordersTest.errorCode}\n` : ''}
${ordersTest?.errorMessage ? `**Error Message:** ${ordersTest.errorMessage}\n` : ''}

---

### 5. GET /api/health

**Status:** ${healthTest?.pass ? '✅ **PASS**' : '❌ **FAIL**'}  
**Status Code:** ${healthTest?.statusCode || 'N/A'}  
**Response Time:** ${healthTest?.responseTime ? `${healthTest.responseTime}ms` : 'N/A'}  
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
   - Backend server is not reachable at \`${BASE_URL}\`
   - Check if Spring Boot is running: \`cd backend && mvn spring-boot:run\`
   - Verify backend is listening on \`0.0.0.0:8080\` (not just localhost)
   - Check firewall allows port 8080

2. **Network Connectivity**
   - Verify IP address \`192.168.0.101\` is correct for your network
   - Check if backend is accessible from this machine
   - Test in browser: \`${BASE_URL}/products\`

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
3. Try accessing backend in browser: \`${BASE_URL}/products\`

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
   - Test in browser: \`${BASE_URL}/products\`

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
   - Check \`frontend-web/src/config/axios.ts\`
   - Verify it resolves to \`${BASE_URL}\`
   - Check browser DevTools Network tab

3. **Check Frontend Filtering**
   - Verify Menu.tsx is not filtering out all products
   - Check restaurant filter logic
   - Verify API response is being processed correctly
`}

---

## Test Execution Details

**Test Files:**
- \`frontend-web/diagnostics/testProducts.ts\`
- \`frontend-web/diagnostics/testProductById.ts\`
- \`frontend-web/diagnostics/testCategories.ts\`
- \`frontend-web/diagnostics/testOrders.ts\`
- \`frontend-web/diagnostics/testHealth.ts\`

**Master Script:** \`frontend-web/diagnostics/runAllTests.ts\`

**BASE_URL:** \`${BASE_URL}\` (hardcoded)

**Run Command:**
\`\`\`bash
npx ts-node frontend-web/diagnostics/runAllTests.ts
\`\`\`

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

