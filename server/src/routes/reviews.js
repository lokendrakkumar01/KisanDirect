import { Router } from 'express';
import { getReviews, createReview } from '../controllers/reviewController.js';
import { authenticate } from '../middleware/auth.js';
const router = Router();
router.use(authenticate);
router.get('/', getReviews);
router.post('/', createReview);
export default router;
