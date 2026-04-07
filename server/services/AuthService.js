const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

    // Create new user (password will be hashed by pre-save hook)
    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    // Generate JWT token
    const token = this._generateToken(user);

    return {
      user: user.toJSON(),
      token
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
