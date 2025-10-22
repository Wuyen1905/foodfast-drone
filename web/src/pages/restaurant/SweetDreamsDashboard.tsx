import React, { useEffect } from 'react';
import RestaurantDashboardLayout from '@/components/restaurant/RestaurantDashboardLayout';
import MenuManagement from '@/components/restaurant/MenuManagement';
import OrderTracking from '@/components/restaurant/OrderTracking';
import { useAuth } from '@/context';

// SweetDreams Bakery Pink Theme
const SWEETDREAMS_THEME = {
  primary: '#E91E63',
  secondary: '#F06292',
  accent: '#F8BBD9',
  background: '#FCE4EC',
  light: '#FFF0F3'
};

const RESTAURANT_ID = 'rest_2';
const RESTAURANT_NAME = '🧁 SweetDreams Bakery';

const SweetDreamsDashboard: React.FC = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    console.log("🍰 [SweetDreamsDashboard] Component mounted!");
    console.log("👤 [SweetDreamsDashboard] Current user:", user);
    return () => {
      console.log("🍰 [SweetDreamsDashboard] Component unmounting");
    };
  }, [user]);

  return (
    <RestaurantDashboardLayout
      theme={SWEETDREAMS_THEME}
      restaurantName={RESTAURANT_NAME}
    >
      {(activeTab) => (
        <>
          {activeTab === 'menu' && (
            <MenuManagement
              restaurantId={RESTAURANT_ID}
              theme={SWEETDREAMS_THEME}
            />
          )}
          {activeTab === 'orders' && (
            <OrderTracking
              restaurantId={RESTAURANT_ID}
              theme={SWEETDREAMS_THEME}
            />
          )}
        </>
      )}
    </RestaurantDashboardLayout>
  );
};

export default SweetDreamsDashboard;
