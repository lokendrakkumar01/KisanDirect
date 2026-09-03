import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { store } from '../data/store';

export const getNotifications = (req: AuthRequest, res: Response) => {
  const notifs = store.getNotifications().filter(n => n.userId === req.user.id);
  res.json({ success: true, data: notifs });
};

export const markRead = (req: AuthRequest, res: Response) => {
  const n = store.markNotificationRead(req.params.id as string);
  res.json({ success: true, data: n });
};
