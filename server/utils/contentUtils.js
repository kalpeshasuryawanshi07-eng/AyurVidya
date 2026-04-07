/**
 * Content Utilities
 * 
 * Provides content parsing and formatting utilities for topic content.
 * Handles validation, HTML sanitization, and consistent formatting.
 */

/**
 * Simple HTML sanitizer to prevent XSS attacks
 * Allows only safe HTML tags and removes dangerous attributes
 */
class HTMLSanitizer {
  static sanitize(html) {
    if (typeof html !== 'string') {
      return '';
    }

    // List of allowed tags
    const allowedTags = [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'a', 'span', 'div'
    ];

    // List of allowed attributes
    const allowedAttrs = ['href', 'target', 'rel', 'class'];

    // Remove script tags and their content
    let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    // Remove event handlers (onclick, onerror, etc.)
    sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
    sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '');

    // Remove javascript: protocol
    sanitized = sanitized.replace(/javascript:/gi, '');

    // Remove data: protocol (can be used for XSS)
    sanitized = sanitized.replace(/data:text\/html/gi, '');

    // Remove style tags
    sanitized = sanitized.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

    // Remove iframe, object, embed tags
    sanitized = sanitized.replace(/<(iframe|object|embed)[^>]*>.*?<\/\1>/gi, '');

    // Remove dangerous tags by replacing with empty string
    const dangerousTags = ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button'];
    dangerousTags.forEach(tag => {
      const regex = new RegExp(`<${tag}[^>]*>.*?<\/${tag}>`, 'gi');
      sanitized = sanitized.replace(regex, '');
      sanitized = sanitized.replace(new RegExp(`<${tag}[^>]*>`, 'gi'), '');
    });

    return sanitized.trim();
  }
}

/**
 * Content_Parser
 * Parses and validates topic content from JSON format into database schema
 */
class Content_Parser {
  /**
   * Parse topic content with validation
   * @param {Object} contentData - Raw content data to parse
   * @returns {Object} Validated and parsed content object
   * @throws {Error} ValidationError if required fields are missing or invalid
   */
  static parse(contentData) {
    if (!contentData || typeof contentData !== 'object') {
      const error = new Error('Content data must be an object');
      error.name = 'ValidationError';
      error.statusCode = 400;
      throw error;
    }

    // Validate required fields
    const requiredFields = [
      'slug',
      'subjectSlug',
      'title',
      'estimatedMins',
      'orderIndex',
      'introduction',
      'historicalContext',
      'coreExplanation',
      'clinicalApplications',
      'modernComparison'
    ];

    const missingFields = requiredFields.filter(field => !contentData[field]);
    if (missingFields.length > 0) {
      const error = new Error(`Missing required fields: ${missingFields.join(', ')}`);
      error.name = 'ValidationError';
      error.statusCode = 400;
      throw error;
    }

    // Parse and sanitize content
    const parsed = {
      slug: this._validateSlug(contentData.slug),
      subjectSlug: this._validateSlug(contentData.subjectSlug),
      title: this._sanitizeText(contentData.title),
      titleMr: contentData.titleMr ? this._sanitizeText(contentData.titleMr) : undefined,
      difficulty: this._validateDifficulty(contentData.difficulty),
      estimatedMins: this._validateNumber(contentData.estimatedMins, 'estimatedMins'),
      orderIndex: this._validateNumber(contentData.orderIndex, 'orderIndex'),
      
      // English content fields
      introduction: this._sanitizeHtml(contentData.introduction),
      historicalContext: this._sanitizeHtml(contentData.historicalContext),
      coreExplanation: this._sanitizeHtml(contentData.coreExplanation),
      clinicalApplications: this._sanitizeHtml(contentData.clinicalApplications),
      modernComparison: this._sanitizeHtml(contentData.modernComparison),
      summary: this._parseArray(contentData.summary),
      furtherReading: this._parseArray(contentData.furtherReading),
      
      // Marathi content fields (optional)
      introductionMr: contentData.introductionMr ? this._sanitizeHtml(contentData.introductionMr) : undefined,
      historicalContextMr: contentData.historicalContextMr ? this._sanitizeHtml(contentData.historicalContextMr) : undefined,
      coreExplanationMr: contentData.coreExplanationMr ? this._sanitizeHtml(contentData.coreExplanationMr) : undefined,
      clinicalApplicationsMr: contentData.clinicalApplicationsMr ? this._sanitizeHtml(contentData.clinicalApplicationsMr) : undefined,
      modernComparisonMr: contentData.modernComparisonMr ? this._sanitizeHtml(contentData.modernComparisonMr) : undefined,
      summaryMr: contentData.summaryMr ? this._parseArray(contentData.summaryMr) : undefined,
      furtherReadingMr: contentData.furtherReadingMr ? this._parseArray(contentData.furtherReadingMr) : undefined,
      
      // Shloka (optional)
      shloka: contentData.shloka ? this._parseShloka(contentData.shloka) : undefined
    };

    // Remove undefined fields
    Object.keys(parsed).forEach(key => {
      if (parsed[key] === undefined) {
        delete parsed[key];
      }
    });

    return parsed;
  }

