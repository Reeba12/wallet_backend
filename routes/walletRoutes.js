import express from 'express';
const router = express.Router(); // Import your service
import { authenticate } from '../utils/middlewares/authMiddleware.js';
import * as WalletController from '../controller/wallet.controller.js';

// Create a personal wallet for an authenticated user
router.post(`/personal`, authenticate, WalletController.personalWallet)

// Create a business wallet for an authenticated user
router.post('/business', authenticate, WalletController.businessWallet);
// router.post('/business/batch', authenticate, WalletController.businessWallet);
// router.get('/business/batch/list', authenticate, WalletController.businessWallet);
// router.get('/business/batch/:batchId', authenticate, WalletController.businessWallet);
// router.patch('/business/batch/:batchId', authenticate, WalletController.businessWallet);
// router.delete('/business/batch/:batchId', authenticate, WalletController.businessWallet);

export default router;
