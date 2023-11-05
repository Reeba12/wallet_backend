// models/Wallet.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Wallet = sequelize.define('userWallet', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
    },
    balance: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
    },
    type: {
        type: DataTypes.ENUM('savings', 'current'),
        defaultValue: 'savings',
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

export default Wallet;