  /**
   * Validate slug format
   * @private
   */
  static _validateSlug(slug) {
    if (typeof slug !== 'string') {
      const error = new Error('Slug must be a string');
      error.name = 'ValidationError';
      error.statusCode = 400;
      throw error;
    }

    const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    const normalizedSlug = slug.toLowerCase().trim();

    if (!slugPattern.test(normalizedSlug)) {
      const error = new Error(`Invalid slug format: ${slug}`);
      error.name = 'ValidationError';
      error.statusCode = 400;
      throw error;
    }

    return normalizedSlug;
  }

  /**
   * Validate difficulty level
   * @private
   */
  static _validateDifficulty(difficulty) {
    if (!difficulty) {
      return undefined;
    }

    const validLevels = ['beginner', 'intermediate', 'advanced'];
    if (!validLevels.includes(difficulty)) {
      const error = new Error(`Invalid difficulty level: ${difficulty}`);
      error.name = 'ValidationError';
      error.statusCode = 400;
      throw error;
    }

    return difficulty;
  }

  /**
   * Validate number field
   * @private
   */
  static _validateNumber(value, fieldName) {
    const num = Number(value);
    if (isNaN(num) || num < 0) {
      const error = new Error(`${fieldName} must be a non-negative number`);
      error.name = 'ValidationError';
      error.statusCode = 400;
      throw error;
    }
    return num;
  }

  /**
   * Sanitize HTML content to prevent XSS
   * @private
   */
  static _sanitizeHtml(html) {
    if (typeof html !== 'string') {
      return '';
    }

    return HTMLSanitizer.sanitize(html);
  }

  /**
   * Sanitize plain text (no HTML)
   * @private
   */
  static _sanitizeText(text) {
    if (typeof text !== 'string') {
      return '';
    }
    return text.trim();
  }

  /**
   * Parse array field with default empty array
   * @private
   */
  static _parseArray(value) {
    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value.map(item => this._sanitizeText(String(item))).filter(item => item.length > 0);
    }

    return [];
  }

  /**
   * Parse shloka object
   * @private
   */
  static _parseShloka(shloka) {
    if (!shloka || typeof shloka !== 'object') {
      return null;
    }

    return {
      devanagari: shloka.devanagari ? this._sanitizeText(shloka.devanagari) : undefined,
      transliteration: shloka.transliteration ? this._sanitizeText(shloka.transliteration) : undefined,
      translation: shloka.translation ? this._sanitizeText(shloka.translation) : undefined,
      translationMr: shloka.translationMr ? this._sanitizeText(shloka.translationMr) : undefined,
      source: shloka.source ? this._sanitizeText(shloka.source) : undefined
    };
  }
}

/**
 * Content_Printer
 * Formats topic content from database into API response format
 */
class Content_Printer {
  /**
   * Format topic content for API response
   * @param {Object} topicData - Topic data from database
   * @param {string} language - Language code ("en", "mr", or null for both)
   * @returns {Object} Formatted content object
   */
  static format(topicData, language = null) {
    if (!topicData) {
      return null;
    }

    // Convert to plain object if it's a Mongoose document
    const topic = topicData.toObject ? topicData.toObject() : { ...topicData };

    // If no language specified, return both languages
    if (!language) {
      return this._formatBilingual(topic);
    }

    // Return language-specific content
    return this._formatSingleLanguage(topic, language);
  }

