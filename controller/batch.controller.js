import Batch from '../model/batch.model.js';
import User from '../model/user.model.js';

export const createBatch = async (req, res) => {
    try {
        const { batch_name, batch_user } = req.body;
        const userIds = [];

        for (const paypocketUser of batch_user) {
            const user = await User.findOne({ paypocket_id: paypocketUser.paypocket_id });
            if (!user) {
                return res.status(400).json({ message: `User with paypocket_id ${userPaypocketId} does not exist.` });
            }
            userIds.push(user._id); // Collecting user IDs
        }

        const batch = await Batch.create({
            batch_name,
            batch_user: userIds,
        });

        if (batch) {
            res.status(201).json({ message: 'Batch created successfully', batch });
        } else {
            throw new Error('Failed to create batch');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message, message: 'Batch creation failed.' });
    }
}

export const getAllBatch = async (req, res) => {
    try {
        const batches = await Batch.find().populate('batch_user').exec();
        return res.status(200).json({ batches });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Batch not found' });
    }
}