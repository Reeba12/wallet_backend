import BankAccount from '../model/bankAccount.model.js';
import Wallet from '../model/wallet.model.js';

export const transferFundtoWalletFromBank = async (req, res) => {
  const { amount, account_number, wallet_id, bank } = req.body;

  try {
    const bankAccount = await BankAccount.find({
      account_number: account_number,
    });

    if (bankAccount.length === 0) {
      return res.status(404).json({ error: 'Bank account not found' });
    }

    if (bankAccount[0].amount < amount) {
      return res.status(400).json({ error: 'Insufficient balance in bank account' });
    }

    const wallet = await Wallet.findById(wallet_id);

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }
    // Update bank account and wallet
    const updatedBankAccount = await BankAccount.findOneAndUpdate(
      { account_number: account_number },
      { $set: { amount: bankAccount[0].amount - amount } },
      { new: true }
    );
    const updatedWallet = await Wallet.findOneAndUpdate(
      { _id: wallet_id },
      { $set: { balance: wallet.balance + amount } },
      { new: true }
    );

    return res.status(200).json({ message: 'Fund transferred successfully', updatedBankAccount, updatedWallet });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Fund transfer failed' });
  }
};
