// routes/userRoutes.js
import express from 'express';
import * as AuthController from '../controller/auth.controller.js';
import { signUpValidationRules } from '../utils/validations/validation.js';

const router = express.Router();

router.post('/signup', signUpValidationRules, AuthController.signup);
router.post('/login', AuthController.login);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);
router.post('/send-otp', AuthController.sendOTPviaSMS);
router.post('/verify-otp', AuthController.verifyOtp);


export default router;