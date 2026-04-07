# Error Handling Implementation Guide

## Overview

This guide documents the centralized error handling system implemented for the Ayurveda Backend API. The system provides consistent error responses, custom error classes, comprehensive error logging, and protection against sensitive information exposure.

## Requirements Satisfied

This implementation satisfies all requirements from Requirement 18 (API Error Handling):

- **18.1** - Validation errors return 400 Bad Request with error details
- **18.2** - Authentication failures return 401 Unauthorized
- **18.3** - Authorization failures return 403 Forbidden
- **18.4** - Resource not found returns 404 Not Found
- **18.5** - Server errors return 500 Internal Server Error
- **18.6** - All errors logged with stack traces
- **18.7** - Consistent JSON format: `{ status, message, errors }`
- **18.8** - Sensitive information not exposed in error messages
- **18.9** - Database connection errors return 503 Service Unavailable
- **18.10** - Request body validation with detailed error messages

## Files Created/Modified

### New Files

1. **server/middleware/errors.js** - Custom error classes
2. **server/middleware/errors.test.js** - Tests for custom error classes
3. **server/middleware/errorHandler.test.js** - Tests for error handler middleware
4. **server/middleware/errors.example.js** - Usage examples
5. **server/middleware/ERROR_HANDLING_GUIDE.md** - This documentation

### Modified Files

1. **server/middleware/errorHandler.js** - Enhanced error handler middleware
2. **server/middleware/README.md** - Updated documentation

## Custom Error Classes

### AppError (Base Class)

Base class for all custom errors. Sets appropriate status codes and marks errors as operational.

```javascript
const { AppError } = require('./middleware/errors');

throw new AppError('Custom error message', 400);
```

### ValidationError (400 Bad Request)

Used for input validation failures.

```javascript
const { ValidationError } = require('./middleware/errors');

throw new ValidationError('Validation failed', [
  'Email is required',
  'Password must be at least 6 characters'
]);
```

### NotFoundError (404 Not Found)

Used when a requested resource doesn't exist.

```javascript
const { NotFoundError } = require('./middleware/errors');

throw new NotFoundError('Topic not found');
```

### UnauthorizedError (401 Unauthorized)

Used for authentication failures.

```javascript
const { UnauthorizedError } = require('./middleware/errors');

throw new UnauthorizedError('Invalid credentials');
```

### ForbiddenError (403 Forbidden)

Used for authorization failures (authenticated but not authorized).

```javascript
const { ForbiddenError } = require('./middleware/errors');

throw new ForbiddenError('Admin access required');
```

### DatabaseError (503 Service Unavailable)

Used for database connection errors.

```javascript
const { DatabaseError } = require('./middleware/errors');

throw new DatabaseError('Connection timeout');
```

## Error Handler Middleware

The error handler middleware is already integrated in `server.js` and catches all errors passed to `next(error)`.

### Features

1. **Comprehensive Error Handling**
   - Mongoose validation errors
   - Mongoose duplicate key errors
   - JWT authentication errors
   - Database connection errors
   - Custom application errors
   - Generic errors

2. **Error Logging**
   - Logs all errors with stack traces
   - Includes request path, method, and timestamp
   - Helps with debugging and monitoring

3. **Sensitive Information Protection**
   - 500 errors return generic message
   - Prevents exposure of internal details
   - 4xx errors preserve original message

4. **Consistent Response Format**
   ```json
   {
     "status": "error",
     "message": "Error description",
     "errors": ["Detailed error message"]
   }
   ```

## Usage in Route Handlers

### Basic Pattern

```javascript
router.get('/api/resource/:id', async (req, res, next) => {
  try {
    // Your route logic here
    const resource = await Model.findById(req.params.id);
    
    if (!resource) {
      throw new NotFoundError('Resource not found');
    }
    
    res.json({ resource });
  } catch (error) {
    next(error); // Pass to error handler
  }
});
```

### With Validation

