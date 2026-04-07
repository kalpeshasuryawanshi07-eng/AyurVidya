const request = require('supertest');
const express = require('express');
const subjectsRoutes = require('./subjects');
const ContentService = require('../services/ContentService');

// Mock dependencies
jest.mock('../services/ContentService');

describe('Subjects Routes', () => {
  let app;

  beforeEach(() => {
    // Create Express app for testing
    app = express();
    app.use(express.json());
    app.use('/api/subjects', subjectsRoutes);

    // Clear all mocks
    jest.clearAllMocks();
  });

  describe('GET /api/subjects/:slug', () => {
    it('should return subject with topic list for valid slug', async () => {
      const mockSubject = {
        slug: 'ayurveda-fundamentals',
        title: 'Ayurveda Fundamentals',
        description: 'Introduction to Ayurveda',
        icon: '🌿',
        colorHex: '#4CAF50',
        year: 1,
        orderIndex: 1,
        topicCount: 3,
        topics: [
          { slug: 'topic-1', title: 'Topic 1', difficulty: 'beginner', estimatedMins: 30 },
          { slug: 'topic-2', title: 'Topic 2', difficulty: 'intermediate', estimatedMins: 45 },
          { slug: 'topic-3', title: 'Topic 3', difficulty: 'advanced', estimatedMins: 60 }
        ]
      };

      ContentService.getSubjectBySlug.mockResolvedValue(mockSubject);

      const response = await request(app)
        .get('/api/subjects/ayurveda-fundamentals');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.subject).toEqual(mockSubject);
      expect(ContentService.getSubjectBySlug).toHaveBeenCalledWith('ayurveda-fundamentals', 'en');
    });

    it('should return subject with Marathi content when lang=mr', async () => {
      const mockSubject = {
        slug: 'ayurveda-fundamentals',
        title: 'आयुर्वेद मूलभूत तत्त्वे',
        description: 'आयुर्वेदाचा परिचय',
        icon: '🌿',
        colorHex: '#4CAF50',
        year: 1,
        orderIndex: 1,
        topicCount: 2,
        topics: [
          { slug: 'topic-1', title: 'विषय १', difficulty: 'beginner', estimatedMins: 30 },
          { slug: 'topic-2', title: 'विषय २', difficulty: 'intermediate', estimatedMins: 45 }
        ]
      };

      ContentService.getSubjectBySlug.mockResolvedValue(mockSubject);

      const response = await request(app)
        .get('/api/subjects/ayurveda-fundamentals?lang=mr');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.subject).toEqual(mockSubject);
      expect(ContentService.getSubjectBySlug).toHaveBeenCalledWith('ayurveda-fundamentals', 'mr');
    });

    it('should return 400 for invalid slug format', async () => {
      const response = await request(app)
        .get('/api/subjects/Invalid_Slug!');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Invalid slug format');
    });

    it('should return 400 for slug with uppercase letters', async () => {
      const response = await request(app)
        .get('/api/subjects/Ayurveda-Fundamentals');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Invalid slug format');
    });

    it('should return 400 for invalid language parameter', async () => {
      const response = await request(app)
        .get('/api/subjects/ayurveda-fundamentals?lang=fr');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Language must be either "en" or "mr"');
    });

    it('should return 404 when subject not found', async () => {
      const error = new Error('Subject not found');
      error.name = 'SubjectNotFoundError';
      ContentService.getSubjectBySlug.mockRejectedValue(error);

      const response = await request(app)
        .get('/api/subjects/non-existent-subject');

      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Subject not found');
    });

    it('should return 500 for unexpected errors', async () => {
      ContentService.getSubjectBySlug.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/api/subjects/ayurveda-fundamentals');

      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Failed to retrieve subject');
    });
  });

  describe('GET /api/subjects', () => {
    it('should return all subjects without filters', async () => {
      const mockSubjects = [
        {
          slug: 'ayurveda-fundamentals',
          title: 'Ayurveda Fundamentals',
          description: 'Introduction to Ayurveda',
          year: 1,
          orderIndex: 1,
          topicCount: 5
        },
        {
          slug: 'dravyaguna',
          title: 'Dravyaguna',
          description: 'Ayurvedic Pharmacology',
          year: 2,
          orderIndex: 2,
          topicCount: 8
        }
      ];

      ContentService.getSubjects.mockResolvedValue(mockSubjects);

      const response = await request(app)
        .get('/api/subjects');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.subjects).toEqual(mockSubjects);
      expect(ContentService.getSubjects).toHaveBeenCalledWith({});
    });

    it('should filter subjects by year', async () => {
      const mockSubjects = [
        {
          slug: 'ayurveda-fundamentals',
          title: 'Ayurveda Fundamentals',
          description: 'Introduction to Ayurveda',
          year: 1,
          orderIndex: 1,
          topicCount: 5
        }
      ];

      ContentService.getSubjects.mockResolvedValue(mockSubjects);

      const response = await request(app)
        .get('/api/subjects?year=1');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.subjects).toEqual(mockSubjects);
      expect(ContentService.getSubjects).toHaveBeenCalledWith({ year: 1 });
    });

    it('should filter subjects by year 5', async () => {
      const mockSubjects = [
        {
          slug: 'advanced-clinical-practice',
          title: 'Advanced Clinical Practice',
          description: 'Advanced clinical applications',
          year: 5,
          orderIndex: 10,
          topicCount: 12
        }
      ];

      ContentService.getSubjects.mockResolvedValue(mockSubjects);

      const response = await request(app)
        .get('/api/subjects?year=5');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.subjects).toEqual(mockSubjects);
      expect(ContentService.getSubjects).toHaveBeenCalledWith({ year: 5 });
    });

    it('should return 400 for year less than 1', async () => {
      const response = await request(app)
        .get('/api/subjects?year=0');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Year must be between 1 and 5');
    });

    it('should return 400 for year greater than 5', async () => {
      const response = await request(app)
        .get('/api/subjects?year=6');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Year must be between 1 and 5');
    });

    it('should return 400 for non-integer year', async () => {
      const response = await request(app)
        .get('/api/subjects?year=abc');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Year must be between 1 and 5');
    });

    it('should return 400 for ValidationError from service', async () => {
      const error = new Error('Year must be between 1 and 5');
      error.name = 'ValidationError';
      ContentService.getSubjects.mockRejectedValue(error);

      const response = await request(app)
        .get('/api/subjects');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Year must be between 1 and 5');
    });

    it('should return 500 for unexpected errors', async () => {
      ContentService.getSubjects.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/api/subjects');

      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Failed to retrieve subjects');
    });

    it('should return empty array when no subjects match filter', async () => {
      ContentService.getSubjects.mockResolvedValue([]);

      const response = await request(app)
        .get('/api/subjects?year=3');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.subjects).toEqual([]);
      expect(ContentService.getSubjects).toHaveBeenCalledWith({ year: 3 });
    });
  });
});
