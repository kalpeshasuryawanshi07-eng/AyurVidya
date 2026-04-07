const request = require('supertest');
const express = require('express');
const noteRoutes = require('./notes');
const Note = require('../models/Note');
const Topic = require('../models/Topic');
const { authenticate } = require('../middleware/auth');

// Mock dependencies
jest.mock('../models/Note');
jest.mock('../models/Topic');
jest.mock('../middleware/auth');

describe('Note Routes', () => {
  let app;

  beforeEach(() => {
    // Create Express app for testing
    app = express();
    app.use(express.json());
    app.use('/api/notes', noteRoutes);

    // Clear all mocks
    jest.clearAllMocks();

    // Mock authenticate middleware to pass through
    authenticate.mockImplementation((req, res, next) => {
      req.user = { userId: 'user123', role: 'student' };
      next();
    });
  });

  describe('POST /api/notes', () => {
    it('should create note with valid data', async () => {
      const mockTopic = {
        _id: 'topic123',
        slug: 'introduction-to-ayurveda',
        title: 'Introduction to Ayurveda',
        subjectSlug: 'ayurveda-basics'
      };

      const mockNote = {
        _id: 'note123',
        userId: 'user123',
        topicSlug: 'introduction-to-ayurveda',
        content: 'This is my note about Ayurveda basics',
        updatedAt: new Date('2024-01-15T10:00:00Z'),
        createdAt: new Date('2024-01-15T10:00:00Z')
      };

      Topic.findOne.mockResolvedValue(mockTopic);
      Note.findOneAndUpdate.mockResolvedValue(mockNote);

      const response = await request(app)
        .post('/api/notes')
        .set('Authorization', 'Bearer mock-token')
        .send({
          topicSlug: 'introduction-to-ayurveda',
          content: 'This is my note about Ayurveda basics'
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Note saved successfully');
      expect(response.body.data.note._id).toBe('note123');
      expect(response.body.data.note.content).toBe('This is my note about Ayurveda basics');
      expect(Topic.findOne).toHaveBeenCalledWith({ slug: 'introduction-to-ayurveda' });
    });

    it('should update existing note', async () => {
      const mockTopic = {
        _id: 'topic123',
        slug: 'introduction-to-ayurveda',
        title: 'Introduction to Ayurveda'
      };

      const updatedNote = {
        _id: 'note123',
        userId: 'user123',
        topicSlug: 'introduction-to-ayurveda',
        content: 'Updated note content',
        updatedAt: new Date('2024-01-16T10:00:00Z'),
        createdAt: new Date('2024-01-15T10:00:00Z')
      };

      Topic.findOne.mockResolvedValue(mockTopic);
      Note.findOneAndUpdate.mockResolvedValue(updatedNote);

      const response = await request(app)
        .post('/api/notes')
        .set('Authorization', 'Bearer mock-token')
        .send({
          topicSlug: 'introduction-to-ayurveda',
          content: 'Updated note content'
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.note.content).toBe('Updated note content');
    });

    it('should return 400 when topicSlug is missing', async () => {
      const response = await request(app)
        .post('/api/notes')
        .set('Authorization', 'Bearer mock-token')
        .send({
          content: 'Note without topic'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Topic slug is required');
    });

    it('should return 400 when content is missing', async () => {
      const response = await request(app)
        .post('/api/notes')
        .set('Authorization', 'Bearer mock-token')
        .send({
          topicSlug: 'introduction-to-ayurveda'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Note content is required');
    });

    it('should return 400 when topicSlug format is invalid', async () => {
      const response = await request(app)
        .post('/api/notes')
        .set('Authorization', 'Bearer mock-token')
        .send({
          topicSlug: 'Invalid_Slug!',
          content: 'Some content'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Invalid topic slug format');
    });

    it('should return 400 when content exceeds 10000 characters', async () => {
      const longContent = 'a'.repeat(10001);

      const response = await request(app)
        .post('/api/notes')
        .set('Authorization', 'Bearer mock-token')
        .send({
          topicSlug: 'introduction-to-ayurveda',
          content: longContent
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Note content cannot exceed 10000 characters');
    });

    it('should return 404 when topic does not exist', async () => {
      Topic.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/api/notes')
        .set('Authorization', 'Bearer mock-token')
        .send({
          topicSlug: 'non-existent-topic',
          content: 'Some content'
        });

      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Topic not found');
      expect(response.body.errors).toContain('Topic with this slug does not exist');
    });

    it('should handle database errors', async () => {
      const mockTopic = {
        _id: 'topic123',
        slug: 'introduction-to-ayurveda',
        title: 'Introduction to Ayurveda'
      };

      Topic.findOne.mockResolvedValue(mockTopic);
      Note.findOneAndUpdate.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/api/notes')
        .set('Authorization', 'Bearer mock-token')
        .send({
          topicSlug: 'introduction-to-ayurveda',
          content: 'Some content'
        });

      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Failed to save note');
    });
  });

  describe('GET /api/notes/:topicSlug', () => {
    it('should retrieve note for specific topic', async () => {
      const mockNote = {
        _id: 'note123',
        userId: 'user123',
        topicSlug: 'introduction-to-ayurveda',
        content: 'This is my note',
        updatedAt: new Date('2024-01-15T10:00:00Z'),
        createdAt: new Date('2024-01-15T10:00:00Z')
      };

      const mockFindOne = {
        lean: jest.fn().mockResolvedValue(mockNote)
      };

      Note.findOne.mockReturnValue(mockFindOne);

      const response = await request(app)
        .get('/api/notes/introduction-to-ayurveda')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Note retrieved successfully');
      expect(response.body.data.note._id).toBe('note123');
      expect(response.body.data.note.content).toBe('This is my note');
      expect(Note.findOne).toHaveBeenCalledWith({
        userId: 'user123',
        topicSlug: 'introduction-to-ayurveda'
      });
    });

    it('should return 404 when note does not exist', async () => {
      const mockFindOne = {
        lean: jest.fn().mockResolvedValue(null)
      };

      Note.findOne.mockReturnValue(mockFindOne);

      const response = await request(app)
        .get('/api/notes/non-existent-topic')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Note not found');
      expect(response.body.errors).toContain('No note found for this topic');
    });

    it('should return 400 when topicSlug format is invalid', async () => {
      const response = await request(app)
        .get('/api/notes/Invalid_Slug!')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Invalid topic slug format');
    });

    it('should handle database errors', async () => {
      Note.findOne.mockImplementation(() => {
        throw new Error('Database error');
      });

      const response = await request(app)
        .get('/api/notes/introduction-to-ayurveda')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Failed to retrieve note');
    });
  });

  describe('GET /api/notes', () => {
    it('should return all user notes with topic metadata', async () => {
      const mockNotes = [
        {
          _id: 'note1',
          userId: 'user123',
          topicSlug: 'introduction-to-ayurveda',
          content: 'First note',
          updatedAt: new Date('2024-01-15T10:00:00Z'),
          createdAt: new Date('2024-01-15T10:00:00Z')
        },
        {
          _id: 'note2',
          userId: 'user123',
          topicSlug: 'vata-dosha',
          content: 'Second note',
          updatedAt: new Date('2024-01-14T10:00:00Z'),
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
        lean: jest.fn().mockResolvedValue(mockNotes)
      };

      const mockTopicFind = {
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockTopics)
      };

      Note.find.mockReturnValue(mockFind);
      Topic.find.mockReturnValue(mockTopicFind);

      const response = await request(app)
        .get('/api/notes')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.notes).toHaveLength(2);
      expect(response.body.data.notes[0].topicSlug).toBe('introduction-to-ayurveda');
      expect(response.body.data.notes[0].topic.title).toBe('Introduction to Ayurveda');
      expect(response.body.data.notes[1].topicSlug).toBe('vata-dosha');
      expect(response.body.data.notes[1].topic.title).toBe('Vata Dosha');
      expect(response.body.data.total).toBe(2);
    });

    it('should return empty array when user has no notes', async () => {
      const mockFind = {
        sort: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      };

      const mockTopicFind = {
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      };

      Note.find.mockReturnValue(mockFind);
      Topic.find.mockReturnValue(mockTopicFind);

      const response = await request(app)
        .get('/api/notes')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(200);
      expect(response.body.data.notes).toEqual([]);
      expect(response.body.data.total).toBe(0);
    });

    it('should handle missing topic metadata gracefully', async () => {
      const mockNotes = [
        {
          _id: 'note1',
          userId: 'user123',
          topicSlug: 'deleted-topic',
          content: 'Note for deleted topic',
          updatedAt: new Date('2024-01-15T10:00:00Z'),
          createdAt: new Date('2024-01-15T10:00:00Z')
        }
      ];

      const mockFind = {
        sort: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockNotes)
      };

      const mockTopicFind = {
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      };

      Note.find.mockReturnValue(mockFind);
      Topic.find.mockReturnValue(mockTopicFind);

      const response = await request(app)
        .get('/api/notes')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(200);
      expect(response.body.data.notes[0].topic).toBeNull();
    });

    it('should handle database errors', async () => {
      Note.find.mockImplementation(() => {
        throw new Error('Database error');
      });

      const response = await request(app)
        .get('/api/notes')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Failed to retrieve notes');
    });
  });

  describe('Authentication', () => {
    it('should require authentication for POST /api/notes', async () => {
      authenticate.mockImplementation((req, res) => {
        return res.status(401).json({
          status: 'error',
          message: 'No token provided',
          errors: ['Authorization header must be in format: Bearer <token>']
        });
      });

      const response = await request(app)
        .post('/api/notes')
        .send({
          topicSlug: 'introduction-to-ayurveda',
          content: 'Some content'
        });

      expect(response.status).toBe(401);
      expect(response.body.status).toBe('error');
    });

    it('should require authentication for GET /api/notes/:topicSlug', async () => {
      authenticate.mockImplementation((req, res) => {
        return res.status(401).json({
          status: 'error',
          message: 'No token provided',
          errors: ['Authorization header must be in format: Bearer <token>']
        });
      });

      const response = await request(app)
        .get('/api/notes/introduction-to-ayurveda');

      expect(response.status).toBe(401);
      expect(response.body.status).toBe('error');
    });

    it('should require authentication for GET /api/notes', async () => {
      authenticate.mockImplementation((req, res) => {
        return res.status(401).json({
          status: 'error',
          message: 'No token provided',
          errors: ['Authorization header must be in format: Bearer <token>']
        });
      });

      const response = await request(app)
        .get('/api/notes');

      expect(response.status).toBe(401);
      expect(response.body.status).toBe('error');
    });
  });
});
