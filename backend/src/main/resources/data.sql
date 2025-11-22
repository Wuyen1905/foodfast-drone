-- FoodFast Initial Seed Data
-- This file seeds the H2 database with initial data for development

-- Insert Users
INSERT INTO users (id, username, password, name, email, phone, role, restaurant_id, order_count, created_at) VALUES
('u1', 'admin', 'admin123', 'Admin User', 'admin@foodfast.com', '0123456789', 'admin', NULL, 0, 1690000000000),
('u2', 'user', 'user123', 'Customer User', 'user@example.com', '0123456789', 'customer', NULL, 12, 1690000000000),
('u3', 'sweetdreams', 'sweet123', 'SweetDreams Owner', 'owner@sweetdreams.com', '0987654321', 'restaurant', 'rest_2', 0, 1690000000000),
('u4', 'user1', 'user1123', 'Test Customer', 'user1@example.com', '0987654321', 'customer', NULL, 5, 1690000000000),
('owner_aloha', 'aloha_restaurant', 'aloha123', 'Aloha Kitchen Owner', 'owner@alohakitchen.com', '0123456789', 'restaurant', 'restaurant_2', 0, 1690000000000);

-- Insert Restaurants
INSERT INTO restaurants (id, name, description, category, location, rating, primary_color, secondary_color, accent_color, owner_id, is_active, created_at) VALUES
('rest_1', 'FoodFast Restaurant', 'Original FoodFast restaurant with drone delivery', 'Fast Food', 'Downtown', 4.5, '#FF6600', '#FF8C00', '#FFA500', 'u1', true, 1690000000000),
('rest_2', 'SweetDreams Bakery', 'Delicious cakes and desserts delivered by drone', 'Desserts', 'Mall District', 4.8, '#E91E63', '#F06292', '#F8BBD9', 'u3', true, 1690000000000),
('restaurant_2', 'Aloha Kitchen', 'Authentic Asian & Hawaiian fusion cuisine for busy professionals.', 'Asian Fusion / Bento / Dim Sum', 'Ho Chi Minh City', 4.7, '#ffcc70', '#ff9671', '#ffc75f', 'owner_aloha', true, 1690000000000);

