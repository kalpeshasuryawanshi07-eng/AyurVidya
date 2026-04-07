/**
 * ProgressService
 * 
 * Manages user progress tracking including topic completion, streaks, and time spent.
 * Handles progress statistics with subject grouping and date range filtering.
 */

const Progress = require('../models/Progress');
const User = require('../models/User');
const Topic = require('../models/Topic');

class ProgressService {
  /**
   * Mark a topic as complete for a user
   * @param {string} userId - User ID
   * @param {string} topicSlug - Topic slug
   * @param {number} timeSpent - Time spent in minutes
   * @returns {Promise<Object>} Progress record
   * @throws {Error} ValidationError
   */
  async markComplete(userId, topicSlug, timeSpent) {
    // Validate inputs
    if (!userId || !topicSlug) {
      const error = new Error('User ID and topic slug are required');
      error.name = 'ValidationError';
      error.statusCode = 400;
      throw error;
    }

    if (timeSpent !== undefined && (typeof timeSpent !== 'number' || timeSpent < 0)) {
      const error = new Error('Time spent must be a non-negative number');
      error.name = 'ValidationError';
      error.statusCode = 400;
      throw error;
    }

    // Check if topic exists
    const topic = await Topic.findOne({ slug: topicSlug });
    if (!topic) {
      const error = new Error('Topic not found');
      error.name = 'ValidationError';
      error.statusCode = 404;
      throw error;
    }

    // Upsert progress record (update if exists, create if not)
    const progress = await Progress.findOneAndUpdate(
      { userId, topicSlug },
      {
        userId,
        topicSlug,
        completed: true,
        completedAt: new Date(),
        timeSpent: timeSpent || 0
      },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    return progress.toObject();
  }

  /**
   * Get progress statistics for a user
   * @param {string} userId - User ID
   * @param {Object} filters - Filter options { subjectSlug }
   * @returns {Promise<Object>} { completed, total, percentage, bySubject }
   * @throws {Error} UserNotFoundError
   */
  async getProgress(userId, filters = {}) {
    // Validate user exists
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.name = 'UserNotFoundError';
      error.statusCode = 404;
      throw error;
    }

    const { subjectSlug } = filters;

    // Build topic query
    const topicQuery = {};
    if (subjectSlug) {
      topicQuery.subjectSlug = subjectSlug;
    }

    // Get all topics (filtered by subject if specified)
    const allTopics = await Topic.find(topicQuery).lean();
    const total = allTopics.length;

    // Get completed topics for this user
    const completedProgress = await Progress.find({
      userId,
      completed: true
    }).lean();

    // Create a set of completed topic slugs
    const completedSlugs = new Set(completedProgress.map(p => p.topicSlug));

    // Filter completed topics by subject if needed
    let completed;
    if (subjectSlug) {
      const topicSlugsInSubject = new Set(allTopics.map(t => t.slug));
      completed = completedProgress.filter(p => topicSlugsInSubject.has(p.topicSlug)).length;
    } else {
      completed = completedProgress.length;
    }

    // Calculate percentage
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Group by subject
    const bySubject = {};
    
    // Get all subjects from topics
    const subjectSlugs = [...new Set(allTopics.map(t => t.subjectSlug))];
    
    for (const subSlug of subjectSlugs) {
      const subjectTopics = allTopics.filter(t => t.subjectSlug === subSlug);
      const subjectTotal = subjectTopics.length;
      const subjectCompleted = subjectTopics.filter(t => completedSlugs.has(t.slug)).length;
      const subjectPercentage = subjectTotal > 0 ? Math.round((subjectCompleted / subjectTotal) * 100) : 0;

      bySubject[subSlug] = {
        completed: subjectCompleted,
        total: subjectTotal,
        percentage: subjectPercentage
      };
    }

    return {
      completed,
      total,
      percentage,
      completedTopicSlugs: Array.from(completedSlugs),
      bySubject
    };
  }

