// models/bankAccount.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance

const BankAccount = sequelize.define('BankAccount', {
  id: {
    type: DataTypes.UUID, // Assuming you want UUID as the primary key
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  bank_name: {
    type: DataTypes.STRING,
  },
  account_number: {
    type: DataTypes.STRING,
  },
  account_holder_name: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.INTEGER, // Assuming you're using integers for UserID
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = BankAccount;
