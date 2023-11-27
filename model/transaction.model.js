// models/User.js
import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.config.js';
import { v4 as uuidv4 } from 'uuid';

const Transaction = sequelize.define('transaction', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
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
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

sequelize.sync().then(() => {
    console.log('Transaction table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default Transaction;
