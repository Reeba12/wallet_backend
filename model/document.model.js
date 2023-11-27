import mongoose from 'mongoose';
import { v4 } from 'uuid';

const documentSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: v4,
        primaryKey: true,
      },
    user_id: {
        type: String,
        required: true,
    },
    document_type: {
        type: String,
        required: true,
    },
    document_url: {
        type: String,
        required: true,
    },
    is_verified: {
        type: Boolean,
        default: false,
    },
    expiry_at: {
        type: Date,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

const Document = mongoose.model('Document', documentSchema);

export default Document;
