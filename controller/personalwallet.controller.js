import Wallet from '../model/wallet.model';

// Controller function to create a new wallet
export const createWallet = async (req, res) => {
  try {
    const { user_id, balance, type } = req.body;

    // Create a new wallet record in the database
    const wallet = await Wallet.create({ user_id, balance, type });

    // Respond with the created wallet
    res.status(201).json(wallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a wallet.' });
  }
};