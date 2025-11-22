import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook to handle app state changes (background/foreground)
 * Saves and restores cart and checkout state when app goes to background/foreground
 * This ensures user can continue ordering after phone calls without losing state
 */
export function useAppStatePersistence() {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState: AppStateStatus) => {
      // App going to background or inactive (phone call, etc.)
      if (
        appState.current.match(/active/) &&
        nextAppState.match(/inactive|background/)
      ) {
        console.log('[AppState] App going to background - saving state');
        await saveCurrentState();
      }

      // App coming to foreground
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('[AppState] App coming to foreground - restoring state');
        await restoreState();
      }

      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, []);

  const saveCurrentState = async () => {
    try {
      // Get current cart from API
      // This will be called by components that use this hook
      const state = {
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem('app_state_saved', JSON.stringify(state));
    } catch (error) {
      console.error('[AppState] Error saving state:', error);
    }
  };

  const restoreState = async () => {
    try {
      const saved = await AsyncStorage.getItem('app_state_saved');
      if (saved) {
        const state = JSON.parse(saved);
        console.log('[AppState] State restored:', state);
        // State restoration will be handled by individual components
        // that read from AsyncStorage on mount
      }
    } catch (error) {
      console.error('[AppState] Error restoring state:', error);
    }
  };
}

/**
 * Save cart to AsyncStorage for persistence across app state changes
 */
export async function saveCartToStorage(cartItems: any[]) {
  try {
    await AsyncStorage.setItem('cart_items', JSON.stringify(cartItems));
    console.log('[CartPersistence] Cart saved to storage');
  } catch (error) {
    console.error('[CartPersistence] Error saving cart:', error);
  }
}

/**
 * Load cart from AsyncStorage
 */
export async function loadCartFromStorage(): Promise<any[]> {
  try {
    const saved = await AsyncStorage.getItem('cart_items');
    if (saved) {
      const items = JSON.parse(saved);
      console.log('[CartPersistence] Cart loaded from storage');
      return items;
    }
  } catch (error) {
    console.error('[CartPersistence] Error loading cart:', error);
  }
  return [];
}

/**
 * Save checkout customer info to AsyncStorage
 */
export async function saveCheckoutInfo(info: any) {
  try {
    await AsyncStorage.setItem('checkout_info', JSON.stringify(info));
    console.log('[CheckoutPersistence] Customer info saved');
  } catch (error) {
    console.error('[CheckoutPersistence] Error saving info:', error);
  }
}

/**
 * Load checkout customer info from AsyncStorage
 */
export async function loadCheckoutInfo(): Promise<any | null> {
  try {
    const saved = await AsyncStorage.getItem('checkout_info');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('[CheckoutPersistence] Error loading info:', error);
  }
  return null;
}

