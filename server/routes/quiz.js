const express = require('express');
const { param, body, query, validationResult } = require('express-validator');
const QuizService = require('../services/QuizService');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/topics/:slug/quiz
 * Get quiz questions for a topic
 * Public route - returns questions without correct answers
 */
router.get(
  '/topics/:slug/quiz',
  [
    param('slug')
      .trim()
      .notEmpty()
      .withMessage('Topic slug is required')
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .withMessage('Invalid topic slug format'),
    query('lang')
      .optional()
      .trim()
      .isIn(['en', 'mr'])
      .withMessage('Language must be "en" or "mr"')
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

      const { slug } = req.params;
      const { lang } = req.query;

      // Get quiz questions using QuizService
      const questions = await QuizService.getQuiz(slug, lang);

      res.status(200).json({
        status: 'success',
        message: 'Quiz questions retrieved successfully',
        data: { questions }
      });
    } catch (error) {
      // Handle topic not found
      if (error.name === 'TopicNotFoundError') {
        return res.status(404).json({
          status: 'error',
          message: error.message,
          errors: [error.message]
        });
      }

      // Generic error
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve quiz questions',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * GET /api/topics/:slug/flashcards
 * Get flashcards for a topic
 * Public route
 */
router.get(
  '/topics/:slug/flashcards',
  [
    param('slug')
      .trim()
      .notEmpty()
      .withMessage('Topic slug is required')
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .withMessage('Invalid topic slug format'),
    query('lang')
      .optional()
      .trim()
      .isIn(['en', 'mr'])
      .withMessage('Language must be "en" or "mr"')
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

      const { slug } = req.params;
      const { lang } = req.query;

      // Get flashcards using QuizService
      const flashcards = await QuizService.getFlashcards(slug, lang);

      res.status(200).json({
        status: 'success',
        message: 'Flashcards retrieved successfully',
        data: { flashcards }
      });
    } catch (error) {
      // Handle topic not found
      if (error.name === 'TopicNotFoundError') {
        return res.status(404).json({
          status: 'error',
          message: error.message,
          errors: [error.message]
        });
      }

      // Generic error
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve flashcards',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * POST /api/quiz/submit
 * Submit quiz answers and get results
 * Protected route - requires authentication
 */
router.post(
  '/quiz/submit',
  [
    authenticate,
    body('topicSlug')
      .trim()
      .notEmpty()
      .withMessage('Topic slug is required')
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .withMessage('Invalid topic slug format'),
    body('answers')
      .isArray({ min: 1 })
      .withMessage('Answers must be a non-empty array'),
    body('answers.*.questionId')
      .notEmpty()
      .withMessage('Each answer must have a questionId'),
    body('answers.*.selectedOption')
      .isInt({ min: 0 })
      .withMessage('Each answer must have a valid selectedOption')
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

      const { topicSlug, answers } = req.body;

      // Submit quiz using QuizService
      const result = await QuizService.submitQuiz(
        req.user.userId,
        topicSlug,
        answers
      );

      res.status(200).json({
        status: 'success',
        message: 'Quiz submitted successfully',
        data: { result }
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

      // Handle topic not found
      if (error.name === 'TopicNotFoundError') {
        return res.status(404).json({
          status: 'error',
          message: error.message,
          errors: [error.message]
        });
      }

      // Generic error
      res.status(500).json({
        status: 'error',
        message: 'Failed to submit quiz',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * GET /api/quiz/stats/me
 * Get user's quiz statistics
 * Protected route - requires authentication
 */
router.get('/quiz/stats/me', authenticate, async (req, res) => {
  try {
    // Get quiz statistics using QuizService
    const stats = await QuizService.getStats(req.user.userId);

    res.status(200).json({
      status: 'success',
      message: 'Quiz statistics retrieved successfully',
      data: { stats }
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
      message: 'Failed to retrieve quiz statistics',
      errors: ['An unexpected error occurred']
    });
  }
});

module.exports = router;
