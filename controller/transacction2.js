// routes/transaction.js

const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// Create a new transaction
router.post('/transactions', async (req, res) => {
  const { sender_id, wallet_id, receiver_id, amount, currency_code } = req.body;

  try {
    const transaction = await Transaction.create({
      sender_id,
      wallet_id,
      receiver_id,
      amount,
      currency_code,
    });

    res.status(201).json({ message: 'Transaction created successfully', transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Transaction creation failed' });
  }
});

// Get a list of transactions for a specific user
router.get('/transactions/:user_id', async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const transactions = await Transaction.findAll({
      where: {
        [Op.or]: [
          { sender_id: user_id },
          { receiver_id: user_id },
        ],
      },
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve transactions' });
  }
});

// Get transaction details by ID
router.get('/transaction/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve transaction details' });
  }
});

module.exports = router;
