const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const Payment = require('../models/Payment');
const Topic = require('../models/Topic');

class AdminService {
  /**
   * Get platform statistics
   * @returns {Promise<{totalUsers: number, totalTopics: number, totalEnrollments: number, revenue: number}>}
   */
  async getStats() {
    const [totalUsers, totalTopics, totalEnrollments, payments] = await Promise.all([
      User.countDocuments(),
      Topic.countDocuments(),
      Enrollment.countDocuments(),
      Payment.find({ status: 'paid' })
    ]);

    // Calculate total revenue from paid payments
    const revenue = payments.reduce((sum, payment) => sum + payment.amount, 0);

    return {
      totalUsers,
      totalTopics,
      totalEnrollments,
      revenue
    };
  }

  /**
   * Get users with pagination and filtering
   * @param {Object} pagination - Pagination options { page, limit }
   * @param {Object} filters - Filter options { role, registrationDate }
   * @returns {Promise<{users: Array, total: number, page: number}>}
   */
  async getUsers(pagination = {}, filters = {}) {
    const page = parseInt(pagination.page) || 1;
    const limit = Math.min(parseInt(pagination.limit) || 20, 100);
    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    
    if (filters.role) {
      query.role = filters.role;
    }

    if (filters.registrationDate) {
      const date = new Date(filters.registrationDate);
      if (!isNaN(date.getTime())) {
        // Filter for users registered on or after this date
        query.createdAt = { $gte: date };
      }
    }

    const [users, total] = await Promise.all([
      User.find(query)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments(query)
    ]);

    return {
      users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  /**
   * Update user data
   * @param {string} userId - User's ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} Updated user object
   * @throws {Error} UserNotFoundError, ValidationError
   */
  async updateUser(userId, updates) {
    // Allowed fields for admin to update
    const allowedUpdates = ['name', 'email', 'role', 'preferredLang'];
    const updateFields = {};

    for (const key of allowedUpdates) {
      if (updates[key] !== undefined) {
        updateFields[key] = updates[key];
      }
    }

    if (Object.keys(updateFields).length === 0) {
      const error = new Error('No valid fields to update');
      error.name = 'ValidationError';
      error.statusCode = 400;
      throw error;
    }

    // Don't allow updating password through this method
    if (updates.password !== undefined) {
      const error = new Error('Password cannot be updated through this endpoint');
      error.name = 'ValidationError';
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      const error = new Error('User not found');
      error.name = 'UserNotFoundError';
      error.statusCode = 404;
      throw error;
    }

    return user.toObject();
  }

  /**
   * Delete user account
   * @param {string} userId - User's ID
   * @returns {Promise<{deleted: boolean}>}
   * @throws {Error} UserNotFoundError
   */
  async deleteUser(userId) {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      const error = new Error('User not found');
      error.name = 'UserNotFoundError';
      error.statusCode = 404;
      throw error;
    }

    // Clean up related data
    await Promise.all([
      Enrollment.deleteMany({ userId }),
      Payment.deleteMany({ userId })
      // Note: We keep progress, bookmarks, notes for data integrity
      // but they could be deleted if needed
    ]);

    return { deleted: true };
  }

  /**
   * Get all courses for admin management
   * @param {Object} pagination - Pagination options { page, limit }
   * @returns {Promise<{courses: Array, total: number, page: number, limit: number, totalPages: number}>}
   */
  async getCourses(pagination = {}) {
    const page = parseInt(pagination.page, 10) || 1;
    const limit = Math.min(parseInt(pagination.limit, 10) || 20, 100);
    const skip = (page - 1) * limit;

    const [courses, total] = await Promise.all([
      Course.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Course.countDocuments()
    ]);

    return {
      courses,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  /**
   * Create new course
   * @param {Object} courseData - Course data
   * @returns {Promise<Object>} Created course
   * @throws {Error} ValidationError
   */
  async createCourse(courseData) {
    const course = new Course(courseData);
    await course.save();
    return course.toObject();
  }

  /**
   * Update course
   * @param {string} courseId - Course's ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} Updated course
   * @throws {Error} CourseNotFoundError, ValidationError
   */
  async updateCourse(courseId, updates) {
    // Don't allow updating enrollmentCount through this method
    if (updates.enrollmentCount !== undefined) {
      delete updates.enrollmentCount;
    }

    const course = await Course.findById(courseId);

    if (!course) {
      const error = new Error('Course not found');
      error.name = 'CourseNotFoundError';
      error.statusCode = 404;
      throw error;
    }

    // Apply updates
    Object.keys(updates).forEach(key => {
      course[key] = updates[key];
    });

    await course.save();
    return course.toObject();
  }

  /**
   * Delete course
   * @param {string} courseId - Course's ID
   * @returns {Promise<{deleted: boolean}>}
   * @throws {Error} CourseNotFoundError
   */
  async deleteCourse(courseId) {
    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
      const error = new Error('Course not found');
      error.name = 'CourseNotFoundError';
      error.statusCode = 404;
      throw error;
    }

    // Clean up related data
    await Promise.all([
      Enrollment.deleteMany({ courseId }),
      Payment.deleteMany({ courseId })
    ]);

    return { deleted: true };
  }
}

module.exports = new AdminService();
