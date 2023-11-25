// models/transaction.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance

const Transaction = sequelize.define('Transaction', {
  TransactionID: {
    type: DataTypes.UUID, // Assuming you want UUID as TransactionID
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  SenderUserID: {
    type: DataTypes.INTEGER, // Assuming you're using integers for UserID
    allowNull: false,
  },
  ReceiverUserID: {
    type: DataTypes.INTEGER,
  },
  Amount: {
    type: DataTypes.DECIMAL(10, 2),
  },
  Description: {
    type: DataTypes.STRING,
  },
  TransactionDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});
