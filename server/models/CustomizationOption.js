import mongoose from 'mongoose';

const customizationOptionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ['design', 'color', 'fabric', 'embroidery', 'dupatta', 'personalization'],
      required: true,
    },
    subType: {
      type: String, // e.g., 'lehengaFlair', 'choliStyle', 'neckline', 'sleeves'
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    hex: {
      type: String, // For color swatches
      default: '',
    },
    image: {
      type: String, // For fabric/embroidery texture previews
      default: '',
    },
    surcharge: {
      type: Number,
      default: 0,
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
  { timestamps: true }
);

const CustomizationOption = mongoose.model('CustomizationOption', customizationOptionSchema);
export default CustomizationOption;
