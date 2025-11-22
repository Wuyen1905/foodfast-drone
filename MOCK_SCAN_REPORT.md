================ MOCK SCAN REPORT ================

[1] File: frontend-web/src/services/adminService.ts
    Line(s): 1, 64-260, 262-553
    Snippet:
        // Admin Service - Mock data for admin management
        ...
        // Mock data for restaurants
        const mockRestaurants: Restaurant[] = [
          {
            id: "sweetdreams",
            name: "SweetDreams Bakery",
            ...
          }
        ];
        // Mock data for system logs
        const mockSystemLogs: SystemLog[] = [...]
        // Mock data for drone fleet
        const mockDroneFleet: DroneFleet[] = [...]
        // Mock data for customers
        const mockCustomers: Customer[] = [...]
        // Helper function to simulate network delay
        const simulateDelay = (min: number = 800, max: number = 1500): Promise<void> => {
          const delay = Math.random() * (max - min) + min;
          return new Promise(resolve => setTimeout(resolve, delay));
        };
    Type: CRITICAL_MOCK_LOGIC
    Reason: Complete mock service with hardcoded arrays of restaurants, customers, drones, and system logs. Uses setTimeout to simulate network delays. All functions return mock data instead of calling real APIs.
    Recommended Fix: Replace with real API calls to backend endpoints. Remove all mock data arrays and simulateDelay function.

[2] File: frontend-web/src/services/customerService.ts
    Line(s): 1-110
    Snippet:
        // Customer Service - Mock API for customer registration and management
        ...
        // Mock API response interface
        interface ApiResponse<T> {
          ok: boolean;
          data?: T;
          message?: string;
        }
        // Simulate network delay
        const simulateDelay = (min: number = 500, max: number = 1200): Promise<void> => {
          const delay = Math.random() * (max - min) + min;
          return new Promise(resolve => setTimeout(resolve, delay));
        };
        // Mock customer registration endpoint
        export const registerCustomer = async (payload: RegisterPayload): Promise<ApiResponse<User>> => {
          await simulateDelay();
          // Simulate API call to /api/customers/register
          console.log("🌐 [CustomerService] Mock API call to /api/customers/register", payload);
          ...
        };
    Type: CRITICAL_MOCK_LOGIC
    Reason: Complete mock API service for customer registration, login, profile updates, and deletion. Uses setTimeout to simulate network delays. All functions return fake data instead of making real API calls.
    Recommended Fix: Replace with real API calls using axios to backend endpoints. Remove simulateDelay and all mock logic.

[3] File: frontend-web/src/data/adminData.ts
    Line(s): 1-125
    Snippet:
        /**
         * Admin Mock Data
         * This file contains mock data for the admin dashboard
         */
        ...
        // Generate mock drones for each restaurant
        export const generateMockDrones = async (): Promise<AdminDrone[]> => {
          const drones: AdminDrone[] = [];
          const statuses: AdminDrone['status'][] = ['Idle', 'Delivering', 'Charging', 'Maintenance'];
          ...
        };
        // Generate mock restaurant data with admin-specific fields
        export const generateMockRestaurants = async (): Promise<AdminRestaurant[]> => {
          ...
        };
        // Generate mock customer data
        export const generateMockCustomers = async (): Promise<AdminCustomer[]> => {
          ...
        };
        // Initial system logs
        export const initialSystemLogs: SystemLog[] = [
          {
            id: 'log_001',
            timestamp: Date.now() - 3600000,
            ...
          }
        ];
    Type: CRITICAL_MOCK_LOGIC
    Reason: Mock data generators for admin dashboard. Creates fake drones, restaurants, customers, and system logs. Used by admin dashboard for displaying data.
    Recommended Fix: Replace generators with real API calls. Remove all mock data generation functions and use backend APIs instead.

