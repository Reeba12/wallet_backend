import Batch from '../model/batch.model.js';
import User from '../model/user.model.js';

export const createBatch = async (req, res) => {
    try {
        const { batch_name, batch_users } = req.body;

        for (const paypocketUser of batch_users) {
            const user = await User.findOne({ paypocket_id: paypocketUser.id });
            if (!user) {
                return res.status(400).json({ message: `User with paypocket_id ${userPaypocketId} does not exist.` });
            }
        }
        const batch = await Batch.create({
            batch_name,
            batch_users,
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

export const getBatchById = async (req, res) => {
    try {
        const { id } = req.params;
        const batch = await Batch.findById(id).populate('batch_user');
        return res.status(200).json({ batch });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Batch not found' });
    }
}

export const deleteBatch = async (req, res) => {
    try {
        await Batch.deleteOne({ _id: req.params.batchId });
        res.status(200).json({ message: 'Batch deleted successfully' });
    } catch (error) {
        console.error('Error deleting batch:', error);
        res.status(500).json({ message: 'Error deleting batch' });
    }
}