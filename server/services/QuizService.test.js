const QuizService = require('./QuizService');
const Topic = require('../models/Topic');
const QuizResult = require('../models/QuizResult');
const User = require('../models/User');
const LanguageService = require('./LanguageService');

// Mock the models and services
jest.mock('../models/Topic');
jest.mock('../models/QuizResult');
jest.mock('../models/User');
jest.mock('./LanguageService');

describe('QuizService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock LanguageService.validateLanguage to return the input or default to 'en'
    LanguageService.validateLanguage.mockImplementation((lang) => {
      return lang === 'mr' ? 'mr' : 'en';
    });
  });

  describe('getQuiz', () => {
    it('should return quiz questions with randomized order', async () => {
      const mockTopic = {
        slug: 'vata-dosha',
        quizQuestions: [
          {
            questionId: 'q1',
            question: 'What is Vata?',
            questionMr: 'वात काय आहे?',
            options: ['Air', 'Fire', 'Water', 'Earth'],
            optionsMr: ['वायु', 'अग्नी', 'पाणी', 'पृथ्वी'],
            correctOption: 0
          },
          {
            questionId: 'q2',
            question: 'What element is Vata?',
            questionMr: 'वात कोणता घटक आहे?',
            options: ['Air and Ether', 'Fire and Water', 'Water and Earth', 'Earth and Fire'],
            optionsMr: ['वायु आणि आकाश', 'अग्नी आणि पाणी', 'पाणी आणि पृथ्वी', 'पृथ्वी आणि अग्नी'],
            correctOption: 0
          }
        ]
      };

      Topic.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopic)
      });

      const result = await QuizService.getQuiz('vata-dosha', 'en');

      expect(Topic.findOne).toHaveBeenCalledWith({ slug: 'vata-dosha' });
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('questionId');
      expect(result[0]).toHaveProperty('question');
      expect(result[0]).toHaveProperty('options');
      expect(result[0]).not.toHaveProperty('correctOption'); // Should not expose correct answer
    });

    it('should return Marathi questions when language is mr', async () => {
      const mockTopic = {
        slug: 'vata-dosha',
        quizQuestions: [
          {
            questionId: 'q1',
            question: 'What is Vata?',
            questionMr: 'वात काय आहे?',
            options: ['Air', 'Fire', 'Water', 'Earth'],
            optionsMr: ['वायु', 'अग्नी', 'पाणी', 'पृथ्वी'],
            correctOption: 0
          }
        ]
      };

      Topic.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopic)
      });

      const result = await QuizService.getQuiz('vata-dosha', 'mr');

      expect(result[0].question).toBe('वात काय आहे?');
      expect(result[0].options).toEqual(['वायु', 'अग्नी', 'पाणी', 'पृथ्वी']);
    });

    it('should fallback to English when Marathi translation is missing', async () => {
      const mockTopic = {
        slug: 'vata-dosha',
        quizQuestions: [
          {
            questionId: 'q1',
            question: 'What is Vata?',
            options: ['Air', 'Fire', 'Water', 'Earth'],
            correctOption: 0
          }
        ]
      };

      Topic.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopic)
      });

      const result = await QuizService.getQuiz('vata-dosha', 'mr');

      expect(result[0].question).toBe('What is Vata?');
      expect(result[0].options).toEqual(['Air', 'Fire', 'Water', 'Earth']);
    });

    it('should return empty array when topic has no quiz questions', async () => {
      const mockTopic = {
        slug: 'vata-dosha',
        quizQuestions: []
      };

      Topic.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopic)
      });

      const result = await QuizService.getQuiz('vata-dosha', 'en');

      expect(result).toEqual([]);
    });

    it('should return empty array when quizQuestions field is undefined', async () => {
      const mockTopic = {
        slug: 'vata-dosha'
      };

      Topic.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopic)
      });

      const result = await QuizService.getQuiz('vata-dosha', 'en');

      expect(result).toEqual([]);
    });

    it('should throw TopicNotFoundError when topic does not exist', async () => {
      Topic.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(null)
      });

      await expect(
        QuizService.getQuiz('non-existent', 'en')
      ).rejects.toMatchObject({
        name: 'TopicNotFoundError',
        message: 'Topic not found',
        statusCode: 404
      });
    });

    it('should randomize question order', async () => {
      const mockTopic = {
        slug: 'vata-dosha',
        quizQuestions: [
          { questionId: 'q1', question: 'Q1', options: ['A', 'B', 'C', 'D'], correctOption: 0 },
          { questionId: 'q2', question: 'Q2', options: ['A', 'B', 'C', 'D'], correctOption: 1 },
          { questionId: 'q3', question: 'Q3', options: ['A', 'B', 'C', 'D'], correctOption: 2 },
          { questionId: 'q4', question: 'Q4', options: ['A', 'B', 'C', 'D'], correctOption: 3 }
        ]
      };

      Topic.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopic)
      });

      // Call multiple times to check randomization
      const results = [];
      for (let i = 0; i < 5; i++) {
        const result = await QuizService.getQuiz('vata-dosha', 'en');
        results.push(result.map(q => q.questionId).join(','));
      }

      // At least one result should be different from the original order
      const originalOrder = 'q1,q2,q3,q4';
      const hasDifferentOrder = results.some(order => order !== originalOrder);
      
      // Note: There's a small chance all 5 calls return the same order, but it's unlikely
      expect(hasDifferentOrder).toBe(true);
    });
  });

  describe('getFlashcards', () => {
    it('should return flashcards for a topic', async () => {
      const mockTopic = {
        slug: 'vata-dosha',
        flashcards: [
          {
            front: 'What is Vata?',
            frontMr: 'वात काय आहे?',
            back: 'Vata is the dosha of movement',
            backMr: 'वात हा हालचालीचा दोष आहे'
          },
          {
            front: 'What elements make Vata?',
            frontMr: 'वात कोणत्या घटकांनी बनलेला आहे?',
            back: 'Air and Ether',
            backMr: 'वायु आणि आकाश'
          }
        ]
      };

      Topic.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopic)
      });

      const result = await QuizService.getFlashcards('vata-dosha', 'en');

      expect(Topic.findOne).toHaveBeenCalledWith({ slug: 'vata-dosha' });
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('front');
      expect(result[0]).toHaveProperty('back');
      expect(result[0].front).toBe('What is Vata?');
      expect(result[0].back).toBe('Vata is the dosha of movement');
    });

    it('should return Marathi flashcards when language is mr', async () => {
      const mockTopic = {
        slug: 'vata-dosha',
        flashcards: [
          {
            front: 'What is Vata?',
            frontMr: 'वात काय आहे?',
            back: 'Vata is the dosha of movement',
            backMr: 'वात हा हालचालीचा दोष आहे'
          }
        ]
      };

      Topic.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopic)
      });

      const result = await QuizService.getFlashcards('vata-dosha', 'mr');

      expect(result[0].front).toBe('वात काय आहे?');
      expect(result[0].back).toBe('वात हा हालचालीचा दोष आहे');
    });

    it('should fallback to English when Marathi translation is missing', async () => {
      const mockTopic = {
        slug: 'vata-dosha',
        flashcards: [
          {
            front: 'What is Vata?',
            back: 'Vata is the dosha of movement'
          }
        ]
      };

      Topic.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopic)
      });

      const result = await QuizService.getFlashcards('vata-dosha', 'mr');

      expect(result[0].front).toBe('What is Vata?');
      expect(result[0].back).toBe('Vata is the dosha of movement');
    });

    it('should return empty array when topic has no flashcards', async () => {
      const mockTopic = {
        slug: 'vata-dosha',
        flashcards: []
      };

      Topic.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopic)
      });

      const result = await QuizService.getFlashcards('vata-dosha', 'en');

      expect(result).toEqual([]);
    });

    it('should return empty array when flashcards field is undefined', async () => {
      const mockTopic = {
        slug: 'vata-dosha'
      };

      Topic.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopic)
      });

      const result = await QuizService.getFlashcards('vata-dosha', 'en');

      expect(result).toEqual([]);
    });

    it('should throw TopicNotFoundError when topic does not exist', async () => {
      Topic.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(null)
      });

      await expect(
        QuizService.getFlashcards('non-existent', 'en')
      ).rejects.toMatchObject({
        name: 'TopicNotFoundError',
        message: 'Topic not found',
        statusCode: 404
      });
    });
  });

  describe('submitQuiz', () => {
    it('should calculate score and save quiz result', async () => {
      const mockTopic = {
        slug: 'vata-dosha',
        quizQuestions: [
          { questionId: 'q1', question: 'Q1', options: ['A', 'B', 'C', 'D'], correctOption: 0 },
          { questionId: 'q2', question: 'Q2', options: ['A', 'B', 'C', 'D'], correctOption: 1 },
          { questionId: 'q3', question: 'Q3', options: ['A', 'B', 'C', 'D'], correctOption: 2 }
        ]
      };

      const answers = [
        { questionId: 'q1', selectedOption: 0 }, // Correct
        { questionId: 'q2', selectedOption: 1 }, // Correct
        { questionId: 'q3', selectedOption: 0 }  // Incorrect
      ];

      const mockSavedResult = {
        _id: 'result123',
        userId: 'user123',
        topicSlug: 'vata-dosha',
        score: 67,
        totalQuestions: 3,
        correctAnswers: 2,
        answers: [
          { questionId: 'q1', selectedOption: 0, correct: true },
          { questionId: 'q2', selectedOption: 1, correct: true },
          { questionId: 'q3', selectedOption: 0, correct: false }
        ]
      };

      Topic.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopic)
      });

      QuizResult.mockImplementation(function(data) {
        this.save = jest.fn().mockResolvedValue(mockSavedResult);
        Object.assign(this, data);
        return this;
      });

      const result = await QuizService.submitQuiz('user123', 'vata-dosha', answers);

      expect(result.score).toBe(67); // 2/3 = 66.67% rounded to 67
      expect(result.totalQuestions).toBe(3);
      expect(result.correctAnswers).toBe(2);
      expect(result.results).toHaveLength(3);
      expect(result.results[0].correct).toBe(true);
      expect(result.results[1].correct).toBe(true);
      expect(result.results[2].correct).toBe(false);
    });

    it('should calculate 100% score for all correct answers', async () => {
      const mockTopic = {
        slug: 'vata-dosha',
        quizQuestions: [
          { questionId: 'q1', question: 'Q1', options: ['A', 'B', 'C', 'D'], correctOption: 0 },
          { questionId: 'q2', question: 'Q2', options: ['A', 'B', 'C', 'D'], correctOption: 1 }
        ]
      };

      const answers = [
        { questionId: 'q1', selectedOption: 0 },
        { questionId: 'q2', selectedOption: 1 }
      ];

      Topic.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopic)
      });

      QuizResult.mockImplementation(function(data) {
        this.save = jest.fn().mockResolvedValue(data);
        Object.assign(this, data);
        return this;
      });

      const result = await QuizService.submitQuiz('user123', 'vata-dosha', answers);

      expect(result.score).toBe(100);
      expect(result.correctAnswers).toBe(2);
    });

    it('should calculate 0% score for all incorrect answers', async () => {
      const mockTopic = {
        slug: 'vata-dosha',
        quizQuestions: [
          { questionId: 'q1', question: 'Q1', options: ['A', 'B', 'C', 'D'], correctOption: 0 },
          { questionId: 'q2', question: 'Q2', options: ['A', 'B', 'C', 'D'], correctOption: 1 }
        ]
      };

      const answers = [
        { questionId: 'q1', selectedOption: 1 },
        { questionId: 'q2', selectedOption: 0 }
      ];

      Topic.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopic)
      });

      QuizResult.mockImplementation(function(data) {
        this.save = jest.fn().mockResolvedValue(data);
        Object.assign(this, data);
        return this;
      });

      const result = await QuizService.submitQuiz('user123', 'vata-dosha', answers);

      expect(result.score).toBe(0);
      expect(result.correctAnswers).toBe(0);
    });

    it('should throw ValidationError if userId is missing', async () => {
      await expect(
        QuizService.submitQuiz(null, 'vata-dosha', [])
      ).rejects.toMatchObject({
        name: 'ValidationError',
        message: 'User ID, topic slug, and answers array are required',
        statusCode: 400
      });
    });

    it('should throw ValidationError if topicSlug is missing', async () => {
      await expect(
        QuizService.submitQuiz('user123', null, [])
      ).rejects.toMatchObject({
        name: 'ValidationError',
        message: 'User ID, topic slug, and answers array are required',
        statusCode: 400
      });
    });

    it('should throw ValidationError if answers is not an array', async () => {
      await expect(
        QuizService.submitQuiz('user123', 'vata-dosha', 'not-an-array')
      ).rejects.toMatchObject({
        name: 'ValidationError',
        message: 'User ID, topic slug, and answers array are required',
        statusCode: 400
      });
    });

    it('should throw TopicNotFoundError when topic does not exist', async () => {
      Topic.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(null)
      });

      await expect(
        QuizService.submitQuiz('user123', 'non-existent', [])
      ).rejects.toMatchObject({
        name: 'TopicNotFoundError',
        message: 'Topic not found',
        statusCode: 404
      });
    });

    it('should throw ValidationError if topic has no quiz questions', async () => {
      const mockTopic = {
        slug: 'vata-dosha',
        quizQuestions: []
      };

      Topic.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopic)
      });

      await expect(
        QuizService.submitQuiz('user123', 'vata-dosha', [])
      ).rejects.toMatchObject({
        name: 'ValidationError',
        message: 'No quiz questions available for this topic',
        statusCode: 400
      });
    });

    it('should throw ValidationError if answer count does not match question count', async () => {
      const mockTopic = {
        slug: 'vata-dosha',
        quizQuestions: [
          { questionId: 'q1', question: 'Q1', options: ['A', 'B', 'C', 'D'], correctOption: 0 },
          { questionId: 'q2', question: 'Q2', options: ['A', 'B', 'C', 'D'], correctOption: 1 }
        ]
      };

      const answers = [
        { questionId: 'q1', selectedOption: 0 }
      ];

      Topic.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopic)
      });

      await expect(
        QuizService.submitQuiz('user123', 'vata-dosha', answers)
      ).rejects.toMatchObject({
        name: 'ValidationError',
        message: 'Answers must be provided for all questions',
        statusCode: 400
      });
    });

    it('should throw ValidationError if answer is missing questionId', async () => {
      const mockTopic = {
        slug: 'vata-dosha',
        quizQuestions: [
          { questionId: 'q1', question: 'Q1', options: ['A', 'B', 'C', 'D'], correctOption: 0 }
        ]
      };

      const answers = [
        { selectedOption: 0 }
      ];

      Topic.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopic)
      });

      await expect(
        QuizService.submitQuiz('user123', 'vata-dosha', answers)
      ).rejects.toMatchObject({
        name: 'ValidationError',
        message: 'Each answer must have questionId and selectedOption',
        statusCode: 400
      });
    });

    it('should throw ValidationError if answer is missing selectedOption', async () => {
      const mockTopic = {
        slug: 'vata-dosha',
        quizQuestions: [
          { questionId: 'q1', question: 'Q1', options: ['A', 'B', 'C', 'D'], correctOption: 0 }
        ]
      };

      const answers = [
        { questionId: 'q1' }
      ];

      Topic.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopic)
      });

      await expect(
        QuizService.submitQuiz('user123', 'vata-dosha', answers)
      ).rejects.toMatchObject({
        name: 'ValidationError',
        message: 'Each answer must have questionId and selectedOption',
        statusCode: 400
      });
    });

    it('should throw ValidationError if questionId is invalid', async () => {
      const mockTopic = {
        slug: 'vata-dosha',
        quizQuestions: [
          { questionId: 'q1', question: 'Q1', options: ['A', 'B', 'C', 'D'], correctOption: 0 }
        ]
      };

      const answers = [
        { questionId: 'invalid-id', selectedOption: 0 }
      ];

      Topic.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopic)
      });

      await expect(
        QuizService.submitQuiz('user123', 'vata-dosha', answers)
      ).rejects.toMatchObject({
        name: 'ValidationError',
        message: 'Invalid question ID: invalid-id',
        statusCode: 400
      });
    });
  });

  describe('getStats', () => {
    it('should return quiz statistics for a user', async () => {
      const mockUser = { _id: 'user123' };
      const mockQuizResults = [
        { userId: 'user123', topicSlug: 'topic-1', score: 80, totalQuestions: 5, correctAnswers: 4 },
        { userId: 'user123', topicSlug: 'topic-2', score: 60, totalQuestions: 5, correctAnswers: 3 },
        { userId: 'user123', topicSlug: 'topic-3', score: 100, totalQuestions: 5, correctAnswers: 5 }
      ];

      const mockTopics = [
        { slug: 'topic-1', subjectSlug: 'subject-a' },
        { slug: 'topic-2', subjectSlug: 'subject-a' },
        { slug: 'topic-3', subjectSlug: 'subject-b' }
      ];

      User.findById.mockResolvedValue(mockUser);
      QuizResult.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockQuizResults)
      });
      Topic.find.mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue(mockTopics)
        })
      });

      const result = await QuizService.getStats('user123');

      expect(result.totalQuizzes).toBe(3);
      expect(result.averageScore).toBe(80); // (80 + 60 + 100) / 3 = 80
      expect(result.bySubject).toBeDefined();
    });

    it('should group statistics by subject', async () => {
      const mockUser = { _id: 'user123' };
      const mockQuizResults = [
        { userId: 'user123', topicSlug: 'topic-1', score: 80, totalQuestions: 5, correctAnswers: 4 },
        { userId: 'user123', topicSlug: 'topic-2', score: 60, totalQuestions: 5, correctAnswers: 3 },
        { userId: 'user123', topicSlug: 'topic-3', score: 100, totalQuestions: 5, correctAnswers: 5 }
      ];

      const mockTopics = [
        { slug: 'topic-1', subjectSlug: 'subject-a' },
        { slug: 'topic-2', subjectSlug: 'subject-a' },
        { slug: 'topic-3', subjectSlug: 'subject-b' }
      ];

      User.findById.mockResolvedValue(mockUser);
      QuizResult.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockQuizResults)
      });
      Topic.find.mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue(mockTopics)
        })
      });

      const result = await QuizService.getStats('user123');

      expect(result.bySubject['subject-a']).toEqual({
        totalQuizzes: 2,
        averageScore: 70 // (80 + 60) / 2 = 70
      });

      expect(result.bySubject['subject-b']).toEqual({
        totalQuizzes: 1,
        averageScore: 100
      });
    });

    it('should return zero statistics for user with no quiz results', async () => {
      const mockUser = { _id: 'user123' };

      User.findById.mockResolvedValue(mockUser);
      QuizResult.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue([])
      });

      const result = await QuizService.getStats('user123');

      expect(result.totalQuizzes).toBe(0);
      expect(result.averageScore).toBe(0);
      expect(result.bySubject).toEqual({});
    });

    it('should throw UserNotFoundError if user does not exist', async () => {
      User.findById.mockResolvedValue(null);

      await expect(
        QuizService.getStats('nonexistent')
      ).rejects.toMatchObject({
        name: 'UserNotFoundError',
        message: 'User not found',
        statusCode: 404
      });
    });

    it('should handle quiz results with topics not in database', async () => {
      const mockUser = { _id: 'user123' };
      const mockQuizResults = [
        { userId: 'user123', topicSlug: 'topic-1', score: 80, totalQuestions: 5, correctAnswers: 4 },
        { userId: 'user123', topicSlug: 'deleted-topic', score: 60, totalQuestions: 5, correctAnswers: 3 }
      ];

      const mockTopics = [
        { slug: 'topic-1', subjectSlug: 'subject-a' }
      ];

      User.findById.mockResolvedValue(mockUser);
      QuizResult.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockQuizResults)
      });
      Topic.find.mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue(mockTopics)
        })
      });

      const result = await QuizService.getStats('user123');

      expect(result.totalQuizzes).toBe(2);
      expect(result.averageScore).toBe(70); // (80 + 60) / 2 = 70
      // Only subject-a should be in bySubject (deleted-topic has no subject mapping)
      expect(Object.keys(result.bySubject)).toEqual(['subject-a']);
    });

    it('should round average scores correctly', async () => {
      const mockUser = { _id: 'user123' };
      const mockQuizResults = [
        { userId: 'user123', topicSlug: 'topic-1', score: 85, totalQuestions: 5, correctAnswers: 4 },
        { userId: 'user123', topicSlug: 'topic-2', score: 90, totalQuestions: 5, correctAnswers: 5 }
      ];

      const mockTopics = [
        { slug: 'topic-1', subjectSlug: 'subject-a' },
        { slug: 'topic-2', subjectSlug: 'subject-a' }
      ];

      User.findById.mockResolvedValue(mockUser);
      QuizResult.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockQuizResults)
      });
      Topic.find.mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue(mockTopics)
        })
      });

      const result = await QuizService.getStats('user123');

      expect(result.averageScore).toBe(88); // (85 + 90) / 2 = 87.5 rounded to 88
    });
  });
});
