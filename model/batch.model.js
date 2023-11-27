import mongoose from 'mongoose';
import { v4 } from 'uuid';

const batchSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: v4,
        primaryKey: true,
      },
    name: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    recipients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
});

const Batch = mongoose.model('Batch', batchSchema);

export default Batch;
