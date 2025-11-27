import express from 'express';
import dotenv from 'dotenv';
import connectionDb from './src/config/database.js';
import userRouter from './src/routes/user.route.js';
import courseRouter from './src/routes/course.route.js';
import lessonRouter from './src/routes/lesson.route.js';
import enrollmentRouter from './src/routes/enrollment.route.js';
import progressRouter from './src/routes/progress.route.js';
import reviewRouter from './src/routes/review.route.js';

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
connectionDb();

app.get('/', (req, res) => {
    res.send('LMS Backend Server is running');
});

app.use('/api/user', userRouter);
app.use('/api/course', courseRouter);
app.use('/api/lesson', lessonRouter);
app.use('/api/enrollment', enrollmentRouter);
app.use('/api/progress', progressRouter);
app.use('/api/review', reviewRouter);

app.listen(PORT, () => {
    console.log(`LMS Backend Server running on port ${PORT}`);
});