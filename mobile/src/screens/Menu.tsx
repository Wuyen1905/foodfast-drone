import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import { api } from '../api/mock';
import { theme } from '../theme';

type Dish = { id: string; name: string; price: number; image: string };

function Header({ onToggle }: { onToggle: () => void }) {
  return (
    <View style={headerStyles.container}>
      <Text style={headerStyles.title}>FoodFast</Text>
      <Pressable onPress={onToggle} style={headerStyles.toggle}>
        <Text style={{ fontSize: 22 }}>🌙</Text>
      </Pressable>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  toggle: {
    padding: 8,
  },
});

export default function Menu({ navigation }: any) {
  const [items, setItems] = useState<Dish[]>([]);
  useEffect(() => { api.get('/dishes').then(r => setItems(r.data.items)); }, []);

  return (
    <View style={styles.container}>
      <FlatList
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <Header onToggle={() => console.log("toggle theme")} />
        }
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


