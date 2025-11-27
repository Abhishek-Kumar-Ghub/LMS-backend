import express from 'express';
import { markProgress } from '../controllers/progress.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', verifyToken, markProgress);

export default router;