const express = require('express');
const { param, query, validationResult } = require('express-validator');
const { authenticate } = require('../middleware/auth');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const LanguageService = require('../services/LanguageService');

const router = express.Router();

/**
 * Helper to get a flat list of lessons from a course object,
 * whether it uses the flat lessons array or modules/topics structure.
 */
const getVirtualLessons = (course) => {
  if (Array.isArray(course.lessons) && course.lessons.length > 0) {
    return course.lessons;
  }

  const flattenedArr = [];
  if (Array.isArray(course.modules)) {
    course.modules.forEach((mod, mIdx) => {
      if (Array.isArray(mod.topics)) {
        mod.topics.forEach((topic, tIdx) => {
          flattenedArr.push({
            ...topic,
            lessonId: topic.lessonId || `m${mIdx}-t${tIdx}`,
            title: topic.title || 'Untitled Topic',
            duration: topic.duration || 15
          });
        });
      }
    });
  }
  return flattenedArr;
};


/**
 * GET /api/courses
 * Get all available courses
 * Public route
 */
router.get(
  '/',
  [
    query('lang')
      .optional()
      .isIn(['en', 'mr'])
      .withMessage('Language must be either "en" or "mr"'),
    query('level')
      .optional()
      .isIn(['beginner', 'intermediate', 'advanced', '1st Year', '2nd Year', '3rd Year', '4th Year'])
      .withMessage('Level must be a valid academic year or skill level'),
    query('tag')
      .optional()
      .isString()
      .withMessage('Tag must be a string'),
    query('isFree')
      .optional()
      .isBoolean()
      .withMessage('isFree must be a boolean')
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: errors.array().map(err => err.msg)
        });
      }

      const { lang = 'en', level, tag, isFree } = req.query;

      // Build filter query
      const filter = {};
      if (level) {
        filter.level = level;
      }
      if (tag) {
        filter.tags = tag;
      }
      if (isFree !== undefined) {
        filter.isFree = isFree === 'true';
      }

      // Get all courses with filters
      const courses = await Course.find(filter).sort({ createdAt: -1 });

      // Apply language selection to each course
      const localizedCourses = courses.map(course => {
        const courseObj = course.toObject();
        return LanguageService.selectContent(courseObj, lang);
      });

      res.status(200).json({
        status: 'success',
        message: 'Courses retrieved successfully',
        data: { courses: localizedCourses }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve courses',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * GET /api/courses/my
 * Get user's enrolled courses
 * Protected route
 */
router.get(
  '/my',
  authenticate,
  [
    query('lang')
      .optional()
      .isIn(['en', 'mr'])
      .withMessage('Language must be either "en" or "mr"')
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: errors.array().map(err => err.msg)
        });
      }

      const { lang = 'en' } = req.query;
      const userId = req.user.userId;

      // Get user's enrollments
      const enrollments = await Enrollment.find({ userId })
        .populate('courseId')
        .sort({ enrolledAt: -1 });

      // Map enrollments to courses with progress
      const enrolledCourses = enrollments.map(enrollment => {
        const courseObj = enrollment.courseId.toObject();
        const localizedCourse = LanguageService.selectContent(courseObj, lang);
        
        return {
          ...localizedCourse,
          enrolledAt: enrollment.enrolledAt,
          progress: enrollment.progress,
          completedLessons: enrollment.completedLessons,
          lastAccessedAt: enrollment.lastAccessedAt
        };
      });

      res.status(200).json({
        status: 'success',
        message: 'Enrolled courses retrieved successfully',
        data: { courses: enrolledCourses }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve enrolled courses',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * GET /api/courses/:slug
 * Get course details by slug
 * Public route
 */
router.get(
  '/:slug',
  [
    param('slug')
      .trim()
      .notEmpty()
      .withMessage('Slug is required')
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .withMessage('Invalid slug format'),
    query('lang')
      .optional()
      .isIn(['en', 'mr'])
      .withMessage('Language must be either "en" or "mr"')
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: errors.array().map(err => err.msg)
        });
      }

      const { slug } = req.params;
      const { lang = 'en' } = req.query;

      // Find course by slug
      const course = await Course.findOne({ slug });

      if (!course) {
        return res.status(404).json({
          status: 'error',
          message: 'Course not found',
          errors: ['Course with the specified slug does not exist']
        });
      }

      // Apply language selection
      const courseObj = course.toObject();
      const localizedCourse = LanguageService.selectContent(courseObj, lang);

      // Ensure lessons array is populated for frontend (CertificatesPage, etc.)
      if (!localizedCourse.lessons || localizedCourse.lessons.length === 0) {
        localizedCourse.lessons = getVirtualLessons(courseObj);
      }

      // Check if user is enrolled (if authenticated)
      let isEnrolled = false;
      if (req.user) {
        const enrollment = await Enrollment.findOne({
          userId: req.user.userId,
          courseId: course._id
        });
        isEnrolled = !!enrollment;
      }

      res.status(200).json({
        status: 'success',
        message: 'Course retrieved successfully',
        data: { 
          course: {
            ...localizedCourse,
            isEnrolled
          }
        }
      });

    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve course',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * POST /api/courses/:slug/enroll
 * Enroll in a free course
 * Protected route
 */
router.post(
  '/:slug/enroll',
  authenticate,
  [
    param('slug')
      .trim()
      .notEmpty()
      .withMessage('Slug is required')
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .withMessage('Invalid slug format')
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: errors.array().map(err => err.msg)
        });
      }

      const { slug } = req.params;
      const userId = req.user.userId;

      // Find course by slug
      const course = await Course.findOne({ slug });

      if (!course) {
        return res.status(404).json({
          status: 'error',
          message: 'Course not found',
          errors: ['Course with the specified slug does not exist']
        });
      }

      // Check if course is free
      if (course.isPaid) {
        return res.status(400).json({
          status: 'error',
          message: 'Cannot enroll in paid course',
          errors: ['This course requires payment. Please use the payment endpoint.']
        });
      }

      // Check if already enrolled
      const existingEnrollment = await Enrollment.findOne({
        userId,
        courseId: course._id
      });

      if (existingEnrollment) {
        return res.status(400).json({
          status: 'error',
          message: 'Already enrolled',
          errors: ['You are already enrolled in this course']
        });
      }

      // Create enrollment
      const enrollment = new Enrollment({
        userId,
        courseId: course._id,
        enrolledAt: new Date()
      });

      await enrollment.save();

      // Increment enrollment count
      course.enrollmentCount += 1;
      await course.save();

      res.status(201).json({
        status: 'success',
        message: 'Successfully enrolled in course',
        data: { 
          enrollment: {
            courseId: course._id,
            courseSlug: course.slug,
            enrolledAt: enrollment.enrolledAt,
            progress: enrollment.progress
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to enroll in course',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * POST /api/courses/:slug/lessons/:lessonId/complete
 * Mark a lesson as complete
 * Protected route
 */
router.post(
  '/:slug/lessons/:lessonId/complete',
  authenticate,
  [
    param('slug')
      .trim()
      .notEmpty()
      .withMessage('Slug is required')
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .withMessage('Invalid slug format'),
    param('lessonId')
      .trim()
      .notEmpty()
      .withMessage('Lesson ID is required')
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: errors.array().map(err => err.msg)
        });
      }

      const { slug, lessonId } = req.params;
      const userId = req.user.userId;

      // Find course by slug
      const course = await Course.findOne({ slug });

      if (!course) {
        return res.status(404).json({
          status: 'error',
          message: 'Course not found',
          errors: ['Course with the specified slug does not exist']
        });
      }

      // Get virtual lessons list
      const lessons = getVirtualLessons(course);

      // Verify lesson exists in course
      const lessonExists = lessons.some(lesson => lesson.lessonId === lessonId);
      if (!lessonExists) {
        return res.status(404).json({
          status: 'error',
          message: 'Lesson not found',
          errors: ['Lesson does not exist in this course']
        });
      }


      // Find enrollment
      const enrollment = await Enrollment.findOne({
        userId,
        courseId: course._id
      });

      if (!enrollment) {
        return res.status(404).json({
          status: 'error',
          message: 'Enrollment not found',
          errors: ['You are not enrolled in this course']
        });
      }

      // Add lesson to completedLessons if not already completed
      if (!enrollment.completedLessons.includes(lessonId)) {
        enrollment.completedLessons.push(lessonId);
      }

      // Calculate progress percentage
      const totalLessons = lessons.length;
      const completedCount = enrollment.completedLessons.length;
      enrollment.progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;


      // Mark course as completed if 100% progress
      if (enrollment.progress === 100 && !enrollment.isCompleted) {
        enrollment.isCompleted = true;
        enrollment.completedAt = new Date();
      }

      // Update lastAccessedAt
      enrollment.lastAccessedAt = new Date();

      await enrollment.save();

      res.status(200).json({
        status: 'success',
        message: 'Lesson marked as complete',
        data: {
          lessonId,
          progress: enrollment.progress,
          completedLessons: enrollment.completedLessons,
          isCompleted: enrollment.isCompleted,
          completedAt: enrollment.completedAt
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to mark lesson as complete',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * GET /api/courses/:slug/progress
 * Get user's progress for a course
 * Protected route
 */
router.get(
  '/:slug/progress',
  authenticate,
  [
    param('slug')
      .trim()
      .notEmpty()
      .withMessage('Slug is required')
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .withMessage('Invalid slug format')
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: errors.array().map(err => err.msg)
        });
      }

      const { slug } = req.params;
      const userId = req.user.userId;

      // Find course by slug
      const course = await Course.findOne({ slug });

      if (!course) {
        return res.status(404).json({
          status: 'error',
          message: 'Course not found',
          errors: ['Course with the specified slug does not exist']
        });
      }

      // Find enrollment
      const enrollment = await Enrollment.findOne({
        userId,
        courseId: course._id
      });

      // Get virtual lessons to know total count
      const lessons = getVirtualLessons(course);

      if (!enrollment) {
        return res.status(200).json({
          status: 'success',
          message: 'User is not enrolled in this course',
          data: {
            courseSlug: course.slug,
            progress: 0,
            completedLessons: [],
            totalLessons: lessons.length,
            lastAccessedAt: null
          }
        });
      }

      // Update lastAccessedAt
      enrollment.lastAccessedAt = new Date();
      await enrollment.save();


      res.status(200).json({
        status: 'success',
        message: 'Progress retrieved successfully',
        data: {
          courseSlug: course.slug,
          progress: enrollment.progress,
          completedLessons: enrollment.completedLessons,
          totalLessons: lessons.length,
          lastAccessedAt: enrollment.lastAccessedAt
        }
      });

    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve progress',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

module.exports = router;
