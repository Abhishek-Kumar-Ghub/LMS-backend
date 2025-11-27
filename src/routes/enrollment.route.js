import express from 'express';
import { enrollCourse, getMyCourses } from '../controllers/enrollment.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authenticateToken, enrollCourse);
router.get('/my-courses', authenticateToken, getMyCourses);

export default router;