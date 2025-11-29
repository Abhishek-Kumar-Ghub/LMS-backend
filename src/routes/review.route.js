import express from 'express';
import { addReview } from '../controllers/review.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/:courseId', verifyToken, addReview);
export default router;