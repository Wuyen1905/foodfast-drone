import apiClient from '../config/axios';

export interface User {
  id: string;
  username: string;
  name: string;
  email?: string;
  phone?: string;
  role: string;
  restaurantId?: string;
  orderCount?: number;
  createdAt?: number;
}

export const getAllUsers = async (): Promise<User[]> => {
  const response = await apiClient.get('/auth/users');
  return response.data;
};

