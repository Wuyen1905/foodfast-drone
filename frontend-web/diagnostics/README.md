# Frontend-Web Runtime API Diagnostics

Complete test system for runtime API testing of the frontend-web project.

## Overview

This diagnostics system tests live API calls to verify backend connectivity and data availability. All tests use a common axios instance and hardcoded BASE_URL for consistency.

## Test Files

1. **testProducts.ts** - Tests `GET /api/products`
2. **testProductById.ts** - Tests `GET /api/products/:id`
3. **testCategories.ts** - Tests `GET /api/categories` (expected 404)
4. **testOrders.ts** - Tests `POST /api/orders`
5. **testHealth.ts** - Tests `GET /api/health`

## Quick Start

### Prerequisites

1. **Backend must be running:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **TypeScript runtime:**
   ```bash
   npm install -g ts-node typescript
   ```

### Run All Tests

```bash
# From project root
npx ts-node frontend-web/diagnostics/runAllTests.ts
```

This will:
- Execute all 5 tests sequentially
- Print detailed results to console
- Generate `frontend-web/diagnostics/RUNTIME_API_REPORT.md` with full analysis

## Configuration

**BASE_URL:** `http://192.168.0.101:8080/api` (hardcoded in each test file)

To change the BASE_URL, update the constant in each test file:
- `testProducts.ts`
- `testProductById.ts`
- `testCategories.ts`
- `testOrders.ts`
- `testHealth.ts`

## Test Output

Each test prints:
- ✅ **PASS** if API returned valid JSON
- ❌ **FAIL** if network, DNS, timeout, or error occurred
- Detailed error information (error code, message, status)
- Root cause analysis

### Example Output

```
[TEST] GET /api/products
[URL] http://192.168.0.101:8080/api/products
[STATUS] 200 OK
[TIME] 245ms
[RESPONSE] Type: object, Is Array: true
[ITEMS] 12 products returned
[SAMPLE] First product: Burger Deluxe
[RESULT] ✅ PASS
```

## Generated Report

After running tests, `RUNTIME_API_REPORT.md` will contain:

- ✅ **Test Results Summary** - Pass/Fail for all 5 API tests
- 🌐 **Backend Reachability** - Whether backend is accessible
- 📊 **Products Endpoint Analysis** - Whether `/products` returned an array
- 💾 **Database Status** - Whether DB returned products or empty array
- 🔒 **CORS Analysis** - Whether CORS blocked requests
- ⚠️ **Error Analysis** - Network errors, timeouts, etc.
- 🔍 **Root Cause** - Exact reason why Menu.tsx receives empty array

## Test Details

### testProducts.ts
- Calls `GET /api/products`
- Validates response is an array
- Reports item count
- Identifies if database is empty

### testProductById.ts
- First fetches products list to get a test ID
- Calls `GET /api/products/:id`
- Validates single product response

### testCategories.ts
- Calls `GET /api/categories`
- Expects 404 (endpoint doesn't exist)
- Documents that categories are extracted from products

### testOrders.ts
- Fetches a product to use in order
- Creates a test order via `POST /api/orders`
- Validates order creation response

### testHealth.ts
- Calls `GET /api/health`
- Handles 404 gracefully (endpoint may not exist)
- Reports health status if available

## Troubleshooting

### "Cannot find module" errors
- Ensure you're running from project root
- Install dependencies: `npm install`
- Install ts-node: `npm install -g ts-node typescript`

### "ECONNREFUSED" errors
- Backend is not running - start it with `mvn spring-boot:run`
- Backend is not listening on correct IP/port
- Firewall is blocking port 8080

### "ENOTFOUND" errors
- IP address `192.168.0.101` is incorrect for your network
- Check your network IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
- Update BASE_URL in test files if needed

### Empty array returned
- Database has no products
- Check `backend/src/main/resources/data.sql` has product inserts
- Verify H2 database is initialized on startup

## File Structure

```
frontend-web/diagnostics/
├── README.md                 # This file
├── runAllTests.ts           # Master test runner
├── testProducts.ts          # Products endpoint test
├── testProductById.ts       # Product by ID test
├── testCategories.ts        # Categories endpoint test
├── testOrders.ts            # Orders endpoint test
├── testHealth.ts            # Health endpoint test
└── RUNTIME_API_REPORT.md    # Generated report (after running tests)
```

## Notes

- All tests use a **common axios instance** for consistency
- BASE_URL is **hardcoded** to `http://192.168.0.101:8080/api`
- Tests return **structured results** to the master runner
- No UI or app logic is modified - only diagnostic files
- Tests are **production-safe** and can be run anytime

---

**Run the tests to verify backend connectivity and diagnose menu loading issues!**

