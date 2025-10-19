import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ScrollView } from 'react-native';
import { api } from '../api/mock';
import { theme } from '../theme';

type Dish = { id: string; name: string; price: number; image: string };
const dishCache: Record<string, Dish> = {};

export default function Cart({ navigation }: any) {
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);

  useEffect(() => { api.get('/cart').then(r => setCart(r.data.cart)); }, []);
  useEffect(() => { api.get('/dishes').then(r => r.data.items.forEach((d: Dish) => (dishCache[d.id] = d))); }, []);

  const total = useMemo(() => cart.reduce((acc, c) => acc + (dishCache[c.id]?.price || 0) * c.qty, 0), [cart]);

  const removeItem = async (id: string) => {
    await api.delete(`/cart/${id}`);
    const res = await api.get('/cart');
    setCart(res.data.cart);
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


