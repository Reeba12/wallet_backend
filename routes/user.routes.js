// routes/userRoutes.js
import express from 'express';
import * as UserController from '../controller/user.controller';

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/:userId', UserController.getUser);


// Repeat a similar structure for other route files
export default router;