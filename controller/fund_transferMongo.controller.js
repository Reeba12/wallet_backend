import BankAccount from '../model/bankAccountMongo.model.js';
import Wallet from '../model/walletMongo.model.js';

export const transferFundtoWalletFromBank = async (req, res) => {
  const { amount, account_number, wallet_id, bank } = req.body;

  try {
    const bankAccount = await BankAccount.findOne({
      account_number: account_number,
      bank_name: bank.name
    });

    if (!bankAccount) {
      return res.status(404).json({ error: 'Bank account not found' });
    }

    if (bankAccount.amount < amount) {
      return res.status(400).json({ error: 'Insufficient balance in bank account' });
    }

    const wallet = await Wallet.findById(wallet_id);

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    // Update bank account and wallet
    const updatedBankAccount = await BankAccount.findOneAndUpdate(
      { account_number: account_number, bank_name: bank.name },
      { $set: { amount: bankAccount.amount - amount } },
      { new: true }
    );

    const updatedWallet = await Wallet.findOneAndUpdate(
      { _id: wallet_id },
      { $set: { amount: wallet.amount + amount } },
      { new: true }
    );

    return res.status(200).json({ message: 'Fund transferred successfully', updatedBankAccount, updatedWallet });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Fund transfer failed' });
  }
};
