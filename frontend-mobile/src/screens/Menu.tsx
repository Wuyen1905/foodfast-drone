import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import { api } from '../api/api';
import { theme } from '../theme';

type Dish = { id: string; name: string; price: number; image: string };

export default function Menu({ navigation }: any) {
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
      <Text style={styles.title}>Menu</Text>
      <FlatList
        data={items}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <Pressable style={styles.row} onPress={() => navigation.navigate('Details', { id: item.id })}>
            <Image source={{ uri: item.image }} style={styles.thumb} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', color: theme.colors.primary, marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  thumb: { width: 64, height: 64, borderRadius: 8 },
  name: { fontWeight: '600', color: theme.colors.primaryText },
  price: { color: theme.colors.primary }
});


