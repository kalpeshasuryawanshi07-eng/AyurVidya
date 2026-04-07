# Authentication Middleware

This directory contains the JWT authentication middleware for the Ayurveda Backend API.

## Overview

The authentication middleware provides JWT token validation and role-based access control for protected routes.

## Files

- **auth.js** - Main authentication middleware implementation
- **auth.test.js** - Comprehensive test suite for authentication middleware
- **auth.example.js** - Usage examples demonstrating how to use the middleware
- **errorHandler.js** - Centralized error handling middleware
- **errors.js** - Custom error classes for consistent error handling
- **errors.test.js** - Tests for custom error classes
- **errorHandler.test.js** - Tests for error handler middleware
- **rateLimiter.js** - Rate limiting middleware

## Authentication Middleware

### `authenticate`

Extracts and verifies JWT token from the Authorization header, attaches user data to the request object.

**Usage:**
```javascript
const { authenticate } = require('./middleware/auth');

router.get('/api/profile', authenticate, (req, res) => {
  // req.user is available: { userId, role }
  res.json({ user: req.user });
});
```

**Request Header:**
```
Authorization: Bearer <jwt_token>
```

**Success:**
- Attaches `req.user = { userId, role }` to request object
- Calls `next()` to proceed to route handler

**Errors:**
- **401 Unauthorized** - Missing or invalid Authorization header
- **401 Unauthorized** - Invalid token
- **401 Unauthorized** - Expired token

### `authorize`

Role-based access control middleware. Must be used after `authenticate` middleware.

**Usage:**
```javascript
const { authenticate, authorize } = require('./middleware/auth');

// Admin-only route
router.get('/api/admin/stats', 
  authenticate, 
  authorize('admin'), 
  (req, res) => {
    res.json({ stats: {} });
  }
);

// Multiple roles allowed
router.post('/api/bookmarks', 
  authenticate, 
  authorize('student', 'admin'), 
  (req, res) => {
    res.json({ success: true });
  }
);
```

**Success:**
- Calls `next()` if user has required role

**Errors:**
- **401 Unauthorized** - User not authenticated (req.user missing)
- **403 Forbidden** - User doesn't have required role

## Implementation Details

### Token Extraction

The middleware extracts the JWT token from the Authorization header:
1. Checks if Authorization header exists
2. Validates header format: `Bearer <token>`
3. Extracts token by removing "Bearer " prefix (7 characters)

### Token Verification

Uses `AuthService.verifyToken()` method which:
1. Verifies JWT signature using `JWT_SECRET` environment variable
2. Checks token expiration
3. Returns decoded payload: `{ userId, role }`

### Error Handling

All errors return consistent JSON format:
```json
{
  "status": "error",
  "message": "Error description",
  "errors": ["Detailed error message"]
}
```

## Testing

Run tests with:
```bash
npm test auth.test.js
```

Test coverage includes:
- Valid token authentication
- Missing Authorization header
- Invalid header format
- Invalid token
- Expired token
- Token extraction
- Role-based authorization
- Multiple roles
- Unauthenticated access to protected routes

## Requirements Satisfied

This middleware satisfies the following requirements:
- **2.5** - Validate JWT_Token on protected routes
- **2.6** - Return 401 Unauthorized for invalid/expired tokens
- **7.3** - Send JWT_Token in Authorization header for authenticated requests
- **14.5** - Require admin role for all admin endpoints
- **14.6** - Return 403 Forbidden for non-admin users accessing admin endpoints

## Related Files

- `server/services/AuthService.js` - Authentication service with token generation and verification
- `server/services/AuthService.test.js` - Tests for authentication service
- `server/models/User.js` - User model with role field

## Example Integration

See `auth.example.js` for complete examples of:
- Protected routes requiring authentication
- Student-only routes
- Admin-only routes
- Routes allowing multiple roles
- Public routes without authentication

## Error Handling

### Custom Error Classes

The middleware provides custom error classes for consistent error handling:

**ValidationError** - 400 Bad Request
```javascript
const { ValidationError } = require('./middleware/errors');

throw new ValidationError('Validation failed', [
  'Email is required',
  'Password must be at least 6 characters'
]);
```

**NotFoundError** - 404 Not Found
```javascript
const { NotFoundError } = require('./middleware/errors');

throw new NotFoundError('Topic not found');
```

**UnauthorizedError** - 401 Unauthorized
```javascript
const { UnauthorizedError } = require('./middleware/errors');

throw new UnauthorizedError('Invalid credentials');
```

**ForbiddenError** - 403 Forbidden
```javascript
const { ForbiddenError } = require('./middleware/errors');

throw new ForbiddenError('Admin access required');
```

**DatabaseError** - 503 Service Unavailable
```javascript
const { DatabaseError } = require('./middleware/errors');

throw new DatabaseError('Connection timeout');
```

### Error Handler Middleware

The error handler middleware catches all errors and formats them consistently:

**Features:**
- Logs errors with stack traces for debugging
- Handles Mongoose validation errors
- Handles JWT authentication errors
- Handles database connection errors
- Prevents sensitive information exposure in production
- Returns consistent JSON format: `{ status, message, errors }`

**Usage:**
```javascript
const errorHandler = require('./middleware/errorHandler');

// Add as last middleware in Express app
app.use(errorHandler);
```

**Error Response Format:**
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": ["Email is required", "Password too short"]
}
```
