import express from 'express';
import {
  getCustomizationOptions,
  saveCustomDesign,
  getUserSavedDesigns,
  createOption,
  updateOption,
  deleteOption,
} from '../controllers/customizerController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/options', getCustomizationOptions);
router.post('/save-design', protect, saveCustomDesign);
router.get('/saved-designs', protect, getUserSavedDesigns);

// Admin option management
router.post('/option', protect, adminOnly, createOption);
router.route('/option/:id').put(protect, adminOnly, updateOption).delete(protect, adminOnly, deleteOption);

export default router;
