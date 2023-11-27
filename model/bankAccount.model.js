import { v4 } from 'uuid';
import mongoose from 'mongoose';

const BankAccountSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: v4,
        primaryKey: true,
    },
    bank_name: {
        type: String,
    },
    account_number: {
        type: String,
    },
    account_holder_name: {
        type: String,
        allowNull: false,
    },
    amount: {
        type: Number,
        defaultValue: 0.0,
    },
    user_id: {
        type: String,
        ref: 'User', // Reference to the User model
        required: true,
    },
});

const BankAccount = mongoose.model('Bank', BankAccountSchema);

export default BankAccount;
