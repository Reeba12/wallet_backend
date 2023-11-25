const express = require('express');
const router = express.Router();
const walletService = require('../controller/finalwalletpkka'); // Import your service
const { authenticate } = require('../utils/authMiddleware');

// Create a personal wallet for an authenticated user
router.post('/create-personal-wallet', authenticate, async (req, res) => {
  try {
    const { user } = req; // The authenticated user data is available in req.user (you may need to adjust this based on your auth middleware)
    const { Currency } = req.body;
console.log("USer from postman:", user);
    const wallet = await walletService.createPersonalWallet(user, Currency);

    res.status(201).json({ WalletID: wallet.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wallet creation failed' });
  }
});

// Create a business wallet for an authenticated user
router.post('/create-business-wallet', authenticate, async (req, res) => {
  try {
    const { user } = req; // The authenticated user data is available in req.user (you may need to adjust this based on your auth middleware)
    const { Currency } = req.body;

    const wallet = await walletService.createBusinessWallet(user, Currency);

    res.status(201).json({ WalletID: wallet.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wallet creation failed' });
  }
});

module.exports = router;
