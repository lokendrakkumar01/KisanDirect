import { Router } from 'express';
import { getDashboard, getUsers, verifyUser } from '../controllers/adminController';
import { authenticate } from '../middleware/auth';
import { requireRole } from '../middleware/roleGuard';

const router = Router();

router.use(authenticate);
router.use(requireRole(['admin']));

router.get('/dashboard', getDashboard);
router.get('/users', getUsers);
router.put('/users/:id/verify', verifyUser);

export default router;
