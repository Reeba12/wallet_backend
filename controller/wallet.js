const express = require('express');
const app = express();


// Define the SQL query for wallet creation
const createWalletQuery = `
  INSERT INTO Wallet (WalletAddress, Balance, Currency, WalletType)
  VALUES (?, ?, ?, ?)
`;
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
  
  // Example usage:
  const uniqueAddress = generateUniqueWalletAddress();
  console.log('Generated Wallet Address:', uniqueAddress);
  
// Create a personal wallet
app.post('/create-personal-wallet', async (req, res) => {
  try {
    const { UserID, Currency } = req.body;
    const walletAddress = generateUniqueWalletAddress(); // Implement your unique address generation logic
    const values = [walletAddress, 0.00, Currency, 'Personal'];

    const connection = await pool.getConnection();
    const [result] = await connection.query(createWalletQuery, values);
    connection.release();

    res.status(201).json({ WalletID: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wallet creation failed' });
  }
});

// Create a business wallet
app.post('/create-business-wallet', async (req, res) => {
  try {
    const { UserID, Currency } = req.body;
    const walletAddress = generateUniqueWalletAddress(); // Implement your unique address generation logic
    const values = [walletAddress, 0.00, Currency, 'Business'];

    const connection = await pool.getConnection();
    const [result] = await connection.query(createWalletQuery, values);
    connection.release();

    res.status(201).json({ WalletID: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wallet creation failed' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
