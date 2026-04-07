const request = require('supertest');
const express = require('express');
const adminRoutes = require('./admin');
const AdminService = require('../services/AdminService');

jest.mock('../services/AdminService');
jest.mock('../middleware/auth', () => ({
  authenticate: (req, res, next) => {
    if (req.headers.authorization === 'Bearer valid-token') {
      req.user = { userId: 'admin123', role: 'admin' };
      next();
    } else if (req.headers.authorization === 'Bearer student-token') {
      req.user = { userId: 'student123', role: 'student' };
      next();
    } else {
      res.status(401).json({
        status: 'error',
        message: 'No token provided',
        errors: ['Authorization header must be in format: Bearer <token>']
      });
    }
  },
  authorize: (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({
          status: 'error',
          message: 'Authentication required',
          errors: ['User not authenticated']
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          status: 'error',
          message: 'Access denied',
          errors: ['Insufficient permissions']
        });
      }

      next();
    };
  }
}));

describe('Admin Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/admin', adminRoutes);
    jest.clearAllMocks();
  });

  describe('GET /api/admin/stats', () => {
    it('should retrieve platform statistics successfully', async () => {
      const mockStats = {
        totalUsers: 150,
        totalTopics: 221,
        totalEnrollments: 450,
        revenue: 125000
      };

      AdminService.getStats.mockResolvedValue(mockStats);

      const response = await request(app)
        .get('/api/admin/stats')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Statistics retrieved successfully');
      expect(response.body.data.stats).toEqual(mockStats);
      expect(AdminService.getStats).toHaveBeenCalled();
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .get('/api/admin/stats');

      expect(response.status).toBe(401);
      expect(response.body.status).toBe('error');
      expect(AdminService.getStats).not.toHaveBeenCalled();
    });

    it('should return 403 when user is not admin', async () => {
      const response = await request(app)
        .get('/api/admin/stats')
        .set('Authorization', 'Bearer student-token');

      expect(response.status).toBe(403);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Access denied');
      expect(AdminService.getStats).not.toHaveBeenCalled();
    });

    it('should return 500 on unexpected error', async () => {
      AdminService.getStats.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/api/admin/stats')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Failed to retrieve statistics');
    });
  });

  describe('GET /api/admin/users', () => {
    it('should retrieve users with pagination successfully', async () => {
      const mockResult = {
        users: [
          { _id: 'user1', name: 'John Doe', email: 'john@example.com', role: 'student' },
          { _id: 'user2', name: 'Jane Smith', email: 'jane@example.com', role: 'student' }
        ],
        total: 50,
        page: 1,
        limit: 20,
        totalPages: 3
      };

      AdminService.getUsers.mockResolvedValue(mockResult);

      const response = await request(app)
        .get('/api/admin/users?page=1&limit=20')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Users retrieved successfully');
      expect(response.body.data.users).toHaveLength(2);
      expect(response.body.data.total).toBe(50);
      expect(AdminService.getUsers).toHaveBeenCalledWith(
        { page: '1', limit: '20' },
        {}
      );
    });

    it('should filter users by role', async () => {
      const mockResult = {
        users: [
          { _id: 'admin1', name: 'Admin User', email: 'admin@example.com', role: 'admin' }
        ],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1
      };

      AdminService.getUsers.mockResolvedValue(mockResult);

      const response = await request(app)
        .get('/api/admin/users?role=admin')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(200);
      expect(response.body.data.users).toHaveLength(1);
      expect(AdminService.getUsers).toHaveBeenCalledWith(
        {},
        { role: 'admin' }
      );
    });

    it('should return 400 for invalid page parameter', async () => {
      const response = await request(app)
        .get('/api/admin/users?page=0')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
      expect(AdminService.getUsers).not.toHaveBeenCalled();
    });

    it('should return 400 for invalid limit parameter', async () => {
      const response = await request(app)
        .get('/api/admin/users?limit=200')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
      expect(AdminService.getUsers).not.toHaveBeenCalled();
    });

    it('should return 403 when user is not admin', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', 'Bearer student-token');

      expect(response.status).toBe(403);
      expect(response.body.status).toBe('error');
      expect(AdminService.getUsers).not.toHaveBeenCalled();
    });
  });

  describe('PATCH /api/admin/users/:id', () => {
    it('should update user successfully', async () => {
      const mockUser = {
        _id: 'user123',
        name: 'Updated Name',
        email: 'updated@example.com',
        role: 'admin'
      };

      AdminService.updateUser.mockResolvedValue(mockUser);

      const response = await request(app)
        .patch('/api/admin/users/507f1f77bcf86cd799439011')
        .set('Authorization', 'Bearer valid-token')
        .send({ name: 'Updated Name', role: 'admin' });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('User updated successfully');
      expect(response.body.data.user).toEqual(mockUser);
      expect(AdminService.updateUser).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        { name: 'Updated Name', role: 'admin' }
      );
    });

    it('should return 400 for invalid user ID format', async () => {
      const response = await request(app)
        .patch('/api/admin/users/invalid-id')
        .set('Authorization', 'Bearer valid-token')
        .send({ name: 'Updated Name' });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
      expect(AdminService.updateUser).not.toHaveBeenCalled();
    });

    it('should return 400 for invalid email format', async () => {
      const response = await request(app)
        .patch('/api/admin/users/507f1f77bcf86cd799439011')
        .set('Authorization', 'Bearer valid-token')
        .send({ email: 'invalid-email' });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
      expect(AdminService.updateUser).not.toHaveBeenCalled();
    });

    it('should return 404 when user not found', async () => {
      const error = new Error('User not found');
      error.name = 'UserNotFoundError';
      AdminService.updateUser.mockRejectedValue(error);

      const response = await request(app)
        .patch('/api/admin/users/507f1f77bcf86cd799439011')
        .set('Authorization', 'Bearer valid-token')
        .send({ name: 'Updated Name' });

      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('User not found');
    });

    it('should return 400 for validation error', async () => {
      const error = new Error('No valid fields to update');
      error.name = 'ValidationError';
      AdminService.updateUser.mockRejectedValue(error);

      const response = await request(app)
        .patch('/api/admin/users/507f1f77bcf86cd799439011')
        .set('Authorization', 'Bearer valid-token')
        .send({ invalidField: 'value' });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
    });

    it('should return 403 when user is not admin', async () => {
      const response = await request(app)
        .patch('/api/admin/users/507f1f77bcf86cd799439011')
        .set('Authorization', 'Bearer student-token')
        .send({ name: 'Updated Name' });

      expect(response.status).toBe(403);
      expect(response.body.status).toBe('error');
      expect(AdminService.updateUser).not.toHaveBeenCalled();
    });
  });

  describe('DELETE /api/admin/users/:id', () => {
    it('should delete user successfully', async () => {
      AdminService.deleteUser.mockResolvedValue({ deleted: true });

      const response = await request(app)
        .delete('/api/admin/users/507f1f77bcf86cd799439011')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('User deleted successfully');
      expect(response.body.data.deleted).toBe(true);
      expect(AdminService.deleteUser).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    });

    it('should return 400 for invalid user ID format', async () => {
      const response = await request(app)
        .delete('/api/admin/users/invalid-id')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
      expect(AdminService.deleteUser).not.toHaveBeenCalled();
    });

    it('should return 404 when user not found', async () => {
      const error = new Error('User not found');
      error.name = 'UserNotFoundError';
      AdminService.deleteUser.mockRejectedValue(error);

      const response = await request(app)
        .delete('/api/admin/users/507f1f77bcf86cd799439011')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('User not found');
    });

    it('should return 403 when user is not admin', async () => {
      const response = await request(app)
        .delete('/api/admin/users/507f1f77bcf86cd799439011')
        .set('Authorization', 'Bearer student-token');

      expect(response.status).toBe(403);
      expect(response.body.status).toBe('error');
      expect(AdminService.deleteUser).not.toHaveBeenCalled();
    });
  });

  describe('POST /api/admin/courses', () => {
    it('should create course successfully', async () => {
      const mockCourse = {
        _id: 'course123',
        slug: 'new-course',
        title: 'New Course',
        description: 'Course description',
        level: 'beginner',
        price: 999,
        isPaid: true,
        paymentMethods: ['upi', 'card']
      };

      AdminService.createCourse.mockResolvedValue(mockCourse);

      const response = await request(app)
        .post('/api/admin/courses')
        .set('Authorization', 'Bearer valid-token')
        .send({
          slug: 'new-course',
          title: 'New Course',
          description: 'Course description',
          level: 'beginner',
          price: 999,
          isPaid: true,
          paymentMethods: ['upi', 'card']
        });

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Course created successfully');
      expect(response.body.data.course).toEqual(mockCourse);
      expect(AdminService.createCourse).toHaveBeenCalledWith(expect.objectContaining({
        paymentMethods: ['upi', 'card']
      }));
    });

    it('should return 400 when slug is missing', async () => {
      const response = await request(app)
        .post('/api/admin/courses')
        .set('Authorization', 'Bearer valid-token')
        .send({
          title: 'New Course',
          description: 'Course description'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
      expect(AdminService.createCourse).not.toHaveBeenCalled();
    });

    it('should return 400 for invalid slug format', async () => {
      const response = await request(app)
        .post('/api/admin/courses')
        .set('Authorization', 'Bearer valid-token')
        .send({
          slug: 'Invalid Slug!',
          title: 'New Course',
          description: 'Course description'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
      expect(AdminService.createCourse).not.toHaveBeenCalled();
    });

    it('should return 400 for invalid paymentMethods value', async () => {
      const response = await request(app)
        .post('/api/admin/courses')
        .set('Authorization', 'Bearer valid-token')
        .send({
          slug: 'new-course',
          title: 'New Course',
          description: 'Course description',
          price: 999,
          isPaid: true,
          paymentMethods: ['cash']
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
      expect(AdminService.createCourse).not.toHaveBeenCalled();
    });

    it('should return 400 for duplicate slug', async () => {
      const error = new Error('Duplicate key error');
      error.code = 11000;
      AdminService.createCourse.mockRejectedValue(error);

      const response = await request(app)
        .post('/api/admin/courses')
        .set('Authorization', 'Bearer valid-token')
        .send({
          slug: 'existing-course',
          title: 'New Course',
          description: 'Course description'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Course with this slug already exists');
    });

    it('should return 403 when user is not admin', async () => {
      const response = await request(app)
        .post('/api/admin/courses')
        .set('Authorization', 'Bearer student-token')
        .send({
          slug: 'new-course',
          title: 'New Course',
          description: 'Course description'
        });

      expect(response.status).toBe(403);
      expect(response.body.status).toBe('error');
      expect(AdminService.createCourse).not.toHaveBeenCalled();
    });
  });

  describe('PUT /api/admin/courses/:id', () => {
    it('should update course successfully', async () => {
      const mockCourse = {
        _id: 'course123',
        slug: 'updated-course',
        title: 'Updated Course',
        description: 'Updated description',
        price: 1499
      };

      AdminService.updateCourse.mockResolvedValue(mockCourse);

      const response = await request(app)
        .put('/api/admin/courses/507f1f77bcf86cd799439011')
        .set('Authorization', 'Bearer valid-token')
        .send({
          title: 'Updated Course',
          description: 'Updated description',
          price: 1499
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Course updated successfully');
      expect(response.body.data.course).toEqual(mockCourse);
    });

    it('should return 400 for invalid course ID format', async () => {
      const response = await request(app)
        .put('/api/admin/courses/invalid-id')
        .set('Authorization', 'Bearer valid-token')
        .send({ title: 'Updated Course' });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
      expect(AdminService.updateCourse).not.toHaveBeenCalled();
    });

    it('should return 404 when course not found', async () => {
      const error = new Error('Course not found');
      error.name = 'CourseNotFoundError';
      AdminService.updateCourse.mockRejectedValue(error);

      const response = await request(app)
        .put('/api/admin/courses/507f1f77bcf86cd799439011')
        .set('Authorization', 'Bearer valid-token')
        .send({ title: 'Updated Course' });

      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Course not found');
    });

    it('should return 403 when user is not admin', async () => {
      const response = await request(app)
        .put('/api/admin/courses/507f1f77bcf86cd799439011')
        .set('Authorization', 'Bearer student-token')
        .send({ title: 'Updated Course' });

      expect(response.status).toBe(403);
      expect(response.body.status).toBe('error');
      expect(AdminService.updateCourse).not.toHaveBeenCalled();
    });
  });

  describe('DELETE /api/admin/courses/:id', () => {
    it('should delete course successfully', async () => {
      AdminService.deleteCourse.mockResolvedValue({ deleted: true });

      const response = await request(app)
        .delete('/api/admin/courses/507f1f77bcf86cd799439011')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Course deleted successfully');
      expect(response.body.data.deleted).toBe(true);
      expect(AdminService.deleteCourse).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    });

    it('should return 400 for invalid course ID format', async () => {
      const response = await request(app)
        .delete('/api/admin/courses/invalid-id')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
      expect(AdminService.deleteCourse).not.toHaveBeenCalled();
    });

    it('should return 404 when course not found', async () => {
      const error = new Error('Course not found');
      error.name = 'CourseNotFoundError';
      AdminService.deleteCourse.mockRejectedValue(error);

      const response = await request(app)
        .delete('/api/admin/courses/507f1f77bcf86cd799439011')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Course not found');
    });

    it('should return 403 when user is not admin', async () => {
      const response = await request(app)
        .delete('/api/admin/courses/507f1f77bcf86cd799439011')
        .set('Authorization', 'Bearer student-token');

      expect(response.status).toBe(403);
      expect(response.body.status).toBe('error');
      expect(AdminService.deleteCourse).not.toHaveBeenCalled();
    });
  });
});