```javascript
const { validationResult } = require('express-validator');
const { ValidationError } = require('./middleware/errors');

router.post('/api/resource', async (req, res, next) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg);
      throw new ValidationError('Validation failed', errorMessages);
    }
    
    // Create resource...
    res.status(201).json({ resource });
  } catch (error) {
    next(error);
  }
});
```

### With Authentication

```javascript
const { UnauthorizedError } = require('./middleware/errors');

router.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new UnauthorizedError('Invalid email or password');
    }
    
    const token = generateToken(user);
    res.json({ token, user });
  } catch (error) {
    next(error);
  }
});
```

### With Authorization

```javascript
const { ForbiddenError } = require('./middleware/errors');

router.delete('/api/admin/users/:id', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    // Additional authorization check
    if (req.params.id === req.user.userId) {
      throw new ForbiddenError('Cannot delete your own account');
    }
    
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});
```

## Error Response Examples

### Validation Error (400)

```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    "Email is required",
    "Password must be at least 6 characters"
  ]
}
```

### Unauthorized Error (401)

```json
{
  "status": "error",
  "message": "Invalid token",
  "errors": ["Authentication failed"]
}
```

### Forbidden Error (403)

```json
{
  "status": "error",
  "message": "Admin access required",
  "errors": ["Admin access required"]
}
```

### Not Found Error (404)

```json
{
  "status": "error",
  "message": "Topic not found",
  "errors": ["Topic not found"]
}
```

### Internal Server Error (500)

```json
{
  "status": "error",
  "message": "Internal server error",
  "errors": ["Internal server error"]
}
```

### Database Error (503)

```json
{
  "status": "error",
  "message": "Service temporarily unavailable",
  "errors": ["Database connection error"]
}
```

## Testing

All error handling functionality is thoroughly tested:

- **39 tests** covering all error classes and error handler scenarios
- **100% code coverage** for error handling modules
- Tests for all error types, logging, and response formats

Run tests:
```bash
npm test -- middleware/errors.test.js middleware/errorHandler.test.js
```

## Best Practices

1. **Always use try-catch blocks** in async route handlers
2. **Pass errors to next()** instead of handling inline
3. **Use appropriate error classes** for different scenarios
4. **Provide descriptive error messages** for better debugging
5. **Don't expose sensitive information** in error messages
6. **Log errors with context** (request path, method, timestamp)
7. **Test error scenarios** to ensure proper handling

## Migration Guide

To update existing routes to use the new error classes:

1. Import the error classes:
   ```javascript
   const { ValidationError, NotFoundError, UnauthorizedError, ForbiddenError } = require('./middleware/errors');
   ```

2. Replace inline error responses with error throws:
   ```javascript
   // Before
   if (!resource) {
     return res.status(404).json({
       status: 'error',
       message: 'Resource not found',
       errors: ['Resource not found']
     });
   }
   
   // After
   if (!resource) {
     throw new NotFoundError('Resource not found');
   }
   ```

3. Ensure all async handlers have try-catch blocks that call `next(error)`

## Monitoring and Debugging

Error logs include:
- Error message and stack trace
- Request path and HTTP method
- Timestamp
- Error type and status code

Example log output:
```
Error occurred: {
  message: 'Topic not found',
  stack: 'NotFoundError: Topic not found\n    at ...',
  path: '/api/topics/invalid-slug',
  method: 'GET',
  timestamp: '2024-03-31T10:30:45.123Z'
}
```

## Future Enhancements

Potential improvements for the error handling system:

1. **Error tracking service integration** (e.g., Sentry, Rollbar)
2. **Custom error codes** for client-side error handling
3. **Localized error messages** for bilingual support
4. **Rate limiting on error responses** to prevent abuse
5. **Error metrics and analytics** for monitoring
6. **Structured logging** with Winston or similar library

## Support

For questions or issues with error handling:
1. Check this guide and the example file (`errors.example.js`)
2. Review the test files for usage patterns
3. Consult the main README.md for API documentation
