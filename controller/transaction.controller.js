// routes/wallet.js
import User from '../model/user.model';
const express = require('express');
const router = express.Router();
const Wallet = require('../model/wallet.model');
const Transaction = require('../model/transaction.model');

export const transactionToWallet = async (req, res) => {
  try {
    const { account_number, amount, description } = req.body;
    const user = req.user;
    const userwallet = await User.findOne({ where: { paypocket_id: account_number } });
    if (!userwallet) {
      return res.status(404).json({ error: 'User with this id not found' });
    }
    const wallet = await Wallet.findOne({ where: { id: userwallet.id } });
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }
    if (wallet.Balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance in wallet' });
    }
    const updatedWallet = await Wallet.update({
      Balance: wallet.Balance - amount
    });
    const transaction = await Transaction.create({
      sender_id: user.id,
      receiver_id: userwallet.id,
      wallet_id: wallet.id,
      amount,
      description,
      method: 'wallet',
      type: 'debit'
    });
    return res.status(200).json({ message: 'Transaction successfull', updatedWallet, transaction });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Transaction failed' });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const transactions = await Transaction.findAll({
      where: { sender_id: id },
      limit: 10,
      order: [['createdAt', 'DESC']]});
    return res.status(200).json({ transactions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Transaction failed' });
  }
}

export const transactionToBank = async (req, res) => {
  try {
    const { account_number, amount, description } = req.body;
    const user = req.user;
  
    const wallet = await Wallet.findOne({ where: { id: user.id } });
    if (wallet.Balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance in wallet' });
    }
    const updatedWallet = await Wallet.update({
      Balance: wallet.Balance - amount
    });
    const transaction = await Transaction.create({
      sender_id: user.id,
      receiver_id: account_number,
      wallet_id: account_number,
      amount,
      description,
      method: 'bank',
      type: 'debit'
    });
    return res.status(200).json({ message: 'Transaction successfull', updatedWallet, transaction });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Transaction failed' });
  }
}

