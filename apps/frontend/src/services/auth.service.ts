import api from './api';
import { useAuthStore, type User } from '../store/authStore';

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    useAuthStore.getState().login(data.user, data.accessToken, data.refreshToken);
    return data;
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      useAuthStore.getState().logout();
    }
  },

  async refreshToken(): Promise<string> {
    const refreshToken = useAuthStore.getState().refreshToken;
    const { data } = await api.post<{ accessToken: string }>('/auth/refresh', {
      refreshToken,
    });
    useAuthStore.getState().setToken(data.accessToken);
    return data.accessToken;
  },

  async getProfile(): Promise<User> {
    const { data } = await api.get<User>('/auth/profile');
    useAuthStore.getState().setUser(data);
    return data;
  },
};
