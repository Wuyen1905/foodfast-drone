/**
 * Auth Store with Role-Based Permissions
 * Extends existing auth context with permission logic
 */

export type UserRole = 'admin' | 'restaurant' | 'staff' | 'customer';

export type Feature = 
  | 'analytics'
  | 'realtime'
  | 'drone-management'
  | 'orders'
  | 'delivery'
  | 'maintenance'
  | 'user-management'
  | 'restaurant-management'
  | 'system-logs'
  | 'emergency-override';

/**
 * Role-based feature mapping
 */
const ROLE_FEATURES: Record<UserRole, Feature[]> = {
  admin: [
    'analytics',
    'realtime',
    'drone-management',
    'orders',
    'delivery',
    'maintenance',
    'user-management',
    'restaurant-management',
    'system-logs',
    'emergency-override'
  ],
  restaurant: [
    'analytics',
    'orders',
    'delivery',
    'drone-management' // Restaurant can view their own drones
  ],
  staff: [
    'orders',
    'delivery',
    'maintenance'
  ],
  customer: [] // Customers have no admin features
};

/**
 * Check if a role has permission for a feature
 */
export const hasPermission = (role: UserRole, feature: Feature): boolean => {
  const features = ROLE_FEATURES[role] || [];
  return features.includes(feature);
};

/**
 * Check if current user (from context) has permission
 * This function should be called with the user's role from AuthContext
 */
export const checkPermission = (userRole: UserRole | undefined, feature: Feature): boolean => {
  if (!userRole) {
    return false;
  }
  return hasPermission(userRole, feature);
};

/**
 * Get all features for a role
 */
export const getRoleFeatures = (role: UserRole): Feature[] => {
  return ROLE_FEATURES[role] || [];
};

/**
 * Check if user can access multiple features (all required)
 */
export const hasAllPermissions = (role: UserRole, features: Feature[]): boolean => {
  return features.every(feature => hasPermission(role, feature));
};

/**
 * Check if user can access any of the features (at least one)
 */
export const hasAnyPermission = (role: UserRole, features: Feature[]): boolean => {
  return features.some(feature => hasPermission(role, feature));
};

/**
 * Permission guard helper for components
 * Returns a function that checks permission before executing action
 */
export const createPermissionGuard = (userRole: UserRole | undefined) => {
  return (feature: Feature, action: () => void): void => {
    if (checkPermission(userRole, feature)) {
      action();
    } else {
      console.warn(`[authStore] Permission denied: ${userRole} cannot access ${feature}`);
    }
  };
};

