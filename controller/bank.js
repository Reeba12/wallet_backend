// routes/bank.js
import express from 'express';
import Bank from '../model/bank.model.js';

const router = express.Router();

// Create a new bank
export const createBank = async (req, res) => {
  const {
    bank_name,
    country,
    bank_code,
  } = req.body;

  try {
    const bank = await Bank.create({
      bank_name,
      country,
      bank_code,
    });
    res.status(201).json({ message: 'Bank created successfully', bank });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Bank creation failed' });
  }
};

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

export default router;
