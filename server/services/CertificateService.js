const Certificate = require('../models/Certificate');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');
const crypto = require('crypto');

class CertificateService {
  /**
   * Generate a unique certificate number
   * Format: AYUR-YYYY-XXXXXX (e.g., AYUR-2026-000123)
   */
  async generateCertificateNumber() {
    const year = new Date().getFullYear();
    const count = await Certificate.countDocuments();
    const sequence = String(count + 1).padStart(6, '0');
    return `AYUR-${year}-${sequence}`;
  }

  /**
   * Generate a unique verification code
   * Format: 16-character alphanumeric code
   */
  generateVerificationCode() {
    return crypto.randomBytes(8).toString('hex').toUpperCase();
  }

  /**
   * Calculate grade based on score
   */
  calculateGrade(score) {
    if (score >= 95) return 'A+';
    if (score >= 90) return 'A';
    if (score >= 85) return 'B+';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    return 'Pass';
  }

  /**
   * Check if user is eligible for certificate
   * User must complete 100% of lessons
   */
  async checkEligibility(userId, courseId) {
    const enrollment = await Enrollment.findOne({ userId, courseId });
    
    if (!enrollment) {
      const error = new Error('User is not enrolled in this course');
      error.name = 'NotEnrolledError';
      error.statusCode = 404;
      throw error;
    }

    if (enrollment.progress < 100) {
      const error = new Error('Course not completed. Complete all lessons to earn certificate.');
      error.name = 'CourseNotCompletedError';
      error.statusCode = 400;
      throw error;
    }

    return enrollment;
  }

  /**
   * Generate certificate for a user
   */
  async generateCertificate(userId, courseId, score = null) {
    // Check if certificate already exists
    const existingCertificate = await Certificate.findOne({ userId, courseId })
      .populate('userId', 'name email')
      .populate('courseId', 'title slug');
    
    if (existingCertificate) {
      return existingCertificate;
    }

    // Check eligibility
    const enrollment = await this.checkEligibility(userId, courseId);

    // Get course and user details
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    if (!course || !user) {
      const error = new Error('Course or user not found');
      error.name = 'NotFoundError';
      error.statusCode = 404;
      throw error;
    }

    // Generate certificate details
    const certificateNumber = await this.generateCertificateNumber();
    const verificationCode = this.generateVerificationCode();
    const grade = score ? this.calculateGrade(score) : 'Pass';

    // Create certificate
    const certificate = new Certificate({
      userId,
      courseId,
      certificateNumber,
      verificationCode,
      completionDate: new Date(),
      grade,
      score: score || enrollment.progress
    });

    await certificate.save();

    // Populate and return
    await certificate.populate('userId', 'name email');
    await certificate.populate('courseId', 'title slug');

    return certificate;
  }

  /**
   * Get user's certificate for a course
   */
  async getCertificate(userId, courseId) {
    const certificate = await Certificate.findOne({ userId, courseId })
      .populate('userId', 'name email')
      .populate('courseId', 'title slug');

    if (!certificate) {
      const error = new Error('Certificate not found');
      error.name = 'CertificateNotFoundError';
      error.statusCode = 404;
      throw error;
    }

    return certificate;
  }

  /**
   * Get all certificates for a user
   */
  async getUserCertificates(userId) {
    const certificates = await Certificate.find({ userId })
      .populate('userId', 'name email')
      .populate('courseId', 'title slug thumbnail')
      .sort({ issuedAt: -1 });

    return certificates;
  }

  /**
   * Verify certificate by certificate number or verification code
   */
  async verifyCertificate(identifier) {
    const certificate = await Certificate.findOne({
      $or: [
        { certificateNumber: identifier },
        { verificationCode: identifier }
      ]
    })
      .populate('userId', 'name email')
      .populate('courseId', 'title slug');

    if (!certificate) {
      const error = new Error('Certificate not found or invalid');
      error.name = 'InvalidCertificateError';
      error.statusCode = 404;
      throw error;
    }

    return {
      valid: true,
      certificate: {
        certificateNumber: certificate.certificateNumber,
        studentName: certificate.userId.name,
        courseName: certificate.courseId.title,
        issuedAt: certificate.issuedAt,
        completionDate: certificate.completionDate,
        grade: certificate.grade,
        verificationCode: certificate.verificationCode
      }
    };
  }

  /**
   * Get certificate statistics for admin
   */
  async getCertificateStats() {
    const totalCertificates = await Certificate.countDocuments();
    const certificatesThisMonth = await Certificate.countDocuments({
      issuedAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    });

    const gradeDistribution = await Certificate.aggregate([
      {
        $group: {
          _id: '$grade',
          count: { $sum: 1 }
        }
      }
    ]);

    return {
      totalCertificates,
      certificatesThisMonth,
      gradeDistribution
    };
  }
}

module.exports = new CertificateService();
