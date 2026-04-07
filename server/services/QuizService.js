/**
 * QuizService
 * 
 * Manages quiz and flashcard functionality including question retrieval,
 * answer submission, scoring, and statistics aggregation.
 */

const Topic = require('../models/Topic');
const QuizResult = require('../models/QuizResult');
const User = require('../models/User');
const LanguageService = require('./LanguageService');

class QuizService {
  /**
   * Get quiz questions for a topic with randomized order
   * @param {string} topicSlug - Topic slug
   * @param {string} language - Language code ("en" or "mr")
   * @returns {Promise<Array>} Array of quiz questions
   * @throws {Error} TopicNotFoundError
   */
  async getQuiz(topicSlug, language) {
    const topic = await Topic.findOne({ slug: topicSlug }).lean();

    if (!topic) {
      const error = new Error('Topic not found');
      error.name = 'TopicNotFoundError';
      error.statusCode = 404;
      throw error;
    }

    // Check if topic has quiz questions
    if (!topic.quizQuestions || topic.quizQuestions.length === 0) {
      return [];
    }

    const validLang = LanguageService.validateLanguage(language);

    // Format questions with language-specific content
    const questions = topic.quizQuestions.map(q => ({
      questionId: q.questionId,
      question: validLang === 'mr' ? (q.questionMr || q.question) : q.question,
      options: validLang === 'mr' ? (q.optionsMr || q.options) : q.options
    }));

    // Randomize question order
    return this._shuffleArray(questions);
  }

  /**
   * Get flashcards for a topic
   * @param {string} topicSlug - Topic slug
   * @param {string} language - Language code ("en" or "mr")
   * @returns {Promise<Array>} Array of flashcard objects
   * @throws {Error} TopicNotFoundError
   */
  async getFlashcards(topicSlug, language) {
    const topic = await Topic.findOne({ slug: topicSlug }).lean();

    if (!topic) {
      const error = new Error('Topic not found');
      error.name = 'TopicNotFoundError';
      error.statusCode = 404;
      throw error;
    }

    // Check if topic has flashcards
    if (!topic.flashcards || topic.flashcards.length === 0) {
      return [];
    }

    const validLang = LanguageService.validateLanguage(language);

    // Format flashcards with language-specific content
    const flashcards = topic.flashcards.map(f => ({
      front: validLang === 'mr' ? (f.frontMr || f.front) : f.front,
      back: validLang === 'mr' ? (f.backMr || f.back) : f.back
    }));

    return flashcards;
  }

  /**
   * Submit quiz answers and calculate score
   * @param {string} userId - User ID
   * @param {string} topicSlug - Topic slug
   * @param {Array} answers - Array of { questionId, selectedOption }
   * @returns {Promise<Object>} { score, totalQuestions, correctAnswers, results }
   * @throws {Error} ValidationError, TopicNotFoundError
   */
  async submitQuiz(userId, topicSlug, answers) {
    // Validate inputs
    if (!userId || !topicSlug || !Array.isArray(answers)) {
      const error = new Error('User ID, topic slug, and answers array are required');
      error.name = 'ValidationError';
      error.statusCode = 400;
      throw error;
    }

    // Get topic with quiz questions
    const topic = await Topic.findOne({ slug: topicSlug }).lean();

    if (!topic) {
      const error = new Error('Topic not found');
      error.name = 'TopicNotFoundError';
      error.statusCode = 404;
      throw error;
    }

    if (!topic.quizQuestions || topic.quizQuestions.length === 0) {
      const error = new Error('No quiz questions available for this topic');
      error.name = 'ValidationError';
      error.statusCode = 400;
      throw error;
    }

    // Validate that all questions have answers
    if (answers.length !== topic.quizQuestions.length) {
      const error = new Error('Answers must be provided for all questions');
      error.name = 'ValidationError';
      error.statusCode = 400;
      throw error;
    }

    // Create a map of correct answers
    const correctAnswersMap = {};
    topic.quizQuestions.forEach(q => {
      correctAnswersMap[q.questionId] = q.correctOption;
    });

    // Validate and score answers
    let correctAnswers = 0;
    const results = [];

    for (const answer of answers) {
      const { questionId, selectedOption } = answer;

      if (!questionId || selectedOption === undefined) {
        const error = new Error('Each answer must have questionId and selectedOption');
        error.name = 'ValidationError';
        error.statusCode = 400;
        throw error;
      }

      const correctOption = correctAnswersMap[questionId];
      
      if (correctOption === undefined) {
        const error = new Error(`Invalid question ID: ${questionId}`);
        error.name = 'ValidationError';
        error.statusCode = 400;
        throw error;
      }

      const isCorrect = selectedOption === correctOption;
      if (isCorrect) {
        correctAnswers++;
      }

      results.push({
        questionId,
        selectedOption,
        correct: isCorrect
      });
    }

    // Calculate score
    const totalQuestions = topic.quizQuestions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    // Save quiz result
    const quizResult = new QuizResult({
      userId,
      topicSlug,
      score,
      totalQuestions,
      correctAnswers,
      answers: results
    });

    await quizResult.save();

    return {
      score,
      totalQuestions,
      correctAnswers,
      results
    };
  }

  /**
   * Get quiz statistics for a user
   * @param {string} userId - User ID
   * @returns {Promise<Object>} { averageScore, totalQuizzes, bySubject }
   * @throws {Error} UserNotFoundError
   */
  async getStats(userId) {
    // Validate user exists
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.name = 'UserNotFoundError';
      error.statusCode = 404;
      throw error;
    }

    // Get all quiz results for user
    const quizResults = await QuizResult.find({ userId }).lean();

    if (quizResults.length === 0) {
      return {
        averageScore: 0,
        totalQuizzes: 0,
        bySubject: {}
      };
    }

    // Calculate overall statistics
    const totalQuizzes = quizResults.length;
    const totalScore = quizResults.reduce((sum, result) => sum + result.score, 0);
    const averageScore = Math.round(totalScore / totalQuizzes);

    // Get topics to map slugs to subjects
    const topicSlugs = [...new Set(quizResults.map(r => r.topicSlug))];
    const topics = await Topic.find({ slug: { $in: topicSlugs } })
      .select('slug subjectSlug')
      .lean();

    const topicToSubject = {};
    topics.forEach(t => {
      topicToSubject[t.slug] = t.subjectSlug;
    });

    // Group by subject
    const bySubject = {};
    
    quizResults.forEach(result => {
      const subjectSlug = topicToSubject[result.topicSlug];
      
      if (subjectSlug) {
        if (!bySubject[subjectSlug]) {
          bySubject[subjectSlug] = {
            totalQuizzes: 0,
            totalScore: 0,
            averageScore: 0
          };
        }

        bySubject[subjectSlug].totalQuizzes++;
        bySubject[subjectSlug].totalScore += result.score;
      }
    });

    // Calculate average scores for each subject
    Object.keys(bySubject).forEach(subjectSlug => {
      const subject = bySubject[subjectSlug];
      subject.averageScore = Math.round(subject.totalScore / subject.totalQuizzes);
      delete subject.totalScore; // Remove intermediate calculation
    });

    return {
      averageScore,
      totalQuizzes,
      bySubject
    };
  }

  /**
   * Shuffle array using Fisher-Yates algorithm
   * @private
   * @param {Array} array - Array to shuffle
   * @returns {Array} Shuffled array
   */
  _shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

module.exports = new QuizService();
