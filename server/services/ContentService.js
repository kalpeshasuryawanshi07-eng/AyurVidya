/**
 * ContentService
 * 
 * Provides content retrieval for topics and subjects with bilingual support.
 * Handles filtering, pagination, and navigation between topics.
 */

const Topic = require('../models/Topic');
const Subject = require('../models/Subject');
const LanguageService = require('./LanguageService');

class ContentService {
  /**
   * Get topic by slug with language-specific content
   * @param {string} slug - Topic slug
   * @param {string} language - Language code ("en" or "mr")
   * @returns {Promise<Object>} Topic object with content in specified language
   * @throws {Error} TopicNotFoundError
   */
  async getTopicBySlug(slug, language) {
    const topic = await Topic.findOne({ slug });

    if (!topic) {
      const error = new Error('Topic not found');
      error.name = 'TopicNotFoundError';
      error.statusCode = 404;
      throw error;
    }

    // Convert to plain object
    const topicObj = topic.toObject();

    // Apply language selection
    const validLang = LanguageService.validateLanguage(language);
    const localizedContent = LanguageService.selectContent(topicObj, validLang);

    return localizedContent;
  }

  /**
   * Get topics with filtering and pagination
   * @param {Object} filters - Filter options { subjectSlug, difficulty }
   * @param {Object} pagination - Pagination options { page, limit }
   * @param {string} language - Language code ("en" or "mr")
   * @returns {Promise<Object>} { topics, total, page, limit }
   * @throws {Error} ValidationError
   */
  async getTopics(filters = {}, pagination = {}, language = 'en') {
    const { subjectSlug, difficulty } = filters;
    const { page = 1, limit = 20 } = pagination;

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100) {
      const error = new Error('Invalid pagination parameters');
      error.name = 'ValidationError';
      error.statusCode = 400;
      throw error;
    }

    // Build query
    const query = {};
    if (subjectSlug) {
      query.subjectSlug = subjectSlug;
    }
    if (difficulty) {
      if (!['beginner', 'intermediate', 'advanced'].includes(difficulty)) {
        const error = new Error('Invalid difficulty level');
        error.name = 'ValidationError';
        error.statusCode = 400;
        throw error;
      }
      query.difficulty = difficulty;
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [topics, total] = await Promise.all([
      Topic.find(query)
        .sort({ orderIndex: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Topic.countDocuments(query)
    ]);

    // Localize results
    const localizedTopics = topics.map(topic => 
      LanguageService.selectContent(topic, language)
    );

    return {
      topics: localizedTopics,
      total,
      page,
      limit
    };
  }

  /**
   * Get adjacent topics for navigation (previous and next)
   * @param {string} slug - Current topic slug
   * @param {string} language - Language code ("en" or "mr")
   * @returns {Promise<Object>} { previous, next }
   * @throws {Error} TopicNotFoundError
   */
  async getAdjacentTopics(slug, language = 'en') {
    const currentTopic = await Topic.findOne({ slug });

    if (!currentTopic) {
      const error = new Error('Topic not found');
      error.name = 'TopicNotFoundError';
      error.statusCode = 404;
      throw error;
    }

    const validLang = LanguageService.validateLanguage(language);

    // Find previous topic (same subject, lower orderIndex)
    const previousTopic = await Topic.findOne({
      subjectSlug: currentTopic.subjectSlug,
      orderIndex: { $lt: currentTopic.orderIndex }
    })
      .sort({ orderIndex: -1 })
      .select('slug title titleMr')
      .lean();

    // Find next topic (same subject, higher orderIndex)
    const nextTopic = await Topic.findOne({
      subjectSlug: currentTopic.subjectSlug,
      orderIndex: { $gt: currentTopic.orderIndex }
    })
      .sort({ orderIndex: 1 })
      .select('slug title titleMr')
      .lean();

    return {
      previous: previousTopic ? LanguageService.selectContent(previousTopic, validLang) : null,
      next: nextTopic ? LanguageService.selectContent(nextTopic, validLang) : null
    };
  }

  /**
   * Get subjects with filtering
   * @param {Object} filters - Filter options { year }
   * @param {string} language - Language code ("en" or "mr")
   * @returns {Promise<Array>} Array of subject objects
   * @throws {Error} ValidationError
   */
  async getSubjects(filters = {}, language = 'en') {
    const { year } = filters;

    // Build query
    const query = {};
    if (year !== undefined) {
      if (year < 1 || year > 5) {
        const error = new Error('Year must be between 1 and 5');
        error.name = 'ValidationError';
        error.statusCode = 400;
        throw error;
      }
      query.year = year;
    }

    // Execute query
    const subjects = await Subject.find(query)
      .sort({ orderIndex: 1 })
      .lean();

    // Localize results
    const localizedSubjects = subjects.map(subject => 
      LanguageService.selectContent(subject, language)
    );

    return localizedSubjects;
  }

  /**
   * Get subject by slug with topic list
   * @param {string} slug - Subject slug
   * @param {string} language - Language code ("en" or "mr")
   * @returns {Promise<Object>} Subject with topic list
   * @throws {Error} SubjectNotFoundError
   */
  async getSubjectBySlug(slug, language) {
    const subject = await Subject.findOne({ slug }).lean();

    if (!subject) {
      const error = new Error('Subject not found');
      error.name = 'SubjectNotFoundError';
      error.statusCode = 404;
      throw error;
    }

    // Get topics for this subject
    const topics = await Topic.find({ subjectSlug: slug })
      .sort({ orderIndex: 1 })
      .select('slug title titleMr difficulty estimatedMins orderIndex')
      .lean();

    // Apply language selection to subject
    const validLang = LanguageService.validateLanguage(language);
    const localizedSubject = LanguageService.selectContent(subject, validLang);

    // Apply language selection to topics
    const localizedTopics = topics.map(topic => 
      LanguageService.selectContent(topic, validLang)
    );

    return {
      ...localizedSubject,
      topics: localizedTopics
    };
  }
}

module.exports = new ContentService();
