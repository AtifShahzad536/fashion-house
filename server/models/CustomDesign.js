import mongoose from 'mongoose';

const customDesignSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    baseProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    designTitle: {
      type: String,
      default: 'My Bespoke Bridal Lehenga',
    },
    design: {
      lehengaFlair: { type: String },
      choliStyle: { type: String },
      neckline: { type: String },
      sleeves: { type: String },
      backDesign: { type: String },
    },
    colors: {
      baseColor: { name: String, hex: String, surcharge: Number },
      embroideryColor: { name: String, hex: String, surcharge: Number },
      borderColor: { name: String, hex: String, surcharge: Number },
      dupattaColor: { name: String, hex: String, surcharge: Number },
    },
    fabric: {
      name: { type: String },
      surcharge: { type: Number, default: 0 },
    },
    embroidery: {
      intensity: { type: String },
      style: { type: String },
      surcharge: { type: Number, default: 0 },
    },
    dupatta: {
      style: { type: String },
      borderWidth: { type: String },
      surcharge: { type: Number, default: 0 },
    },
    personalization: {
      enabled: { type: Boolean, default: false },
      text: { type: String },
      placement: { type: String },
      surcharge: { type: Number, default: 0 },
    },
    measurements: {
      type: { type: String, enum: ['standard', 'custom'], default: 'custom' },
      standardSize: { type: String },
      customData: {
        bust: Number,
        underBust: Number,
        waist: Number,
        hips: Number,
        shoulder: Number,
        armHole: Number,
        sleeveLength: Number,
        lehengaLength: Number,
        choliLength: Number,
        notes: String,
      },
    },
    totalSurcharge: {
      type: Number,
      default: 0,
    },
    finalPrice: {
      type: Number,
      required: true,
    },
    previewImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const CustomDesign = mongoose.model('CustomDesign', customDesignSchema);
export default CustomDesign;
