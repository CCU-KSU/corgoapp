import express from 'express';
import { catalogController } from '../controllers/index.js';

const router = express.Router();

router.get('/', catalogController.listCatalog);
router.get('/:id', catalogController.getCatalogEntry);

export default router;