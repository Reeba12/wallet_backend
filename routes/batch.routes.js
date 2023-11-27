// routes/userRoutes.js
import express from 'express';
import * as BatchController from '../controller/batch.controller.js';

const router = express.Router();

router.post('/create', BatchController.createBatch);
router.get('/list', BatchController.getAllBatch);
router.get('/:id', BatchController.getBatchById);
router.delete('/:id', BatchController.deleteBatch);

export default router;