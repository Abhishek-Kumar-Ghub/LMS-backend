import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import user from '../models/user.js';

const signup=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        console.log("data recieved",name,email,password);
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=await User({name,email,password:hashedPassword});
        await newUser.save();
        res.status(201).json({message:"User created successfully"});
    }
    catch(error){
        console.error("Error during signup:",error);
        res.status(500).json({message:"internal server error"});
    }
}

const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const User=await user.findOne({email});
        if(!User){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const isPasswordValid=await bcrypt.compare(password,User.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({id:User._id,role:User.role},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.status(200).json({message:"Login successful",User,token});
    }
    catch(error){
        console.error("Error during login:",error);
        res.status(500).json({message:"internal server error"});
    }
}
export {signup,login};