const express = require('express');
const router = express.Router();
const walletService = require('../controller/finalwalletpkka'); // Import your service
const { authenticate } = require('../utils/middlewares/authMiddleware')
import * as WalletController from '../controller/wallet.controller'

// Create a personal wallet for an authenticated user
router.post(`/create-wallet`, authenticate, WalletController.createWallet);

// Create a business wallet for an authenticated user
// router.post('/business/batch', authenticate, WalletController.businessWallet);
// router.get('/business/batch/list', authenticate, WalletController.businessWallet);
// router.get('/business/batch/:batchId', authenticate, WalletController.businessWallet);
// router.patch('/business/batch/:batchId', authenticate, WalletController.businessWallet);
// router.delete('/business/batch/:batchId', authenticate, WalletController.businessWallet);

module.exports = router;
