import express from 'express';
import {
  getHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  validateCoupon,
  getCoupons,
  createCoupon,
  getSocialLinks,
  getAllSocialLinksAdmin,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
  bulkUpdateSocialLinks,
} from '../controllers/cmsController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/hero-slides').get(getHeroSlides).post(protect, adminOnly, createHeroSlide);
router.route('/hero-slides/:id').put(protect, adminOnly, updateHeroSlide).delete(protect, adminOnly, deleteHeroSlide);

router.post('/coupons/validate', validateCoupon);
router.route('/coupons').get(protect, adminOnly, getCoupons).post(protect, adminOnly, createCoupon);

// Floating Hero Social Media Links
router.get('/social-links', getSocialLinks);
router.get('/social-links/admin', protect, adminOnly, getAllSocialLinksAdmin);
router.post('/social-links', protect, adminOnly, createSocialLink);
router.post('/social-links/bulk', protect, adminOnly, bulkUpdateSocialLinks);
router.route('/social-links/:id')
  .put(protect, adminOnly, updateSocialLink)
  .delete(protect, adminOnly, deleteSocialLink);

export default router;
