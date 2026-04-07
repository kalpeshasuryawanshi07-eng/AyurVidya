/**
 * Example usage of JWT authentication middleware
 * 
 * This file demonstrates how to use the authenticate and authorize middleware
 * in Express routes to protect endpoints and implement role-based access control.
 */

const express = require('express');
const { authenticate, authorize } = require('./auth');

const router = express.Router();

// Example 1: Protected route - requires authentication
// Any authenticated user (student or admin) can access
router.get('/api/profile', authenticate, (req, res) => {
  // req.user is available here with { userId, role }
  res.json({
    message: 'Profile data',
    user: req.user,
  });
});

// Example 2: Student-only route
// Only users with 'student' role can access
router.get('/api/courses/my', authenticate, authorize('student'), (req, res) => {
  res.json({
    message: 'My enrolled courses',
    userId: req.user.userId,
  });
});

// Example 3: Admin-only route
// Only users with 'admin' role can access
router.get('/api/admin/stats', authenticate, authorize('admin'), (req, res) => {
  res.json({
    message: 'Admin statistics',
    adminId: req.user.userId,
  });
});

// Example 4: Multiple roles allowed
// Both students and admins can access
router.post('/api/bookmarks', authenticate, authorize('student', 'admin'), (req, res) => {
  res.json({
    message: 'Bookmark created',
    userId: req.user.userId,
  });
});

// Example 5: Public route - no authentication required
router.get('/api/subjects', (req, res) => {
  res.json({
    message: 'Public subjects list',
  });
});

module.exports = router;

/**
 * Request Flow:
 * 
 * 1. Client sends request with Authorization header:
 *    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 * 
 * 2. authenticate middleware:
 *    - Extracts token from header
 *    - Calls AuthService.verifyToken(token)
 *    - Attaches user data to req.user = { userId, role }
 *    - Returns 401 if token is invalid/expired
 * 
 * 3. authorize middleware (if used):
 *    - Checks if req.user.role is in allowed roles
 *    - Returns 403 if user doesn't have permission
 * 
 * 4. Route handler executes with req.user available
 */
