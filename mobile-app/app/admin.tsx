import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { api } from '@/api';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { theme } from '@/theme';

export default function AdminDashboard() {
  return (
    <ProtectedRoute requireRole="admin">
      <AdminContent />
    </ProtectedRoute>
  );
}

function AdminContent() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [ordersRes] = await Promise.all([
        api.get('/orders'),
      ]);
      setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);
      // Restaurants would come from another endpoint if available
      setRestaurants([]);
    } catch (error) {
      console.error('[Admin] Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      <Text style={styles.subtitle}>Welcome, {user?.name || 'Admin'}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Orders ({orders.length})</Text>

        {loading ? (
          <Text style={styles.loading}>Loading...</Text>
        ) : orders.length === 0 ? (
          <Text style={styles.empty}>No orders</Text>
        ) : (
          orders.map((item) => (
            <View key={item.id} style={styles.orderCard}>
              <Text style={styles.orderId}>Order #{item.id}</Text>
              <Text style={styles.detail}>Customer: {item.customerName}</Text>
              <Text style={styles.detail}>Restaurant: {item.restaurantId || 'N/A'}</Text>
              <Text style={styles.detail}>Status: {item.status || 'PENDING'}</Text>
              <Text style={styles.total}>Total: ${((item.total || 0) / 100).toFixed(2)}</Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Restaurants</Text>
        <Text style={styles.info}>Restaurant management features coming soon</Text>
      </View>
    </ScrollView>
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
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
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
  info: {
    color: theme.colors.secondaryText,
    marginTop: 8,
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
  detail: {
    fontSize: 14,
    color: theme.colors.primaryText,
    marginBottom: 4,
  },
  total: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
    marginTop: 8,
  },
});

