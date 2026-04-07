const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const Bookmark = require('../models/Bookmark');
const Topic = require('../models/Topic');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/bookmarks
 * Add a bookmark
 * Protected route - requires authentication
 */
router.post(
  '/',
  [
    authenticate,
    body('topicSlug')
      .trim()
      .notEmpty()
      .withMessage('Topic slug is required')
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .withMessage('Invalid topic slug format')
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

      const { topicSlug } = req.body;

      // Check if topic exists
      const topic = await Topic.findOne({ slug: topicSlug });
      if (!topic) {
        return res.status(404).json({
          status: 'error',
          message: 'Topic not found',
          errors: ['Topic with this slug does not exist']
        });
      }

      // Check if bookmark already exists
      const existingBookmark = await Bookmark.findOne({
        userId: req.user.userId,
        topicSlug
      });

      if (existingBookmark) {
        return res.status(400).json({
          status: 'error',
          message: 'Bookmark already exists',
          errors: ['This topic is already bookmarked']
        });
      }

      // Create bookmark
      const bookmark = await Bookmark.create({
        userId: req.user.userId,
        topicSlug
      });

      res.status(201).json({
        status: 'success',
        message: 'Bookmark added successfully',
        data: { bookmark }
      });
    } catch (error) {
      // Handle duplicate key error (race condition)
      if (error.code === 11000) {
        return res.status(400).json({
          status: 'error',
          message: 'Bookmark already exists',
          errors: ['This topic is already bookmarked']
        });
      }

      // Generic error
      res.status(500).json({
        status: 'error',
        message: 'Failed to add bookmark',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * DELETE /api/bookmarks/:topicSlug
 * Remove a bookmark
 * Protected route - requires authentication
 */
router.delete(
  '/:topicSlug',
  [
    authenticate,
    param('topicSlug')
      .trim()
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .withMessage('Invalid topic slug format')
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

      const { topicSlug } = req.params;

      // Delete bookmark
      const result = await Bookmark.deleteOne({
        userId: req.user.userId,
        topicSlug
      });

      if (result.deletedCount === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'Bookmark not found',
          errors: ['No bookmark found for this topic']
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Bookmark removed successfully',
        data: { deleted: true }
      });
    } catch (error) {
      // Generic error
      res.status(500).json({
        status: 'error',
        message: 'Failed to remove bookmark',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * GET /api/bookmarks
 * Get user's bookmarks with pagination
 * Protected route - requires authentication
 */
router.get(
  '/',
  [
    authenticate,
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer')
      .toInt(),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 250 })
      .withMessage('Limit must be between 1 and 250')
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

      const page = req.query.page || 1;
      const limit = req.query.limit || 20;
      const skip = (page - 1) * limit;

      // Get bookmarks with pagination
      const bookmarks = await Bookmark.find({ userId: req.user.userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

      // Get total count
      const total = await Bookmark.countDocuments({ userId: req.user.userId });

      // Populate topic metadata
      const topicSlugs = bookmarks.map(b => b.topicSlug);
      const topics = await Topic.find({ slug: { $in: topicSlugs } })
        .select('slug title titleMr subjectSlug difficulty estimatedMins')
        .lean();

      // Create topic lookup map
      const topicMap = {};
      topics.forEach(topic => {
        topicMap[topic.slug] = topic;
      });

      // Merge bookmark and topic data
      const bookmarksWithTopics = bookmarks.map(bookmark => ({
        _id: bookmark._id,
        userId: bookmark.userId,
        topicSlug: bookmark.topicSlug,
        createdAt: bookmark.createdAt,
        topic: topicMap[bookmark.topicSlug] || null
      }));

      res.status(200).json({
        status: 'success',
        message: 'Bookmarks retrieved successfully',
        data: {
          bookmarks: bookmarksWithTopics,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        }
      });
    } catch (error) {
      // Generic error
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve bookmarks',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

module.exports = router;
