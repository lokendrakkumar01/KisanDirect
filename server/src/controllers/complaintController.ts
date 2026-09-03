import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { store } from '../data/store';
import { v4 as uuidv4 } from 'uuid';

export const getComplaints = (req: AuthRequest, res: Response) => {
  res.json({ success: true, data: store.getComplaints() });
};

export const createComplaint = (req: AuthRequest, res: Response) => {
  const c = store.createComplaint({
    id: uuidv4(),
    complaintNumber: `CMP-${Date.now()}`,
    userId: req.user.id,
    userName: req.user.name,
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...req.body
  });
  res.status(201).json({ success: true, data: c });
};

export const updateComplaintStatus = (req: AuthRequest, res: Response) => {
  const c = store.updateComplaintStatus(req.params.id as string, req.body.status);
  res.json({ success: true, data: c });
};
