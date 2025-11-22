import apiClient from '../config/axios';

export interface CartItem {
  id: number;
  productId: string | number;
  productName: string;
  unitPrice: number;
  quantity: number;
  restaurantCode?: string;
}

export const getCart = async (): Promise<CartItem[]> => {
  const response = await apiClient.get('/cart');
  return response.data;
};

export const addToCart = async (body: {
  productId: string | number;
  productName: string;
  unitPrice: number;
  quantity: number;
  restaurantCode?: string;
}): Promise<CartItem[]> => {
  const response = await apiClient.post('/cart/add', body);
  return response.data;
};

export const removeFromCart = async (id: number): Promise<CartItem[]> => {
  const response = await apiClient.delete(`/cart/${id}`);
  return response.data;
};

export const clearCart = async (): Promise<CartItem[]> => {
  const response = await apiClient.delete('/cart/clear');
  return response.data;
};

