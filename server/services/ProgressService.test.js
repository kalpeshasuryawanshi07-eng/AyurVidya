const ProgressService = require('./ProgressService');
const Progress = require('../models/Progress');
const User = require('../models/User');
const Topic = require('../models/Topic');

// Mock the models
jest.mock('../models/Progress');
jest.mock('../models/User');
jest.mock('../models/Topic');

describe('ProgressService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('markComplete', () => {
    it('should create a new progress record', async () => {
      const mockTopic = { slug: 'topic-1', subjectSlug: 'subject-a' };
      const mockProgress = {
        _id: 'progress123',
        userId: 'user123',
        topicSlug: 'topic-1',
        completed: true,
        timeSpent: 30,
        completedAt: new Date(),
        toObject: jest.fn().mockReturnValue({
          _id: 'progress123',
          userId: 'user123',
          topicSlug: 'topic-1',
          completed: true,
          timeSpent: 30,
          completedAt: new Date()
        })
      };

      Topic.findOne.mockResolvedValue(mockTopic);
      Progress.findOneAndUpdate.mockResolvedValue(mockProgress);

      const result = await ProgressService.markComplete('user123', 'topic-1', 30);

      expect(Topic.findOne).toHaveBeenCalledWith({ slug: 'topic-1' });
      expect(Progress.findOneAndUpdate).toHaveBeenCalledWith(
        { userId: 'user123', topicSlug: 'topic-1' },
        expect.objectContaining({
          userId: 'user123',
          topicSlug: 'topic-1',
          completed: true,
          timeSpent: 30
        }),
        { new: true, upsert: true, runValidators: true }
      );
      expect(result.userId).toBe('user123');
      expect(result.topicSlug).toBe('topic-1');
      expect(result.completed).toBe(true);
      expect(result.timeSpent).toBe(30);
    });

    it('should update existing progress record with new timestamp', async () => {
      const mockTopic = { slug: 'topic-1', subjectSlug: 'subject-a' };
      const mockProgress = {
        _id: 'progress123',
        userId: 'user123',
        topicSlug: 'topic-1',
        completed: true,
        timeSpent: 45,
        completedAt: new Date(),
        toObject: jest.fn().mockReturnValue({
          _id: 'progress123',
          userId: 'user123',
          topicSlug: 'topic-1',
          completed: true,
          timeSpent: 45,
          completedAt: new Date()
        })
      };

      Topic.findOne.mockResolvedValue(mockTopic);
      Progress.findOneAndUpdate.mockResolvedValue(mockProgress);

      const result = await ProgressService.markComplete('user123', 'topic-1', 45);

      expect(result.timeSpent).toBe(45);
    });

    it('should throw ValidationError if userId is missing', async () => {
      await expect(
        ProgressService.markComplete(null, 'topic-1', 30)
      ).rejects.toMatchObject({
        name: 'ValidationError',
        message: 'User ID and topic slug are required'
      });
    });

    it('should throw ValidationError if topicSlug is missing', async () => {
      await expect(
        ProgressService.markComplete('user123', null, 30)
      ).rejects.toMatchObject({
        name: 'ValidationError',
        message: 'User ID and topic slug are required'
      });
    });

    it('should throw ValidationError if timeSpent is negative', async () => {
      await expect(
        ProgressService.markComplete('user123', 'topic-1', -10)
      ).rejects.toMatchObject({
        name: 'ValidationError',
        message: 'Time spent must be a non-negative number'
      });
    });

    it('should throw ValidationError if topic does not exist', async () => {
      Topic.findOne.mockResolvedValue(null);

      await expect(
        ProgressService.markComplete('user123', 'non-existent', 30)
      ).rejects.toMatchObject({
        name: 'ValidationError',
        message: 'Topic not found'
      });
    });

    it('should default timeSpent to 0 if not provided', async () => {
      const mockTopic = { slug: 'topic-1', subjectSlug: 'subject-a' };
      const mockProgress = {
        userId: 'user123',
        topicSlug: 'topic-1',
        completed: true,
        timeSpent: 0,
        completedAt: new Date(),
        toObject: jest.fn().mockReturnValue({
          userId: 'user123',
          topicSlug: 'topic-1',
          completed: true,
          timeSpent: 0,
          completedAt: new Date()
        })
      };

      Topic.findOne.mockResolvedValue(mockTopic);
      Progress.findOneAndUpdate.mockResolvedValue(mockProgress);

      const result = await ProgressService.markComplete('user123', 'topic-1');

      expect(result.timeSpent).toBe(0);
    });
  });

  describe('getProgress', () => {
    it('should return overall progress statistics', async () => {
      const mockUser = { _id: 'user123' };
      const mockTopics = [
        { slug: 'topic-1', subjectSlug: 'subject-a' },
        { slug: 'topic-2', subjectSlug: 'subject-a' },
        { slug: 'topic-3', subjectSlug: 'subject-b' }
      ];
      const mockProgress = [
        { userId: 'user123', topicSlug: 'topic-1', completed: true },
        { userId: 'user123', topicSlug: 'topic-2', completed: true }
      ];

      User.findById.mockResolvedValue(mockUser);
      Topic.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopics)
      });
      Progress.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockProgress)
      });

      const result = await ProgressService.getProgress('user123');

      expect(result.completed).toBe(2);
      expect(result.total).toBe(3);
      expect(result.percentage).toBe(67); // 2/3 = 66.67% rounded to 67
      expect(result.bySubject).toBeDefined();
    });

    it('should group progress by subject', async () => {
      const mockUser = { _id: 'user123' };
      const mockTopics = [
        { slug: 'topic-1', subjectSlug: 'subject-a' },
        { slug: 'topic-2', subjectSlug: 'subject-a' },
        { slug: 'topic-3', subjectSlug: 'subject-b' }
      ];
      const mockProgress = [
        { userId: 'user123', topicSlug: 'topic-1', completed: true },
        { userId: 'user123', topicSlug: 'topic-2', completed: true }
      ];

      User.findById.mockResolvedValue(mockUser);
      Topic.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopics)
      });
      Progress.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockProgress)
      });

      const result = await ProgressService.getProgress('user123');

      expect(result.bySubject['subject-a']).toEqual({
        completed: 2,
        total: 2,
        percentage: 100
      });

      expect(result.bySubject['subject-b']).toEqual({
        completed: 0,
        total: 1,
        percentage: 0
      });
    });

    it('should filter progress by subject', async () => {
      const mockUser = { _id: 'user123' };
      const mockTopics = [
        { slug: 'topic-1', subjectSlug: 'subject-a' },
        { slug: 'topic-2', subjectSlug: 'subject-a' }
      ];
      const mockProgress = [
        { userId: 'user123', topicSlug: 'topic-1', completed: true },
        { userId: 'user123', topicSlug: 'topic-2', completed: true }
      ];

      User.findById.mockResolvedValue(mockUser);
      Topic.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopics)
      });
      Progress.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockProgress)
      });

      const result = await ProgressService.getProgress('user123', { subjectSlug: 'subject-a' });

      expect(result.completed).toBe(2);
      expect(result.total).toBe(2);
      expect(result.percentage).toBe(100);
    });

    it('should return 0% for user with no progress', async () => {
      const mockUser = { _id: 'user123' };
      const mockTopics = [
        { slug: 'topic-1', subjectSlug: 'subject-a' },
        { slug: 'topic-2', subjectSlug: 'subject-a' },
        { slug: 'topic-3', subjectSlug: 'subject-b' }
      ];

      User.findById.mockResolvedValue(mockUser);
      Topic.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockTopics)
      });
      Progress.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue([])
      });

      const result = await ProgressService.getProgress('user123');

      expect(result.completed).toBe(0);
      expect(result.total).toBe(3);
      expect(result.percentage).toBe(0);
    });

    it('should throw UserNotFoundError if user does not exist', async () => {
      User.findById.mockResolvedValue(null);

      await expect(
        ProgressService.getProgress('nonexistent')
      ).rejects.toMatchObject({
        name: 'UserNotFoundError',
        message: 'User not found'
      });
    });
  });

  describe('getStreak', () => {
    it('should return 0 streak for user with no progress', async () => {
      const mockUser = { _id: 'user123' };

      User.findById.mockResolvedValue(mockUser);
      Progress.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue([])
        })
      });

      const result = await ProgressService.getStreak('user123');

      expect(result.currentStreak).toBe(0);
      expect(result.longestStreak).toBe(0);
      expect(result.lastActivity).toBeNull();
    });

    it('should calculate current streak for consecutive days', async () => {
      const mockUser = { _id: 'user123' };
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      const mockProgress = [
        { userId: 'user123', topicSlug: 'topic-1', completedAt: twoDaysAgo, timeSpent: 30 },
        { userId: 'user123', topicSlug: 'topic-2', completedAt: yesterday, timeSpent: 45 },
        { userId: 'user123', topicSlug: 'topic-3', completedAt: today, timeSpent: 60 }
      ];

      User.findById.mockResolvedValue(mockUser);
      Progress.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue(mockProgress)
        })
      });

      const result = await ProgressService.getStreak('user123');

      expect(result.currentStreak).toBe(3);
      expect(result.longestStreak).toBe(3);
      expect(result.lastActivity).toEqual(today);
    });

    it('should reset current streak if last activity was more than 1 day ago', async () => {
      const mockUser = { _id: 'user123' };
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const mockProgress = [
        { userId: 'user123', topicSlug: 'topic-1', completedAt: threeDaysAgo, timeSpent: 30 }
      ];

      User.findById.mockResolvedValue(mockUser);
      Progress.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue(mockProgress)
        })
      });

      const result = await ProgressService.getStreak('user123');

      expect(result.currentStreak).toBe(0);
      expect(result.longestStreak).toBe(1);
    });

    it('should calculate longest streak correctly with gaps', async () => {
      const mockUser = { _id: 'user123' };
      const today = new Date();
      const dates = [];
      
      // Create 5 consecutive days (10 to 6 days ago)
      for (let i = 10; i >= 6; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date);
      }
      
      // Gap of 2 days
      
      // Create 3 consecutive days (including today)
      for (let i = 2; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date);
      }

      const mockProgress = dates.map((date, i) => ({
        userId: 'user123',
        topicSlug: `topic-${i}`,
        completedAt: date,
        timeSpent: 30
      }));

      User.findById.mockResolvedValue(mockUser);
      Progress.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue(mockProgress)
        })
      });

      const result = await ProgressService.getStreak('user123');

      expect(result.currentStreak).toBe(3);
      expect(result.longestStreak).toBe(5);
    });

    it('should count multiple completions on same day as one day', async () => {
      const mockUser = { _id: 'user123' };
      const today = new Date();

      const mockProgress = [
        { userId: 'user123', topicSlug: 'topic-1', completedAt: today, timeSpent: 30 },
        { userId: 'user123', topicSlug: 'topic-2', completedAt: today, timeSpent: 45 }
      ];

      User.findById.mockResolvedValue(mockUser);
      Progress.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue(mockProgress)
        })
      });

      const result = await ProgressService.getStreak('user123');

      expect(result.currentStreak).toBe(1);
      expect(result.longestStreak).toBe(1);
    });

    it('should throw UserNotFoundError if user does not exist', async () => {
      User.findById.mockResolvedValue(null);

      await expect(
        ProgressService.getStreak('nonexistent')
      ).rejects.toMatchObject({
        name: 'UserNotFoundError',
        message: 'User not found'
      });
    });
  });

  describe('getTimeSpent', () => {
    it('should calculate total time spent', async () => {
      const mockUser = { _id: 'user123' };
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      const mockProgress = [
        { userId: 'user123', topicSlug: 'topic-1', completedAt: twoDaysAgo, timeSpent: 30 },
        { userId: 'user123', topicSlug: 'topic-2', completedAt: yesterday, timeSpent: 45 },
        { userId: 'user123', topicSlug: 'topic-3', completedAt: today, timeSpent: 60 }
      ];

      const mockTopics = [
        { slug: 'topic-1', subjectSlug: 'subject-a' },
        { slug: 'topic-2', subjectSlug: 'subject-a' },
        { slug: 'topic-3', subjectSlug: 'subject-b' }
      ];

      User.findById.mockResolvedValue(mockUser);
      Progress.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockProgress)
      });
      Topic.find.mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue(mockTopics)
        })
      });

      const result = await ProgressService.getTimeSpent('user123');

      expect(result.totalMinutes).toBe(135); // 30 + 45 + 60
    });

    it('should group time spent by subject', async () => {
      const mockUser = { _id: 'user123' };
      const today = new Date();

      const mockProgress = [
        { userId: 'user123', topicSlug: 'topic-1', completedAt: today, timeSpent: 30 },
        { userId: 'user123', topicSlug: 'topic-2', completedAt: today, timeSpent: 45 },
        { userId: 'user123', topicSlug: 'topic-3', completedAt: today, timeSpent: 60 }
      ];

      const mockTopics = [
        { slug: 'topic-1', subjectSlug: 'subject-a' },
        { slug: 'topic-2', subjectSlug: 'subject-a' },
        { slug: 'topic-3', subjectSlug: 'subject-b' }
      ];

      User.findById.mockResolvedValue(mockUser);
      Progress.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockProgress)
      });
      Topic.find.mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue(mockTopics)
        })
      });

      const result = await ProgressService.getTimeSpent('user123');

      expect(result.bySubject['subject-a']).toBe(75); // 30 + 45
      expect(result.bySubject['subject-b']).toBe(60);
    });

    it('should group time spent by date', async () => {
      const mockUser = { _id: 'user123' };
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      const mockProgress = [
        { userId: 'user123', topicSlug: 'topic-1', completedAt: twoDaysAgo, timeSpent: 30 },
        { userId: 'user123', topicSlug: 'topic-2', completedAt: yesterday, timeSpent: 45 },
        { userId: 'user123', topicSlug: 'topic-3', completedAt: today, timeSpent: 60 }
      ];

      const mockTopics = [
        { slug: 'topic-1', subjectSlug: 'subject-a' },
        { slug: 'topic-2', subjectSlug: 'subject-a' },
        { slug: 'topic-3', subjectSlug: 'subject-b' }
      ];

      User.findById.mockResolvedValue(mockUser);
      Progress.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockProgress)
      });
      Topic.find.mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue(mockTopics)
        })
      });

      const result = await ProgressService.getTimeSpent('user123');

      expect(Object.keys(result.byDate)).toHaveLength(3);
      expect(Object.values(result.byDate)).toContain(30);
      expect(Object.values(result.byDate)).toContain(45);
      expect(Object.values(result.byDate)).toContain(60);
    });

    it('should filter by start date', async () => {
      const mockUser = { _id: 'user123' };
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const mockProgress = [
        { userId: 'user123', topicSlug: 'topic-2', completedAt: yesterday, timeSpent: 45 },
        { userId: 'user123', topicSlug: 'topic-3', completedAt: today, timeSpent: 60 }
      ];

      const mockTopics = [
        { slug: 'topic-2', subjectSlug: 'subject-a' },
        { slug: 'topic-3', subjectSlug: 'subject-b' }
      ];

      User.findById.mockResolvedValue(mockUser);
      Progress.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockProgress)
      });
      Topic.find.mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue(mockTopics)
        })
      });

      const result = await ProgressService.getTimeSpent('user123', { startDate: yesterday });

      expect(result.totalMinutes).toBe(105); // 45 + 60
    });

    it('should filter by end date', async () => {
      const mockUser = { _id: 'user123' };
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      const mockProgress = [
        { userId: 'user123', topicSlug: 'topic-1', completedAt: twoDaysAgo, timeSpent: 30 },
        { userId: 'user123', topicSlug: 'topic-2', completedAt: yesterday, timeSpent: 45 }
      ];

      const mockTopics = [
        { slug: 'topic-1', subjectSlug: 'subject-a' },
        { slug: 'topic-2', subjectSlug: 'subject-a' }
      ];

      User.findById.mockResolvedValue(mockUser);
      Progress.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockProgress)
      });
      Topic.find.mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue(mockTopics)
        })
      });

      const result = await ProgressService.getTimeSpent('user123', { endDate: yesterday });

      expect(result.totalMinutes).toBe(75); // 30 + 45
    });

    it('should filter by date range', async () => {
      const mockUser = { _id: 'user123' };
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      const mockProgress = [
        { userId: 'user123', topicSlug: 'topic-1', completedAt: twoDaysAgo, timeSpent: 30 },
        { userId: 'user123', topicSlug: 'topic-2', completedAt: yesterday, timeSpent: 45 }
      ];

      const mockTopics = [
        { slug: 'topic-1', subjectSlug: 'subject-a' },
        { slug: 'topic-2', subjectSlug: 'subject-a' }
      ];

      User.findById.mockResolvedValue(mockUser);
      Progress.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockProgress)
      });
      Topic.find.mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue(mockTopics)
        })
      });

      const result = await ProgressService.getTimeSpent('user123', { 
        startDate: twoDaysAgo, 
        endDate: yesterday 
      });

      expect(result.totalMinutes).toBe(75); // 30 + 45
    });

    it('should return 0 for user with no progress', async () => {
      const mockUser = { _id: 'user123' };

      User.findById.mockResolvedValue(mockUser);
      Progress.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue([])
      });
      Topic.find.mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue([])
        })
      });

      const result = await ProgressService.getTimeSpent('user123');

      expect(result.totalMinutes).toBe(0);
      expect(result.bySubject).toEqual({});
      expect(result.byDate).toEqual({});
    });

    it('should throw UserNotFoundError if user does not exist', async () => {
      User.findById.mockResolvedValue(null);

      await expect(
        ProgressService.getTimeSpent('nonexistent')
      ).rejects.toMatchObject({
        name: 'UserNotFoundError',
        message: 'User not found'
      });
    });
  });
});
