# BÁO CÁO XÁC ĐỊNH FILE CHECKOUT ĐANG CHẠY

## 📋 TÓM TẮT

**Application Start Command:** `cd web && npm run dev`  
**Route Path:** `/checkout`  
**Status:** ✅ File đã được xác định chính xác

---

## 1️⃣ ROUTE CONFIGURATION FILE

**File:** `web/src/pages/App.tsx`  
**Path (Absolute):** `d:\FoodFast\web\src\pages\App.tsx`

**Route Configuration:**
```tsx
// Line 9: Import statement
import Checkout from './Checkout';

// Lines 78-82: Route definition
<Route path="/checkout" element={
  <RoleGuardedRoute allowedRoles={['customer']}>
    <Checkout />
  </RoleGuardedRoute>
} />
```

**Kết luận:** Route `/checkout` map đến component `<Checkout />` được import từ `./Checkout`

---

## 2️⃣ CHECKOUT COMPONENT FILE - ĐÂY LÀ FILE ĐANG CHẠY

**File:** `web/src/pages/Checkout.tsx`  
**Absolute Path:** `d:\FoodFast\web\src\pages\Checkout.tsx`

**Xác nhận:**
- ✅ File này được import trong `App.tsx` (line 9)
- ✅ File này được render khi user truy cập `/checkout`
- ✅ File này chứa đúng text "Thông tin thanh toán" (line 590)
- ✅ File này chứa đúng text "Thông tin khách hàng" (line 595)

---

## 3️⃣ KIỂM TRA WARD FIELD

### ❌ WARD FIELD KHÔNG TỒN TẠI

**Form State (Lines 241-250):**
```tsx
const [form, setForm] = useState<CheckoutFormData>({
  name: user?.name || "",
  phone: user?.phone || "",
  email: "",
  street: "",        // ✅ Có
  district: "",      // ✅ Có
  city: "",          // ✅ Có
  note: "",
  payment: "cod",
});
// ❌ KHÔNG CÓ: ward
```

**Address Concatenation:**
- Line 355: `address: \`${form.street}, ${form.district}, ${form.city}\``
- Line 383: `address: \`${form.street}, ${form.district}, ${form.city}\``
- Line 473: `address: \`${form.street}, ${form.district}, ${form.city}\``

**Format hiện tại:** `street, district, city` ❌ **THIẾU WARD**

**Validation Schema (`web/src/schemas/checkoutSchema.ts`):**
- ❌ KHÔNG CÓ ward field trong schema
- Chỉ có: name, email, phone, street, district, city, note, payment

**UI Fields Order:**
- Line 665-685: **Địa chỉ đường/phố** (Street) ✅
- Line 687-707: **Quận/huyện** (District) ✅
- Line 709-729: **Thành phố/tỉnh** (City) ✅
- ❌ **KHÔNG CÓ: Phường/Xã (Ward)**

---

## 4️⃣ VỊ TRÍ CẦN CHÈN WARD FIELD

**Yêu cầu:** Ward field phải xuất hiện **GIỮA District và City**

**Vị trí chính xác:**
- **Sau:** FormGroup District (kết thúc ở line 707)
- **Trước:** FormGroup City (bắt đầu ở line 709)
- **Insert tại:** Sau line 707, trước line 709

**Code Structure cần thêm:**

```tsx
// Sau line 707 (sau FormGroup District)

            <FormGroup>
              <Label>Phường/Xã *</Label>
              <Select 
                name="ward" 
                value={form.ward} 
                onChange={handleChange}
                $hasError={!!errors.ward}
              >
                <option value="">-- Chọn Phường/Xã --</option>
                <option value="Phường Chợ Quán">Phường Chợ Quán</option>
                <option value="Phường An Đông">Phường An Đông</option>
                <option value="Phường Chợ Lớn">Phường Chợ Lớn</option>
              </Select>
              <AnimatePresence>
                {errors.ward && (
                  <ErrorMessage
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {errors.ward}
                  </ErrorMessage>
                )}
              </AnimatePresence>
            </FormGroup>

// Trước line 709 (trước FormGroup City)
```

---

## 5️⃣ CÁC THAY ĐỔI CẦN THIẾT

### A. Form State (`web/src/pages/Checkout.tsx` - Line 241-250)

**Thêm vào form state:**
```tsx
const [form, setForm] = useState<CheckoutFormData>({
  // ... existing fields
  street: "",
  ward: "",        // ✅ THÊM DÒNG NÀY
  district: "",
  city: "",
  // ... rest
});
```

### B. Validation Schema (`web/src/schemas/checkoutSchema.ts`)

**Thêm vào schema (sau street, trước district):**
```tsx
street: yup.string()...,
ward: yup
  .string()
  .required('Phường/Xã là bắt buộc'),
district: yup.string()...,
```

### C. Address String (Lines 355, 383, 473)

**Cập nhật format:**
```tsx
// Từ:
address: `${form.street}, ${form.district}, ${form.city}`

// Thành:
address: `${form.street}, ${form.ward}, ${form.district}, ${form.city}`
```

### D. Styled Select Component

**Kiểm tra xem có Select component chưa:**
- Cần kiểm tra styled-components trong file
- Nếu chưa có, cần thêm Select styled component

---

## 6️⃣ PHÁT HIỆN QUAN TRỌNG

### ⚠️ KHÁC BIỆT GIỮA HAI THƯ MỤC

1. **File đã được sửa trước đó:**
   - `frontend-web/src/pages/Checkout.tsx`
   - ✅ File này ĐÃ CÓ ward field

2. **File đang chạy thực tế:**
   - `web/src/pages/Checkout.tsx`
   - ❌ File này CHƯA CÓ ward field

**Kết luận:** Có hai thư mục frontend khác nhau:
- `frontend-web/` - có thể là codebase cũ hoặc không được sử dụng
- `web/` - đây là codebase đang chạy (`npm run dev` từ `web/`)

---

## 7️⃣ FILE PATHS - ĐẦY ĐỦ

### Route Configuration
**File:** `web/src/pages/App.tsx`  
**Absolute:** `d:\FoodFast\web\src\pages\App.tsx`

### Checkout Component (ĐANG CHẠY)
**File:** `web/src/pages/Checkout.tsx`  
**Absolute:** `d:\FoodFast\web\src\pages\Checkout.tsx` ✅ **FILE NÀY CẦN SỬA**

### Validation Schema
**File:** `web/src/schemas/checkoutSchema.ts`  
**Absolute:** `d:\FoodFast\web\src\schemas\checkoutSchema.ts`

---

## ✅ KẾT LUẬN

### File Checkout Đang Chạy:
**Absolute Path:** `d:\FoodFast\web\src\pages\Checkout.tsx`

### Ward Field Status:
- ❌ **KHÔNG TỒN TẠI** trong file này
- ❌ **KHÔNG TỒN TẠI** trong form state
- ❌ **KHÔNG TỒN TẠI** trong validation schema
- ❌ **KHÔNG TỒN TẠI** trong address string

### Vị Trí Chèn Ward Field:
- **Sau line 707** (sau FormGroup District)
- **Trước line 709** (trước FormGroup City)

### Các Thay Đổi Cần Thiết:
1. ✅ Thêm `ward: ""` vào form state (line 246)
2. ✅ Thêm ward validation vào schema
3. ✅ Thêm Ward FormGroup UI (sau line 707)
4. ✅ Cập nhật address string format (3 locations)
5. ✅ Thêm Select styled component (nếu chưa có)

---

**Báo cáo được tạo:** $(date)  
**File đích để patch:** `d:\FoodFast\web\src\pages\Checkout.tsx`

