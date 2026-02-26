import Course from "../models/course.js";
import Enrollment from "../models/enrollment.js";

//enrollcourse
const enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const enrollment = await Enrollment.create({
            student: req.user._id,
            course: courseId,
            paidAmount: course.price,
            paymentStatus: "paid"
        });
        
        course.studentCount += 1;
        await course.save();

        return res.status(201).json({ message: "Enrolled successfully", enrollment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyCourses = async (req, res) => {
    try {
        const enrolledCourses = await Enrollment.find({ student: req.user._id })
            .populate({
                path: "course",
                select: "title subtitle thumbnailUrl instructor",
                populate: { path: 'instructor', select: 'name' }
            });
        
        res.status(200).json({ message: "Data fetched successfully", enrolledCourses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { enrollCourse, getMyCourses };
