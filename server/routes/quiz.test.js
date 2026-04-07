const request = require('supertest');
const express = require('express');
const quizRoutes = require('./quiz');
const QuizService = require('../services/QuizService');
const { authenticate } = require('../middleware/auth');

// Mock dependencies
jest.mock('../services/QuizService');
jest.mock('../middleware/auth');

describe('Quiz Routes', () => {
  let app;

  beforeEach(() => {
    // Create Express app for testing
    app = express();
    app.use(express.json());
    app.use('/api', quizRoutes);

    // Reset mocks
    jest.clearAllMocks();

    // Mock authenticate middleware to pass through
    authenticate.mockImplementation((req, res, next) => {
      req.user = { userId: 'user123', role: 'student' };
      next();
    });
  });

  describe('GET /api/topics/:slug/quiz', () => {
    it('should return quiz questions for valid topic slug', async () => {
      const mockQuestions = [
        {
          questionId: 'q1',
          question: 'What is Vata?',
          options: ['Air', 'Fire', 'Water', 'Earth']
        },
        {
          questionId: 'q2',
          question: 'What is Pitta?',
          options: ['Air', 'Fire', 'Water', 'Earth']
        }
      ];

      QuizService.getQuiz.mockResolvedValue(mockQuestions);

      const response = await request(app)
        .get('/api/topics/vata-dosha/quiz')
        .expect(200);

      expect(response.body).toEqual({
        status: 'success',
        message: 'Quiz questions retrieved successfully',
        data: { questions: mockQuestions }
      });

      expect(QuizService.getQuiz).toHaveBeenCalledWith('vata-dosha', undefined);
    });

    it('should return quiz questions with language parameter', async () => {
      const mockQuestions = [
        {
          questionId: 'q1',
          question: 'वात काय आहे?',
          options: ['वायु', 'अग्नी', 'जल', 'पृथ्वी']
        }
      ];

      QuizService.getQuiz.mockResolvedValue(mockQuestions);

      const response = await request(app)
        .get('/api/topics/vata-dosha/quiz?lang=mr')
        .expect(200);

      expect(response.body.data.questions).toEqual(mockQuestions);
      expect(QuizService.getQuiz).toHaveBeenCalledWith('vata-dosha', 'mr');
    });

    it('should return 400 for invalid slug format', async () => {
      const response = await request(app)
        .get('/api/topics/Invalid_Slug/quiz')
        .expect(400);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
      expect(QuizService.getQuiz).not.toHaveBeenCalled();
    });

    it('should return 400 for invalid language parameter', async () => {
      const response = await request(app)
        .get('/api/topics/vata-dosha/quiz?lang=fr')
        .expect(400);

      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Language must be "en" or "mr"');
    });

    it('should return 404 when topic not found', async () => {
      const error = new Error('Topic not found');
      error.name = 'TopicNotFoundError';
      QuizService.getQuiz.mockRejectedValue(error);

      const response = await request(app)
        .get('/api/topics/nonexistent-topic/quiz')
        .expect(404);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Topic not found');
    });

    it('should return 500 for unexpected errors', async () => {
      QuizService.getQuiz.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/api/topics/vata-dosha/quiz')
        .expect(500);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Failed to retrieve quiz questions');
    });

    it('should return empty array when topic has no quiz questions', async () => {
      QuizService.getQuiz.mockResolvedValue([]);

      const response = await request(app)
        .get('/api/topics/vata-dosha/quiz')
        .expect(200);

      expect(response.body.data.questions).toEqual([]);
    });
  });

  describe('GET /api/topics/:slug/flashcards', () => {
    it('should return flashcards for valid topic slug', async () => {
      const mockFlashcards = [
        { front: 'What is Vata?', back: 'Air and space element' },
        { front: 'What is Pitta?', back: 'Fire and water element' }
      ];

      QuizService.getFlashcards.mockResolvedValue(mockFlashcards);

      const response = await request(app)
        .get('/api/topics/vata-dosha/flashcards')
        .expect(200);

      expect(response.body).toEqual({
        status: 'success',
        message: 'Flashcards retrieved successfully',
        data: { flashcards: mockFlashcards }
      });

      expect(QuizService.getFlashcards).toHaveBeenCalledWith('vata-dosha', undefined);
    });

    it('should return flashcards with language parameter', async () => {
      const mockFlashcards = [
        { front: 'वात काय आहे?', back: 'वायु आणि आकाश तत्व' }
      ];

      QuizService.getFlashcards.mockResolvedValue(mockFlashcards);

      const response = await request(app)
        .get('/api/topics/vata-dosha/flashcards?lang=mr')
        .expect(200);

      expect(response.body.data.flashcards).toEqual(mockFlashcards);
      expect(QuizService.getFlashcards).toHaveBeenCalledWith('vata-dosha', 'mr');
    });

    it('should return 400 for invalid slug format', async () => {
      const response = await request(app)
        .get('/api/topics/Invalid Slug/flashcards')
        .expect(400);

      expect(response.body.status).toBe('error');
      expect(QuizService.getFlashcards).not.toHaveBeenCalled();
    });

    it('should return 404 when topic not found', async () => {
      const error = new Error('Topic not found');
      error.name = 'TopicNotFoundError';
      QuizService.getFlashcards.mockRejectedValue(error);

      const response = await request(app)
        .get('/api/topics/nonexistent-topic/flashcards')
        .expect(404);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Topic not found');
    });

    it('should return 500 for unexpected errors', async () => {
      QuizService.getFlashcards.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/api/topics/vata-dosha/flashcards')
        .expect(500);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Failed to retrieve flashcards');
    });

    it('should return empty array when topic has no flashcards', async () => {
      QuizService.getFlashcards.mockResolvedValue([]);

      const response = await request(app)
        .get('/api/topics/vata-dosha/flashcards')
        .expect(200);

      expect(response.body.data.flashcards).toEqual([]);
    });
  });

  describe('POST /api/quiz/submit', () => {
    it('should submit quiz and return results', async () => {
      const mockResult = {
        score: 80,
        totalQuestions: 5,
        correctAnswers: 4,
        results: [
          { questionId: 'q1', selectedOption: 0, correct: true },
          { questionId: 'q2', selectedOption: 1, correct: true },
          { questionId: 'q3', selectedOption: 2, correct: false },
          { questionId: 'q4', selectedOption: 0, correct: true },
          { questionId: 'q5', selectedOption: 3, correct: true }
        ]
      };

      QuizService.submitQuiz.mockResolvedValue(mockResult);

      const response = await request(app)
        .post('/api/quiz/submit')
        .send({
          topicSlug: 'vata-dosha',
          answers: [
            { questionId: 'q1', selectedOption: 0 },
            { questionId: 'q2', selectedOption: 1 },
            { questionId: 'q3', selectedOption: 2 },
            { questionId: 'q4', selectedOption: 0 },
            { questionId: 'q5', selectedOption: 3 }
          ]
        })
        .expect(200);

      expect(response.body).toEqual({
        status: 'success',
        message: 'Quiz submitted successfully',
        data: { result: mockResult }
      });

      expect(QuizService.submitQuiz).toHaveBeenCalledWith(
        'user123',
        'vata-dosha',
        [
          { questionId: 'q1', selectedOption: 0 },
          { questionId: 'q2', selectedOption: 1 },
          { questionId: 'q3', selectedOption: 2 },
          { questionId: 'q4', selectedOption: 0 },
          { questionId: 'q5', selectedOption: 3 }
        ]
      );
    });

    it('should require authentication', async () => {
      authenticate.mockImplementation((req, res, next) => {
        return res.status(401).json({
          status: 'error',
          message: 'No token provided',
          errors: ['Authorization header must be in format: Bearer <token>']
        });
      });

      const response = await request(app)
        .post('/api/quiz/submit')
        .send({
          topicSlug: 'vata-dosha',
          answers: [{ questionId: 'q1', selectedOption: 0 }]
        })
        .expect(401);

      expect(response.body.status).toBe('error');
      expect(QuizService.submitQuiz).not.toHaveBeenCalled();
    });

    it('should return 400 when topicSlug is missing', async () => {
      const response = await request(app)
        .post('/api/quiz/submit')
        .send({
          answers: [{ questionId: 'q1', selectedOption: 0 }]
        })
        .expect(400);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
      expect(QuizService.submitQuiz).not.toHaveBeenCalled();
    });

    it('should return 400 when answers is not an array', async () => {
      const response = await request(app)
        .post('/api/quiz/submit')
        .send({
          topicSlug: 'vata-dosha',
          answers: 'not-an-array'
        })
        .expect(400);

      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Answers must be a non-empty array');
    });

    it('should return 400 when answers array is empty', async () => {
      const response = await request(app)
        .post('/api/quiz/submit')
        .send({
          topicSlug: 'vata-dosha',
          answers: []
        })
        .expect(400);

      expect(response.body.status).toBe('error');
      expect(response.body.errors).toContain('Answers must be a non-empty array');
    });

    it('should return 400 when answer is missing questionId', async () => {
      const response = await request(app)
        .post('/api/quiz/submit')
        .send({
          topicSlug: 'vata-dosha',
          answers: [{ selectedOption: 0 }]
        })
        .expect(400);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
    });

    it('should return 400 when answer is missing selectedOption', async () => {
      const response = await request(app)
        .post('/api/quiz/submit')
        .send({
          topicSlug: 'vata-dosha',
          answers: [{ questionId: 'q1' }]
        })
        .expect(400);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
    });

    it('should return 400 for invalid slug format', async () => {
      const response = await request(app)
        .post('/api/quiz/submit')
        .send({
          topicSlug: 'Invalid Slug',
          answers: [{ questionId: 'q1', selectedOption: 0 }]
        })
        .expect(400);

      expect(response.body.status).toBe('error');
      expect(QuizService.submitQuiz).not.toHaveBeenCalled();
    });

    it('should return 400 when service throws ValidationError', async () => {
      const error = new Error('Answers must be provided for all questions');
      error.name = 'ValidationError';
      error.statusCode = 400;
      QuizService.submitQuiz.mockRejectedValue(error);

      const response = await request(app)
        .post('/api/quiz/submit')
        .send({
          topicSlug: 'vata-dosha',
          answers: [{ questionId: 'q1', selectedOption: 0 }]
        })
        .expect(400);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Answers must be provided for all questions');
    });

    it('should return 404 when topic not found', async () => {
      const error = new Error('Topic not found');
      error.name = 'TopicNotFoundError';
      QuizService.submitQuiz.mockRejectedValue(error);

      const response = await request(app)
        .post('/api/quiz/submit')
        .send({
          topicSlug: 'nonexistent-topic',
          answers: [{ questionId: 'q1', selectedOption: 0 }]
        })
        .expect(404);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Topic not found');
    });

    it('should return 500 for unexpected errors', async () => {
      QuizService.submitQuiz.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/api/quiz/submit')
        .send({
          topicSlug: 'vata-dosha',
          answers: [{ questionId: 'q1', selectedOption: 0 }]
        })
        .expect(500);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Failed to submit quiz');
    });
  });

  describe('GET /api/quiz/stats/me', () => {
    it('should return user quiz statistics', async () => {
      const mockStats = {
        averageScore: 85,
        totalQuizzes: 10,
        bySubject: {
          'basic-principles': {
            totalQuizzes: 5,
            averageScore: 90
          },
          'anatomy': {
            totalQuizzes: 5,
            averageScore: 80
          }
        }
      };

      QuizService.getStats.mockResolvedValue(mockStats);

      const response = await request(app)
        .get('/api/quiz/stats/me')
        .expect(200);

      expect(response.body).toEqual({
        status: 'success',
        message: 'Quiz statistics retrieved successfully',
        data: { stats: mockStats }
      });

      expect(QuizService.getStats).toHaveBeenCalledWith('user123');
    });

    it('should require authentication', async () => {
      authenticate.mockImplementation((req, res, next) => {
        return res.status(401).json({
          status: 'error',
          message: 'No token provided',
          errors: ['Authorization header must be in format: Bearer <token>']
        });
      });

      const response = await request(app)
        .get('/api/quiz/stats/me')
        .expect(401);

      expect(response.body.status).toBe('error');
      expect(QuizService.getStats).not.toHaveBeenCalled();
    });

    it('should return 404 when user not found', async () => {
      const error = new Error('User not found');
      error.name = 'UserNotFoundError';
      QuizService.getStats.mockRejectedValue(error);

      const response = await request(app)
        .get('/api/quiz/stats/me')
        .expect(404);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('User not found');
    });

    it('should return 500 for unexpected errors', async () => {
      QuizService.getStats.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/api/quiz/stats/me')
        .expect(500);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Failed to retrieve quiz statistics');
    });

    it('should return empty statistics for user with no quizzes', async () => {
      const mockStats = {
        averageScore: 0,
        totalQuizzes: 0,
        bySubject: {}
      };

      QuizService.getStats.mockResolvedValue(mockStats);

      const response = await request(app)
        .get('/api/quiz/stats/me')
        .expect(200);

      expect(response.body.data.stats).toEqual(mockStats);
    });
  });
});
