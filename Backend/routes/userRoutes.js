import express from 'express';
import { getUsage, updateSubscriptionTier } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/usage', protect, getUsage);
router.patch('/tier', protect, updateSubscriptionTier);

export default router;
