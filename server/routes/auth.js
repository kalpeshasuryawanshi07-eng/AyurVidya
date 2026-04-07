const express = require('express');
const { body, validationResult } = require('express-validator');
const AuthService = require('../services/AuthService');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post(
  '/register',
  [
    body('name').trim().notEmpty().isLength({ min: 2, max: 100 }),
    body('email').trim().notEmpty().isEmail().normalizeEmail(),
    body('password').notEmpty().isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'error', errors: errors.array().map(err => err.msg) });
      }
      const { name, email, password } = req.body;
      const result = await AuthService.register(name, email, password);
      res.status(201).json({ status: 'success', message: result.message, data: result.user });
    } catch (error) {
      res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
    }
  }
);

/**
 * POST /api/auth/login
 * Login user
 */
router.post(
  '/login',
  [
    body('email').trim().notEmpty().isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'error', errors: errors.array().map(err => err.msg) });
      }
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.status(200).json({ status: 'success', message: 'Login successful', data: result });
    } catch (error) {
      res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
    }
  }
);

/**
 * GET /api/auth/me
 */
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await AuthService.getProfile(req.user.userId);
    res.status(200).json({ status: 'success', data: { user } });
  } catch (error) {
    res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
  }
});

/**
 * PATCH /api/auth/profile
 */
router.patch(
  '/profile',
  [
    authenticate,
    body('name').optional().trim().isLength({ min: 2, max: 100 }),
    body('preferredLang').optional().isIn(['en', 'mr'])
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'error', errors: errors.array().map(err => err.msg) });
      }
      const user = await AuthService.updateProfile(req.user.userId, req.body);
      res.status(200).json({ status: 'success', data: { user } });
    } catch (error) {
      res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
    }
  }
);

// Email verification / OTP routes REMOVED

/**
 * POST /api/auth/forgot-password
 */
router.post(
  '/forgot-password',
  [body('email').trim().isEmail()],
  async (req, res) => {
    try {
      await AuthService.forgotPassword(req.body.email);
      res.status(200).json({ status: 'success', message: 'Reset email sent if account exists.' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Request failed.' });
    }
  }
);

/**
 * POST /api/auth/reset-password
 */
router.post(
  '/reset-password',
  [
    body('token').notEmpty(),
    body('password').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      await AuthService.resetPassword(req.body.token, req.body.password);
      res.status(200).json({ status: 'success', message: 'Password reset successful.' });
    } catch (error) {
      res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
    }
  }
);

module.exports = router;
