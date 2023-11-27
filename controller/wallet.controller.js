import Wallet from '../model/wallet.model';

export const createWallet = async (req, res) => {
    try {
        const { user } = req; // The authenticated user data is available in req.user (you may need to adjust this based on your auth middleware)
        const { country, city, address, type } = req.body;
        console.log("USer from postman:", user);
        const wallet = await Wallet.create({
            user_id: user.id,
            country,
            city,
            address,
            type,
        });

        if (wallet) {
            // If wallet creation is successful
            res.status(201).json({ message: 'Wallet created successfully', wallet: wallet });
        } else {
            // If wallet creation fails
            throw new HttpError(500, 'Failed to create wallet');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message, message: 'Wallet creation failed.' });
    }
};
