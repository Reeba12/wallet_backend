// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Transaction = sequelize.define('transaction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sender_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    wallet_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    receiver_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
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

export default Transaction;
