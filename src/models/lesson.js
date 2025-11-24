import mongoose from "mongoose";
import course from "./course";
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
    VideoUrl:{
        type:String,
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