const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const EmailService = require('./EmailService');

class AuthService {
  /**
   * Register a new user with password hashing and duplicate email check
   * @param {string} name - User's full name
   * @param {string} email - User's email address
   * @param {string} password - User's password (will be hashed)
   * @returns {Promise<{user: Object, token: string}>} User object and JWT token
   * @throws {Error} ValidationError or DuplicateEmailError
   */
  async register(name, email, password) {
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      const error = new Error('Email already registered');
      error.name = 'DuplicateEmailError';
      error.statusCode = 400;
      throw error;
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    // Create new user (password will be hashed by pre-save hook)
    const user = new User({
      name,
      email,
      password,
      verificationToken,
      verificationTokenExpires
    });

    await user.save();

    // Send verification email
    try {
      await EmailService.sendVerificationEmail(user.name, user.email, verificationToken);
    } catch (error) {
      console.error('Failed to send verification email:', error);
      // Don't throw, user still created, can resend later
    }

    return {
      user: user.toJSON(),
      message: 'Account created. Please check your email to verify.'
    };
  }

  /**
   * Login user with password verification and JWT generation
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise<{user: Object, token: string}>} User object and JWT token
   * @throws {Error} InvalidCredentialsError
   */
  async login(email, password) {
    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      const error = new Error('Invalid email or password');
      error.name = 'InvalidCredentialsError';
      error.statusCode = 401;
      throw error;
    }

    // Verify password using User model's comparePassword method
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      const error = new Error('Invalid email or password');
      error.name = 'InvalidCredentialsError';
      error.statusCode = 401;
      throw error;
    }

    // Check if user is verified
    if (!user.isVerified) {
      const error = new Error('Please verify your email address before logging in');
      error.name = 'EmailNotVerifiedError';
      error.statusCode = 403;
      throw error;
    }

    // Generate JWT token
    const token = this._generateToken(user);

    return {
      user: user.toJSON(),
      token
    };
  }

  /**
   * Verify JWT token and extract user information
   * @param {string} token - JWT token to verify
   * @returns {Promise<{userId: string, role: string}>} User ID and role
   * @throws {Error} InvalidTokenError or ExpiredTokenError
   */
  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      return {
        userId: decoded.userId,
        role: decoded.role
      };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        const expiredError = new Error('Token has expired');
        expiredError.name = 'ExpiredTokenError';
        expiredError.statusCode = 401;
        throw expiredError;
      }
      
      const invalidError = new Error('Invalid token');
      invalidError.name = 'InvalidTokenError';
      invalidError.statusCode = 401;
      throw invalidError;
    }
  }

  /**
   * Get user profile by user ID
   * @param {string} userId - User's ID
   * @returns {Promise<Object>} User object without password
   * @throws {Error} UserNotFoundError
   */
  async getProfile(userId) {
    const user = await User.findById(userId);
    
    if (!user) {
      const error = new Error('User not found');
      error.name = 'UserNotFoundError';
      error.statusCode = 404;
      throw error;
    }

    return user.toJSON();
  }

  /**
   * Update user profile
   * @param {string} userId - User's ID
   * @param {Object} updates - Fields to update (name, preferredLang)
   * @returns {Promise<Object>} Updated user object
   * @throws {Error} ValidationError or UserNotFoundError
   */
  async updateProfile(userId, updates) {
    // Only allow updating specific fields
    const allowedUpdates = ['name', 'preferredLang'];
    const updateFields = {};
    
    for (const key of allowedUpdates) {
      if (updates[key] !== undefined) {
        updateFields[key] = updates[key];
      }
    }

    // Prevent updating sensitive fields
    if (Object.keys(updateFields).length === 0) {
      const error = new Error('No valid fields to update');
      error.name = 'ValidationError';
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!user) {
      const error = new Error('User not found');
      error.name = 'UserNotFoundError';
      error.statusCode = 404;
      throw error;
    }

    return user.toJSON();
  }

  /**
   * Verify user's email with token
   * @param {string} token - Verification token from email
   */
  async verifyEmail(token) {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      const error = new Error('Invalid or expired verification token');
      error.name = 'InvalidTokenError';
      error.statusCode = 400;
      throw error;
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    // Send welcome email
    await EmailService.sendWelcomeEmail(user.name, user.email);

    return user.toJSON();
  }

  /**
   * Request password reset
   * @param {string} email - User's email
   */
  async forgotPassword(email) {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Don't reveal user existence
      return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 mins
    await user.save();

    // Send email with RAW token
    await EmailService.sendForgotPasswordEmail(user.name, user.email, resetToken);
  }

  /**
   * Reset password with token
   * @param {string} token - Reset token from email
   * @param {string} newPassword - New password
   */
  async resetPassword(token, newPassword) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      const error = new Error('Invalid or expired password reset token');
      error.name = 'InvalidTokenError';
      error.statusCode = 400;
      throw error;
    }

    user.password = newPassword; // Hashed by pre-save hook
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return user.toJSON();
  }

  /**
   * Generate JWT token for user
   * @private
   * @param {Object} user - User object
   * @returns {string} JWT token
   */
  _generateToken(user) {
    const payload = {
      userId: user._id.toString(),
      role: user.role
    };

    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  }
}

module.exports = new AuthService();
