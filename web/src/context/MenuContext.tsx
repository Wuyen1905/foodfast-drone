import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/data/products';
import { 
  getAllProducts, 
  getMenuByRestaurant, 
  getAvailableMenuByRestaurant,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleProductAvailability,
  initializeDefaultData
} from '@/services/menuService';
import toast from 'react-hot-toast';

interface MenuContextType {
  // Products state
  allProducts: Product[];
  sweetDreamsProducts: Product[];
  alohaProducts: Product[];
  sweetDreamsAvailableProducts: Product[];
  alohaAvailableProducts: Product[];
  
  // Loading states
  loading: boolean;
  
  // Actions
  refreshProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product | null>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<Product | null>;
  deleteProduct: (id: string) => Promise<boolean>;
  toggleAvailability: (id: string) => Promise<Product | null>;
  
  // Restaurant-specific actions
  getRestaurantProducts: (restaurant: "SweetDreams" | "Aloha") => Product[];
  getRestaurantAvailableProducts: (restaurant: "SweetDreams" | "Aloha") => Product[];
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [sweetDreamsProducts, setSweetDreamsProducts] = useState<Product[]>([]);
  const [alohaProducts, setAlohaProducts] = useState<Product[]>([]);
  const [sweetDreamsAvailableProducts, setSweetDreamsAvailableProducts] = useState<Product[]>([]);
  const [alohaAvailableProducts, setAlohaAvailableProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize default data
  useEffect(() => {
    initializeDefaultData();
  }, []);

  // Load all products
  const loadProducts = async () => {
    try {
      setLoading(true);
      const [all, sweetDreams, aloha, sweetDreamsAvailable, alohaAvailable] = await Promise.all([
        getAllProducts(),
        getMenuByRestaurant("SweetDreams"),
        getMenuByRestaurant("Aloha"),
        getAvailableMenuByRestaurant("SweetDreams"),
        getAvailableMenuByRestaurant("Aloha")
      ]);

      setAllProducts(all);
      setSweetDreamsProducts(sweetDreams);
      setAlohaProducts(aloha);
      setSweetDreamsAvailableProducts(sweetDreamsAvailable);
      setAlohaAvailableProducts(alohaAvailable);
    } catch (error) {
      console.error("Error loading products:", error);
      toast.error("Không thể tải dữ liệu menu");
    } finally {
      setLoading(false);
    }
  };

  // Refresh products
  const refreshProducts = async () => {
    await loadProducts();
  };

  // Add product
  const addProduct = async (product: Omit<Product, 'id'>): Promise<Product | null> => {
    try {
      const newProduct = await addMenuItem(product);
      if (newProduct) {
        await refreshProducts();
        toast.success("Món ăn đã được đồng bộ vào thực đơn!");
        return newProduct;
      }
      return null;
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Không thể thêm món ăn");
      return null;
    }
  };

  // Update product
  const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product | null> => {
    try {
      const updatedProduct = await updateMenuItem(id, updates);
      if (updatedProduct) {
        await refreshProducts();
        toast.success("Món ăn đã được cập nhật và đồng bộ!");
        return updatedProduct;
      }
      return null;
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Không thể cập nhật món ăn");
      return null;
    }
  };

  // Delete product
  const deleteProduct = async (id: string): Promise<boolean> => {
    try {
      const success = await deleteMenuItem(id);
      if (success) {
        await refreshProducts();
        toast.success("Món ăn đã được xóa khỏi thực đơn!");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Không thể xóa món ăn");
      return false;
    }
  };

  // Toggle availability
  const toggleAvailability = async (id: string): Promise<Product | null> => {
    try {
      const updatedProduct = await toggleProductAvailability(id);
      if (updatedProduct) {
        await refreshProducts();
        const status = updatedProduct.available ? "có sẵn" : "hết hàng";
        toast.success(`Món ăn đã được cập nhật trạng thái: ${status}`);
        return updatedProduct;
      }
      return null;
    } catch (error) {
      console.error("Error toggling availability:", error);
      toast.error("Không thể cập nhật trạng thái món ăn");
      return null;
    }
  };

  // Get restaurant products
  const getRestaurantProducts = (restaurant: "SweetDreams" | "Aloha"): Product[] => {
    return restaurant === "SweetDreams" ? sweetDreamsProducts : alohaProducts;
  };

  // Get restaurant available products
  const getRestaurantAvailableProducts = (restaurant: "SweetDreams" | "Aloha"): Product[] => {
    return restaurant === "SweetDreams" ? sweetDreamsAvailableProducts : alohaAvailableProducts;
  };

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  const value: MenuContextType = {
    allProducts,
    sweetDreamsProducts,
    alohaProducts,
    sweetDreamsAvailableProducts,
    alohaAvailableProducts,
    loading,
    refreshProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleAvailability,
    getRestaurantProducts,
    getRestaurantAvailableProducts
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

export default MenuContext;
