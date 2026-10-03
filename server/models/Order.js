import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true, default: 1 },
  size: { type: String, default: 'M' },
  isCustomized: { type: Boolean, default: false },
  customizationDetails: {
    design: mongoose.Schema.Types.Mixed,
    colors: mongoose.Schema.Types.Mixed,
    fabric: mongoose.Schema.Types.Mixed,
    embroidery: mongoose.Schema.Types.Mixed,
    dupatta: mongoose.Schema.Types.Mixed,
    personalization: mongoose.Schema.Types.Mixed,
    measurements: mongoose.Schema.Types.Mixed,
    customizationCharge: { type: Number, default: 0 },
  },
});

const statusTimelineSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: [
      'Order Placed',
      'Confirmed',
      'Designing',
      'Stitching',
      'Quality Check',
      'Shipped',
      'Delivered',
      'Cancelled',
    ],
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  note: { type: String, default: '' },
  updatedBy: { type: String, default: 'Atelier Admin' },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, default: 'Pakistan' },
    },
    paymentMethod: {
      type: String,
      enum: ['Credit/Debit Card', 'Direct Bank Transfer', 'Cash on Delivery', 'Stripe'],
      required: true,
      default: 'Credit/Debit Card',
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, required: true, default: 0.0 },
    discountAmount: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    status: {
      type: String,
      enum: [
        'Order Placed',
        'Confirmed',
        'Designing',
        'Stitching',
        'Quality Check',
        'Shipped',
        'Delivered',
        'Cancelled',
      ],
      default: 'Order Placed',
    },
    statusTimeline: [statusTimelineSchema],
    trackingNumber: { type: String, default: '' },
    courierName: { type: String, default: 'TCS Bridal Express' },
    estimatedDelivery: { type: Date },
  },
  { timestamps: true }
);

// Auto-generate human-friendly orderNumber
orderSchema.pre('validate', function (next) {
  if (!this.orderNumber) {
    const random = Math.floor(1000 + Math.random() * 9000);
    this.orderNumber = `ZA-${Date.now().toString().slice(-6)}-${random}`;
  }
  if (!this.statusTimeline || this.statusTimeline.length === 0) {
    this.statusTimeline = [{ status: 'Order Placed', note: 'Order received and logged in Atelier database.' }];
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
