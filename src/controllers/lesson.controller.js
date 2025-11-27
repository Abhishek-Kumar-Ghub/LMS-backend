import Lesson from '../models/lesson.js';
import Course from '../models/course.js';
import imagekit from '../config/imagekit.js';

const uploadVideo = async (req, res) => {
    try {
        if (!imagekit) {
            return res.status(503).json({ message: 'Video upload service unavailable' });
        }

        const { courseId, title, content, order } = req.body;
        const videoFile = req.files?.video?.[0] || req.files?.videoFile?.[0] || req.files?.file?.[0];
        
        if (!videoFile) {
            return res.status(400).json({ message: 'Video file is required' });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const uploadResponse = await imagekit.upload({
            file: videoFile.buffer,
            fileName: `${courseId}_${title}_${Date.now()}.${videoFile.originalname.split('.').pop()}`,
            folder: `/courses/${courseId}/lessons`
        });

        const lesson = await Lesson.create({
            course: courseId,
            title,
            videoUrl: uploadResponse.url,
            videoFile: {
                name: videoFile.originalname,
                size: videoFile.size,
                mimetype: videoFile.mimetype
            },
            content,
            order
        });

        res.status(201).json({ message: 'Video uploaded successfully', lesson });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const streamLesson = async (req, res) => {
    try {
        const { lessonId } = req.params;
        
        const lesson = await Lesson.findById(lessonId).populate('course');
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        let videoUrl = lesson.videoUrl;
        if (imagekit && lesson.videoUrl) {
            videoUrl = imagekit.url({
                src: lesson.videoUrl,
                transformation: [{
                    quality: 'auto',
                    format: 'auto'
                }]
            });
        }

        res.json({
            lesson: {
                id: lesson._id,
                title: lesson.title,
                content: lesson.content,
                videoUrl,
                videoFile: lesson.videoFile,
                course: lesson.course.title
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLessonsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        
        const lessons = await Lesson.find({ course: courseId }).sort({ order: 1 });
        res.json({ lessons });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { uploadVideo, streamLesson, getLessonsByCourse };