import BankAccount from '../model/bankAccount.model';
import Wallet from '../model/wallet.model';

export const transferFundtoWalletFromBank = async (req, res) => {
    const { amount, account_number, wallet_id, bank } = req.body;
    try {
        const bankAccount = await BankAccount.findOne({
            where: {
                account_number: account_number,
                bank_name: bank.name
            }
        });
        if (!bankAccount) {
            return res.status(404).json({ error: 'Bank account not found' });
        }
        if (bankAccount.amount < amount) {
            return res.status(400).json({ error: 'Insufficient balance in bank account' });
        }
        const wallet = await Wallet.findOne({
            where: {
                id: wallet_id
            }
        });
        if (!wallet) {
            return res.status(404).json({ error: 'Wallet not found' });
        }
        const updatedBankAccount = await BankAccount.update({
            amount: bankAccount.amount - amount
        });
        const updatedWallet = await Wallet.update({
            amount: wallet.amount + amount
        });
        return res.status(200).json({ message: 'Fund transferred successfully', updatedBankAccount, updatedWallet });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Fund transfer failed' });
    }
}