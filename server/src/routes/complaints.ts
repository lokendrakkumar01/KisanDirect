import { Router } from 'express';
import { getComplaints, createComplaint, updateComplaintStatus } from '../controllers/complaintController';
import { authenticate } from '../middleware/auth';
import { requireRole } from '../middleware/roleGuard';

const router = Router();

router.use(authenticate);
router.get('/', getComplaints);
router.post('/', createComplaint);
router.put('/:id/status', requireRole(['admin']), updateComplaintStatus);

export default router;
