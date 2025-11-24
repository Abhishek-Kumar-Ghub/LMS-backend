import mongoose from "mongoose";
const enrollmentSchema=new mongoose.Schema({
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
    progress:{
        type:Number,
        default:0,
    },
    completedLessons:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'lesson',
        }
    ],
    enrolledAt:{
        type:Date,
        default:Date.now,
    }
},{timestamps:true});

export default mongoose.model('enrollment',enrollmentSchema);