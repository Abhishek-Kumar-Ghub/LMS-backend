import Enrollment from "../models/enrollment.js";
import Progress from "../models/progress.js";

const markProgress = async (req, res) => {
    try {
        const { courseId, lessonId } = req.body;

        const enrolled = await Enrollment.findOne({ course: courseId, student: req.user._id });
        if (!enrolled) {
            return res.status(403).json({ message: "You must be enrolled to mark progress" });
        }
        
        let progress = await Progress.findOne({ course: courseId, student: req.user._id });
        if (!progress) {
            progress = await Progress.create({
                course: courseId,
                student: req.user._id,
                completedLessons: [lessonId],
                lastLesson: lessonId
            });
        } else {
            if (!progress.completedLessons.includes(lessonId)) {
                progress.completedLessons.push(lessonId);
            }
            progress.lastLesson = lessonId;
            await progress.save();
        }
        
        res.status(201).json({ message: "Progress saved", progress });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { markProgress };