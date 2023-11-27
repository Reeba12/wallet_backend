// routes/userRoutes.js
import express from 'express';
import * as BatchController from '../controller/batch.controller.js';

const router = express.Router();

router.post('/create-batch', BatchController.createBatch);
router.get('/list', BatchController.getAllBatch);
export default router;