import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.js';
dotenv.config();

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Access token required' });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decode.id).select('-password');
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}
export { authenticateToken };