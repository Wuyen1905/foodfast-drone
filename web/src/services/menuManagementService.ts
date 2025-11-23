// Menu Management Service for Restaurant-specific data
import { api } from '@/config/axios';
import { normalizeToRestaurantId } from '@/utils/restaurantUtils';

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

// Normalize restaurant ID
const normalizeRestaurantId = (restaurantId: string): string => {
  const map: Record<string, string> = {
    'rest_2': 'SweetDreams',
    'restaurant_2': 'Aloha',
    'sweetdreams': 'SweetDreams',
    'aloha': 'Aloha'
  };
  return map[restaurantId.toLowerCase()] || restaurantId;
};

// Get dishes by restaurant ID
export const getDishesByRestaurant = async (restaurantId: string): Promise<MenuItem[]> => {
  try {
    const restaurantParam = normalizeRestaurantId(restaurantId);
    const response = await api.get('/products', {
      params: { restaurant: restaurantParam }
    });
    const products = Array.isArray(response.data) ? response.data : [];
    
    // Map products to MenuItem format
    return products.map((p: any) => ({
      id: parseInt(p.id.replace(/\D/g, '')) || 0,
      name: p.name,
      category: p.category || '',
      price: p.price || 0,
      status: p.available ? 'Còn hàng' as const : 'Hết hàng' as const,
      description: p.description,
      image: p.imageUrl || p.image
    }));
  } catch (error) {
    console.error('[menuManagementService] Error fetching dishes:', error);
    return [];
  }
};

