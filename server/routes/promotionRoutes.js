import express from 'express';
import {
  getActivePromotion,
  getPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
  applyDiscountDirectly,
  resetAllDiscounts,
} from '../controllers/promotionController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route for top promo banner
router.get('/active', getActivePromotion);

// Admin routes
router.route('/')
  .get(protect, adminOnly, getPromotions)
  .post(protect, adminOnly, createPromotion);

router.route('/:id')
  .put(protect, adminOnly, updatePromotion)
  .delete(protect, adminOnly, deletePromotion);

router.post('/apply-now', protect, adminOnly, applyDiscountDirectly);
router.post('/reset-discounts', protect, adminOnly, resetAllDiscounts);

export default router;
