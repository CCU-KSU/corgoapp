import express from 'express';
import { VerifyToken } from '../middleware/verifyToken.js';
import { usersController } from '../controllers/index.js';

const router = express.Router();

router.post('/register', VerifyToken, usersController.createProfile);

export default router;