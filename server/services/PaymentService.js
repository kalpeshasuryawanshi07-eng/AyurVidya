const crypto = require('crypto');
const Razorpay = require('razorpay');
const Payment = require('../models/Payment');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const User = require('../models/User');
const EmailService = require('./EmailService');

class PaymentService {
  constructor() {
    this._razorpay = null;
  }

  get razorpay() {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      const error = new Error('Payment gateway is not configured.');
      error.name = 'PaymentConfigError';
      error.statusCode = 503;
      throw error;
    }

    if (!this._razorpay) {
      this._razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
      });
    }
    return this._razorpay;
  }

  async createOrder(userId, courseId, paymentMethod) {
    const course = await Course.findById(courseId);
    if (!course) {
      const error = new Error('Course not found');
      error.statusCode = 404;
      throw error;
    }

    // Check if user is already enrolled
    const existingEnrollment = await Enrollment.findOne({ userId, courseId });
    if (existingEnrollment) {
      const error = new Error('User is already enrolled in this course');
      error.statusCode = 409;
      throw error;
    }

    if (!course.isPaid || course.price === 0) {
      const error = new Error('This course is free.');
      error.statusCode = 400;
      throw error;
    }

    // Validate payment method if specified
    if (paymentMethod && course.paymentMethods && course.paymentMethods.length > 0) {
      if (!course.paymentMethods.includes(paymentMethod)) {
        throw new Error('Selected payment method is not available for this course');
      }
    }

    const orderOptions = {
      amount: Math.round(course.price * 100),
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`
    };

    console.log('[PAYMENT] Sending to Razorpay:', orderOptions);

    const razorpayOrder = await this.razorpay.orders.create(orderOptions);

    const payment = new Payment({
      userId,
      courseId,
      razorpayOrderId: razorpayOrder.id,
      amount: course.price,
      currency: 'INR',
      paymentMethod,
      status: 'created'
    });

    await payment.save();

    return {
      razorpayOrderId: razorpayOrder.id,
      amount: course.price,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID,
      paymentMethod // 👈 Added this
    };
  }

  async verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature) {
    const payment = await Payment.findOne({ razorpayOrderId });
    if (!payment) throw new Error('Payment record not found');

    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (generatedSignature !== razorpaySignature) {
      payment.status = 'failed';
      await payment.save();
      throw new Error('Payment verification failed');
    }

    payment.status = 'paid';
    payment.razorpayPaymentId = razorpayPaymentId;
    payment.razorpaySignature = razorpaySignature;
    payment.paidAt = new Date();
    await payment.save();

    const enrollment = new Enrollment({
      userId: payment.userId,
      courseId: payment.courseId,
      enrolledAt: new Date()
    });

    await enrollment.save();

    await Course.findByIdAndUpdate(payment.courseId, { $inc: { enrollmentCount: 1 } });

    // Send Email
    try {
      const user = await User.findById(payment.userId);
      const course = await Course.findById(payment.courseId);
      if (user && course) {
        await EmailService.sendEnrollmentEmail(user.name, user.email, course.title);
      }
    } catch (err) {
      console.error('Email failed:', err);
    }

    return { verified: true, enrollmentId: enrollment._id };
  }

  async enrollFree(userId, courseId) {
    const course = await Course.findById(courseId);
    if (!course) throw new Error('Course not found');

    const existingEnrollment = await Enrollment.findOne({ userId, courseId });
    if (existingEnrollment) {
      throw new Error('User is already enrolled in this course');
    }

    if (course.isPaid && course.price > 0) {
      throw new Error('This course requires payment');
    }

    const enrollment = new Enrollment({ userId, courseId, enrolledAt: new Date() });
    await enrollment.save();
    await Course.findByIdAndUpdate(courseId, { $inc: { enrollmentCount: 1 } });

    // Send Email
    try {
      const user = await User.findById(userId);
      if (user && course) {
        await EmailService.sendEnrollmentEmail(user.name, user.email, course.title);
      }
    } catch (err) {
      console.error('Email failed:', err);
    }

    return enrollment.toObject();
  }

  async getPaymentHistory(userId) {
    return Payment.find({ userId })
      .populate('courseId', 'title titleMr slug price')
      .sort({ createdAt: -1 });
  }
}

module.exports = new PaymentService();
