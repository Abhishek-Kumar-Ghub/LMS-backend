import mongoose from "mongoose";

const progressSchema=new mongoose.Schema({
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
    lesson:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'lesson',
        required:true,
    },
    status:{
        type:String,
        enum:['not started','in progress','completed'],
        default:'not started',
    },
    watchedDuration:{
        type:Number,
        default:0,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    }

},{timestamps:true});

export default mongoose.model('progress',progressSchema);