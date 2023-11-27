import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
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

const Document = mongoose.model('DocumentMongo', documentSchema);

export default Document;
