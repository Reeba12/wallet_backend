import mongoose from 'mongoose';
import { v4 } from 'uuid';

const bankSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: v4,
        primaryKey: true,
      },
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
});

const Bank = mongoose.model('Bank', bankSchema);

export default Bank;
