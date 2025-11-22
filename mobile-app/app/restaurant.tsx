import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { api } from '@/api';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { theme } from '@/theme';

export default function RestaurantDashboard() {
  return (
    <ProtectedRoute requireRole="restaurant">
      <RestaurantContent />
    </ProtectedRoute>
  );
}

function RestaurantContent() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      // Get orders for this restaurant
      const restaurantId = user?.restaurantId || 'rest_1';
      const res = await api.get(`/orders?restaurant=${restaurantId}`);
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('[Restaurant] Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Restaurant Dashboard</Text>
        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      <Text style={styles.subtitle}>
        Welcome, {user?.name || 'Restaurant Owner'}
      </Text>
      <Text style={styles.info}>Restaurant ID: {user?.restaurantId || 'N/A'}</Text>

      <Text style={styles.sectionTitle}>Orders ({orders.length})</Text>

      {loading ? (
        <Text style={styles.loading}>Loading orders...</Text>
      ) : orders.length === 0 ? (
        <Text style={styles.empty}>No orders yet</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id || String(item)}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <Text style={styles.orderId}>Order #{item.id}</Text>
              <Text style={styles.customer}>Customer: {item.customerName}</Text>
              <Text style={styles.status}>Status: {item.status || 'PENDING'}</Text>
              <Text style={styles.total}>Total: ${((item.total || 0) / 100).toFixed(2)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#dc3545',
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.primaryText,
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: theme.colors.secondaryText,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.primaryText,
    marginBottom: 16,
  },
  loading: {
    textAlign: 'center',
    color: theme.colors.secondaryText,
    marginTop: 24,
  },
  empty: {
    textAlign: 'center',
    color: theme.colors.secondaryText,
    marginTop: 24,
  },
  orderCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  orderId: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  customer: {
    fontSize: 16,
    color: theme.colors.primaryText,
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: theme.colors.secondaryText,
    marginBottom: 4,
  },
  total: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
    marginTop: 8,
  },
});

