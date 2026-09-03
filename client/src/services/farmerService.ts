import api from './api';
import { ApiResponse, FarmerProfile, CropListing, CreateListingRequest, Harvest } from '../types';

export const getProfile = async (): Promise<ApiResponse<FarmerProfile>> => {
  const response = await api.get('/farmer/profile');
  return response.data;
};

export const getListings = async (): Promise<ApiResponse<CropListing[]>> => {
  const response = await api.get('/farmer/listings');
  return response.data;
};

export const createListing = async (data: CreateListingRequest): Promise<ApiResponse<CropListing>> => {
  const response = await api.post('/farmer/listings', data);
  return response.data;
};

export const updateListing = async (id: string, data: Partial<CreateListingRequest>): Promise<ApiResponse<CropListing>> => {
  const response = await api.put(`/farmer/listings/${id}`, data);
  return response.data;
};

export const deleteListing = async (id: string): Promise<ApiResponse<void>> => {
  const response = await api.delete(`/farmer/listings/${id}`);
  return response.data;
};

export const getEarnings = async (): Promise<ApiResponse<any>> => {
  const response = await api.get('/farmer/earnings');
  return response.data;
};

export const getHarvests = async (): Promise<ApiResponse<Harvest[]>> => {
  const response = await api.get('/farmer/harvests');
  return response.data;
};
