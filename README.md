# FE DEV (React Native + React.js) chuyên nghiệp xử lý giao diện đặt đồ ăn và giao hàng bằng drone

Dự án đã được chuyển đổi từ Flutter sang fullstack frontend gồm Web (React.js) và Mobile (React Native/Expo).

## Cấu trúc

```
web/      -> Ứng dụng React (Vite + React + styled-components)
mobile/   -> Ứng dụng React Native (Expo)
```

## Màu sắc & Typography

- Primary: `#FC6011`
- PrimaryText: `#4A4B4D`
- SecondaryText: `#7C7D7E`
- Textfield BG: `#F2F2F2`
- Placeholder: `#B6B7B7`
- White: `#ffffff`

## Chạy Web (React)

```
cd web
npm install
npm run dev
```

## Chạy Mobile (React Native Expo)

```
cd mobile
npm install
npx expo start
```

## Trang/Screen chính

- Home: danh sách món, khuyến mãi
- Menu / Product details
- Cart
- Checkout / Payment
- Drone delivery status tracking

## Mock API

- Sử dụng axios + axios-mock-adapter để mô phỏng dữ liệu món ăn, giỏ hàng, thanh toán và trạng thái drone.
