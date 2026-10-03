import express from 'express';
import multer from 'multer';
import { uploadBufferToCloudinary, deleteFromCloudinary } from '../utils/cloudinaryUpload.js';

const router = express.Router();

// Memory storage for immediate streaming to Cloudinary
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter,
});

/**
 * @route   POST /api/upload/single
 * @desc    Upload single image to Cloudinary
 * @access  Private/Admin
 */
router.post('/single', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please provide an image file' });
    }

    const folder = req.body.folder || 'lahnga_atelier/products';
    const result = await uploadBufferToCloudinary(req.file.buffer, folder);

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully to Cloudinary',
      data: {
        url: result.secure_url || result.url,
        public_id: result.public_id,
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/upload/multiple
 * @desc    Upload multiple images to Cloudinary (up to 8 images)
 * @access  Private/Admin
 */
router.post('/multiple', upload.array('images', 8), async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'Please upload at least one image' });
    }

    const folder = req.body.folder || 'lahnga_atelier/gallery';
    const uploadPromises = req.files.map(file => uploadBufferToCloudinary(file.buffer, folder));
    const results = await Promise.all(uploadPromises);

    const formattedData = results.map(r => ({
      url: r.secure_url || r.url,
      public_id: r.public_id,
    }));

    res.status(200).json({
      success: true,
      message: `${formattedData.length} images uploaded successfully to Cloudinary`,
      data: formattedData,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   DELETE /api/upload/:public_id
 * @desc    Delete image from Cloudinary
 * @access  Private/Admin
 */
router.delete('/:public_id', async (req, res, next) => {
  try {
    const { public_id } = req.params;
    await deleteFromCloudinary(public_id);
    res.status(200).json({
      success: true,
      message: 'Image deleted from Cloudinary successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
