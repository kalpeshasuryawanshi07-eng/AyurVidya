const request = require('supertest');
const express = require('express');
const paymentRoutes = require('./payment');
const PaymentService = require('../services/PaymentService');

jest.mock('../services/PaymentService');
jest.mock('../middleware/auth', () => ({
  authenticate: (req, res, next) => {
    if (req.headers.authorization === 'Bearer valid-token') {
      req.user = { userId: 'user123', role: 'student' };
      next();
    } else {
      res.status(401).json({
        status: 'error',
        message: 'No token provided',
        errors: ['Authorization header must be in format: Bearer <token>']
      });
    }
  }
}));

describe('Payment Routes', () => {
  let app;
  let consoleLogSpy;
  let consoleErrorSpy;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/payment', paymentRoutes);
    jest.clearAllMocks();
    
    // Spy on console methods
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  describe('POST /api/payment/create-order', () => {
    it('should create payment order successfully', async () => {
      const mockOrderData = {
        razorpayOrderId: 'order_123',
        amount: 999,
        currency: 'INR',
        keyId: 'rzp_test_key'
      };

      PaymentService.createOrder.mockResolvedValue(mockOrderData);

      const response = await request(app)
        .post('/api/payment/create-order')
        .set('Authorization', 'Bearer valid-token')
        .send({ courseId: '507f1f77bcf86cd799439011' });

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Payment order created successfully');
      expect(response.body.data).toEqual(mockOrderData);
      expect(PaymentService.createOrder).toHaveBeenCalledWith('user123', '507f1f77bcf86cd799439011');
      
      // Verify logging
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('[PAYMENT] Creating order')
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('[PAYMENT] Order created successfully')
      );
    });

    it('should pass selected payment method to create order', async () => {
      const mockOrderData = {
        razorpayOrderId: 'order_789',
        amount: 999,
        currency: 'INR',
        keyId: 'rzp_test_key'
      };

      PaymentService.createOrder.mockResolvedValue(mockOrderData);

      const response = await request(app)
        .post('/api/payment/create-order')
        .set('Authorization', 'Bearer valid-token')
        .send({
          courseId: '507f1f77bcf86cd799439011',
          paymentMethod: 'upi'
        });

      expect(response.status).toBe(201);
      expect(PaymentService.createOrder).toHaveBeenCalledWith(
        'user123',
        '507f1f77bcf86cd799439011',
        'upi'
      );
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .post('/api/payment/create-order')
        .send({ courseId: '507f1f77bcf86cd799439011' });

      expect(response.status).toBe(401);
      expect(response.body.status).toBe('error');
      expect(PaymentService.createOrder).not.toHaveBeenCalled();
    });

    it('should return 400 when courseId is missing', async () => {
      const response = await request(app)
        .post('/api/payment/create-order')
        .set('Authorization', 'Bearer valid-token')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
      expect(response.body.errors).toContain('Course ID is required');
      expect(PaymentService.createOrder).not.toHaveBeenCalled();
    });

    it('should return 400 when courseId is invalid format', async () => {
      const response = await request(app)
        .post('/api/payment/create-order')
        .set('Authorization', 'Bearer valid-token')
        .send({ courseId: 'invalid-id' });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
      expect(response.body.errors).toContain('Invalid course ID format');
      expect(PaymentService.createOrder).not.toHaveBeenCalled();
    });

    it('should return 400 when paymentMethod is invalid', async () => {
      const response = await request(app)
        .post('/api/payment/create-order')
        .set('Authorization', 'Bearer valid-token')
        .send({
          courseId: '507f1f77bcf86cd799439011',
          paymentMethod: 'cash'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
      expect(PaymentService.createOrder).not.toHaveBeenCalled();
    });

    it('should return 404 when course not found', async () => {
      const error = new Error('Course not found');
      error.name = 'CourseNotFoundError';
      error.statusCode = 404;
      PaymentService.createOrder.mockRejectedValue(error);

      const response = await request(app)
        .post('/api/payment/create-order')
        .set('Authorization', 'Bearer valid-token')
        .send({ courseId: '507f1f77bcf86cd799439011' });

      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Course not found');
      
      // Verify error logging
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('[PAYMENT] Order creation failed')
      );
    });

    it('should return 400 when course is free', async () => {
      const error = new Error('This course is free. Use enrollFree endpoint instead.');
      error.name = 'ValidationError';
      error.statusCode = 400;
      PaymentService.createOrder.mockRejectedValue(error);

      const response = await request(app)
        .post('/api/payment/create-order')
        .set('Authorization', 'Bearer valid-token')
        .send({ courseId: '507f1f77bcf86cd799439011' });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('This course is free. Use enrollFree endpoint instead.');
    });

    it('should return 400 when user already enrolled', async () => {
      const error = new Error('User is already enrolled in this course');
      error.name = 'AlreadyEnrolledError';
      error.statusCode = 400;
      PaymentService.createOrder.mockRejectedValue(error);

      const response = await request(app)
        .post('/api/payment/create-order')
        .set('Authorization', 'Bearer valid-token')
        .send({ courseId: '507f1f77bcf86cd799439011' });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('User is already enrolled in this course');
    });

    it('should return 500 on unexpected error', async () => {
      PaymentService.createOrder.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/api/payment/create-order')
        .set('Authorization', 'Bearer valid-token')
        .send({ courseId: '507f1f77bcf86cd799439011' });

      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
    });
  });

  describe('POST /api/payment/verify', () => {
    it('should verify payment successfully', async () => {
      const mockVerificationResult = {
        verified: true,
        enrollmentId: 'enrollment123'
      };

      PaymentService.verifyPayment.mockResolvedValue(mockVerificationResult);

      const response = await request(app)
        .post('/api/payment/verify')
        .set('Authorization', 'Bearer valid-token')
        .send({
          razorpayOrderId: 'order_123',
          razorpayPaymentId: 'pay_123',
          razorpaySignature: 'signature_123'
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Payment verified and enrollment created successfully');
      expect(response.body.data).toEqual(mockVerificationResult);
      expect(PaymentService.verifyPayment).toHaveBeenCalledWith(
        'order_123',
        'pay_123',
        'signature_123'
      );
      
      // Verify logging
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('[PAYMENT] Verifying payment')
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('[PAYMENT] Payment verified successfully')
      );
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .post('/api/payment/verify')
        .send({
          razorpayOrderId: 'order_123',
          razorpayPaymentId: 'pay_123',
          razorpaySignature: 'signature_123'
        });

      expect(response.status).toBe(401);
      expect(response.body.status).toBe('error');
      expect(PaymentService.verifyPayment).not.toHaveBeenCalled();
    });

    it('should return 400 when razorpayOrderId is missing', async () => {
      const response = await request(app)
        .post('/api/payment/verify')
        .set('Authorization', 'Bearer valid-token')
        .send({
          razorpayPaymentId: 'pay_123',
          razorpaySignature: 'signature_123'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
      expect(response.body.errors).toContain('Razorpay order ID is required');
      expect(PaymentService.verifyPayment).not.toHaveBeenCalled();
    });

    it('should return 400 when razorpayPaymentId is missing', async () => {
      const response = await request(app)
        .post('/api/payment/verify')
        .set('Authorization', 'Bearer valid-token')
        .send({
          razorpayOrderId: 'order_123',
          razorpaySignature: 'signature_123'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
      expect(response.body.errors).toContain('Razorpay payment ID is required');
      expect(PaymentService.verifyPayment).not.toHaveBeenCalled();
    });

    it('should return 400 when razorpaySignature is missing', async () => {
      const response = await request(app)
        .post('/api/payment/verify')
        .set('Authorization', 'Bearer valid-token')
        .send({
          razorpayOrderId: 'order_123',
          razorpayPaymentId: 'pay_123'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
      expect(response.body.errors).toContain('Razorpay signature is required');
      expect(PaymentService.verifyPayment).not.toHaveBeenCalled();
    });

    it('should return 404 when payment record not found', async () => {
      const error = new Error('Payment record not found');
      error.name = 'PaymentNotFoundError';
      error.statusCode = 404;
      PaymentService.verifyPayment.mockRejectedValue(error);

      const response = await request(app)
        .post('/api/payment/verify')
        .set('Authorization', 'Bearer valid-token')
        .send({
          razorpayOrderId: 'order_123',
          razorpayPaymentId: 'pay_123',
          razorpaySignature: 'signature_123'
        });

      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Payment record not found');
      
      // Verify error logging
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('[PAYMENT] Payment verification failed')
      );
    });

    it('should return 400 when signature verification fails', async () => {
      const error = new Error('Payment verification failed. Invalid signature.');
      error.name = 'PaymentVerificationError';
      error.statusCode = 400;
      PaymentService.verifyPayment.mockRejectedValue(error);

      const response = await request(app)
        .post('/api/payment/verify')
        .set('Authorization', 'Bearer valid-token')
        .send({
          razorpayOrderId: 'order_123',
          razorpayPaymentId: 'pay_123',
          razorpaySignature: 'invalid_signature'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Payment verification failed. Invalid signature.');
    });

    it('should return 500 on unexpected error', async () => {
      PaymentService.verifyPayment.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/api/payment/verify')
        .set('Authorization', 'Bearer valid-token')
        .send({
          razorpayOrderId: 'order_123',
          razorpayPaymentId: 'pay_123',
          razorpaySignature: 'signature_123'
        });

      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
    });
  });

  describe('GET /api/payment/history', () => {
    it('should retrieve payment history successfully', async () => {
      const mockPayments = [
        {
          _id: 'payment1',
          userId: 'user123',
          courseId: {
            _id: 'course1',
            title: 'Ayurveda Basics',
            titleMr: 'आयुर्वेद मूलभूत',
            slug: 'ayurveda-basics',
            price: 999
          },
          razorpayOrderId: 'order_123',
          amount: 999,
          currency: 'INR',
          status: 'paid',
          createdAt: new Date('2024-01-01')
        },
        {
          _id: 'payment2',
          userId: 'user123',
          courseId: {
            _id: 'course2',
            title: 'Advanced Ayurveda',
            titleMr: 'प्रगत आयुर्वेद',
            slug: 'advanced-ayurveda',
            price: 1499
          },
          razorpayOrderId: 'order_456',
          amount: 1499,
          currency: 'INR',
          status: 'paid',
          createdAt: new Date('2024-01-15')
        }
      ];

      PaymentService.getPaymentHistory.mockResolvedValue(mockPayments);

      const response = await request(app)
        .get('/api/payment/history')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Payment history retrieved successfully');
      expect(response.body.data.payments).toHaveLength(2);
      expect(response.body.data.payments[0].razorpayOrderId).toBe('order_123');
      expect(response.body.data.payments[0].amount).toBe(999);
      expect(response.body.data.payments[0].status).toBe('paid');
      expect(response.body.data.payments[1].razorpayOrderId).toBe('order_456');
      expect(response.body.data.payments[1].amount).toBe(1499);
      expect(PaymentService.getPaymentHistory).toHaveBeenCalledWith('user123');
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .get('/api/payment/history');

      expect(response.status).toBe(401);
      expect(response.body.status).toBe('error');
      expect(PaymentService.getPaymentHistory).not.toHaveBeenCalled();
    });

    it('should return empty array when user has no payment history', async () => {
      PaymentService.getPaymentHistory.mockResolvedValue([]);

      const response = await request(app)
        .get('/api/payment/history')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.payments).toEqual([]);
      expect(response.body.data.payments).toHaveLength(0);
    });

    it('should return 500 on unexpected error', async () => {
      PaymentService.getPaymentHistory.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/api/payment/history')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Failed to retrieve payment history');
    });
  });
});
