/**
 * Example Usage of Custom Error Classes
 * 
 * This file demonstrates how to use custom error classes in route handlers
 * to provide consistent error responses across the API.
 */

const express = require('express');
const {
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  DatabaseError,
} = require('./errors');
const { authenticate, authorize } = require('./auth');

const router = express.Router();

// Example 1: Validation Error
router.post('/api/users', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    const errors = [];
    if (!email) errors.push('Email is required');
    if (!password) errors.push('Password is required');
    if (password && password.length < 6) errors.push('Password must be at least 6 characters');
    
    if (errors.length > 0) {
      throw new ValidationError('Validation failed', errors);
    }
    
    // Create user...
    res.json({ success: true });
  } catch (error) {
    next(error); // Pass to error handler middleware
  }
});

// Example 2: Not Found Error
router.get('/api/topics/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const topic = await Topic.findOne({ slug });
    
    if (!topic) {
      throw new NotFoundError(`Topic with slug '${slug}' not found`);
    }
    
    res.json({ topic });
  } catch (error) {
    next(error);
  }
});

// Example 3: Unauthorized Error
router.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      throw new UnauthorizedError('Invalid email or password');
    }
    
    const token = generateToken(user);
    res.json({ token, user });
  } catch (error) {
    next(error);
  }
});

// Example 4: Forbidden Error
router.delete('/api/admin/users/:id', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Additional authorization check
    if (id === req.user.userId) {
      throw new ForbiddenError('Cannot delete your own account');
    }
    
    await User.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// Example 5: Database Error
router.get('/api/topics', async (req, res, next) => {
  try {
    const topics = await Topic.find();
    res.json({ topics });
  } catch (error) {
    // Check if it's a database connection error
    if (error.name === 'MongoNetworkError' || error.name === 'MongooseServerSelectionError') {
      next(new DatabaseError('Unable to connect to database'));
    } else {
      next(error);
    }
  }
});

// Example 6: Using with async/await and express-validator
const { validationResult } = require('express-validator');

router.post('/api/bookmarks', authenticate, async (req, res, next) => {
  try {
    // Check express-validator results
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const errorMessages = validationErrors.array().map(err => err.msg);
      throw new ValidationError('Validation failed', errorMessages);
    }
    
    const { topicSlug } = req.body;
    
    // Check if topic exists
    const topic = await Topic.findOne({ slug: topicSlug });
    if (!topic) {
      throw new NotFoundError('Topic not found');
    }
    
    // Check if bookmark already exists
    const existingBookmark = await Bookmark.findOne({
      userId: req.user.userId,
      topicSlug,
    });
    
    if (existingBookmark) {
      throw new ValidationError('Bookmark already exists', ['This topic is already bookmarked']);
    }
    
    // Create bookmark
    const bookmark = await Bookmark.create({
      userId: req.user.userId,
      topicSlug,
    });
    
    res.status(201).json({ bookmark });
  } catch (error) {
    next(error);
  }
});

// Example 7: Handling multiple error types
router.put('/api/courses/:id', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Validate updates
    if (updates.price && updates.price < 0) {
      throw new ValidationError('Invalid price', ['Price cannot be negative']);
    }
    
    // Find course
    const course = await Course.findById(id);
    if (!course) {
      throw new NotFoundError('Course not found');
    }
    
    // Update course
    Object.assign(course, updates);
    await course.save();
    
    res.json({ course });
  } catch (error) {
    // Mongoose validation errors are automatically handled by error handler
    next(error);
  }
});

// Example 8: Generic error with custom status code
router.post('/api/payment/verify', authenticate, async (req, res, next) => {
  try {
    const { orderId, paymentId, signature } = req.body;
    
    const isValid = verifyPaymentSignature(orderId, paymentId, signature);
    
    if (!isValid) {
      // Create custom error with specific status code
      const error = new Error('Payment verification failed');
      error.statusCode = 400;
      error.errors = ['Invalid payment signature'];
      throw error;
    }
    
    // Process enrollment...
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
