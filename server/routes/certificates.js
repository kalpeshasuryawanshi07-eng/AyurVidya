const express = require('express');
const { param, query, validationResult } = require('express-validator');
const { authenticate } = require('../middleware/auth');
const CertificateService = require('../services/CertificateService');

const router = express.Router();

/**
 * POST /api/certificates/generate/:courseSlug
 * Generate certificate for completed course
 * Protected route
 */
router.post(
  '/generate/:courseSlug',
  authenticate,
  [
    param('courseSlug')
      .trim()
      .notEmpty()
      .withMessage('Course slug is required')
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .withMessage('Invalid course slug format')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: errors.array().map(err => err.msg)
        });
      }

      const { courseSlug } = req.params;
      const userId = req.user.userId;

      // Find course by slug
      const Course = require('../models/Course');
      const course = await Course.findOne({ slug: courseSlug });

      if (!course) {
        return res.status(404).json({
          status: 'error',
          message: 'Course not found',
          errors: ['Course with the specified slug does not exist']
        });
      }

      // Generate certificate
      const certificate = await CertificateService.generateCertificate(
        userId,
        course._id
      );

      res.status(201).json({
        status: 'success',
        message: 'Certificate generated successfully',
        data: { certificate }
      });
    } catch (error) {
      if (error.name === 'NotEnrolledError' || error.name === 'CourseNotCompletedError') {
        return res.status(error.statusCode).json({
          status: 'error',
          message: error.message,
          errors: [error.message]
        });
      }

      res.status(500).json({
        status: 'error',
        message: 'Failed to generate certificate',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * GET /api/certificates/my
 * Get all certificates for authenticated user
 * Protected route
 */
router.get(
  '/my',
  authenticate,
  async (req, res) => {
    try {
      const userId = req.user.userId;
      const certificates = await CertificateService.getUserCertificates(userId);

      res.status(200).json({
        status: 'success',
        message: 'Certificates retrieved successfully',
        data: { certificates }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve certificates',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * GET /api/certificates/course/:courseSlug
 * Get certificate for a specific course
 * Protected route
 */
router.get(
  '/course/:courseSlug',
  authenticate,
  [
    param('courseSlug')
      .trim()
      .notEmpty()
      .withMessage('Course slug is required')
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .withMessage('Invalid course slug format')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: errors.array().map(err => err.msg)
        });
      }

      const { courseSlug } = req.params;
      const userId = req.user.userId;

      // Find course by slug
      const Course = require('../models/Course');
      const course = await Course.findOne({ slug: courseSlug });

      if (!course) {
        return res.status(404).json({
          status: 'error',
          message: 'Course not found',
          errors: ['Course with the specified slug does not exist']
        });
      }

      const certificate = await CertificateService.getCertificate(userId, course._id);

      res.status(200).json({
        status: 'success',
        message: 'Certificate retrieved successfully',
        data: { certificate }
      });
    } catch (error) {
      if (error.name === 'CertificateNotFoundError') {
        return res.status(404).json({
          status: 'error',
          message: error.message,
          errors: [error.message]
        });
      }

      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve certificate',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * GET /api/certificates/verify/:identifier
 * Verify certificate by certificate number or verification code
 * Public route
 */
router.get(
  '/verify/:identifier',
  [
    param('identifier')
      .trim()
      .notEmpty()
      .withMessage('Certificate identifier is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: errors.array().map(err => err.msg)
        });
      }

      const { identifier } = req.params;
      const result = await CertificateService.verifyCertificate(identifier);

      res.status(200).json({
        status: 'success',
        message: 'Certificate verified successfully',
        data: result
      });
    } catch (error) {
      if (error.name === 'InvalidCertificateError') {
        return res.status(404).json({
          status: 'error',
          message: error.message,
          errors: [error.message]
        });
      }

      res.status(500).json({
        status: 'error',
        message: 'Failed to verify certificate',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

/**
 * GET /api/certificates/stats
 * Get certificate statistics (admin only)
 * Protected route - admin only
 */
router.get(
  '/stats',
  authenticate,
  async (req, res) => {
    try {
      // Check if user is admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          status: 'error',
          message: 'Access denied',
          errors: ['Admin access required']
        });
      }

      const stats = await CertificateService.getCertificateStats();

      res.status(200).json({
        status: 'success',
        message: 'Certificate statistics retrieved successfully',
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve certificate statistics',
        errors: ['An unexpected error occurred']
      });
    }
  }
);

module.exports = router;
