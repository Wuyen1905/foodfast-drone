/**
 * Time Utility Functions
 * Helper functions for time formatting and calculations
 */

/**
 * Format time difference in seconds to human-readable string
 */
export const formatTimeAgo = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}s ago`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours}h ago`;
  } else {
    const days = Math.floor(seconds / 86400);
    return `${days}d ago`;
  }
};

/**
 * Calculate days since date
 */
export const daysSince = (dateString: string): number => {
  const date = new Date(dateString);
  const now = Date.now();
  return Math.floor((now - date.getTime()) / (1000 * 60 * 60 * 24));
};

/**
 * Format timestamp to localized time string
 */
export const formatTimestamp = (timestamp: string, includeSeconds: boolean = false): string => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    ...(includeSeconds && { second: '2-digit' })
  };
  return date.toLocaleTimeString('vi-VN', options);
};

/**
 * Format date to localized date string
 */
export const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Get time difference in seconds
 */
export const getTimeDifference = (timestamp: string): number => {
  const date = new Date(timestamp);
  const now = Date.now();
  return Math.round((now - date.getTime()) / 1000);
};

