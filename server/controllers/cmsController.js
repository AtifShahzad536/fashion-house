import HeroSlide from '../models/HeroSlide.js';
import Coupon from '../models/Coupon.js';

export const getHeroSlides = async (req, res, next) => {
  try {
    const slides = await HeroSlide.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: slides });
  } catch (error) {
    next(error);
  }
};

export const createHeroSlide = async (req, res, next) => {
  try {
    const slide = new HeroSlide(req.body);
    const created = await slide.save();
    res.status(201).json({ success: true, data: created });
  } catch (error) {
    next(error);
  }
};

export const updateHeroSlide = async (req, res, next) => {
  try {
    const updated = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteHeroSlide = async (req, res, next) => {
  try {
    await HeroSlide.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Hero slide removed' });
  } catch (error) {
    next(error);
  }
};

// Coupon verification
export const validateCoupon = async (req, res, next) => {
  try {
    const { code, cartTotal } = req.body;
    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
      expiryDate: { $gte: new Date() },
    });

    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Invalid or expired coupon code' });
    }

    if (cartTotal && cartTotal < coupon.minPurchase) {
      return res.status(400).json({
        success: false,
        message: `Minimum order of PKR ${coupon.minPurchase.toLocaleString()} required for this coupon`,
      });
    }

    res.json({
      success: true,
      message: `Coupon applied: ${coupon.discountPercent}% discount!`,
      data: {
        code: coupon.code,
        discountPercent: coupon.discountPercent,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: coupons });
  } catch (error) {
    next(error);
  }
};

export const createCoupon = async (req, res, next) => {
  try {
    const coupon = new Coupon(req.body);
    const created = await coupon.save();
    res.status(201).json({ success: true, data: created });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// ⭐ FLOATING HERO SOCIAL LINKS CONTROLLER ⭐
// ==========================================
import SocialLink from '../models/SocialLink.js';

export const getSocialLinks = async (req, res, next) => {
  try {
    let links = await SocialLink.find({ isActive: true }).sort({ order: 1 });

    // Seed default social links if none exist
    if (links.length === 0) {
      const defaults = [
        { platform: 'whatsapp', title: 'WhatsApp Concierge', url: 'https://wa.me/923001234567', order: 1, isActive: true },
        { platform: 'instagram', title: 'Instagram Atelier', url: 'https://instagram.com/zurielleatelier', order: 2, isActive: true },
        { platform: 'facebook', title: 'Facebook Couture', url: 'https://facebook.com/zurielleatelier', order: 3, isActive: true },
        { platform: 'pinterest', title: 'Bridal Moodboard', url: 'https://pinterest.com/zurielleatelier', order: 4, isActive: true },
        { platform: 'tiktok', title: 'TikTok Runway', url: 'https://tiktok.com/@zurielleatelier', order: 5, isActive: true },
      ];
      links = await SocialLink.insertMany(defaults);
    }

    res.json({ success: true, data: links });
  } catch (error) {
    next(error);
  }
};

export const getAllSocialLinksAdmin = async (req, res, next) => {
  try {
    let links = await SocialLink.find({}).sort({ order: 1 });
    if (links.length === 0) {
      const defaults = [
        { platform: 'whatsapp', title: 'WhatsApp Concierge', url: 'https://wa.me/923001234567', order: 1, isActive: true },
        { platform: 'instagram', title: 'Instagram Atelier', url: 'https://instagram.com/zurielleatelier', order: 2, isActive: true },
        { platform: 'facebook', title: 'Facebook Couture', url: 'https://facebook.com/zurielleatelier', order: 3, isActive: true },
        { platform: 'pinterest', title: 'Bridal Moodboard', url: 'https://pinterest.com/zurielleatelier', order: 4, isActive: true },
        { platform: 'tiktok', title: 'TikTok Runway', url: 'https://tiktok.com/@zurielleatelier', order: 5, isActive: true },
      ];
      links = await SocialLink.insertMany(defaults);
    }
    res.json({ success: true, data: links });
  } catch (error) {
    next(error);
  }
};

export const createSocialLink = async (req, res, next) => {
  try {
    const link = new SocialLink(req.body);
    const created = await link.save();
    res.status(201).json({ success: true, data: created });
  } catch (error) {
    next(error);
  }
};

export const updateSocialLink = async (req, res, next) => {
  try {
    const updated = await SocialLink.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteSocialLink = async (req, res, next) => {
  try {
    await SocialLink.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Social link removed' });
  } catch (error) {
    next(error);
  }
};

export const bulkUpdateSocialLinks = async (req, res, next) => {
  try {
    const { links } = req.body;
    if (Array.isArray(links)) {
      for (const item of links) {
        if (item._id) {
          await SocialLink.findByIdAndUpdate(item._id, item);
        } else {
          await SocialLink.create(item);
        }
      }
    }
    const updatedList = await SocialLink.find({}).sort({ order: 1 });
    res.json({ success: true, message: 'All social media links updated successfully', data: updatedList });
  } catch (error) {
    next(error);
  }
};
