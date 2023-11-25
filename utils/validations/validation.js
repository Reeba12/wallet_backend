import { body } from 'express-validator';

// Validation rules for signup route using express-validator
export const signUpValidationRules = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email_address').isEmail().withMessage('Invalid email address'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    // Add more validation rules for other fields as needed
];