  /**
   * Calculate user's study streak
   * @param {string} userId - User ID
   * @returns {Promise<Object>} { currentStreak, longestStreak, lastActivity }
   * @throws {Error} UserNotFoundError
   */
  async getStreak(userId) {
    // Validate user exists
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.name = 'UserNotFoundError';
      error.statusCode = 404;
      throw error;
    }

    // Get all progress records sorted by completion date
    const progressRecords = await Progress.find({ userId })
      .sort({ completedAt: 1 })
      .lean();

    if (progressRecords.length === 0) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        lastActivity: null
      };
    }

    // Get unique dates (normalize to start of day in UTC)
    const uniqueDates = [...new Set(
      progressRecords.map(p => {
        const date = new Date(p.completedAt);
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())).getTime();
      })
    )].sort((a, b) => a - b);

    // Calculate streaks
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 1;

    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())).getTime();
    const yesterdayUTC = todayUTC - 24 * 60 * 60 * 1000;

    // Calculate longest streak
    for (let i = 1; i < uniqueDates.length; i++) {
      const dayDiff = (uniqueDates[i] - uniqueDates[i - 1]) / (24 * 60 * 60 * 1000);
      
      if (dayDiff === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    // Calculate current streak (must include today or yesterday)
    const lastActivityDate = uniqueDates[uniqueDates.length - 1];
    
    if (lastActivityDate === todayUTC || lastActivityDate === yesterdayUTC) {
      currentStreak = 1;
      
      // Count backwards from the last date
      for (let i = uniqueDates.length - 2; i >= 0; i--) {
        const dayDiff = (uniqueDates[i + 1] - uniqueDates[i]) / (24 * 60 * 60 * 1000);
        
        if (dayDiff === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    } else {
      currentStreak = 0;
    }

    return {
      currentStreak,
      longestStreak,
      lastActivity: progressRecords[progressRecords.length - 1].completedAt
    };
  }

  /**
   * Get time spent statistics
   * @param {string} userId - User ID
   * @param {Object} dateRange - Date range { startDate, endDate }
   * @returns {Promise<Object>} { totalMinutes, bySubject, byDate }
   * @throws {Error} UserNotFoundError
   */
  async getTimeSpent(userId, dateRange = {}) {
    // Validate user exists
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.name = 'UserNotFoundError';
      error.statusCode = 404;
      throw error;
    }

    const { startDate, endDate } = dateRange;

    // Build query
    const query = { userId };
    
    if (startDate || endDate) {
      query.completedAt = {};
      if (startDate) {
        query.completedAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.completedAt.$lte = new Date(endDate);
      }
    }

    // Get progress records
    const progressRecords = await Progress.find(query).lean();

    // Calculate total minutes
    const totalMinutes = progressRecords.reduce((sum, p) => sum + (p.timeSpent || 0), 0);

    // Get topics to map slugs to subjects
    const topicSlugs = [...new Set(progressRecords.map(p => p.topicSlug))];
    const topics = await Topic.find({ slug: { $in: topicSlugs } })
      .select('slug subjectSlug')
      .lean();

    const topicToSubject = {};
    topics.forEach(t => {
      topicToSubject[t.slug] = t.subjectSlug;
    });

    // Group by subject
    const bySubject = {};
    progressRecords.forEach(p => {
      const subjectSlug = topicToSubject[p.topicSlug];
      if (subjectSlug) {
        bySubject[subjectSlug] = (bySubject[subjectSlug] || 0) + (p.timeSpent || 0);
      }
    });

    // Group by date
    const byDate = {};
    progressRecords.forEach(p => {
      const date = new Date(p.completedAt);
      const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      byDate[dateKey] = (byDate[dateKey] || 0) + (p.timeSpent || 0);
    });

    return {
      totalMinutes,
      bySubject,
      byDate
    };
  }
}

module.exports = new ProgressService();
