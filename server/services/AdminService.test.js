const AdminService = require('./AdminService');
const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const Payment = require('../models/Payment');
const Topic = require('../models/Topic');

// Mock dependencies
jest.mock('../models/User');
jest.mock('../models/Course');
jest.mock('../models/Enrollment');
jest.mock('../models/Payment');
jest.mock('../models/Topic');

describe('AdminService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getStats', () => {
    it('should return platform statistics', async () => {
      const mockPayments = [
        { amount: 999, status: 'paid' },
        { amount: 1499, status: 'paid' },
        { amount: 799, status: 'paid' }
      ];

      User.countDocuments.mockResolvedValue(150);
      Topic.countDocuments.mockResolvedValue(221);
      Enrollment.countDocuments.mockResolvedValue(450);
      Payment.find.mockResolvedValue(mockPayments);

      const result = await AdminService.getStats();

      expect(User.countDocuments).toHaveBeenCalled();
      expect(Topic.countDocuments).toHaveBeenCalled();
      expect(Enrollment.countDocuments).toHaveBeenCalled();
      expect(Payment.find).toHaveBeenCalledWith({ status: 'paid' });
      expect(result).toEqual({
        totalUsers: 150,
        totalTopics: 221,
        totalEnrollments: 450,
        revenue: 3297
      });
    });

    it('should return zero revenue when no paid payments exist', async () => {
      User.countDocuments.mockResolvedValue(10);
      Topic.countDocuments.mockResolvedValue(50);
      Enrollment.countDocuments.mockResolvedValue(20);
      Payment.find.mockResolvedValue([]);

      const result = await AdminService.getStats();

      expect(result.revenue).toBe(0);
    });
  });

  describe('getUsers', () => {
    it('should return paginated users with default pagination', async () => {
      const mockUsers = [
        { _id: 'user1', name: 'User 1', email: 'user1@example.com', role: 'student' },
        { _id: 'user2', name: 'User 2', email: 'user2@example.com', role: 'student' }
      ];

      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockUsers)
      };

      User.find.mockReturnValue(mockQuery);
      User.countDocuments.mockResolvedValue(50);

      const result = await AdminService.getUsers();

      expect(User.find).toHaveBeenCalledWith({});
      expect(mockQuery.select).toHaveBeenCalledWith('-password');
      expect(mockQuery.sort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(mockQuery.skip).toHaveBeenCalledWith(0);
      expect(mockQuery.limit).toHaveBeenCalledWith(20);
      expect(result).toEqual({
        users: mockUsers,
        total: 50,
        page: 1,
        limit: 20,
        totalPages: 3
      });
    });

    it('should return paginated users with custom pagination', async () => {
      const mockUsers = [
        { _id: 'user3', name: 'User 3', email: 'user3@example.com', role: 'student' }
      ];

      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockUsers)
      };

      User.find.mockReturnValue(mockQuery);
      User.countDocuments.mockResolvedValue(50);

      const result = await AdminService.getUsers({ page: 2, limit: 10 });

      expect(mockQuery.skip).toHaveBeenCalledWith(10);
      expect(mockQuery.limit).toHaveBeenCalledWith(10);
      expect(result.page).toBe(2);
      expect(result.limit).toBe(10);
      expect(result.totalPages).toBe(5);
    });

    it('should enforce maximum limit of 100', async () => {
      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      };

      User.find.mockReturnValue(mockQuery);
      User.countDocuments.mockResolvedValue(0);

      await AdminService.getUsers({ page: 1, limit: 200 });

      expect(mockQuery.limit).toHaveBeenCalledWith(100);
    });

    it('should filter users by role', async () => {
      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      };

      User.find.mockReturnValue(mockQuery);
      User.countDocuments.mockResolvedValue(5);

      await AdminService.getUsers({}, { role: 'admin' });

      expect(User.find).toHaveBeenCalledWith({ role: 'admin' });
      expect(User.countDocuments).toHaveBeenCalledWith({ role: 'admin' });
    });

    it('should filter users by registration date', async () => {
      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      };

      User.find.mockReturnValue(mockQuery);
      User.countDocuments.mockResolvedValue(10);

      const registrationDate = '2024-01-01';
      await AdminService.getUsers({}, { registrationDate });

      expect(User.find).toHaveBeenCalledWith({
        createdAt: { $gte: new Date(registrationDate) }
      });
    });

    it('should ignore invalid registration date', async () => {
      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      };

      User.find.mockReturnValue(mockQuery);
      User.countDocuments.mockResolvedValue(10);

      await AdminService.getUsers({}, { registrationDate: 'invalid-date' });

      expect(User.find).toHaveBeenCalledWith({});
    });

    it('should combine role and registration date filters', async () => {
      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      };

      User.find.mockReturnValue(mockQuery);
      User.countDocuments.mockResolvedValue(3);

      const registrationDate = '2024-01-01';
      await AdminService.getUsers({}, { role: 'student', registrationDate });

      expect(User.find).toHaveBeenCalledWith({
        role: 'student',
        createdAt: { $gte: new Date(registrationDate) }
      });
    });
  });

  describe('updateUser', () => {
    it('should update user with valid fields', async () => {
      const mockUser = {
        _id: 'user123',
        name: 'Updated Name',
        email: 'updated@example.com',
        role: 'admin',
        toObject: jest.fn().mockReturnValue({
          _id: 'user123',
          name: 'Updated Name',
          email: 'updated@example.com',
          role: 'admin'
        })
      };

      const mockQuery = {
        select: jest.fn().mockResolvedValue(mockUser)
      };

      User.findByIdAndUpdate.mockReturnValue(mockQuery);

      const result = await AdminService.updateUser('user123', {
        name: 'Updated Name',
        email: 'updated@example.com',
        role: 'admin'
      });

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        'user123',
        { name: 'Updated Name', email: 'updated@example.com', role: 'admin' },
        { new: true, runValidators: true }
      );
      expect(mockQuery.select).toHaveBeenCalledWith('-password');
      expect(result).toEqual({
        _id: 'user123',
        name: 'Updated Name',
        email: 'updated@example.com',
        role: 'admin'
      });
    });

    it('should only update allowed fields', async () => {
      const mockUser = {
        _id: 'user123',
        name: 'Updated Name',
        toObject: jest.fn().mockReturnValue({
          _id: 'user123',
          name: 'Updated Name'
        })
      };

      const mockQuery = {
        select: jest.fn().mockResolvedValue(mockUser)
      };

      User.findByIdAndUpdate.mockReturnValue(mockQuery);

      await AdminService.updateUser('user123', {
        name: 'Updated Name',
        invalidField: 'should be ignored'
      });

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        'user123',
        { name: 'Updated Name' },
        { new: true, runValidators: true }
      );
    });

    it('should throw ValidationError when no valid fields provided', async () => {
      await expect(
        AdminService.updateUser('user123', {
          invalidField: 'value'
        })
      ).rejects.toMatchObject({
        name: 'ValidationError',
        message: 'No valid fields to update',
        statusCode: 400
      });
    });

    it('should throw ValidationError when trying to update password', async () => {
      await expect(
        AdminService.updateUser('user123', {
          name: 'Updated Name',
          password: 'newpassword'
        })
      ).rejects.toMatchObject({
        name: 'ValidationError',
        message: 'Password cannot be updated through this endpoint',
        statusCode: 400
      });
    });

    it('should throw UserNotFoundError when user does not exist', async () => {
      const mockQuery = {
        select: jest.fn().mockResolvedValue(null)
      };

      User.findByIdAndUpdate.mockReturnValue(mockQuery);

      await expect(
        AdminService.updateUser('nonexistent', { name: 'New Name' })
      ).rejects.toMatchObject({
        name: 'UserNotFoundError',
        message: 'User not found',
        statusCode: 404
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete user and related data', async () => {
      const mockUser = {
        _id: 'user123',
        name: 'Test User',
        email: 'test@example.com'
      };

      User.findByIdAndDelete.mockResolvedValue(mockUser);
      Enrollment.deleteMany.mockResolvedValue({ deletedCount: 3 });
      Payment.deleteMany.mockResolvedValue({ deletedCount: 2 });

      const result = await AdminService.deleteUser('user123');

      expect(User.findByIdAndDelete).toHaveBeenCalledWith('user123');
      expect(Enrollment.deleteMany).toHaveBeenCalledWith({ userId: 'user123' });
      expect(Payment.deleteMany).toHaveBeenCalledWith({ userId: 'user123' });
      expect(result).toEqual({ deleted: true });
    });

    it('should throw UserNotFoundError when user does not exist', async () => {
      User.findByIdAndDelete.mockResolvedValue(null);

      await expect(
        AdminService.deleteUser('nonexistent')
      ).rejects.toMatchObject({
        name: 'UserNotFoundError',
        message: 'User not found',
        statusCode: 404
      });

      expect(Enrollment.deleteMany).not.toHaveBeenCalled();
      expect(Payment.deleteMany).not.toHaveBeenCalled();
    });
  });

  describe('createCourse', () => {
    it('should create new course', async () => {
      const courseData = {
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test Description',
        level: 'beginner',
        price: 999,
        isPaid: true
      };

      const mockCourse = {
        _id: 'course123',
        ...courseData,
        save: jest.fn().mockResolvedValue(true),
        toObject: jest.fn().mockReturnValue({
          _id: 'course123',
          ...courseData
        })
      };

      Course.mockImplementation(() => mockCourse);

      const result = await AdminService.createCourse(courseData);

      expect(mockCourse.save).toHaveBeenCalled();
      expect(result).toEqual({
        _id: 'course123',
        ...courseData
      });
    });

    it('should throw ValidationError for invalid course data', async () => {
      const invalidCourseData = {
        slug: 'test-course'
        // Missing required fields
      };

      const mockCourse = {
        save: jest.fn().mockRejectedValue(new Error('Validation failed'))
      };

      Course.mockImplementation(() => mockCourse);

      await expect(
        AdminService.createCourse(invalidCourseData)
      ).rejects.toThrow('Validation failed');
    });
  });

  describe('updateCourse', () => {
    it('should update course with valid fields', async () => {
      const mockCourse = {
        _id: 'course123',
        title: 'Updated Course',
        price: 1499,
        toObject: jest.fn().mockReturnValue({
          _id: 'course123',
          title: 'Updated Course',
          price: 1499
        })
      };

      Course.findByIdAndUpdate.mockResolvedValue(mockCourse);

      const result = await AdminService.updateCourse('course123', {
        title: 'Updated Course',
        price: 1499
      });

      expect(Course.findByIdAndUpdate).toHaveBeenCalledWith(
        'course123',
        { title: 'Updated Course', price: 1499 },
        { new: true, runValidators: true }
      );
      expect(result).toEqual({
        _id: 'course123',
        title: 'Updated Course',
        price: 1499
      });
    });

    it('should not allow updating enrollmentCount', async () => {
      const mockCourse = {
        _id: 'course123',
        title: 'Updated Course',
        toObject: jest.fn().mockReturnValue({
          _id: 'course123',
          title: 'Updated Course'
        })
      };

      Course.findByIdAndUpdate.mockResolvedValue(mockCourse);

      await AdminService.updateCourse('course123', {
        title: 'Updated Course',
        enrollmentCount: 999 // Should be ignored
      });

      expect(Course.findByIdAndUpdate).toHaveBeenCalledWith(
        'course123',
        { title: 'Updated Course' },
        { new: true, runValidators: true }
      );
    });

    it('should throw CourseNotFoundError when course does not exist', async () => {
      Course.findByIdAndUpdate.mockResolvedValue(null);

      await expect(
        AdminService.updateCourse('nonexistent', { title: 'New Title' })
      ).rejects.toMatchObject({
        name: 'CourseNotFoundError',
        message: 'Course not found',
        statusCode: 404
      });
    });
  });

  describe('deleteCourse', () => {
    it('should delete course and related data', async () => {
      const mockCourse = {
        _id: 'course123',
        title: 'Test Course'
      };

      Course.findByIdAndDelete.mockResolvedValue(mockCourse);
      Enrollment.deleteMany.mockResolvedValue({ deletedCount: 5 });
      Payment.deleteMany.mockResolvedValue({ deletedCount: 3 });

      const result = await AdminService.deleteCourse('course123');

      expect(Course.findByIdAndDelete).toHaveBeenCalledWith('course123');
      expect(Enrollment.deleteMany).toHaveBeenCalledWith({ courseId: 'course123' });
      expect(Payment.deleteMany).toHaveBeenCalledWith({ courseId: 'course123' });
      expect(result).toEqual({ deleted: true });
    });

    it('should throw CourseNotFoundError when course does not exist', async () => {
      Course.findByIdAndDelete.mockResolvedValue(null);

      await expect(
        AdminService.deleteCourse('nonexistent')
      ).rejects.toMatchObject({
        name: 'CourseNotFoundError',
        message: 'Course not found',
        statusCode: 404
      });

      expect(Enrollment.deleteMany).not.toHaveBeenCalled();
      expect(Payment.deleteMany).not.toHaveBeenCalled();
    });
  });
});
