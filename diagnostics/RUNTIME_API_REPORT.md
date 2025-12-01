# Runtime API Test Report

> **Note:** This report will be automatically generated when you run the test suite.
> 
> To generate this report, run:
> ```bash
> npx ts-node diagnostics/runAllTests.ts
> ```

---

## Report Status

**Status:** ⏳ **Pending Test Execution**

This report will be populated after running the runtime API tests.

---

## How to Generate Report

1. **Start the backend server:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **Run the test suite:**
   ```bash
   npx ts-node diagnostics/runAllTests.ts
   ```

3. **View the generated report:**
   - This file will be automatically updated with test results
   - Check `diagnostics/RUNTIME_API_REPORT.md` for full analysis

---

## What the Report Will Contain

After running tests, this report will include:

- ✅ **Test Results Summary** - Pass/Fail for all 5 API tests
- 🌐 **Backend Reachability** - Whether backend is accessible at `http://192.168.0.101:8080/api`
- 📊 **Products Endpoint Analysis** - Whether `/products` returned an array
- 💾 **Database Status** - Whether DB returned products or empty array
- 🔒 **CORS Analysis** - Whether CORS blocked the request
- ⚠️ **Error Analysis** - Whether axios received ECONNREFUSED or timeout
- 🔍 **Root Cause** - The exact reason why Menu.tsx receives an empty array

---

**Run the tests to generate the full report!**

