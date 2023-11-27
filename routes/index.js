import userRoutes from './user.routes';
import express from 'express';
import walletRoutes from './walletRoutes'
import authRoutes from './auth.routes'
import bankRoutes from './bank.routes'
import transactionRoutes from './transaction.routes'

const appRoutes = express.Router();

appRoutes.use('/users', userRoutes);
appRoutes.use('/auth', authRoutes);
appRoutes.use('/wallet', walletRoutes);
appRoutes.use('/banks', bankRoutes);
appRoutes.use('/transaction', transactionRoutes)

export default appRoutes;