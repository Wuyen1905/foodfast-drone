export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description: string;
  tag?: 'Hot' | 'New';
  category: 'Burger' | 'Pizza' | 'Sushi' | 'Dessert';
}

export interface CartItem {
  id: string;
  name: string;
  image?: string;
  price: number;
  qty: number;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export interface UserInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  note?: string;
}

export interface VNPayPaymentData {
  amount: number;
  orderInfo: string;
  orderId: string;
  returnUrl: string;
}

export interface Order {
  time: number;
  items: OrderItem[];
  total: number;
  userInfo: UserInfo;
  paymentMethod: 'visa' | 'momo' | 'zalopay' | 'cod' | 'vnpay';
  status: 'Processing' | 'En Route' | 'Delivered';
  paymentStatus?: 'Đang chờ phê duyệt' | 'completed' | 'failed';
  vnpayTransactionId?: string;
}

export interface OrderInfo {
  name: string;
  address: string;
  phone: string;
  email?: string;
  note?: string;
  eta: number;
}

export type PaymentMethod = 'visa' | 'momo' | 'zalopay' | 'cod' | 'vnpay';
export type OrderStatus = 'Processing' | 'En Route' | 'Delivered';
export type Theme = 'light' | 'dark';
