const express = require('express');
const { body, validationResult } = require('express-validator');
const AuthService = require('../services/AuthService');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new user
 * Public route
 */
router.post(
  '/register',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
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

      const { name, email, password } = req.body;

      // Register user using AuthService
      const result = await AuthService.register(name, email, password);

      res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: result
      });
    } catch (error) {
      // Handle specific errors
      if (error.name === 'DuplicateEmailError') {
        return res.status(400).json({
          status: 'error',
          message: error.message,
          errors: [error.message]
        });
      }

      // Handle validation errors from Mongoose
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: Object.values(error.errors).map(err => err.message)
        });
      }

      // Generic error
      res.status(500).json({
        status: 'error',
        message: 'Registration failed',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * POST /api/auth/login
 * Login user and return JWT token
 * Public route
 */
router.post(
  '/login',
  [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
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

      const { email, password } = req.body;

      // Login user using AuthService
      const result = await AuthService.login(email, password);

      res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: result
      });
    } catch (error) {
      // Handle invalid credentials
      if (error.name === 'InvalidCredentialsError') {
        return res.status(401).json({
          status: 'error',
          message: error.message,
          errors: [error.message]
        });
      }

      // Handle unverified email
      if (error.name === 'EmailNotVerifiedError') {
        return res.status(403).json({
          status: 'error',
          message: error.message,
          errors: [error.message]
        });
      }

      // Generic error
      res.status(500).json({
        status: 'error',
        message: 'Login failed',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * GET /api/auth/me
 * Get current user profile
 * Protected route - requires authentication
 */
router.get('/me', authenticate, async (req, res) => {
  try {
    // Get user profile using userId from authenticate middleware
    const user = await AuthService.getProfile(req.user.userId);

    res.status(200).json({
      status: 'success',
      message: 'Profile retrieved successfully',
      data: { user }
    });
  } catch (error) {
    // Handle user not found
    if (error.name === 'UserNotFoundError') {
      return res.status(404).json({
        status: 'error',
        message: error.message,
        errors: [error.message]
      });
    }

    // Generic error
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve profile',
      errors: ['An unexpected error occurred']
    });
  }
});

/**
 * PATCH /api/auth/profile
 * Update user profile
 * Protected route - requires authentication
 */
router.patch(
  '/profile',
  [
    authenticate,
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters'),
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

      const { name, preferredLang } = req.body;

      // Update profile using AuthService
      const user = await AuthService.updateProfile(req.user.userId, {
        name,
        preferredLang
      });

      res.status(200).json({
        status: 'success',
        message: 'Profile updated successfully',
        data: { user }
      });
    } catch (error) {
      // Handle user not found
      if (error.name === 'UserNotFoundError') {
        return res.status(404).json({
          status: 'error',
          message: error.message,
          errors: [error.message]
        });
      }

      // Handle validation errors
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          status: 'error',
          message: error.message,
          errors: [error.message]
        });
      }

      // Generic error
      res.status(500).json({
        status: 'error',
        message: 'Failed to update profile',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * POST /api/auth/verify-email
 * Verify user email using token
 */
router.post('/verify-email', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ status: 'error', message: 'Token is required' });
    }

    await AuthService.verifyEmail(token);

    res.status(200).json({
      status: 'success',
      message: 'Email verified successfully'
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message || 'Verification failed'
    });
  }
});

/**
 * POST /api/auth/resend-otp
 * Resend verification OTP
 */
router.post('/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ status: 'error', message: 'Email is required' });
    }

    await AuthService.resendVerificationOtp(email);

    res.status(200).json({
      status: 'success',
      message: 'A new OTP has been sent to your email.'
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message || 'Failed to resend OTP'
    });
  }
});

/**
 * POST /api/auth/forgot-password
 * Request password reset email
 */
router.post(
  '/forgot-password',
  [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please provide a valid email address')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'error', errors: errors.array().map(err => err.msg) });
      }

      await AuthService.forgotPassword(req.body.email);

      res.status(200).json({
        status: 'success',
        message: 'If an account exists with that email, a reset link has been sent.'
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Failed to process request' });
    }
  }
);

/**
 * POST /api/auth/reset-password
 * Reset password using token
 */
router.post(
  '/reset-password',
  [
    body('token').notEmpty().withMessage('Token is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'error', errors: errors.array().map(err => err.msg) });
      }

      await AuthService.resetPassword(req.body.token, req.body.password);

      res.status(200).json({
        status: 'success',
        message: 'Password reset successful. You can now login with your new password.'
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message || 'Reset failed'
      });
    }
  }
);

module.exports = router;
