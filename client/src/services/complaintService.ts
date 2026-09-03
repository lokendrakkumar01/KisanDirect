import api from './api';
import { ApiResponse, Complaint } from '../types';

export const getComplaints = async (): Promise<ApiResponse<Complaint[]>> => {
  const response = await api.get('/complaints');
  return response.data;
};

export const createComplaint = async (data: Partial<Complaint>): Promise<ApiResponse<Complaint>> => {
  const response = await api.post('/complaints', data);
  return response.data;
};
