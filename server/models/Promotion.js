import mongoose from 'mongoose';

const promotionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      default: 'FLAT 40% OFF',
    },
    badgeText: {
      type: String,
      required: true,
      trim: true,
      default: '40% OFF',
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
      default: 'Enjoy Flat 40% Off on Selected Haute Couture & Bridal Pieces',
    },
    discountPercent: {
      type: Number,
      required: true,
      min: 1,
      max: 90,
      default: 40,
    },
    targetType: {
      type: String,
      enum: ['all', 'occasions'],
      default: 'all',
    },
    targetOccasions: {
      type: [String],
      default: ['Bridal', 'Walima'],
    },
    buttonText: {
      type: String,
      default: 'Shop Now',
    },
    buttonLink: {
      type: String,
      default: '/shop',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    bgColor: {
      type: String,
      default: '#FDF2F4', // Soft luxury blush pink like Anaya reference
    },
    textColor: {
      type: String,
      default: '#111827',
    },
    accentColor: {
      type: String,
      default: '#991B1B', // Royal Crimson
    },
  },
  {
    timestamps: true,
  }
);

const Promotion = mongoose.model('Promotion', promotionSchema);
export default Promotion;
