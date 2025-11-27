import express from 'express';
import { addCourse, getCourses } from '../controllers/course.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { authorizedRoles } from '../middleware/roles.middleware.js';

const router = express.Router();

router.post('/', authenticateToken, authorizedRoles('instructor'), addCourse);
router.get('/', getCourses);

export default router;