// Menu Management Service for Restaurant-specific data
import { mockMenuSweetDreams, mockMenuAloha, mockOrderHistorySweetDreams, mockOrderHistoryAloha } from '../data/mockMenuSweetDreams';
import { mockMenuAloha as alohaMenu, mockOrderHistoryAloha as alohaOrderHistory } from '../data/mockMenuAloha';

export interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  status: 'Còn hàng' | 'Hết hàng';
  description?: string;
  image?: string;
  ingredients?: string[];
  preparationTime?: number;
}

export interface OrderHistoryItem {
  id: string;
  customerName: string;
  dishes: string;
  totalAmount: number;
  orderDate: string;
  status: 'Hoàn thành' | 'Đang xử lý' | 'Đã hủy';
}

// Simulate API delay
const simulateDelay = (min: number = 500, max: number = 1200): Promise<void> => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Get dishes by restaurant ID
export const getDishesByRestaurant = async (restaurantId: string): Promise<MenuItem[]> => {
  await simulateDelay();
  
  // Get from localStorage first, fallback to mock data
  const storageKey = `foodfast_menu_${restaurantId}`;
  const storedData = localStorage.getItem(storageKey);
  
  if (storedData) {
    return JSON.parse(storedData);
  }
  
  // Return mock data based on restaurant
  const mockData = restaurantId === 'sweetdreams' ? mockMenuSweetDreams : alohaMenu;
  
  // Store in localStorage for persistence
  localStorage.setItem(storageKey, JSON.stringify(mockData));
  
  return mockData;
};

// Add dish by restaurant
export const addDishByRestaurant = async (restaurantId: string, dish: Omit<MenuItem, 'id'>): Promise<MenuItem> => {
  await simulateDelay();
  
  const storageKey = `foodfast_menu_${restaurantId}`;
  const existingDishes = await getDishesByRestaurant(restaurantId);
  
  // Generate new ID
  const newId = Math.max(...existingDishes.map(d => d.id), 0) + 1;
  
  const newDish: MenuItem = {
    ...dish,
    id: newId
  };
  
  const updatedDishes = [...existingDishes, newDish];
  localStorage.setItem(storageKey, JSON.stringify(updatedDishes));
  
  return newDish;
};

// Update dish by restaurant
export const updateDishByRestaurant = async (restaurantId: string, dishId: number, updates: Partial<MenuItem>): Promise<MenuItem | null> => {
  await simulateDelay();
  
  const storageKey = `foodfast_menu_${restaurantId}`;
  const existingDishes = await getDishesByRestaurant(restaurantId);
  
  const dishIndex = existingDishes.findIndex(d => d.id === dishId);
  if (dishIndex === -1) return null;
  
  const updatedDish = { ...existingDishes[dishIndex], ...updates };
  existingDishes[dishIndex] = updatedDish;
  
  localStorage.setItem(storageKey, JSON.stringify(existingDishes));
  
  return updatedDish;
};

// Delete dish by restaurant
export const deleteDishByRestaurant = async (restaurantId: string, dishId: number): Promise<boolean> => {
  await simulateDelay();
  
  const storageKey = `foodfast_menu_${restaurantId}`;
  const existingDishes = await getDishesByRestaurant(restaurantId);
  
  const filteredDishes = existingDishes.filter(d => d.id !== dishId);
  
  if (filteredDishes.length === existingDishes.length) return false;
  
  localStorage.setItem(storageKey, JSON.stringify(filteredDishes));
  
  return true;
};

// Get order history by restaurant
export const getOrderHistoryByRestaurant = async (restaurantId: string): Promise<OrderHistoryItem[]> => {
  await simulateDelay();
  
  const storageKey = `foodfast_orders_${restaurantId}`;
  const storedData = localStorage.getItem(storageKey);
  
  if (storedData) {
    return JSON.parse(storedData);
  }
  
  // Return mock data based on restaurant
  const mockData = restaurantId === 'sweetdreams' ? mockOrderHistorySweetDreams : alohaOrderHistory;
  
  // Store in localStorage for persistence
  localStorage.setItem(storageKey, JSON.stringify(mockData));
  
  return mockData;
};

// Search dishes by restaurant
export const searchDishesByRestaurant = async (restaurantId: string, query: string, category?: string, status?: string): Promise<MenuItem[]> => {
  await simulateDelay();
  
  const allDishes = await getDishesByRestaurant(restaurantId);
  
  return allDishes.filter(dish => {
    const matchesQuery = !query || 
      dish.name.toLowerCase().includes(query.toLowerCase()) ||
      dish.description?.toLowerCase().includes(query.toLowerCase());
    
    const matchesCategory = !category || category === 'Tất cả' || dish.category === category;
    const matchesStatus = !status || status === 'Tất cả' || dish.status === status;
    
    return matchesQuery && matchesCategory && matchesStatus;
  });
};

// Get categories by restaurant
export const getCategoriesByRestaurant = async (restaurantId: string): Promise<string[]> => {
  await simulateDelay();
  
  const dishes = await getDishesByRestaurant(restaurantId);
  const categories = [...new Set(dishes.map(dish => dish.category))];
  return ['Tất cả', ...categories.sort()];
};

// Get restaurant statistics
export const getRestaurantMenuStats = async (restaurantId: string): Promise<{
  totalDishes: number;
  availableDishes: number;
  outOfStockDishes: number;
  totalRevenue: number;
}> => {
  await simulateDelay();
  
  const dishes = await getDishesByRestaurant(restaurantId);
  const orders = await getOrderHistoryByRestaurant(restaurantId);
  
  return {
    totalDishes: dishes.length,
    availableDishes: dishes.filter(d => d.status === 'Còn hàng').length,
    outOfStockDishes: dishes.filter(d => d.status === 'Hết hàng').length,
    totalRevenue: orders
      .filter(o => o.status === 'Hoàn thành')
      .reduce((sum, order) => sum + order.totalAmount, 0)
  };
};
