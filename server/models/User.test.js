const mongoose = require('mongoose');
const User = require('./User');
const bcrypt = require('bcrypt');

// Mock MongoDB connection for testing
beforeAll(async () => {
  const baseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurveda-test';
  const mongoUri = `${baseUri}-${process.env.JEST_WORKER_ID || '1'}`;
  await mongoose.connect(mongoUri);
  await User.init();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('User Model', () => {
  describe('Schema Validation', () => {
    test('should create a valid user with all required fields', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser._id).toBeDefined();
      expect(savedUser.name).toBe(userData.name);
      expect(savedUser.email).toBe(userData.email.toLowerCase());
      expect(savedUser.password).not.toBe(userData.password); // Should be hashed
      expect(savedUser.role).toBe('student'); // Default role
      expect(savedUser.preferredLang).toBe('en'); // Default language
      expect(savedUser.createdAt).toBeDefined();
      expect(savedUser.updatedAt).toBeDefined();
    });

    test('should fail validation when name is missing', async () => {
      const user = new User({
        email: 'test@example.com',
        password: 'password123'
      });

      await expect(user.save()).rejects.toThrow();
    });

    test('should fail validation when email is missing', async () => {
      const user = new User({
        name: 'Test User',
        password: 'password123'
      });

      await expect(user.save()).rejects.toThrow();
    });

    test('should fail validation when password is missing', async () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com'
      });

      await expect(user.save()).rejects.toThrow();
    });

    test('should fail validation when name is too short', async () => {
      const user = new User({
        name: 'A',
        email: 'test@example.com',
        password: 'password123'
      });

      await expect(user.save()).rejects.toThrow();
    });

    test('should fail validation when name is too long', async () => {
      const user = new User({
        name: 'A'.repeat(101),
        email: 'test@example.com',
        password: 'password123'
      });

      await expect(user.save()).rejects.toThrow();
    });

    test('should fail validation when password is too short', async () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: '12345'
      });

      await expect(user.save()).rejects.toThrow();
    });

    test('should fail validation with invalid email format', async () => {
      const user = new User({
        name: 'Test User',
        email: 'invalid-email',
        password: 'password123'
      });

      await expect(user.save()).rejects.toThrow();
    });

    test('should convert email to lowercase', async () => {
      const user = new User({
        name: 'Test User',
        email: 'TEST@EXAMPLE.COM',
        password: 'password123'
      });

      const savedUser = await user.save();
      expect(savedUser.email).toBe('test@example.com');
    });

    test('should trim whitespace from name and email', async () => {
      const user = new User({
        name: '  Test User  ',
        email: '  test@example.com  ',
        password: 'password123'
      });

      const savedUser = await user.save();
      expect(savedUser.name).toBe('Test User');
      expect(savedUser.email).toBe('test@example.com');
    });
  });

  describe('Email Uniqueness Constraint', () => {
    test('should enforce unique email constraint', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      await new User(userData).save();

      const duplicateUser = new User({
        name: 'Another User',
        email: 'test@example.com',
        password: 'password456'
      });

      await expect(duplicateUser.save()).rejects.toThrow();
    });

    test('should enforce unique email constraint case-insensitively', async () => {
      await new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      }).save();

      const duplicateUser = new User({
        name: 'Another User',
        email: 'TEST@EXAMPLE.COM',
        password: 'password456'
      });

      await expect(duplicateUser.save()).rejects.toThrow();
    });
  });

  describe('Role Field', () => {
    test('should default role to student', async () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      const savedUser = await user.save();
      expect(savedUser.role).toBe('student');
    });

    test('should accept admin role', async () => {
      const user = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin'
      });

      const savedUser = await user.save();
      expect(savedUser.role).toBe('admin');
    });

    test('should reject invalid role', async () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'superuser'
      });

      await expect(user.save()).rejects.toThrow();
    });
  });

  describe('PreferredLang Field', () => {
    test('should default preferredLang to en', async () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      const savedUser = await user.save();
      expect(savedUser.preferredLang).toBe('en');
    });

    test('should accept mr language', async () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        preferredLang: 'mr'
      });

      const savedUser = await user.save();
      expect(savedUser.preferredLang).toBe('mr');
    });

    test('should reject invalid language', async () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        preferredLang: 'fr'
      });

      await expect(user.save()).rejects.toThrow();
    });
  });

  describe('Password Hashing', () => {
    test('should hash password before saving', async () => {
      const plainPassword = 'password123';
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: plainPassword
      });

      const savedUser = await user.save();
      expect(savedUser.password).not.toBe(plainPassword);
      expect(savedUser.password).toMatch(/^\$2[aby]\$.{56}$/); // bcrypt hash format
    });

    test('should use bcrypt with 10 salt rounds', async () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      const savedUser = await user.save();
      // bcrypt hash format: $2b$10$... where 10 is the salt rounds
      expect(savedUser.password).toMatch(/^\$2[aby]\$10\$/);
    });

    test('should not rehash password if not modified', async () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      const savedUser = await user.save();
      const originalHash = savedUser.password;

      savedUser.name = 'Updated Name';
      await savedUser.save();

      expect(savedUser.password).toBe(originalHash);
    });

    test('should rehash password when modified', async () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      const savedUser = await user.save();
      const originalHash = savedUser.password;

      savedUser.password = 'newpassword456';
      await savedUser.save();

      expect(savedUser.password).not.toBe(originalHash);
    });
  });

  describe('comparePassword Method', () => {
    test('should return true for correct password', async () => {
      const plainPassword = 'password123';
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: plainPassword
      });

      const savedUser = await user.save();
      const isMatch = await savedUser.comparePassword(plainPassword);
      expect(isMatch).toBe(true);
    });

    test('should return false for incorrect password', async () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      const savedUser = await user.save();
      const isMatch = await savedUser.comparePassword('wrongpassword');
      expect(isMatch).toBe(false);
    });
  });

  describe('toJSON Method', () => {
    test('should exclude password from JSON output', async () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      const savedUser = await user.save();
      const userJSON = savedUser.toJSON();

      expect(userJSON.password).toBeUndefined();
      expect(userJSON.name).toBe('Test User');
      expect(userJSON.email).toBe('test@example.com');
    });
  });

  describe('Indexes', () => {
    test('should have email index', async () => {
      const indexes = await User.collection.getIndexes();
      expect(indexes).toHaveProperty('email_1');
    });

    test('should have role index', async () => {
      const indexes = await User.collection.getIndexes();
      expect(indexes).toHaveProperty('role_1');
    });

    test('should have unique constraint on email index', async () => {
      const indexes = await User.collection.getIndexes();
      expect(indexes.email_1).toEqual([['email', 1]]);
    });
  });

  describe('Timestamps', () => {
    test('should automatically set createdAt and updatedAt', async () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      const savedUser = await user.save();
      expect(savedUser.createdAt).toBeInstanceOf(Date);
      expect(savedUser.updatedAt).toBeInstanceOf(Date);
    });

    test('should update updatedAt on modification', async () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      const savedUser = await user.save();
      const originalUpdatedAt = savedUser.updatedAt;

      // Wait a bit to ensure timestamp difference
      await new Promise(resolve => setTimeout(resolve, 10));

      savedUser.name = 'Updated Name';
      await savedUser.save();

      expect(savedUser.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });
  });
});
