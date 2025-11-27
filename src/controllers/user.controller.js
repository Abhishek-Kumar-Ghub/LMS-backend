import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { validateUserData, validateRequired } from '../utils/validation.js';

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        const validationErrors = validateUserData({ name, email, password });
        if (validationErrors.length > 0) {
            return res.status(400).json({ message: `Missing or invalid: ${validationErrors.join(', ')}` });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const missing = validateRequired({ email, password });
        if (missing.length > 0) {
            return res.status(400).json({ message: `Missing: ${missing.join(', ')}` });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const { password: _, ...userWithoutPassword } = user.toObject();
        
        res.status(200).json({ message: "Login successful", user: userWithoutPassword, token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
export { signup, login };