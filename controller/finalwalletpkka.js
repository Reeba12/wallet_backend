const Wallet = require('../model/Wallet');

function generateUniqueWalletAddress() {
  // Generate a random string to simulate a unique wallet address
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const addressLength = 64; // Adjust the length as needed
  let walletAddress = '';

  for (let i = 0; i < addressLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    walletAddress += charset.charAt(randomIndex);
  }

  return walletAddress;
}

async function createPersonalWallet(user, currency) {
  try {
console.log("USer from postman----------:", user, user.userId);

    const walletAddress = generateUniqueWalletAddress(); // Implement your unique address generation logic
    const values = { wallet_address: walletAddress, balance: 0.00, currency: currency, wallet_type: 'Personal', user_id: user.userId };

    const wallet = await Wallet.create(values);
    return wallet;
  } catch (error) {
    console.error(error);
    throw new Error('Wallet creation failed');
  }
}

async function createBusinessWallet(user, currency) {
  try {
    const walletAddress = generateUniqueWalletAddress(); // Implement your unique address generation logic
    const values = { wallet_address: walletAddress, balance: 0.00, currency: currency, wallet_type: 'Business', user_id: user.userId };

    const wallet = await Wallet.create(values);
    return wallet;
  } catch (error) {
    console.error(error);
    throw new Error('Wallet creation failed');
  }
}

module.exports = { createPersonalWallet, createBusinessWallet };
