const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config'); // Assuming Sequelize connection is configured
const { default: User } = require('./user.model');
import { v4 as uuidv4 } from 'uuid';

const Batch = sequelize.define('Batch', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

// // Defining the association for recipients in a batch
// Batch.belongsToMany(User, {
//     through: 'User', // Automatically creates a join table 'BatchUser'
//     as: 'Recipients', // Alias for the association
// });

module.exports = Batch;
