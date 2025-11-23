# FoodFast Safe Cleanup Action Plan

## STEP 1: IDENTIFIED ITEMS

### Mock Data Files (SAFE TO DELETE)
1. `src/data/products.ts` - Hardcoded product array
2. `web/src/data/products.ts` - Hardcoded product array (duplicate)
3. `frontend-web/src/data/products.ts` - Hardcoded product array (duplicate)

**Note:** `adminData.ts` files are NOT mock data - they are API helpers using backend.

### Duplicate Frontend Directories
- **KEEP:** `frontend-web/` (most complete, recently updated)
- **DELETE:** `src/` (root level, appears to be old leftover)
- **DELETE:** `web/` (older version, less complete)
- **DELETE:** `frontend-web/web/` (nested duplicate, clearly a mistake)

### Duplicate Mobile Directories
- **KEEP:** `frontend-mobile/` (most complete structure)
- **DELETE:** `mobile/` (older version)
- **DELETE:** `mobile-app/` (different structure, likely unused)

### Legacy Comments (UPDATE, NOT DELETE)
- `web/src/services/orderApiService.ts` - Comments reference "db.json format"
- `web/src/pages/Checkout.tsx` - Comments reference "db.json format"

---

## STEP 2: CLEANUP PLAN

### Category A: SAFE TO DELETE (Mock Data)
✅ All `data/products.ts` files (3 files)
- These are hardcoded arrays, replaced by backend API

### Category B: SAFE TO DELETE (Duplicate Directories)
✅ `src/` directory (entire root-level frontend)
✅ `web/` directory (duplicate frontend)
✅ `frontend-web/web/` directory (nested duplicate)
✅ `mobile/` directory (duplicate mobile)
✅ `mobile-app/` directory (duplicate mobile)

### Category C: UPDATE COMMENTS (Not Delete)
⚠️ Update comments in:
- `web/src/services/orderApiService.ts` (if web/ is kept, but we're deleting it)
- `web/src/pages/Checkout.tsx` (if web/ is kept, but we're deleting it)

**Note:** Since we're deleting `web/`, these comment updates are not needed.

### Category D: KEEP (Active Directories)
✅ `frontend-web/` - Active frontend
✅ `frontend-mobile/` - Active mobile (if used)
✅ `backend/` - Backend code

---

## STEP 3: GIT COMMANDS

### Remove Mock Data Files
```bash
git rm --cached src/data/products.ts
git rm --cached web/src/data/products.ts
git rm --cached frontend-web/src/data/products.ts
```

### Remove Duplicate Directories
```bash
# Remove root-level src/ directory
git rm -r --cached src/

# Remove web/ directory
git rm -r --cached web/

# Remove nested frontend-web/web/ directory
git rm -r --cached frontend-web/web/

# Remove duplicate mobile directories
git rm -r --cached mobile/
git rm -r --cached mobile-app/
```

---

## STEP 4: .gitignore UPDATE

Add these rules to prevent mock data revival:
```
# Mock data directories
/src/data/
/web/src/data/
/frontend-web/src/data/
/mobile/src/data/
/mobile-app/src/data/
/frontend-mobile/src/data/
```

---

## STEP 5: VERIFICATION

After cleanup, verify:
- ✅ `frontend-web/` still has all necessary files
- ✅ No broken imports (products should come from API)
- ✅ Backend API endpoints are working
- ✅ No references to deleted directories in scripts

---

## RISK ASSESSMENT

**LOW RISK:**
- Deleting `data/products.ts` files (replaced by API)
- Deleting `src/` directory (old leftover)
- Deleting `web/` directory (duplicate)
- Deleting `mobile/` and `mobile-app/` (duplicates)

**NO RISK:**
- Updating .gitignore (preventive measure)

**REVERSIBLE:**
- All deletions use `git rm --cached` (files remain in git history)
- Can be restored with `git checkout <commit> -- <path>`

