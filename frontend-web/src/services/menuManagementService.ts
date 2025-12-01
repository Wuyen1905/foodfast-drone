// Menu Management Service for Restaurant-specific data
import { getProducts } from '../api/productApi';
import { getOrdersByRestaurant } from '../api/orderApi';

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

// Note: Removed simulateDelay - now using real API calls

// Get dishes by restaurant ID
export const getDishesByRestaurant = async (restaurantId: string): Promise<MenuItem[]> => {
  try {
    // Normalize restaurant ID to match backend storage format
    const restaurantName = restaurantId.trim().toLowerCase();
    
    const products = await getProducts(restaurantName);
    
    // Convert Product to MenuItem format
    return products.map((product, index) => ({
      id: index + 1,
      name: product.name,
      category: product.category,
      price: product.price,
      status: product.available ? 'Còn hàng' as const : 'Hết hàng' as const,
      description: product.description,
      image: product.imageUrl
    }));
  } catch (error) {
    console.error('Failed to fetch dishes:', error);
    return [];
  }
};

// Add dish by restaurant
// Note: This would require a POST endpoint to create products
// For now, this is a placeholder that would need backend support
export const addDishByRestaurant = async (restaurantId: string, dish: Omit<MenuItem, 'id'>): Promise<MenuItem> => {
  // TODO: Implement product creation via API
  throw new Error('Product creation not yet implemented via API');
};

// Update dish by restaurant
// Note: This would require a PUT/PATCH endpoint to update products
// For now, this is a placeholder that would need backend support
export const updateDishByRestaurant = async (restaurantId: string, dishId: number, updates: Partial<MenuItem>): Promise<MenuItem | null> => {
  // TODO: Implement product update via API
  throw new Error('Product update not yet implemented via API');
};

// Delete dish by restaurant
// Note: This would require a DELETE endpoint to remove products
// For now, this is a placeholder that would need backend support
export const deleteDishByRestaurant = async (restaurantId: string, dishId: number): Promise<boolean> => {
  // TODO: Implement product deletion via API
  throw new Error('Product deletion not yet implemented via API');
};

// Get order history by restaurant
export const getOrderHistoryByRestaurant = async (restaurantId: string): Promise<OrderHistoryItem[]> => {
  try {
    // Normalize restaurant ID to match backend storage format
    const restaurantName = restaurantId.trim().toLowerCase();
    
    const orders = await getOrdersByRestaurant(restaurantName);
    
    // Convert Order to OrderHistoryItem format
    return orders.map(order => ({
      id: order.id,
      customerName: order.customerName,
      dishes: order.items.map(item => `${item.name} x${item.quantity}`).join(', '),
      totalAmount: order.total,
      orderDate: new Date(order.createdAt).toISOString(),
      status: order.status === 'COMPLETED' ? 'Hoàn thành' as const :
              order.status === 'PROCESSING' || order.status === 'DELIVERING' ? 'Đang xử lý' as const :
              'Đã hủy' as const
    }));
  } catch (error) {
    console.error('Failed to fetch order history:', error);
    return [];
  }
};

// Search dishes by restaurant
export const searchDishesByRestaurant = async (restaurantId: string, query: string, category?: string, status?: string): Promise<MenuItem[]> => {
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
