import express from 'express';
import { enrollCourse, getMyCourses } from '../controllers/enrollment.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', verifyToken, enrollCourse);
router.get('/my-courses', verifyToken, getMyCourses);

export default router;