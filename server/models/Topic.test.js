const mongoose = require('mongoose');
const Topic = require('./Topic');

// Mock MongoDB connection for testing
beforeAll(async () => {
  const baseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurveda-test';
  const mongoUri = `${baseUri}-${process.env.JEST_WORKER_ID || '1'}`;
  await mongoose.connect(mongoUri);
  await Topic.init();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Topic.deleteMany({});
});

describe('Topic Model', () => {
  const validTopicData = {
    slug: 'vata-dosha',
    subjectSlug: 'basic-principles',
    title: 'Vata Dosha',
    difficulty: 'beginner',
    estimatedMins: 15,
    orderIndex: 1,
    introduction: 'Vata is one of the three fundamental doshas in Ayurveda, representing the principle of movement and change in the body.',
    historicalContext: 'The concept of Vata has been described in classical texts like Charaka Samhita.',
    coreExplanation: 'Vata governs all movement in the body, including breathing, circulation, and nerve impulses.',
    clinicalApplications: 'Understanding Vata is essential for diagnosing and treating various disorders.',
    modernComparison: 'Vata can be compared to the nervous system in modern medicine.'
  };

  describe('Schema Validation', () => {
    test('should create a valid topic with all required fields', async () => {
      const topic = new Topic(validTopicData);
      const savedTopic = await topic.save();

      expect(savedTopic._id).toBeDefined();
      expect(savedTopic.slug).toBe(validTopicData.slug);
      expect(savedTopic.subjectSlug).toBe(validTopicData.subjectSlug);
      expect(savedTopic.title).toBe(validTopicData.title);
      expect(savedTopic.difficulty).toBe(validTopicData.difficulty);
      expect(savedTopic.estimatedMins).toBe(validTopicData.estimatedMins);
      expect(savedTopic.orderIndex).toBe(validTopicData.orderIndex);
      expect(savedTopic.introduction).toBe(validTopicData.introduction);
      expect(savedTopic.createdAt).toBeDefined();
      expect(savedTopic.updatedAt).toBeDefined();
    });

    test('should create topic with all optional fields', async () => {
      const topicData = {
        ...validTopicData,
        titleMr: 'वात दोष',
        introductionMr: 'वात हा आयुर्वेदातील तीन मूलभूत दोषांपैकी एक आहे',
        historicalContextMr: 'वाताची संकल्पना चरक संहितेत वर्णन केली आहे',
        coreExplanationMr: 'वात शरीरातील सर्व हालचाली नियंत्रित करतो',
        clinicalApplicationsMr: 'वात समजून घेणे विविध विकारांचे निदान करण्यासाठी आवश्यक आहे',
        modernComparisonMr: 'वाताची तुलना आधुनिक वैद्यकशास्त्रातील मज्जासंस्थेशी करता येते',
        summary: ['Vata represents movement', 'Governs nervous system', 'Composed of air and ether'],
        summaryMr: ['वात हालचाल दर्शवितो', 'मज्जासंस्था नियंत्रित करतो'],
        furtherReading: ['Charaka Samhita, Sutrasthana', 'Ashtanga Hridayam'],
        furtherReadingMr: ['चरक संहिता, सूत्रस्थान'],
        shloka: {
          devanagari: 'वायुः पित्तं कफश्चेति त्रयो दोषाः समासतः',
          transliteration: 'vāyuḥ pittaṃ kaphaśceti trayo doṣāḥ samāsataḥ',
          translation: 'Vata, Pitta, and Kapha are the three doshas in summary',
          translationMr: 'वात, पित्त आणि कफ हे तीन दोष आहेत',
          source: 'Ashtanga Hridayam, Sutrasthana 1.6'
        }
      };

      const topic = new Topic(topicData);
      const savedTopic = await topic.save();

      expect(savedTopic.titleMr).toBe(topicData.titleMr);
      expect(savedTopic.introductionMr).toBe(topicData.introductionMr);
      expect(savedTopic.summary).toEqual(topicData.summary);
      expect(savedTopic.summaryMr).toEqual(topicData.summaryMr);
      expect(savedTopic.shloka.devanagari).toBe(topicData.shloka.devanagari);
      expect(savedTopic.shloka.transliteration).toBe(topicData.shloka.transliteration);
    });

    test('should fail validation when slug is missing', async () => {
      const topic = new Topic({
        ...validTopicData,
        slug: undefined
      });

      await expect(topic.save()).rejects.toThrow();
    });

    test('should fail validation when subjectSlug is missing', async () => {
      const topic = new Topic({
        ...validTopicData,
        subjectSlug: undefined
      });

      await expect(topic.save()).rejects.toThrow();
    });

    test('should fail validation when title is missing', async () => {
      const topic = new Topic({
        ...validTopicData,
        title: undefined
      });

      await expect(topic.save()).rejects.toThrow();
    });

    test('should fail validation when estimatedMins is missing', async () => {
      const topic = new Topic({
        ...validTopicData,
        estimatedMins: undefined
      });

      await expect(topic.save()).rejects.toThrow();
    });

    test('should fail validation when orderIndex is missing', async () => {
      const topic = new Topic({
        ...validTopicData,
        orderIndex: undefined
      });

      await expect(topic.save()).rejects.toThrow();
    });

    test('should fail validation when introduction is missing', async () => {
      const topic = new Topic({
        ...validTopicData,
        introduction: undefined
      });

      await expect(topic.save()).rejects.toThrow();
    });

    test('should fail validation when historicalContext is missing', async () => {
      const topic = new Topic({
        ...validTopicData,
        historicalContext: undefined
      });

      await expect(topic.save()).rejects.toThrow();
    });

    test('should fail validation when coreExplanation is missing', async () => {
      const topic = new Topic({
        ...validTopicData,
        coreExplanation: undefined
      });

      await expect(topic.save()).rejects.toThrow();
    });

    test('should fail validation when clinicalApplications is missing', async () => {
      const topic = new Topic({
        ...validTopicData,
        clinicalApplications: undefined
      });

      await expect(topic.save()).rejects.toThrow();
    });

    test('should fail validation when modernComparison is missing', async () => {
      const topic = new Topic({
        ...validTopicData,
        modernComparison: undefined
      });

      await expect(topic.save()).rejects.toThrow();
    });
  });

  describe('Slug Validation', () => {
    test('should accept valid slug format', async () => {
      const validSlugs = [
        'vata-dosha',
        'pitta-dosha',
        'kapha-dosha',
        'tridosha-theory-101'
      ];

      for (const slug of validSlugs) {
        const topic = new Topic({
          ...validTopicData,
          slug
        });

        const savedTopic = await topic.save();
        expect(savedTopic.slug).toBe(slug);
        await Topic.deleteMany({});
      }
    });

    test('should convert slug to lowercase', async () => {
      const topic = new Topic({
        ...validTopicData,
        slug: 'Vata-Dosha'
      });

      const savedTopic = await topic.save();
      expect(savedTopic.slug).toBe('vata-dosha');
    });

    test('should fail validation with invalid slug containing spaces', async () => {
      const topic = new Topic({
        ...validTopicData,
        slug: 'vata dosha'
      });

      await expect(topic.save()).rejects.toThrow();
    });

    test('should fail validation with invalid slug containing special characters', async () => {
      const topic = new Topic({
        ...validTopicData,
        slug: 'vata_dosha!'
      });

      await expect(topic.save()).rejects.toThrow();
    });

    test('should trim whitespace from slug', async () => {
      const topic = new Topic({
        ...validTopicData,
        slug: '  vata-dosha  '
      });

      const savedTopic = await topic.save();
      expect(savedTopic.slug).toBe('vata-dosha');
    });
  });

  describe('Difficulty Validation', () => {
    test('should accept valid difficulty levels', async () => {
      const validDifficulties = ['beginner', 'intermediate', 'advanced'];

      for (const difficulty of validDifficulties) {
        const topic = new Topic({
          ...validTopicData,
          slug: `topic-${difficulty}`,
          difficulty
        });

        const savedTopic = await topic.save();
        expect(savedTopic.difficulty).toBe(difficulty);
        await Topic.deleteMany({});
      }
    });

    test('should fail validation with invalid difficulty level', async () => {
      const topic = new Topic({
        ...validTopicData,
        difficulty: 'expert'
      });

      await expect(topic.save()).rejects.toThrow();
    });
  });

  describe('EstimatedMins Validation', () => {
    test('should accept positive estimatedMins', async () => {
      const topic = new Topic({
        ...validTopicData,
        estimatedMins: 30
      });

      const savedTopic = await topic.save();
      expect(savedTopic.estimatedMins).toBe(30);
    });

    test('should fail validation with estimatedMins less than 1', async () => {
      const topic = new Topic({
        ...validTopicData,
        estimatedMins: 0
      });

      await expect(topic.save()).rejects.toThrow();
    });

    test('should fail validation with negative estimatedMins', async () => {
      const topic = new Topic({
        ...validTopicData,
        estimatedMins: -5
      });

      await expect(topic.save()).rejects.toThrow();
    });
  });

  describe('Introduction Validation', () => {
    test('should accept introduction with minimum 100 characters', async () => {
      const introduction = 'A'.repeat(100);
      const topic = new Topic({
        ...validTopicData,
        introduction
      });

      const savedTopic = await topic.save();
      expect(savedTopic.introduction).toBe(introduction);
    });

    test('should fail validation with introduction less than 100 characters', async () => {
      const topic = new Topic({
        ...validTopicData,
        introduction: 'Short intro'
      });

      await expect(topic.save()).rejects.toThrow();
    });
  });

  describe('Content Arrays', () => {
    test('should default summary to empty array', async () => {
      const topic = new Topic(validTopicData);
      const savedTopic = await topic.save();

      expect(savedTopic.summary).toEqual([]);
    });

    test('should default furtherReading to empty array', async () => {
      const topic = new Topic(validTopicData);
      const savedTopic = await topic.save();

      expect(savedTopic.furtherReading).toEqual([]);
    });

    test('should store summary array', async () => {
      const summary = ['Point 1', 'Point 2', 'Point 3'];
      const topic = new Topic({
        ...validTopicData,
        summary
      });

      const savedTopic = await topic.save();
      expect(savedTopic.summary).toEqual(summary);
    });

    test('should store furtherReading array', async () => {
      const furtherReading = ['Reference 1', 'Reference 2'];
      const topic = new Topic({
        ...validTopicData,
        furtherReading
      });

      const savedTopic = await topic.save();
      expect(savedTopic.furtherReading).toEqual(furtherReading);
    });
  });

  describe('Shloka Subdocument', () => {
    test('should default shloka to null', async () => {
      const topic = new Topic(validTopicData);
      const savedTopic = await topic.save();

      expect(savedTopic.shloka).toBeNull();
    });

    test('should store complete shloka subdocument', async () => {
      const shloka = {
        devanagari: 'वायुः पित्तं कफश्चेति',
        transliteration: 'vāyuḥ pittaṃ kaphaśceti',
        translation: 'Vata, Pitta, and Kapha',
        translationMr: 'वात, पित्त आणि कफ',
        source: 'Ashtanga Hridayam'
      };

      const topic = new Topic({
        ...validTopicData,
        shloka
      });

      const savedTopic = await topic.save();
      expect(savedTopic.shloka.devanagari).toBe(shloka.devanagari);
      expect(savedTopic.shloka.transliteration).toBe(shloka.transliteration);
      expect(savedTopic.shloka.translation).toBe(shloka.translation);
      expect(savedTopic.shloka.translationMr).toBe(shloka.translationMr);
      expect(savedTopic.shloka.source).toBe(shloka.source);
    });

    test('should store partial shloka subdocument', async () => {
      const shloka = {
        devanagari: 'वायुः पित्तं कफश्चेति',
        transliteration: 'vāyuḥ pittaṃ kaphaśceti'
      };

      const topic = new Topic({
        ...validTopicData,
        shloka
      });

      const savedTopic = await topic.save();
      expect(savedTopic.shloka.devanagari).toBe(shloka.devanagari);
      expect(savedTopic.shloka.transliteration).toBe(shloka.transliteration);
      expect(savedTopic.shloka.translation).toBeUndefined();
    });

    test('should trim whitespace from shloka fields', async () => {
      const shloka = {
        devanagari: '  वायुः पित्तं कफश्चेति  ',
        transliteration: '  vāyuḥ pittaṃ kaphaśceti  ',
        translation: '  Vata, Pitta, and Kapha  ',
        source: '  Ashtanga Hridayam  '
      };

      const topic = new Topic({
        ...validTopicData,
        shloka
      });

      const savedTopic = await topic.save();
      expect(savedTopic.shloka.devanagari).toBe('वायुः पित्तं कफश्चेति');
      expect(savedTopic.shloka.transliteration).toBe('vāyuḥ pittaṃ kaphaśceti');
      expect(savedTopic.shloka.translation).toBe('Vata, Pitta, and Kapha');
      expect(savedTopic.shloka.source).toBe('Ashtanga Hridayam');
    });
  });

  describe('Slug Uniqueness Constraint', () => {
    test('should enforce unique slug constraint', async () => {
      await new Topic(validTopicData).save();

      const duplicateTopic = new Topic({
        ...validTopicData,
        title: 'Different Title'
      });

      await expect(duplicateTopic.save()).rejects.toThrow();
    });
  });

  describe('Indexes', () => {
    test('should have slug index', async () => {
      const indexes = await Topic.collection.getIndexes();
      expect(indexes).toHaveProperty('slug_1');
    });

    test('should have subjectSlug index', async () => {
      const indexes = await Topic.collection.getIndexes();
      expect(indexes).toHaveProperty('subjectSlug_1');
    });

    test('should have difficulty index', async () => {
      const indexes = await Topic.collection.getIndexes();
      expect(indexes).toHaveProperty('difficulty_1');
    });

    test('should have text index for search', async () => {
      const indexes = await Topic.collection.getIndexes();
      const textIndexKeys = Object.keys(indexes).filter(key => key.includes('text'));
      expect(textIndexKeys.length).toBeGreaterThan(0);
    });
  });

  describe('Timestamps', () => {
    test('should automatically set createdAt and updatedAt', async () => {
      const topic = new Topic(validTopicData);
      const savedTopic = await topic.save();

      expect(savedTopic.createdAt).toBeInstanceOf(Date);
      expect(savedTopic.updatedAt).toBeInstanceOf(Date);
    });

    test('should update updatedAt on modification', async () => {
      const topic = new Topic(validTopicData);
      const savedTopic = await topic.save();
      const originalUpdatedAt = savedTopic.updatedAt;

      // Wait a bit to ensure timestamp difference
      await new Promise(resolve => setTimeout(resolve, 10));

      savedTopic.title = 'Updated Title';
      await savedTopic.save();

      expect(savedTopic.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });
  });

  describe('String Trimming', () => {
    test('should trim whitespace from string fields', async () => {
      const topic = new Topic({
        slug: '  vata-dosha  ',
        subjectSlug: '  basic-principles  ',
        title: '  Vata Dosha  ',
        titleMr: '  वात दोष  ',
        difficulty: 'beginner',
        estimatedMins: 15,
        orderIndex: 1,
        introduction: '  ' + 'A'.repeat(100) + '  ',
        historicalContext: '  Historical context  ',
        coreExplanation: '  Core explanation  ',
        clinicalApplications: '  Clinical applications  ',
        modernComparison: '  Modern comparison  '
      });

      const savedTopic = await topic.save();
      expect(savedTopic.slug).toBe('vata-dosha');
      expect(savedTopic.subjectSlug).toBe('basic-principles');
      expect(savedTopic.title).toBe('Vata Dosha');
      expect(savedTopic.titleMr).toBe('वात दोष');
      expect(savedTopic.introduction).toBe('A'.repeat(100));
      expect(savedTopic.historicalContext).toBe('Historical context');
    });
  });

  describe('Marathi Content Fields', () => {
    test('should store all Marathi content fields', async () => {
      const topicData = {
        ...validTopicData,
        introductionMr: 'मराठी परिचय',
        historicalContextMr: 'ऐतिहासिक संदर्भ',
        coreExplanationMr: 'मुख्य स्पष्टीकरण',
        clinicalApplicationsMr: 'क्लिनिकल अनुप्रयोग',
        modernComparisonMr: 'आधुनिक तुलना',
        summaryMr: ['मुद्दा १', 'मुद्दा २'],
        furtherReadingMr: ['संदर्भ १', 'संदर्भ २']
      };

      const topic = new Topic(topicData);
      const savedTopic = await topic.save();

      expect(savedTopic.introductionMr).toBe(topicData.introductionMr);
      expect(savedTopic.historicalContextMr).toBe(topicData.historicalContextMr);
      expect(savedTopic.coreExplanationMr).toBe(topicData.coreExplanationMr);
      expect(savedTopic.clinicalApplicationsMr).toBe(topicData.clinicalApplicationsMr);
      expect(savedTopic.modernComparisonMr).toBe(topicData.modernComparisonMr);
      expect(savedTopic.summaryMr).toEqual(topicData.summaryMr);
      expect(savedTopic.furtherReadingMr).toEqual(topicData.furtherReadingMr);
    });
  });
});
