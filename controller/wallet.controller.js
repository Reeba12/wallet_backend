export const personalWallet = async (req, res) => {
    try {
        const { user } = req; // The authenticated user data is available in req.user (you may need to adjust this based on your auth middleware)
        const { country, city, address } = req.body;
        console.log("USer from postman:", user);
        const wallet = await 

        res.status(201).json({ WalletID: wallet.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Wallet creation failed' });
    }
};

export const businessWallet = async (req, res) => {
    try {
        const { user } = req; // The authenticated user data is available in req.user (you may need to adjust this based on your auth middleware)
        const { Currency } = req.body;

        const wallet = await walletService.createBusinessWallet(user, Currency);

        res.status(201).json({ WalletID: wallet.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Wallet creation failed' });
    }
}