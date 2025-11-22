import apiClient from '../config/axios';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  imageUrl?: string;
  restaurant: string;
  available: boolean;
}

export const getProducts = async (restaurant?: string): Promise<Product[]> => {
  const params = restaurant ? { restaurant } : {};
  const response = await apiClient.get('/products', { params });
  return response.data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await apiClient.post('/products', product);
  return response.data;
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  const response = await apiClient.patch(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await apiClient.delete(`/products/${id}`);
};

