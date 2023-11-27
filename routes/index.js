
import express from 'express';
// import walletRoutes from './walletRoutes'
// import authRoutes from './auth.routes'
import bankRoutes from './bank.routes.js'
import userRoutes from './user.routes.js';
import walletRoutes from './walletRoutes.js'
import authRoutes from './auth.routes.js'
import batchRoutes from './batch.routes.js'

const appRoutes = express.Router();

appRoutes.use('/users', userRoutes);
appRoutes.use('/auth', authRoutes);
appRoutes.use('/wallet', walletRoutes);
appRoutes.use('/banks', bankRoutes);
appRoutes.use('/batch', batchRoutes)

export default appRoutes;