import mongoose from 'mongoose';

const heroSlideSchema = new mongoose.Schema(
  {
    eyebrow: {
      type: String,
      default: 'ROYAL BRIDAL COUTURE',
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    primaryBtnText: {
      type: String,
      default: 'Explore Collection',
    },
    primaryBtnLink: {
      type: String,
      default: '/shop',
    },
    secondaryBtnText: {
      type: String,
      default: 'Customize Your Lehenga',
    },
    secondaryBtnLink: {
      type: String,
      default: '/customize/custom-atelier',
    },
    image: {
      type: String,
      required: true,
    },
    mobileImage: {
      type: String,
    },
    badgeText: {
      type: String,
      default: 'Handcrafted Perfection',
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const HeroSlide = mongoose.model('HeroSlide', heroSlideSchema);
export default HeroSlide;