[4] File: frontend-web/src/services/DroneSimulationService.ts
    Line(s): 1-249
    Snippet:
        /**
         * Drone Simulation Service
         * Handles mock drone data and position updates for restaurant dashboard
         */
        // Mock restaurant location (Hanoi, Vietnam)
        const RESTAURANT_LOCATION: DroneCoordinates = {
          lat: 21.0285,
          lng: 105.8542
        };
        // Generate mock drone data
        export function generateMockDrones(count: number = 8): DroneData[] {
          const drones: DroneData[] = [];
          const statuses: DroneData['status'][] = ['active', 'enroute', 'enroute', 'enroute', 'returning', 'charging'];
          ...
        };
    Type: CRITICAL_MOCK_LOGIC
    Reason: Mock drone simulation service that generates fake drone data with random positions, statuses, and battery levels. Used for restaurant dashboard drone tracking.
    Recommended Fix: Replace with real drone API integration. Remove generateMockDrones function and use real drone data from backend.

[5] File: mock-api/server.js
    Line(s): 1-941
    Snippet:
        const express = require('express');
        const fs = require('fs');
        const path = require('path');
        ...
        // [5000] Database file location
        const DB_FILE = path.join(__dirname, 'db.json');
        ...
        // [Mock API] Handle GET /orders - Return all orders
        app.get('/orders', (req, res) => {
          try {
            const db = readDatabase();
            const orders = db.orders || [];
            res.status(200).json(orders);
          } catch (error) {
            console.error('[MOCK API] Error in GET /orders:', error);
            res.status(200).json([]);
          }
        });
        // [Mock API] Handle GET /restaurants - Return all restaurants
        app.get('/restaurants', (req, res) => {
          ...
        });
    Type: CRITICAL_MOCK_LOGIC
    Reason: Entire mock API server using json-server pattern with db.json file. Provides mock endpoints for orders, restaurants, products, drones, and users. This is a complete mock API implementation.
    Recommended Fix: This entire directory (mock-api/) should be removed or replaced with real backend integration. All endpoints should point to the actual Java backend.

[6] File: mock-api/db.json
    Line(s): 1-7
    Snippet:
        {
          "restaurants": [],
          "products": [],
          "orders": [],
          "drones": [],
          "users": []
        }
    Type: CRITICAL_MOCK_LOGIC
    Reason: Mock database JSON file used by mock-api server. Stores fake data for restaurants, products, orders, drones, and users.
    Recommended Fix: Remove this file. Data should come from real backend database.

[7] File: frontend-web/src/context/AdminAuthContext.tsx
    Line(s): 33-46
    Snippet:
        const login = async (username: string, password: string) => {
          setLoading(true);
          await new Promise((r) => setTimeout(r, 400));
          
          // Mock admin credentials
          if (username === 'admin' && password === 'admin123') {
            const adminUser: User = {
              id: 'admin_1',
              name: 'System Administrator',
              username: 'admin',
              role: 'admin',
              email: 'admin@foodfast.com',
              createdAt: Date.now() - 86400000 * 365
            };
            setAdmin(adminUser);
            setLoading(false);
            return { ok: true };
          }
          ...
        };
    Type: CRITICAL_MOCK_LOGIC
    Reason: Hardcoded mock admin credentials (admin/admin123). Authentication is done locally without backend validation.
    Recommended Fix: Replace with real authentication API call to backend. Remove hardcoded credentials check.

