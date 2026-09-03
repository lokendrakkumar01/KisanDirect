import { Router } from 'express';
import authRoutes from './auth';
import farmerRoutes from './farmer';
import marketplaceRoutes from './marketplace';
import orderRoutes from './orders';
import bulkBuyerRoutes from './bulkBuyer';
import fpoRoutes from './fpo';
import logisticsRoutes from './logistics';
import adminRoutes from './admin';
import notificationRoutes from './notifications';
import reviewRoutes from './reviews';
import complaintRoutes from './complaints';
import aiRoutes from './ai';

const router = Router();

router.use('/auth', authRoutes);
router.use('/farmer', farmerRoutes);
router.use('/marketplace', marketplaceRoutes);
router.use('/orders', orderRoutes);
router.use('/bulk-buyer', bulkBuyerRoutes);
router.use('/fpo', fpoRoutes);
router.use('/logistics', logisticsRoutes);
router.use('/admin', adminRoutes);
router.use('/notifications', notificationRoutes);
router.use('/reviews', reviewRoutes);
router.use('/complaints', complaintRoutes);
router.use('/ai', aiRoutes);

export default router;