// Add dish by restaurant
export const addDishByRestaurant = async (restaurantId: string, dish: Omit<MenuItem, 'id'>): Promise<MenuItem> => {
  try {
    const restaurantParam = normalizeRestaurantId(restaurantId);
    const product = {
      id: `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: dish.name,
      category: dish.category,
      price: dish.price,
      available: dish.status === 'Còn hàng',
      description: dish.description,
      imageUrl: dish.image,
      restaurant: restaurantParam
    };
    
    const response = await api.post('/products', product);
    const saved = response.data;
    
    return {
      id: parseInt(saved.id.replace(/\D/g, '')) || 0,
      name: saved.name,
      category: saved.category,
      price: saved.price,
      status: saved.available ? 'Còn hàng' as const : 'Hết hàng' as const,
      description: saved.description,
      image: saved.imageUrl
    };
  } catch (error) {
    console.error('[menuManagementService] Error adding dish:', error);
    throw error;
  }
};

// Update dish by restaurant
export const updateDishByRestaurant = async (restaurantId: string, dishId: number, updates: Partial<MenuItem>): Promise<MenuItem | null> => {
  try {
    // Find product by ID (need to search since dishId is numeric)
    const dishes = await getDishesByRestaurant(restaurantId);
    const dish = dishes.find(d => d.id === dishId);
    if (!dish) {
      return null;
    }
    
    // Find the actual product ID from backend
    const restaurantParam = normalizeRestaurantId(restaurantId);
    const productsResponse = await api.get('/products', {
      params: { restaurant: restaurantParam }
    });
    const products = Array.isArray(productsResponse.data) ? productsResponse.data : [];
    const product = products.find((p: any) => p.name === dish.name);
    
    if (!product) {
      return null;
    }
    
    // Update product
    const updateData: any = {};
    if (updates.name) updateData.name = updates.name;
    if (updates.category) updateData.category = updates.category;
    if (updates.price !== undefined) updateData.price = updates.price;
    if (updates.status !== undefined) updateData.available = updates.status === 'Còn hàng';
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.image !== undefined) updateData.imageUrl = updates.image;
    
    const response = await api.patch(`/products/${product.id}`, updateData);
    const updated = response.data;
    
    return {
      id: dishId,
      name: updated.name,
      category: updated.category,
      price: updated.price,
      status: updated.available ? 'Còn hàng' as const : 'Hết hàng' as const,
      description: updated.description,
      image: updated.imageUrl
    };
  } catch (error) {
    console.error('[menuManagementService] Error updating dish:', error);
    return null;
  }
};

// Delete dish by restaurant
export const deleteDishByRestaurant = async (restaurantId: string, dishId: number): Promise<boolean> => {
  try {
    // Find product by dishId
    const dishes = await getDishesByRestaurant(restaurantId);
    const dish = dishes.find(d => d.id === dishId);
    if (!dish) {
      return false;
    }
    
    // Find the actual product ID
    const restaurantParam = normalizeRestaurantId(restaurantId);
    const productsResponse = await api.get('/products', {
      params: { restaurant: restaurantParam }
    });
    const products = Array.isArray(productsResponse.data) ? productsResponse.data : [];
    const product = products.find((p: any) => p.name === dish.name);
    
    if (!product) {
      return false;
    }
    
    await api.delete(`/products/${product.id}`);
    return true;
  } catch (error) {
    console.error('[menuManagementService] Error deleting dish:', error);
    return false;
  }
};

// Get order history by restaurant
export const getOrderHistoryByRestaurant = async (restaurantId: string): Promise<OrderHistoryItem[]> => {
  try {
    // Normalize restaurant ID using centralized utility
    const restaurantIdParam = normalizeToRestaurantId(restaurantId);
    
    // Use restaurantId= parameter for correct backend filtering
    const response = await api.get(`/orders?restaurantId=${restaurantIdParam}`);
    const orders = response.data;
    
    // Map to OrderHistoryItem format
    return orders.map((o: any) => ({
      id: o.id,
      customerName: o.customerName || o.name || '',
      dishes: (o.items || []).map((item: any) => item.name).join(', '),
      totalAmount: o.total || 0,
      orderDate: new Date(o.createdAt || Date.now()).toLocaleDateString('vi-VN'),
      status: mapOrderStatusToHistoryStatus(o.status)
    }));
  } catch (error) {
    console.error('[menuManagementService] Error fetching order history:', error);
    return [];
  }
};

// Helper to map order status
const mapOrderStatusToHistoryStatus = (status: string): 'Hoàn thành' | 'Đang xử lý' | 'Đã hủy' => {
  const statusLower = status?.toLowerCase() || '';
  if (statusLower.includes('delivered') || statusLower.includes('completed') || statusLower.includes('hoàn thành')) {
    return 'Hoàn thành';
  }
  if (statusLower.includes('cancelled') || statusLower.includes('hủy')) {
    return 'Đã hủy';
  }
  return 'Đang xử lý';
};

// Search dishes by restaurant
export const searchDishesByRestaurant = async (restaurantId: string, query: string, category?: string, status?: string): Promise<MenuItem[]> => {
  try {
    const dishes = await getDishesByRestaurant(restaurantId);
    let filtered = dishes;
    
    // Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(lowerQuery) ||
        d.description?.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Filter by category
    if (category && category !== 'Tất cả') {
      filtered = filtered.filter(d => d.category === category);
    }
    
    // Filter by status
    if (status) {
      filtered = filtered.filter(d => d.status === status);
    }
    
    return filtered;
  } catch (error) {
    console.error('[menuManagementService] Error searching dishes:', error);
    return [];
  }
};

// Get categories by restaurant
export const getCategoriesByRestaurant = async (restaurantId: string): Promise<string[]> => {
  try {
    const dishes = await getDishesByRestaurant(restaurantId);
    const categories = new Set<string>(['Tất cả']);
    dishes.forEach(d => {
      if (d.category) {
        categories.add(d.category);
      }
    });
    return Array.from(categories);
  } catch (error) {
    console.error('[menuManagementService] Error fetching categories:', error);
    return ['Tất cả'];
  }
};

// Get restaurant statistics
export const getRestaurantMenuStats = async (restaurantId: string): Promise<{
  totalDishes: number;
  availableDishes: number;
  outOfStockDishes: number;
  totalRevenue: number;
}> => {
  try {
    const dishes = await getDishesByRestaurant(restaurantId);
    
    // Normalize restaurant ID using centralized utility
    const restaurantIdParam = normalizeToRestaurantId(restaurantId);
    
    let totalRevenue = 0;
    try {
      // Use restaurantId= parameter for correct backend filtering
      const ordersResponse = await api.get(`/orders?restaurantId=${restaurantIdParam}`);
      if (ordersResponse.data) {
        const orders = ordersResponse.data;
        totalRevenue = orders.reduce((sum: number, o: any) => sum + (o.total || 0), 0);
      }
    } catch (e) {
      // Ignore revenue calculation errors
    }
    
    return {
      totalDishes: dishes.length,
      availableDishes: dishes.filter(d => d.status === 'Còn hàng').length,
      outOfStockDishes: dishes.filter(d => d.status === 'Hết hàng').length,
      totalRevenue
    };
  } catch (error) {
    console.error('[menuManagementService] Error fetching stats:', error);
    return {
      totalDishes: 0,
      availableDishes: 0,
      outOfStockDishes: 0,
      totalRevenue: 0
    };
  }
};
