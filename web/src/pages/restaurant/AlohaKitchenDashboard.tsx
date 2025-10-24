import React, { useEffect } from 'react';
import RestaurantDashboardLayout from '@/components/restaurant/RestaurantDashboardLayout';
import OrderTracking from '@/components/restaurant/OrderTracking';
import { useAuth } from '@/context';

// Aloha Kitchen Asian Fusion Theme (Warm Orange-Yellow)
const ALOHA_THEME = {
  primary: '#ffcc70',
  secondary: '#ff9671',
  accent: '#ffc75f',
  background: '#FFF8F0',
  light: '#FFFEF8'
};

const RESTAURANT_ID = 'restaurant_2';
const RESTAURANT_NAME = '🌺 Aloha Kitchen';

const AlohaKitchenDashboard: React.FC = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    console.log("🌺 [AlohaKitchenDashboard] Component mounted!");
    console.log("👤 [AlohaKitchenDashboard] Current user:", user);
    return () => {
      console.log("🌺 [AlohaKitchenDashboard] Component unmounting");
    };
  }, [user]);

  return (
    <RestaurantDashboardLayout
      theme={ALOHA_THEME}
      restaurantName={RESTAURANT_NAME}
    >
      {(activeTab) => (
        <>
          {activeTab === 'orders' && (
            <OrderTracking
              restaurantId={RESTAURANT_ID}
              theme={ALOHA_THEME}
            />
          )}
        </>
      )}
    </RestaurantDashboardLayout>
  );
};

export default AlohaKitchenDashboard;
