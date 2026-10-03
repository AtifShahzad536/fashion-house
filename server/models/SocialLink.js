import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
      enum: ['instagram', 'whatsapp', 'facebook', 'tiktok', 'pinterest', 'youtube', 'phone'],
      default: 'instagram',
    },
    title: {
      type: String,
      required: true,
      default: 'Instagram',
    },
    url: {
      type: String,
      required: true,
      default: 'https://instagram.com',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const SocialLink = mongoose.model('SocialLink', socialLinkSchema);
export default SocialLink;
