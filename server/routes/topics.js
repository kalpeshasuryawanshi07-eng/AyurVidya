const express = require('express');
const { param, query, validationResult } = require('express-validator');
const ContentService = require('../services/ContentService');

const router = express.Router();

/**
 * GET /api/topics/:slug
 * Get topic by slug with language support
 * Public route
 */
router.get(
  '/:slug',
  [
    param('slug')
      .trim()
      .notEmpty()
      .withMessage('Slug is required')
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .withMessage('Invalid slug format'),
    query('lang')
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

      const { slug } = req.params;
      const { lang = 'en' } = req.query;

      // Get topic with language-specific content
      const topic = await ContentService.getTopicBySlug(slug, lang);

      // Get adjacent topics for navigation
      const navigation = await ContentService.getAdjacentTopics(slug, lang);

      res.status(200).json({
        status: 'success',
        message: 'Topic retrieved successfully',
        data: {
          topic,
          navigation
        }
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
        message: 'Failed to retrieve topic',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * GET /api/topics
 * Get topics with filtering and pagination
 * Public route
 */
router.get(
  '/',
  [
    query('subjectSlug')
      .optional()
      .trim()
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .withMessage('Invalid subject slug format'),
    query('difficulty')
      .optional()
      .isIn(['beginner', 'intermediate', 'advanced'])
      .withMessage('Difficulty must be beginner, intermediate, or advanced'),
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer')
      .toInt(),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100')
      .toInt(),
    query('lang')
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

      const { subjectSlug, difficulty, page = 1, limit = 20, lang = 'en' } = req.query;

      // Get topics with filters, pagination and language
      const result = await ContentService.getTopics(
        { subjectSlug, difficulty },
        { page, limit },
        lang
      );

      res.status(200).json({
        status: 'success',
        message: 'Topics retrieved successfully',
        data: result
      });
    } catch (error) {
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
        message: 'Failed to retrieve topics',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

module.exports = router;
