// routes/userRoutes.js
import express from 'express';
import * as BankAccountController from '../controller/bankAccount.js';
import * as BankController from '../controller/bank.js';
import * as TransferController from '../controller/fund_transfer.controller.js';
const router = express.Router();

router.post('/bank-account', BankAccountController.createBankAccount);
router.get('/transfer-fund', TransferController.transferFundtoWalletFromBank);


export default router;