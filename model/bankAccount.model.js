// models/User.js
import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.config.js';
import { v4 as uuidv4 } from 'uuid';

const BankAccount = sequelize.define('bank_account', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    bank_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    account_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    account_holder_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
    },
    user_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
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

sequelize.sync().then(() => {
    console.log('bank_account table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});


export default BankAccount;
