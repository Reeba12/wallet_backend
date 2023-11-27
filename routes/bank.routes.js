// routes/userRoutes.js
import express from 'express';
import * as BankAccountController from '../controller/bankAccountMongo.controller.js';
import * as BankController from '../controller/bankMongo.controller.js';
import * as TransferController from '../controller/fund_transferMongo.controller.js';
const router = express.Router();

router.post('/bank-account', BankAccountController.createBankAccount);
router.get('/transfer-fund', TransferController.transferFundtoWalletFromBank);


export default router;