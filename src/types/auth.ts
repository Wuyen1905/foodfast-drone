export type UserRole = 'admin' | 'restaurant' | 'customer';

export interface User {
  id: string;
  name: string;
  username: string;
  role: UserRole;
  phone?: string;
  email?: string;
  restaurantId?: string; // For restaurant users
  orderCount?: number;
  createdAt?: number;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  category?: string;
  location?: string;
  rating?: number;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  ownerId: string;
  isActive: boolean;
  createdAt: number;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  items: OrderItem[];
  total: number;
  status: 'Đang chờ phê duyệt' | 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  createdAt: number;
  updatedAt: number;
  deliveryAddress?: string;
  paymentMethod?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface AdminAuthContextValue {
  admin: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  logout: () => void;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  address?: string;
}

export interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ ok: boolean; message?: string; user?: User; token?: string }>;
  register: (payload: RegisterPayload) => Promise<{ ok: boolean; message?: string }>;
  logout: () => void;
  isAdmin: () => boolean;
  isRestaurant: () => boolean;
  isCustomer: () => boolean;
  setPhone?: (phone: string) => void;
}
