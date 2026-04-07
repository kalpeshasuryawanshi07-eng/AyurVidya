const express = require('express');
const { param, query, validationResult } = require('express-validator');
const Herb = require('../models/Herb');
const LanguageService = require('../services/LanguageService');

const router = express.Router();

/**
 * GET /api/herbs/:slug
 * Get herb details by slug with language support
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

      // Find herb by slug
      const herb = await Herb.findOne({ slug }).lean();

      if (!herb) {
        return res.status(404).json({
          status: 'error',
          message: 'Herb not found',
          errors: ['Herb not found']
        });
      }

      // Apply language selection
      const localizedHerb = LanguageService.selectContent(herb, lang);

      res.status(200).json({
        status: 'success',
        message: 'Herb retrieved successfully',
        data: { herb: localizedHerb }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve herb',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * GET /api/herbs
 * Get list of herbs with filtering, searching, and pagination
 * Public route
 */
router.get(
  '/',
  [
    query('category')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Category cannot be empty'),
    query('search')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Search query cannot be empty'),
    query('lang')
      .optional()
      .isIn(['en', 'mr'])
      .withMessage('Language must be either "en" or "mr"'),
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer')
      .toInt(),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100')
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

      const { category, search, lang = 'en', page = 1, limit = 20 } = req.query;

      // Build query
      const query = {};
      
      if (category) {
        query.category = category;
      }

      if (search) {
        // Use text search on indexed fields
        query.$text = { $search: search };
      }

      // Calculate pagination
      const skip = (page - 1) * limit;

      // Execute query with pagination
      const herbs = await Herb.find(query)
        .skip(skip)
        .limit(limit)
        .lean();

      // Get total count for pagination
      const total = await Herb.countDocuments(query);

      // Apply language selection to all herbs
      const localizedHerbs = herbs.map(herb => 
        LanguageService.selectContent(herb, lang)
      );

      res.status(200).json({
        status: 'success',
        message: 'Herbs retrieved successfully',
        data: {
          herbs: localizedHerbs,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve herbs',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

module.exports = router;
