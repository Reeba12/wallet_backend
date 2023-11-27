// models/User.js
import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { sequelize } from '../config/db.config.js';
import Batch from './batch.model.js';
import Wallet from './wallet.model.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email_address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    login: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {
            login_count: 0,
            failed_attempts_count: 0,
            last_login_at: null,
            locked_out_till: null,
            last_failed_at: null,
        },
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    cnic: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobile_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    paypocket_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    walletId: {
        type: DataTypes.UUID, // Assuming walletId is of type UUID
        allowNull: true, // or false based on your requirement
        references: {
            model: 'userwallets', // Name of the Wallet table
            key: 'id', // Primary key of the Wallet table
        },
        onUpdate: 'CASCADE', // Action on update (optional, adjust as needed)
        onDelete: 'SET NULL', // Action on delete (optional, adjust as needed)
    },
    batchId: {
        type: DataTypes.UUID, // Assuming walletId is of type UUID
        allowNull: true, // or false based on your requirement
        references: {
            model: 'batches', // Name of the Wallet table
            key: 'id', // Primary key of the Wallet table
        },
        onUpdate: 'CASCADE', // Action on update (optional, adjust as needed)
        onDelete: 'SET NULL', // Action on delete (optional, adjust as needed)
    },
});
User.belongsTo(Wallet, { foreignKey: 'walletId', as: 'userwallets' });
User.belongsTo(Batch, { foreignKey: 'batchId', as: 'batch' });
// User.belongsToMany(Batch, {
//     through: 'BatchUser', // Same join table 'BatchUser'
//     as: 'Batches', // Alias for the association
// });


sequelize.sync({ alter: true }).then(() => {
    console.log('User table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default User;
