const express = require('express');
const { param, query, body, validationResult } = require('express-validator');
const { authenticate, authorize } = require('../middleware/auth');
const AdminService = require('../services/AdminService');

const router = express.Router();
const PAYMENT_METHOD_VALUES = ['upi', 'card', 'netbanking', 'wallet', 'emi', 'paylater'];

// Apply authentication and admin authorization to all routes
router.use(authenticate);
router.use(authorize('admin'));

/**
 * GET /api/admin/stats
 * Get platform statistics
 * Admin only
 */
router.get('/stats', async (req, res) => {
  try {
    const stats = await AdminService.getStats();

    res.status(200).json({
      status: 'success',
      message: 'Statistics retrieved successfully',
      data: { stats }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve statistics',
      errors: ['An unexpected error occurred']
    });
  }
});

/**
 * GET /api/admin/courses
 * Get courses with pagination
 * Admin only
 */
router.get(
  '/courses',
  [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: errors.array().map(err => err.msg)
        });
      }

      const { page, limit } = req.query;
      const result = await AdminService.getCourses({ page, limit });

      res.status(200).json({
        status: 'success',
        message: 'Courses retrieved successfully',
        data: result
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve courses',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * GET /api/admin/users
 * Get users with pagination and filtering
 * Admin only
 */
router.get(
  '/users',
  [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100'),
    query('role')
      .optional()
      .isIn(['student', 'admin'])
      .withMessage('Role must be either "student" or "admin"'),
    query('registrationDate')
      .optional()
      .isISO8601()
      .withMessage('Registration date must be a valid ISO 8601 date')
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

      const { page, limit, role, registrationDate } = req.query;

      const result = await AdminService.getUsers(
        { page, limit },
        { role, registrationDate }
      );

      res.status(200).json({
        status: 'success',
        message: 'Users retrieved successfully',
        data: result
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve users',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * PATCH /api/admin/users/:id
 * Update user data
 * Admin only
 */
router.patch(
  '/users/:id',
  [
    param('id')
      .trim()
      .notEmpty()
      .withMessage('User ID is required')
      .isMongoId()
      .withMessage('Invalid user ID format'),
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters'),
    body('email')
      .optional()
      .trim()
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
    body('role')
      .optional()
      .isIn(['student', 'admin'])
      .withMessage('Role must be either "student" or "admin"'),
    body('preferredLang')
      .optional()
      .isIn(['en', 'mr'])
      .withMessage('Language must be either "en" or "mr"')
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

      const { id } = req.params;
      const updates = req.body;

      const user = await AdminService.updateUser(id, updates);

      res.status(200).json({
        status: 'success',
        message: 'User updated successfully',
        data: { user }
      });
    } catch (error) {
      // Handle specific errors
      if (error.name === 'UserNotFoundError') {
        return res.status(404).json({
          status: 'error',
          message: error.message,
          errors: [error.message]
        });
      }

      if (error.name === 'ValidationError') {
        return res.status(400).json({
          status: 'error',
          message: error.message,
          errors: [error.message]
        });
      }

      res.status(500).json({
        status: 'error',
        message: 'Failed to update user',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * DELETE /api/admin/users/:id
 * Delete user account
 * Admin only
 */
router.delete(
  '/users/:id',
  [
    param('id')
      .trim()
      .notEmpty()
      .withMessage('User ID is required')
      .isMongoId()
      .withMessage('Invalid user ID format')
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

      const { id } = req.params;

      const result = await AdminService.deleteUser(id);

      res.status(200).json({
        status: 'success',
        message: 'User deleted successfully',
        data: result
      });
    } catch (error) {
      // Handle specific errors
      if (error.name === 'UserNotFoundError') {
        return res.status(404).json({
          status: 'error',
          message: error.message,
          errors: [error.message]
        });
      }

      res.status(500).json({
        status: 'error',
        message: 'Failed to delete user',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * POST /api/admin/courses
 * Create new course
 * Admin only
 */
router.post(
  '/courses',
  [
    body('slug')
      .trim()
      .notEmpty()
      .withMessage('Slug is required')
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .withMessage('Slug must be lowercase alphanumeric with hyphens'),
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Title is required'),
    body('description')
      .trim()
      .notEmpty()
      .withMessage('Description is required'),
    body('level')
      .optional()
      .isIn(['beginner', 'intermediate', 'advanced'])
      .withMessage('Level must be beginner, intermediate, or advanced'),
    body('duration')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Duration must be a non-negative integer'),
    body('price')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Price must be a non-negative integer'),
    body('isPaid')
      .optional()
      .isBoolean()
      .withMessage('isPaid must be a boolean'),
    body('paymentMethods')
      .optional()
      .isArray()
      .withMessage('paymentMethods must be an array'),
    body('paymentMethods.*')
      .optional()
      .trim()
      .toLowerCase()
      .isIn(PAYMENT_METHOD_VALUES)
      .withMessage(`Each payment method must be one of: ${PAYMENT_METHOD_VALUES.join(', ')}`)
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

      const courseData = req.body;

      const course = await AdminService.createCourse(courseData);

      res.status(201).json({
        status: 'success',
        message: 'Course created successfully',
        data: { course }
      });
    } catch (error) {
      // Handle validation errors from Mongoose
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: Object.values(error.errors).map(err => err.message)
        });
      }

      // Handle duplicate key error
      if (error.code === 11000) {
        return res.status(400).json({
          status: 'error',
          message: 'Course with this slug already exists',
          errors: ['Duplicate slug']
        });
      }

      res.status(500).json({
        status: 'error',
        message: 'Failed to create course',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * PUT /api/admin/courses/:id
 * Update course
 * Admin only
 */
router.put(
  '/courses/:id',
  [
    param('id')
      .trim()
      .notEmpty()
      .withMessage('Course ID is required')
      .isMongoId()
      .withMessage('Invalid course ID format'),
    body('slug')
      .optional()
      .trim()
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .withMessage('Slug must be lowercase alphanumeric with hyphens'),
    body('title')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Title cannot be empty'),
    body('description')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Description cannot be empty'),
    body('level')
      .optional()
      .isIn(['beginner', 'intermediate', 'advanced'])
      .withMessage('Level must be beginner, intermediate, or advanced'),
    body('duration')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Duration must be a non-negative integer'),
    body('price')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Price must be a non-negative integer'),
    body('isPaid')
      .optional()
      .isBoolean()
      .withMessage('isPaid must be a boolean'),
    body('paymentMethods')
      .optional()
      .isArray()
      .withMessage('paymentMethods must be an array'),
    body('paymentMethods.*')
      .optional()
      .trim()
      .toLowerCase()
      .isIn(PAYMENT_METHOD_VALUES)
      .withMessage(`Each payment method must be one of: ${PAYMENT_METHOD_VALUES.join(', ')}`)
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

      const { id } = req.params;
      const updates = req.body;

      const course = await AdminService.updateCourse(id, updates);

      res.status(200).json({
        status: 'success',
        message: 'Course updated successfully',
        data: { course }
      });
    } catch (error) {
      // Handle specific errors
      if (error.name === 'CourseNotFoundError') {
        return res.status(404).json({
          status: 'error',
          message: error.message,
          errors: [error.message]
        });
      }

      if (error.name === 'ValidationError') {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: Object.values(error.errors).map(err => err.message)
        });
      }

      // Handle duplicate key error
      if (error.code === 11000) {
        return res.status(400).json({
          status: 'error',
          message: 'Course with this slug already exists',
          errors: ['Duplicate slug']
        });
      }

      res.status(500).json({
        status: 'error',
        message: 'Failed to update course',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * DELETE /api/admin/courses/:id
 * Delete course
 * Admin only
 */
router.delete(
  '/courses/:id',
  [
    param('id')
      .trim()
      .notEmpty()
      .withMessage('Course ID is required')
      .isMongoId()
      .withMessage('Invalid course ID format')
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

      const { id } = req.params;

      const result = await AdminService.deleteCourse(id);

      res.status(200).json({
        status: 'success',
        message: 'Course deleted successfully',
        data: result
      });
    } catch (error) {
      // Handle specific errors
      if (error.name === 'CourseNotFoundError') {
        return res.status(404).json({
          status: 'error',
          message: error.message,
          errors: [error.message]
        });
      }

      res.status(500).json({
        status: 'error',
        message: 'Failed to delete course',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

module.exports = router;
