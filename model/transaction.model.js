import mongoose from 'mongoose';
import { v4 } from 'uuid';

const transactionSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: v4,
        primaryKey: true,
      },
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
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    method: {
        type: String,
    },    
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
