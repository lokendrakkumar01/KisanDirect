import api from './api';
import { ApiResponse, Order, OrderStatus } from '../types';

export const createOrder = async (data: any): Promise<ApiResponse<Order>> => {
  const response = await api.post('/orders', data);
  return response.data;
};

export const getOrders = async (): Promise<ApiResponse<Order[]>> => {
  const response = await api.get('/orders');
  return response.data;
};

export const getOrderById = async (id: string): Promise<ApiResponse<Order>> => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async (id: string, status: OrderStatus): Promise<ApiResponse<Order>> => {
  const response = await api.patch(`/orders/${id}/status`, { status });
  return response.data;
};
