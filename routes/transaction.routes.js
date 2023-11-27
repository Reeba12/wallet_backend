// routes/userRoutes.js
import express from 'express';
import * as TransactionController from '../controller/transaction.controller';

const router = express.Router();

router.post('/transfertowallet', TransactionController.transactionToWallet);
router.post('/transfertobank', TransactionController.transactionToBank);
router.get('/list/:id', TransactionController.getTransactionById);

export default router;