// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import { v4 as uuidv4 } from 'uuid';

const Document = sequelize.define('document', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    document_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    document_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    expiry_at: {
        type: DataTypes.DATEONLY,
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

export default Document;
