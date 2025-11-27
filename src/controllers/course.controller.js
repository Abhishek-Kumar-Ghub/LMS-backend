import Course from "../models/course.js";

const addCourse = async (req, res) => {
    try {
        const { title, subtitle, description, price, category, level } = req.body;
        const course = await Course.create({
            title,
            subtitle,
            description,
            price,
            category,
            level,
            instructor: req.user._id
        });
        return res.status(201).json({ message: "Course created", course });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("instructor", "name")
        res.status(200).json({ message: "Courses fetched", courses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { addCourse, getCourses };