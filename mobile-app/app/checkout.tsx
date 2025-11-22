import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, AppState } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { api } from '@/api';
import { realtimeSocket } from '@/realtime/socket';
import { saveCheckoutInfo, loadCheckoutInfo } from '@/hooks/useAppState';

// Note: Removed "theme" import because @/theme does not exist in mobile app

export default function Checkout() {
  const params = useLocalSearchParams<{ cartItems?: string; customerInfo?: string; restaurantCode?: string }>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [cartItems, setCartItems] = useState<any[]>([]);

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

  // Restore customer info from storage on mount (resilience to app background/foreground)
  useEffect(() => {
    const restoreInfo = async () => {
      const saved = await loadCheckoutInfo();
      if (saved && params.customerInfo) {
        // Use saved info if available
      }
    };
    restoreInfo();
  }, []);

  useEffect(() => {
    fetchLatestCart();
  }, [fetchLatestCart]);

  // Save customer info when app goes to background (resilience to phone calls)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        if (params?.customerInfo) {
          await saveCheckoutInfo(JSON.parse(params.customerInfo));
        }
      }
    });
    return () => subscription.remove();
  }, [params?.customerInfo]);

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
      // Restore customer info from storage or use params/default
      const savedInfo = await loadCheckoutInfo();
      const customerInfo = params?.customerInfo 
        ? JSON.parse(params.customerInfo) 
        : savedInfo || {
            name: 'Guest Customer',
            phone: '0900000000',
            address: '123 Main Street',
          };
      
      // Save customer info for persistence
      await saveCheckoutInfo(customerInfo);

      const total = cartItems.reduce((sum: number, item: any) => {
        return sum + (item.price || 0) * (item.qty || 1);
      }, 0);

      const orderPayload = {
        customerName: customerInfo.name,
        phone: customerInfo.phone,
        address: customerInfo.address,
        restaurantCode: params?.restaurantCode || 'SweetDreams',
        totalPrice: total,
        items: cartItems.map((item: any) => ({
          productId: item.id || item.productId || 0,
          productName: item.name || item.productName || '',
          unitPrice: item.price || 0,
          quantity: item.qty || 1,
        })),
      };

      const res = await api.post('/orders', orderPayload);
      
      // Generate local fallback confirmation code in FD-XXXX format
      const generateConfirmationCode = () => {
        const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit number
        return `FD-${randomNum}`;
      };
      
      // Detect if this is a multi-order split result
      const isMultiOrder = res.data.orders && Array.isArray(res.data.orders) && res.data.orders.length > 0;
      
      if (isMultiOrder) {
        // Multi-order (split result)
        const splitResult = {
          paymentSessionId: res.data.paymentSessionId || `SESSION-${Date.now()}`,
          orders: res.data.orders || [],
          totalAmount: res.data.totalAmount || total
        };
        
        const confirmationCode = res.data.paymentSessionId || res.data.paymentCode || generateConfirmationCode();
        
        console.log(`[SYNC OK] Mobile created ${splitResult.orders.length} order(s) in shared API`);
        console.log(`[PAYMENT] Confirmation code: ${confirmationCode}`);
        
        // Navigate to confirmation screen with summary
        router.push({
          pathname: '/order-confirmation',
          params: {
            summary: JSON.stringify(splitResult),
            confirmationCode: String(confirmationCode),
          },
        });
      } else {
        // Single order (existing behavior)
        const orderId = res.data.id || res.data.orderId || `ORD-${Date.now()}`;
        const confirmationCode = res.data.paymentSessionId || res.data.paymentCode || generateConfirmationCode();

        console.log(`[SYNC OK] Mobile created order ${orderId} in shared API`);
        console.log(`[PAYMENT] Confirmation code: ${confirmationCode}`);
        
        // Navigate to confirmation screen with order details
        router.push({
          pathname: '/order-confirmation',
          params: {
            orderId,
            confirmationCode: String(confirmationCode),
          },
        });
      }
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
      <Pressable disabled={loading} onPress={pay} style={styles.cta}>
        <Text style={{ color: '#fff' }}>
          {loading ? 'Processing...' : 'Pay now'}
        </Text>
      </Pressable>
      {message ? <Text style={{ color: '#ff6600', marginTop: 8 }}>{message}</Text> : null}
    </View>
  );
}

const PRIMARY_COLOR = '#ff6600';

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8, color: PRIMARY_COLOR },
  cta: { marginTop: 12, backgroundColor: PRIMARY_COLOR, paddingVertical: 12, borderRadius: 8, alignItems: 'center' }
});
