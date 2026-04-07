const {
  AppError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  DatabaseError,
} = require('./errors');

describe('Custom Error Classes', () => {
  describe('AppError', () => {
    test('Creates error with message and status code', () => {
      const error = new AppError('Test error', 400);
      
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(400);
      expect(error.status).toBe('fail');
      expect(error.isOperational).toBe(true);
    });

    test('Sets status to "fail" for 4xx errors', () => {
      const error = new AppError('Client error', 404);
      expect(error.status).toBe('fail');
    });

    test('Sets status to "error" for 5xx errors', () => {
      const error = new AppError('Server error', 500);
      expect(error.status).toBe('error');
    });

    test('Captures stack trace', () => {
      const error = new AppError('Test error', 400);
      expect(error.stack).toBeDefined();
      expect(error.stack).toContain('Test error');
    });
  });

  describe('ValidationError', () => {
    test('Creates validation error with 400 status', () => {
      const error = new ValidationError('Validation failed');
      
      expect(error.message).toBe('Validation failed');
      expect(error.statusCode).toBe(400);
      expect(error.status).toBe('fail');
      expect(error.errors).toEqual([]);
    });

    test('Accepts array of error messages', () => {
      const errors = ['Email is required', 'Password too short'];
      const error = new ValidationError('Validation failed', errors);
      
      expect(error.errors).toEqual(errors);
    });

    test('Is operational error', () => {
      const error = new ValidationError('Validation failed');
      expect(error.isOperational).toBe(true);
    });
  });

  describe('NotFoundError', () => {
    test('Creates not found error with 404 status', () => {
      const error = new NotFoundError('Topic not found');
      
      expect(error.message).toBe('Topic not found');
      expect(error.statusCode).toBe(404);
      expect(error.status).toBe('fail');
      expect(error.errors).toEqual(['Topic not found']);
    });

    test('Uses default message when not provided', () => {
      const error = new NotFoundError();
      
      expect(error.message).toBe('Resource not found');
      expect(error.errors).toEqual(['Resource not found']);
    });

    test('Is operational error', () => {
      const error = new NotFoundError();
      expect(error.isOperational).toBe(true);
    });
  });

  describe('UnauthorizedError', () => {
    test('Creates unauthorized error with 401 status', () => {
      const error = new UnauthorizedError('Invalid credentials');
      
      expect(error.message).toBe('Invalid credentials');
      expect(error.statusCode).toBe(401);
      expect(error.status).toBe('fail');
      expect(error.errors).toEqual(['Invalid credentials']);
    });

    test('Uses default message when not provided', () => {
      const error = new UnauthorizedError();
      
      expect(error.message).toBe('Authentication required');
      expect(error.errors).toEqual(['Authentication required']);
    });

    test('Is operational error', () => {
      const error = new UnauthorizedError();
      expect(error.isOperational).toBe(true);
    });
  });

  describe('ForbiddenError', () => {
    test('Creates forbidden error with 403 status', () => {
      const error = new ForbiddenError('Admin access required');
      
      expect(error.message).toBe('Admin access required');
      expect(error.statusCode).toBe(403);
      expect(error.status).toBe('fail');
      expect(error.errors).toEqual(['Admin access required']);
    });

    test('Uses default message when not provided', () => {
      const error = new ForbiddenError();
      
      expect(error.message).toBe('Access forbidden');
      expect(error.errors).toEqual(['Access forbidden']);
    });

    test('Is operational error', () => {
      const error = new ForbiddenError();
      expect(error.isOperational).toBe(true);
    });
  });

  describe('DatabaseError', () => {
    test('Creates database error with 503 status', () => {
      const error = new DatabaseError('Connection timeout');
      
      expect(error.message).toBe('Connection timeout');
      expect(error.statusCode).toBe(503);
      expect(error.status).toBe('error');
      expect(error.errors).toEqual(['Service temporarily unavailable']);
    });

    test('Uses default message when not provided', () => {
      const error = new DatabaseError();
      
      expect(error.message).toBe('Database connection error');
      expect(error.errors).toEqual(['Service temporarily unavailable']);
    });

    test('Is operational error', () => {
      const error = new DatabaseError();
      expect(error.isOperational).toBe(true);
    });
  });

  describe('Error Inheritance', () => {
    test('All custom errors extend AppError', () => {
      expect(new ValidationError('test')).toBeInstanceOf(AppError);
      expect(new NotFoundError('test')).toBeInstanceOf(AppError);
      expect(new UnauthorizedError('test')).toBeInstanceOf(AppError);
      expect(new ForbiddenError('test')).toBeInstanceOf(AppError);
      expect(new DatabaseError('test')).toBeInstanceOf(AppError);
    });

    test('All custom errors extend Error', () => {
      expect(new ValidationError('test')).toBeInstanceOf(Error);
      expect(new NotFoundError('test')).toBeInstanceOf(Error);
      expect(new UnauthorizedError('test')).toBeInstanceOf(Error);
      expect(new ForbiddenError('test')).toBeInstanceOf(Error);
      expect(new DatabaseError('test')).toBeInstanceOf(Error);
    });
  });
});
