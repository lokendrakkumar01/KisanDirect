import { Router } from 'express';
import { getMembers, getInventory } from '../controllers/fpoController';
import { authenticate } from '../middleware/auth';
import { requireRole } from '../middleware/roleGuard';

const router = Router();

router.use(authenticate);
router.use(requireRole(['fpo']));

router.get('/members', getMembers);
router.get('/inventory', getInventory);

export default router;
