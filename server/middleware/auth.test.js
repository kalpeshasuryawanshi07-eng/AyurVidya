const { authenticate, authorize } = require('./auth');
const AuthService = require('../services/AuthService');

// Mock AuthService
jest.mock('../services/AuthService');

describe('Authentication Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('authenticate', () => {
    it('should authenticate valid token and attach user data to request', async () => {
      // Arrange
      const token = 'valid.jwt.token';
      req.headers.authorization = `Bearer ${token}`;
      const mockUserData = { userId: 'user123', role: 'student' };
      AuthService.verifyToken.mockResolvedValue(mockUserData);

      // Act
      await authenticate(req, res, next);

      // Assert
      expect(AuthService.verifyToken).toHaveBeenCalledWith(token);
      expect(req.user).toEqual(mockUserData);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return 401 when Authorization header is missing', async () => {
      // Act
      await authenticate(req, res, next);

      // Assert
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'No token provided',
        errors: ['Authorization header must be in format: Bearer <token>'],
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 when Authorization header does not start with Bearer', async () => {
      // Arrange
      req.headers.authorization = 'InvalidFormat token123';

      // Act
      await authenticate(req, res, next);

      // Assert
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'No token provided',
        errors: ['Authorization header must be in format: Bearer <token>'],
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 when token is invalid', async () => {
      // Arrange
      const token = 'invalid.token';
      req.headers.authorization = `Bearer ${token}`;
      const error = new Error('Invalid token');
      error.name = 'InvalidTokenError';
      AuthService.verifyToken.mockRejectedValue(error);

      // Act
      await authenticate(req, res, next);

      // Assert
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Invalid token',
        errors: ['Invalid token'],
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 when token is expired', async () => {
      // Arrange
      const token = 'expired.token';
      req.headers.authorization = `Bearer ${token}`;
      const error = new Error('Token has expired');
      error.name = 'ExpiredTokenError';
      AuthService.verifyToken.mockRejectedValue(error);

      // Act
      await authenticate(req, res, next);

      // Assert
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Token has expired',
        errors: ['Token has expired'],
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should extract token correctly by removing Bearer prefix', async () => {
      // Arrange
      const token = 'my.jwt.token';
      req.headers.authorization = `Bearer ${token}`;
      AuthService.verifyToken.mockResolvedValue({ userId: 'user123', role: 'student' });

      // Act
      await authenticate(req, res, next);

      // Assert
      expect(AuthService.verifyToken).toHaveBeenCalledWith(token);
    });

    it('should handle admin role correctly', async () => {
      // Arrange
      const token = 'admin.token';
      req.headers.authorization = `Bearer ${token}`;
      const mockAdminData = { userId: 'admin123', role: 'admin' };
      AuthService.verifyToken.mockResolvedValue(mockAdminData);

      // Act
      await authenticate(req, res, next);

      // Assert
      expect(req.user).toEqual(mockAdminData);
      expect(req.user.role).toBe('admin');
      expect(next).toHaveBeenCalled();
    });
  });

  describe('authorize', () => {
    beforeEach(() => {
      req.user = { userId: 'user123', role: 'student' };
    });

    it('should allow access when user has required role', () => {
      // Arrange
      const middleware = authorize('student', 'admin');

      // Act
      middleware(req, res, next);

      // Assert
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should deny access when user does not have required role', () => {
      // Arrange
      const middleware = authorize('admin');

      // Act
      middleware(req, res, next);

      // Assert
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Access denied',
        errors: ['Insufficient permissions'],
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 when user is not authenticated', () => {
      // Arrange
      req.user = undefined;
      const middleware = authorize('student');

      // Act
      middleware(req, res, next);

      // Assert
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Authentication required',
        errors: ['User not authenticated'],
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should allow admin to access admin-only routes', () => {
      // Arrange
      req.user.role = 'admin';
      const middleware = authorize('admin');

      // Act
      middleware(req, res, next);

      // Assert
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should support multiple allowed roles', () => {
      // Arrange
      req.user.role = 'student';
      const middleware = authorize('student', 'admin', 'moderator');

      // Act
      middleware(req, res, next);

      // Assert
      expect(next).toHaveBeenCalled();
    });
  });
});
