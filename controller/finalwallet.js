// routes/wallet.js

const express = require('express');
const router = express.Router();
const Wallet = require('../models/Wallet');

function generateUniqueWalletAddress() {
    // Generate a random string to simulate a unique wallet address
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const addressLength = 64; // Adjust the length as needed
    let walletAddress = '';
  
    for (let i = 0; i < addressLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      walletAddress += charset.charAt(randomIndex);
    }
  
    return walletAddress;
  }
// Create a personal wallet
router.post('/create-personal-wallet', async (req, res) => {
  try {
    const { UserId, Currency } = req.body;
    const walletAddress = generateUniqueWalletAddress(); // Implement your unique address generation logic
    const values = { WalletAddress: walletAddress, Balance: 0.00, Currency, WalletType: 'Personal', UserId };

    const wallet = await Wallet.create(values);

    res.status(201).json({ WalletID: wallet.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wallet creation failed' });
  }
});

// Create a business wallet
router.post('/create-business-wallet', async (req, res) => {
  try {
    const { UserId, Currency } = req.body;
    const walletAddress = generateUniqueWalletAddress(); // Implement your unique address generation logic
    const values = { WalletAddress: walletAddress, Balance: 0.00, Currency, WalletType: 'Business', UserId };

    const wallet = await Wallet.create(values);

    res.status(201).json({ WalletID: wallet.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wallet creation failed' });
  }
});

module.exports = router;
