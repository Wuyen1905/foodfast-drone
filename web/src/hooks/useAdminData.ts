/**
 * Admin Data Hook
 * Optimized data fetching with caching and debouncing
 * Uses manual caching instead of SWR (as per requirements)
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { getAllRestaurants, getAllCustomers, getDroneFleet, getAdminStats } from '@/services/adminService';
import { getDroneList } from '@/services/droneManager';
import { fetchRealtimeStats } from '@/services/adminRealtime';
import { api } from '@/config/axios';

// Cache storage
const cache: Record<string, { data: any; timestamp: number; ttl: number }> = {};

// Default cache TTL: 5 seconds
const DEFAULT_CACHE_TTL = 5000;

// Debounce function
const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Get cached data or fetch new
 */
const getCachedOrFetch = async <T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = DEFAULT_CACHE_TTL
): Promise<T> => {
  const cached = cache[key];
  const now = Date.now();

  if (cached && (now - cached.timestamp) < cached.ttl) {
    return cached.data;
  }

  const data = await fetcher();
  cache[key] = { data, timestamp: now, ttl };
  return data;
};

/**
 * Invalidate cache
 */
export const invalidateCache = (key?: string): void => {
  if (key) {
    delete cache[key];
  } else {
    Object.keys(cache).forEach(k => delete cache[k]);
  }
};

/**
 * Hook for admin statistics
 */
export const useAdminStats = (refreshInterval?: number) => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCachedOrFetch('adminStats', getAdminStats);
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('[useAdminData] Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();

    if (refreshInterval) {
      const interval = setInterval(fetchStats, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchStats, refreshInterval]);

  return { stats, loading, error, refetch: fetchStats };
};

/**
 * Hook for restaurants data
 */
export const useRestaurants = (refreshInterval?: number) => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRestaurants = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCachedOrFetch('restaurants', getAllRestaurants);
      setRestaurants(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('[useAdminData] Error fetching restaurants:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRestaurants();

    if (refreshInterval) {
      const interval = setInterval(fetchRestaurants, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchRestaurants, refreshInterval]);

  return { restaurants, loading, error, refetch: fetchRestaurants };
};

/**
 * Hook for customers data
 */
export const useCustomers = (refreshInterval?: number) => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCachedOrFetch('customers', getAllCustomers);
      setCustomers(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('[useAdminData] Error fetching customers:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();

    if (refreshInterval) {
      const interval = setInterval(fetchCustomers, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchCustomers, refreshInterval]);

  return { customers, loading, error, refetch: fetchCustomers };
};

/**
 * Hook for drones data
 */
export const useDrones = (refreshInterval?: number) => {
  const [drones, setDrones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDrones = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCachedOrFetch('drones', getDroneList, 3000); // 3 second cache for drones
      setDrones(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('[useAdminData] Error fetching drones:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrones();

    if (refreshInterval) {
      const interval = setInterval(fetchDrones, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchDrones, refreshInterval]);

  return { drones, loading, error, refetch: fetchDrones };
};

/**
 * Hook for realtime stats
 */
export const useRealtimeStats = (refreshInterval: number = 4000) => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const data = await fetchRealtimeStats();
      setStats(data);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      console.error('[useAdminData] Error fetching realtime stats:', err);
    }
  }, []);

  useEffect(() => {
    fetchStats();

    const interval = setInterval(fetchStats, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchStats, refreshInterval]);

  return { stats, loading, error, refetch: fetchStats };
};

/**
 * Hook for analytics data
 */
export const useAnalytics = (period: 'day' | 'week' | 'month' = 'day') => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const cacheKey = `analytics_${period}`;
      const data = await getCachedOrFetch(
        cacheKey,
        async () => {
          const response = await api.get(`/analytics?period=${period}`);
          return response.data;
        },
        10000 // 10 second cache for analytics
      );
      setAnalytics(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('[useAdminData] Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return { analytics, loading, error, refetch: fetchAnalytics };
};

/**
 * Debounced update hook
 */
export const useDebouncedUpdate = <T>(
  value: T,
  delay: number = 300,
  callback: (value: T) => void
) => {
  const debouncedCallback = useRef(debounce(callback, delay));

  useEffect(() => {
    debouncedCallback.current(value);
  }, [value]);
};

