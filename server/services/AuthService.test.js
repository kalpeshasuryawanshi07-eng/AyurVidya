const AuthService = require('./AuthService');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Mock the User model
jest.mock('../models/User');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
    process.env.JWT_EXPIRES_IN = '7d';
  });

  describe('register', () => {
    it('should register a new user and return user with token', async () => {
      const mockUser = {
        _id: 'user123',
        name: 'Test User',
        email: 'test@example.com',
        role: 'student',
        toJSON: jest.fn().mockReturnValue({
          _id: 'user123',
          name: 'Test User',
          email: 'test@example.com',
          role: 'student'
        }),
        save: jest.fn().mockResolvedValue(true)
      };

      User.findOne.mockResolvedValue(null);
      User.mockImplementation(() => mockUser);

      const result = await AuthService.register('Test User', 'test@example.com', 'password123');

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockUser.save).toHaveBeenCalled();
      expect(result.user).toEqual({
        _id: 'user123',
        name: 'Test User',
        email: 'test@example.com',
        role: 'student'
      });
      expect(result.token).toBeDefined();
      expect(typeof result.token).toBe('string');
    });

    it('should throw DuplicateEmailError when email already exists', async () => {
      User.findOne.mockResolvedValue({ email: 'existing@example.com' });

      await expect(
        AuthService.register('Test User', 'existing@example.com', 'password123')
      ).rejects.toMatchObject({
        name: 'DuplicateEmailError',
        message: 'Email already registered',
        statusCode: 400
      });
    });

    it('should convert email to lowercase when checking duplicates', async () => {
      User.findOne.mockResolvedValue(null);
      const mockUser = {
        _id: 'user123',
        name: 'Test User',
        email: 'test@example.com',
        role: 'student',
        toJSON: jest.fn().mockReturnValue({}),
        save: jest.fn().mockResolvedValue(true)
      };
      User.mockImplementation(() => mockUser);

      await AuthService.register('Test User', 'TEST@EXAMPLE.COM', 'password123');

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    });
  });

  describe('login', () => {
    it('should login user with valid credentials and return user with token', async () => {
      const mockUser = {
        _id: 'user123',
        email: 'test@example.com',
        role: 'student',
        comparePassword: jest.fn().mockResolvedValue(true),
        toJSON: jest.fn().mockReturnValue({
          _id: 'user123',
          email: 'test@example.com',
          role: 'student'
        })
      };

      User.findOne.mockResolvedValue(mockUser);

      const result = await AuthService.login('test@example.com', 'password123');

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockUser.comparePassword).toHaveBeenCalledWith('password123');
      expect(result.user).toEqual({
        _id: 'user123',
        email: 'test@example.com',
        role: 'student'
      });
      expect(result.token).toBeDefined();
    });

    it('should throw InvalidCredentialsError when user not found', async () => {
      User.findOne.mockResolvedValue(null);

      await expect(
        AuthService.login('nonexistent@example.com', 'password123')
      ).rejects.toMatchObject({
        name: 'InvalidCredentialsError',
        message: 'Invalid email or password',
        statusCode: 401
      });
    });

    it('should throw InvalidCredentialsError when password is incorrect', async () => {
      const mockUser = {
        email: 'test@example.com',
        comparePassword: jest.fn().mockResolvedValue(false)
      };

      User.findOne.mockResolvedValue(mockUser);

      await expect(
        AuthService.login('test@example.com', 'wrongpassword')
      ).rejects.toMatchObject({
        name: 'InvalidCredentialsError',
        message: 'Invalid email or password',
        statusCode: 401
      });
    });

    it('should convert email to lowercase when finding user', async () => {
      const mockUser = {
        _id: 'user123',
        email: 'test@example.com',
        role: 'student',
        comparePassword: jest.fn().mockResolvedValue(true),
        toJSON: jest.fn().mockReturnValue({})
      };

      User.findOne.mockResolvedValue(mockUser);

      await AuthService.login('TEST@EXAMPLE.COM', 'password123');

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    });
  });

  describe('verifyToken', () => {
    it('should verify valid token and return userId and role', async () => {
      const token = jwt.sign(
        { userId: 'user123', role: 'student' },
        'test-secret',
        { expiresIn: '7d' }
      );

      const result = await AuthService.verifyToken(token);

      expect(result).toEqual({
        userId: 'user123',
        role: 'student'
      });
    });

    it('should throw InvalidTokenError for invalid token', async () => {
      await expect(
        AuthService.verifyToken('invalid-token')
      ).rejects.toMatchObject({
        name: 'InvalidTokenError',
        message: 'Invalid token',
        statusCode: 401
      });
    });

    it('should throw ExpiredTokenError for expired token', async () => {
      const token = jwt.sign(
        { userId: 'user123', role: 'student' },
        'test-secret',
        { expiresIn: '0s' }
      );

      // Wait a bit to ensure token expires
      await new Promise(resolve => setTimeout(resolve, 100));

      await expect(
        AuthService.verifyToken(token)
      ).rejects.toMatchObject({
        name: 'ExpiredTokenError',
        message: 'Token has expired',
        statusCode: 401
      });
    });
  });

  describe('getProfile', () => {
    it('should return user profile without password', async () => {
      const mockUser = {
        _id: 'user123',
        name: 'Test User',
        email: 'test@example.com',
        role: 'student',
        toJSON: jest.fn().mockReturnValue({
          _id: 'user123',
          name: 'Test User',
          email: 'test@example.com',
          role: 'student'
        })
      };

      User.findById.mockResolvedValue(mockUser);

      const result = await AuthService.getProfile('user123');

      expect(User.findById).toHaveBeenCalledWith('user123');
      expect(result).toEqual({
        _id: 'user123',
        name: 'Test User',
        email: 'test@example.com',
        role: 'student'
      });
    });

    it('should throw UserNotFoundError when user does not exist', async () => {
      User.findById.mockResolvedValue(null);

      await expect(
        AuthService.getProfile('nonexistent')
      ).rejects.toMatchObject({
        name: 'UserNotFoundError',
        message: 'User not found',
        statusCode: 404
      });
    });
  });

  describe('updateProfile', () => {
    it('should update user profile with valid fields', async () => {
      const mockUser = {
        _id: 'user123',
        name: 'Updated Name',
        preferredLang: 'mr',
        toJSON: jest.fn().mockReturnValue({
          _id: 'user123',
          name: 'Updated Name',
          preferredLang: 'mr'
        })
      };

      User.findByIdAndUpdate.mockResolvedValue(mockUser);

      const result = await AuthService.updateProfile('user123', {
        name: 'Updated Name',
        preferredLang: 'mr'
      });

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        'user123',
        { name: 'Updated Name', preferredLang: 'mr' },
        { new: true, runValidators: true }
      );
      expect(result).toEqual({
        _id: 'user123',
        name: 'Updated Name',
        preferredLang: 'mr'
      });
    });

    it('should only update allowed fields', async () => {
      const mockUser = {
        _id: 'user123',
        name: 'Updated Name',
        toJSON: jest.fn().mockReturnValue({
          _id: 'user123',
          name: 'Updated Name'
        })
      };

      User.findByIdAndUpdate.mockResolvedValue(mockUser);

      await AuthService.updateProfile('user123', {
        name: 'Updated Name',
        email: 'hacker@example.com', // Should be ignored
        role: 'admin' // Should be ignored
      });

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        'user123',
        { name: 'Updated Name' },
        { new: true, runValidators: true }
      );
    });

    it('should throw ValidationError when no valid fields provided', async () => {
      await expect(
        AuthService.updateProfile('user123', {
          email: 'hacker@example.com',
          role: 'admin'
        })
      ).rejects.toMatchObject({
        name: 'ValidationError',
        message: 'No valid fields to update',
        statusCode: 400
      });
    });

    it('should throw UserNotFoundError when user does not exist', async () => {
      User.findByIdAndUpdate.mockResolvedValue(null);

      await expect(
        AuthService.updateProfile('nonexistent', { name: 'New Name' })
      ).rejects.toMatchObject({
        name: 'UserNotFoundError',
        message: 'User not found',
        statusCode: 404
      });
    });
  });

  describe('_generateToken', () => {
    it('should generate token with correct payload', () => {
      const mockUser = {
        _id: 'user123',
        role: 'student'
      };

      const token = AuthService._generateToken(mockUser);
      const decoded = jwt.verify(token, 'test-secret');

      expect(decoded.userId).toBe('user123');
      expect(decoded.role).toBe('student');
      expect(decoded.exp).toBeDefined();
    });
  });
});
