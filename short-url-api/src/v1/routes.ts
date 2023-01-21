import express from 'express';
import shortUrlRoutes from './short-url/routes';

export const router = express.Router();

router.use('/short-url', shortUrlRoutes);

export default router;
