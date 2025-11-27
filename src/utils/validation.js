import mongoose from 'mongoose';

export const validateObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    return password && password.length >= 6;
};

export const validateRequired = (fields) => {
    const missing = [];
    for (const [key, value] of Object.entries(fields)) {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
            missing.push(key);
        }
    }
    return missing;
};

export const validateCourseData = (data) => {
    const required = { title: data.title, category: data.category };
    return validateRequired(required);
};

export const validateUserData = (data) => {
    const required = { name: data.name, email: data.email, password: data.password };
    const missing = validateRequired(required);
    
    if (data.email && !validateEmail(data.email)) {
        missing.push('valid email');
    }
    
    if (data.password && !validatePassword(data.password)) {
        missing.push('password (min 6 chars)');
    }
    
    return missing;
};