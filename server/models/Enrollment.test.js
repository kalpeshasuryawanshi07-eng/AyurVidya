const mongoose = require('mongoose');
const Enrollment = require('./Enrollment');
const User = require('./User');
const Course = require('./Course');

// Mock MongoDB connection for testing
beforeAll(async () => {
  const baseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurveda-test';
  const mongoUri = `${baseUri}-${process.env.JEST_WORKER_ID || '1'}`;
  await mongoose.connect(mongoUri);
  // Ensure indexes are created and synced
  await Promise.all([
    Enrollment.init(),
    User.init(),
    Course.init()
  ]);
  await Enrollment.syncIndexes();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Enrollment.deleteMany({});
  await User.deleteMany({});
  await Course.deleteMany({});
});

describe('Enrollment Model', () => {
  let testUser;
  let testCourse;

  beforeEach(async () => {
    testUser = await new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    }).save();

    testCourse = await new Course({
      slug: 'test-course',
      title: 'Test Course',
      description: 'Test description'
    }).save();
  });

  describe('Schema Validation', () => {
    test('should create a valid enrollment with all required fields', async () => {
      const enrollmentData = {
        userId: testUser._id,
        courseId: testCourse._id
      };

      const enrollment = new Enrollment(enrollmentData);
      const savedEnrollment = await enrollment.save();

      expect(savedEnrollment._id).toBeDefined();
      expect(savedEnrollment.userId.toString()).toBe(testUser._id.toString());
      expect(savedEnrollment.courseId.toString()).toBe(testCourse._id.toString());
      expect(savedEnrollment.enrolledAt).toBeInstanceOf(Date);
      expect(savedEnrollment.completedLessons).toEqual([]);
      expect(savedEnrollment.progress).toBe(0);
      expect(savedEnrollment.createdAt).toBeDefined();
      expect(savedEnrollment.updatedAt).toBeDefined();
    });

    test('should fail validation when userId is missing', async () => {
      const enrollment = new Enrollment({
        courseId: testCourse._id
      });

      await expect(enrollment.save()).rejects.toThrow();
    });

    test('should fail validation when courseId is missing', async () => {
      const enrollment = new Enrollment({
        userId: testUser._id
      });

      await expect(enrollment.save()).rejects.toThrow();
    });

    test('should default enrolledAt to current date', async () => {
      const beforeEnrollment = new Date();
      const enrollment = new Enrollment({
        userId: testUser._id,
        courseId: testCourse._id
      });

      const savedEnrollment = await enrollment.save();
      const afterEnrollment = new Date();

      expect(savedEnrollment.enrolledAt.getTime()).toBeGreaterThanOrEqual(beforeEnrollment.getTime());
      expect(savedEnrollment.enrolledAt.getTime()).toBeLessThanOrEqual(afterEnrollment.getTime());
    });
  });

  describe('Compound Unique Index', () => {
    test('should enforce unique constraint on userId and courseId combination', async () => {
      await new Enrollment({
        userId: testUser._id,
        courseId: testCourse._id
      }).save();

      const duplicateEnrollment = new Enrollment({
        userId: testUser._id,
        courseId: testCourse._id
      });

      await expect(duplicateEnrollment.save()).rejects.toThrow();
    });

    test('should allow same user to enroll in different courses', async () => {
      const anotherCourse = await new Course({
        slug: 'another-course',
        title: 'Another Course',
        description: 'Another description'
      }).save();

      await new Enrollment({
        userId: testUser._id,
        courseId: testCourse._id
      }).save();

      const enrollment2 = new Enrollment({
        userId: testUser._id,
        courseId: anotherCourse._id
      });

      await expect(enrollment2.save()).resolves.toBeDefined();
    });

    test('should allow different users to enroll in same course', async () => {
      const anotherUser = await new User({
        name: 'Another User',
        email: 'another@example.com',
        password: 'password123'
      }).save();

      await new Enrollment({
        userId: testUser._id,
        courseId: testCourse._id
      }).save();

      const enrollment2 = new Enrollment({
        userId: anotherUser._id,
        courseId: testCourse._id
      });

      await expect(enrollment2.save()).resolves.toBeDefined();
    });
  });

  describe('CompletedLessons Array', () => {
    test('should default completedLessons to empty array', async () => {
      const enrollment = new Enrollment({
        userId: testUser._id,
        courseId: testCourse._id
      });

      const savedEnrollment = await enrollment.save();
      expect(savedEnrollment.completedLessons).toEqual([]);
    });

    test('should accept array of lesson IDs', async () => {
      const enrollment = new Enrollment({
        userId: testUser._id,
        courseId: testCourse._id,
        completedLessons: ['lesson-1', 'lesson-2', 'lesson-3']
      });

      const savedEnrollment = await enrollment.save();
      expect(savedEnrollment.completedLessons).toHaveLength(3);
      expect(savedEnrollment.completedLessons).toContain('lesson-1');
      expect(savedEnrollment.completedLessons).toContain('lesson-2');
      expect(savedEnrollment.completedLessons).toContain('lesson-3');
    });
  });

  describe('Progress Field', () => {
    test('should default progress to 0', async () => {
      const enrollment = new Enrollment({
        userId: testUser._id,
        courseId: testCourse._id
      });

      const savedEnrollment = await enrollment.save();
      expect(savedEnrollment.progress).toBe(0);
    });

    test('should accept valid progress between 0 and 100', async () => {
      const enrollment = new Enrollment({
        userId: testUser._id,
        courseId: testCourse._id,
        progress: 50
      });

      const savedEnrollment = await enrollment.save();
      expect(savedEnrollment.progress).toBe(50);
    });

    test('should reject progress below 0', async () => {
      const enrollment = new Enrollment({
        userId: testUser._id,
        courseId: testCourse._id,
        progress: -10
      });

      await expect(enrollment.save()).rejects.toThrow();
    });

    test('should reject progress above 100', async () => {
      const enrollment = new Enrollment({
        userId: testUser._id,
        courseId: testCourse._id,
        progress: 150
      });

      await expect(enrollment.save()).rejects.toThrow();
    });
  });

  describe('LastAccessedAt Field', () => {
    test('should accept lastAccessedAt date', async () => {
      const accessDate = new Date('2024-01-15');
      const enrollment = new Enrollment({
        userId: testUser._id,
        courseId: testCourse._id,
        lastAccessedAt: accessDate
      });

      const savedEnrollment = await enrollment.save();
      expect(savedEnrollment.lastAccessedAt).toEqual(accessDate);
    });
  });

  describe('Indexes', () => {
    test('should have compound index on userId and courseId', async () => {
      // Create a document to ensure collection exists
      await new Enrollment({
        userId: testUser._id,
        courseId: testCourse._id
      }).save();
      
      const indexes = await Enrollment.collection.getIndexes();
      expect(indexes).toHaveProperty('userId_1_courseId_1');
    });

    test('should have userId index', async () => {
      const indexes = await Enrollment.collection.getIndexes();
      expect(indexes).toHaveProperty('userId_1');
    });

    test('should have courseId index', async () => {
      const indexes = await Enrollment.collection.getIndexes();
      expect(indexes).toHaveProperty('courseId_1');
    });
  });

  describe('Timestamps', () => {
    test('should automatically set createdAt and updatedAt', async () => {
      const enrollment = new Enrollment({
        userId: testUser._id,
        courseId: testCourse._id
      });

      const savedEnrollment = await enrollment.save();
      expect(savedEnrollment.createdAt).toBeInstanceOf(Date);
      expect(savedEnrollment.updatedAt).toBeInstanceOf(Date);
    });

    test('should update updatedAt on modification', async () => {
      const enrollment = new Enrollment({
        userId: testUser._id,
        courseId: testCourse._id
      });

      const savedEnrollment = await enrollment.save();
      const originalUpdatedAt = savedEnrollment.updatedAt;

      // Wait a bit to ensure timestamp difference
      await new Promise(resolve => setTimeout(resolve, 10));

      savedEnrollment.progress = 50;
      await savedEnrollment.save();

      expect(savedEnrollment.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });
  });

  describe('Population', () => {
    test('should populate userId reference', async () => {
      const enrollment = await new Enrollment({
        userId: testUser._id,
        courseId: testCourse._id
      }).save();

      const populatedEnrollment = await Enrollment.findById(enrollment._id).populate('userId');
      expect(populatedEnrollment.userId.name).toBe('Test User');
      expect(populatedEnrollment.userId.email).toBe('test@example.com');
    });

    test('should populate courseId reference', async () => {
      const enrollment = await new Enrollment({
        userId: testUser._id,
        courseId: testCourse._id
      }).save();

      const populatedEnrollment = await Enrollment.findById(enrollment._id).populate('courseId');
      expect(populatedEnrollment.courseId.title).toBe('Test Course');
      expect(populatedEnrollment.courseId.slug).toBe('test-course');
    });
  });
});
