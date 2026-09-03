import api from './api';
import { ApiResponse, User, PlatformAnalytics } from '../types';

export const getDashboard = async (): Promise<ApiResponse<any>> => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};

export const getUsers = async (): Promise<ApiResponse<User[]>> => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const verifyUser = async (id: string, status: 'verified' | 'rejected'): Promise<ApiResponse<User>> => {
  const response = await api.post(`/admin/users/${id}/verify`, { status });
  return response.data;
};

export const getAnalytics = async (): Promise<ApiResponse<PlatformAnalytics>> => {
  const response = await api.get('/admin/analytics');
  return response.data;
};
