import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import apiClient from '../config/axios';
import { realtimeSocket } from '../realtime/socket';

export type CartItem = { id: string; name: string; image?: string; price: number; qty: number };
type CartContextValue = {
  items: CartItem[];
  add: (id: string, qty?: number, snapshot?: { name: string; image?: string; price: number }) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode; priceMap: Record<string, number> }>
= ({ children, priceMap }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Normalize backend cart item to CartItem format
  const normalizeCartItem = (item: any): CartItem => {
    return {
      id: item.productId || item.id,
      qty: item.quantity || item.qty || 0,
      name: item.productName || item.name || item.id,
      image: item.image,
      price: item.price || 0,
    };
  };

  // Load cart from backend
  const loadCart = async () => {
    try {
      const response = await apiClient.get('/api/cart');
      const backendItems = response.data || [];
      const normalizedItems = Array.isArray(backendItems)
        ? backendItems.map(normalizeCartItem)
        : [];
      setItems(normalizedItems);
    } catch (error) {
      console.error('Failed to load cart:', error);
      setItems([]);
    }
  };

  // Load cart on mount
  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    const unsubscribeCart = realtimeSocket.onCartUpdate(() => {
      loadCart();
    });
    return () => {
      unsubscribeCart();
    };
  }, []);

  const add = async (id: string, qty: number = 1, snapshot?: { name: string; image?: string; price: number }) => {
    try {
      await apiClient.post('/api/cart/add', {
        productId: id,
        quantity: qty,
        productName: snapshot?.name,
        image: snapshot?.image,
        price: snapshot?.price ?? priceMap[id] ?? 0,
      });
      await loadCart();
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  const remove = async (id: string) => {
    try {
      await apiClient.delete(`/api/cart/${id}`);
      await loadCart();
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const setQty = async (id: string, qty: number) => {
    try {
      // If qty is 0 or less, remove the item
      if (qty <= 0) {
        await remove(id);
        return;
      }
      // For setting quantity, we'll add the item with the new quantity
      // This assumes the backend handles quantity updates via add endpoint
      // If not, we may need to remove and re-add, or use a PUT endpoint
      const existingItem = items.find(i => i.id === id);
      if (existingItem) {
        await apiClient.post('/api/cart/add', {
          productId: id,
          quantity: qty,
          productName: existingItem.name,
          image: existingItem.image,
          price: existingItem.price,
        });
        await loadCart();
      }
    } catch (error) {
      console.error('Failed to update item quantity:', error);
    }
  };

  const clear = async () => {
    try {
      await apiClient.delete('/api/cart/clear');
      await loadCart();
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.qty) || 0;
      return sum + price * qty;
    }, 0);
  }, [items]);
  
  
  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};


