import api from './api';
import { ApiResponse, Delivery, Vehicle, Driver, OptimizedRoute } from '../types';

export const getDeliveries = async (): Promise<ApiResponse<Delivery[]>> => {
  const response = await api.get('/logistics/deliveries');
  return response.data;
};

export const getDeliveryById = async (id: string): Promise<ApiResponse<Delivery>> => {
  const response = await api.get(`/logistics/deliveries/${id}`);
  return response.data;
};

export const updateDeliveryStatus = async (id: string, status: string, note?: string): Promise<ApiResponse<Delivery>> => {
  const response = await api.patch(`/logistics/deliveries/${id}/status`, { status, note });
  return response.data;
};

export const getVehicles = async (): Promise<ApiResponse<Vehicle[]>> => {
  const response = await api.get('/logistics/vehicles');
  return response.data;
};

export const getDrivers = async (): Promise<ApiResponse<Driver[]>> => {
  const response = await api.get('/logistics/drivers');
  return response.data;
};

export const optimizeRoute = async (points: any[]): Promise<ApiResponse<OptimizedRoute>> => {
  const response = await api.post('/logistics/routes/optimize', { points });
  return response.data;
};
