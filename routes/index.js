import userRoutes from './user.routes';
import express from 'express';

const appRoutes = express.Router();

appRoutes.use('/users', userRoutes);

export default appRoutes;