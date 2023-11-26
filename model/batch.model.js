import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config.js'; // Assuming Sequelize connection is configured
import User from './user.model.js';

const Batch = sequelize.define('Batch', {
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

export default Batch;
