import mongoose from "mongoose";

const reviewSchema= new mongoose.Schema({
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:true,
    },
    //student
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    //ratings
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5,
    },
    //comment
    comment:{
        type:String,
        trim:true,
    }
    //timestamp
},{timestamps:true})

const Review= mongoose.model("Review",reviewSchema);
export default Review;
