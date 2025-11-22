// Centralized Menu Service for unified data management
import { Product } from '@/data/products';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Map restaurant name to backend restaurant identifier
const mapRestaurantToBackend = (restaurant: "SweetDreams" | "Aloha"): string => {
  const map: Record<string, string> = {
    'SweetDreams': 'SweetDreams',
    'Aloha': 'Aloha'
  };
  return map[restaurant] || restaurant;
};

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiClient.get('/products');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('[menuService] Error fetching all products:', error);
    return [];
  }
};

// Get products by restaurant
export const getMenuByRestaurant = async (restaurant: "SweetDreams" | "Aloha"): Promise<Product[]> => {
  try {
    const restaurantParam = mapRestaurantToBackend(restaurant);
    const response = await apiClient.get('/products', {
      params: { restaurant: restaurantParam }
    });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('[menuService] Error fetching menu by restaurant:', error);
    return [];
  }
};

// Get available products by restaurant (for customer menu)
export const getAvailableMenuByRestaurant = async (restaurant: "SweetDreams" | "Aloha"): Promise<Product[]> => {
  try {
    const restaurantParam = mapRestaurantToBackend(restaurant);
    const response = await apiClient.get('/products', {
      params: { restaurant: restaurantParam }
    });
    const products = Array.isArray(response.data) ? response.data : [];
    // Filter to only available products
    return products.filter((p: Product) => p.available !== false);
  } catch (error) {
    console.error('[menuService] Error fetching available menu:', error);
    return [];
  }
};

// Add new menu item
export const addMenuItem = async (item: Omit<Product, 'id'>): Promise<Product> => {
  try {
    // Generate ID if not provided
    const productWithId = {
      ...item,
      id: item.id || `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    const response = await apiClient.post('/products', productWithId);
    return response.data;
  } catch (error) {
    console.error('[menuService] Error adding menu item:', error);
    throw error;
  }
};

// Update menu item (with restaurant validation)
export const updateMenuItem = async (
  id: string, 
  updatedItem: Partial<Product>,
  restaurantContext?: "SweetDreams" | "Aloha"
): Promise<Product | null> => {
  try {
    const response = await apiClient.patch(`/products/${id}`, updatedItem);
    return response.data;
  } catch (error) {
    console.error('[menuService] Error updating menu item:', error);
    return null;
  }
};

// Delete menu item (with restaurant validation)
export const deleteMenuItem = async (
  id: string,
  restaurantContext?: "SweetDreams" | "Aloha"
): Promise<boolean> => {
  try {
    await apiClient.delete(`/products/${id}`);
    return true;
  } catch (error) {
    console.error('[menuService] Error deleting menu item:', error);
    return false;
  }
};

// Search products by restaurant
export const searchProductsByRestaurant = async (
  restaurant: "SweetDreams" | "Aloha",
  query: string,
  category?: string,
  availableOnly: boolean = false
): Promise<Product[]> => {
  try {
    const restaurantParam = mapRestaurantToBackend(restaurant);
    const response = await apiClient.get('/products', {
      params: { restaurant: restaurantParam }
    });
    let products = Array.isArray(response.data) ? response.data : [];
    
    // Filter by availability if needed
    if (availableOnly) {
      products = products.filter((p: Product) => p.available !== false);
    }
    
    // Filter by category if provided
    if (category && category !== 'Tất cả') {
      products = products.filter((p: Product) => p.category === category);
    }
    
    // Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      products = products.filter((p: Product) => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description?.toLowerCase().includes(lowerQuery)
      );
    }
    
    return products;
  } catch (error) {
    console.error('[menuService] Error searching products:', error);
    return [];
  }
};

// Get categories by restaurant
export const getCategoriesByRestaurant = async (restaurant: "SweetDreams" | "Aloha"): Promise<string[]> => {
  try {
    const restaurantParam = mapRestaurantToBackend(restaurant);
    const response = await apiClient.get('/products', {
      params: { restaurant: restaurantParam }
    });
    const products = Array.isArray(response.data) ? response.data : [];
    const categories = new Set<string>(['Tất cả']);
    products.forEach((p: Product) => {
      if (p.category) {
        categories.add(p.category);
      }
    });
    return Array.from(categories);
  } catch (error) {
    console.error('[menuService] Error fetching categories:', error);
    return ['Tất cả'];
  }
};

// Get restaurant menu statistics
export const getRestaurantMenuStats = async (restaurant: "SweetDreams" | "Aloha"): Promise<{
  totalDishes: number;
  availableDishes: number;
  outOfStockDishes: number;
  categories: number;
}> => {
  try {
    const restaurantParam = mapRestaurantToBackend(restaurant);
    const response = await apiClient.get('/products', {
      params: { restaurant: restaurantParam }
    });
    const products = Array.isArray(response.data) ? response.data : [];
    const categories = new Set<string>();
    
    products.forEach((p: Product) => {
      if (p.category) {
        categories.add(p.category);
      }
    });
    
    return {
      totalDishes: products.length,
      availableDishes: products.filter((p: Product) => p.available !== false).length,
      outOfStockDishes: products.filter((p: Product) => p.available === false).length,
      categories: categories.size
    };
  } catch (error) {
    console.error('[menuService] Error fetching menu stats:', error);
    return {
      totalDishes: 0,
      availableDishes: 0,
      outOfStockDishes: 0,
      categories: 0
    };
  }
};

// Toggle product availability (with restaurant validation)
export const toggleProductAvailability = async (
  id: string,
  restaurantContext?: "SweetDreams" | "Aloha"
): Promise<Product | null> => {
  try {
    // First get the product to get current availability
    const getResponse = await apiClient.get(`/products/${id}`);
    const currentProduct = getResponse.data;
    
    // Toggle availability
    const updatedProduct = await updateMenuItem(id, {
      available: !currentProduct.available
    }, restaurantContext);
    
    return updatedProduct;
  } catch (error) {
    console.error('[menuService] Error toggling product availability:', error);
    return null;
  }
};

// Get product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('[menuService] Error fetching product by ID:', error);
    return null;
  }
};
