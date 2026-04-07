const request = require('supertest');
const express = require('express');
const authRoutes = require('./auth');
const AuthService = require('../services/AuthService');
const { authenticate } = require('../middleware/auth');

// Mock dependencies
jest.mock('../services/AuthService');
jest.mock('../middleware/auth');

describe('Auth Routes', () => {
  let app;

  beforeEach(() => {
    // Create Express app for testing
    app = express();
    app.use(express.json());
    app.use('/api/auth', authRoutes);

    // Clear all mocks
    jest.clearAllMocks();

    // Mock authenticate middleware to pass through
    authenticate.mockImplementation((req, res, next) => {
      req.user = { userId: 'user123', role: 'student' };
      next();
    });
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user with valid data', async () => {
      const mockResult = {
        user: {
          _id: 'user123',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'student',
          preferredLang: 'en'
        },
        token: 'mock-jwt-token'
      };

      AuthService.register.mockResolvedValue(mockResult);

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.data).toEqual(mockResult);
      expect(AuthService.register).toHaveBeenCalledWith(
        'John Doe',
        'john@example.com',
        'password123'
      );
    });

    it('should return 400 when name is missing', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'john@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Name is required');
    });

    it('should return 400 when name is too short', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'J',
          email: 'john@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Name must be between 2 and 100 characters');
    });

    it('should return 400 when email is invalid', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'John Doe',
          email: 'invalid-email',
          password: 'password123'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Please provide a valid email address');
    });

    it('should return 400 when password is too short', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: '12345'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Password must be at least 6 characters long');
    });

    it('should return 400 when email already exists', async () => {
      const error = new Error('Email already registered');
      error.name = 'DuplicateEmailError';
      AuthService.register.mockRejectedValue(error);

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'John Doe',
          email: 'existing@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Email already registered');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login user with valid credentials', async () => {
      const mockResult = {
        user: {
          _id: 'user123',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'student'
        },
        token: 'mock-jwt-token'
      };

      AuthService.login.mockResolvedValue(mockResult);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data).toEqual(mockResult);
      expect(AuthService.login).toHaveBeenCalledWith('john@example.com', 'password123');
    });

    it('should return 400 when email is missing', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          password: 'password123'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Email is required');
    });

    it('should return 400 when password is missing', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john@example.com'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Password is required');
    });

    it('should return 401 when credentials are invalid', async () => {
      const error = new Error('Invalid email or password');
      error.name = 'InvalidCredentialsError';
      AuthService.login.mockRejectedValue(error);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Invalid email or password');
    });
  });

  describe('GET /api/auth/me', () => {
    it('should return current user profile', async () => {
      const mockUser = {
        _id: 'user123',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'student',
        preferredLang: 'en'
      };

      AuthService.getProfile.mockResolvedValue(mockUser);

      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.user).toEqual(mockUser);
      expect(AuthService.getProfile).toHaveBeenCalledWith('user123');
    });

    it('should return 404 when user not found', async () => {
      const error = new Error('User not found');
      error.name = 'UserNotFoundError';
      AuthService.getProfile.mockRejectedValue(error);

      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('User not found');
    });
  });

  describe('PATCH /api/auth/profile', () => {
    it('should update user profile with valid data', async () => {
      const mockUpdatedUser = {
        _id: 'user123',
        name: 'Jane Doe',
        email: 'john@example.com',
        role: 'student',
        preferredLang: 'mr'
      };

      AuthService.updateProfile.mockResolvedValue(mockUpdatedUser);

      const response = await request(app)
        .patch('/api/auth/profile')
        .set('Authorization', 'Bearer mock-token')
        .send({
          name: 'Jane Doe',
          preferredLang: 'mr'
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.user).toEqual(mockUpdatedUser);
      expect(AuthService.updateProfile).toHaveBeenCalledWith('user123', {
        name: 'Jane Doe',
        preferredLang: 'mr'
      });
    });

    it('should update only name when provided', async () => {
      const mockUpdatedUser = {
        _id: 'user123',
        name: 'Jane Doe',
        email: 'john@example.com',
        role: 'student',
        preferredLang: 'en'
      };

      AuthService.updateProfile.mockResolvedValue(mockUpdatedUser);

      const response = await request(app)
        .patch('/api/auth/profile')
        .set('Authorization', 'Bearer mock-token')
        .send({
          name: 'Jane Doe'
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(AuthService.updateProfile).toHaveBeenCalledWith('user123', {
        name: 'Jane Doe',
        preferredLang: undefined
      });
    });

    it('should return 400 when name is too short', async () => {
      const response = await request(app)
        .patch('/api/auth/profile')
        .set('Authorization', 'Bearer mock-token')
        .send({
          name: 'J'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Name must be between 2 and 100 characters');
    });

    it('should return 400 when preferredLang is invalid', async () => {
      const response = await request(app)
        .patch('/api/auth/profile')
        .set('Authorization', 'Bearer mock-token')
        .send({
          preferredLang: 'fr'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Language must be either "en" or "mr"');
    });

    it('should return 404 when user not found', async () => {
      const error = new Error('User not found');
      error.name = 'UserNotFoundError';
      AuthService.updateProfile.mockRejectedValue(error);

      const response = await request(app)
        .patch('/api/auth/profile')
        .set('Authorization', 'Bearer mock-token')
        .send({
          name: 'Jane Doe'
        });

      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('User not found');
    });
  });
});
