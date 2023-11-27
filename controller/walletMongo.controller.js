import Wallet from '../model/walletMongo.model.js';

// Create a new wallet
export const createWallet = async (req, res) => {
  try {
    const { user } = req; // The authenticated user data is available in req.user
    const { country, city, address, type } = req.body;

    const wallet = await Wallet.create({
      user_id: user._id, // Assuming the user model has _id as the primary key
      country,
      city,
      address,
      type,
    });

    if (wallet) {
      res.status(201).json({ message: 'Wallet created successfully', wallet });
    } else {
      throw new Error('Failed to create wallet');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message, message: 'Wallet creation failed.' });
  }
};
