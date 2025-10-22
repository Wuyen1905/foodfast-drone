export type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
  description: string;
  tag?: 'Hot' | 'New';
  category: 'Burger' | 'Pizza' | 'Sushi' | 'Dessert' | 'Rice' | 'Noodles' | 'Asian' | 'Hawaiian';
  restaurantId?: string; // Restaurant association
  isAvailable?: boolean; // Availability status (default: true)
};

export const PLACEHOLDERS = {
  Burger: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80',
  Pizza: 'https://images.unsplash.com/photo-1601924582971-1c9d8c1e0d9b?w=1200&q=80',
  Sushi: 'https://images.unsplash.com/photo-1562158070-622a0c5145cf?w=1200&q=80',
  Dessert: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1200&q=80',
  Rice: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1200&q=80',
  Noodles: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1200&q=80',
  Asian: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200&q=80',
  Hawaiian: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1200&q=80',
};

export const products: Product[] = [
  // FoodFast Restaurant Items (rest_1)
  {
    id: '1',
    name: 'Burger Drone',
    price: 6.5,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80',
    description: 'Juicy grilled burger with fresh lettuce and sauce.',
    tag: 'Hot',
    category: 'Burger',
    restaurantId: 'rest_1',
  },
  {
    id: '2',
    name: 'Pizza Sky',
    price: 8.9,
    image: 'https://png.pngtree.com/thumb_back/fh260/background/20250205/pngtree-melting-pizza-slice-in-space-with-blue-and-red-background-image_16896342.jpg',
    description: 'Cheesy pepperoni pizza with tomato base.',
    tag: 'New',
    category: 'Pizza',
    restaurantId: 'rest_1',
  },
  {
    id: '3',
    name: 'Sushi Fly',
    price: 12.0,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    description: 'Fresh salmon sushi with soy sauce and wasabi.',
    category: 'Sushi',
    restaurantId: 'rest_1',
  },
  {
    id: '4',
    name: 'Double Burger',
    price: 9.5,
    image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=800&q=80',
    description: 'Double beef burger with cheese and pickles.',
    category: 'Burger',
    restaurantId: 'rest_1',
  },
  {
    id: '5',
    name: 'Pepperoni Lift',
    price: 10.5,
    image: 'https://thumbs.dreamstime.com/b/pepperoni-pizza-slice-lift-melted-cheese-box-pepperoni-pizza-slice-lift-melted-cheese-box-349528217.jpg?w=992',
    description: 'Crispy pepperoni pizza baked to perfection.',
    category: 'Pizza',
    restaurantId: 'rest_1',
  },
  {
    id: '6',
    name: 'Rainbow Sushi',
    price: 14.2,
    image: 'https://th.bing.com/th/id/R.8b296e4ac3888bb6e70504928e6f8e24?rik=UvkyqeD4uJbR9g&pid=ImgRaw&r=0',
    description: 'Colorful sushi rolls with tuna, salmon, and avocado.',
    category: 'Sushi',
    restaurantId: 'rest_1',
  },
  // SweetDreams Bakery Desserts (rest_2)
  {
    id: '7',
    name: 'Strawberry Dream Cake',
    price: 15.9,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    description: 'Bản giao hưởng sô cô la lộng lẫy. Những dòng ganache óng ả, đặc quánh buông lơi như dải lụa mềm, bao trọn lấy cốt bánh ẩm mượt. Trên đỉnh, từng đóa hồng kem bơ sô cô la nở rộ, mời gọi một trải nghiệm ngọt ngào đầy đê mê.',
    tag: 'New',
    category: 'Dessert',
    restaurantId: 'rest_2',
  },
  {
    id: '8',
    name: 'Chocolate Heaven',
    price: 12.5,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
    description: 'Từng khối brownie ẩm mượt, đặc quánh xếp chồng, phô diễn kết cấu "fudgy" quyến rũ. Dòng sốt sô cô la nóng hổi đang lười biếng chảy tràn, đánh thức mọi giác quan với sự nồng nàn, nguyên chất.',
    tag: 'Hot',
    category: 'Dessert',
    restaurantId: 'rest_2',
  },
  {
    id: '9',
    name: 'Vanilla Cupcake Delight',
    price: 8.9,
    image: 'https://tse3.mm.bing.net/th/id/OIP.lE-x_V_iDgozmz4Qv09PowHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
    description: 'Chiếc cupcake xốp mềm tựa như nhung, nâng đỡ "đám mây" kem bơ mịn màng, cuộn xoắn đầy duyên dáng. Một vẻ đẹp tinh tế, cổ điển, hứa hẹn sự ngọt ngào tan chảy nhẹ nhàng.',
    category: 'Dessert',
    restaurantId: 'rest_2',
  },
  {
    id: '10',
    name: 'Red Velvet Magic',
    price: 14.2,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
    description: 'Dòng caramel vàng óng và sô cô la đậm đặc đang lười biếng tuôn chảy, quyện lấy viên kem vani mát lạnh. Một khoảnh khắc bùng nổ của sự ngọt ngào tương phản, tan chảy ngay trên đầu lưỡi.',
    category: 'Dessert',
    restaurantId: 'rest_2',
  },
  {
    id: '11',
    name: 'Tiramisu Paradise',
    price: 16.8,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80',
    description: 'Từng tầng kem mascarpone mềm mượt tựa áng mây, ôm ấp lấy những ngón tay thấm đẫm vị cà phê nồng nàn. Lớp bột ca cao đắng nhẹ phủ trên như một tấm màn nhung, đánh thức một trải nghiệm lãng mạn và tinh tế.',
    category: 'Dessert',
    restaurantId: 'rest_2',
  },
  {
    id: '12',
    name: 'Cheesecake Bliss',
    price: 13.5,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80',
    description: 'Trên nền đế bánh quy vàng giòn, lớp phô mai mịn màng, béo ngậy như lụa. Thắp sáng trên cùng là vầng sốt việt quất tím thẫm, căng mọng, mang đến sự cân bằng chua ngọt đầy vương vấn.',
    category: 'Dessert',
    restaurantId: 'rest_2',
  },

  // Aloha Kitchen - Asian Fusion / Bento / Dim Sum (restaurant_2)
  {
    id: '13',
    name: 'Hawaiian Fried Rice',
    price: 11.5,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80',
    description: 'Tropical fried rice with pineapple, ham, and vegetables.',
    tag: 'Hot',
    category: 'Rice',
    restaurantId: 'restaurant_2',
  },
  {
    id: '14',
    name: 'Bento Box Lunch',
    price: 13.9,
    image: 'https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?w=800&q=80',
    description: 'Complete bento meal with teriyaki chicken, rice, vegetables, and miso soup.',
    tag: 'New',
    category: 'Rice',
    restaurantId: 'restaurant_2',
  },
  {
    id: '15',
    name: 'Office Rice Meals',
    price: 9.5,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',
    description: 'Quick and nutritious rice meals perfect for busy professionals.',
    category: 'Rice',
    restaurantId: 'restaurant_2',
  },
  {
    id: '16',
    name: 'Stir-Fried Noodles',
    price: 10.9,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
    description: 'Savory stir-fried noodles with vegetables and choice of protein.',
    tag: 'Hot',
    category: 'Noodles',
    restaurantId: 'restaurant_2',
  },
  {
    id: '17',
    name: 'Stir-Fried Vermicelli',
    price: 10.5,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80',
    description: 'Light and flavorful vermicelli noodles with fresh vegetables.',
    category: 'Noodles',
    restaurantId: 'restaurant_2',
  },
  {
    id: '18',
    name: 'Burritos',
    price: 12.9,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80',
    description: 'Hawaiian-style burrito with grilled chicken, pineapple salsa, and rice.',
    tag: 'New',
    category: 'Hawaiian',
    restaurantId: 'restaurant_2',
  },
  {
    id: '19',
    name: 'Fresh Spring Rolls (Gỏi cuốn)',
    price: 8.9,
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80',
    description: 'Light and healthy rice paper rolls with shrimp, herbs, and peanut sauce.',
    category: 'Asian',
    restaurantId: 'restaurant_2',
  },
  {
    id: '20',
    name: 'Fried Spring Rolls (Chả giò)',
    price: 9.5,
    image: 'https://th.bing.com/th/id/OIP.KUGmFTZprLWgPDdf1QxUxAHaHa?o=7&cb=12rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
    description: 'Golden crispy fried rolls filled with pork, vegetables, and glass noodles.',
    tag: 'Hot',
    category: 'Asian',
    restaurantId: 'restaurant_2',
  },
  {
    id: '21',
    name: 'Dim Sum',
    price: 14.9,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80',
    description: 'Assorted traditional dim sum with dumplings, bao buns, and shumai.',
    category: 'Asian',
    restaurantId: 'restaurant_2',
  },
];

export const getProductImage = (p: Product) => p.image || PLACEHOLDERS[p.category];

// ===== add at the bottom of src/data/products.ts =====
export const productNameMap: Record<string, string> = Object.fromEntries(
  products.map(p => [p.id, p.name])
);

export const productPriceMap: Record<string, number> = Object.fromEntries(
  products.map(p => [p.id, p.price])
);