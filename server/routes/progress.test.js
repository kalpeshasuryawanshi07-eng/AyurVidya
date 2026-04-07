const request = require('supertest');
const express = require('express');
const progressRoutes = require('./progress');
const ProgressService = require('../services/ProgressService');
const { authenticate } = require('../middleware/auth');

// Mock dependencies
jest.mock('../services/ProgressService');
jest.mock('../middleware/auth');

describe('Progress Routes', () => {
  let app;

  beforeEach(() => {
    // Create Express app for testing
    app = express();
    app.use(express.json());
    app.use('/api/progress', progressRoutes);

    // Clear all mocks
    jest.clearAllMocks();

    // Mock authenticate middleware to pass through
    authenticate.mockImplementation((req, res, next) => {
      req.user = { userId: 'user123', role: 'student' };
      next();
    });
  });

  describe('POST /api/progress/complete', () => {
    it('should mark topic as complete with valid data', async () => {
      const mockProgress = {
        _id: 'progress123',
        userId: 'user123',
        topicSlug: 'introduction-to-ayurveda',
        completed: true,
        completedAt: new Date('2024-01-15T10:00:00Z'),
        timeSpent: 30
      };

      ProgressService.markComplete.mockResolvedValue(mockProgress);

      const response = await request(app)
        .post('/api/progress/complete')
        .set('Authorization', 'Bearer mock-token')
        .send({
          topicSlug: 'introduction-to-ayurveda',
          timeSpent: 30
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.progress._id).toBe('progress123');
      expect(response.body.data.progress.topicSlug).toBe('introduction-to-ayurveda');
      expect(response.body.data.progress.completed).toBe(true);
      expect(response.body.data.progress.timeSpent).toBe(30);
      expect(ProgressService.markComplete).toHaveBeenCalledWith(
        'user123',
        'introduction-to-ayurveda',
        30
      );
    });

    it('should mark topic as complete without timeSpent', async () => {
      const mockProgress = {
        _id: 'progress123',
        userId: 'user123',
        topicSlug: 'introduction-to-ayurveda',
        completed: true,
        completedAt: new Date('2024-01-15T10:00:00Z'),
        timeSpent: 0
      };

      ProgressService.markComplete.mockResolvedValue(mockProgress);

      const response = await request(app)
        .post('/api/progress/complete')
        .set('Authorization', 'Bearer mock-token')
        .send({
          topicSlug: 'introduction-to-ayurveda'
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(ProgressService.markComplete).toHaveBeenCalledWith(
        'user123',
        'introduction-to-ayurveda',
        undefined
      );
    });

    it('should return 400 when topicSlug is missing', async () => {
      const response = await request(app)
        .post('/api/progress/complete')
        .set('Authorization', 'Bearer mock-token')
        .send({
          timeSpent: 30
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Topic slug is required');
    });

    it('should return 400 when topicSlug format is invalid', async () => {
      const response = await request(app)
        .post('/api/progress/complete')
        .set('Authorization', 'Bearer mock-token')
        .send({
          topicSlug: 'Invalid_Slug!',
          timeSpent: 30
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Invalid topic slug format');
    });

    it('should return 400 when timeSpent is negative', async () => {
      const response = await request(app)
        .post('/api/progress/complete')
        .set('Authorization', 'Bearer mock-token')
        .send({
          topicSlug: 'introduction-to-ayurveda',
          timeSpent: -10
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Time spent must be a non-negative integer');
    });

    it('should return 404 when topic not found', async () => {
      const error = new Error('Topic not found');
      error.name = 'ValidationError';
      error.statusCode = 404;
      ProgressService.markComplete.mockRejectedValue(error);

      const response = await request(app)
        .post('/api/progress/complete')
        .set('Authorization', 'Bearer mock-token')
        .send({
          topicSlug: 'non-existent-topic',
          timeSpent: 30
        });

      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Topic not found');
    });

    it('should handle duplicate completion updates', async () => {
      const mockProgress = {
        _id: 'progress123',
        userId: 'user123',
        topicSlug: 'introduction-to-ayurveda',
        completed: true,
        completedAt: new Date('2024-01-15T10:00:00Z'),
        timeSpent: 45
      };

      ProgressService.markComplete.mockResolvedValue(mockProgress);

      const response = await request(app)
        .post('/api/progress/complete')
        .set('Authorization', 'Bearer mock-token')
        .send({
          topicSlug: 'introduction-to-ayurveda',
          timeSpent: 45
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.progress.timeSpent).toBe(45);
    });
  });

  describe('GET /api/progress/me', () => {
    it('should return user progress statistics', async () => {
      const mockProgress = {
        completed: 15,
        total: 50,
        percentage: 30,
        bySubject: {
          'ayurveda-basics': {
            completed: 5,
            total: 10,
            percentage: 50
          },
          'dravyaguna': {
            completed: 10,
            total: 40,
            percentage: 25
          }
        }
      };

      ProgressService.getProgress.mockResolvedValue(mockProgress);

      const response = await request(app)
        .get('/api/progress/me')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.progress).toEqual(mockProgress);
      expect(ProgressService.getProgress).toHaveBeenCalledWith('user123', {});
    });

    it('should return progress filtered by subject', async () => {
      const mockProgress = {
        completed: 5,
        total: 10,
        percentage: 50,
        bySubject: {
          'ayurveda-basics': {
            completed: 5,
            total: 10,
            percentage: 50
          }
        }
      };

      ProgressService.getProgress.mockResolvedValue(mockProgress);

      const response = await request(app)
        .get('/api/progress/me?subjectSlug=ayurveda-basics')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.progress).toEqual(mockProgress);
      expect(ProgressService.getProgress).toHaveBeenCalledWith('user123', {
        subjectSlug: 'ayurveda-basics'
      });
    });

    it('should return 400 when subjectSlug format is invalid', async () => {
      const response = await request(app)
        .get('/api/progress/me?subjectSlug=Invalid_Slug!')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Invalid subject slug format');
    });

    it('should return 404 when user not found', async () => {
      const error = new Error('User not found');
      error.name = 'UserNotFoundError';
      ProgressService.getProgress.mockRejectedValue(error);

      const response = await request(app)
        .get('/api/progress/me')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('User not found');
    });

    it('should return progress with zero completion', async () => {
      const mockProgress = {
        completed: 0,
        total: 50,
        percentage: 0,
        bySubject: {}
      };

      ProgressService.getProgress.mockResolvedValue(mockProgress);

      const response = await request(app)
        .get('/api/progress/me')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.progress.completed).toBe(0);
      expect(response.body.data.progress.percentage).toBe(0);
    });
  });

  describe('GET /api/progress/streak', () => {
    it('should return user study streak', async () => {
      const mockStreak = {
        currentStreak: 7,
        longestStreak: 15,
        lastActivity: new Date('2024-01-15T10:00:00Z')
      };

      ProgressService.getStreak.mockResolvedValue(mockStreak);

      const response = await request(app)
        .get('/api/progress/streak')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.streak.currentStreak).toBe(7);
      expect(response.body.data.streak.longestStreak).toBe(15);
      expect(response.body.data.streak.lastActivity).toBe('2024-01-15T10:00:00.000Z');
      expect(ProgressService.getStreak).toHaveBeenCalledWith('user123');
    });

    it('should return zero streak for new user', async () => {
      const mockStreak = {
        currentStreak: 0,
        longestStreak: 0,
        lastActivity: null
      };

      ProgressService.getStreak.mockResolvedValue(mockStreak);

      const response = await request(app)
        .get('/api/progress/streak')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.streak.currentStreak).toBe(0);
      expect(response.body.data.streak.longestStreak).toBe(0);
      expect(response.body.data.streak.lastActivity).toBeNull();
    });

    it('should return 404 when user not found', async () => {
      const error = new Error('User not found');
      error.name = 'UserNotFoundError';
      ProgressService.getStreak.mockRejectedValue(error);

      const response = await request(app)
        .get('/api/progress/streak')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('User not found');
    });

    it('should handle active streak correctly', async () => {
      const mockStreak = {
        currentStreak: 3,
        longestStreak: 10,
        lastActivity: new Date()
      };

      ProgressService.getStreak.mockResolvedValue(mockStreak);

      const response = await request(app)
        .get('/api/progress/streak')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(200);
      expect(response.body.data.streak.currentStreak).toBe(3);
      expect(response.body.data.streak.longestStreak).toBe(10);
    });
  });

  describe('Authentication', () => {
    it('should require authentication for POST /complete', async () => {
      authenticate.mockImplementation((req, res, next) => {
        return res.status(401).json({
          status: 'error',
          message: 'No token provided',
          errors: ['Authorization header must be in format: Bearer <token>']
        });
      });

      const response = await request(app)
        .post('/api/progress/complete')
        .send({
          topicSlug: 'introduction-to-ayurveda',
          timeSpent: 30
        });

      expect(response.status).toBe(401);
      expect(response.body.status).toBe('error');
    });

    it('should require authentication for GET /me', async () => {
      authenticate.mockImplementation((req, res, next) => {
        return res.status(401).json({
          status: 'error',
          message: 'No token provided',
          errors: ['Authorization header must be in format: Bearer <token>']
        });
      });

      const response = await request(app)
        .get('/api/progress/me');

      expect(response.status).toBe(401);
      expect(response.body.status).toBe('error');
    });

    it('should require authentication for GET /streak', async () => {
      authenticate.mockImplementation((req, res, next) => {
        return res.status(401).json({
          status: 'error',
          message: 'No token provided',
          errors: ['Authorization header must be in format: Bearer <token>']
        });
      });

      const response = await request(app)
        .get('/api/progress/streak');

      expect(response.status).toBe(401);
      expect(response.body.status).toBe('error');
    });
  });
});
