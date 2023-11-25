// routes/bank.js

const express = require('express');
const router = express.Router();
const Bank = require('../models/bank');

// Create a new bank
router.post('/banks', async (req, res) => {
  const {
    bank_name,
    country,
    bank_code,
    branch,
    contact_number,
    contact_email,
    address,
    supported_currencies,
    status,
    compliance_status,
  } = req.body;

  try {
    const bank = await Bank.create({
      bank_name,
      country,
      bank_code,
      branch,
      contact_number,
      contact_email,
      address,
      supported_currencies,
      status,
      compliance_status,
    });
    res.status(201).json({ message: 'Bank created successfully', bank });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Bank creation failed' });
  }
});

// Get a list of all banks
router.get('/banks', async (req, res) => {
  try {
    const banks = await Bank.findAll();
    res.status(200).json(banks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve banks' });
  }
});

// Get bank details by ID
router.get('/bank/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const bank = await Bank.findByPk(id);

    if (!bank) {
      return res.status(404).json({ error: 'Bank not found' });
    }

    res.status(200).json(bank);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bank details' });
  }
});

module.exports = router;
