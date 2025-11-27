import express from 'express';
import { addReview } from '../controllers/review.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/:courseId', authenticateToken, addReview);

export default router;