import api from './api';
import { ApiResponse, Notification } from '../types';

export const getNotifications = async (): Promise<ApiResponse<Notification[]>> => {
  const response = await api.get('/notifications');
  return response.data;
};

export const markRead = async (id: string): Promise<ApiResponse<void>> => {
  const response = await api.patch(`/notifications/${id}/read`);
  return response.data;
};

export const getUnreadCount = async (): Promise<ApiResponse<{ count: number }>> => {
  const response = await api.get('/notifications/unread-count');
  return response.data;
};
