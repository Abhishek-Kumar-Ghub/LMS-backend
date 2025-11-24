import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionDb=async()=>{
    try{
        const mongoUrl=process.env.MONGODB_URL;
        await mongoose.connect(mongoUrl)
            console.log("Database connected successfully");
        }
    catch(error){
        console.log("Database connection failed",error);
    }
    }
    export default connectionDb;