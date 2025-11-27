import express from 'express';
import { uploadVideo, streamLesson, getLessonsByCourse } from '../controllers/lesson.controller.js';
import { videoUpload } from '../middleware/upload.middleware.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { authorizedRoles } from '../middleware/roles.middleware.js';

const router = express.Router();

router.post('/upload', verifyToken, authorizedRoles('instructor'), videoUpload, uploadVideo);
router.get('/stream/:lessonId', verifyToken, streamLesson);
router.get('/course/:courseId', verifyToken, getLessonsByCourse);

export default router;