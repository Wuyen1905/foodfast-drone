import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ScrollView } from 'react-native';
import { api } from '../api/mock';
import { theme } from '../theme';
import { realtimeSocket } from '../realtime/socket';

type Dish = { id: string; name: string; price: number; image: string };
const dishCache: Record<string, Dish> = {};

export default function Cart({ navigation }: any) {
  const [cart, setCart] = useState<{ id: string; qty: number; cartItemId?: number }[]>([]);

  const loadProducts = useCallback(async () => {
    const res = await api.get('/products');
    res.data.forEach((product: any) => {
      dishCache[String(product.id)] = {
        id: String(product.id),
        name: product.name,
        price: Number(product.price) || 0,
        image: product.imageUrl || product.image,
      };
    });
  }, []);

  const loadCart = useCallback(async () => {
    const res = await api.get('/cart');
    const normalized = (res.data || []).map((item: any) => ({
      id: String(item.productId),
      qty: item.quantity || 1,
      cartItemId: item.id,
    }));
    setCart(normalized);
  }, []);

  useEffect(() => { loadProducts(); }, [loadProducts]);
  useEffect(() => { loadCart(); }, [loadCart]);

  useEffect(() => {
    const unsubscribeOrder = realtimeSocket.onOrderUpdate(() => {
      loadCart();
    });
    const unsubscribeDrone = realtimeSocket.onDroneUpdate(() => {
      loadCart();
    });
    return () => {
      unsubscribeOrder();
      unsubscribeDrone();
    };
  }, [loadCart]);

  useEffect(() => {
    const unsubscribeCart = realtimeSocket.onCartUpdate(() => {
      loadCart();
    });
    return () => {
      unsubscribeCart();
    };
  }, []);

  const total = useMemo(() => cart.reduce((acc, c) => acc + (dishCache[c.id]?.price || 0) * c.qty, 0), [cart]);

  const removeItem = async (productId: string) => {
    const target = cart.find(item => item.id === productId);
    if (!target?.cartItemId) {
      return;
    }
    await api.delete(`/cart/${target.cartItemId}`);
    await loadCart();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <ScrollView>
        {cart.map(c => (
          <View key={c.id} style={styles.row}>
            <Image source={{ uri: dishCache[c.id]?.image }} style={styles.thumb} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{dishCache[c.id]?.name}</Text>
              <Text style={styles.sub}>Qty: {c.qty}</Text>
            </View>
            <Text style={styles.price}>${((dishCache[c.id]?.price || 0) * c.qty).toFixed(2)}</Text>
            <Pressable onPress={() => removeItem(c.id)} style={styles.remove}><Text>×</Text></Pressable>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Text>Total</Text>
        <Text style={styles.total}>${total.toFixed(2)}</Text>
      </View>
      <Pressable style={styles.cta} onPress={() => navigation.navigate('Checkout')}><Text style={{ color: '#fff' }}>Proceed to Checkout</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8, color: theme.colors.primary },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  thumb: { width: 56, height: 56, borderRadius: 8 },
  name: { fontWeight: '600', color: theme.colors.primaryText },
  sub: { color: theme.colors.secondaryText },
  price: { fontWeight: '700' },
  remove: { marginLeft: 8, width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: '#ddd', alignItems: 'center', justifyContent: 'center' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  total: { color: theme.colors.primary, fontWeight: '700' },
  cta: { backgroundColor: theme.colors.primary, paddingVertical: 12, borderRadius: 8, alignItems: 'center' }
});


