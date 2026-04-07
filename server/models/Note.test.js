const mongoose = require('mongoose');
const Note = require('./Note');
const User = require('./User');

// Mock MongoDB connection for testing
beforeAll(async () => {
  const baseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurveda-test';
  const mongoUri = `${baseUri}-${process.env.JEST_WORKER_ID || '1'}`;
  await mongoose.connect(mongoUri);
  await Promise.all([
    Note.init(),
    User.init()
  ]);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Note.deleteMany({});
  await User.deleteMany({});
});

describe('Note Model', () => {
  let testUser;

  beforeEach(async () => {
    // Create a test user for note records
    testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
  });

  describe('Schema Validation', () => {
    test('should create a valid note with all required fields', async () => {
      const noteData = {
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        content: 'This is my note about Vata Dosha'
      };

      const note = new Note(noteData);
      const savedNote = await note.save();

      expect(savedNote._id).toBeDefined();
      expect(savedNote.userId.toString()).toBe(testUser._id.toString());
      expect(savedNote.topicSlug).toBe(noteData.topicSlug);
      expect(savedNote.content).toBe(noteData.content);
      expect(savedNote.updatedAt).toBeInstanceOf(Date);
      expect(savedNote.createdAt).toBeDefined();
    });

    test('should fail validation when userId is missing', async () => {
      const note = new Note({
        topicSlug: 'vata-dosha',
        content: 'Test note'
      });

      await expect(note.save()).rejects.toThrow();
    });

    test('should fail validation when topicSlug is missing', async () => {
      const note = new Note({
        userId: testUser._id,
        content: 'Test note'
      });

      await expect(note.save()).rejects.toThrow();
    });

    test('should fail validation when content is missing', async () => {
      const note = new Note({
        userId: testUser._id,
        topicSlug: 'vata-dosha'
      });

      await expect(note.save()).rejects.toThrow();
    });

    test('should fail validation when content exceeds 10000 characters', async () => {
      const longContent = 'a'.repeat(10001);
      const note = new Note({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        content: longContent
      });

      await expect(note.save()).rejects.toThrow();
    });

    test('should accept content with exactly 10000 characters', async () => {
      const maxContent = 'a'.repeat(10000);
      const note = new Note({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        content: maxContent
      });

      const savedNote = await note.save();
      expect(savedNote.content).toHaveLength(10000);
    });

    test('should convert topicSlug to lowercase', async () => {
      const note = new Note({
        userId: testUser._id,
        topicSlug: 'VATA-DOSHA',
        content: 'Test note'
      });

      const savedNote = await note.save();
      expect(savedNote.topicSlug).toBe('vata-dosha');
    });

    test('should trim whitespace from topicSlug', async () => {
      const note = new Note({
        userId: testUser._id,
        topicSlug: '  vata-dosha  ',
        content: 'Test note'
      });

      const savedNote = await note.save();
      expect(savedNote.topicSlug).toBe('vata-dosha');
    });
  });

  describe('Compound Unique Index on userId + topicSlug', () => {
    test('should enforce unique constraint on userId + topicSlug combination', async () => {
      const noteData = {
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        content: 'First note'
      };

      await new Note(noteData).save();

      const duplicateNote = new Note({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        content: 'Second note'
      });

      await expect(duplicateNote.save()).rejects.toThrow();
    });

    test('should allow same topicSlug for different users', async () => {
      const anotherUser = await User.create({
        name: 'Another User',
        email: 'another@example.com',
        password: 'password123'
      });

      await new Note({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        content: 'User 1 note'
      }).save();

      const note2 = new Note({
        userId: anotherUser._id,
        topicSlug: 'vata-dosha',
        content: 'User 2 note'
      });

      const savedNote = await note2.save();
      expect(savedNote._id).toBeDefined();
    });

    test('should allow same userId for different topics', async () => {
      await new Note({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        content: 'Vata note'
      }).save();

      const note2 = new Note({
        userId: testUser._id,
        topicSlug: 'pitta-dosha',
        content: 'Pitta note'
      });

      const savedNote = await note2.save();
      expect(savedNote._id).toBeDefined();
    });
  });

  describe('Indexes', () => {
    test('should have compound unique index on userId + topicSlug', async () => {
      const indexes = await Note.collection.getIndexes();
      expect(indexes).toHaveProperty('userId_1_topicSlug_1');
    });

    test('should have index on userId', async () => {
      const indexes = await Note.collection.getIndexes();
      expect(indexes).toHaveProperty('userId_1');
    });
  });

  describe('Default Values', () => {
    test('should default updatedAt to current date', async () => {
      const beforeCreate = new Date();
      
      const note = new Note({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        content: 'Test note'
      });

      const savedNote = await note.save();
      const afterCreate = new Date();

      expect(savedNote.updatedAt.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
      expect(savedNote.updatedAt.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
    });
  });

  describe('Timestamps', () => {
    test('should automatically set createdAt and updatedAt', async () => {
      const note = new Note({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        content: 'Test note'
      });

      const savedNote = await note.save();
      expect(savedNote.createdAt).toBeInstanceOf(Date);
      expect(savedNote.updatedAt).toBeInstanceOf(Date);
    });

    test('should update updatedAt on modification', async () => {
      const note = new Note({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        content: 'Original content'
      });

      const savedNote = await note.save();
      const originalUpdatedAt = savedNote.updatedAt;

      // Wait a bit to ensure timestamp difference
      await new Promise(resolve => setTimeout(resolve, 10));

      savedNote.content = 'Updated content';
      await savedNote.save();

      expect(savedNote.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });
  });

  describe('User Reference', () => {
    test('should populate user reference', async () => {
      const note = await Note.create({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        content: 'Test note'
      });

      const populatedNote = await Note.findById(note._id).populate('userId');
      
      expect(populatedNote.userId).toBeDefined();
      expect(populatedNote.userId.name).toBe('Test User');
      expect(populatedNote.userId.email).toBe('test@example.com');
    });
  });

  describe('Note Management', () => {
    test('should create multiple notes for same user', async () => {
      await Note.create([
        { userId: testUser._id, topicSlug: 'vata-dosha', content: 'Vata note' },
        { userId: testUser._id, topicSlug: 'pitta-dosha', content: 'Pitta note' },
        { userId: testUser._id, topicSlug: 'kapha-dosha', content: 'Kapha note' }
      ]);

      const notes = await Note.find({ userId: testUser._id });
      expect(notes).toHaveLength(3);
    });

    test('should update existing note', async () => {
      const note = await Note.create({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        content: 'Original content'
      });

      note.content = 'Updated content';
      const updatedNote = await note.save();

      expect(updatedNote.content).toBe('Updated content');
    });

    test('should delete note', async () => {
      const note = await Note.create({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        content: 'Test note'
      });

      await Note.deleteOne({ _id: note._id });

      const found = await Note.findById(note._id);
      expect(found).toBeNull();
    });

    test('should find notes by userId', async () => {
      const anotherUser = await User.create({
        name: 'Another User',
        email: 'another@example.com',
        password: 'password123'
      });

      await Note.create([
        { userId: testUser._id, topicSlug: 'vata-dosha', content: 'Note 1' },
        { userId: testUser._id, topicSlug: 'pitta-dosha', content: 'Note 2' },
        { userId: anotherUser._id, topicSlug: 'kapha-dosha', content: 'Note 3' }
      ]);

      const userNotes = await Note.find({ userId: testUser._id });
      expect(userNotes).toHaveLength(2);
    });

    test('should find note by userId and topicSlug', async () => {
      await Note.create({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        content: 'Test note'
      });

      const note = await Note.findOne({
        userId: testUser._id,
        topicSlug: 'vata-dosha'
      });

      expect(note).toBeDefined();
      expect(note.content).toBe('Test note');
    });
  });

  describe('Content Length Validation', () => {
    test('should accept short content', async () => {
      const note = new Note({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        content: 'Short'
      });

      const savedNote = await note.save();
      expect(savedNote.content).toBe('Short');
    });

    test('should accept medium length content', async () => {
      const mediumContent = 'a'.repeat(5000);
      const note = new Note({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        content: mediumContent
      });

      const savedNote = await note.save();
      expect(savedNote.content).toHaveLength(5000);
    });

    test('should accept content with special characters', async () => {
      const specialContent = 'Note with special chars: @#$%^&*()_+-=[]{}|;:,.<>?/~`';
      const note = new Note({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        content: specialContent
      });

      const savedNote = await note.save();
      expect(savedNote.content).toBe(specialContent);
    });

    test('should accept content with unicode characters', async () => {
      const unicodeContent = 'Sanskrit: वात पित्त कफ, Marathi: आयुर्वेद';
      const note = new Note({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        content: unicodeContent
      });

      const savedNote = await note.save();
      expect(savedNote.content).toBe(unicodeContent);
    });
  });

  describe('Sorting and Ordering', () => {
    test('should sort notes by updatedAt descending', async () => {
      const note1 = await Note.create({
        userId: testUser._id,
        topicSlug: 'topic-1',
        content: 'Note 1'
      });

      // Wait a bit to ensure different timestamps
      await new Promise(resolve => setTimeout(resolve, 10));

      const note2 = await Note.create({
        userId: testUser._id,
        topicSlug: 'topic-2',
        content: 'Note 2'
      });

      const notes = await Note.find({ userId: testUser._id })
        .sort({ updatedAt: -1 });

      expect(notes[0]._id.toString()).toBe(note2._id.toString());
      expect(notes[1]._id.toString()).toBe(note1._id.toString());
    });
  });
});
