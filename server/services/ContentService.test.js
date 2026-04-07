const ContentService = require('./ContentService');
const Topic = require('../models/Topic');
const Subject = require('../models/Subject');
const LanguageService = require('./LanguageService');

// Mock the models
jest.mock('../models/Topic');
jest.mock('../models/Subject');

describe('ContentService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTopicBySlug', () => {
    it('should return topic with English content when language is "en"', async () => {
      const mockTopic = {
        _id: 'topic123',
        slug: 'vata-dosha',
        subjectSlug: 'basic-principles',
        title: 'Vata Dosha',
        titleMr: 'वात दोष',
        introduction: 'English introduction',
        introductionMr: 'Marathi introduction',
        difficulty: 'beginner',
        estimatedMins: 15,
        orderIndex: 1,
        toObject: jest.fn().mockReturnValue({
          _id: 'topic123',
          slug: 'vata-dosha',
          subjectSlug: 'basic-principles',
          title: 'Vata Dosha',
          titleMr: 'वात दोष',
          introduction: 'English introduction',
          introductionMr: 'Marathi introduction',
          difficulty: 'beginner',
          estimatedMins: 15,
          orderIndex: 1
        })
      };

      Topic.findOne.mockResolvedValue(mockTopic);

      const result = await ContentService.getTopicBySlug('vata-dosha', 'en');

      expect(Topic.findOne).toHaveBeenCalledWith({ slug: 'vata-dosha' });
      expect(result.title).toBe('Vata Dosha');
      expect(result.introduction).toBe('English introduction');
      expect(result.slug).toBe('vata-dosha');
    });

    it('should return topic with Marathi content when language is "mr"', async () => {
      const mockTopic = {
        _id: 'topic123',
        slug: 'vata-dosha',
        title: 'Vata Dosha',
        titleMr: 'वात दोष',
        introduction: 'English introduction',
        introductionMr: 'Marathi introduction',
        toObject: jest.fn().mockReturnValue({
          _id: 'topic123',
          slug: 'vata-dosha',
          title: 'Vata Dosha',
          titleMr: 'वात दोष',
          introduction: 'English introduction',
          introductionMr: 'Marathi introduction'
        })
      };

      Topic.findOne.mockResolvedValue(mockTopic);

      const result = await ContentService.getTopicBySlug('vata-dosha', 'mr');

      expect(result.title).toBe('वात दोष');
      expect(result.introduction).toBe('Marathi introduction');
    });

    it('should throw TopicNotFoundError when topic does not exist', async () => {
      Topic.findOne.mockResolvedValue(null);

      await expect(
        ContentService.getTopicBySlug('non-existent', 'en')
      ).rejects.toMatchObject({
        name: 'TopicNotFoundError',
        message: 'Topic not found',
        statusCode: 404
      });
    });

    it('should default to English when language is invalid', async () => {
      const mockTopic = {
        slug: 'vata-dosha',
        title: 'Vata Dosha',
        titleMr: 'वात दोष',
        introduction: 'English introduction',
        introductionMr: 'Marathi introduction',
        toObject: jest.fn().mockReturnValue({
          slug: 'vata-dosha',
          title: 'Vata Dosha',
          titleMr: 'वात दोष',
          introduction: 'English introduction',
          introductionMr: 'Marathi introduction'
        })
      };

      Topic.findOne.mockResolvedValue(mockTopic);

      const result = await ContentService.getTopicBySlug('vata-dosha', 'invalid');

      expect(result.title).toBe('Vata Dosha');
      expect(result.introduction).toBe('English introduction');
    });
  });

  describe('getTopics', () => {
    it('should return paginated topics with default pagination', async () => {
      const mockTopics = [
        { slug: 'topic1', title: 'Topic 1', orderIndex: 1 },
        { slug: 'topic2', title: 'Topic 2', orderIndex: 2 }
      ];

      const mockQuery = {
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockTopics)
      };

      Topic.find.mockReturnValue(mockQuery);
      Topic.countDocuments.mockResolvedValue(2);

      const result = await ContentService.getTopics();

      expect(Topic.find).toHaveBeenCalledWith({});
      expect(mockQuery.sort).toHaveBeenCalledWith({ orderIndex: 1 });
      expect(mockQuery.skip).toHaveBeenCalledWith(0);
      expect(mockQuery.limit).toHaveBeenCalledWith(20);
      expect(result).toEqual({
        topics: mockTopics,
        total: 2,
        page: 1,
        limit: 20
      });
    });

    it('should filter topics by subjectSlug', async () => {
      const mockQuery = {
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      };

      Topic.find.mockReturnValue(mockQuery);
      Topic.countDocuments.mockResolvedValue(0);

      await ContentService.getTopics({ subjectSlug: 'basic-principles' });

      expect(Topic.find).toHaveBeenCalledWith({ subjectSlug: 'basic-principles' });
    });

    it('should filter topics by difficulty', async () => {
      const mockQuery = {
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      };

      Topic.find.mockReturnValue(mockQuery);
      Topic.countDocuments.mockResolvedValue(0);

      await ContentService.getTopics({ difficulty: 'beginner' });

      expect(Topic.find).toHaveBeenCalledWith({ difficulty: 'beginner' });
    });

    it('should filter topics by both subjectSlug and difficulty', async () => {
      const mockQuery = {
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      };

      Topic.find.mockReturnValue(mockQuery);
      Topic.countDocuments.mockResolvedValue(0);

      await ContentService.getTopics({
        subjectSlug: 'basic-principles',
        difficulty: 'intermediate'
      });

      expect(Topic.find).toHaveBeenCalledWith({
        subjectSlug: 'basic-principles',
        difficulty: 'intermediate'
      });
    });

    it('should handle custom pagination parameters', async () => {
      const mockQuery = {
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      };

      Topic.find.mockReturnValue(mockQuery);
      Topic.countDocuments.mockResolvedValue(50);

      const result = await ContentService.getTopics({}, { page: 3, limit: 10 });

      expect(mockQuery.skip).toHaveBeenCalledWith(20);
      expect(mockQuery.limit).toHaveBeenCalledWith(10);
      expect(result.page).toBe(3);
      expect(result.limit).toBe(10);
    });

    it('should throw ValidationError for invalid page number', async () => {
      await expect(
        ContentService.getTopics({}, { page: 0, limit: 10 })
      ).rejects.toMatchObject({
        name: 'ValidationError',
        message: 'Invalid pagination parameters',
        statusCode: 400
      });
    });

    it('should throw ValidationError for invalid limit', async () => {
      await expect(
        ContentService.getTopics({}, { page: 1, limit: 0 })
      ).rejects.toMatchObject({
        name: 'ValidationError',
        message: 'Invalid pagination parameters',
        statusCode: 400
      });
    });

    it('should throw ValidationError for limit exceeding maximum', async () => {
      await expect(
        ContentService.getTopics({}, { page: 1, limit: 101 })
      ).rejects.toMatchObject({
        name: 'ValidationError',
        message: 'Invalid pagination parameters',
        statusCode: 400
      });
    });

    it('should throw ValidationError for invalid difficulty', async () => {
      await expect(
        ContentService.getTopics({ difficulty: 'invalid' })
      ).rejects.toMatchObject({
        name: 'ValidationError',
        message: 'Invalid difficulty level',
        statusCode: 400
      });
    });
  });

  describe('getAdjacentTopics', () => {
    it('should return previous and next topics', async () => {
      const mockCurrentTopic = {
        slug: 'current-topic',
        subjectSlug: 'basic-principles',
        orderIndex: 2
      };

      const mockPreviousTopic = {
        slug: 'previous-topic',
        title: 'Previous Topic',
        titleMr: 'मागील विषय'
      };

      const mockNextTopic = {
        slug: 'next-topic',
        title: 'Next Topic',
        titleMr: 'पुढील विषय'
      };

      Topic.findOne.mockResolvedValueOnce(mockCurrentTopic);

      const previousQuery = {
        sort: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockPreviousTopic)
      };

      const nextQuery = {
        sort: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockNextTopic)
      };

      Topic.findOne
        .mockReturnValueOnce(previousQuery)
        .mockReturnValueOnce(nextQuery);

      const result = await ContentService.getAdjacentTopics('current-topic');

      expect(Topic.findOne).toHaveBeenCalledWith({ slug: 'current-topic' });
      expect(result.previous).toEqual(mockPreviousTopic);
      expect(result.next).toEqual(mockNextTopic);
    });

    it('should return null for previous when current is first topic', async () => {
      const mockCurrentTopic = {
        slug: 'first-topic',
        subjectSlug: 'basic-principles',
        orderIndex: 1
      };

      const mockNextTopic = {
        slug: 'next-topic',
        title: 'Next Topic'
      };

      Topic.findOne.mockResolvedValueOnce(mockCurrentTopic);

      const previousQuery = {
        sort: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(null)
      };

      const nextQuery = {
        sort: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockNextTopic)
      };

      Topic.findOne
        .mockReturnValueOnce(previousQuery)
        .mockReturnValueOnce(nextQuery);

      const result = await ContentService.getAdjacentTopics('first-topic');

      expect(result.previous).toBeNull();
      expect(result.next).toEqual(mockNextTopic);
    });

    it('should return null for next when current is last topic', async () => {
      const mockCurrentTopic = {
        slug: 'last-topic',
        subjectSlug: 'basic-principles',
        orderIndex: 10
      };

      const mockPreviousTopic = {
        slug: 'previous-topic',
        title: 'Previous Topic'
      };

      Topic.findOne.mockResolvedValueOnce(mockCurrentTopic);

      const previousQuery = {
        sort: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockPreviousTopic)
      };

      const nextQuery = {
        sort: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(null)
      };

      Topic.findOne
        .mockReturnValueOnce(previousQuery)
        .mockReturnValueOnce(nextQuery);

      const result = await ContentService.getAdjacentTopics('last-topic');

      expect(result.previous).toEqual(mockPreviousTopic);
      expect(result.next).toBeNull();
    });

    it('should throw TopicNotFoundError when topic does not exist', async () => {
      Topic.findOne.mockResolvedValue(null);

      await expect(
        ContentService.getAdjacentTopics('non-existent')
      ).rejects.toMatchObject({
        name: 'TopicNotFoundError',
        message: 'Topic not found',
        statusCode: 404
      });
    });

    it('should only find adjacent topics in same subject', async () => {
      const mockCurrentTopic = {
        slug: 'current-topic',
        subjectSlug: 'basic-principles',
        orderIndex: 2
      };

      Topic.findOne.mockResolvedValueOnce(mockCurrentTopic);

      const previousQuery = {
        sort: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(null)
      };

      const nextQuery = {
        sort: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(null)
      };

      Topic.findOne
        .mockReturnValueOnce(previousQuery)
        .mockReturnValueOnce(nextQuery);

      await ContentService.getAdjacentTopics('current-topic');

      // Verify that queries include subjectSlug filter
      expect(Topic.findOne).toHaveBeenCalledWith({
        subjectSlug: 'basic-principles',
        orderIndex: { $lt: 2 }
      });
      expect(Topic.findOne).toHaveBeenCalledWith({
        subjectSlug: 'basic-principles',
        orderIndex: { $gt: 2 }
      });
    });
  });

  describe('getSubjects', () => {
    it('should return all subjects ordered by orderIndex', async () => {
      const mockSubjects = [
        { slug: 'subject1', title: 'Subject 1', orderIndex: 1 },
        { slug: 'subject2', title: 'Subject 2', orderIndex: 2 }
      ];

      const mockQuery = {
        sort: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockSubjects)
      };

      Subject.find.mockReturnValue(mockQuery);

      const result = await ContentService.getSubjects();

      expect(Subject.find).toHaveBeenCalledWith({});
      expect(mockQuery.sort).toHaveBeenCalledWith({ orderIndex: 1 });
      expect(result).toEqual(mockSubjects);
    });

    it('should filter subjects by year', async () => {
      const mockQuery = {
        sort: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      };

      Subject.find.mockReturnValue(mockQuery);

      await ContentService.getSubjects({ year: 3 });

      expect(Subject.find).toHaveBeenCalledWith({ year: 3 });
    });

    it('should throw ValidationError for year less than 1', async () => {
      await expect(
        ContentService.getSubjects({ year: 0 })
      ).rejects.toMatchObject({
        name: 'ValidationError',
        message: 'Year must be between 1 and 5',
        statusCode: 400
      });
    });

    it('should throw ValidationError for year greater than 5', async () => {
      await expect(
        ContentService.getSubjects({ year: 6 })
      ).rejects.toMatchObject({
        name: 'ValidationError',
        message: 'Year must be between 1 and 5',
        statusCode: 400
      });
    });
  });

  describe('getSubjectBySlug', () => {
    it('should return subject with topic list in English', async () => {
      const mockSubject = {
        slug: 'basic-principles',
        title: 'Basic Principles',
        titleMr: 'मूलभूत तत्त्वे',
        description: 'English description',
        descriptionMr: 'Marathi description',
        orderIndex: 1
      };

      const mockTopics = [
        {
          slug: 'topic1',
          title: 'Topic 1',
          titleMr: 'विषय १',
          difficulty: 'beginner',
          estimatedMins: 10,
          orderIndex: 1
        },
        {
          slug: 'topic2',
          title: 'Topic 2',
          titleMr: 'विषय २',
          difficulty: 'intermediate',
          estimatedMins: 15,
          orderIndex: 2
        }
      ];

      const subjectQuery = {
        lean: jest.fn().mockResolvedValue(mockSubject)
      };

      Subject.findOne.mockReturnValue(subjectQuery);

      const topicQuery = {
        sort: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockTopics)
      };

      Topic.find.mockReturnValue(topicQuery);

      const result = await ContentService.getSubjectBySlug('basic-principles', 'en');

      expect(Subject.findOne).toHaveBeenCalledWith({ slug: 'basic-principles' });
      expect(Topic.find).toHaveBeenCalledWith({ subjectSlug: 'basic-principles' });
      expect(result.title).toBe('Basic Principles');
      expect(result.description).toBe('English description');
      expect(result.topics).toHaveLength(2);
      expect(result.topics[0].title).toBe('Topic 1');
    });

    it('should return subject with topic list in Marathi', async () => {
      const mockSubject = {
        slug: 'basic-principles',
        title: 'Basic Principles',
        titleMr: 'मूलभूत तत्त्वे',
        description: 'English description',
        descriptionMr: 'Marathi description'
      };

      const mockTopics = [
        {
          slug: 'topic1',
          title: 'Topic 1',
          titleMr: 'विषय १',
          difficulty: 'beginner',
          estimatedMins: 10,
          orderIndex: 1
        }
      ];

      const subjectQuery = {
        lean: jest.fn().mockResolvedValue(mockSubject)
      };

      Subject.findOne.mockReturnValue(subjectQuery);

      const topicQuery = {
        sort: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockTopics)
      };

      Topic.find.mockReturnValue(topicQuery);

      const result = await ContentService.getSubjectBySlug('basic-principles', 'mr');

      expect(result.title).toBe('मूलभूत तत्त्वे');
      expect(result.description).toBe('Marathi description');
      expect(result.topics[0].title).toBe('विषय १');
    });

    it('should throw SubjectNotFoundError when subject does not exist', async () => {
      const subjectQuery = {
        lean: jest.fn().mockResolvedValue(null)
      };

      Subject.findOne.mockReturnValue(subjectQuery);

      await expect(
        ContentService.getSubjectBySlug('non-existent', 'en')
      ).rejects.toMatchObject({
        name: 'SubjectNotFoundError',
        message: 'Subject not found',
        statusCode: 404
      });
    });

    it('should return subject with empty topics array when no topics exist', async () => {
      const mockSubject = {
        slug: 'basic-principles',
        title: 'Basic Principles',
        titleMr: 'मूलभूत तत्त्वे'
      };

      const subjectQuery = {
        lean: jest.fn().mockResolvedValue(mockSubject)
      };

      Subject.findOne.mockReturnValue(subjectQuery);

      const topicQuery = {
        sort: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      };

      Topic.find.mockReturnValue(topicQuery);

      const result = await ContentService.getSubjectBySlug('basic-principles', 'en');

      expect(result.topics).toEqual([]);
    });

    it('should order topics by orderIndex', async () => {
      const mockSubject = {
        slug: 'basic-principles',
        title: 'Basic Principles'
      };

      const subjectQuery = {
        lean: jest.fn().mockResolvedValue(mockSubject)
      };

      Subject.findOne.mockReturnValue(subjectQuery);

      const topicQuery = {
        sort: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      };

      Topic.find.mockReturnValue(topicQuery);

      await ContentService.getSubjectBySlug('basic-principles', 'en');

      expect(topicQuery.sort).toHaveBeenCalledWith({ orderIndex: 1 });
    });
  });
});
