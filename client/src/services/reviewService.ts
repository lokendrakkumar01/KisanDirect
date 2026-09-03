import api from './api';
import { ApiResponse, Review } from '../types';

export const getReviews = async (userId: string): Promise<ApiResponse<Review[]>> => {
  const response = await api.get(`/reviews/user/${userId}`);
  return response.data;
};

export const createReview = async (data: Partial<Review>): Promise<ApiResponse<Review>> => {
  const response = await api.post('/reviews', data);
  return response.data;
};
