/**
 * Restaurant Identifier Utilities
 * Centralized mapping between restaurant names and IDs for consistent API/WebSocket usage
 */

/**
 * Maps restaurant name or ID to backend restaurantId
 * Used for API queries and WebSocket topic subscriptions
 * 
 * @param identifier - Restaurant name ("SweetDreams", "Aloha") or ID ("rest_2", "restaurant_2")
 * @returns Backend restaurantId ("rest_2" or "restaurant_2")
 */
export const normalizeToRestaurantId = (identifier: string): string => {
  if (!identifier) return identifier;
  
  const normalized = identifier.toLowerCase().trim();
  
  // Map restaurant names to backend IDs
  if (normalized === 'sweetdreams' || normalized === 'sweetdreams bakery') {
    return 'rest_2';
  }
  if (normalized === 'aloha' || normalized === 'aloha kitchen') {
    return 'restaurant_2';
  }
  
  // If already an ID format, return as-is
  if (normalized === 'rest_2' || normalized === 'restaurant_2') {
    return normalized === 'rest_2' ? 'rest_2' : 'restaurant_2';
  }
  
  // Default: assume it's already a valid ID
  return identifier;
};

/**
 * Maps backend restaurantId to display name
 * Used for UI display purposes only
 * 
 * @param restaurantId - Backend restaurantId ("rest_2", "restaurant_2")
 * @returns Display name ("SweetDreams", "Aloha")
 */
export const getRestaurantDisplayName = (restaurantId: string): string => {
  if (!restaurantId) return '';
  
  const normalized = restaurantId.toLowerCase().trim();
  
  if (normalized === 'rest_2') {
    return 'SweetDreams';
  }
  if (normalized === 'restaurant_2') {
    return 'Aloha';
  }
  
  return restaurantId; // Fallback to ID if unknown
};

/**
 * Check if identifier is a restaurant name (not ID)
 */
export const isRestaurantName = (identifier: string): boolean => {
  if (!identifier) return false;
  const normalized = identifier.toLowerCase().trim();
  return normalized === 'sweetdreams' || normalized === 'aloha' || 
         normalized === 'sweetdreams bakery' || normalized === 'aloha kitchen';
};

