// routes/bankAccount.js

const express = require('express');
const router = express.Router();
const BankAccount = require('../models/bankAccount');

// Create a new bank account
router.post('/bank-accounts', async (req, res) => {
  const { bank_name, account_number, account_holder_name, user_id } = req.body;

  try {
    const bankAccount = await BankAccount.create({
      bank_name,
      account_number,
      account_holder_name,
      user_id,
    });

    res.status(201).json({ message: 'Bank account created successfully', bankAccount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Bank account creation failed' });
  }
});

// Get a list of bank accounts for a specific user
router.get('/bank-accounts/:user_id', async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const bankAccounts = await BankAccount.findAll({ where: { user_id } });

    res.status(200).json(bankAccounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bank accounts' });
  }
});

// Update a bank account
router.put('/bank-accounts/:id', async (req, res) => {
  const { bank_name, account_number, account_holder_name } = req.body;
  const id = req.params.id;

  try {
    const bankAccount = await BankAccount.findByPk(id);

    if (!bankAccount) {
      return res.status(404).json({ error: 'Bank account not found' });
    }

    bankAccount.bank_name = bank_name;
    bankAccount.account_number = account_number;
    bankAccount.account_holder_name = account_holder_name;

    await bankAccount.save();

    res.status(200).json({ message: 'Bank account updated successfully', bankAccount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Bank account update failed' });
  }
});

// Delete a bank account
router.delete('/bank-accounts/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const bankAccount = await BankAccount.findByPk(id);

    if (!bankAccount) {
      return res.status(404).json({ error: 'Bank account not found' });
    }

    await bankAccount.destroy();

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Bank account deletion failed' });
  }
});

module.exports = router;
