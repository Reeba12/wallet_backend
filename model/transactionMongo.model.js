import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    sender_id: {
        type: String,
        required: true,
    },
    wallet_id: {
        type: String,
        required: true,
    },
    receiver_id: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
    },
    currency: {
        type: String,
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

const Transaction = mongoose.model('TransactionMongo', transactionSchema);

export default Transaction;
