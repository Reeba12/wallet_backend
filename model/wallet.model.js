import mongoose from 'mongoose';
import { v4 } from 'uuid';

const walletSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: v4,
        primaryKey: true,
      },
    user_id: {
        type: String,
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

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;
