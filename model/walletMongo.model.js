import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    balance: {
        type: Number,
        default: 0.0,
    },
    currency: {
        type: String,
        default: 'PKR',
    },
    type: {
        type: String,
        enum: ['personal', 'business'],
        default: 'personal',
    },
    address: {
        type: String,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    document: {
        type: String,
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

const Wallet = mongoose.model('WalletMongo', walletSchema);

export default Wallet;
