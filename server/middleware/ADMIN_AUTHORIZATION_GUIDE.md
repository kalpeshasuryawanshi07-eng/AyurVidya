# Admin Authorization Guide

## Overview

Task 15.2 has been completed. The role-based authorization middleware is fully implemented and tested in `server/middleware/auth.js`.

## Implementation Summary

The `authorize` middleware factory function:
- ✅ Checks if the user is authenticated (returns 401 if not)
- ✅ Checks if the user's role matches one of the allowed roles
- ✅ Returns 403 Forbidden for non-admin users accessing admin routes
- ✅ Supports multiple allowed roles
- ✅ Has 100% test coverage

## Usage for Admin Routes (Task 15.3)

When implementing admin routes in task 15.3, use the following pattern:

```javascript
const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const AdminService = require('../services/AdminService');

// Admin-only route - requires authentication AND admin role
router.get('/api/admin/stats', 
  authenticate,           // First: verify JWT token
  authorize('admin'),     // Second: check for admin role
  async (req, res) => {
    try {
      const stats = await AdminService.getStats();
      res.json({ status: 'success', data: stats });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
);

// Another admin-only route
router.get('/api/admin/users',
  authenticate,
  authorize('admin'),
  async (req, res) => {
    // Implementation
  }
);

// Route allowing multiple roles (if needed)
router.get('/api/admin/reports',
  authenticate,
  authorize('admin', 'moderator'),  // Both admin and moderator can access
  async (req, res) => {
    // Implementation
  }
);

module.exports = router;
```

## Middleware Order

**CRITICAL:** Always use middleware in this order:
1. `authenticate` - Verifies JWT token and attaches `req.user`
2. `authorize('admin')` - Checks if `req.user.role` is 'admin'
3. Route handler - Your actual route logic

## Error Responses

The middleware automatically handles errors:

### 401 Unauthorized (from authenticate)
```json
{
  "status": "error",
  "message": "No token provided",
  "errors": ["Authorization header must be in format: Bearer <token>"]
}
```

### 403 Forbidden (from authorize)
```json
{
  "status": "error",
  "message": "Access denied",
  "errors": ["Insufficient permissions"]
}
```

## Requirements Satisfied

- ✅ **Requirement 14.5:** Backend_API SHALL require admin role for all admin endpoints
- ✅ **Requirement 14.6:** WHEN a non-admin user accesses admin endpoint, Backend_API SHALL return 403 Forbidden

## Test Coverage

All scenarios are tested in `server/middleware/auth.test.js`:
- ✅ Allow access when user has required role
- ✅ Deny access (403) when user doesn't have required role
- ✅ Return 401 when user is not authenticated
- ✅ Support multiple allowed roles
- ✅ Admin-only route access

## Next Steps

Task 15.3 will create the actual admin routes using this middleware:
- GET /api/admin/stats
- GET /api/admin/users
- PATCH /api/admin/users/:id
- DELETE /api/admin/users/:id
- POST /api/admin/courses
- PUT /api/admin/courses/:id
- DELETE /api/admin/courses/:id

All of these routes should use `authenticate` and `authorize('admin')` middleware.
