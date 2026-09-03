import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { store } from '../data/store';

export const getDashboard = (req: AuthRequest, res: Response) => {
  const analytics = store.getAnalytics();
  res.json({ success: true, data: analytics });
};

export const getUsers = (req: AuthRequest, res: Response) => {
  res.json({ success: true, data: store.getUsers() });
};

export const verifyUser = (req: AuthRequest, res: Response) => {
  const user = store.getUserById(req.params.id as string);
  if (user) {
    user.isVerified = true;
    user.verificationStatus = 'verified';
    return res.json({ success: true, data: user });
  }
  res.status(404).json({ success: false, error: 'Not found' });
};
