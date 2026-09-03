import api from './api';
import { ApiResponse, FPOMember, AggregatedListing } from '../types';

export const getMembers = async (): Promise<ApiResponse<FPOMember[]>> => {
  const response = await api.get('/fpo/members');
  return response.data;
};

export const getInventory = async (): Promise<ApiResponse<any[]>> => {
  const response = await api.get('/fpo/inventory');
  return response.data;
};

export const createAggregation = async (data: any): Promise<ApiResponse<AggregatedListing>> => {
  const response = await api.post('/fpo/aggregations', data);
  return response.data;
};

export const getAnalytics = async (): Promise<ApiResponse<any>> => {
  const response = await api.get('/fpo/analytics');
  return response.data;
};
