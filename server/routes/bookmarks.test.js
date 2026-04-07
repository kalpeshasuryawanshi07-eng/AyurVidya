const request = require('supertest');
const express = require('express');
const bookmarkRoutes = require('./bookmarks');
const Bookmark = require('../models/Bookmark');
const Topic = require('../models/Topic');
const { authenticate } = require('../middleware/auth');

// Mock dependencies
jest.mock('../models/Bookmark');
jest.mock('../models/Topic');
jest.mock('../middleware/auth');

describe('Bookmark Routes', () => {
  let app;

  beforeEach(() => {
    // Create Express app for testing
    app = express();
    app.use(express.json());
    app.use('/api/bookmarks', bookmarkRoutes);

    // Clear all mocks
    jest.clearAllMocks();

    // Mock authenticate middleware to pass through
    authenticate.mockImplementation((req, res, next) => {
      req.user = { userId: 'user123', role: 'student' };
      next();
    });
  });

  describe('POST /api/bookmarks', () => {
    it('should add bookmark with valid data', async () => {
      const mockTopic = {
        _id: 'topic123',
        slug: 'introduction-to-ayurveda',
        title: 'Introduction to Ayurveda',
        subjectSlug: 'ayurveda-basics'
      };

      const mockBookmark = {
        _id: 'bookmark123',
        userId: 'user123',
        topicSlug: 'introduction-to-ayurveda',
        createdAt: new Date('2024-01-15T10:00:00Z')
      };

      Topic.findOne.mockResolvedValue(mockTopic);
      Bookmark.findOne.mockResolvedValue(null);
      Bookmark.create.mockResolvedValue(mockBookmark);

      const response = await request(app)
        .post('/api/bookmarks')
        .set('Authorization', 'Bearer mock-token')
        .send({
          topicSlug: 'introduction-to-ayurveda'
        });

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Bookmark added successfully');
      expect(response.body.data.bookmark._id).toBe('bookmark123');
      expect(response.body.data.bookmark.topicSlug).toBe('introduction-to-ayurveda');
      expect(Topic.findOne).toHaveBeenCalledWith({ slug: 'introduction-to-ayurveda' });
      expect(Bookmark.findOne).toHaveBeenCalledWith({
        userId: 'user123',
        topicSlug: 'introduction-to-ayurveda'
      });
      expect(Bookmark.create).toHaveBeenCalledWith({
        userId: 'user123',
        topicSlug: 'introduction-to-ayurveda'
      });
    });

    it('should return 400 when topicSlug is missing', async () => {
      const response = await request(app)
        .post('/api/bookmarks')
        .set('Authorization', 'Bearer mock-token')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Topic slug is required');
    });

    it('should return 400 when topicSlug format is invalid', async () => {
      const response = await request(app)
        .post('/api/bookmarks')
        .set('Authorization', 'Bearer mock-token')
        .send({
          topicSlug: 'Invalid_Slug!'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Invalid topic slug format');
    });

    it('should return 404 when topic does not exist', async () => {
      Topic.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/api/bookmarks')
        .set('Authorization', 'Bearer mock-token')
        .send({
          topicSlug: 'non-existent-topic'
        });

      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Topic not found');
      expect(response.body.errors).toContain('Topic with this slug does not exist');
    });

    it('should return 400 when bookmark already exists', async () => {
      const mockTopic = {
        _id: 'topic123',
        slug: 'introduction-to-ayurveda',
        title: 'Introduction to Ayurveda'
      };

      const existingBookmark = {
        _id: 'bookmark123',
        userId: 'user123',
        topicSlug: 'introduction-to-ayurveda',
        createdAt: new Date('2024-01-10T10:00:00Z')
      };

      Topic.findOne.mockResolvedValue(mockTopic);
      Bookmark.findOne.mockResolvedValue(existingBookmark);

      const response = await request(app)
        .post('/api/bookmarks')
        .set('Authorization', 'Bearer mock-token')
        .send({
          topicSlug: 'introduction-to-ayurveda'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Bookmark already exists');
      expect(response.body.errors).toContain('This topic is already bookmarked');
    });

    it('should handle duplicate key error from database', async () => {
      const mockTopic = {
        _id: 'topic123',
        slug: 'introduction-to-ayurveda',
        title: 'Introduction to Ayurveda'
      };

      Topic.findOne.mockResolvedValue(mockTopic);
      Bookmark.findOne.mockResolvedValue(null);
      
      const duplicateError = new Error('Duplicate key');
      duplicateError.code = 11000;
      Bookmark.create.mockRejectedValue(duplicateError);

      const response = await request(app)
        .post('/api/bookmarks')
        .set('Authorization', 'Bearer mock-token')
        .send({
          topicSlug: 'introduction-to-ayurveda'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Bookmark already exists');
    });

    it('should handle database errors', async () => {
      const mockTopic = {
        _id: 'topic123',
        slug: 'introduction-to-ayurveda',
        title: 'Introduction to Ayurveda'
      };

      Topic.findOne.mockResolvedValue(mockTopic);
      Bookmark.findOne.mockResolvedValue(null);
      Bookmark.create.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/api/bookmarks')
        .set('Authorization', 'Bearer mock-token')
        .send({
          topicSlug: 'introduction-to-ayurveda'
        });

      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Failed to add bookmark');
    });
  });

  describe('DELETE /api/bookmarks/:topicSlug', () => {
    it('should remove bookmark successfully', async () => {
      Bookmark.deleteOne.mockResolvedValue({ deletedCount: 1 });

      const response = await request(app)
        .delete('/api/bookmarks/introduction-to-ayurveda')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Bookmark removed successfully');
      expect(response.body.data.deleted).toBe(true);
      expect(Bookmark.deleteOne).toHaveBeenCalledWith({
        userId: 'user123',
        topicSlug: 'introduction-to-ayurveda'
      });
    });

    it('should return 404 when bookmark does not exist', async () => {
      Bookmark.deleteOne.mockResolvedValue({ deletedCount: 0 });

      const response = await request(app)
        .delete('/api/bookmarks/non-existent-topic')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Bookmark not found');
      expect(response.body.errors).toContain('No bookmark found for this topic');
    });

    it('should return 400 when topicSlug format is invalid', async () => {
      const response = await request(app)
        .delete('/api/bookmarks/Invalid_Slug!')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Invalid topic slug format');
    });

    it('should handle database errors', async () => {
      Bookmark.deleteOne.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .delete('/api/bookmarks/introduction-to-ayurveda')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Failed to remove bookmark');
    });
  });

  describe('GET /api/bookmarks', () => {
    it('should return bookmarks with topic metadata', async () => {
      const mockBookmarks = [
        {
          _id: 'bookmark1',
          userId: 'user123',
          topicSlug: 'introduction-to-ayurveda',
          createdAt: new Date('2024-01-15T10:00:00Z')
        },
        {
          _id: 'bookmark2',
          userId: 'user123',
          topicSlug: 'vata-dosha',
          createdAt: new Date('2024-01-14T10:00:00Z')
        }
      ];

      const mockTopics = [
        {
          slug: 'introduction-to-ayurveda',
          title: 'Introduction to Ayurveda',
          titleMr: 'आयुर्वेदाचा परिचय',
          subjectSlug: 'ayurveda-basics',
          difficulty: 'beginner',
          estimatedMins: 30
        },
        {
          slug: 'vata-dosha',
          title: 'Vata Dosha',
          titleMr: 'वात दोष',
          subjectSlug: 'ayurveda-basics',
          difficulty: 'intermediate',
          estimatedMins: 45
        }
      ];

      const mockFind = {
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockBookmarks)
      };

      const mockTopicFind = {
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockTopics)
      };

      Bookmark.find.mockReturnValue(mockFind);
      Bookmark.countDocuments.mockResolvedValue(2);
      Topic.find.mockReturnValue(mockTopicFind);

      const response = await request(app)
        .get('/api/bookmarks')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.bookmarks).toHaveLength(2);
      expect(response.body.data.bookmarks[0].topicSlug).toBe('introduction-to-ayurveda');
      expect(response.body.data.bookmarks[0].topic.title).toBe('Introduction to Ayurveda');
      expect(response.body.data.bookmarks[1].topicSlug).toBe('vata-dosha');
      expect(response.body.data.bookmarks[1].topic.title).toBe('Vata Dosha');
      expect(response.body.data.pagination).toEqual({
        page: 1,
        limit: 20,
        total: 2,
        totalPages: 1
      });
    });

    it('should support pagination with page and limit', async () => {
      const mockBookmarks = [
        {
          _id: 'bookmark3',
          userId: 'user123',
          topicSlug: 'pitta-dosha',
          createdAt: new Date('2024-01-13T10:00:00Z')
        }
      ];

      const mockTopics = [
        {
          slug: 'pitta-dosha',
          title: 'Pitta Dosha',
          titleMr: 'पित्त दोष',
          subjectSlug: 'ayurveda-basics',
          difficulty: 'intermediate',
          estimatedMins: 40
        }
      ];

      const mockFind = {
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockBookmarks)
      };

      const mockTopicFind = {
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockTopics)
      };

      Bookmark.find.mockReturnValue(mockFind);
      Bookmark.countDocuments.mockResolvedValue(25);
      Topic.find.mockReturnValue(mockTopicFind);

      const response = await request(app)
        .get('/api/bookmarks?page=2&limit=10')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(200);
      expect(response.body.data.pagination).toEqual({
        page: 2,
        limit: 10,
        total: 25,
        totalPages: 3
      });
      expect(mockFind.skip).toHaveBeenCalledWith(10);
      expect(mockFind.limit).toHaveBeenCalledWith(10);
    });

    it('should return empty array when user has no bookmarks', async () => {
      const mockFind = {
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      };

      const mockTopicFind = {
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      };

      Bookmark.find.mockReturnValue(mockFind);
      Bookmark.countDocuments.mockResolvedValue(0);
      Topic.find.mockReturnValue(mockTopicFind);

      const response = await request(app)
        .get('/api/bookmarks')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(200);
      expect(response.body.data.bookmarks).toEqual([]);
      expect(response.body.data.pagination.total).toBe(0);
    });

    it('should handle missing topic metadata gracefully', async () => {
      const mockBookmarks = [
        {
          _id: 'bookmark1',
          userId: 'user123',
          topicSlug: 'deleted-topic',
          createdAt: new Date('2024-01-15T10:00:00Z')
        }
      ];

      const mockFind = {
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockBookmarks)
      };

      const mockTopicFind = {
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      };

      Bookmark.find.mockReturnValue(mockFind);
      Bookmark.countDocuments.mockResolvedValue(1);
      Topic.find.mockReturnValue(mockTopicFind);

      const response = await request(app)
        .get('/api/bookmarks')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(200);
      expect(response.body.data.bookmarks[0].topic).toBeNull();
    });

    it('should return 400 when page is invalid', async () => {
      const response = await request(app)
        .get('/api/bookmarks?page=0')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Page must be a positive integer');
    });

    it('should return 400 when limit exceeds maximum', async () => {
      const response = await request(app)
        .get('/api/bookmarks?limit=150')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Limit must be between 1 and 100');
    });

    it('should handle database errors', async () => {
      Bookmark.find.mockImplementation(() => {
        throw new Error('Database error');
      });

      const response = await request(app)
        .get('/api/bookmarks')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Failed to retrieve bookmarks');
    });
  });

  describe('Authentication', () => {
    it('should require authentication for POST /api/bookmarks', async () => {
      authenticate.mockImplementation((req, res) => {
        return res.status(401).json({
          status: 'error',
          message: 'No token provided',
          errors: ['Authorization header must be in format: Bearer <token>']
        });
      });

      const response = await request(app)
        .post('/api/bookmarks')
        .send({
          topicSlug: 'introduction-to-ayurveda'
        });

      expect(response.status).toBe(401);
      expect(response.body.status).toBe('error');
    });

    it('should require authentication for DELETE /api/bookmarks/:topicSlug', async () => {
      authenticate.mockImplementation((req, res) => {
        return res.status(401).json({
          status: 'error',
          message: 'No token provided',
          errors: ['Authorization header must be in format: Bearer <token>']
        });
      });

      const response = await request(app)
        .delete('/api/bookmarks/introduction-to-ayurveda');

      expect(response.status).toBe(401);
      expect(response.body.status).toBe('error');
    });

    it('should require authentication for GET /api/bookmarks', async () => {
      authenticate.mockImplementation((req, res) => {
        return res.status(401).json({
          status: 'error',
          message: 'No token provided',
          errors: ['Authorization header must be in format: Bearer <token>']
        });
      });

      const response = await request(app)
        .get('/api/bookmarks');

      expect(response.status).toBe(401);
      expect(response.body.status).toBe('error');
    });
  });
});
