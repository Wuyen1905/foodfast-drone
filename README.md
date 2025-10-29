## ĐỒ ÁN: FoodFast Drone Delivery

###  Giới thiệu
Đồ án mô phỏng hệ thống đặt món ăn trực tuyến và giao hàng bằng drone của nhà hàng, được phát triển bằng React.js và React Native.  
Mục tiêu là xây dựng giao diện FE DEV chuyên nghiệp, xử lý quy trình đặt hàng, thanh toán, theo dõi đơn hàng và mô phỏng hành trình giao hàng tự động bằng drone.

###  Chức năng chính
- Đăng ký và đăng nhập tài khoản người dùng với ràng buộc dữ liệu đầu vào (họ tên, email, số điện thoại, địa chỉ, mật khẩu).
- Thêm món ăn vào giỏ hàng, chọn phương thức thanh toán (VNPay hoặc tiền mặt).
- Theo dõi đơn hàng theo số điện thoại: hiển thị trạng thái và chi tiết từng đơn.
- Mô phỏng hành trình drone vận chuyển theo tuyến đường thực tế, kèm thanh tiến trình (progress bar) và thời gian dự kiến giao (ETA countdown).
- Giao diện responsive cho cả web và mobile.

###  Công nghệ sử dụng
- React.js + React Native + TypeScript + Vite
- Styled-components, Framer Motion (hiệu ứng và animation)
- Context API (quản lý trạng thái ứng dụng)
- React Hot Toast (thông báo realtime)
- VNPay API mô phỏng phương thức thanh toán

###  Cách chạy dự án
1. Cài đặt thư viện:
   npm install
2. Chạy chương trình:
   npm run dev

🔒 Tài khoản Admin mặc định:
-Admin
Tên đăng nhập: admin
Mật khẩu: admin123
-Nhà hàng: 

+SweetDreams
Tên đăng nhập: sweetdreams
Mật khẩu: sweet123

+Aloha
Tên đăng nhập: aloha_restaurant
Mật khẩu: aloha123

-Người dùng:

+Người dùng 1:
Tên đăng nhập: user
Mật khẩu: user123

+Người dùng 2:
Tên đăng nhập: user1
Mật khẩu: user1123

3.Mở trình duyệt tại địa chỉ:
   
   http://localhost:5173/
   
   http://localhost:5173/admin/login

###  Cấu trúc thư mục chính
- src/components: Các thành phần giao diện (UI components)
- src/pages: Các trang chính (Login, Checkout, Orders, Menu)
- src/hooks: Các hook tùy chỉnh (custom hooks)
- src/services: Xử lý logic, dữ liệu đơn hàng, thanh toán
- src/constants: Các giá trị cố định, API routes

###  Mục tiêu học tập
Đồ án giúp sinh viên rèn luyện kỹ năng phát triển giao diện người dùng, áp dụng kiến thức về công nghệ web hiện đại, và hiểu quy trình phát triển phần mềm trong thực tế.  
Dự án hướng tới khả năng mở rộng và tích hợp thực tế trong hệ thống giao hàng thông minh.


 Môn: Công nghệ phần mềm (CNPM)
Vai trò: Phân tích yêu cầu, thiết kế, lập trình Front-end, viết tài liệu báo cáo



