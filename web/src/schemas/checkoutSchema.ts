import * as yup from 'yup';

export const checkoutSchema = yup.object({
  name: yup
    .string()
    .required('Họ tên là bắt buộc')
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(50, 'Họ tên không được quá 50 ký tự')
    .matches(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂĐẢẠẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăâđảạầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỢỤỦỨỪễệỉịọỏốồổỗộớờởợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\s]+$/, 'Họ tên chỉ được chứa chữ cái và khoảng trắng'),
  
  email: yup
    .string()
    .optional()
    .test('email-format', 'Email không hợp lệ', function(value) {
      if (!value) return true; // Allow empty
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }),
  
  phone: yup
    .string()
    .required('Số điện thoại là bắt buộc')
    .matches(/^(0|\+84)[0-9]{9,10}$/, 'Số điện thoại không hợp lệ (VD: 0123456789 hoặc +84123456789)'),
  
  street: yup
    .string()
    .required('Địa chỉ đường/phố là bắt buộc')
    .min(5, 'Địa chỉ phải có ít nhất 5 ký tự')
    .max(100, 'Địa chỉ không được quá 100 ký tự'),
  
  ward: yup
    .string()
    .required('Phường/Xã là bắt buộc'),
  
  district: yup
    .string()
    .required("Quận/huyện là bắt buộc")
    .test(
      "district-format",
      "Quận/huyện không hợp lệ",
      function (value) {
        if (!value) return false;

        // numeric case
        if (/^\d+$/.test(value)) {
          const num = parseInt(value, 10);
          return num >= 1 && num <= 12;
        }

        // alphabetic case (1–3 words)
        const words = value.trim().split(/\s+/);
        if (words.length < 1 || words.length > 3) return false;

        // allow only letters + Vietnamese accents
        return /^[A-Za-zÀ-Ỹà-ỹ\s]+$/.test(value);
      }
    ),
  
  city: yup
    .string()
    .required('Thành phố/tỉnh là bắt buộc')
    .min(2, 'Tên thành phố/tỉnh phải có ít nhất 2 ký tự')
    .max(50, 'Tên thành phố/tỉnh không được quá 50 ký tự'),
  
  note: yup
    .string()
    .optional()
    .max(200, 'Ghi chú không được quá 200 ký tự'),
  
  payment: yup
    .string()
    .oneOf(['visa', 'momo', 'zalopay', 'cod', 'vnpay'], 'Phương thức thanh toán không hợp lệ')
    .required('Vui lòng chọn phương thức thanh toán')
});

export type CheckoutFormData = yup.InferType<typeof checkoutSchema>;
