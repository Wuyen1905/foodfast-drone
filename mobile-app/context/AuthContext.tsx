import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, AppStateStatus } from 'react-native';
import { api } from '@/api';

export type UserRole = 'admin' | 'restaurant' | 'customer';

export interface User {
  id: string;
  name: string;
  username: string;
  role: UserRole;
  phone?: string;
  email?: string;
  restaurantId?: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ ok: boolean; message?: string; user?: User }>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
  isRestaurant: () => boolean;
  isCustomer: () => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// User data will be fetched from backend API

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load auth state from AsyncStorage on mount
  useEffect(() => {
    loadAuthState();
  }, []);

  // Handle app state changes (background/foreground) - save state
  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, [user]);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    // When app goes to background, save current state
    if (nextAppState === 'background' || nextAppState === 'inactive') {
      await saveAuthState(user);
    }
    // When app comes to foreground, restore state
    if (nextAppState === 'active' && !user) {
      await loadAuthState();
    }
  };

  const loadAuthState = async () => {
    try {
      const [savedUser, token, role] = await Promise.all([
        AsyncStorage.getItem('auth_user'),
        AsyncStorage.getItem('token'),
        AsyncStorage.getItem('role'),
      ]);

      if (savedUser && token && role) {
        const userData = JSON.parse(savedUser);
        // Verify token and role consistency
        if (userData.role === role) {
          setUser(userData);
          // Update API client with token
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
          // Inconsistent data, clear everything
          await clearAuthState();
        }
      }
    } catch (error) {
      console.error('[AuthContext] Error loading auth state:', error);
      await clearAuthState();
    } finally {
      setLoading(false);
    }
  };

  const saveAuthState = async (userData: User | null) => {
    try {
      if (userData) {
        const token = `token_${userData.username}_${Date.now()}`;
        await Promise.all([
          AsyncStorage.setItem('auth_user', JSON.stringify(userData)),
          AsyncStorage.setItem('token', token),
          AsyncStorage.setItem('role', userData.role),
        ]);
        // Update API client with token
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        await clearAuthState();
      }
    } catch (error) {
      console.error('[AuthContext] Error saving auth state:', error);
    }
  };

  const clearAuthState = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem('auth_user'),
        AsyncStorage.removeItem('token'),
        AsyncStorage.removeItem('role'),
      ]);
      delete api.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('[AuthContext] Error clearing auth state:', error);
    }
  };

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      // Call backend /auth/login API
      const response = await api.post('/auth/login', {
        username,
        password,
      });

      if (response.data && response.data.token) {
        const { token, user: userData } = response.data;
        
        // Map backend user data to our User interface
        const user: User = {
          id: String(userData.id || userData.userId || Date.now()),
          name: userData.name || userData.username || username,
          username: userData.username || username,
          role: userData.role || 'customer',
          phone: userData.phone,
          email: userData.email,
          restaurantId: userData.restaurantId,
        };

        // Save to AsyncStorage
        await Promise.all([
          AsyncStorage.setItem('auth_user', JSON.stringify(user)),
          AsyncStorage.setItem('token', token),
          AsyncStorage.setItem('role', user.role),
        ]);

        // Update API client with token
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setUser(user);
        setLoading(false);
        return { ok: true, user };
      }

      setLoading(false);
      return { ok: false, message: 'Invalid username or password' };
    } catch (error: any) {
      console.error('[AuthContext] Login error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please try again.';
      setLoading(false);
      return { ok: false, message: errorMessage };
    }
  };

  const logout = async () => {
    setUser(null);
    await clearAuthState();
  };

  const isAdmin = () => user?.role === 'admin';
  const isRestaurant = () => user?.role === 'restaurant';
  const isCustomer = () => user?.role === 'customer';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAdmin,
        isRestaurant,
        isCustomer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

