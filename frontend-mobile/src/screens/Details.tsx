import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { api } from '../api/api';
import { theme } from '../theme';

type Dish = { id: string; name: string; price: number; image: string };

export default function Details({ route, navigation }: any) {
  const { id } = route.params;
  const [dish, setDish] = useState<Dish | null>(null);
  const [qty, setQty] = useState(1);
  useEffect(() => { api.get(`/dishes/${id}`).then(r => setDish(r.data)); }, [id]);

  const addToCart = async () => {
    await api.post('/cart', { id, qty });
    navigation.navigate('Cart');
  };

  if (!dish) return <View style={{ padding: 16 }}><Text>Loading...</Text></View>;
  return (
    <View style={styles.container}>
      <Image source={{ uri: dish.image }} style={styles.image} />
      <Text style={styles.name}>{dish.name}</Text>
      <Text style={styles.price}>${dish.price.toFixed(2)}</Text>
      <View style={styles.row}>
        <Pressable style={styles.qtyBtn} onPress={() => setQty(q => Math.max(1, q - 1))}><Text>-</Text></Pressable>
        <Text>{qty}</Text>
        <Pressable style={styles.qtyBtn} onPress={() => setQty(q => q + 1)}><Text>+</Text></Pressable>
        <Pressable style={styles.cta} onPress={addToCart}><Text style={{ color: '#fff' }}>Add to Cart</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  image: { width: '100%', height: 240, borderRadius: 12 },
  name: { marginTop: 12, fontSize: 20, fontWeight: '700', color: theme.colors.primaryText },
  price: { color: theme.colors.primary, fontSize: 18, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 12 },
  qtyBtn: { width: 36, height: 36, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', alignItems: 'center', justifyContent: 'center' },
  cta: { marginLeft: 8, backgroundColor: theme.colors.primary, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8 }
});


