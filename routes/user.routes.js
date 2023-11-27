
import express from 'express';
import * as UserController from '../controller/userMongo.controller.js';

const router = express.Router();

router.patch('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);
router.get('/:userId', UserController.getUser);
router.get('/', UserController.getAllUser);

export default router;