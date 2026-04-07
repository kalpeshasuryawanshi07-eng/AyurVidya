const mongoose = require('mongoose');

const PAYMENT_METHOD_VALUES = ['upi', 'card', 'netbanking', 'wallet', 'emi', 'paylater'];

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course ID is required']
  },
  razorpayOrderId: {
    type: String,
    required: [true, 'Razorpay order ID is required'],
    trim: true
  },
  razorpayPaymentId: {
    type: String,
    trim: true
  },
  razorpaySignature: {
    type: String,
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  currency: {
    type: String,
    default: 'INR',
    uppercase: true,
    trim: true
  },
  paymentMethod: {
    type: String,
    enum: {
      values: PAYMENT_METHOD_VALUES,
      message: '{VALUE} is not a valid payment method'
    },
    lowercase: true,
    trim: true
  },
  status: {
    type: String,
    enum: {
      values: ['created', 'paid', 'failed'],
      message: '{VALUE} is not a valid status'
    },
    default: 'created'
  },
  paidAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Create indexes
paymentSchema.index({ userId: 1 });
paymentSchema.index({ razorpayOrderId: 1 }, { unique: true });
paymentSchema.index({ status: 1 });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
