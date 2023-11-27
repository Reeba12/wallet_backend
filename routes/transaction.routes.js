import express from 'express';
import * as TransactionController from '../controller/transaction.controller';

const router = express.Router();

router.post('/create', TransactionController.createTransaction);
router.get('/:id', TransactionController.getTransactionById);
router.post('/batch', TransactionController.createBatchTransaction);

export default router;