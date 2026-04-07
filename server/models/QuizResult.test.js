const mongoose = require('mongoose');
const QuizResult = require('./QuizResult');
const User = require('./User');

// Mock MongoDB connection for testing
beforeAll(async () => {
  const baseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurveda-test';
  const mongoUri = `${baseUri}-${process.env.JEST_WORKER_ID || '1'}`;
  await mongoose.connect(mongoUri);
  await Promise.all([
    QuizResult.init(),
    User.init()
  ]);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await QuizResult.deleteMany({});
  await User.deleteMany({});
});

describe('QuizResult Model', () => {
  let testUser;

  beforeEach(async () => {
    // Create a test user for quiz results
    testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
  });

  describe('Schema Validation', () => {
    test('should create a valid quiz result with all required fields', async () => {
      const quizData = {
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        answers: [
          { questionId: 'q1', selectedOption: 2, correct: true },
          { questionId: 'q2', selectedOption: 1, correct: false }
        ]
      };

      const quizResult = new QuizResult(quizData);
      const savedResult = await quizResult.save();

      expect(savedResult._id).toBeDefined();
      expect(savedResult.userId.toString()).toBe(testUser._id.toString());
      expect(savedResult.topicSlug).toBe(quizData.topicSlug);
      expect(savedResult.score).toBe(80);
      expect(savedResult.totalQuestions).toBe(10);
      expect(savedResult.correctAnswers).toBe(8);
      expect(savedResult.answers).toHaveLength(2);
      expect(savedResult.submittedAt).toBeInstanceOf(Date);
      expect(savedResult.createdAt).toBeDefined();
      expect(savedResult.updatedAt).toBeDefined();
    });

    test('should fail validation when userId is missing', async () => {
      const quizResult = new QuizResult({
        topicSlug: 'vata-dosha',
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        answers: []
      });

      await expect(quizResult.save()).rejects.toThrow();
    });

    test('should fail validation when topicSlug is missing', async () => {
      const quizResult = new QuizResult({
        userId: testUser._id,
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        answers: []
      });

      await expect(quizResult.save()).rejects.toThrow();
    });

    test('should fail validation when score is missing', async () => {
      const quizResult = new QuizResult({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        totalQuestions: 10,
        correctAnswers: 8,
        answers: []
      });

      await expect(quizResult.save()).rejects.toThrow();
    });

    test('should fail validation when totalQuestions is missing', async () => {
      const quizResult = new QuizResult({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        score: 80,
        correctAnswers: 8,
        answers: []
      });

      await expect(quizResult.save()).rejects.toThrow();
    });

    test('should fail validation when correctAnswers is missing', async () => {
      const quizResult = new QuizResult({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        score: 80,
        totalQuestions: 10,
        answers: []
      });

      await expect(quizResult.save()).rejects.toThrow();
    });

    test('should fail validation when score is negative', async () => {
      const quizResult = new QuizResult({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        score: -10,
        totalQuestions: 10,
        correctAnswers: 8,
        answers: []
      });

      await expect(quizResult.save()).rejects.toThrow();
    });

    test('should fail validation when score exceeds 100', async () => {
      const quizResult = new QuizResult({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        score: 150,
        totalQuestions: 10,
        correctAnswers: 8,
        answers: []
      });

      await expect(quizResult.save()).rejects.toThrow();
    });

    test('should fail validation when totalQuestions is less than 1', async () => {
      const quizResult = new QuizResult({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        score: 80,
        totalQuestions: 0,
        correctAnswers: 0,
        answers: []
      });

      await expect(quizResult.save()).rejects.toThrow();
    });

    test('should fail validation when correctAnswers is negative', async () => {
      const quizResult = new QuizResult({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        score: 80,
        totalQuestions: 10,
        correctAnswers: -1,
        answers: []
      });

      await expect(quizResult.save()).rejects.toThrow();
    });

    test('should convert topicSlug to lowercase', async () => {
      const quizResult = new QuizResult({
        userId: testUser._id,
        topicSlug: 'VATA-DOSHA',
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        answers: []
      });

      const savedResult = await quizResult.save();
      expect(savedResult.topicSlug).toBe('vata-dosha');
    });

    test('should trim whitespace from topicSlug', async () => {
      const quizResult = new QuizResult({
        userId: testUser._id,
        topicSlug: '  vata-dosha  ',
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        answers: []
      });

      const savedResult = await quizResult.save();
      expect(savedResult.topicSlug).toBe('vata-dosha');
    });
  });

  describe('Answers Array', () => {
    test('should store answers array with correct structure', async () => {
      const answers = [
        { questionId: 'q1', selectedOption: 2, correct: true },
        { questionId: 'q2', selectedOption: 1, correct: false },
        { questionId: 'q3', selectedOption: 3, correct: true }
      ];

      const quizResult = await QuizResult.create({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        score: 67,
        totalQuestions: 3,
        correctAnswers: 2,
        answers
      });

      expect(quizResult.answers).toHaveLength(3);
      expect(quizResult.answers[0].questionId).toBe('q1');
      expect(quizResult.answers[0].selectedOption).toBe(2);
      expect(quizResult.answers[0].correct).toBe(true);
      expect(quizResult.answers[1].correct).toBe(false);
    });

    test('should allow empty answers array', async () => {
      const quizResult = await QuizResult.create({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        score: 0,
        totalQuestions: 5,
        correctAnswers: 0,
        answers: []
      });

      expect(quizResult.answers).toHaveLength(0);
    });

    test('should fail validation when answer is missing questionId', async () => {
      const quizResult = new QuizResult({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        answers: [
          { selectedOption: 2, correct: true }
        ]
      });

      await expect(quizResult.save()).rejects.toThrow();
    });

    test('should fail validation when answer is missing selectedOption', async () => {
      const quizResult = new QuizResult({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        answers: [
          { questionId: 'q1', correct: true }
        ]
      });

      await expect(quizResult.save()).rejects.toThrow();
    });

    test('should fail validation when answer is missing correct field', async () => {
      const quizResult = new QuizResult({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        answers: [
          { questionId: 'q1', selectedOption: 2 }
        ]
      });

      await expect(quizResult.save()).rejects.toThrow();
    });
  });

  describe('Indexes', () => {
    test('should have index on userId', async () => {
      const indexes = await QuizResult.collection.getIndexes();
      expect(indexes).toHaveProperty('userId_1');
    });

    test('should have index on topicSlug', async () => {
      const indexes = await QuizResult.collection.getIndexes();
      expect(indexes).toHaveProperty('topicSlug_1');
    });

    test('should have compound index on userId + submittedAt', async () => {
      const indexes = await QuizResult.collection.getIndexes();
      expect(indexes).toHaveProperty('userId_1_submittedAt_1');
    });
  });

  describe('Default Values', () => {
    test('should default submittedAt to current date', async () => {
      const beforeCreate = new Date();
      
      const quizResult = new QuizResult({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        answers: []
      });

      const savedResult = await quizResult.save();
      const afterCreate = new Date();

      expect(savedResult.submittedAt.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
      expect(savedResult.submittedAt.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
    });
  });

  describe('Timestamps', () => {
    test('should automatically set createdAt and updatedAt', async () => {
      const quizResult = new QuizResult({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        answers: []
      });

      const savedResult = await quizResult.save();
      expect(savedResult.createdAt).toBeInstanceOf(Date);
      expect(savedResult.updatedAt).toBeInstanceOf(Date);
    });

    test('should update updatedAt on modification', async () => {
      const quizResult = new QuizResult({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        answers: []
      });

      const savedResult = await quizResult.save();
      const originalUpdatedAt = savedResult.updatedAt;

      // Wait a bit to ensure timestamp difference
      await new Promise(resolve => setTimeout(resolve, 10));

      savedResult.score = 90;
      await savedResult.save();

      expect(savedResult.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });
  });

  describe('User Reference', () => {
    test('should populate user reference', async () => {
      const quizResult = await QuizResult.create({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        answers: []
      });

      const populatedResult = await QuizResult.findById(quizResult._id).populate('userId');
      
      expect(populatedResult.userId).toBeDefined();
      expect(populatedResult.userId.name).toBe('Test User');
      expect(populatedResult.userId.email).toBe('test@example.com');
    });
  });

  describe('Multiple Quiz Results', () => {
    test('should allow multiple quiz results for same user and topic', async () => {
      const quizData = {
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        answers: []
      };

      await QuizResult.create(quizData);
      
      const secondQuiz = await QuizResult.create({
        ...quizData,
        score: 90,
        correctAnswers: 9
      });

      expect(secondQuiz._id).toBeDefined();
      
      const results = await QuizResult.find({ 
        userId: testUser._id, 
        topicSlug: 'vata-dosha' 
      });
      
      expect(results).toHaveLength(2);
    });

    test('should allow same topicSlug for different users', async () => {
      const anotherUser = await User.create({
        name: 'Another User',
        email: 'another@example.com',
        password: 'password123'
      });

      await QuizResult.create({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        answers: []
      });

      const result2 = await QuizResult.create({
        userId: anotherUser._id,
        topicSlug: 'vata-dosha',
        score: 70,
        totalQuestions: 10,
        correctAnswers: 7,
        answers: []
      });

      expect(result2._id).toBeDefined();
    });

    test('should allow same userId for different topics', async () => {
      await QuizResult.create({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        answers: []
      });

      const result2 = await QuizResult.create({
        userId: testUser._id,
        topicSlug: 'pitta-dosha',
        score: 90,
        totalQuestions: 10,
        correctAnswers: 9,
        answers: []
      });

      expect(result2._id).toBeDefined();
    });
  });

  describe('Query Support', () => {
    test('should support querying by userId and submittedAt for history', async () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      await QuizResult.create([
        { 
          userId: testUser._id, 
          topicSlug: 'topic-1', 
          score: 80,
          totalQuestions: 10,
          correctAnswers: 8,
          answers: [],
          submittedAt: today 
        },
        { 
          userId: testUser._id, 
          topicSlug: 'topic-2', 
          score: 70,
          totalQuestions: 10,
          correctAnswers: 7,
          answers: [],
          submittedAt: yesterday 
        },
        { 
          userId: testUser._id, 
          topicSlug: 'topic-3', 
          score: 90,
          totalQuestions: 10,
          correctAnswers: 9,
          answers: [],
          submittedAt: twoDaysAgo 
        }
      ]);

      const results = await QuizResult.find({ userId: testUser._id })
        .sort({ submittedAt: -1 });

      expect(results).toHaveLength(3);
      expect(results[0].submittedAt.getTime()).toBeGreaterThanOrEqual(results[1].submittedAt.getTime());
      expect(results[1].submittedAt.getTime()).toBeGreaterThanOrEqual(results[2].submittedAt.getTime());
    });

    test('should support querying by topicSlug', async () => {
      await QuizResult.create([
        { 
          userId: testUser._id, 
          topicSlug: 'vata-dosha', 
          score: 80,
          totalQuestions: 10,
          correctAnswers: 8,
          answers: []
        },
        { 
          userId: testUser._id, 
          topicSlug: 'vata-dosha', 
          score: 90,
          totalQuestions: 10,
          correctAnswers: 9,
          answers: []
        },
        { 
          userId: testUser._id, 
          topicSlug: 'pitta-dosha', 
          score: 70,
          totalQuestions: 10,
          correctAnswers: 7,
          answers: []
        }
      ]);

      const results = await QuizResult.find({ topicSlug: 'vata-dosha' });
      expect(results).toHaveLength(2);
    });
  });

  describe('Score Validation', () => {
    test('should accept score of 0', async () => {
      const quizResult = await QuizResult.create({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        score: 0,
        totalQuestions: 10,
        correctAnswers: 0,
        answers: []
      });

      expect(quizResult.score).toBe(0);
    });

    test('should accept score of 100', async () => {
      const quizResult = await QuizResult.create({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        score: 100,
        totalQuestions: 10,
        correctAnswers: 10,
        answers: []
      });

      expect(quizResult.score).toBe(100);
    });

    test('should accept decimal scores', async () => {
      const quizResult = await QuizResult.create({
        userId: testUser._id,
        topicSlug: 'vata-dosha',
        score: 66.67,
        totalQuestions: 3,
        correctAnswers: 2,
        answers: []
      });

      expect(quizResult.score).toBeCloseTo(66.67, 2);
    });
  });
});
