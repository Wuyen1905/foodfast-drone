// Restaurant Selection Context
// Allows customers to select which restaurant they want to view/order from

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type RestaurantName = "SweetDreams" | "Aloha";

interface RestaurantSelectionContextType {
  selectedRestaurant: RestaurantName;
  setSelectedRestaurant: (restaurant: RestaurantName) => void;
  availableRestaurants: RestaurantName[];
}

const RestaurantSelectionContext = createContext<RestaurantSelectionContextType | undefined>(undefined);

export const RestaurantSelectionProvider = ({ children }: { children: ReactNode }) => {
  // Default to SweetDreams if no selection
  const [selectedRestaurant, setSelectedRestaurantState] = useState<RestaurantName>(() => {
    const saved = localStorage.getItem('selectedRestaurant');
    if (saved === 'SweetDreams' || saved === 'Aloha') {
      return saved;
    }
    return 'SweetDreams';
  });

  // Save to localStorage when selection changes
  useEffect(() => {
    localStorage.setItem('selectedRestaurant', selectedRestaurant);
  }, [selectedRestaurant]);

  const setSelectedRestaurant = (restaurant: RestaurantName) => {
    setSelectedRestaurantState(restaurant);
  };

  const availableRestaurants: RestaurantName[] = ['SweetDreams', 'Aloha'];

  return (
    <RestaurantSelectionContext.Provider
      value={{
        selectedRestaurant,
        setSelectedRestaurant,
        availableRestaurants
      }}
    >
      {children}
    </RestaurantSelectionContext.Provider>
  );
};

export const useRestaurantSelection = (): RestaurantSelectionContextType => {
  const context = useContext(RestaurantSelectionContext);
  if (!context) {
    throw new Error('useRestaurantSelection must be used within RestaurantSelectionProvider');
  }
  return context;
};

