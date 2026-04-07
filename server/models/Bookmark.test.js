const mongoose = require('mongoose');
const Bookmark = require('./Bookmark');
const User = require('./User');

// Mock MongoDB connection for testing
beforeAll(async () => {
  const baseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurveda-test';
  const mongoUri = `${baseUri}-${process.env.JEST_WORKER_ID || '1'}`;
  await mongoose.connect(mongoUri);
  await Promise.all([
    Bookmark.init(),
    User.init()
  ]);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Bookmark.deleteMany({});
  await User.deleteMany({});
});

describe('Bookmark Model', () => {
  let testUser;

  beforeEach(async () => {
    // Create a test user for bookmark records
    testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
  });

  describe('Schema Validation', () => {
    test('should create a valid bookmark with all required fields', async () => {
      const bookmarkData = {
        userId: testUser._id,
        topicSlug: 'vata-dosha'
      };

      const bookmark = new Bookmark(bookmarkData);
      const savedBookmark = await bookmark.save();

      expect(savedBookmark._id).toBeDefined();
      expect(savedBookmark.userId.toString()).toBe(testUser._id.toString());
      expect(savedBookmark.topicSlug).toBe(bookmarkData.topicSlug);
      expect(savedBookmark.createdAt).toBeInstanceOf(Date);
    });

    test('should fail validation when userId is missing', async () => {
      const bookmark = new Bookmark({
        topicSlug: 'vata-dosha'
      });

      await expect(bookmark.save()).rejects.toThrow();
    });

    test('should fail validation when topicSlug is missing', async () => {
      const bookmark = new Bookmark({
        userId: testUser._id
      });

      await expect(bookmark.save()).rejects.toThrow();
    });

    test('should convert topicSlug to lowercase', async () => {
      const bookmark = new Bookmark({
        userId: testUser._id,
        topicSlug: 'VATA-DOSHA'
      });

      const savedBookmark = await bookmark.save();
      expect(savedBookmark.topicSlug).toBe('vata-dosha');
    });

    test('should trim whitespace from topicSlug', async () => {
      const bookmark = new Bookmark({
        userId: testUser._id,
        topicSlug: '  vata-dosha  '
      });

      const savedBookmark = await bookmark.save();
      expect(savedBookmark.topicSlug).toBe('vata-dosha');
    });
  });

  describe('Compound Unique Index on userId + topicSlug', () => {
    test('should enforce unique constraint on userId + topicSlug combination', async () => {
      const bookmarkData = {
        userId: testUser._id,
        topicSlug: 'vata-dosha'
      };

      await new Bookmark(bookmarkData).save();

      const duplicateBookmark = new Bookmark({
        userId: testUser._id,
        topicSlug: 'vata-dosha'
      });

      await expect(duplicateBookmark.save()).rejects.toThrow();
    });

    test('should allow same topicSlug for different users', async () => {
      const anotherUser = await User.create({
        name: 'Another User',
        email: 'another@example.com',
        password: 'password123'
      });

      await new Bookmark({
        userId: testUser._id,
        topicSlug: 'vata-dosha'
      }).save();

      const bookmark2 = new Bookmark({
        userId: anotherUser._id,
        topicSlug: 'vata-dosha'
      });

      const savedBookmark = await bookmark2.save();
      expect(savedBookmark._id).toBeDefined();
    });

    test('should allow same userId for different topics', async () => {
      await new Bookmark({
        userId: testUser._id,
        topicSlug: 'vata-dosha'
      }).save();

      const bookmark2 = new Bookmark({
        userId: testUser._id,
        topicSlug: 'pitta-dosha'
      });

      const savedBookmark = await bookmark2.save();
      expect(savedBookmark._id).toBeDefined();
    });
  });

  describe('Indexes', () => {
    test('should have compound unique index on userId + topicSlug', async () => {
      const indexes = await Bookmark.collection.getIndexes();
      expect(indexes).toHaveProperty('userId_1_topicSlug_1');
    });

    test('should have index on userId', async () => {
      const indexes = await Bookmark.collection.getIndexes();
      expect(indexes).toHaveProperty('userId_1');
    });
  });

  describe('Default Values', () => {
    test('should default createdAt to current date', async () => {
      const beforeCreate = new Date();
      
      const bookmark = new Bookmark({
        userId: testUser._id,
        topicSlug: 'vata-dosha'
      });

      const savedBookmark = await bookmark.save();
      const afterCreate = new Date();

      expect(savedBookmark.createdAt.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
      expect(savedBookmark.createdAt.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
    });
  });

  describe('User Reference', () => {
    test('should populate user reference', async () => {
      const bookmark = await Bookmark.create({
        userId: testUser._id,
        topicSlug: 'vata-dosha'
      });

      const populatedBookmark = await Bookmark.findById(bookmark._id).populate('userId');
      
      expect(populatedBookmark.userId).toBeDefined();
      expect(populatedBookmark.userId.name).toBe('Test User');
      expect(populatedBookmark.userId.email).toBe('test@example.com');
    });
  });

  describe('Bookmark Management', () => {
    test('should create multiple bookmarks for same user', async () => {
      await Bookmark.create([
        { userId: testUser._id, topicSlug: 'vata-dosha' },
        { userId: testUser._id, topicSlug: 'pitta-dosha' },
        { userId: testUser._id, topicSlug: 'kapha-dosha' }
      ]);

      const bookmarks = await Bookmark.find({ userId: testUser._id });
      expect(bookmarks).toHaveLength(3);
    });

    test('should delete bookmark', async () => {
      const bookmark = await Bookmark.create({
        userId: testUser._id,
        topicSlug: 'vata-dosha'
      });

      await Bookmark.deleteOne({ _id: bookmark._id });

      const found = await Bookmark.findById(bookmark._id);
      expect(found).toBeNull();
    });

    test('should find bookmarks by userId', async () => {
      const anotherUser = await User.create({
        name: 'Another User',
        email: 'another@example.com',
        password: 'password123'
      });

      await Bookmark.create([
        { userId: testUser._id, topicSlug: 'vata-dosha' },
        { userId: testUser._id, topicSlug: 'pitta-dosha' },
        { userId: anotherUser._id, topicSlug: 'kapha-dosha' }
      ]);

      const userBookmarks = await Bookmark.find({ userId: testUser._id });
      expect(userBookmarks).toHaveLength(2);
    });

    test('should find bookmark by userId and topicSlug', async () => {
      await Bookmark.create({
        userId: testUser._id,
        topicSlug: 'vata-dosha'
      });

      const bookmark = await Bookmark.findOne({
        userId: testUser._id,
        topicSlug: 'vata-dosha'
      });

      expect(bookmark).toBeDefined();
      expect(bookmark.topicSlug).toBe('vata-dosha');
    });
  });

  describe('Sorting and Ordering', () => {
    test('should sort bookmarks by createdAt descending', async () => {
      const bookmark1 = await Bookmark.create({
        userId: testUser._id,
        topicSlug: 'topic-1'
      });

      // Wait a bit to ensure different timestamps
      await new Promise(resolve => setTimeout(resolve, 10));

      const bookmark2 = await Bookmark.create({
        userId: testUser._id,
        topicSlug: 'topic-2'
      });

      const bookmarks = await Bookmark.find({ userId: testUser._id })
        .sort({ createdAt: -1 });

      expect(bookmarks[0]._id.toString()).toBe(bookmark2._id.toString());
      expect(bookmarks[1]._id.toString()).toBe(bookmark1._id.toString());
    });
  });
});
