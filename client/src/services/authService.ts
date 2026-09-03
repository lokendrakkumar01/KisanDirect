import api from './api';
import { ApiResponse, AuthResponse, LoginRequest, RegisterRequest, User } from '../types';

export const login = async (data: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const getMe = async (): Promise<ApiResponse<User>> => {
  const response = await api.get('/auth/me');
  return response.data;
};
