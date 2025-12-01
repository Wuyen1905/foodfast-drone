import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import { api } from '../api/api';
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

export default function Home({ navigation }: any) {
	const [items, setItems] = useState<Dish[]>([]);
	useEffect(() => {
		console.log("[MOBILE] Fetching products:", api.defaults.baseURL + "/products");
		api.get('/products')
			.then(r => {
				const products = Array.isArray(r.data) ? r.data : [];
				const transformed = products.map((item: any) => ({
					id: String(item.id),
					name: item.name ?? "",
					price: Number(item.price) || 0,
					image: item.imageUrl || item.image || "",
				}));
				console.log("[Home Transform] Sample:", transformed[0]);
				setItems(transformed);
			})
			.catch(error => {
				console.error("[Diagnostics] Fetch error:", {
					message: error.message,
					status: error.response?.status,
					url: error.config?.url,
					full: error,
				});
			});
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				stickyHeaderIndices={[0]}
				ListHeaderComponent={
					<Header onToggle={() => console.log("toggle theme")} />
				}
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


