// routes/userRoutes.js
import express from 'express';
import * as AuthController from '../controller/auth.controller';
import { signUpValidationRules } from '../utils/validations/validation';

const router = express.Router();

router.post('/signup', signUpValidationRules, AuthController.signup);
router.post('/login', AuthController.login);


// Repeat a similar structure for other route files
export default router;