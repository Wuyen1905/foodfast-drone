// Centralized Menu Service for unified data management
import { getProducts, getProduct, Product as ApiProduct } from '@/api/productApi';
import { Product } from '@/data/products';
import apiClient from '@/config/axios';

// Transform API product to frontend Product format
const transformProduct = (apiProduct: ApiProduct): Product => {
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    price: apiProduct.price,
    category: apiProduct.category,
    image: apiProduct.imageUrl || apiProduct.image || '',
    restaurant: apiProduct.restaurant as "SweetDreams" | "Aloha",
    available: apiProduct.available,
    description: apiProduct.description
  };
};

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  const apiProducts = await getProducts();
  return apiProducts.map(transformProduct);
};

// Get products by restaurant
export const getMenuByRestaurant = async (restaurant: "SweetDreams" | "Aloha"): Promise<Product[]> => {
  const apiProducts = await getProducts(restaurant);
  return apiProducts.map(transformProduct);
};

// Get available products by restaurant (for customer menu)
export const getAvailableMenuByRestaurant = async (restaurant: "SweetDreams" | "Aloha"): Promise<Product[]> => {
  const apiProducts = await getProducts(restaurant);
  return apiProducts
    .filter(p => p.available)
    .map(transformProduct);
};

// Add new menu item
export const addMenuItem = async (item: Omit<Product, 'id'>): Promise<Product> => {
  const response = await apiClient.post('/products', {
    name: item.name,
    price: item.price,
    category: item.category,
    imageUrl: item.image,
    restaurant: item.restaurant,
    available: item.available,
    description: item.description
  });
  
  return transformProduct(response.data);
};

// Update menu item (with restaurant validation)
export const updateMenuItem = async (
  id: string, 
  updatedItem: Partial<Product>,
  restaurantContext?: "SweetDreams" | "Aloha"
): Promise<Product | null> => {
  try {
    // First check if product exists and belongs to restaurant
    const existing = await getProduct(id);
    if (restaurantContext && existing.restaurant !== restaurantContext) {
      console.warn(`Restaurant ${restaurantContext} attempted to update product from ${existing.restaurant}`);
      return null;
    }
    
    const response = await apiClient.patch(`/products/${id}`, {
      name: updatedItem.name,
      price: updatedItem.price,
      category: updatedItem.category,
      imageUrl: updatedItem.image,
      available: updatedItem.available,
      description: updatedItem.description
      // Don't allow changing restaurant
    });
    
    return transformProduct(response.data);
  } catch (error) {
    console.error('Failed to update menu item:', error);
    return null;
  }
};

// Delete menu item (with restaurant validation)
export const deleteMenuItem = async (
  id: string,
  restaurantContext?: "SweetDreams" | "Aloha"
): Promise<boolean> => {
  try {
    // First check if product exists and belongs to restaurant
    const existing = await getProduct(id);
    if (restaurantContext && existing.restaurant !== restaurantContext) {
      console.warn(`Restaurant ${restaurantContext} attempted to delete product from ${existing.restaurant}`);
      return false;
    }
    
    await apiClient.delete(`/products/${id}`);
    return true;
  } catch (error) {
    console.error('Failed to delete menu item:', error);
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
  const apiProducts = await getProducts(restaurant);
  let filtered = apiProducts.map(transformProduct);
  
  if (availableOnly) {
    filtered = filtered.filter(product => product.available);
  }
  
  if (query) {
    const searchQuery = query.toLowerCase();
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(searchQuery) ||
      product.description?.toLowerCase().includes(searchQuery)
    );
  }
  
  if (category && category !== 'Tất cả') {
    filtered = filtered.filter(product => product.category === category);
  }
  
  return filtered;
};

// Get categories by restaurant
export const getCategoriesByRestaurant = async (restaurant: "SweetDreams" | "Aloha"): Promise<string[]> => {
  const apiProducts = await getProducts(restaurant);
  const categories = [...new Set(apiProducts.map(product => product.category))];
  
  return ['Tất cả', ...categories.sort()];
};

// Get restaurant menu statistics
export const getRestaurantMenuStats = async (restaurant: "SweetDreams" | "Aloha"): Promise<{
  totalDishes: number;
  availableDishes: number;
  outOfStockDishes: number;
  categories: number;
}> => {
  const apiProducts = await getProducts(restaurant);
  
  return {
    totalDishes: apiProducts.length,
    availableDishes: apiProducts.filter(p => p.available).length,
    outOfStockDishes: apiProducts.filter(p => !p.available).length,
    categories: new Set(apiProducts.map(p => p.category)).size
  };
};

// Toggle product availability (with restaurant validation)
export const toggleProductAvailability = async (
  id: string,
  restaurantContext?: "SweetDreams" | "Aloha"
): Promise<Product | null> => {
  try {
    // First check if product exists and belongs to restaurant
    const existing = await getProduct(id);
    if (restaurantContext && existing.restaurant !== restaurantContext) {
      console.warn(`Restaurant ${restaurantContext} attempted to toggle product from ${existing.restaurant}`);
      return null;
    }
    
    const response = await apiClient.patch(`/products/${id}`, {
      available: !existing.available
    });
    
    return transformProduct(response.data);
  } catch (error) {
    console.error('Failed to toggle product availability:', error);
    return null;
  }
};

// Get product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const apiProduct = await getProduct(id);
    return transformProduct(apiProduct);
  } catch (error) {
    console.error('Failed to get product:', error);
    return null;
  }
};

// Initialize default data - no longer needed, data comes from backend
export const initializeDefaultData = (): void => {
  // No-op: data is now loaded from backend
};
