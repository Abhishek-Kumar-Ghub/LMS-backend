import mongoose from 'mongoose'
import { ROLES } from '../constants/roles.js';

const userSchema=new mongoose.Schema({
name:{
type:String,
required:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,
},
role:{
    type:String,
    enum:Object.values(ROLES),
    default: ROLES.STUDENT,
},
createdAt:{
    type:Date,
    default:Date.now,
},

    isBlocked:{
    type:Boolean,   
    default:false
    }

},{timestamps:true});
const User= mongoose.model('User',userSchema);
export default User;