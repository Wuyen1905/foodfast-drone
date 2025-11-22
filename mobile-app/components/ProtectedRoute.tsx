import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { router, usePathname } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { theme } from '@/theme';
import { UserRole } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: UserRole | UserRole[];
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  requireRole,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      // Not logged in - redirect to login with return path
      router.replace({
        pathname: redirectTo,
        params: { from: pathname },
      });
      return;
    }

    // Check role if required
    if (requireRole) {
      const roles = Array.isArray(requireRole) ? requireRole : [requireRole];
      if (!roles.includes(user.role)) {
        // Wrong role - redirect to appropriate screen
        if (user.role === 'customer') {
          router.replace('/home');
        } else if (user.role === 'restaurant') {
          router.replace('/restaurant');
        } else if (user.role === 'admin') {
          router.replace('/admin');
        } else {
          router.replace('/login');
        }
      }
    }
  }, [user, loading, requireRole, pathname, redirectTo]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  if (requireRole) {
    const roles = Array.isArray(requireRole) ? requireRole : [requireRole];
    if (!roles.includes(user.role)) {
      return null; // Will redirect
    }
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    color: theme.colors.secondaryText,
  },
});

