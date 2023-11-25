// models/bank.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance

const Bank = sequelize.define('Bank', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  bank_name: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  bank_code: {
    type: DataTypes.STRING,
    unique: true, // Assuming bank codes are unique
  },
  branch: {
    type: DataTypes.JSON, // Store branch details as JSON
  },
  contact_number: {
    type: DataTypes.STRING,
  },
  contact_email: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  supported_currencies: {
    type: DataTypes.STRING, // Store supported currencies as a comma-separated string
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
  compliance_status: {
    type: DataTypes.BOOLEAN,
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

module.exports = Bank;
