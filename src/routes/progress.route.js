import express from 'express';
import { markProgress } from '../controllers/progress.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authenticateToken, markProgress);

export default router;