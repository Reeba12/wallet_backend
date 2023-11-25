const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const User = require('./User');

const WalletTable = sequelize.define('Wallet', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
//   type: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
//   user_id: {
//     type: DataTypes.STRING, // Make sure the data type matches the 'id' column in the Users table
//     allowNull: false,
//     references: {
//       model: User,
//       key: 'id', // Make sure the key matches the primary key of the Users table
//     },
//   },
  balance: {
    type: DataTypes.DECIMAL(10, 2), // Adjust the precision and scale as needed
    defaultValue: 0,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  wallet_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  wallet_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING, // Add this field for currency
    allowNull: false,
  },
});
// Define the association
WalletTable.belongsTo(User, {
    foreignKey: 'user_id',
  });
module.exports = WalletTable;
