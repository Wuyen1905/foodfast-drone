import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types/auth';

/**
 * Hook to control UI element visibility based on user role
 * Returns helper functions for role-based access control
 */
export const useRoleGuard = () => {
  const { user, isAdmin, isRestaurant, isCustomer } = useAuth();

  /**
   * Check if current user has a specific role
   */
  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  /**
   * Check if current user has any of the specified roles
   */
  const hasAnyRole = (roles: UserRole[]): boolean => {
    return roles.some(role => user?.role === role);
  };

  /**
   * Check if cart actions should be visible (only for customers)
   */
  const canAddToCart = (): boolean => {
    return isCustomer();
  };

  /**
   * Check if restaurant management actions should be visible
   */
  const canManageMenu = (): boolean => {
    return isRestaurant() || isAdmin();
  };

  /**
   * Check if admin actions should be visible
   */
  const canAdministrate = (): boolean => {
    return isAdmin();
  };

  /**
   * Get redirect path based on user role
   */
  const getDefaultRedirectPath = (): string => {
    if (!user) return '/login';
    
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'restaurant':
        return '/restaurant';
      case 'customer':
        return '/menu';
      default:
        return '/menu';
    }
  };

  return {
    user,
    hasRole,
    hasAnyRole,
    canAddToCart,
    canManageMenu,
    canAdministrate,
    getDefaultRedirectPath,
    isAdmin: isAdmin(),
    isRestaurant: isRestaurant(),
    isCustomer: isCustomer(),
  };
};

