/**
 * Middleware to check if user has verified their email address.
 * Use this for routes that require a verified account (e.g., viewing certificates, taking quizzes).
 */
const checkVerified = (req, res, next) => {
  // Assume authenticate middleware has already run and set req.user
  if (!req.user || !req.user.isVerified) {
    return res.status(403).json({
      status: 'error',
      message: 'Access denied. Please verify your email address to access this feature.',
      code: 'EMAIL_NOT_VERIFIED'
    });
  }
  next();
};

module.exports = checkVerified;
