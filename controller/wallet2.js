// routes/wallet.js

const express = require('express');
const router = express.Router();
const Wallet = require('../models/wallet');

router.post('/create-wallet', async (req, res) => {
  const { userID, walletType, currency } = req.body;

  try {
    const wallet = await Wallet.create({
      UserID: userID,
      WalletAddress: generateUniqueWalletAddress(), // Implement a function to generate a unique wallet address
      Balance: 0.0, // Initial balance
      Currency: currency,
      WalletType: walletType,
    });

    res.status(201).json(wallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wallet creation failed' });
  }
});

// Function to generate a unique wallet address
function generateUniqueWalletAddress() {
  // Implement your logic to generate a unique wallet address
  return 'your-unique-wallet-address';
}

module.exports = router;
