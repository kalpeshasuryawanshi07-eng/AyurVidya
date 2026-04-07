const { AppError } = require('./errors');

/**
 * Centralized Error Handling Middleware
 * 
 * Handles all errors in the application and formats them as consistent JSON responses.
 * Logs errors with stack traces and prevents sensitive information exposure.
 * 
 * Requirements: 18.1, 18.2, 18.3, 18.4, 18.5, 18.6, 18.7, 18.8, 18.9, 18.10
 */
const errorHandler = (err, req, res, next) => {
  // Log error with stack trace for debugging (Requirement 18.6)
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Mongoose validation error (Requirement 18.1)
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors,
    });
  }

  // Mongoose duplicate key error (Requirement 18.1)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      status: 'error',
      message: `${field} already exists`,
      errors: [`Duplicate value for ${field}`],
    });
  }

  // JWT errors (Requirement 18.2)
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token',
      errors: ['Authentication failed'],
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      message: 'Token expired',
      errors: ['Please login again'],
    });
  }

  // Database connection errors (Requirement 18.9)
  if (err.name === 'MongoNetworkError' || err.name === 'MongooseServerSelectionError') {
    return res.status(503).json({
      status: 'error',
      message: 'Service temporarily unavailable',
      errors: ['Database connection error'],
    });
  }

  // Custom application errors
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      errors: err.errors || [err.message],
    });
  }

  // Default error - prevent sensitive information exposure (Requirement 18.8)
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Internal server error' : err.message;
  
  // Format errors as JSON with status, message, and errors fields (Requirement 18.7)
  res.status(statusCode).json({
    status: 'error',
    message,
    errors: err.errors || [message],
  });
};

module.exports = errorHandler;
