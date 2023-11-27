// models/Wallet.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config.js';
import { v4 as uuidv4 } from 'uuid';

const Wallet = sequelize.define('userWallet', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        foreignKey: true,
    },
    balance: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
    },
    currency: {
        type: DataTypes.STRING,
        defaultValue: 'PKR',
    },
    type: {
        type: DataTypes.ENUM('personal', 'business'),
        defaultValue: 'personal',
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    document: {
        type: DataTypes.STRING,
        allowNull: true,
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
