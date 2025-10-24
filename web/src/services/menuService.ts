// Centralized Menu Service for unified data management
import products, { Product } from '@/data/products';

// Simulate API delay
const simulateDelay = (min: number = 300, max: number = 800): Promise<void> => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Load products from localStorage or use default
const loadProducts = (): Product[] => {
  const stored = localStorage.getItem("foodfast_products");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error("Error parsing stored products:", error);
      return products;
    }
  }
  return products;
};

// Save products to localStorage
const saveProducts = (productsToSave: Product[]): void => {
  localStorage.setItem("foodfast_products", JSON.stringify(productsToSave));
};

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  await simulateDelay();
  return loadProducts();
};

// Get products by restaurant
export const getMenuByRestaurant = async (restaurant: "SweetDreams" | "Aloha"): Promise<Product[]> => {
  await simulateDelay();
  const allProducts = loadProducts();
  return allProducts.filter(product => product.restaurant === restaurant);
};

// Get available products by restaurant (for customer menu)
export const getAvailableMenuByRestaurant = async (restaurant: "SweetDreams" | "Aloha"): Promise<Product[]> => {
  await simulateDelay();
  const allProducts = loadProducts();
  return allProducts.filter(product => 
    product.restaurant === restaurant && product.available
  );
};

// Add new menu item
export const addMenuItem = async (item: Omit<Product, 'id'>): Promise<Product> => {
  await simulateDelay();
  
  const allProducts = loadProducts();
  const newId = `${item.restaurant.toLowerCase().replace('sweetdreams', 'sd').replace('aloha', 'ak')}-${Date.now()}`;
  
  const newItem: Product = {
    ...item,
    id: newId
  };
  
  allProducts.push(newItem);
  saveProducts(allProducts);
  
  return newItem;
};

// Update menu item
export const updateMenuItem = async (id: string, updatedItem: Partial<Product>): Promise<Product | null> => {
  await simulateDelay();
  
  const allProducts = loadProducts();
  const index = allProducts.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  allProducts[index] = { ...allProducts[index], ...updatedItem };
  saveProducts(allProducts);
  
  return allProducts[index];
};

// Delete menu item
export const deleteMenuItem = async (id: string): Promise<boolean> => {
  await simulateDelay();
  
  const allProducts = loadProducts();
  const index = allProducts.findIndex(p => p.id === id);
  
  if (index === -1) return false;
  
  allProducts.splice(index, 1);
  saveProducts(allProducts);
  
  return true;
};

// Search products by restaurant
export const searchProductsByRestaurant = async (
  restaurant: "SweetDreams" | "Aloha",
  query: string,
  category?: string,
  availableOnly: boolean = false
): Promise<Product[]> => {
  await simulateDelay();
  
  const allProducts = loadProducts();
  let filtered = allProducts.filter(product => product.restaurant === restaurant);
  
  if (availableOnly) {
    filtered = filtered.filter(product => product.available);
  }
  
  if (query) {
    const searchQuery = query.toLowerCase();
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(searchQuery) ||
      product.description?.toLowerCase().includes(searchQuery) ||
      product.ingredients?.some(ingredient => 
        ingredient.toLowerCase().includes(searchQuery)
      )
    );
  }
  
  if (category && category !== 'Tất cả') {
    filtered = filtered.filter(product => product.category === category);
  }
  
  return filtered;
};

// Get categories by restaurant
export const getCategoriesByRestaurant = async (restaurant: "SweetDreams" | "Aloha"): Promise<string[]> => {
  await simulateDelay();
  
  const allProducts = loadProducts();
  const restaurantProducts = allProducts.filter(product => product.restaurant === restaurant);
  const categories = [...new Set(restaurantProducts.map(product => product.category))];
  
  return ['Tất cả', ...categories.sort()];
};

// Get restaurant menu statistics
export const getRestaurantMenuStats = async (restaurant: "SweetDreams" | "Aloha"): Promise<{
  totalDishes: number;
  availableDishes: number;
  outOfStockDishes: number;
  categories: number;
}> => {
  await simulateDelay();
  
  const allProducts = loadProducts();
  const restaurantProducts = allProducts.filter(product => product.restaurant === restaurant);
  
  return {
    totalDishes: restaurantProducts.length,
    availableDishes: restaurantProducts.filter(p => p.available).length,
    outOfStockDishes: restaurantProducts.filter(p => !p.available).length,
    categories: new Set(restaurantProducts.map(p => p.category)).size
  };
};

// Toggle product availability
export const toggleProductAvailability = async (id: string): Promise<Product | null> => {
  await simulateDelay();
  
  const allProducts = loadProducts();
  const index = allProducts.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  allProducts[index].available = !allProducts[index].available;
  saveProducts(allProducts);
  
  return allProducts[index];
};

// Get product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  await simulateDelay();
  
  const allProducts = loadProducts();
  return allProducts.find(product => product.id === id) || null;
};

// Initialize default data if localStorage is empty
export const initializeDefaultData = (): void => {
  const stored = localStorage.getItem("foodfast_products");
  if (!stored) {
    saveProducts(products);
  }
};
