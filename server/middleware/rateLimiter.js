const rateLimit = require('express-rate-limit');
const config = require('../config/env');

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  skip: () => config.nodeEnv === 'development',
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again later',
    errors: ['Rate limit exceeded'],
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
