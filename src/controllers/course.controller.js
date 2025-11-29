import Course from "../models/course.js";
import Lesson from "../models/lesson.js";
import Review from "../models/review.js";
import Enrollment from "../models/enrollment.js";
import Progress from "../models/progress.js";

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

const updateCourse=async(req,res)=>{
try{
    const{courseId}=req.params
const {title,subtitle,description,price,category,level,published}=req.body;
const course=await Course.findById(courseId)
if(!course){
return res.status(404).json({message:"course not found"})
}

if(course.instructor.toString()!==req.user._id.toString() && req.user.role!=='admin' ){
    return res.status(401).json({message :"Not authorized to update course"})
}
const updateCourse=await Course.findByIdAndUpdate(courseId, {title,subtitle,description,price,category,level,published}, {new:true})
return res.status(200).json({message:"Course updated successfully",updateCourse})
}catch(error){
console.log(error)
res.status(500).json({message:error.message})   
}
}

const deleteCourse=async(req,res)=>{
try{
    const{courseId}=req.params
const course=await Course.findById(courseId)
if(!course){
return res.status(404).json({message:"course not found"})
}

if(course.instructor.toString()!==req.user._id.toString() && req.user.role!=='admin' ){
    return res.status(401).json({message :"Not authorized to update course"})
}

const deleteCourse=await Course.findByIdAndDelete(courseId)
await Lesson.deleteMany({course:courseId})
await Review.deleteMany({course:courseId})  
await Enrollment.deleteMany({course:courseId})      
await Progress.deleteMany({course:courseId})
res.status(200).json({message:"Course deleted successfully"})

}catch(error){
console.log(error)
res.status(500).json({message:error.message})   
}
}

export { addCourse, getCourses, updateCourse ,deleteCourse};



