// Mock menu data for Aloha Kitchen
export interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  status: 'Còn hàng' | 'Hết hàng';
  description?: string;
  image?: string;
  ingredients?: string[];
  preparationTime?: number; // in minutes
}

export const mockMenuAloha: MenuItem[] = [
  {
    id: 1,
    name: "Hamburger",
    category: "Món chính",
    price: 79000,
    status: "Còn hàng",
    description: "Hamburger thịt bò nướng với rau tươi và phô mai, hương vị đậm đà",
    ingredients: ["Bánh hamburger", "Thịt bò", "Phô mai", "Rau xà lách", "Cà chua", "Dưa leo"],
    preparationTime: 15
  },
  {
    id: 2,
    name: "Pizza Hawaii",
    category: "Món chính",
    price: 89000,
    status: "Còn hàng",
    description: "Pizza Hawaii với phô mai tan chảy và dứa ngọt, hương vị hòa quyện hoàn hảo",
    ingredients: ["Bột pizza", "Phô mai mozzarella", "Dứa", "Thịt nguội", "Sốt cà chua"],
    preparationTime: 20
  },
  {
    id: 3,
    name: "Cơm Chiên Hawaii",
    category: "Món chính",
    price: 69000,
    status: "Còn hàng",
    description: "Cơm chiên Hawaii với thịt nướng và dứa tươi, hương vị nhiệt đới",
    ingredients: ["Cơm", "Thịt heo nướng", "Dứa", "Rau củ", "Trứng", "Tỏi"],
    preparationTime: 18
  },
  {
    id: 4,
    name: "Chả Giò Chiên",
    category: "Món chính",
    price: 45000,
    status: "Còn hàng",
    description: "Chả giò chiên giòn rụm với thịt và rau củ, ăn kèm nước mắm chua ngọt",
    ingredients: ["Bánh tráng", "Thịt heo", "Tôm", "Rau củ", "Miến", "Gia vị"],
    preparationTime: 25
  },
  {
    id: 5,
    name: "Bánh Mì",
    category: "Món chính",
    price: 39000,
    status: "Còn hàng",
    description: "Bánh mì Việt Nam với thịt nướng, rau tươi và pate, hương vị truyền thống",
    ingredients: ["Bánh mì", "Thịt heo nướng", "Pate", "Rau thơm", "Dưa leo", "Cà rốt"],
    preparationTime: 10
  }
];

// Mock order history for Aloha
export interface OrderHistoryItem {
  id: string;
  customerName: string;
  dishes: string;
  totalAmount: number;
  orderDate: string;
  status: 'Hoàn thành' | 'Đang xử lý' | 'Đã hủy';
}

export const mockOrderHistoryAloha: OrderHistoryItem[] = [
  {
    id: "ORD-AK-001",
    customerName: "Lê Văn Minh",
    dishes: "Cơm Chiên Hawaii, Phở Bò",
    totalAmount: 160000,
    orderDate: "2024-01-15 14:50",
    status: "Hoàn thành"
  },
  {
    id: "ORD-AK-002",
    customerName: "Hoàng Thị Linh",
    dishes: "Bún Bò Huế, Nem Nướng",
    totalAmount: 130000,
    orderDate: "2024-01-15 13:15",
    status: "Hoàn thành"
  },
  {
    id: "ORD-AK-003",
    customerName: "Vũ Thị Lan",
    dishes: "Cơm Tấm Sườn Nướng, Canh Chua Cá",
    totalAmount: 125000,
    orderDate: "2024-01-15 15:00",
    status: "Đang xử lý"
  },
  {
    id: "ORD-AK-004",
    customerName: "Nguyễn Văn Hùng",
    dishes: "Chả Cá Lã Vọng, Bún Bò Huế",
    totalAmount: 170000,
    orderDate: "2024-01-15 11:30",
    status: "Hoàn thành"
  }
];
