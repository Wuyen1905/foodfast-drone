// Application Constants
export const APP_CONFIG = {
  NAME: 'FoodFast Drone Delivery',
  VERSION: '1.0.0',
  MAX_ORDERS_PER_PHONE: 2,
  DRONE_SPEED_KM_PER_MIN: 1.5,
  DEFAULT_CURRENCY: 'VND',
  SUPPORTED_CURRENCIES: ['VND', 'USD'],
} as const;

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

// Drone Configuration
export const DRONE_CONFIG = {
  SPEED_KM_PER_MIN: Number(import.meta.env.VITE_DRONE_SPEED_KM_PER_MIN) || 1.5,
  MAX_DISTANCE_KM: 10,
  MIN_DISTANCE_KM: 2,
  DELIVERY_STAGES: [
    { key: 'preparing', duration: 2, label: 'Chuẩn bị hàng tại nhà hàng' },
    { key: 'departing', duration: 1, label: 'Drone đang rời kho' },
    { key: 'delivering', duration: 12, label: 'Đang giao hàng' },
    { key: 'completed', duration: 0, label: 'Đã giao thành công' },
  ],
} as const;

// UI Configuration
export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  TOAST_DURATION: 3000,
  SKELETON_DURATION: 1500,
  DEBOUNCE_DELAY: 500,
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂÊÔƠưăâêôơ\s]+$/,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PHONE: {
    PATTERN: /^(0|\+84)[0-9]{9,10}$/,
    MIN_LENGTH: 10,
    MAX_LENGTH: 11,
  },
  ADDRESS: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 200,
  },
} as const;

// Theme Configuration
export const THEME_CONFIG = {
  COLORS: {
    PRIMARY: '#ff6600',
    SECONDARY: '#ff8c00',
    SUCCESS: '#28a745',
    WARNING: '#ffc107',
    ERROR: '#dc3545',
    INFO: '#17a2b8',
  },
  BREAKPOINTS: {
    MOBILE: '768px',
    TABLET: '1024px',
    DESKTOP: '1200px',
  },
} as const;

// Order Status
export const ORDER_STATUS = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  DELIVERING: 'Delivering',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
} as const;

// Payment Methods
export const PAYMENT_METHODS = {
  VNPAY: 'VNPay',
  CASH: 'Cash',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'foodfast-theme',
  CART: 'foodfast-cart',
  USER: 'foodfast-user',
  DRONE_STATE: 'foodfast-drone-state',
} as const;
