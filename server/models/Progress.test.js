const mongoose = require('mongoose');
const Progress = require('./Progress');
const User = require('./User');

// Mock MongoDB connection for testing
beforeAll(async () => {
  const baseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurveda-test';
  const mongoUri = `${baseUri}-${process.env.JEST_WORKER_ID || '1'}`;
  await mongoose.connect(mongoUri);
  await Promise.all([
    Progress.init(),
    User.init()
  ]);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Progress.deleteMany({});
  await User.deleteMany({});
});

describe('Progress Model', () => {
  let testUser;

  beforeEach(async () => {
    // Create a test user for progress records
    testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
  });

  describe('Schema Validation', () => {
    test('should create a valid progress record with all required fields', async () => {
      const progressData = {
        userId: testUser._id,
        topicSlug: 'vata-dosha'
      };

      const progress = new Progress(progressData);
      const savedProgress = await progress.save();

      expect(savedProgress._id).toBeDefined();
      expect(savedProgress.userId.toString()).toBe(testUser._id.toString());
      expect(savedProgress.topicSlug).toBe(progressData.topicSlug);
      expect(savedProgress.completed).toBe(true); // Default value
      expect(savedProgress.completedAt).toBeInstanceOf(Date);
      expect(savedProgress.timeSpent).toBe(0); // Default value
      expect(savedProgress.createdAt).toBeDefined();
      expect(savedProgress.updatedAt).toBeDefined();
    });

    test('should create progress record with custom values', async () => {
      const completedDate = new Date('2024-01-15');
      const progressData = {
        userId: testUser._id,
        topicSlug: 'pitta-dosha',
        completed: false,
        completedAt: completedDate,
        timeSpent: 25
      };

      const progress = new Progress(progressData);
      const savedProgress = await progress.save();

      expect(savedProgress.completed).toBe(false);
      expect(savedProgress.completedAt.toISOString()).toBe(completedDate.toISOString());
      expect(savedProgress.timeSpent).toBe(25);
    });

    test('should fail validation when userId is missing', async () => {
      const progress = new Progress({
        topicSlug: 'vata-dosha'
      });

      await expect(progress.save()).rejects.toThrow();
    });

    test('should fail validation when topicSlug is missing', async () => {
      const progress = new Progress({
        userId: testUser._id
      });

      await expect(progress.save()).rejects.toThrow();
    });

    test('should fail validation when timeSpent is negative', async () => {
      const progress = new Progress({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        timeSpent: -10
      });

      await expect(progress.save()).rejects.toThrow();
    });

    test('should convert topicSlug to lowercase', async () => {
      const progress = new Progress({
        userId: testUser._id,
        topicSlug: 'VATA-DOSHA'
      });

      const savedProgress = await progress.save();
      expect(savedProgress.topicSlug).toBe('vata-dosha');
    });

    test('should trim whitespace from topicSlug', async () => {
      const progress = new Progress({
        userId: testUser._id,
        topicSlug: '  vata-dosha  '
      });

      const savedProgress = await progress.save();
      expect(savedProgress.topicSlug).toBe('vata-dosha');
    });
  });

  describe('Compound Unique Index on userId + topicSlug', () => {
    test('should enforce unique constraint on userId + topicSlug combination', async () => {
      const progressData = {
        userId: testUser._id,
        topicSlug: 'vata-dosha'
      };

      await new Progress(progressData).save();

      const duplicateProgress = new Progress({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        timeSpent: 30
      });

      await expect(duplicateProgress.save()).rejects.toThrow();
    });

    test('should allow same topicSlug for different users', async () => {
      const anotherUser = await User.create({
        name: 'Another User',
        email: 'another@example.com',
        password: 'password123'
      });

      await new Progress({
        userId: testUser._id,
        topicSlug: 'vata-dosha'
      }).save();

      const progress2 = new Progress({
        userId: anotherUser._id,
        topicSlug: 'vata-dosha'
      });

      const savedProgress = await progress2.save();
      expect(savedProgress._id).toBeDefined();
    });

    test('should allow same userId for different topics', async () => {
      await new Progress({
        userId: testUser._id,
        topicSlug: 'vata-dosha'
      }).save();

      const progress2 = new Progress({
        userId: testUser._id,
        topicSlug: 'pitta-dosha'
      });

      const savedProgress = await progress2.save();
      expect(savedProgress._id).toBeDefined();
    });
  });

  describe('Indexes', () => {
    test('should have compound unique index on userId + topicSlug', async () => {
      const indexes = await Progress.collection.getIndexes();
      expect(indexes).toHaveProperty('userId_1_topicSlug_1');
    });

    test('should have index on userId + completedAt for streak calculation', async () => {
      const indexes = await Progress.collection.getIndexes();
      expect(indexes).toHaveProperty('userId_1_completedAt_1');
    });

    test('should have index on userId', async () => {
      const indexes = await Progress.collection.getIndexes();
      expect(indexes).toHaveProperty('userId_1');
    });
  });

  describe('Default Values', () => {
    test('should default completed to true', async () => {
      const progress = new Progress({
        userId: testUser._id,
        topicSlug: 'vata-dosha'
      });

      const savedProgress = await progress.save();
      expect(savedProgress.completed).toBe(true);
    });

    test('should default timeSpent to 0', async () => {
      const progress = new Progress({
        userId: testUser._id,
        topicSlug: 'vata-dosha'
      });

      const savedProgress = await progress.save();
      expect(savedProgress.timeSpent).toBe(0);
    });

    test('should default completedAt to current date', async () => {
      const beforeCreate = new Date();
      
      const progress = new Progress({
        userId: testUser._id,
        topicSlug: 'vata-dosha'
      });

      const savedProgress = await progress.save();
      const afterCreate = new Date();

      expect(savedProgress.completedAt.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
      expect(savedProgress.completedAt.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
    });
  });

  describe('Timestamps', () => {
    test('should automatically set createdAt and updatedAt', async () => {
      const progress = new Progress({
        userId: testUser._id,
        topicSlug: 'vata-dosha'
      });

      const savedProgress = await progress.save();
      expect(savedProgress.createdAt).toBeInstanceOf(Date);
      expect(savedProgress.updatedAt).toBeInstanceOf(Date);
    });

    test('should update updatedAt on modification', async () => {
      const progress = new Progress({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        timeSpent: 10
      });

      const savedProgress = await progress.save();
      const originalUpdatedAt = savedProgress.updatedAt;

      // Wait a bit to ensure timestamp difference
      await new Promise(resolve => setTimeout(resolve, 10));

      savedProgress.timeSpent = 20;
      await savedProgress.save();

      expect(savedProgress.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });
  });

  describe('User Reference', () => {
    test('should populate user reference', async () => {
      const progress = await Progress.create({
        userId: testUser._id,
        topicSlug: 'vata-dosha'
      });

      const populatedProgress = await Progress.findById(progress._id).populate('userId');
      
      expect(populatedProgress.userId).toBeDefined();
      expect(populatedProgress.userId.name).toBe('Test User');
      expect(populatedProgress.userId.email).toBe('test@example.com');
    });
  });

  describe('Streak Calculation Support', () => {
    test('should support querying by userId and completedAt for streak calculation', async () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      await Progress.create([
        { userId: testUser._id, topicSlug: 'topic-1', completedAt: today },
        { userId: testUser._id, topicSlug: 'topic-2', completedAt: yesterday },
        { userId: testUser._id, topicSlug: 'topic-3', completedAt: twoDaysAgo }
      ]);

      const progressRecords = await Progress.find({ userId: testUser._id })
        .sort({ completedAt: -1 });

      expect(progressRecords).toHaveLength(3);
      expect(progressRecords[0].completedAt.getTime()).toBeGreaterThanOrEqual(progressRecords[1].completedAt.getTime());
      expect(progressRecords[1].completedAt.getTime()).toBeGreaterThanOrEqual(progressRecords[2].completedAt.getTime());
    });
  });

  describe('Time Tracking', () => {
    test('should track time spent on topics', async () => {
      const progress = await Progress.create({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        timeSpent: 45
      });

      expect(progress.timeSpent).toBe(45);
    });

    test('should allow updating time spent', async () => {
      const progress = await Progress.create({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        timeSpent: 30
      });

      progress.timeSpent = 60;
      const updatedProgress = await progress.save();

      expect(updatedProgress.timeSpent).toBe(60);
    });

    test('should accept zero time spent', async () => {
      const progress = await Progress.create({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        timeSpent: 0
      });

      expect(progress.timeSpent).toBe(0);
    });
  });
});
