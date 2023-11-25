// routes/wallet.js

const express = require('express');
const router = express.Router();
const Wallet = require('../models/wallet');

// Create a new wallet
router.post('/wallets', async (req, res) => {
  const { type, user_id } = req.body;

  try {
    const wallet = await Wallet.create({ type, user_id });
    res.status(201).json({ message: 'Wallet created successfully', wallet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wallet creation failed' });
  }
});

// Get a list of all wallets
router.get('/wallets', async (req, res) => {
  try {
    const wallets = await Wallet.findAll();
    res.status(200).json(wallets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve wallets' });
  }
});

// Get wallet details by ID
router.get('/wallet/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const wallet = await Wallet.findByPk(id);

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    res.status(200).json(wallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve wallet details' });
  }
});

module.exports = router;
