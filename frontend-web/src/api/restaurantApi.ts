import apiClient from '../config/axios';

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  category?: string;
  location?: string;
  rating?: number;
  theme?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  ownerId: string;
  isActive: boolean;
  createdAt: number;
}

export const getRestaurants = async (category?: string): Promise<Restaurant[]> => {
  const params = category ? { category } : {};
  const response = await apiClient.get('/restaurants', { params });
  return response.data;
};

export const getRestaurant = async (id: string): Promise<Restaurant> => {
  const response = await apiClient.get(`/restaurants/${id}`);
  return response.data;
};

export const getRestaurantByOwner = async (ownerId: string): Promise<Restaurant> => {
  const response = await apiClient.get(`/restaurants/owner/${ownerId}`);
  return response.data;
};

