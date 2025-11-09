## ĐỒ ÁN: FoodFast Drone Delivery (Giao đồ ăn bằng Drone)
 Môn: Công nghệ phần mềm (CNPM)
Vai trò: Phân tích yêu cầu, thiết kế, lập trình Front-end, viết tài liệu báo cáo
###  Giới thiệu
Đồ án mô phỏng hệ thống đặt món ăn trực tuyến và giao hàng bằng drone của nhà hàng, được phát triển bằng React.js và React Native.  
Mục tiêu là xây dựng giao diện FE DEV chuyên nghiệp, xử lý quy trình đặt hàng, thanh toán, theo dõi đơn hàng và mô phỏng hành trình giao hàng tự động bằng drone.

###  Mục tiêu học tập
Đồ án giúp sinh viên rèn luyện kỹ năng phát triển giao diện người dùng, áp dụng kiến thức về công nghệ web hiện đại, và hiểu quy trình phát triển phần mềm trong thực tế.  
Dự án hướng tới khả năng mở rộng và tích hợp thực tế trong hệ thống giao hàng thông minh.

1. Mục tiêu tổng quát

Phát triển giao diện web và mobile chuyên nghiệp, thân thiện và đồng bộ với backend, đảm bảo toàn bộ luồng nghiệp vụ đặt món – thanh toán – giao hàng bằng drone hoạt động mượt mà và trực quan cho cả khách hàng, nhà hàng và quản trị viên.

2. Mục tiêu cụ thể

Xây dựng giao diện đặt món: hiển thị danh mục món ăn, chi tiết sản phẩm, giỏ hàng và quy trình thanh toán.

Tối ưu trải nghiệm người dùng (UX/UI): đảm bảo thao tác đặt món nhanh, dễ hiểu, phản hồi thời gian thực.

Phát triển dashboard cho nhà hàng: quản lý món ăn, đơn hàng, drone và trạng thái giao hàng.

Tích hợp hệ thống giao hàng bằng drone: hiển thị vị trí, trạng thái bay và tiến trình giao món.

Đảm bảo tính phản hồi (responsive) giữa web (React.js) và mobile (React Native).

Kết nối API backend (Spring Boot) thông qua Axios, duy trì tính nhất quán dữ liệu và xác thực người dùng.

Hỗ trợ truy cập qua LAN để nhà hàng có thể sử dụng ứng dụng trên thiết bị di động nội bộ.


###  Chức năng chính
- Đăng ký và đăng nhập tài khoản người dùng với ràng buộc dữ liệu đầu vào (họ tên, email, số điện thoại, địa chỉ, mật khẩu).
- Thêm món ăn vào giỏ hàng, chọn phương thức thanh toán (VNPay hoặc tiền mặt).
- Mô phỏng hành trình drone vận chuyển theo tuyến đường thực tế, kèm thanh tiến trình (progress bar) và thời gian dự kiến giao (ETA countdown).
- Giao diện responsive cho cả web và mobile.
- Hỗ trợ dashboard cho nhà hàng: quản lý món ăn, đơn hàng và trạng thái drone.
- Tích hợp phân quyền người dùng (Admin, Nhà hàng, Khách hàng) đảm bảo truy cập đúng chức năng và bảo mật thông tin.
###  Công nghệ sử dụng
- React.js + React Native + TypeScript + Vite
- Styled-components, Framer Motion (hiệu ứng và animation)
- Context API (quản lý trạng thái ứng dụng)
- React Hot Toast (thông báo realtime)
- Package Manager: npm
- VNPay API mô phỏng phương thức thanh toán

###  Cách chạy dự án trên Web
Bước 1: Mở Terminal và chuyển đến thư mục web:

cd web

Bước 2: Kiểm tra danh sách file trong thư mục (đảm bảo có package.json):

dir

Bước 3: Cài đặt các dependencies cần thiết:

npm install

Bước 4: Chạy ứng dụng ở môi trường phát triển (development):

npm run dev

###  Cách chạy dự án trên Mobile

1. Nhập lệnh " npx vite --host " ở terminal.
   
2. Mở đường link sau bằng điện thoại: 

http://192.168.0.101:5173/

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

+ Web:
   
   http://localhost:5173/
   
   http://localhost:5173/admin/login

+ Mobile: 
   
   http://192.168.0.101:5173/

###  Cấu trúc thư mục chính
- src/components: Các thành phần giao diện (UI components)
- src/pages: Các trang chính (Login, Checkout, Orders, Menu)
- src/hooks: Các hook tùy chỉnh (custom hooks)
- src/services: Xử lý logic, dữ liệu đơn hàng, thanh toán
- src/constants: Các giá trị cố định, API routes

Cây thư mục mẫu:

foodfast/

│

├── web/     # Frontend React.js

│   ├── src/

│   │   ├── components/

│   │   ├── pages/

│   │   ├── services/

│   │   └── App.jsx

         ..............
         
│   └── package.json

│

└── mobile/             # Frontend React Native

📝Ghi chú / Lưu ý

Mỗi nhà hàng có drone riêng, chỉ giao đơn thuộc nhà hàng đó.

Không gom đơn nhiều nhà hàng trong cùng một giao dịch thanh toán.

Ứng dụng có thể truy cập qua LAN để dùng trên điện thoại.




