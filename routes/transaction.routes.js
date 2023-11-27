import express from 'express';
import * as TransactionController from '../controller/transaction.controller';

const router = express.Router();

router.post('/create-transaction', TransactionController.createTransaction);
router.get('/:id', TransactionController.getTransactionById);

export default router;