[8] File: frontend-web/src/pages/admin/AdminOrders.tsx
    Line(s): 136-194
    Snippet:
        const AdminOrders: React.FC = () => {
          const [orders, setOrders] = useState<Order[]>([
            {
              id: 'ORD-001',
              userId: 'u2',
              restaurantId: 'rest_1',
              items: [
                { id: 'item1', productId: 'prod1', productName: 'Burger Deluxe', quantity: 2, price: 15.99 },
                ...
              ],
              total: 37.97,
              status: 'delivered',
              ...
            },
            {
              id: 'ORD-002',
              ...
            },
            {
              id: 'ORD-003',
              ...
            },
            {
              id: 'ORD-004',
              ...
            }
          ]);
    Type: CRITICAL_MOCK_LOGIC
    Reason: Hardcoded array of mock orders initialized in component state. Contains fake order data with hardcoded IDs, items, and statuses.
    Recommended Fix: Initialize with empty array and fetch orders from real API on component mount. Remove all hardcoded order data.

[9] File: frontend-web/src/components/restaurant/RestaurantAnalytics.tsx
    Line(s): 286-350
    Snippet:
        const RestaurantAnalytics: React.FC<AnalyticsProps> = ({ theme, restaurant = "SweetDreams" }) => {
          // Mock data
          const kpiData = [
            {
              icon: '📦',
              label: 'Tổng đơn hàng hôm nay',
              value: '156',
              change: '+12%',
              positive: true,
              ...
            },
            ...
          ];
    Type: CRITICAL_MOCK_LOGIC
    Reason: Hardcoded mock KPI data array with fake metrics (orders, revenue, etc.). Used for displaying restaurant analytics.
    Recommended Fix: Replace with real API call to fetch analytics data from backend. Remove hardcoded kpiData array.

[10] File: web/src/data/mockData.ts
    Line(s): 1-104
    Snippet:
        import { Restaurant, User } from '../types/auth';
        
        // Mock data for restaurants and users
        export const RESTAURANTS: Restaurant[] = [
          {
            id: 'rest_1',
            name: 'FoodFast Restaurant',
            ...
          },
          ...
        ];
        export const USERS: User[] = [
          ...
        ];
    Type: CRITICAL_MOCK_LOGIC
    Reason: Hardcoded arrays of RESTAURANTS and USERS exported as constants. Contains fake restaurant and user data.
    Recommended Fix: Remove this file or replace exports with API calls. All references to RESTAURANTS and USERS should use backend APIs.

[11] File: web/src/data/mockMenuAloha.ts
    Line(s): 1-75
    Snippet:
        // Mock menu data for Aloha Kitchen
        export interface MenuItem {
          ...
        }
        
        export const mockMenuAloha: MenuItem[] = [
          {
            id: 1,
            name: "Hamburger",
            category: "Món chính",
            price: 79000,
            ...
          },
          ...
        ];
    Type: CRITICAL_MOCK_LOGIC
    Reason: Hardcoded mock menu array for Aloha Kitchen restaurant. Contains fake menu items with prices and descriptions.
    Recommended Fix: Remove this file. Menu data should come from backend API or database.

[12] File: frontend-web/src/components/restaurant/DroneTrackerMap.tsx
    Line(s): 294-303, 324
    Snippet:
        // Fallback to mock data if loading or error
        const [fallbackDrones, setFallbackDrones] = useState<DroneData[]>([]);
        
        useEffect(() => {
          if (loading || error || drones.length === 0) {
            setFallbackDrones(generateMockDrones(8));
          } else {
            setFallbackDrones(drones);
          }
        }, [drones, loading, error]);
        ...
        <Button onClick={() => { setIsSimulating(false); setFallbackDrones(generateMockDrones(8)); }}>
          🔄 Đặt lại
        </Button>
    Type: HIGH_RISK
    Reason: Fallback logic that uses mock drone data when API fails or is loading. Also has button to reset to mock data. This creates a fallback path to mock data.
    Recommended Fix: Remove fallback to generateMockDrones. Show error state or loading spinner instead. Remove reset button that generates mock data.

[13] File: frontend-web/src/pages/admin/AdminDashboard.tsx
    Line(s): 358-369
    Snippet:
        } catch (error) {
          console.error("[AdminDashboard] Error loading data:", error);
          
          // Fallback to mock data
          setRestaurants([
            { id: '1', name: 'Aloha Kitchen', status: 'Đang hoạt động', category: 'Asian Fusion', totalOrders: 0, totalRevenue: 0, rating: 0, droneCount: 2 },
            { id: '2', name: 'SweetDreams Bakery', status: 'Đang hoạt động', category: 'Bakery', totalOrders: 0, totalRevenue: 0, rating: 0, droneCount: 3 }
          ]);
          setCustomers([]);
          setDrones([]);
          setLogs([]);
          setStats({
            totalRestaurants: 2,
            totalCustomers: 0,
            ...
          });
        }
    Type: HIGH_RISK
    Reason: Fallback logic that sets mock data when API call fails. Creates fallback path to mock data instead of showing error state.
    Recommended Fix: Remove fallback mock data. Show error message to user instead. Let error state be handled properly.

[14] File: frontend-web/src/components/OrderCard.tsx
    Line(s): 72-87
    Snippet:
        const updateOrderStatus = (newStatus: string) => {
          // Update order status in localStorage
          const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
          const userIndex = users.findIndex((u: any) => u.phone === order.userPhone);
          
          if (userIndex !== -1) {
            const orderIndex = users[userIndex].orders.findIndex((o: any) => o.id === order.id);
            if (orderIndex !== -1) {
              users[userIndex].orders[orderIndex].status = newStatus;
              localStorage.setItem('mock_users', JSON.stringify(users));
              
              // Update global order history
              const history = JSON.parse(localStorage.getItem('orderHistory') || '[]');
              const historyIndex = history.findIndex((o: any) => o.id === order.id);
              if (historyIndex !== -1) {
                history[historyIndex].status = newStatus;
                localStorage.setItem('orderHistory', JSON.stringify(history));
              }
            }
          }
        };
    Type: HIGH_RISK
    Reason: Uses localStorage key 'mock_users' to store and update order data. This is mock residue - using localStorage as a database instead of backend API.
    Recommended Fix: Replace with real API call to update order status. Remove all localStorage operations for order data. Use backend order API instead.

[15] File: frontend-web/package.json
    Line(s): 27
    Snippet:
        "dependencies": {
          ...
          "axios-mock-adapter": "^2.1.0",
          ...
        }
    Type: MODERATE
    Reason: axios-mock-adapter dependency in package.json. This package is used for mocking axios requests in tests/development. May be unused or only used in tests.
    Recommended Fix: Check if this is used anywhere. If only in tests, move to devDependencies. If unused, remove entirely.

[16] File: frontend-web/src/state/droneStore.ts
    Line(s): 11-15
    Snippet:
        // Mock restaurant location (Ho Chi Minh City)
        const RESTAURANT_LOCATION: Coordinates = {
          lat: 10.7820,
          lng: 106.6950
        };
    Type: MODERATE
    Reason: Hardcoded mock restaurant location. Should come from restaurant data or API.
    Recommended Fix: Fetch restaurant location from API or restaurant data instead of hardcoding.

[17] File: frontend-web/src/services/DroneSimulationService.ts
    Line(s): 25-29
    Snippet:
        // Mock restaurant location (Hanoi, Vietnam)
        const RESTAURANT_LOCATION: DroneCoordinates = {
          lat: 21.0285,
          lng: 105.8542
        };
    Type: MODERATE
    Reason: Hardcoded mock restaurant location. Should be dynamic based on actual restaurant data.
    Recommended Fix: Make location dynamic based on restaurant ID or fetch from API.

[18] File: frontend-mobile/src/api/mock.ts
    Line(s): 1-21
    Snippet:
        import axios from 'axios';
        
        // [Data Sync] Use shared mock API server instead of AxiosMockAdapter
        // For mobile devices, you may need to use your computer's IP address instead of localhost
        // Example: 'http://192.168.1.100:5000' (replace with your actual IP)
        const API_BASE_URL = __DEV__ 
          ? 'http://192.168.0.100:8080/api'  // For iOS Simulator / Android Emulator
          : 'http://192.168.0.100:8080/api';  // For physical devices, replace with your computer's IP
        
        export const api = axios.create({ 
          baseURL: API_BASE_URL,
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        // [Data Sync] Note: Removed AxiosMockAdapter - now using backend API
    Type: MODERATE
    Reason: File named "mock.ts" but actually points to backend API. Name is misleading. Comments mention mock API server.
    Recommended Fix: Rename file to api.ts or backendApi.ts. Update all imports. Remove misleading comments about mock API.

[19] File: frontend-mobile/src/config/axios.ts
    Line(s): 3
    Snippet:
        // Base URL for the mock API
        const API_BASE_URL = ...
    Type: MODERATE
    Reason: Comment says "Base URL for the mock API" but should say "Base URL for the backend API".
    Recommended Fix: Update comment to reflect that it's the backend API, not mock API.

[20] File: frontend-web/src/test/setup.ts
    Line(s): 3-10
    Snippet:
        // Mock localStorage
        const localStorageMock = {
          getItem: vi.fn(),
          setItem: vi.fn(),
          removeItem: vi.fn(),
          clear: vi.fn(),
        };
        global.localStorage = localStorageMock;
    Type: LOW
    Reason: Test setup file that mocks localStorage for testing purposes. This is acceptable for tests.
    Recommended Fix: No action needed - this is proper test mocking.

[21] File: frontend-web/src/services/adminService.ts
    Line(s): 262-266
    Snippet:
        // Helper function to simulate network delay
        const simulateDelay = (min: number = 800, max: number = 1500): Promise<void> => {
          const delay = Math.random() * (max - min) + min;
          return new Promise(resolve => setTimeout(resolve, delay));
        };
    Type: CRITICAL_MOCK_LOGIC
    Reason: setTimeout used to simulate API delay. This is mock behavior that should be removed.
    Recommended Fix: Remove simulateDelay function and all calls to it. Real API calls will have natural delays.

[22] File: frontend-web/src/services/customerService.ts
    Line(s): 11-15
    Snippet:
        // Simulate network delay
        const simulateDelay = (min: number = 500, max: number = 1200): Promise<void> => {
          const delay = Math.random() * (max - min) + min;
          return new Promise(resolve => setTimeout(resolve, delay));
        };
    Type: CRITICAL_MOCK_LOGIC
    Reason: setTimeout used to simulate API delay. This is mock behavior.
    Recommended Fix: Remove simulateDelay function and all calls to it.

[23] File: frontend-web/src/services/menuService.ts
    Line(s): 7-9, 10-26, 227-229
    Snippet:
        const simulateDelay = (ms: number = 300) => {
          return new Promise(resolve => setTimeout(resolve, delay));
        };
        // Load products from localStorage or use default
        export const loadProducts = async (): Promise<Product[]> => {
          const stored = localStorage.getItem("foodfast_products");
          ...
        };
        // Initialize default data if localStorage is empty
        export const initializeDefaultData = async (): Promise<void> => {
          const stored = localStorage.getItem("foodfast_products");
          ...
        };
    Type: HIGH_RISK
    Reason: Uses localStorage to store products instead of backend API. Also uses setTimeout to simulate delays.
    Recommended Fix: Replace localStorage operations with real API calls. Remove simulateDelay function.

[24] File: frontend-web/src/services/restaurantOrderService.ts
    Line(s): 9-11, 40-82, 107-127, 152-166, 191-210
    Snippet:
        const simulateDelay = (ms: number = 300) => {
          return new Promise(resolve => setTimeout(resolve, ms));
        };
        // For now, get from localStorage via OrderContext
        const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
        ...
        // For now, update localStorage
        const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
        ...
    Type: HIGH_RISK
    Reason: Uses localStorage to store orders instead of backend API. Uses setTimeout to simulate delays. Comments say "For now" indicating temporary mock implementation.
    Recommended Fix: Replace all localStorage operations with real API calls to backend. Remove simulateDelay function.

[25] File: frontend-web/src/context/OrderContext.tsx
    Line(s): 42-47
    Snippet:
        useEffect(() => {
          const saved = localStorage.getItem("orders");
          if (saved) {
            const orders = JSON.parse(saved);
            setOrders(orders);
          }
        }, []);
        useEffect(() => {
          localStorage.setItem("orders", JSON.stringify(orders));
        }, [orders]);
    Type: HIGH_RISK
    Reason: Uses localStorage to persist orders instead of backend API. This is mock residue using localStorage as database.
    Recommended Fix: Replace with real API calls. Fetch orders from backend on mount, save to backend on changes.

[26] File: frontend-web/src/services/restaurantNotificationService.ts
    Line(s): 33, 42-64
    Snippet:
        await new Promise(resolve => setTimeout(resolve, 300));
        ...
        // For now, we'll store the notification in localStorage
        const notificationKey = `restaurant_notifications_${restaurantId}`;
        const existingNotifications = JSON.parse(
          localStorage.getItem(notificationKey) || '[]'
        );
        ...
        localStorage.setItem(notificationKey, JSON.stringify(recentNotifications));
    Type: HIGH_RISK
    Reason: Uses localStorage to store notifications instead of backend API. Uses setTimeout to simulate delay. Comment says "For now" indicating temporary mock implementation.
    Recommended Fix: Replace localStorage operations with real API calls. Remove setTimeout delay simulation.

[27] File: web/src/data/mockMenuSweetDreams.ts
    Line(s): (file exists but not read in detail)
    Type: CRITICAL_MOCK_LOGIC
    Reason: File name indicates mock menu data for SweetDreams restaurant. Likely contains hardcoded menu items.
    Recommended Fix: Read file to confirm, then remove or replace with API calls.

[28] File: web/src/data/mockDrones.ts
    Line(s): (file exists but not read in detail)
    Type: CRITICAL_MOCK_LOGIC
    Reason: File name indicates mock drone data. Likely contains hardcoded drone information.
    Recommended Fix: Read file to confirm, then remove or replace with API calls.

==================================================
SUMMARY:
- Total mock-related files found: 28
- Critical mock logic: 18
- High risk: 8
- Moderate: 4
- Low: 1
==================================================

ADDITIONAL FINDINGS:

1. Multiple setTimeout calls used to simulate API delays across services:
   - adminService.ts
   - customerService.ts
   - menuService.ts
   - restaurantOrderService.ts
   - restaurantNotificationService.ts

2. Extensive localStorage usage as database replacement:
   - OrderContext.tsx - stores orders
   - OrderCard.tsx - stores mock_users
   - menuService.ts - stores products
   - restaurantOrderService.ts - stores orders
   - restaurantNotificationService.ts - stores notifications
   - AuthContext.tsx - stores auth (acceptable for auth tokens)

3. Mock API server directory (mock-api/) contains:
   - server.js - Express server with mock endpoints
   - db.json - JSON database file
   - Multiple documentation files about mock API

4. Documentation files mentioning mock data (not code, but indicate mock usage):
   - Multiple .md files in frontend-web/ and web/ directories
   - References to mockData.ts, mockMenu files, etc.

5. Test files with proper mocking (acceptable):
   - frontend-web/src/test/setup.ts - Test mocks for localStorage, IntersectionObserver, etc.

RECOMMENDATIONS:

1. **IMMEDIATE ACTION**: Remove or replace all CRITICAL_MOCK_LOGIC files
2. **HIGH PRIORITY**: Replace all localStorage database usage with backend API calls
3. **MEDIUM PRIORITY**: Remove setTimeout delay simulations
4. **LOW PRIORITY**: Clean up misleading file names and comments
5. **VERIFICATION**: Check if axios-mock-adapter is actually used, remove if not

