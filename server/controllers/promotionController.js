import Promotion from '../models/Promotion.js';
import Product from '../models/Product.js';

/**
 * Helper to sync product sale prices based on a promotion
 */
const syncDiscountToProducts = async (promotion) => {
  if (!promotion || !promotion.isActive) return;

  const percent = Number(promotion.discountPercent) || 0;
  if (percent <= 0) return;

  let query = {};
  if (promotion.targetType === 'occasions' && promotion.targetOccasions?.length > 0) {
    query.occasion = { $in: promotion.targetOccasions };
  }

  const products = await Product.find(query);
  for (const prod of products) {
    const calculatedSale = Math.round(prod.price * (1 - percent / 100));
    prod.salePrice = calculatedSale;
    await prod.save();
  }
};

/**
 * @route   GET /api/promotions/active
 * @desc    Fetch current active promotion for top storefront promo strip
 * @access  Public
 */
export const getActivePromotion = async (req, res, next) => {
  try {
    let promotion = await Promotion.findOne({ isActive: true }).sort({ updatedAt: -1 });

    // If none exists in DB, create default initial promotion
    if (!promotion) {
      promotion = await Promotion.create({
        title: 'FLAT 40% OFF',
        badgeText: '40% OFF',
        subtitle: 'Enjoy 40% Off on Selected Bridal, Walima & Mehndi Couture',
        discountPercent: 40,
        targetType: 'all',
        targetOccasions: ['Bridal', 'Walima', 'Mehndi'],
        buttonText: 'Shop Now',
        buttonLink: '/shop',
        isActive: true,
        bgColor: '#FDF2F4',
        textColor: '#111827',
        accentColor: '#991B1B',
      });
      await syncDiscountToProducts(promotion);
    }

    res.json({ success: true, data: promotion });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/promotions
 * @desc    Get all promotions (Admin)
 * @access  Private/Admin
 */
export const getPromotions = async (req, res, next) => {
  try {
    const promotions = await Promotion.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: promotions });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/promotions
 * @desc    Create new promotion campaign and apply discounts
 * @access  Private/Admin
 */
export const createPromotion = async (req, res, next) => {
  try {
    // If activating this new one, deactivate others
    if (req.body.isActive) {
      await Promotion.updateMany({}, { isActive: false });
    }

    const promotion = new Promotion(req.body);
    const created = await promotion.save();

    if (created.isActive) {
      await syncDiscountToProducts(created);
    }

    res.status(201).json({
      success: true,
      message: 'Discount campaign created & applied to products successfully',
      data: created,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/promotions/:id
 * @desc    Update promotion and sync product discounts
 * @access  Private/Admin
 */
export const updatePromotion = async (req, res, next) => {
  try {
    if (req.body.isActive) {
      await Promotion.updateMany({ _id: { $ne: req.params.id } }, { isActive: false });
    }

    const updated = await Promotion.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Promotion campaign not found' });
    }

    if (updated.isActive) {
      await syncDiscountToProducts(updated);
    } else {
      // Clear product sale prices if deactivated
      await Product.updateMany({}, { salePrice: null });
    }

    res.json({
      success: true,
      message: 'Discount campaign updated & product prices synchronized',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/promotions/:id
 * @desc    Delete promotion
 * @access  Private/Admin
 */
export const deletePromotion = async (req, res, next) => {
  try {
    const promo = await Promotion.findByIdAndDelete(req.params.id);
    if (!promo) {
      return res.status(404).json({ success: false, message: 'Promotion not found' });
    }

    if (promo.isActive) {
      await Product.updateMany({}, { salePrice: null });
    }

    res.json({ success: true, message: 'Discount campaign removed' });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/promotions/apply-now
 * @desc    Force apply custom discount to all or specific categories
 * @access  Private/Admin
 */
export const applyDiscountDirectly = async (req, res, next) => {
  try {
    const { discountPercent, targetType, targetOccasions } = req.body;
    const percent = Number(discountPercent) || 0;

    if (percent <= 0 || percent > 90) {
      return res.status(400).json({ success: false, message: 'Please provide a valid discount percentage (1-90%)' });
    }

    let query = {};
    if (targetType === 'occasions' && targetOccasions && targetOccasions.length > 0) {
      query.occasion = { $in: targetOccasions };
    }

    const products = await Product.find(query);
    for (const prod of products) {
      prod.salePrice = Math.round(prod.price * (1 - percent / 100));
      await prod.save();
    }

    res.json({
      success: true,
      message: `Successfully applied ${percent}% discount to ${products.length} products!`,
      affectedCount: products.length,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/promotions/reset-discounts
 * @desc    Reset all sale prices to regular price
 * @access  Private/Admin
 */
export const resetAllDiscounts = async (req, res, next) => {
  try {
    const result = await Product.updateMany({}, { salePrice: null });
    res.json({
      success: true,
      message: 'All product sale prices have been reset to regular retail price',
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    next(error);
  }
};
