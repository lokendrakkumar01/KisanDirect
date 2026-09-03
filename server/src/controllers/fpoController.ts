import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { store } from '../data/store';

export const getMembers = (req: AuthRequest, res: Response) => {
  res.json({ success: true, data: [] });
};

export const getInventory = (req: AuthRequest, res: Response) => {
  res.json({ success: true, data: [] });
};
