const express = require('express');
const { param, query, validationResult } = require('express-validator');
const ContentService = require('../services/ContentService');

const router = express.Router();

/**
 * GET /api/subjects/:slug
 * Get subject by slug with topic list
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

      // Get subject with topic list
      const subject = await ContentService.getSubjectBySlug(slug, lang);

      res.status(200).json({
        status: 'success',
        message: 'Subject retrieved successfully',
        data: { subject }
      });
    } catch (error) {
      // Handle subject not found
      if (error.name === 'SubjectNotFoundError') {
        return res.status(404).json({
          status: 'error',
          message: error.message,
          errors: [error.message]
        });
      }

      // Generic error
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve subject',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * GET /api/subjects
 * Get all subjects with optional year filtering
 * Public route
 */
router.get(
  '/',
  [
    query('year')
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage('Year must be between 1 and 5')
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

      const { year, lang = 'en' } = req.query;

      // Get subjects with optional year filter and language
      const subjects = await ContentService.getSubjects({ year }, lang);

      res.status(200).json({
        status: 'success',
        message: 'Subjects retrieved successfully',
        data: { subjects }
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
        message: 'Failed to retrieve subjects',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

module.exports = router;