  /**
   * Format content with both languages
   * @private
   */
  static _formatBilingual(topic) {
    return {
      _id: topic._id,
      slug: topic.slug,
      subjectSlug: topic.subjectSlug,
      title: {
        en: topic.title,
        mr: topic.titleMr || topic.title
      },
      difficulty: topic.difficulty,
      estimatedMins: topic.estimatedMins,
      orderIndex: topic.orderIndex,
      content: {
        en: {
          introduction: topic.introduction,
          historicalContext: topic.historicalContext,
          coreExplanation: topic.coreExplanation,
          clinicalApplications: topic.clinicalApplications,
          modernComparison: topic.modernComparison,
          summary: this._formatSummary(topic.summary),
          furtherReading: this._formatFurtherReading(topic.furtherReading)
        },
        mr: {
          introduction: topic.introductionMr || topic.introduction,
          historicalContext: topic.historicalContextMr || topic.historicalContext,
          coreExplanation: topic.coreExplanationMr || topic.coreExplanation,
          clinicalApplications: topic.clinicalApplicationsMr || topic.clinicalApplications,
          modernComparison: topic.modernComparisonMr || topic.modernComparison,
          summary: this._formatSummary(topic.summaryMr || topic.summary),
          furtherReading: this._formatFurtherReading(topic.furtherReadingMr || topic.furtherReading)
        }
      },
      shloka: this._formatShloka(topic.shloka),
      createdAt: topic.createdAt,
      updatedAt: topic.updatedAt
    };
  }

  /**
   * Format content for single language
   * @private
   */
  static _formatSingleLanguage(topic, language) {
    const isMarathi = language === 'mr';

    return {
      _id: topic._id,
      slug: topic.slug,
      subjectSlug: topic.subjectSlug,
      title: isMarathi ? (topic.titleMr || topic.title) : topic.title,
      difficulty: topic.difficulty,
      estimatedMins: topic.estimatedMins,
      orderIndex: topic.orderIndex,
      content: {
        introduction: isMarathi ? (topic.introductionMr || topic.introduction) : topic.introduction,
        historicalContext: isMarathi ? (topic.historicalContextMr || topic.historicalContext) : topic.historicalContext,
        coreExplanation: isMarathi ? (topic.coreExplanationMr || topic.coreExplanation) : topic.coreExplanation,
        clinicalApplications: isMarathi ? (topic.clinicalApplicationsMr || topic.clinicalApplications) : topic.clinicalApplications,
        modernComparison: isMarathi ? (topic.modernComparisonMr || topic.modernComparison) : topic.modernComparison,
        summary: this._formatSummary(isMarathi ? (topic.summaryMr || topic.summary) : topic.summary),
        furtherReading: this._formatFurtherReading(isMarathi ? (topic.furtherReadingMr || topic.furtherReading) : topic.furtherReading)
      },
      shloka: this._formatShloka(topic.shloka, language),
      createdAt: topic.createdAt,
      updatedAt: topic.updatedAt
    };
  }

  /**
   * Format summary as ordered list
   * @private
   */
  static _formatSummary(summary) {
    if (!Array.isArray(summary) || summary.length === 0) {
      return [];
    }

    return summary.map((point, index) => ({
      order: index + 1,
      text: point
    }));
  }

  /**
   * Format further reading as reference list
   * @private
   */
  static _formatFurtherReading(furtherReading) {
    if (!Array.isArray(furtherReading) || furtherReading.length === 0) {
      return [];
    }

    return furtherReading.map((reference, index) => ({
      id: index + 1,
      reference: reference
    }));
  }

  /**
   * Format shloka object
   * @private
   */
  static _formatShloka(shloka, language = null) {
    if (!shloka) {
      return null;
    }

    const isMarathi = language === 'mr';

    return {
      devanagari: shloka.devanagari || '',
      transliteration: shloka.transliteration || '',
      translation: isMarathi 
        ? (shloka.translationMr || shloka.translation || '')
        : (shloka.translation || ''),
      source: shloka.source || ''
    };
  }
}

module.exports = {
  Content_Parser,
  Content_Printer
};
