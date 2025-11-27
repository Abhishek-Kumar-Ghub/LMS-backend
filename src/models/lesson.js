import mongoose from "mongoose";
const lessonSchema=new mongoose.Schema({

    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'course',
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    videoUrl: {
        type: String,
    },
    videoFile: {
        name: String,
        size: Number,
        mimetype: String
    },
    content:{
        type:String,    
    },
    order:{
        type:Number,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

},{timestamps:true});

export default mongoose.model('lesson',lessonSchema);