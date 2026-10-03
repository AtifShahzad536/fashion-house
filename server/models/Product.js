import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    occasion: {
      type: String,
      enum: ['Bridal', 'Mehndi', 'Walima', 'Engagement', 'Sangeet', 'Party Wear', 'Reception'],
      required: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide base price'],
      min: 0,
    },
    salePrice: {
      type: Number,
      default: null,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    fabric: {
      type: String,
      required: true, // e.g., 'Pure Raw Silk (80g)', 'Italian Velvet', 'Handwoven Organza'
    },
    embroideryWork: {
      type: String,
      required: true, // e.g., 'Handworked Zardozi, Pearls, Dabka & Resham'
    },
    colors: [
      {
        name: { type: String, required: true },
        hex: { type: String, required: true },
      },
    ],
    sizes: [
      {
        size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom'], default: 'M' },
        stock: { type: Number, default: 5 },
      },
    ],
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String },
        alt: { type: String, default: 'Bridal Lehenga Couture' },
        isPrimary: { type: Boolean, default: false },
      },
    ],
    videoUrl: {
      type: String,
      default: '',
    },
    deliveryTimeline: {
      type: String,
      default: '4 to 6 weeks for handcrafted stitching & bespoke fitting',
    },
    isCustomizable: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    isNewArrival: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 5.0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    specifications: {
      components: { type: String, default: 'Lehenga (Skirt), Choli (Blouse), Dupatta (Veil)' },
      care: { type: String, default: 'Strictly Dry Clean Only. Store in breathable muslin bag.' },
      origin: { type: String, default: 'Handcrafted by Master Artisans in Lahore Atelier' },
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
