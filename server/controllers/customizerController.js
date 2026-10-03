import CustomizationOption from '../models/CustomizationOption.js';
import CustomDesign from '../models/CustomDesign.js';

/**
 * @route   GET /api/customizer/options
 * @desc    Get all active customization options grouped by category
 * @access  Public
 */
export const getCustomizationOptions = async (req, res, next) => {
  try {
    const options = await CustomizationOption.find({ isActive: true }).sort({ order: 1 });

    const grouped = {
      design: options.filter(o => o.category === 'design'),
      color: options.filter(o => o.category === 'color'),
      fabric: options.filter(o => o.category === 'fabric'),
      embroidery: options.filter(o => o.category === 'embroidery'),
      dupatta: options.filter(o => o.category === 'dupatta'),
      personalization: options.filter(o => o.category === 'personalization'),
    };

    res.json({ success: true, data: grouped, all: options });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/customizer/save-design
 * @desc    Save a bespoke custom design configuration for logged-in user
 * @access  Private
 */
export const saveCustomDesign = async (req, res, next) => {
  try {
    const design = new CustomDesign({
      ...req.body,
      user: req.user._id,
    });
    const saved = await design.save();
    res.status(201).json({ success: true, message: 'Custom bespoke design saved to your atelier account', data: saved });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/customizer/saved-designs
 * @desc    Get all saved bespoke designs for current user
 * @access  Private
 */
export const getUserSavedDesigns = async (req, res, next) => {
  try {
    const designs = await CustomDesign.find({ user: req.user._id })
      .populate('baseProduct', 'name slug images price')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: designs });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/customizer/option
 * @desc    Create a customization option (Admin)
 * @access  Private/Admin
 */
export const createOption = async (req, res, next) => {
  try {
    const option = new CustomizationOption(req.body);
    const created = await option.save();
    res.status(201).json({ success: true, data: created });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/customizer/option/:id
 * @desc    Update a customization option (Admin)
 * @access  Private/Admin
 */
export const updateOption = async (req, res, next) => {
  try {
    const updated = await CustomizationOption.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/customizer/option/:id
 * @desc    Delete a customization option (Admin)
 * @access  Private/Admin
 */
export const deleteOption = async (req, res, next) => {
  try {
    await CustomizationOption.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Customization option removed' });
  } catch (error) {
    next(error);
  }
};
