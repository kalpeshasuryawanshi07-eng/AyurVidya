const errorHandler = require('./errorHandler');
const {
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  DatabaseError,
} = require('./errors');

describe('Error Handler Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      path: '/api/test',
      method: 'GET',
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    
    // Suppress console.error during tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  describe('Custom Error Classes', () => {
    test('ValidationError returns 400 with validation errors', () => {
      const error = new ValidationError('Validation failed', ['Email is required', 'Password too short']);
      
      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 'fail',
        message: 'Validation failed',
        errors: ['Email is required', 'Password too short'],
      });
    });

    test('NotFoundError returns 404 with error message', () => {
      const error = new NotFoundError('Topic not found');
      
      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 'fail',
        message: 'Topic not found',
        errors: ['Topic not found'],
      });
    });

    test('UnauthorizedError returns 401 with error message', () => {
      const error = new UnauthorizedError('Invalid credentials');
      
      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        status: 'fail',
        message: 'Invalid credentials',
        errors: ['Invalid credentials'],
      });
    });

    test('ForbiddenError returns 403 with error message', () => {
      const error = new ForbiddenError('Admin access required');
      
      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        status: 'fail',
        message: 'Admin access required',
        errors: ['Admin access required'],
      });
    });

    test('DatabaseError returns 503 with service unavailable message', () => {
      const error = new DatabaseError();
      
      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(503);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Database connection error',
        errors: ['Service temporarily unavailable'],
      });
    });
  });

  describe('Mongoose Errors', () => {
    test('Mongoose ValidationError returns 400 with field errors', () => {
      const error = {
        name: 'ValidationError',
        errors: {
          email: { message: 'Email is required' },
          password: { message: 'Password must be at least 6 characters' },
        },
      };
      
      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Validation failed',
        errors: ['Email is required', 'Password must be at least 6 characters'],
      });
    });

    test('Mongoose duplicate key error returns 400', () => {
      const error = {
        code: 11000,
        keyPattern: { email: 1 },
      };
      
      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'email already exists',
        errors: ['Duplicate value for email'],
      });
    });
  });

  describe('JWT Errors', () => {
    test('JsonWebTokenError returns 401', () => {
      const error = {
        name: 'JsonWebTokenError',
        message: 'invalid signature',
      };
      
      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Invalid token',
        errors: ['Authentication failed'],
      });
    });

    test('TokenExpiredError returns 401', () => {
      const error = {
        name: 'TokenExpiredError',
        message: 'jwt expired',
      };
      
      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Token expired',
        errors: ['Please login again'],
      });
    });
  });

  describe('Database Connection Errors', () => {
    test('MongoNetworkError returns 503', () => {
      const error = {
        name: 'MongoNetworkError',
        message: 'connection timed out',
      };
      
      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(503);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Service temporarily unavailable',
        errors: ['Database connection error'],
      });
    });

    test('MongooseServerSelectionError returns 503', () => {
      const error = {
        name: 'MongooseServerSelectionError',
        message: 'Server selection timed out',
      };
      
      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(503);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Service temporarily unavailable',
        errors: ['Database connection error'],
      });
    });
  });

  describe('Generic Errors', () => {
    test('Generic error with statusCode returns that status', () => {
      const error = new Error('Bad request');
      error.statusCode = 400;
      
      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Bad request',
        errors: ['Bad request'],
      });
    });

    test('Generic error without statusCode returns 500', () => {
      const error = new Error('Something went wrong');
      
      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Internal server error',
        errors: ['Internal server error'],
      });
    });

    test('Error with custom errors array includes it in response', () => {
      const error = new Error('Multiple errors occurred');
      error.statusCode = 400;
      error.errors = ['Error 1', 'Error 2'];
      
      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Multiple errors occurred',
        errors: ['Error 1', 'Error 2'],
      });
    });
  });

  describe('Error Logging', () => {
    test('Logs error with stack trace and request details', () => {
      const error = new Error('Test error');
      error.stack = 'Error: Test error\n    at test.js:1:1';
      
      errorHandler(error, req, res, next);

      expect(console.error).toHaveBeenCalledWith('Error occurred:', expect.objectContaining({
        message: 'Test error',
        stack: expect.any(String),
        path: '/api/test',
        method: 'GET',
        timestamp: expect.any(String),
      }));
    });
  });

  describe('Sensitive Information Protection', () => {
    test('500 errors hide original message to prevent information exposure', () => {
      const error = new Error('Database password is incorrect: admin123');
      
      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Internal server error',
        errors: ['Internal server error'],
      });
      // Original message should not be in response
      expect(res.json).not.toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining('admin123'),
        })
      );
    });

    test('4xx errors preserve original message', () => {
      const error = new Error('Email already exists');
      error.statusCode = 400;
      
      errorHandler(error, req, res, next);

      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Email already exists',
        errors: ['Email already exists'],
      });
    });
  });

  describe('Response Format', () => {
    test('All errors return consistent JSON format with status, message, and errors', () => {
      const error = new ValidationError('Test validation error', ['Field error']);
      
      errorHandler(error, req, res, next);

      const response = res.json.mock.calls[0][0];
      expect(response).toHaveProperty('status');
      expect(response).toHaveProperty('message');
      expect(response).toHaveProperty('errors');
      expect(Array.isArray(response.errors)).toBe(true);
    });
  });
});
