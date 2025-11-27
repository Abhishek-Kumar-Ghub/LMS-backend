import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        
        if (!token) {
            return res.status(401).json({ message: "Access token required" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        
        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }
        
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export { verifyToken };