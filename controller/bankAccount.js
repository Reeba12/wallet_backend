// routes/bankAccount.js

const express = require('express');
const BankAccount = require('../model/bankAccount.model');
const { v1: UUIDV1 } = require('uuid');

// Create a new bank account
export const createBankAccount = async (req, res) => {
  const { bank_name, account_holder_name, amount } = req.body;
  const account_number = UUIDV1().replace(/-/g, '').toLocaleUpperCase();

  try {
    const bankAccount = await BankAccount.create({
      bank_name,
      account_number,
      account_holder_name,
      amount,
    });

    res.status(201).json({ message: 'Bank account created successfully', bankAccount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Bank account creation failed' });
  }
};

