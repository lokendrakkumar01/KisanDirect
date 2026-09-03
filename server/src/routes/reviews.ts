import { Router } from 'express';
import { getReviews, createReview } from '../controllers/reviewController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);
router.get('/', getReviews);
router.post('/', createReview);

export default router;
