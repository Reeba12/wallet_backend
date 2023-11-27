import mongoose from 'mongoose';

const batchSchema = new mongoose.Schema({
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

const Batch = mongoose.model('BatchMongo', batchSchema);

export default Batch;
