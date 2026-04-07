const crypto = require('crypto');
const Razorpay = require('razorpay');
const Payment = require('../models/Payment');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

class PaymentService {
  constructor() {
    // Initialize Razorpay instance lazily
    this._razorpay = null;
  }

  get razorpay() {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      const error = new Error('Payment gateway is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in server/.env');
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

  /**
   * Create Razorpay order for course payment
   * @param {string} userId - User's ID
   * @param {string} courseId - Course's ID
   * @param {string} paymentMethod - Selected payment method
   * @returns {Promise<{razorpayOrderId: string, amount: number, currency: string, keyId: string}>}
   * @throws {Error} CourseNotFoundError, ValidationError
   */
  async createOrder(userId, courseId, paymentMethod) {
    // Find course
    const course = await Course.findById(courseId);
    if (!course) {
      const error = new Error('Course not found');
      error.name = 'CourseNotFoundError';
      error.statusCode = 404;
      throw error;
    }

    // Check if course is paid
    if (!course.isPaid || course.price === 0) {
      const error = new Error('This course is free. Use enrollFree endpoint instead.');
      error.name = 'ValidationError';
      error.statusCode = 400;
      throw error;
    }

    const defaultPaymentMethods = Array.isArray(Course.DEFAULT_PAYMENT_METHODS)
      ? Course.DEFAULT_PAYMENT_METHODS
      : ['upi', 'card', 'netbanking'];

    const coursePaymentMethods = Array.isArray(course.paymentMethods) && course.paymentMethods.length > 0
      ? course.paymentMethods
      : defaultPaymentMethods;

    const normalizedPaymentMethod = paymentMethod
      ? String(paymentMethod).trim().toLowerCase()
      : undefined;

    if (normalizedPaymentMethod && !coursePaymentMethods.includes(normalizedPaymentMethod)) {
      const error = new Error('Selected payment method is not available for this course');
      error.name = 'ValidationError';
      error.statusCode = 400;
      throw error;
    }

    // Check if user is already enrolled
    const existingEnrollment = await Enrollment.findOne({ userId, courseId });
    if (existingEnrollment) {
      const error = new Error('User is already enrolled in this course');
      error.name = 'AlreadyEnrolledError';
      error.statusCode = 400;
      throw error;
    }

    // Create Razorpay order
    const orderOptions = {
      amount: course.price * 100, // Convert to paise
      currency: 'INR',
      receipt: `order_${userId}_${courseId}_${Date.now()}`
    };

    const razorpayOrder = await this.razorpay.orders.create(orderOptions);

    // Store payment record with status 'created'
    const payment = new Payment({
      userId,
      courseId,
      razorpayOrderId: razorpayOrder.id,
      amount: course.price,
      currency: 'INR',
      paymentMethod: normalizedPaymentMethod,
      status: 'created'
    });

    await payment.save();

    return {
      razorpayOrderId: razorpayOrder.id,
      amount: course.price,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID
    };
  }

  /**
   * Verify Razorpay payment signature and create enrollment
   * @param {string} razorpayOrderId - Razorpay order ID
   * @param {string} razorpayPaymentId - Razorpay payment ID
   * @param {string} razorpaySignature - Razorpay signature
   * @returns {Promise<{verified: boolean, enrollmentId: string}>}
   * @throws {Error} PaymentVerificationError
   */
  async verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature) {
    // Find payment record
    const payment = await Payment.findOne({ razorpayOrderId });
    if (!payment) {
      const error = new Error('Payment record not found');
      error.name = 'PaymentNotFoundError';
      error.statusCode = 404;
      throw error;
    }

    // Verify signature using HMAC SHA256
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (generatedSignature !== razorpaySignature) {
      // Update payment status to failed
      payment.status = 'failed';
      payment.razorpayPaymentId = razorpayPaymentId;
      payment.razorpaySignature = razorpaySignature;
      await payment.save();

      const error = new Error('Payment verification failed. Invalid signature.');
      error.name = 'PaymentVerificationError';
      error.statusCode = 400;
      throw error;
    }

    // Update payment status to paid
    payment.status = 'paid';
    payment.razorpayPaymentId = razorpayPaymentId;
    payment.razorpaySignature = razorpaySignature;
    payment.paidAt = new Date();
    await payment.save();

    // Create enrollment
    const enrollment = new Enrollment({
      userId: payment.userId,
      courseId: payment.courseId,
      enrolledAt: new Date()
    });

    await enrollment.save();

    // Increment course enrollment count
    await Course.findByIdAndUpdate(payment.courseId, {
      $inc: { enrollmentCount: 1 }
    });

    return {
      verified: true,
      enrollmentId: enrollment._id.toString()
    };
  }

  /**
   * Enroll user in free course without payment
   * @param {string} userId - User's ID
   * @param {string} courseId - Course's ID
   * @returns {Promise<Object>} Enrollment record
   * @throws {Error} CourseNotFoundError, AlreadyEnrolledError
   */
  async enrollFree(userId, courseId) {
    // Find course
    const course = await Course.findById(courseId);
    if (!course) {
      const error = new Error('Course not found');
      error.name = 'CourseNotFoundError';
      error.statusCode = 404;
      throw error;
    }

    // Check if course is free
    if (course.isPaid && course.price > 0) {
      const error = new Error('This course requires payment. Use createOrder endpoint instead.');
      error.name = 'ValidationError';
      error.statusCode = 400;
      throw error;
    }

    // Check if user is already enrolled
    const existingEnrollment = await Enrollment.findOne({ userId, courseId });
    if (existingEnrollment) {
      const error = new Error('User is already enrolled in this course');
      error.name = 'AlreadyEnrolledError';
      error.statusCode = 400;
      throw error;
    }

    // Create enrollment
    const enrollment = new Enrollment({
      userId,
      courseId,
      enrolledAt: new Date()
    });

    await enrollment.save();

    // Increment course enrollment count
    await Course.findByIdAndUpdate(courseId, {
      $inc: { enrollmentCount: 1 }
    });

    return enrollment.toObject();
  }

  /**
   * Get payment history for user
   * @param {string} userId - User's ID
   * @returns {Promise<Array>} Array of payment records
   */
  async getPaymentHistory(userId) {
    const payments = await Payment.find({ userId })
      .populate('courseId', 'title titleMr slug price')
      .sort({ createdAt: -1 });

    return payments;
  }
}

module.exports = new PaymentService();
