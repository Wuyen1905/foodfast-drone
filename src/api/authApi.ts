import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('auth_user');
      localStorage.removeItem('role');
    }
    return Promise.reject(error);
  }
);

export interface LoginApiResponse {
  ok: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    username: string;
    name: string;
    email?: string;
    phone?: string;
    role: 'admin' | 'restaurant' | 'customer';
    restaurantId?: string | null;
    orderCount?: number;
    createdAt?: number;
  };
}

export async function login(payload: { username: string; password: string }): Promise<LoginApiResponse> {
  try {
    const res = await apiClient.post('/auth/login', payload);
    const data = res.data;

    // Backend returns: { id, username, role, restaurantId, name }
    // Note: Backend doesn't return email/phone in login response, but we normalize the response
    // We need to normalize it to match the expected LoginApiResponse format
    return {
      ok: true,
      token: `token_${data.username}_${Date.now()}`,
      user: {
        id: data.id,
        username: data.username,
        name: data.name,
        email: data.email || undefined,
        phone: data.phone || undefined,
        role: data.role, // Must be "admin" | "restaurant" | "customer" from backend - no fallback
        restaurantId: data.restaurantId || null,
        orderCount: data.orderCount || 0,
        createdAt: data.createdAt || Date.now(),
      },
    };
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Sai tên đăng nhập hoặc mật khẩu';

    return { ok: false, message };
  }
}

export async function register(payload: {
  username: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
}): Promise<LoginApiResponse> {
  try {
    const res = await apiClient.post('/auth/register', payload);
    const data = res.data;

    // Backend register returns: { ok: true, data: User }
    if (data.ok && data.data) {
      const userData = data.data;
      return {
        ok: true,
        token: `token_${userData.username}_${Date.now()}`,
        user: {
          id: userData.id,
          username: userData.username,
          name: userData.name,
          email: userData.email || undefined,
          phone: userData.phone || undefined,
          role: userData.role || 'customer',
          restaurantId: userData.restaurantId || null,
          orderCount: userData.orderCount || 0,
          createdAt: userData.createdAt || Date.now(),
        },
      };
    }

    return { ok: false, message: data.message || 'Đăng ký thất bại' };
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Có lỗi xảy ra, vui lòng thử lại';

    return { ok: false, message };
  }
}

