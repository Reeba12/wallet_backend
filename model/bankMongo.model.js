import mongoose from 'mongoose';

const bankSchema = new mongoose.Schema({
    bank_name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    bank_code: {
        type: String,
        required: true,
    },
    branch_code: {
        type: String,
        required: true,
    },
    contact_number: {
        type: String,
        required: true,
    },
    email_address: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    supported_currencies: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    compliance_status: {
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

const Bank = mongoose.model('BankMongo', bankSchema);

export default Bank;
