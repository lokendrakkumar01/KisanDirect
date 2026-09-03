import { Router } from 'express';
import { getDashboard, getUsers, verifyUser, updateUserRole } from '../controllers/adminController.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/roleGuard.js';

const router = Router();
router.use(authenticate);
router.use(requireRole(['admin']));

router.get('/dashboard', getDashboard);
router.get('/users', getUsers);
router.post('/users/:id/verify', verifyUser);
router.put('/users/:id/verify', verifyUser);
router.post('/users/:id/role', updateUserRole);
router.put('/users/:id/role', updateUserRole);

export default router;
