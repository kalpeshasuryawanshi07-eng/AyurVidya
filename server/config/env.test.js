describe('Environment Configuration', () => {
  // Test with actual loaded config since validation happens on require
  it('should load environment variables correctly', () => {
    const config = require('./env');

    expect(config.mongodbUri).toBeDefined();
    expect(config.jwtSecret).toBeDefined();
    expect(config.port).toBeDefined();
    expect(config.nodeEnv).toBeDefined();
  });

  it('should have correct config structure', () => {
    const config = require('./env');

    expect(config).toHaveProperty('port');
    expect(config).toHaveProperty('nodeEnv');
    expect(config).toHaveProperty('mongodbUri');
    expect(config).toHaveProperty('jwtSecret');
    expect(config).toHaveProperty('jwtExpiresIn');
    expect(config).toHaveProperty('corsOrigin');
    expect(config).toHaveProperty('razorpay');
    expect(config).toHaveProperty('rateLimit');
  });

  it('should have razorpay configuration', () => {
    const config = require('./env');

    expect(config.razorpay).toHaveProperty('keyId');
    expect(config.razorpay).toHaveProperty('keySecret');
  });

  it('should have rate limit configuration', () => {
    const config = require('./env');

    expect(config.rateLimit).toHaveProperty('windowMs');
    expect(config.rateLimit).toHaveProperty('maxRequests');
    expect(typeof config.rateLimit.windowMs).toBe('number');
    expect(typeof config.rateLimit.maxRequests).toBe('number');
  });

  it('should export all required configuration values', () => {
    const config = require('./env');

    // Verify all required fields are present
    const requiredFields = [
      'port',
      'nodeEnv',
      'mongodbUri',
      'jwtSecret',
      'jwtExpiresIn',
      'corsOrigin',
    ];

    requiredFields.forEach((field) => {
      expect(config[field]).toBeDefined();
    });
  });
});
