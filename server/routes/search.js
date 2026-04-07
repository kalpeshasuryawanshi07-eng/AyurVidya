const express = require('express');
const { query, validationResult } = require('express-validator');
const Topic = require('../models/Topic');
const Herb = require('../models/Herb');
const LanguageService = require('../services/LanguageService');

const router = express.Router();

/**
 * GET /api/search
 * Search across topics and herbs
 * Public route
 */
router.get(
  '/',
  [
    query('q')
      .trim()
      .notEmpty()
      .withMessage('Search query cannot be empty')
      .isLength({ max: 100 })
      .withMessage('Search query must not exceed 100 characters'),
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

      const { q, lang = 'en', page = 1, limit = 20 } = req.query;
      const skip = (page - 1) * limit;

      // Search topics using text index
      const topicsPromise = Topic.find(
        { $text: { $search: q } },
        { score: { $meta: 'textScore' } }
      )
        .sort({ score: { $meta: 'textScore' } })
        .skip(skip)
        .limit(limit)
        .lean();

      // Search herbs using text index
      const herbsPromise = Herb.find(
        { $text: { $search: q } },
        { score: { $meta: 'textScore' } }
      )
        .sort({ score: { $meta: 'textScore' } })
        .skip(skip)
        .limit(limit)
        .lean();

      // Count total results
      const topicsCountPromise = Topic.countDocuments({ $text: { $search: q } });
      const herbsCountPromise = Herb.countDocuments({ $text: { $search: q } });

      // Execute all queries in parallel
      const [topics, herbs, topicsCount, herbsCount] = await Promise.all([
        topicsPromise,
        herbsPromise,
        topicsCountPromise,
        herbsCountPromise
      ]);

      // Apply language selection
      const localizedTopics = topics.map(topic => 
        LanguageService.selectContent(topic, lang)
      );
      const localizedHerbs = herbs.map(herb => 
        LanguageService.selectContent(herb, lang)
      );

      // Calculate pagination
      const totalResults = topicsCount + herbsCount;
      const totalPages = Math.ceil(totalResults / limit);

      res.status(200).json({
        status: 'success',
        message: 'Search completed successfully',
        data: {
          topics: localizedTopics,
          herbs: localizedHerbs,
          pagination: {
            total: totalResults,
            page,
            limit,
            pages: totalPages
          }
        }
      });
    } catch (error) {
      // Generic error
      res.status(500).json({
        status: 'error',
        message: 'Search failed',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

module.exports = router;
