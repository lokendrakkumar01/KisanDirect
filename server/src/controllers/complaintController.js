import { store } from '../data/store.js';
import { v4 as uuidv4 } from 'uuid';
export const getComplaints = (req, res) => {
    res.json({ success: true, data: store.getComplaints() });
};
export const createComplaint = (req, res) => {
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
export const updateComplaintStatus = (req, res) => {
    const c = store.updateComplaintStatus(req.params.id, req.body.status);
    res.json({ success: true, data: c });
};
