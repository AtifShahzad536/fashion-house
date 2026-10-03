import express from 'express';
import {
  getProducts,
  getProductBySlugOrId,
  getCuratedCollections,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/curated', getCuratedCollections);
router.route('/').get(getProducts).post(protect, adminOnly, createProduct);
router.route('/:slugOrId').get(getProductBySlugOrId);
router.route('/:id').put(protect, adminOnly, updateProduct).delete(protect, adminOnly, deleteProduct);

export default router;
