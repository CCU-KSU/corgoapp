import express from 'express';

import catalogRoutes from './catalog.routes.js';
import usersRoutes from './users.routes.js';

const router = express.Router();

router.use('/catalog', catalogRoutes);
router.use('/users', usersRoutes);

export default router;