const request = require('supertest');
const express = require('express');
const herbsRoutes = require('./herbs');
const Herb = require('../models/Herb');
const LanguageService = require('../services/LanguageService');

// Mock dependencies
jest.mock('../models/Herb');
jest.mock('../services/LanguageService');

describe('Herbs Routes', () => {
  let app;

  beforeEach(() => {
    // Create Express app for testing
    app = express();
    app.use(express.json());
    app.use('/api/herbs', herbsRoutes);

    // Clear all mocks
    jest.clearAllMocks();

    // Setup default LanguageService mock
    LanguageService.selectContent.mockImplementation((content, lang) => content);
  });

  describe('GET /api/herbs/:slug', () => {
    it('should return herb details for valid slug', async () => {
      const mockHerb = {
        slug: 'ashwagandha',
        commonName: 'Ashwagandha',
        botanicalName: 'Withania somnifera',
        sanskritName: 'Ashwagandha',
        rasa: ['bitter', 'astringent'],
        guna: ['light', 'unctuous'],
        virya: 'hot',
        vipaka: 'sweet',
        doshaEffect: {
          vata: 'decreases',
          pitta: 'balances',
          kapha: 'decreases'
        },
        partsUsed: ['root', 'leaves'],
        medicinalUses: 'Adaptogen, stress relief, immune support',
        preparations: 'Powder, decoction, tablets',
        dosage: '3-6g daily',
        contraindications: 'Pregnancy, hyperthyroidism',
        modernResearch: 'Clinical studies show stress reduction',
        category: 'adaptogen'
      };

      Herb.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockHerb)
      });

      const response = await request(app)
        .get('/api/herbs/ashwagandha');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.herb).toEqual(mockHerb);
      expect(Herb.findOne).toHaveBeenCalledWith({ slug: 'ashwagandha' });
      expect(LanguageService.selectContent).toHaveBeenCalledWith(mockHerb, 'en');
    });

    it('should return herb with Marathi content when lang=mr', async () => {
      const mockHerb = {
        slug: 'ashwagandha',
        commonName: 'Ashwagandha',
        commonNameMr: 'अश्वगंधा',
        botanicalName: 'Withania somnifera',
        sanskritName: 'Ashwagandha',
        medicinalUses: 'Adaptogen, stress relief',
        medicinalUsesMr: 'तणाव कमी करणे, रोगप्रतिकारक शक्ती'
      };

      const localizedHerb = {
        slug: 'ashwagandha',
        commonName: 'अश्वगंधा',
        botanicalName: 'Withania somnifera',
        sanskritName: 'Ashwagandha',
        medicinalUses: 'तणाव कमी करणे, रोगप्रतिकारक शक्ती'
      };

      Herb.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockHerb)
      });

      LanguageService.selectContent.mockReturnValue(localizedHerb);

      const response = await request(app)
        .get('/api/herbs/ashwagandha?lang=mr');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.herb).toEqual(localizedHerb);
      expect(LanguageService.selectContent).toHaveBeenCalledWith(mockHerb, 'mr');
    });

    it('should return 400 for invalid slug format', async () => {
      const response = await request(app)
        .get('/api/herbs/Invalid_Slug!');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Invalid slug format');
    });

    it('should return 400 for slug with uppercase letters', async () => {
      const response = await request(app)
        .get('/api/herbs/Ashwagandha');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Invalid slug format');
    });

    it('should return 400 for invalid language parameter', async () => {
      const response = await request(app)
        .get('/api/herbs/ashwagandha?lang=fr');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Language must be either "en" or "mr"');
    });

    it('should return 404 when herb not found', async () => {
      Herb.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(null)
      });

      const response = await request(app)
        .get('/api/herbs/non-existent-herb');

      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Herb not found');
    });

    it('should return 500 for unexpected errors', async () => {
      Herb.findOne.mockReturnValue({
        lean: jest.fn().mockRejectedValue(new Error('Database error'))
      });

      const response = await request(app)
        .get('/api/herbs/ashwagandha');

      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Failed to retrieve herb');
    });
  });

  describe('GET /api/herbs', () => {
    it('should return all herbs without filters', async () => {
      const mockHerbs = [
        {
          slug: 'ashwagandha',
          commonName: 'Ashwagandha',
          botanicalName: 'Withania somnifera',
          medicinalUses: 'Adaptogen'
        },
        {
          slug: 'turmeric',
          commonName: 'Turmeric',
          botanicalName: 'Curcuma longa',
          medicinalUses: 'Anti-inflammatory'
        }
      ];

      Herb.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockHerbs)
      });

      Herb.countDocuments.mockResolvedValue(2);

      const response = await request(app)
        .get('/api/herbs');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.herbs).toEqual(mockHerbs);
      expect(response.body.data.pagination).toEqual({
        total: 2,
        page: 1,
        limit: 20,
        pages: 1
      });
      expect(Herb.find).toHaveBeenCalledWith({});
    });

    it('should filter herbs by category', async () => {
      const mockHerbs = [
        {
          slug: 'ashwagandha',
          commonName: 'Ashwagandha',
          category: 'adaptogen',
          medicinalUses: 'Stress relief'
        }
      ];

      Herb.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockHerbs)
      });

      Herb.countDocuments.mockResolvedValue(1);

      const response = await request(app)
        .get('/api/herbs?category=adaptogen');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.herbs).toEqual(mockHerbs);
      expect(Herb.find).toHaveBeenCalledWith({ category: 'adaptogen' });
    });

    it('should search herbs by name', async () => {
      const mockHerbs = [
        {
          slug: 'ashwagandha',
          commonName: 'Ashwagandha',
          botanicalName: 'Withania somnifera',
          medicinalUses: 'Adaptogen'
        }
      ];

      Herb.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockHerbs)
      });

      Herb.countDocuments.mockResolvedValue(1);

      const response = await request(app)
        .get('/api/herbs?search=ashwagandha');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.herbs).toEqual(mockHerbs);
      expect(Herb.find).toHaveBeenCalledWith({ $text: { $search: 'ashwagandha' } });
    });

    it('should combine category filter and search', async () => {
      const mockHerbs = [
        {
          slug: 'ashwagandha',
          commonName: 'Ashwagandha',
          category: 'adaptogen',
          medicinalUses: 'Stress relief'
        }
      ];

      Herb.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockHerbs)
      });

      Herb.countDocuments.mockResolvedValue(1);

      const response = await request(app)
        .get('/api/herbs?category=adaptogen&search=ashwa');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(Herb.find).toHaveBeenCalledWith({
        category: 'adaptogen',
        $text: { $search: 'ashwa' }
      });
    });

    it('should support pagination with custom page and limit', async () => {
      const mockHerbs = [
        { slug: 'herb1', commonName: 'Herb 1' },
        { slug: 'herb2', commonName: 'Herb 2' }
      ];

      Herb.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockHerbs)
      });

      Herb.countDocuments.mockResolvedValue(10);

      const response = await request(app)
        .get('/api/herbs?page=2&limit=2');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.pagination).toEqual({
        total: 10,
        page: 2,
        limit: 2,
        pages: 5
      });

      const findChain = Herb.find();
      expect(findChain.skip).toHaveBeenCalledWith(2);
      expect(findChain.limit).toHaveBeenCalledWith(2);
    });

    it('should apply language selection to all herbs', async () => {
      const mockHerbs = [
        { slug: 'herb1', commonName: 'Herb 1', commonNameMr: 'औषधी १' },
        { slug: 'herb2', commonName: 'Herb 2', commonNameMr: 'औषधी २' }
      ];

      const localizedHerbs = [
        { slug: 'herb1', commonName: 'औषधी १' },
        { slug: 'herb2', commonName: 'औषधी २' }
      ];

      Herb.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockHerbs)
      });

      Herb.countDocuments.mockResolvedValue(2);

      LanguageService.selectContent
        .mockReturnValueOnce(localizedHerbs[0])
        .mockReturnValueOnce(localizedHerbs[1]);

      const response = await request(app)
        .get('/api/herbs?lang=mr');

      expect(response.status).toBe(200);
      expect(response.body.data.herbs).toEqual(localizedHerbs);
      expect(LanguageService.selectContent).toHaveBeenCalledTimes(2);
      expect(LanguageService.selectContent).toHaveBeenCalledWith(mockHerbs[0], 'mr');
      expect(LanguageService.selectContent).toHaveBeenCalledWith(mockHerbs[1], 'mr');
    });

    it('should return 400 for page less than 1', async () => {
      const response = await request(app)
        .get('/api/herbs?page=0');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Page must be a positive integer');
    });

    it('should return 400 for limit greater than 100', async () => {
      const response = await request(app)
        .get('/api/herbs?limit=101');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Limit must be between 1 and 100');
    });

    it('should return 400 for limit less than 1', async () => {
      const response = await request(app)
        .get('/api/herbs?limit=0');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Limit must be between 1 and 100');
    });

    it('should return 400 for empty category', async () => {
      const response = await request(app)
        .get('/api/herbs?category=');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Category cannot be empty');
    });

    it('should return 400 for empty search query', async () => {
      const response = await request(app)
        .get('/api/herbs?search=');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Search query cannot be empty');
    });

    it('should return 400 for invalid language parameter', async () => {
      const response = await request(app)
        .get('/api/herbs?lang=es');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Language must be either "en" or "mr"');
    });

    it('should return empty array when no herbs match filter', async () => {
      Herb.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      });

      Herb.countDocuments.mockResolvedValue(0);

      const response = await request(app)
        .get('/api/herbs?category=non-existent');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.herbs).toEqual([]);
      expect(response.body.data.pagination.total).toBe(0);
    });

    it('should return 500 for unexpected errors', async () => {
      Herb.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockRejectedValue(new Error('Database error'))
      });

      const response = await request(app)
        .get('/api/herbs');

      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Failed to retrieve herbs');
    });

    it('should handle pagination with default values', async () => {
      const mockHerbs = [{ slug: 'herb1', commonName: 'Herb 1' }];

      Herb.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockHerbs)
      });

      Herb.countDocuments.mockResolvedValue(1);

      const response = await request(app)
        .get('/api/herbs');

      expect(response.status).toBe(200);
      expect(response.body.data.pagination).toEqual({
        total: 1,
        page: 1,
        limit: 20,
        pages: 1
      });

      const findChain = Herb.find();
      expect(findChain.skip).toHaveBeenCalledWith(0);
      expect(findChain.limit).toHaveBeenCalledWith(20);
    });
  });
});
