import apiClient from '../config/axios';

export interface CreateOrderRequest {
  customerName: string; // Backend expects customerName
  customerPhone: string; // Backend expects customerPhone
  customerEmail?: string;
  address: string;
  restaurant?: string;
  restaurantId?: string;
  userId?: string;
  items: Array<{
    productId?: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  paymentMethod?: string;
  paymentSessionId?: string;
  note?: string;
}

export interface Order {
  id: string;
  name: string; // Maps to customerName in backend
  phone: string; // Maps to customerPhone in backend
  customerEmail?: string;
  address: string;
  restaurant?: string;
  restaurantId?: string;
  userId?: string;
  status: string;
  total: number;
  items: Array<{
    id?: string;
    productId?: string;
    name: string;
    qty?: number; // Frontend format
    quantity?: number; // Alternative format
    price: number;
    productName?: string;
  }>;
  createdAt: number; // Long timestamp
  updatedAt: number; // Long timestamp
  paymentMethod?: string;
  paymentStatus?: string;
  vnpayTransactionId?: string;
  dronePath?: string[];
  confirmedAt?: number;
  cancelledAt?: number;
  internalNotes?: string;
  confirmedBy?: string;
}

export const createOrder = async (body: CreateOrderRequest): Promise<Order> => {
  const response = await apiClient.post('/orders', body);
  return response.data;
};

export const getOrders = async (params?: {
  phone?: string;
  restaurant?: string;
  paymentSessionId?: string;
}): Promise<Order[]> => {
  const response = await apiClient.get('/orders', { params });
  return response.data;
};

export const getOrder = async (id: string): Promise<Order> => {
  const response = await apiClient.get(`/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async (id: string, status: string): Promise<Order> => {
  const response = await apiClient.patch(`/orders/${id}`, { status });
  return response.data;
};

export const getOrdersByUser = async (userId: string): Promise<Order[]> => {
  const response = await apiClient.get(`/orders?userId=${userId}`);
  return response.data;
};

export const getOrdersByRestaurant = async (restaurantId: string): Promise<Order[]> => {
  const response = await apiClient.get(`/orders?restaurant=${restaurantId}`);
  return response.data;
};

