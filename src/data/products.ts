// Unified products data source for both SweetDreams and Aloha restaurants
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  restaurant: "SweetDreams" | "Aloha";
  available: boolean;
  description?: string;
  ingredients?: string[];
  preparationTime?: number;
}

export const products: Product[] = [
  // SweetDreams Bakery Products
  {
    id: "sd-001",
    name: "Bánh Donut",
    price: 25000,
    category: "Bánh ngọt",
    image: "https://tse3.mm.bing.net/th/id/OIP.WvomS6htkxKOVwe_FzvN3wHaGZ?rs=1&pid=ImgDetMain&o=7&rm=3",
    restaurant: "SweetDreams",
    available: true,
    description: "Bánh donut phủ đường giòn rụm, hương vị thơm ngon cho buổi sáng năng động",
    ingredients: ["Bột mì", "Đường", "Men", "Dầu chiên", "Socola"],
    preparationTime: 12
  },
  {
    id: "sd-002",
    name: "Bánh Tiramisu",
    price: 55000,
    category: "Tráng miệng",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
    restaurant: "SweetDreams",
    available: true,
    description: "Bánh tiramisu truyền thống Ý với mascarpone và cà phê, hương vị đậm đà",
    ingredients: ["Mascarpone", "Cà phê espresso", "Cacao", "Biscotti", "Trứng"],
    preparationTime: 20
  },
  {
    id: "sd-003",
    name: "Bánh Phô Mai Dâu",
    price: 45000,
    category: "Tráng miệng",
    image: "https://japanjoy.vn/images/thumbs/0000995_pre-order-banh-pho-mai-dau-tay-dam-da-tokyo-hop-6-cai.png",
    restaurant: "SweetDreams",
    available: true,
    description: "Bánh phô mai dâu tươi với lớp kem mềm mịn, vị ngọt thanh",
    ingredients: ["Phô mai cream", "Dâu tươi", "Bánh quy", "Kem tươi", "Gelatin"],
    preparationTime: 18
  },
  {
    id: "sd-004",
    name: "Bánh Croissant",
    price: 35000,
    category: "Bánh ngọt",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
    restaurant: "SweetDreams",
    available: true,
    description: "Bánh croissant bơ thơm ngon, lớp vỏ giòn tan",
    ingredients: ["Bột mì", "Bơ", "Men", "Muối", "Sữa"],
    preparationTime: 25
  },
  {
    id: "sd-005",
    name: "Bánh Flan",
    price: 30000,
    category: "Tráng miệng",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
    restaurant: "SweetDreams",
    available: true,
    description: "Bánh flan caramel mềm mịn, vị ngọt đậm đà",
    ingredients: ["Trứng", "Sữa", "Đường", "Vanilla", "Caramel"],
    preparationTime: 15
  },

  // Aloha Kitchen Products
  {
    id: "ak-001",
    name: "Hamburger",
    price: 79000,
    category: "Món chính",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    restaurant: "Aloha",
    available: true,
    description: "Hamburger thịt bò nướng với rau tươi và phô mai, hương vị đậm đà",
    ingredients: ["Bánh hamburger", "Thịt bò", "Phô mai", "Rau xà lách", "Cà chua", "Dưa leo"],
    preparationTime: 15
  },
  {
    id: "ak-002",
    name: "Pizza Hawaii",
    price: 89000,
    category: "Món chính",
    image: "https://tse4.mm.bing.net/th/id/OIP.wj7pa6EFj77SDMjgx9KYSAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    restaurant: "Aloha",
    available: true,
    description: "Pizza Hawaii với phô mai tan chảy và dứa ngọt, hương vị hòa quyện hoàn hảo",
    ingredients: ["Bột pizza", "Phô mai mozzarella", "Dứa", "Thịt nguội", "Sốt cà chua"],
    preparationTime: 20
  },
  {
    id: "ak-003",
    name: "Cơm Chiên Hawaii",
    price: 69000,
    category: "Món chính",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
    restaurant: "Aloha",
    available: true,
    description: "Cơm chiên Hawaii với thịt nướng và dứa tươi, hương vị nhiệt đới",
    ingredients: ["Cơm", "Thịt heo nướng", "Dứa", "Rau củ", "Trứng", "Tỏi"],
    preparationTime: 18
  },
  {
    id: "ak-004",
    name: "Chả Giò Chiên",
    price: 45000,
    category: "Món chính",
    image: "https://bakafood.com/wp-content/uploads/2022/08/cha-gio.jpg",
    restaurant: "Aloha",
    available: true,
    description: "Chả giò chiên giòn rụm với thịt và rau củ, ăn kèm nước mắm chua ngọt",
    ingredients: ["Bánh tráng", "Thịt heo", "Tôm", "Rau củ", "Miến", "Gia vị"],
    preparationTime: 25
  },
  {
    id: "ak-005",
    name: "Bánh Mì",
    price: 39000,
    category: "Món chính",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop",
    restaurant: "Aloha",
    available: true,
    description: "Bánh mì Việt Nam với thịt nướng, rau tươi và pate, hương vị truyền thống",
    ingredients: ["Bánh mì", "Thịt heo nướng", "Pate", "Rau thơm", "Dưa leo", "Cà rốt"],
    preparationTime: 10
  }
];

// Helper function to get product image
export const getProductImage = (product: Product): string => {
  // Backend returns imageUrl field, mapped to "image" via @JsonProperty
  // Support both image and imageUrl for compatibility
  return product.image || (product as any).imageUrl || '/images/default-dish.jpg';
};

export default products;