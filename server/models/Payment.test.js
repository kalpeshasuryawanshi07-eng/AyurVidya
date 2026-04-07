const mongoose = require('mongoose');
const Payment = require('./Payment');
const User = require('./User');
const Course = require('./Course');

// Mock MongoDB connection for testing
beforeAll(async () => {
  const baseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurveda-test';
  const mongoUri = `${baseUri}-${process.env.JEST_WORKER_ID || '1'}`;
  await mongoose.connect(mongoUri);
  // Ensure indexes are created and synced
  await Promise.all([
    Payment.init(),
    User.init(),
    Course.init()
  ]);
  await Payment.syncIndexes();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Payment.deleteMany({});
  await User.deleteMany({});
  await Course.deleteMany({});
});

describe('Payment Model', () => {
  let testUser;
  let testCourse;

  beforeEach(async () => {
    testUser = await new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    }).save();

    testCourse = await new Course({
      slug: 'test-course',
      title: 'Test Course',
      description: 'Test description',
      price: 999,
      isPaid: true
    }).save();
  });

  describe('Schema Validation', () => {
    test('should create a valid payment with all required fields', async () => {
      const paymentData = {
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789',
        amount: 99900
      };

      const payment = new Payment(paymentData);
      const savedPayment = await payment.save();

      expect(savedPayment._id).toBeDefined();
      expect(savedPayment.userId.toString()).toBe(testUser._id.toString());
      expect(savedPayment.courseId.toString()).toBe(testCourse._id.toString());
      expect(savedPayment.razorpayOrderId).toBe('order_123456789');
      expect(savedPayment.amount).toBe(99900);
      expect(savedPayment.currency).toBe('INR');
      expect(savedPayment.status).toBe('created');
      expect(savedPayment.createdAt).toBeDefined();
      expect(savedPayment.updatedAt).toBeDefined();
    });

    test('should fail validation when userId is missing', async () => {
      const payment = new Payment({
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789',
        amount: 99900
      });

      await expect(payment.save()).rejects.toThrow();
    });

    test('should fail validation when courseId is missing', async () => {
      const payment = new Payment({
        userId: testUser._id,
        razorpayOrderId: 'order_123456789',
        amount: 99900
      });

      await expect(payment.save()).rejects.toThrow();
    });

    test('should fail validation when razorpayOrderId is missing', async () => {
      const payment = new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        amount: 99900
      });

      await expect(payment.save()).rejects.toThrow();
    });

    test('should fail validation when amount is missing', async () => {
      const payment = new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789'
      });

      await expect(payment.save()).rejects.toThrow();
    });

    test('should trim whitespace from razorpayOrderId', async () => {
      const payment = new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: '  order_123456789  ',
        amount: 99900
      });

      const savedPayment = await payment.save();
      expect(savedPayment.razorpayOrderId).toBe('order_123456789');
    });
  });

  describe('RazorpayOrderId Uniqueness Constraint', () => {
    test('should enforce unique razorpayOrderId constraint', async () => {
      await new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789',
        amount: 99900
      }).save();

      const duplicatePayment = new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789',
        amount: 99900
      });

      await expect(duplicatePayment.save()).rejects.toThrow();
    });
  });

  describe('Amount Field', () => {
    test('should accept positive amount', async () => {
      const payment = new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789',
        amount: 99900
      });

      const savedPayment = await payment.save();
      expect(savedPayment.amount).toBe(99900);
    });

    test('should accept zero amount', async () => {
      const payment = new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789',
        amount: 0
      });

      const savedPayment = await payment.save();
      expect(savedPayment.amount).toBe(0);
    });

    test('should reject negative amount', async () => {
      const payment = new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789',
        amount: -1000
      });

      await expect(payment.save()).rejects.toThrow();
    });
  });

  describe('Currency Field', () => {
    test('should default currency to INR', async () => {
      const payment = new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789',
        amount: 99900
      });

      const savedPayment = await payment.save();
      expect(savedPayment.currency).toBe('INR');
    });

    test('should convert currency to uppercase', async () => {
      const payment = new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789',
        amount: 99900,
        currency: 'usd'
      });

      const savedPayment = await payment.save();
      expect(savedPayment.currency).toBe('USD');
    });

    test('should trim whitespace from currency', async () => {
      const payment = new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789',
        amount: 99900,
        currency: '  EUR  '
      });

      const savedPayment = await payment.save();
      expect(savedPayment.currency).toBe('EUR');
    });
  });

  describe('Status Field', () => {
    test('should default status to created', async () => {
      const payment = new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789',
        amount: 99900
      });

      const savedPayment = await payment.save();
      expect(savedPayment.status).toBe('created');
    });

    test('should accept paid status', async () => {
      const payment = new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789',
        amount: 99900,
        status: 'paid'
      });

      const savedPayment = await payment.save();
      expect(savedPayment.status).toBe('paid');
    });

    test('should accept failed status', async () => {
      const payment = new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789',
        amount: 99900,
        status: 'failed'
      });

      const savedPayment = await payment.save();
      expect(savedPayment.status).toBe('failed');
    });

    test('should reject invalid status', async () => {
      const payment = new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789',
        amount: 99900,
        status: 'pending'
      });

      await expect(payment.save()).rejects.toThrow();
    });
  });

  describe('Razorpay Payment Details', () => {
    test('should accept razorpayPaymentId and razorpaySignature', async () => {
      const payment = new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789',
        razorpayPaymentId: 'pay_987654321',
        razorpaySignature: 'signature_abc123',
        amount: 99900,
        status: 'paid'
      });

      const savedPayment = await payment.save();
      expect(savedPayment.razorpayPaymentId).toBe('pay_987654321');
      expect(savedPayment.razorpaySignature).toBe('signature_abc123');
    });

    test('should trim whitespace from razorpay fields', async () => {
      const payment = new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789',
        razorpayPaymentId: '  pay_987654321  ',
        razorpaySignature: '  signature_abc123  ',
        amount: 99900
      });

      const savedPayment = await payment.save();
      expect(savedPayment.razorpayPaymentId).toBe('pay_987654321');
      expect(savedPayment.razorpaySignature).toBe('signature_abc123');
    });
  });

  describe('PaidAt Field', () => {
    test('should accept paidAt date', async () => {
      const paidDate = new Date('2024-01-15');
      const payment = new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789',
        amount: 99900,
        status: 'paid',
        paidAt: paidDate
      });

      const savedPayment = await payment.save();
      expect(savedPayment.paidAt).toEqual(paidDate);
    });

    test('should allow paidAt to be undefined for unpaid payments', async () => {
      const payment = new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789',
        amount: 99900,
        status: 'created'
      });

      const savedPayment = await payment.save();
      expect(savedPayment.paidAt).toBeUndefined();
    });
  });

  describe('Indexes', () => {
    test('should have userId index', async () => {
      // Create a document to ensure collection exists
      await new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_index_test',
        amount: 99900
      }).save();
      
      const indexes = await Payment.collection.getIndexes();
      expect(indexes).toHaveProperty('userId_1');
    });

    test('should have razorpayOrderId index', async () => {
      const indexes = await Payment.collection.getIndexes();
      expect(indexes).toHaveProperty('razorpayOrderId_1');
    });

    test('should have status index', async () => {
      const indexes = await Payment.collection.getIndexes();
      expect(indexes).toHaveProperty('status_1');
    });
  });

  describe('Timestamps', () => {
    test('should automatically set createdAt and updatedAt', async () => {
      const payment = new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789',
        amount: 99900
      });

      const savedPayment = await payment.save();
      expect(savedPayment.createdAt).toBeInstanceOf(Date);
      expect(savedPayment.updatedAt).toBeInstanceOf(Date);
    });

    test('should update updatedAt on modification', async () => {
      const payment = new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789',
        amount: 99900
      });

      const savedPayment = await payment.save();
      const originalUpdatedAt = savedPayment.updatedAt;

      // Wait a bit to ensure timestamp difference
      await new Promise(resolve => setTimeout(resolve, 10));

      savedPayment.status = 'paid';
      savedPayment.paidAt = new Date();
      await savedPayment.save();

      expect(savedPayment.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });
  });

  describe('Population', () => {
    test('should populate userId reference', async () => {
      const payment = await new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789',
        amount: 99900
      }).save();

      const populatedPayment = await Payment.findById(payment._id).populate('userId');
      expect(populatedPayment.userId.name).toBe('Test User');
      expect(populatedPayment.userId.email).toBe('test@example.com');
    });

    test('should populate courseId reference', async () => {
      const payment = await new Payment({
        userId: testUser._id,
        courseId: testCourse._id,
        razorpayOrderId: 'order_123456789',
        amount: 99900
      }).save();

      const populatedPayment = await Payment.findById(payment._id).populate('courseId');
      expect(populatedPayment.courseId.title).toBe('Test Course');
      expect(populatedPayment.courseId.slug).toBe('test-course');
      expect(populatedPayment.courseId.price).toBe(999);
    });
  });
});
