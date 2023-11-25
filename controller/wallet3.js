const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

// Initialize Sequelize (assuming you've already set up the database configuration)
const sequelize = new Sequelize('ewallet_dev', 'your-username', 'your-password', {
  host: 'localhost',
  dialect: 'postgres',
});

// Define the Wallet model
const Wallet = sequelize.define('Wallet', {
  WalletAddress: {
    type: DataTypes.STRING,
    unique: true,
  },
  Balance: DataTypes.DECIMAL(10, 2), // Assuming a decimal data type for balance
  Currency: DataTypes.STRING,
  WalletType: DataTypes.STRING,
});

// Body parser middleware
app.use(express.json());

// Create a personal wallet
app.post('/create-personal-wallet', async (req, res) => {
  try {
    const { UserID, Currency } = req.body;
    const wallet = await Wallet.create({
      WalletAddress: generateUniqueWalletAddress(), // Implement a function to generate a unique wallet address
      Balance: 0.00, // Initial balance
      Currency,
      WalletType: 'Personal',
    });
    res.status(201).json(wallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wallet creation failed' });
  }
});

// Create a business wallet
app.post('/create-business-wallet', async (req, res) => {
  try {
    const { UserID, Currency } = req.body;
    const wallet = await Wallet.create({
      WalletAddress: generateUniqueWalletAddress(), // Implement a function to generate a unique wallet address
      Balance: 0.00, // Initial balance
      Currency,
      WalletType: 'Business',
    });
    res.status(201).json(wallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wallet creation failed' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
