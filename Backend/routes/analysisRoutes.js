import express from 'express';
import {
  getAnalyses,
  createAnalysis,
  updateAnalysis,
  deleteAnalysis,
} from '../controllers/analysisController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getAnalyses).post(protect, createAnalysis);
router
  .route('/:id')
  .put(protect, updateAnalysis)
  .delete(protect, deleteAnalysis);

export default router;
