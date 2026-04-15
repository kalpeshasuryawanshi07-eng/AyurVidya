const express = require('express');
const { body, param, validationResult } = require('express-validator');
const Note = require('../models/Note');
const Topic = require('../models/Topic');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/notes
 * Save or update a note for a topic
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
      .withMessage('Invalid topic slug format'),
    body('content')
      .trim()
      .notEmpty()
      .withMessage('Note content is required')
      .isLength({ max: 10000 })
      .withMessage('Note content cannot exceed 10000 characters')
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

      const { topicSlug, content } = req.body;

      // Check if topic exists
      const topic = await Topic.findOne({ slug: topicSlug });
      if (!topic) {
        return res.status(404).json({
          status: 'error',
          message: 'Topic not found',
          errors: ['Topic with this slug does not exist']
        });
      }

      // Create or update note
      const note = await Note.findOneAndUpdate(
        {
          userId: req.user.userId,
          topicSlug
        },
        {
          userId: req.user.userId,
          topicSlug,
          content,
          updatedAt: Date.now()
        },
        {
          new: true,
          upsert: true,
          runValidators: true
        }
      );

      res.status(200).json({
        status: 'success',
        message: 'Note saved successfully',
        data: { note }
      });
    } catch (error) {
      // Generic error
      res.status(500).json({
        status: 'error',
        message: 'Failed to save note',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * GET /api/notes/:topicSlug
 * Retrieve note for a specific topic
 * Protected route - requires authentication
 */
router.get(
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

      // Find note
      const note = await Note.findOne({
        userId: req.user.userId,
        topicSlug
      }).lean();

      if (!note) {
        return res.status(404).json({
          status: 'error',
          message: 'Note not found',
          errors: ['No note found for this topic']
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Note retrieved successfully',
        data: { note }
      });
    } catch (error) {
      // Generic error
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve note',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * GET /api/notes
 * List all user notes
 * Protected route - requires authentication
 */
router.get(
  '/',
  [authenticate],
  async (req, res) => {
    try {
      // Get all notes for user
      const notes = await Note.find({ userId: req.user.userId })
        .sort({ updatedAt: -1 })
        .lean();

      // Populate topic metadata
      const topicSlugs = notes.map(n => n.topicSlug);
      const topics = await Topic.find({ slug: { $in: topicSlugs } })
        .select('slug title titleMr subjectSlug difficulty estimatedMins')
        .lean();

      // Create topic lookup map
      const topicMap = {};
      topics.forEach(topic => {
        topicMap[topic.slug] = topic;
      });

      // Merge note and topic data
      const notesWithTopics = notes.map(note => ({
        _id: note._id,
        userId: note.userId,
        topicSlug: note.topicSlug,
        content: note.content,
        updatedAt: note.updatedAt,
        createdAt: note.createdAt,
        topic: topicMap[note.topicSlug] || null
      }));

      res.status(200).json({
        status: 'success',
        message: 'Notes retrieved successfully',
        data: {
          notes: notesWithTopics,
          total: notes.length
        }
      });
    } catch (error) {
      // Generic error
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve notes',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

module.exports = router;
