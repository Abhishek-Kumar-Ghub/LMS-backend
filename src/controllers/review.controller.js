import Course from "../models/course.js";
import Enrollment from "../models/enrollment.js";
import Review from "../models/review.js";


const addReview = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { rating, comment } = req.body;
    const enrolled = await Enrollment.findOne({
      course: courseId,
      student: req.user._id,
    });
    if (!enrolled) {
      return res
        .status(403)
        .json({ message: "You must be enrolled to give review" });
    }
    const review = await Review.create({
      course: courseId,
      student: req.user._id,
      rating,
      comment,
    });
    const stats = await Review.aggregate([
      { $match: { course: review.course } },
      { $group: { _id: "$course", avgRating: { $avg: "$rating" } } },
    ]);

    if(stats.length>0){
        await Course.findByIdAndUpdate(courseId,{averageRating:stats[0].avgRating})
    }
    res.status(201).json({ message: "Review created successfully", review });
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
};

const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
     }

     if(review.student.toString()!==req.user._id.toString() && req.user.role!=='admin'){
        return res.status(401).json({message :"Not authorized to delete review"})
     }
     const deletedReview = await Review.findByIdAndDelete(reviewId);
     const stats = await Review.aggregate([
      { $match: { course: review.course } },
      { $group: { _id: "$course", avgRating: { $avg: "$rating" } } },
    ]); 
    const newAvg = stats.length > 0 ? stats[0].avgRating : 0;
     res.status(200).json({message:"Review deleted successfully", deletedReview})
      await Course.findByIdAndUpdate(review.course,{averageRating:newAvg})
  }catch (error) {  
    console.log(error.message)
      return res.status(500).json({message:error.message})
  }
}

export {addReview ,deleteReview};
