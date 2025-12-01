# Runtime API Tests

This folder contains live API test files that make actual HTTP requests to the backend to verify connectivity and data availability.

## Test Files

1. **testLiveProducts.ts** - Tests `GET /api/products`
2. **testLiveProductById.ts** - Tests `GET /api/products/:id`
3. **testLiveOrders.ts** - Tests `POST /api/orders`
4. **testLiveRestaurants.ts** - Tests `GET /api/restaurants`
5. **testLiveHealth.ts** - Tests `GET /api/health`

## Running Tests

### Option 1: Run All Tests (Recommended)

```bash
# From project root
npx ts-node diagnostics/runAllTests.ts
```

This will:
- Execute all 5 tests sequentially
- Print detailed results to console
- Generate `diagnostics/RUNTIME_API_REPORT.md` with full analysis

### Option 2: Run Individual Tests

```bash
# Test products endpoint
npx ts-node diagnostics/runtime-tests/testLiveProducts.ts

# Test product by ID
npx ts-node diagnostics/runtime-tests/testLiveProductById.ts

# Test orders endpoint
npx ts-node diagnostics/runtime-tests/testLiveOrders.ts

# Test restaurants endpoint
npx ts-node diagnostics/runtime-tests/testLiveRestaurants.ts

# Test health endpoint
npx ts-node diagnostics/runtime-tests/testLiveHealth.ts
```

## Prerequisites

1. **Backend must be running:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **TypeScript and dependencies:**
   ```bash
   npm install -g ts-node typescript
   ```

3. **Backend should be accessible at:**
   - `http://192.168.0.101:8080/api` (or your configured IP)

## What Each Test Does

### testLiveProducts.ts
- Resolves BASE_URL using `getBackendUrl()` (same as mobile app)
- Calls `GET /api/products`
- Validates response is an array
- Reports item count
- Identifies if database is empty

### testLiveProductById.ts
- First fetches products list to get a test ID
- Calls `GET /api/products/:id`
- Validates single product response

### testLiveOrders.ts
- Fetches a product to use in order
- Creates a test order via `POST /api/orders`
- Validates order creation response

### testLiveRestaurants.ts
- Calls `GET /api/restaurants`
- Validates response is an array
- Reports restaurant count

### testLiveHealth.ts
- Calls `GET /api/health`
- Handles 404 gracefully (endpoint may not exist)
- Reports health status if available

## Output

Each test prints:
- ✅ **PASS** if API returned valid JSON
- ❌ **FAIL** if network, DNS, timeout, or 404 occurred
- Root cause analysis (backend down? IP wrong? No products? CORS?)

## Generated Report

After running all tests, `diagnostics/RUNTIME_API_REPORT.md` will contain:
- All test results (PASS/FAIL)
- Whether backend is reachable at `http://192.168.0.101:8080/api`
- Whether `/products` returned an array
- Whether DB returned products or empty array
- Whether CORS blocked the request
- Whether axios received ECONNREFUSED or timeout
- The exact reason why Menu.tsx receives an empty array

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
- Update IP in `frontend-mobile/src/api/getBackendUrl.ts` if needed

### Empty array returned
- Database has no products
- Check `backend/src/main/resources/data.sql` has product inserts
- Verify H2 database is initialized on startup

