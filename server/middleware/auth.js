const AuthService = require('../services/AuthService');

/**
 * JWT Authentication Middleware
 * Extracts and verifies JWT token from Authorization header
 * Attaches user data to request object on successful verification
 * Returns 401 for invalid or expired tokens
 */
const authenticate = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: 'No token provided',
        errors: ['Authorization header must be in format: Bearer <token>'],
      });
    }

    // Extract token (remove "Bearer " prefix)
    const token = authHeader.substring(7);

    // Verify token using AuthService
    const decoded = await AuthService.verifyToken(token);

    // Attach user data to request object
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    // Handle token verification errors
    return res.status(401).json({
      status: 'error',
      message: error.message || 'Authentication failed',
      errors: [error.message || 'Invalid or expired token'],
    });
  }
};

/**
 * Role-based authorization middleware
 * Requires authenticate middleware to be used first
 * @param {string[]} allowedRoles - Array of roles allowed to access the route
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required',
        errors: ['User not authenticated'],
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied',
        errors: ['Insufficient permissions'],
      });
    }

    next();
  };
};

module.exports = { authenticate, authorize };
