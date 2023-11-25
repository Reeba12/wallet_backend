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

sequelize.sync().then(() => {
    console.log('Transaction table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default Transaction;