-- Insert Products for SweetDreams
INSERT INTO products (id, name, description, price, category, image_url, restaurant, available) VALUES
('sd-1', 'Bánh Donut', 'Bánh donut phủ đường giòn rụm, hương vị thơm ngon cho buổi sáng năng động', 25000, 'Bánh ngọt', 'https://th.bing.com/th/id/R.7a2114b6f278629b086c99a631c17765?rik=6Wiy3P2mDU64dA&riu=http%3a%2f%2fcdn.tgdd.vn%2fFiles%2f2021%2f07%2f28%2f1371385%2f2-cach-lam-banh-donut-nuong-va-chien-ngon-don-gian-tai-nha-202206031611571875.jpg&ehk=mlYN0Fber9i7dgMFrlWnqQ3hjz2S247pLeK7W9g4r0g%3d&risl=&pid=ImgRaw&r=0', 'SweetDreams', true),
('sd-2', 'Bánh Tiramisu', 'Bánh tiramisu truyền thống Ý với mascarpone và cà phê, hương vị đậm đà', 55000, 'Tráng miệng', 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/2/4/2/RX-FNM_030111-Sugar-Fix-005_s4x3.jpg.rend.hgtvcom.826.620.suffix/1371597326801.jpeg', 'SweetDreams', true),
('sd-3', 'Bánh Phô Mai Dâu', 'Bánh phô mai dâu tươi với lớp kem mềm mịn, vị ngọt thanh', 45000, 'Tráng miệng', 'https://japanjoy.vn/images/thumbs/0000995_pre-order-banh-pho-mai-dau-tay-dam-da-tokyo-hop-6-cai.png', 'SweetDreams', true),
('sd-4', 'Bánh Croissant', 'Bánh croissant Pháp giòn tan, bơ thơm lừng', 35000, 'Bánh ngọt', 'https://tahu.edu.vn/wp-content/uploads/2024/07/banh-Croissant.jpeg', 'SweetDreams', true);

-- Insert Products for Aloha Kitchen
INSERT INTO products (id, name, description, price, category, image_url, restaurant, available) VALUES
('ak-1', 'Hamburger', 'Hamburger thịt bò nướng với rau tươi và phô mai, hương vị đậm đà', 79000, 'Món chính', 'https://tse4.mm.bing.net/th/id/OIP.pIB3_58RcdOaM26-dIGKnwHaE0?rs=1&pid=ImgDetMain&o=7&rm=3', 'Aloha', true),
('ak-2', 'Pizza Hawaii', 'Pizza Hawaii với phô mai tan chảy và dứa ngọt, hương vị hòa quyện hoàn hảo', 89000, 'Món chính', 'https://th.bing.com/th/id/R.a9d336a8bd0e3ded94104032aa057891?rik=cDJ8N9Mov7e3kw&pid=ImgRaw&r=0', 'Aloha', true),
('ak-3', 'Cơm Chiên Hawaii', 'Cơm chiên Hawaii với thịt nướng và dứa tươi, hương vị nhiệt đới', 69000, 'Món chính', 'https://media-cdn.tripadvisor.com/media/photo-s/18/29/f2/5c/com-chien-cua-bi-n.jpg', 'Aloha', true),
('ak-4', 'Chả Giò Chiên', 'Chả giò chiên giòn với nhân thịt và rau củ tươi ngon', 45000, 'Món chính', 'https://tse3.mm.bing.net/th/id/OIP.7044maV58Afw74b7gOKZ6wHaEx?rs=1&pid=ImgDetMain&o=7&rm=3', 'Aloha', true);

-- Insert Drones (matching AdminDrone structure)
INSERT INTO drones (id, restaurant_id, restaurant_name, status, battery, current_order_id, last_maintenance, flagged_for_issue, issue_description, name, restaurant, battery_level) VALUES
('DRONE-rest_2-001', 'rest_2', 'SweetDreams Bakery', 'Idle', 85, NULL, 1690000000000, false, NULL, 'DRONE-SD-001', 'SweetDreams', 85),
('DRONE-rest_2-002', 'rest_2', 'SweetDreams Bakery', 'Delivering', 65, 'ORDER-001', 1690000000000, false, NULL, 'DRONE-SD-002', 'SweetDreams', 65),
('DRONE-rest_2-003', 'rest_2', 'SweetDreams Bakery', 'Charging', 45, NULL, 1690000000000, false, NULL, 'DRONE-SD-003', 'SweetDreams', 45),
('DRONE-restaurant_2-001', 'restaurant_2', 'Aloha Kitchen', 'Idle', 90, NULL, 1690000000000, false, NULL, 'DRONE-AK-001', 'Aloha', 90),
('DRONE-restaurant_2-002', 'restaurant_2', 'Aloha Kitchen', 'Delivering', 70, 'ORDER-002', 1690000000000, false, NULL, 'DRONE-AK-002', 'Aloha', 70),
('DRONE-restaurant_2-003', 'restaurant_2', 'Aloha Kitchen', 'Maintenance', 30, NULL, 1690000000000, true, 'Battery degradation detected', 'DRONE-AK-003', 'Aloha', 30);

-- Insert Sample Orders (matching frontend Order interface)
-- Note: Order items are inserted separately via OrderItem entity
-- Note: created_at and updated_at use CURRENT_TIMESTAMP for simplicity and compatibility
INSERT INTO orders (id, customer_name, customer_phone, customer_email, address, restaurant, restaurant_id, user_id, payment_session_id, payment_method, payment_status, note, drone_id, status, total, created_at, updated_at) VALUES
('ORDER-001', 'Nguyễn Văn A', '0123456789', 'nguyenvana@example.com', '123 Đường ABC, Quận 1, TP.HCM', 'SweetDreams', 'rest_2', 'u2', NULL, 'cash', 'paid', 'Giao nhanh giúp em', 'DRONE-rest_2-002', 'DELIVERING', 85000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ORDER-002', 'Trần Thị B', '0987654321', 'tranthib@example.com', '456 Đường XYZ, Quận 2, TP.HCM', 'Aloha', 'restaurant_2', 'u4', NULL, 'vnpay', 'paid', NULL, 'DRONE-restaurant_2-002', 'PREPARING', 158000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ORDER-003', 'Lê Văn C', '0912345678', 'levanc@example.com', '789 Đường DEF, Quận 3, TP.HCM', 'SweetDreams', 'rest_2', 'u2', NULL, 'cash', 'pending', NULL, NULL, 'PENDING', 100000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Order Items for ORDER-001
INSERT INTO order_items (product_id, name, qty, price, product_name, order_id) VALUES
('sd-1', 'Bánh Donut', 2, 25000, 'Bánh Donut', 'ORDER-001'),
('sd-2', 'Bánh Tiramisu', 1, 55000, 'Bánh Tiramisu', 'ORDER-001');

-- Insert Order Items for ORDER-002
INSERT INTO order_items (product_id, name, qty, price, product_name, order_id) VALUES
('ak-1', 'Hamburger', 2, 79000, 'Hamburger', 'ORDER-002');

-- Insert Order Items for ORDER-003
INSERT INTO order_items (product_id, name, qty, price, product_name, order_id) VALUES
('sd-3', 'Bánh Phô Mai Dâu', 1, 45000, 'Bánh Phô Mai Dâu', 'ORDER-003'),
('sd-4', 'Bánh Croissant', 1, 35000, 'Bánh Croissant', 'ORDER-003'),
('sd-1', 'Bánh Donut', 1, 25000, 'Bánh Donut', 'ORDER-003');

-- Insert Sample Analytics Data
INSERT INTO analytics (id, restaurant_id, period, revenue, orders, avg_order_value, delivery_time, created_at) VALUES
('analytics-rest_2-day', 'rest_2', 'day', 185000, 2, 92500, 18, 1700000000000),
('analytics-restaurant_2-day', 'restaurant_2', 'day', 158000, 1, 158000, 20, 1700000000000),
('analytics-rest_2-week', 'rest_2', 'week', 500000, 10, 50000, 18, 1700000000000),
('analytics-restaurant_2-week', 'restaurant_2', 'week', 800000, 8, 100000, 20, 1700000000000);

-- Insert Sample Notifications
INSERT INTO notifications (id, restaurant_id, order_id, customer_name, customer_phone, total, status, timestamp, is_read) VALUES
('notif-001', 'rest_2', 'ORDER-001', 'Nguyễn Văn A', '0123456789', 85000, 'DELIVERING', 1700000000000, false),
('notif-002', 'restaurant_2', 'ORDER-002', 'Trần Thị B', '0987654321', 158000, 'PREPARING', 1700000002000, false),
('notif-003', 'rest_2', 'ORDER-003', 'Lê Văn C', '0912345678', 100000, 'PENDING', 1700000004000, true);

