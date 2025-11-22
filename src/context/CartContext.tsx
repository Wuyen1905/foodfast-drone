import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type CartItem = { 
  id: string; 
  name: string; 
  image?: string; 
  price: number; 
  qty: number;
  restaurantId?: string;
  restaurant?: string;
};
type CartContextValue = {
  items: CartItem[];
  add: (id: string, qty?: number, snapshot?: { name: string; image?: string; price: number; restaurantId?: string; restaurant?: string }) => void;
  remove: (id: string) => void;
  removeItems: (itemsToRemove: CartItem[]) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode; priceMap: Record<string, number> }>
= ({ children, priceMap }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(items)); }, [items]);

  const add = (id: string, qty: number = 1, snapshot?: { name: string; image?: string; price: number; restaurantId?: string; restaurant?: string }) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) {
        // Ensure existing item has price, if missing try to get from priceMap
        return prev.map(i => {
          if (i.id === id) {
            const updatedPrice = i.price && i.price > 0 ? i.price : (priceMap[id] ?? snapshot?.price ?? 0);
            return { ...i, qty: i.qty + qty, price: updatedPrice };
          }
          return i;
        });
      }
      // Ensure price is always set - prioritize snapshot, then priceMap, then throw error
      const price = snapshot?.price ?? priceMap[id];
      if (price === undefined || price === null || price <= 0) {
        console.error(`[CartContext] Missing or invalid price for item ${id}. snapshot.price=${snapshot?.price}, priceMap[id]=${priceMap[id]}`);
        throw new Error(`Cannot add item to cart: price is missing or invalid for item ${id}`);
      }
      return [...prev, { 
        id, 
        qty, 
        name: snapshot?.name ?? id, 
        image: snapshot?.image, 
        price: Number(price),
        restaurantId: snapshot?.restaurantId,
        restaurant: snapshot?.restaurant
      }];
    });
  };
  const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  const removeItems = (itemsToRemove: CartItem[]) => {
    setItems(prev => {
      const removeIds = new Set(itemsToRemove.map(item => item.id));
      return prev.filter(i => !removeIds.has(i.id));
    });
  };
  const setQty = (id: string, qty: number) => setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  const clear = () => setItems([]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.qty) || 0;
      return sum + price * qty;
    }, 0);
  }, [items]);
  
  
  return (
    <CartContext.Provider value={{ items, add, remove, removeItems, setQty, clear, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};


