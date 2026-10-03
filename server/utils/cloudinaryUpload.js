import { Readable } from 'stream';
import cloudinary from '../config/cloudinary.js';

/**
 * Upload a memory buffer file directly to Cloudinary using streams
 * @param {Buffer} buffer - File buffer from Multer memoryStorage
 * @param {string} folder - Target folder in Cloudinary
 * @returns {Promise<{public_id: string, url: string, secure_url: string}>}
 */
export const uploadBufferToCloudinary = (buffer, folder = 'lahnga_atelier') => {
  return new Promise((resolve, reject) => {
    // If Cloudinary credentials are not properly configured, provide a safe fallback or reject
    if (!process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME === 'demo_cloud_name') {
      // Fallback: convert buffer to base64 data URI for instant local preview without breaking
      const base64 = `data:image/jpeg;base64,${buffer.toString('base64')}`;
      return resolve({
        public_id: `fallback_${Date.now()}`,
        url: base64,
        secure_url: base64
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
        transformation: [
          { quality: 'auto:good' },
          { fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary Upload Stream Error:', error);
          return reject(error);
        }
        resolve({
          public_id: result.public_id,
          url: result.url,
          secure_url: result.secure_url
        });
      }
    );

    const readable = Readable.from(buffer);
    readable.pipe(uploadStream);
  });
};

/**
 * Delete an asset from Cloudinary by public ID
 * @param {string} publicId
 */
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId || publicId.startsWith('fallback_')) return;
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary Delete Error:', error);
  }
};
