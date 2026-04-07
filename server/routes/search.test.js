const request = require('supertest');
const express = require('express');
const searchRoutes = require('./search');
const Topic = require('../models/Topic');
const Herb = require('../models/Herb');
const LanguageService = require('../services/LanguageService');

// Mock dependencies
jest.mock('../models/Topic');
jest.mock('../models/Herb');
jest.mock('../services/LanguageService');

describe('Search Routes', () => {
  let app;

  beforeEach(() => {
    // Create Express app for testing
    app = express();
    app.use(express.json());
    app.use('/api/search', searchRoutes);

    // Clear all mocks
    jest.clearAllMocks();

    // Setup default LanguageService mock
    LanguageService.selectContent.mockImplementation((content, lang) => content);
  });

  describe('GET /api/search', () => {
    it('should search across topics and herbs successfully', async () => {
      const mockTopics = [
        {
          slug: 'vata-dosha',
          title: 'Vata Dosha',
          introduction: 'Introduction to Vata',
          subjectSlug: 'basic-principles'
        }
      ];

      const mockHerbs = [
        {
          slug: 'ashwagandha',
          commonName: 'Ashwagandha',
          botanicalName: 'Withania somnifera',
          medicinalUses: 'Adaptogen'
        }
      ];

      // Mock Topic.find chain
      Topic.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockTopics)
      });

      // Mock Herb.find chain
      Herb.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockHerbs)
      });

      Topic.countDocuments.mockResolvedValue(1);
      Herb.countDocuments.mockResolvedValue(1);

      const response = await request(app)
        .get('/api/search?q=vata');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.topics).toEqual(mockTopics);
      expect(response.body.data.herbs).toEqual(mockHerbs);
      expect(response.body.data.pagination).toEqual({
        total: 2,
        page: 1,
        limit: 20,
        pages: 1
      });

      // Verify text search was used
      expect(Topic.find).toHaveBeenCalledWith(
        { $text: { $search: 'vata' } },
        { score: { $meta: 'textScore' } }
      );
      expect(Herb.find).toHaveBeenCalledWith(
        { $text: { $search: 'vata' } },
        { score: { $meta: 'textScore' } }
      );
    });

    it('should return 400 for empty query', async () => {
      const response = await request(app)
        .get('/api/search?q=');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Search query cannot be empty');
    });

    it('should return 400 for missing query parameter', async () => {
      const response = await request(app)
        .get('/api/search');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Search query cannot be empty');
    });

    it('should return 400 for query exceeding 100 characters', async () => {
      const longQuery = 'a'.repeat(101);
      const response = await request(app)
        .get(`/api/search?q=${longQuery}`);

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Search query must not exceed 100 characters');
    });

    it('should accept query with exactly 100 characters', async () => {
      const maxQuery = 'a'.repeat(100);

      Topic.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      });

      Herb.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      });

      Topic.countDocuments.mockResolvedValue(0);
      Herb.countDocuments.mockResolvedValue(0);

      const response = await request(app)
        .get(`/api/search?q=${maxQuery}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
    });

    it('should return 400 for invalid language parameter', async () => {
      const response = await request(app)
        .get('/api/search?q=vata&lang=fr');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Language must be either "en" or "mr"');
    });

    it('should apply language selection with lang=mr', async () => {
      const mockTopics = [
        {
          slug: 'vata-dosha',
          title: 'Vata Dosha',
          titleMr: 'वात दोष',
          introduction: 'Introduction to Vata',
          introductionMr: 'वात परिचय'
        }
      ];

      const mockHerbs = [
        {
          slug: 'ashwagandha',
          commonName: 'Ashwagandha',
          commonNameMr: 'अश्वगंधा'
        }
      ];

      const localizedTopics = [
        {
          slug: 'vata-dosha',
          title: 'वात दोष',
          introduction: 'वात परिचय'
        }
      ];

      const localizedHerbs = [
        {
          slug: 'ashwagandha',
          commonName: 'अश्वगंधा'
        }
      ];

      Topic.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockTopics)
      });

      Herb.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockHerbs)
      });

      Topic.countDocuments.mockResolvedValue(1);
      Herb.countDocuments.mockResolvedValue(1);

      LanguageService.selectContent
        .mockReturnValueOnce(localizedTopics[0])
        .mockReturnValueOnce(localizedHerbs[0]);

      const response = await request(app)
        .get('/api/search?q=vata&lang=mr');

      expect(response.status).toBe(200);
      expect(response.body.data.topics).toEqual(localizedTopics);
      expect(response.body.data.herbs).toEqual(localizedHerbs);
      expect(LanguageService.selectContent).toHaveBeenCalledWith(mockTopics[0], 'mr');
      expect(LanguageService.selectContent).toHaveBeenCalledWith(mockHerbs[0], 'mr');
    });

    it('should support pagination with custom page and limit', async () => {
      const mockTopics = [
        { slug: 'topic1', title: 'Topic 1' },
        { slug: 'topic2', title: 'Topic 2' }
      ];

      const mockHerbs = [
        { slug: 'herb1', commonName: 'Herb 1' }
      ];

      Topic.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockTopics)
      });

      Herb.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockHerbs)
      });

      Topic.countDocuments.mockResolvedValue(10);
      Herb.countDocuments.mockResolvedValue(5);

      const response = await request(app)
        .get('/api/search?q=test&page=2&limit=5');

      expect(response.status).toBe(200);
      expect(response.body.data.pagination).toEqual({
        total: 15,
        page: 2,
        limit: 5,
        pages: 3
      });

      const topicChain = Topic.find();
      expect(topicChain.skip).toHaveBeenCalledWith(5);
      expect(topicChain.limit).toHaveBeenCalledWith(5);

      const herbChain = Herb.find();
      expect(herbChain.skip).toHaveBeenCalledWith(5);
      expect(herbChain.limit).toHaveBeenCalledWith(5);
    });

    it('should return 400 for page less than 1', async () => {
      const response = await request(app)
        .get('/api/search?q=test&page=0');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Page must be a positive integer');
    });

    it('should return 400 for limit less than 1', async () => {
      const response = await request(app)
        .get('/api/search?q=test&limit=0');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Limit must be between 1 and 100');
    });

    it('should return 400 for limit greater than 100', async () => {
      const response = await request(app)
        .get('/api/search?q=test&limit=101');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Limit must be between 1 and 100');
    });

    it('should return empty results when no matches found', async () => {
      Topic.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      });

      Herb.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      });

      Topic.countDocuments.mockResolvedValue(0);
      Herb.countDocuments.mockResolvedValue(0);

      const response = await request(app)
        .get('/api/search?q=nonexistent');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.topics).toEqual([]);
      expect(response.body.data.herbs).toEqual([]);
      expect(response.body.data.pagination.total).toBe(0);
    });

    it('should sort results by relevance score', async () => {
      const mockTopics = [
        { slug: 'topic1', title: 'Most Relevant Topic' },
        { slug: 'topic2', title: 'Less Relevant Topic' }
      ];

      Topic.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockTopics)
      });

      Herb.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      });

      Topic.countDocuments.mockResolvedValue(2);
      Herb.countDocuments.mockResolvedValue(0);

      const response = await request(app)
        .get('/api/search?q=relevant');

      expect(response.status).toBe(200);

      const topicChain = Topic.find();
      expect(topicChain.sort).toHaveBeenCalledWith({ score: { $meta: 'textScore' } });
    });

    it('should handle database errors gracefully', async () => {
      Topic.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockRejectedValue(new Error('Database error'))
      });

      const response = await request(app)
        .get('/api/search?q=test');

      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Search failed');
      expect(response.body.errors).toContain('An unexpected error occurred');
    });

    it('should trim whitespace from query', async () => {
      Topic.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      });

      Herb.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      });

      Topic.countDocuments.mockResolvedValue(0);
      Herb.countDocuments.mockResolvedValue(0);

      const response = await request(app)
        .get('/api/search?q=  vata  ');

      expect(response.status).toBe(200);
      expect(Topic.find).toHaveBeenCalledWith(
        { $text: { $search: 'vata' } },
        { score: { $meta: 'textScore' } }
      );
    });

    it('should handle multiple search terms', async () => {
      Topic.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      });

      Herb.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      });

      Topic.countDocuments.mockResolvedValue(0);
      Herb.countDocuments.mockResolvedValue(0);

      const response = await request(app)
        .get('/api/search?q=vata dosha ayurveda');

      expect(response.status).toBe(200);
      expect(Topic.find).toHaveBeenCalledWith(
        { $text: { $search: 'vata dosha ayurveda' } },
        { score: { $meta: 'textScore' } }
      );
    });

    it('should use default pagination values when not provided', async () => {
      Topic.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      });

      Herb.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      });

      Topic.countDocuments.mockResolvedValue(0);
      Herb.countDocuments.mockResolvedValue(0);

      const response = await request(app)
        .get('/api/search?q=test');

      expect(response.status).toBe(200);
      expect(response.body.data.pagination.page).toBe(1);
      expect(response.body.data.pagination.limit).toBe(20);

      const topicChain = Topic.find();
      expect(topicChain.skip).toHaveBeenCalledWith(0);
      expect(topicChain.limit).toHaveBeenCalledWith(20);
    });
  });
});
