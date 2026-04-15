const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const EmailService = require('./EmailService');

class AuthService {
  /**
   * Register a new user
   * @param {string} name - User's full name
   * @param {string} email - User's email address
   * @param {string} password - User's password
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

    // Create new user (isVerified defaults to true now)
    const user = new User({ name, email, password });
    await user.save();

    // Send optional welcome email
    try {
      await EmailService.sendWelcomeEmail(user.name, user.email);
    } catch (error) {
      console.error('Failed to send welcome email:', error.message);
    }

    // Generate token for auto-login
    const token = this._generateToken(user);

    return {
      user: user.toJSON(),
      token,
      message: 'Registration successful!'
    };
  }

  /**
   * Login user
   */
  async login(email, password) {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      const error = new Error('Invalid email or password');
      error.name = 'InvalidCredentialsError';
      error.statusCode = 401;
      throw error;
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      const error = new Error('Invalid email or password');
      error.name = 'InvalidCredentialsError';
      error.statusCode = 401;
      throw error;
    }

    // OTP check removed here

    const token = this._generateToken(user);

    return {
      user: user.toJSON(),
      token
    };
  }

  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return { userId: decoded.userId, role: decoded.role };
    } catch (error) {
      const err = new Error(error.name === 'TokenExpiredError' ? 'Token has expired' : 'Invalid token');
      err.name = error.name === 'TokenExpiredError' ? 'ExpiredTokenError' : 'InvalidTokenError';
      err.statusCode = 401;
      throw err;
    }
  }

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

  async updateProfile(userId, updates) {
    const allowed = ['name', 'preferredLang'];
    const updateFields = {};
    Object.keys(updates).forEach(key => { if (allowed.includes(key)) updateFields[key] = updates[key]; });

    if (Object.keys(updateFields).length === 0) {
      const error = new Error('No valid fields to update');
      error.name = 'ValidationError';
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findByIdAndUpdate(userId, updateFields, { new: true, runValidators: true });
    if (!user) {
      const error = new Error('User not found');
      error.name = 'UserNotFoundError';
      error.statusCode = 404;
      throw error;
    }
    return user.toJSON();
  }

  // verifyEmail and resendVerificationOtp methods removed

  async forgotPassword(email) {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return;
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();
    await EmailService.sendForgotPasswordEmail(user.name, user.email, resetToken);
  }

  async resetPassword(token, newPassword) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
      const error = new Error('Invalid or expired token');
      error.statusCode = 400;
      throw error;
    }
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    return user.toJSON();
  }

  _generateToken(user) {
    const payload = { userId: user._id.toString(), role: user.role };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
  }
}

module.exports = new AuthService();
