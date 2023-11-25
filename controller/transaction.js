// routes/wallet.js

const express = require('express');
const router = express.Router();
const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');

router.post('/fund-wallet', async (req, res) => {
  const { userID, walletID, amount, fundingMethod } = req.body;

  try {
    // Find the user's wallet
    const wallet = await Wallet.findOne({ where: { WalletID: walletID, UserID: userID } });

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found for the user' });
    }

    // Add code to handle funding using the specified method (e.g., credit card, bank transfer, etc.)
    // For example, you can implement logic to interact with payment gateways or bank systems.

    // Record the transaction in the Transaction Database
    const transaction = await Transaction.create({
      SenderUserID: userID,
      ReceiverUserID: null, // This indicates self-funding
      Amount: amount,
      Description: 'Funding the wallet',
    });

    // Update the wallet's balance
    wallet.Balance += parseFloat(amount);
    await wallet.save();

    res.status(201).json({ message: 'Wallet funded successfully', balance: wallet.Balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Funding the wallet failed' });
  }
});

module.exports = router;
