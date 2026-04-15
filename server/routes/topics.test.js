const request = require('supertest');
const express = require('express');
const topicsRoutes = require('./topics');
const ContentService = require('../services/ContentService');

// Mock dependencies
jest.mock('../services/ContentService');

describe('Topics Routes', () => {
  let app;

  beforeEach(() => {
    // Create Express app for testing
    app = express();
    app.use(express.json());
    app.use('/api/topics', topicsRoutes);

    // Clear all mocks
    jest.clearAllMocks();
  });

  describe('GET /api/topics/:slug', () => {
    it('should return topic with navigation for valid slug', async () => {
      const mockTopic = {
        slug: 'tridosha-theory',
        title: 'Tridosha Theory',
        subjectSlug: 'ayurveda-fundamentals',
        difficulty: 'beginner',
        estimatedMins: 30,
        introduction: 'Introduction to Tridosha...',
        historicalContext: 'Historical context...',
        coreExplanation: 'Core explanation...',
        clinicalApplications: 'Clinical applications...',
        modernComparison: 'Modern comparison...'
      };

      const mockNavigation = {
        previous: { slug: 'intro-to-ayurveda', title: 'Introduction to Ayurveda' },
        next: { slug: 'vata-dosha', title: 'Vata Dosha' }
      };

      ContentService.getTopicBySlug.mockResolvedValue(mockTopic);
      ContentService.getAdjacentTopics.mockResolvedValue(mockNavigation);

      const response = await request(app)
        .get('/api/topics/tridosha-theory');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.topic).toEqual(mockTopic);
      expect(response.body.data.navigation).toEqual(mockNavigation);
      expect(ContentService.getTopicBySlug).toHaveBeenCalledWith('tridosha-theory', 'en');
      expect(ContentService.getAdjacentTopics).toHaveBeenCalledWith('tridosha-theory', 'en');
    });

    it('should return topic with Marathi content when lang=mr', async () => {
      const mockTopic = {
        slug: 'tridosha-theory',
        title: 'त्रिदोष सिद्धांत',
        subjectSlug: 'ayurveda-fundamentals',
        difficulty: 'beginner',
        estimatedMins: 30,
        introduction: 'त्रिदोषाचा परिचय...'
      };

      const mockNavigation = {
        previous: null,
        next: { slug: 'vata-dosha', title: 'वात दोष' }
      };

      ContentService.getTopicBySlug.mockResolvedValue(mockTopic);
      ContentService.getAdjacentTopics.mockResolvedValue(mockNavigation);

      const response = await request(app)
        .get('/api/topics/tridosha-theory?lang=mr');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.topic).toEqual(mockTopic);
      expect(ContentService.getTopicBySlug).toHaveBeenCalledWith('tridosha-theory', 'mr');
    });

    it('should return 400 for invalid slug format', async () => {
      const response = await request(app)
        .get('/api/topics/Invalid_Slug!');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Invalid slug format');
    });

    it('should return 400 for invalid language parameter', async () => {
      const response = await request(app)
        .get('/api/topics/tridosha-theory?lang=fr');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Language must be either "en" or "mr"');
    });

    it('should return 404 when topic not found', async () => {
      const error = new Error('Topic not found');
      error.name = 'TopicNotFoundError';
      ContentService.getTopicBySlug.mockRejectedValue(error);

      const response = await request(app)
        .get('/api/topics/non-existent-topic');

      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Topic not found');
    });

    it('should return 500 for unexpected errors', async () => {
      ContentService.getTopicBySlug.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/api/topics/tridosha-theory');

      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Failed to retrieve topic');
    });
  });

  describe('GET /api/topics', () => {
    it('should return all topics with default pagination', async () => {
      const mockResult = {
        topics: [
          { slug: 'topic-1', title: 'Topic 1' },
          { slug: 'topic-2', title: 'Topic 2' }
        ],
        total: 2,
        page: 1,
        limit: 20
      };

      ContentService.getTopics.mockResolvedValue(mockResult);

      const response = await request(app)
        .get('/api/topics');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data).toEqual(mockResult);
      expect(ContentService.getTopics).toHaveBeenCalledWith({}, { page: 1, limit: 20 }, 'en');
    });

    it('should filter topics by subjectSlug', async () => {
      const mockResult = {
        topics: [
          { slug: 'topic-1', title: 'Topic 1', subjectSlug: 'ayurveda-fundamentals' }
        ],
        total: 1,
        page: 1,
        limit: 20
      };

      ContentService.getTopics.mockResolvedValue(mockResult);

      const response = await request(app)
        .get('/api/topics?subjectSlug=ayurveda-fundamentals');

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockResult);
      expect(ContentService.getTopics).toHaveBeenCalledWith(
        { subjectSlug: 'ayurveda-fundamentals' },
        { page: 1, limit: 20 },
        'en'
      );
    });

    it('should filter topics by difficulty', async () => {
      const mockResult = {
        topics: [
          { slug: 'topic-1', title: 'Topic 1', difficulty: 'beginner' }
        ],
        total: 1,
        page: 1,
        limit: 20
      };

      ContentService.getTopics.mockResolvedValue(mockResult);

      const response = await request(app)
        .get('/api/topics?difficulty=beginner');

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockResult);
      expect(ContentService.getTopics).toHaveBeenCalledWith(
        { difficulty: 'beginner' },
        { page: 1, limit: 20 },
        'en'
      );
    });

    it('should support custom pagination', async () => {
      const mockResult = {
        topics: [
          { slug: 'topic-3', title: 'Topic 3' }
        ],
        total: 10,
        page: 2,
        limit: 5
      };

      ContentService.getTopics.mockResolvedValue(mockResult);

      const response = await request(app)
        .get('/api/topics?page=2&limit=5');

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockResult);
      expect(ContentService.getTopics).toHaveBeenCalledWith(
        {},
        { page: 2, limit: 5 },
        'en'
      );
    });

    it('should support combined filters', async () => {
      const mockResult = {
        topics: [
          { 
            slug: 'topic-1', 
            title: 'Topic 1', 
            subjectSlug: 'ayurveda-fundamentals',
            difficulty: 'intermediate'
          }
        ],
        total: 1,
        page: 1,
        limit: 10
      };

      ContentService.getTopics.mockResolvedValue(mockResult);

      const response = await request(app)
        .get('/api/topics?subjectSlug=ayurveda-fundamentals&difficulty=intermediate&page=1&limit=10');

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockResult);
      expect(ContentService.getTopics).toHaveBeenCalledWith(
        { subjectSlug: 'ayurveda-fundamentals', difficulty: 'intermediate' },
        { page: 1, limit: 10 },
        'en'
      );
    });

    it('should return 400 for invalid subjectSlug format', async () => {
      const response = await request(app)
        .get('/api/topics?subjectSlug=Invalid_Slug!');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Invalid subject slug format');
    });

    it('should return 400 for invalid difficulty', async () => {
      const response = await request(app)
        .get('/api/topics?difficulty=expert');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Difficulty must be beginner, intermediate, or advanced');
    });

    it('should return 400 for invalid page number', async () => {
      const response = await request(app)
        .get('/api/topics?page=0');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Page must be a positive integer');
    });

    it('should return 400 for invalid limit', async () => {
      const response = await request(app)
        .get('/api/topics?limit=150');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Limit must be between 1 and 100');
    });

    it('should return 400 for limit less than 1', async () => {
      const response = await request(app)
        .get('/api/topics?limit=0');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Limit must be between 1 and 100');
    });

    it('should return 400 for ValidationError from service', async () => {
      const error = new Error('Invalid pagination parameters');
      error.name = 'ValidationError';
      ContentService.getTopics.mockRejectedValue(error);

      const response = await request(app)
        .get('/api/topics');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Invalid pagination parameters');
    });

    it('should return 500 for unexpected errors', async () => {
      ContentService.getTopics.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/api/topics');

      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Failed to retrieve topics');
    });
  });
});
