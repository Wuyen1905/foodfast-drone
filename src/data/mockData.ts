import { Restaurant, User } from '../types/auth';

// Mock data for restaurants and users
export const RESTAURANTS: Restaurant[] = [
  {
    id: 'rest_1',
    name: 'FoodFast Restaurant',
    description: 'Original FoodFast restaurant with drone delivery',
    category: 'Fast Food',
    location: 'Downtown',
    rating: 4.5,
    theme: {
      primary: '#FF6600',
      secondary: '#FF8C00',
      accent: '#FFA500'
    },
    ownerId: 'u1',
    isActive: true,
    createdAt: Date.now() - 86400000 * 30 // 30 days ago
  },
  {
    id: 'rest_2',
    name: 'SweetDreams Bakery',
    description: 'Delicious cakes and desserts delivered by drone',
    category: 'Desserts',
    location: 'Mall District',
    rating: 4.8,
    theme: {
      primary: '#E91E63',
      secondary: '#F06292',
      accent: '#F8BBD9'
    },
    ownerId: 'u3',
    isActive: true,
    createdAt: Date.now() - 86400000 * 7 // 7 days ago
  },
  {
    id: 'restaurant_2',
    name: 'Aloha Kitchen',
    description: 'Authentic Asian & Hawaiian fusion cuisine for busy professionals.',
    category: 'Asian Fusion / Bento / Dim Sum',
    location: 'Ho Chi Minh City',
    rating: 4.7,
    theme: {
      primary: '#ffcc70',
      secondary: '#ff9671',
      accent: '#ffc75f'
    },
    ownerId: 'owner_aloha',
    isActive: true,
    createdAt: Date.now()
  }
];

export const USERS: User[] = [
  {
    id: 'u2',
    name: 'Customer User',
    username: 'user',
    role: 'customer',
    phone: '0123456789',
    email: 'user@example.com',
    orderCount: 12,
    createdAt: Date.now() - 86400000 * 60
  },
  {
    id: 'u3',
    name: 'SweetDreams Owner',
    username: 'sweetdreams',
    role: 'restaurant',
    restaurantId: 'rest_2',
    email: 'owner@sweetdreams.com',
    orderCount: 0,
    createdAt: Date.now() - 86400000 * 7
  },
  {
    id: 'u4',
    name: 'Test Customer',
    username: 'user1',
    role: 'customer',
    phone: '0987654321',
    email: 'user1@example.com',
    orderCount: 5,
    createdAt: Date.now() - 86400000 * 30
  },
  {
    id: 'owner_aloha',
    name: 'Aloha Kitchen Owner',
    username: 'aloha_restaurant',
    role: 'restaurant',
    restaurantId: 'restaurant_2',
    email: 'owner@alohakitchen.com',
    orderCount: 0,
    createdAt: Date.now()
  }
];

export const CREDENTIALS = {
  user: { username: 'user', password: 'user123' },
  sweetdreams: { username: 'sweetdreams', password: 'sweet123' },
  user1: { username: 'user1', password: 'user1123' },
  aloha_restaurant: { username: 'aloha_restaurant', password: 'aloha123' }
};
