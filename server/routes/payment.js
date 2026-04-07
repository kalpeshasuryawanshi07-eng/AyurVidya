const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticate } = require('../middleware/auth');
const PaymentService = require('../services/PaymentService');

const router = express.Router();
const PAYMENT_METHOD_VALUES = ['upi', 'card', 'netbanking', 'wallet', 'emi', 'paylater'];

/**
 * POST /api/payment/create-order
 * Create Razorpay order for course payment
 * Protected route
 */
router.post(
  '/create-order',
  authenticate,
  [
    body('courseId')
      .trim()
      .notEmpty()
      .withMessage('Course ID is required')
      .isMongoId()
      .withMessage('Invalid course ID format'),
    body('paymentMethod')
      .optional()
      .trim()
      .toLowerCase()
      .isIn(PAYMENT_METHOD_VALUES)
      .withMessage(`Payment method must be one of: ${PAYMENT_METHOD_VALUES.join(', ')}`)
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: errors.array().map(err => err.msg)
        });
      }

      const { courseId, paymentMethod } = req.body;
      const userId = req.user.userId;

      // Log payment order creation attempt
      console.log(`[PAYMENT] Creating order - User: ${userId}, Course: ${courseId}`);

      // Create order using PaymentService
      const orderData = paymentMethod
        ? await PaymentService.createOrder(userId, courseId, paymentMethod)
        : await PaymentService.createOrder(userId, courseId);

      // Log successful order creation
      console.log(`[PAYMENT] Order created successfully - OrderID: ${orderData.razorpayOrderId}, Amount: ${orderData.amount}`);

      res.status(201).json({
        status: 'success',
        message: 'Payment order created successfully',
        data: orderData
      });
    } catch (error) {
      // Log payment order creation failure
      console.error(`[PAYMENT] Order creation failed - User: ${req.user.userId}, Error: ${error.message}`);

      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({
        status: 'error',
        message: error.message || 'Failed to create payment order',
        errors: [error.message || 'An unexpected error occurred']
      });
    }
  }
);

/**
 * POST /api/payment/verify
 * Verify Razorpay payment and create enrollment
 * Protected route
 */
router.post(
  '/verify',
  authenticate,
  [
    body('razorpayOrderId')
      .trim()
      .notEmpty()
      .withMessage('Razorpay order ID is required'),
    body('razorpayPaymentId')
      .trim()
      .notEmpty()
      .withMessage('Razorpay payment ID is required'),
    body('razorpaySignature')
      .trim()
      .notEmpty()
      .withMessage('Razorpay signature is required')
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: errors.array().map(err => err.msg)
        });
      }

      const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

      // Log payment verification attempt
      console.log(`[PAYMENT] Verifying payment - User: ${req.user.userId}, OrderID: ${razorpayOrderId}, PaymentID: ${razorpayPaymentId}`);

      // Verify payment using PaymentService
      const verificationResult = await PaymentService.verifyPayment(
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature
      );

      // Log successful payment verification
      console.log(`[PAYMENT] Payment verified successfully - User: ${req.user.userId}, EnrollmentID: ${verificationResult.enrollmentId}`);

      res.status(200).json({
        status: 'success',
        message: 'Payment verified and enrollment created successfully',
        data: verificationResult
      });
    } catch (error) {
      // Log payment verification failure
      console.error(`[PAYMENT] Payment verification failed - User: ${req.user.userId}, Error: ${error.message}`);

      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({
        status: 'error',
        message: error.message || 'Payment verification failed',
        errors: [error.message || 'An unexpected error occurred']
      });
    }
  }
);

/**
 * GET /api/payment/history
 * Get user's payment history
 * Protected route
 */
router.get(
  '/history',
  authenticate,
  async (req, res) => {
    try {
      const userId = req.user.userId;

      // Get payment history using PaymentService
      const payments = await PaymentService.getPaymentHistory(userId);

      res.status(200).json({
        status: 'success',
        message: 'Payment history retrieved successfully',
        data: { payments }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve payment history',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

module.exports = router;
