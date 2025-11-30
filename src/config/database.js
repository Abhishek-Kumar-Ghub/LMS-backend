import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionDb = async () => {
    try {
        const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms';
        await mongoose.connect(mongoUrl);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
    
};
export default connectionDb;
