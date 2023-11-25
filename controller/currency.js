// routes/currency.js

const express = require('express');
const router = express.Router();
const Currency = require('../models/currency');

// Create a new currency
router.post('/currencies', async (req, res) => {
  const { currency_code, currency_name } = req.body;

  try {
    const currency = await Currency.create({ currency_code, currency_name });
    res.status(201).json({ message: 'Currency created successfully', currency });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Currency creation failed' });
  }
});

// Get a list of all currencies
router.get('/currencies', async (req, res) => {
  try {
    const currencies = await Currency.findAll();
    res.status(200).json(currencies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve currencies' });
  }
});

// Get currency details by ID
router.get('/currency/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const currency = await Currency.findByPk(id);

    if (!currency) {
      return res.status(404).json({ error: 'Currency not found' });
    }

    res.status(200).json(currency);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve currency details' });
  }
});

module.exports = router;
