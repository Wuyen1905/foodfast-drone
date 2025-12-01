import axios from "axios";
import { getBackendUrl } from "./getBackendUrl";

const apiClient = axios.create({
	baseURL: "http://192.168.1.101:8080/api", // Temporary, will be updated
	timeout: 10000,
	headers: { "Content-Type": "application/json" },
});

(async () => {
	const BASE_URL = await getBackendUrl();
	console.log("[MOBILE] Using backend:", BASE_URL);
	apiClient.defaults.baseURL = BASE_URL;
})();

// Request interceptor to add auth token (React Native compatible)
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      // Silent fail if AsyncStorage not available
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token (React Native compatible)
      try {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('auth_user');
        await AsyncStorage.removeItem('role');
      } catch (e) {
        // Silent fail
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

