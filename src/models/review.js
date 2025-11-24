import mongoose from "mongoose";

const reviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'course',
        required:true,
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true, 
    },
    comment:{
        type:String,  
        maxlength:500,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
},{timestamps:true});

export default mongoose.model('review',reviewSchema);