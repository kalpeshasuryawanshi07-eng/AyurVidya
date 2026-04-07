const mongoose = require('mongoose');
const Subject = require('./Subject');

// Mock MongoDB connection for testing
beforeAll(async () => {
  const baseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurveda-test';
  const mongoUri = `${baseUri}-${process.env.JEST_WORKER_ID || '1'}`;
  await mongoose.connect(mongoUri);
  await Subject.init();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Subject.deleteMany({});
});

describe('Subject Model', () => {
  describe('Schema Validation', () => {
    test('should create a valid subject with all required fields', async () => {
      const subjectData = {
        slug: 'basic-principles',
        title: 'Basic Principles of Ayurveda',
        description: 'Introduction to fundamental concepts of Ayurveda',
        orderIndex: 1
      };

      const subject = new Subject(subjectData);
      const savedSubject = await subject.save();

      expect(savedSubject._id).toBeDefined();
      expect(savedSubject.slug).toBe(subjectData.slug);
      expect(savedSubject.title).toBe(subjectData.title);
      expect(savedSubject.description).toBe(subjectData.description);
      expect(savedSubject.orderIndex).toBe(subjectData.orderIndex);
      expect(savedSubject.topicCount).toBe(0); // Default value
      expect(savedSubject.createdAt).toBeDefined();
      expect(savedSubject.updatedAt).toBeDefined();
    });

    test('should create subject with all optional fields', async () => {
      const subjectData = {
        slug: 'basic-principles',
        title: 'Basic Principles of Ayurveda',
        titleMr: 'आयुर्वेदाची मूलभूत तत्त्वे',
        description: 'Introduction to fundamental concepts',
        descriptionMr: 'मूलभूत संकल्पनांचा परिचय',
        icon: 'book-icon',
        colorHex: '#4A90E2',
        year: 1,
        orderIndex: 1,
        topicCount: 15
      };

      const subject = new Subject(subjectData);
      const savedSubject = await subject.save();

      expect(savedSubject.titleMr).toBe(subjectData.titleMr);
      expect(savedSubject.descriptionMr).toBe(subjectData.descriptionMr);
      expect(savedSubject.icon).toBe(subjectData.icon);
      expect(savedSubject.colorHex).toBe(subjectData.colorHex);
      expect(savedSubject.year).toBe(subjectData.year);
      expect(savedSubject.topicCount).toBe(subjectData.topicCount);
    });

    test('should fail validation when slug is missing', async () => {
      const subject = new Subject({
        title: 'Basic Principles',
        description: 'Introduction to Ayurveda',
        orderIndex: 1
      });

      await expect(subject.save()).rejects.toThrow();
    });

    test('should fail validation when title is missing', async () => {
      const subject = new Subject({
        slug: 'basic-principles',
        description: 'Introduction to Ayurveda',
        orderIndex: 1
      });

      await expect(subject.save()).rejects.toThrow();
    });

    test('should fail validation when description is missing', async () => {
      const subject = new Subject({
        slug: 'basic-principles',
        title: 'Basic Principles',
        orderIndex: 1
      });

      await expect(subject.save()).rejects.toThrow();
    });

    test('should fail validation when orderIndex is missing', async () => {
      const subject = new Subject({
        slug: 'basic-principles',
        title: 'Basic Principles',
        description: 'Introduction to Ayurveda'
      });

      await expect(subject.save()).rejects.toThrow();
    });
  });

  describe('Slug Validation', () => {
    test('should accept valid slug format', async () => {
      const validSlugs = [
        'basic-principles',
        'ayurveda-101',
        'dravyaguna-vijnana',
        'rasashastra-and-bhaishajya-kalpana'
      ];

      for (const slug of validSlugs) {
        const subject = new Subject({
          slug,
          title: 'Test Subject',
          description: 'Test description',
          orderIndex: 1
        });

        const savedSubject = await subject.save();
        expect(savedSubject.slug).toBe(slug);
        await Subject.deleteMany({});
      }
    });

    test('should convert slug to lowercase', async () => {
      const subject = new Subject({
        slug: 'Basic-Principles',
        title: 'Basic Principles',
        description: 'Introduction to Ayurveda',
        orderIndex: 1
      });

      const savedSubject = await subject.save();
      expect(savedSubject.slug).toBe('basic-principles');
    });

    test('should fail validation with invalid slug containing spaces', async () => {
      const subject = new Subject({
        slug: 'basic principles',
        title: 'Basic Principles',
        description: 'Introduction to Ayurveda',
        orderIndex: 1
      });

      await expect(subject.save()).rejects.toThrow();
    });

    test('should fail validation with invalid slug containing special characters', async () => {
      const subject = new Subject({
        slug: 'basic_principles!',
        title: 'Basic Principles',
        description: 'Introduction to Ayurveda',
        orderIndex: 1
      });

      await expect(subject.save()).rejects.toThrow();
    });

    test('should trim whitespace from slug', async () => {
      const subject = new Subject({
        slug: '  basic-principles  ',
        title: 'Basic Principles',
        description: 'Introduction to Ayurveda',
        orderIndex: 1
      });

      const savedSubject = await subject.save();
      expect(savedSubject.slug).toBe('basic-principles');
    });
  });

  describe('ColorHex Validation', () => {
    test('should accept valid 6-digit hex color', async () => {
      const subject = new Subject({
        slug: 'basic-principles',
        title: 'Basic Principles',
        description: 'Introduction to Ayurveda',
        orderIndex: 1,
        colorHex: '#4A90E2'
      });

      const savedSubject = await subject.save();
      expect(savedSubject.colorHex).toBe('#4A90E2');
    });

    test('should accept valid 3-digit hex color', async () => {
      const subject = new Subject({
        slug: 'basic-principles',
        title: 'Basic Principles',
        description: 'Introduction to Ayurveda',
        orderIndex: 1,
        colorHex: '#F0A'
      });

      const savedSubject = await subject.save();
      expect(savedSubject.colorHex).toBe('#F0A');
    });

    test('should fail validation with invalid hex color format', async () => {
      const subject = new Subject({
        slug: 'basic-principles',
        title: 'Basic Principles',
        description: 'Introduction to Ayurveda',
        orderIndex: 1,
        colorHex: 'blue'
      });

      await expect(subject.save()).rejects.toThrow();
    });

    test('should fail validation with hex color missing hash', async () => {
      const subject = new Subject({
        slug: 'basic-principles',
        title: 'Basic Principles',
        description: 'Introduction to Ayurveda',
        orderIndex: 1,
        colorHex: '4A90E2'
      });

      await expect(subject.save()).rejects.toThrow();
    });
  });

  describe('Year Validation', () => {
    test('should accept valid year values 1-5', async () => {
      for (let year = 1; year <= 5; year++) {
        const subject = new Subject({
          slug: `subject-year-${year}`,
          title: `Year ${year} Subject`,
          description: 'Test description',
          orderIndex: year,
          year
        });

        const savedSubject = await subject.save();
        expect(savedSubject.year).toBe(year);
        await Subject.deleteMany({});
      }
    });

    test('should fail validation with year less than 1', async () => {
      const subject = new Subject({
        slug: 'basic-principles',
        title: 'Basic Principles',
        description: 'Introduction to Ayurveda',
        orderIndex: 1,
        year: 0
      });

      await expect(subject.save()).rejects.toThrow();
    });

    test('should fail validation with year greater than 5', async () => {
      const subject = new Subject({
        slug: 'basic-principles',
        title: 'Basic Principles',
        description: 'Introduction to Ayurveda',
        orderIndex: 1,
        year: 6
      });

      await expect(subject.save()).rejects.toThrow();
    });
  });

  describe('TopicCount Validation', () => {
    test('should default topicCount to 0', async () => {
      const subject = new Subject({
        slug: 'basic-principles',
        title: 'Basic Principles',
        description: 'Introduction to Ayurveda',
        orderIndex: 1
      });

      const savedSubject = await subject.save();
      expect(savedSubject.topicCount).toBe(0);
    });

    test('should accept positive topicCount', async () => {
      const subject = new Subject({
        slug: 'basic-principles',
        title: 'Basic Principles',
        description: 'Introduction to Ayurveda',
        orderIndex: 1,
        topicCount: 25
      });

      const savedSubject = await subject.save();
      expect(savedSubject.topicCount).toBe(25);
    });

    test('should fail validation with negative topicCount', async () => {
      const subject = new Subject({
        slug: 'basic-principles',
        title: 'Basic Principles',
        description: 'Introduction to Ayurveda',
        orderIndex: 1,
        topicCount: -5
      });

      await expect(subject.save()).rejects.toThrow();
    });
  });

  describe('Slug Uniqueness Constraint', () => {
    test('should enforce unique slug constraint', async () => {
      const subjectData = {
        slug: 'basic-principles',
        title: 'Basic Principles',
        description: 'Introduction to Ayurveda',
        orderIndex: 1
      };

      await new Subject(subjectData).save();

      const duplicateSubject = new Subject({
        slug: 'basic-principles',
        title: 'Another Subject',
        description: 'Different description',
        orderIndex: 2
      });

      await expect(duplicateSubject.save()).rejects.toThrow();
    });
  });

  describe('Indexes', () => {
    test('should have slug index', async () => {
      const indexes = await Subject.collection.getIndexes();
      expect(indexes).toHaveProperty('slug_1');
    });

    test('should have orderIndex index', async () => {
      const indexes = await Subject.collection.getIndexes();
      expect(indexes).toHaveProperty('orderIndex_1');
    });

    test('should have year index', async () => {
      const indexes = await Subject.collection.getIndexes();
      expect(indexes).toHaveProperty('year_1');
    });

    test('should have unique constraint on slug index', async () => {
      const indexes = await Subject.collection.getIndexes();
      expect(indexes.slug_1).toEqual([['slug', 1]]);
    });
  });

  describe('Timestamps', () => {
    test('should automatically set createdAt and updatedAt', async () => {
      const subject = new Subject({
        slug: 'basic-principles',
        title: 'Basic Principles',
        description: 'Introduction to Ayurveda',
        orderIndex: 1
      });

      const savedSubject = await subject.save();
      expect(savedSubject.createdAt).toBeInstanceOf(Date);
      expect(savedSubject.updatedAt).toBeInstanceOf(Date);
    });

    test('should update updatedAt on modification', async () => {
      const subject = new Subject({
        slug: 'basic-principles',
        title: 'Basic Principles',
        description: 'Introduction to Ayurveda',
        orderIndex: 1
      });

      const savedSubject = await subject.save();
      const originalUpdatedAt = savedSubject.updatedAt;

      // Wait a bit to ensure timestamp difference
      await new Promise(resolve => setTimeout(resolve, 10));

      savedSubject.title = 'Updated Title';
      await savedSubject.save();

      expect(savedSubject.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });
  });

  describe('String Trimming', () => {
    test('should trim whitespace from string fields', async () => {
      const subject = new Subject({
        slug: '  basic-principles  ',
        title: '  Basic Principles  ',
        titleMr: '  आयुर्वेदाची मूलभूत तत्त्वे  ',
        description: '  Introduction to Ayurveda  ',
        descriptionMr: '  मूलभूत संकल्पनांचा परिचय  ',
        icon: '  book-icon  ',
        colorHex: '  #4A90E2  ',
        orderIndex: 1
      });

      const savedSubject = await subject.save();
      expect(savedSubject.slug).toBe('basic-principles');
      expect(savedSubject.title).toBe('Basic Principles');
      expect(savedSubject.titleMr).toBe('आयुर्वेदाची मूलभूत तत्त्वे');
      expect(savedSubject.description).toBe('Introduction to Ayurveda');
      expect(savedSubject.descriptionMr).toBe('मूलभूत संकल्पनांचा परिचय');
      expect(savedSubject.icon).toBe('book-icon');
      expect(savedSubject.colorHex).toBe('#4A90E2');
    });
  });
});
