const express = require('express');
const { body, query, validationResult } = require('express-validator');
const ProgressService = require('../services/ProgressService');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/progress/complete
 * Mark topic as complete
 * Protected route - requires authentication
 */
router.post(
  '/complete',
  [
    authenticate,
    body('topicSlug')
      .trim()
      .notEmpty()
      .withMessage('Topic slug is required')
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .withMessage('Invalid topic slug format'),
    body('timeSpent')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Time spent must be a non-negative integer')
      .toInt()
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

      const { topicSlug, timeSpent } = req.body;

      // Mark topic as complete using ProgressService
      const progress = await ProgressService.markComplete(
        req.user.userId,
        topicSlug,
        timeSpent
      );

      res.status(200).json({
        status: 'success',
        message: 'Topic marked as complete',
        data: { progress }
      });
    } catch (error) {
      // Handle validation errors
      if (error.name === 'ValidationError') {
        return res.status(error.statusCode || 400).json({
          status: 'error',
          message: error.message,
          errors: [error.message]
        });
      }

      // Generic error
      res.status(500).json({
        status: 'error',
        message: 'Failed to mark topic as complete',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * GET /api/progress/me
 * Get user's progress statistics
 * Protected route - requires authentication
 */
router.get(
  '/me',
  [
    authenticate,
    query('subjectSlug')
      .optional()
      .trim()
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .withMessage('Invalid subject slug format')
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

      const { subjectSlug } = req.query;

      // Get progress statistics using ProgressService
      const progress = await ProgressService.getProgress(
        req.user.userId,
        { subjectSlug }
      );

      res.status(200).json({
        status: 'success',
        message: 'Progress retrieved successfully',
        data: { progress }
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
        message: 'Failed to retrieve progress',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * GET /api/progress/streak
 * Get user's study streak
 * Protected route - requires authentication
 */
router.get('/streak', authenticate, async (req, res) => {
  try {
    // Get streak statistics using ProgressService
    const streak = await ProgressService.getStreak(req.user.userId);

    res.status(200).json({
      status: 'success',
      message: 'Streak retrieved successfully',
      data: { streak }
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
      message: 'Failed to retrieve streak',
      errors: ['An unexpected error occurred']
    });
  }
});

module.exports = router;
