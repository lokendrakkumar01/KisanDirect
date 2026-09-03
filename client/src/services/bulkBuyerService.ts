import api from './api';
import { ApiResponse, BulkRequirement, Offer } from '../types';

export const postRequirement = async (data: Partial<BulkRequirement>): Promise<ApiResponse<BulkRequirement>> => {
  const response = await api.post('/bulk-buyer/requirements', data);
  return response.data;
};

export const getRequirements = async (): Promise<ApiResponse<BulkRequirement[]>> => {
  const response = await api.get('/bulk-buyer/requirements');
  return response.data;
};

export const getOffers = async (requirementId: string): Promise<ApiResponse<Offer[]>> => {
  const response = await api.get(`/bulk-buyer/requirements/${requirementId}/offers`);
  return response.data;
};

export const respondToOffer = async (offerId: string, action: 'accept' | 'reject'): Promise<ApiResponse<Offer>> => {
  const response = await api.post(`/bulk-buyer/offers/${offerId}/respond`, { action });
  return response.data;
};
