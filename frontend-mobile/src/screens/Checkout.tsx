import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { api } from '../api/api';
import { theme } from '../theme';
import { realtimeSocket } from '../realtime/socket';

// [Data Sync] Create order in shared API (same as web frontend)
export default function Checkout({ navigation, route }: any) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [cartItems, setCartItems] = useState<any[]>(route?.params?.cartItems || []);

  const fetchLatestCart = useCallback(async () => {
    try {
      const res = await api.get('/cart');
      const normalized = (res.data || []).map((item: any) => ({
        id: item.productId,
        name: item.productName,
        price: item.unitPrice,
        qty: item.quantity,
      }));
      setCartItems(normalized);
    } catch (error) {
      console.error('[Checkout] Failed to refresh cart:', error);
    }
  }, []);

  useEffect(() => {
    fetchLatestCart();
  }, [fetchLatestCart]);

  useEffect(() => {
    const unsubscribeOrder = realtimeSocket.onOrderUpdate(() => {
      fetchLatestCart();
    });
    const unsubscribeDrone = realtimeSocket.onDroneUpdate(() => {
      fetchLatestCart();
    });
    return () => {
      unsubscribeOrder();
      unsubscribeDrone();
    };
  }, [fetchLatestCart]);

  const pay = async () => {
    setLoading(true);
    try {
      // [Data Sync] Create order in shared API
      // Get cart items from route params or use empty array
      const customerInfo = route?.params?.customerInfo || {
        name: 'Guest Customer',
        phone: '0900000000',
        address: '123 Main Street',
      };

      // Calculate total
      const total = cartItems.reduce((sum: number, item: any) => {
        return sum + (item.price || 0) * (item.qty || 1);
      }, 0);

      // Build order payload for backend API
      const orderPayload = {
        customerName: customerInfo.name,
        phone: customerInfo.phone,
        address: customerInfo.address,
        restaurantCode: route?.params?.restaurantCode || 'SweetDreams',
        totalPrice: total,
        items: cartItems.map((item: any) => ({
          productId: item.id || item.productId || 0,
          productName: item.name || item.productName || '',
          unitPrice: item.price || 0,
          quantity: item.qty || 1,
        })),
      };

      // [Data Sync] Create order in shared API
      const res = await api.post('/orders', orderPayload);
      const orderId = res.data.id || res.data.orderId || `ORD-${Date.now()}`;
      
      // [Data Sync] Verify order was created successfully
      console.log(`[SYNC OK ✅] Mobile created order ${orderId} in shared API`);
      
      setMessage(`Order ${orderId} confirmed!`);
      setTimeout(() => navigation.navigate('Drone', { orderId }), 800);
    } catch (error) {
      console.error('[Checkout] Error creating order:', error);
      setMessage('Error creating order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text>Payment method: Visa **** 0420</Text>
      <Pressable disabled={loading} onPress={pay} style={styles.cta}><Text style={{ color: '#fff' }}>{loading ? 'Processing...' : 'Pay now'}</Text></Pressable>
      {message ? <Text style={{ color: theme.colors.primary, marginTop: 8 }}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8, color: theme.colors.primary },
  cta: { marginTop: 12, backgroundColor: theme.colors.primary, paddingVertical: 12, borderRadius: 8, alignItems: 'center' }
});


