import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { api } from '@/api';
import { theme } from '@/theme';

type Dish = { id: string; name: string; price: number; image: string };

export default function Home() {
  const [items, setItems] = useState<Dish[]>([]);
  useEffect(() => { api.get('/products').then(r => setItems(r.data.items)); }, []);

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
          <Pressable style={styles.card} onPress={() => router.push({ pathname: '/details', params: { id: item.id } })}>
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

