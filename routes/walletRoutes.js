const express = require('express');
const router = express.Router();
const walletService = require('../controller/finalwalletpkka'); // Import your service
const { authenticate } = require('../utils/middlewares/authMiddleware')
import * as WalletController from '../controller/wallet.controller'

// Create a personal wallet for an authenticated user
router.post(`/personal`, authenticate, WalletController.personalWallet)

// Create a business wallet for an authenticated user
router.post('/business', authenticate, WalletController.businessWallet);

module.exports = router;
