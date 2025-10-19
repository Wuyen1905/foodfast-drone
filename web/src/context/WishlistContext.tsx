import React, { createContext, useContext, useEffect, useState } from 'react';

type WishlistContextValue = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }>= ({ children }) => {
  const [ids, setIds] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('wishlist') || '[]'); } catch { return []; }
  });
  useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(ids)); }, [ids]);

  const toggle = (id: string) => setIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const has = (id: string) => ids.includes(id);

  return <WishlistContext.Provider value={{ ids, toggle, has }}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};


