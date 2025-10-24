// Mock menu data for SweetDreams Bakery
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

export const mockMenuSweetDreams: MenuItem[] = [
  {
    id: 1,
    name: "Bánh Donut",
    category: "Bánh ngọt",
    price: 25000,
    status: "Còn hàng",
    description: "Bánh donut phủ đường giòn rụm, hương vị thơm ngon cho buổi sáng năng động",
    ingredients: ["Bột mì", "Đường", "Men", "Dầu chiên", "Socola"],
    preparationTime: 12
  },
  {
    id: 2,
    name: "Bánh Tiramisu",
    category: "Tráng miệng",
    price: 55000,
    status: "Còn hàng",
    description: "Bánh tiramisu truyền thống Ý với mascarpone và cà phê, hương vị đậm đà",
    ingredients: ["Mascarpone", "Cà phê espresso", "Cacao", "Biscotti", "Trứng"],
    preparationTime: 20
  },
  {
    id: 3,
    name: "Bánh Phô Mai Dâu",
    category: "Tráng miệng",
    price: 45000,
    status: "Còn hàng",
    description: "Bánh phô mai dâu tươi với lớp kem mềm mịn, vị ngọt thanh",
    ingredients: ["Phô mai cream", "Dâu tươi", "Bánh quy", "Kem tươi", "Gelatin"],
    preparationTime: 18
  },
  {
    id: 4,
    name: "Bánh Croissant",
    category: "Bánh ngọt",
    price: 35000,
    status: "Còn hàng",
    description: "Bánh croissant bơ thơm ngon, lớp vỏ giòn tan",
    ingredients: ["Bột mì", "Bơ", "Men", "Muối", "Sữa"],
    preparationTime: 25
  },
  {
    id: 5,
    name: "Bánh Flan",
    category: "Tráng miệng",
    price: 30000,
    status: "Còn hàng",
    description: "Bánh flan caramel mềm mịn, vị ngọt đậm đà",
    ingredients: ["Trứng", "Sữa", "Đường", "Vanilla", "Caramel"],
    preparationTime: 15
  }
];

// Mock order history for SweetDreams
export interface OrderHistoryItem {
  id: string;
  customerName: string;
  dishes: string;
  totalAmount: number;
  orderDate: string;
  status: 'Hoàn thành' | 'Đang xử lý' | 'Đã hủy';
}

export const mockOrderHistorySweetDreams: OrderHistoryItem[] = [
  {
    id: "ORD-SD-001",
    customerName: "Phạm Thị Mai",
    dishes: "Bánh Tiramisu, Cà Phê Sữa Đá",
    totalAmount: 90000,
    orderDate: "2024-01-15 14:30",
    status: "Hoàn thành"
  },
  {
    id: "ORD-SD-002",
    customerName: "Nguyễn Văn Nam",
    dishes: "Bánh Mì Thịt Nướng, Trà Sữa Trân Châu",
    totalAmount: 85000,
    orderDate: "2024-01-15 13:45",
    status: "Hoàn thành"
  },
  {
    id: "ORD-SD-003",
    customerName: "Trần Thị Hoa",
    dishes: "Bánh Phô Mai Dâu, Nước Cam Tươi",
    totalAmount: 100000,
    orderDate: "2024-01-15 12:20",
    status: "Đang xử lý"
  },
  {
    id: "ORD-SD-004",
    customerName: "Lê Văn Minh",
    dishes: "Bánh Croissant, Cà Phê Sữa Đá",
    totalAmount: 60000,
    orderDate: "2024-01-15 11:15",
    status: "Hoàn thành"
  }
];
