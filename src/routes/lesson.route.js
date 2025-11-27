import express from 'express';
import { uploadVideo, streamLesson, getLessonsByCourse } from '../controllers/lesson.controller.js';
import upload from '../middleware/upload.middleware.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { authorizedRoles } from '../middleware/roles.middleware.js';

const router = express.Router();

router.post('/upload', authenticateToken, authorizedRoles('instructor'), upload.single('video'), uploadVideo);
router.get('/stream/:lessonId', authenticateToken, streamLesson);
router.get('/course/:courseId', authenticateToken, getLessonsByCourse);

export default router;