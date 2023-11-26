
import express from 'express';
import userRoutes from './user.routes.js';
import walletRoutes from './walletRoutes.js'
import authRoutes from './auth.routes.js'

const appRoutes = express.Router();

appRoutes.use('/users', userRoutes);
appRoutes.use('/auth', authRoutes);
appRoutes.use('/wallet', walletRoutes);

export default appRoutes;