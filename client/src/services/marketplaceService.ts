import api from './api';
import { ApiResponse, CropListing, MarketplaceFilters } from '../types';

export const getProducts = async (filters?: MarketplaceFilters): Promise<ApiResponse<CropListing[]>> => {
  const response = await api.get('/marketplace/products', { params: filters });
  return response.data;
};

export const getProductById = async (id: string): Promise<ApiResponse<CropListing>> => {
  const response = await api.get(`/marketplace/products/${id}`);
  return response.data;
};

export const searchProducts = async (query: string): Promise<ApiResponse<CropListing[]>> => {
  const response = await api.get('/marketplace/search', { params: { q: query } });
  return response.data;
};
