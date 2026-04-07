const crypto = require('crypto');
const PaymentService = require('./PaymentService');
const Payment = require('../models/Payment');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// Mock dependencies
jest.mock('../models/Payment');
jest.mock('../models/Course');
jest.mock('../models/Enrollment');
jest.mock('razorpay');

const Razorpay = require('razorpay');

describe('PaymentService', () => {
  let mockRazorpayInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Set environment variables first
    process.env.RAZORPAY_KEY_ID = 'test_key_id';
    process.env.RAZORPAY_KEY_SECRET = 'test_key_secret';
    
    // Mock Razorpay instance
    mockRazorpayInstance = {
      orders: {
        create: jest.fn()
      }
    };
    
    Razorpay.mockImplementation(() => mockRazorpayInstance);
    
    // Reset the PaymentService instance
    PaymentService._razorpay = null;
  });

  describe('createOrder', () => {
    it('should create Razorpay order and payment record for paid course', async () => {
      const userId = 'user123';
      const courseId = 'course123';
      const mockCourse = {
        _id: courseId,
        title: 'Test Course',
        price: 999,
        isPaid: true
      };
      const mockRazorpayOrder = {
        id: 'order_123',
        amount: 99900,
        currency: 'INR'
      };

      Course.findById.mockResolvedValue(mockCourse);
      Enrollment.findOne.mockResolvedValue(null);
      mockRazorpayInstance.orders.create.mockResolvedValue(mockRazorpayOrder);
      
      const mockPayment = {
        save: jest.fn().mockResolvedValue(true)
      };
      Payment.mockImplementation(() => mockPayment);

      const result = await PaymentService.createOrder(userId, courseId);

      expect(Course.findById).toHaveBeenCalledWith(courseId);
      expect(Enrollment.findOne).toHaveBeenCalledWith({ userId, courseId });
      expect(mockRazorpayInstance.orders.create).toHaveBeenCalledWith({
        amount: 99900,
        currency: 'INR',
        receipt: expect.stringContaining(`order_${userId}_${courseId}`)
      });
      expect(mockPayment.save).toHaveBeenCalled();
      expect(result).toEqual({
        razorpayOrderId: 'order_123',
        amount: 999,
        currency: 'INR',
        keyId: 'test_key_id'
      });
    });

    it('should throw CourseNotFoundError when course does not exist', async () => {
      Course.findById.mockResolvedValue(null);

      await expect(
        PaymentService.createOrder('user123', 'invalid_course')
      ).rejects.toThrow('Course not found');
    });

    it('should throw ValidationError for free course', async () => {
      const mockCourse = {
        _id: 'course123',
        title: 'Free Course',
        price: 0,
        isPaid: false
      };

      Course.findById.mockResolvedValue(mockCourse);

      await expect(
        PaymentService.createOrder('user123', 'course123')
      ).rejects.toThrow('This course is free');
    });

    it('should throw AlreadyEnrolledError when user is already enrolled', async () => {
      const mockCourse = {
        _id: 'course123',
        title: 'Test Course',
        price: 999,
        isPaid: true
      };
      const mockEnrollment = {
        userId: 'user123',
        courseId: 'course123'
      };

      Course.findById.mockResolvedValue(mockCourse);
      Enrollment.findOne.mockResolvedValue(mockEnrollment);

      await expect(
        PaymentService.createOrder('user123', 'course123')
      ).rejects.toThrow('User is already enrolled in this course');
    });

    it('should accept selected payment method when available for course', async () => {
      const userId = 'user123';
      const courseId = 'course123';
      const mockCourse = {
        _id: courseId,
        title: 'Test Course',
        price: 999,
        isPaid: true,
        paymentMethods: ['upi', 'card']
      };
      const mockRazorpayOrder = {
        id: 'order_456',
        amount: 99900,
        currency: 'INR'
      };

      Course.findById.mockResolvedValue(mockCourse);
      Enrollment.findOne.mockResolvedValue(null);
      mockRazorpayInstance.orders.create.mockResolvedValue(mockRazorpayOrder);

      const mockPayment = {
        save: jest.fn().mockResolvedValue(true)
      };
      Payment.mockImplementation(() => mockPayment);

      await PaymentService.createOrder(userId, courseId, 'upi');

      expect(Payment).toHaveBeenCalledWith(expect.objectContaining({
        paymentMethod: 'upi'
      }));
    });

    it('should reject selected payment method when not available for course', async () => {
      const mockCourse = {
        _id: 'course123',
        title: 'Test Course',
        price: 999,
        isPaid: true,
        paymentMethods: ['upi', 'card']
      };

      Course.findById.mockResolvedValue(mockCourse);
      Enrollment.findOne.mockResolvedValue(null);

      await expect(
        PaymentService.createOrder('user123', 'course123', 'wallet')
      ).rejects.toThrow('Selected payment method is not available for this course');

      expect(Payment).not.toHaveBeenCalled();
    });
  });

  describe('verifyPayment', () => {
    it('should verify payment signature and create enrollment', async () => {
      const razorpayOrderId = 'order_123';
      const razorpayPaymentId = 'pay_123';
      const razorpaySignature = crypto
        .createHmac('sha256', 'test_key_secret')
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest('hex');

      const mockPayment = {
        _id: 'payment123',
        userId: 'user123',
        courseId: 'course123',
        razorpayOrderId,
        status: 'created',
        save: jest.fn().mockResolvedValue(true)
      };

      const mockEnrollment = {
        _id: 'enrollment123',
        userId: 'user123',
        courseId: 'course123',
        save: jest.fn().mockResolvedValue(true),
        toObject: jest.fn().mockReturnValue({ _id: 'enrollment123' })
      };

      Payment.findOne.mockResolvedValue(mockPayment);
      Enrollment.mockImplementation(() => mockEnrollment);
      Course.findByIdAndUpdate.mockResolvedValue(true);

      const result = await PaymentService.verifyPayment(
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature
      );

      expect(Payment.findOne).toHaveBeenCalledWith({ razorpayOrderId });
      expect(mockPayment.status).toBe('paid');
      expect(mockPayment.razorpayPaymentId).toBe(razorpayPaymentId);
      expect(mockPayment.razorpaySignature).toBe(razorpaySignature);
      expect(mockPayment.paidAt).toBeInstanceOf(Date);
      expect(mockPayment.save).toHaveBeenCalled();
      expect(mockEnrollment.save).toHaveBeenCalled();
      expect(Course.findByIdAndUpdate).toHaveBeenCalledWith('course123', {
        $inc: { enrollmentCount: 1 }
      });
      expect(result).toEqual({
        verified: true,
        enrollmentId: 'enrollment123'
      });
    });

    it('should throw PaymentNotFoundError when payment record does not exist', async () => {
      Payment.findOne.mockResolvedValue(null);

      await expect(
        PaymentService.verifyPayment('order_123', 'pay_123', 'signature')
      ).rejects.toThrow('Payment record not found');
    });

    it('should throw PaymentVerificationError for invalid signature', async () => {
      const razorpayOrderId = 'order_123';
      const razorpayPaymentId = 'pay_123';
      const invalidSignature = 'invalid_signature';

      const mockPayment = {
        _id: 'payment123',
        userId: 'user123',
        courseId: 'course123',
        razorpayOrderId,
        status: 'created',
        save: jest.fn().mockResolvedValue(true)
      };

      Payment.findOne.mockResolvedValue(mockPayment);

      await expect(
        PaymentService.verifyPayment(razorpayOrderId, razorpayPaymentId, invalidSignature)
      ).rejects.toThrow('Payment verification failed');

      expect(mockPayment.status).toBe('failed');
      expect(mockPayment.save).toHaveBeenCalled();
    });
  });

  describe('enrollFree', () => {
    it('should create enrollment for free course', async () => {
      const userId = 'user123';
      const courseId = 'course123';
      const mockCourse = {
        _id: courseId,
        title: 'Free Course',
        price: 0,
        isPaid: false
      };

      const mockEnrollment = {
        _id: 'enrollment123',
        userId,
        courseId,
        save: jest.fn().mockResolvedValue(true),
        toObject: jest.fn().mockReturnValue({
          _id: 'enrollment123',
          userId,
          courseId,
          enrolledAt: expect.any(Date)
        })
      };

      Course.findById.mockResolvedValue(mockCourse);
      Enrollment.findOne.mockResolvedValue(null);
      Enrollment.mockImplementation(() => mockEnrollment);
      Course.findByIdAndUpdate.mockResolvedValue(true);

      const result = await PaymentService.enrollFree(userId, courseId);

      expect(Course.findById).toHaveBeenCalledWith(courseId);
      expect(Enrollment.findOne).toHaveBeenCalledWith({ userId, courseId });
      expect(mockEnrollment.save).toHaveBeenCalled();
      expect(Course.findByIdAndUpdate).toHaveBeenCalledWith(courseId, {
        $inc: { enrollmentCount: 1 }
      });
      expect(result).toEqual({
        _id: 'enrollment123',
        userId,
        courseId,
        enrolledAt: expect.any(Date)
      });
    });

    it('should throw CourseNotFoundError when course does not exist', async () => {
      Course.findById.mockResolvedValue(null);

      await expect(
        PaymentService.enrollFree('user123', 'invalid_course')
      ).rejects.toThrow('Course not found');
    });

    it('should throw ValidationError for paid course', async () => {
      const mockCourse = {
        _id: 'course123',
        title: 'Paid Course',
        price: 999,
        isPaid: true
      };

      Course.findById.mockResolvedValue(mockCourse);

      await expect(
        PaymentService.enrollFree('user123', 'course123')
      ).rejects.toThrow('This course requires payment');
    });

    it('should throw AlreadyEnrolledError when user is already enrolled', async () => {
      const mockCourse = {
        _id: 'course123',
        title: 'Free Course',
        price: 0,
        isPaid: false
      };
      const mockEnrollment = {
        userId: 'user123',
        courseId: 'course123'
      };

      Course.findById.mockResolvedValue(mockCourse);
      Enrollment.findOne.mockResolvedValue(mockEnrollment);

      await expect(
        PaymentService.enrollFree('user123', 'course123')
      ).rejects.toThrow('User is already enrolled in this course');
    });
  });

  describe('getPaymentHistory', () => {
    it('should return payment history for user', async () => {
      const userId = 'user123';
      const mockPayments = [
        {
          _id: 'payment1',
          userId,
          courseId: {
            title: 'Course 1',
            titleMr: 'कोर्स १',
            slug: 'course-1',
            price: 999
          },
          razorpayOrderId: 'order_1',
          amount: 999,
          status: 'paid',
          createdAt: new Date('2024-01-01')
        },
        {
          _id: 'payment2',
          userId,
          courseId: {
            title: 'Course 2',
            titleMr: 'कोर्स २',
            slug: 'course-2',
            price: 1499
          },
          razorpayOrderId: 'order_2',
          amount: 1499,
          status: 'paid',
          createdAt: new Date('2024-01-02')
        }
      ];

      const mockQuery = {
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(mockPayments)
      };

      Payment.find.mockReturnValue(mockQuery);

      const result = await PaymentService.getPaymentHistory(userId);

      expect(Payment.find).toHaveBeenCalledWith({ userId });
      expect(mockQuery.populate).toHaveBeenCalledWith('courseId', 'title titleMr slug price');
      expect(mockQuery.sort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(result).toEqual(mockPayments);
    });

    it('should return empty array when user has no payment history', async () => {
      const mockQuery = {
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue([])
      };

      Payment.find.mockReturnValue(mockQuery);

      const result = await PaymentService.getPaymentHistory('user123');

      expect(result).toEqual([]);
    });
  });
});
