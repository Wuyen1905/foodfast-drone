import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import { api } from '../api/api';
import { theme } from '../theme';

type Dish = { id: string; name: string; price: number; image: string };

export default function Home({ navigation }: any) {
  const [items, setItems] = useState<Dish[]>([]);
  
  useEffect(() => {
    (async () => {
      try {
        console.log("[MOBILE] Fetching products from:", api.defaults.baseURL + "/products");
        const r = await api.get("/products");
        console.log("[MOBILE] RAW:", r.data);

        const data = Array.isArray(r.data) ? r.data : [];

        setItems(
          data.map((item) => ({
            id: String(item.id),
            name: item.name || "",
            price: Number(item.price) || 0,
            image:
              item.imageUrl ||
              item.image ||
              item.img ||
              "https://placehold.co/100x100",
          }))
        );
      } catch (err) {
        console.log("[MOBILE] ERROR:", err);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Delivery</Text>
      <FlatList
        data={items}
        keyExtractor={i => i.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => navigation.navigate('Details', { id: item.id })}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', color: theme.colors.primary, marginBottom: 8 },
  card: { flex: 1, borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 12 },
  image: { width: '100%', height: 120, borderRadius: 8 },
  name: { marginTop: 8, fontWeight: '600', color: theme.colors.primaryText },
  price: { color: theme.colors.primary }
});


