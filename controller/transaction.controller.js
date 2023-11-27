import Transaction from '../model/transaction.model';
import User from '../model/user.model';
import Wallet from '../model/wallet.model';

export const createTransaction = async (req, res) => {
  try {
    const { account_number, amount, description } = req.body;
    const user = req.user;
    const userwallet = await User.find({ paypocket_id: account_number });
    if (!userwallet) {
      return res.status(404).json({ error: 'User with this id not found' });
    }
    const wallet = await Wallet.find({ id: userwallet.id });
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
}

export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id).populate('user_id').limit(10).sort({ created_at: -1 })
    return res.status(200).json({ transaction });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Transaction not found' });
  }
}

export const createBatchTransaction = async (req, res) => {
  try {
    const { batch_name, batch_users } = req.body;
    for(const paypocketUser of batch_users){
      const user = await User.findOne({ paypocket_id: paypocketUser.id }).populate('walletId');
      if(!user){
        return res.status(400).json({ message: `User with paypocket_id ${userPaypocketId} does not exist.` });
      }
      user.walletId.Balance = user.walletId.Balance - paypocketUser.amount;
    }
    const transaction = await Transaction.create({
      batch_name,
      batch_users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message, message: 'Batch creation failed.' });
  }
}