const mongoose = require('mongoose');
const Course = require('./Course');

// Mock MongoDB connection for testing
beforeAll(async () => {
  const baseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurveda-test';
  const mongoUri = `${baseUri}-${process.env.JEST_WORKER_ID || '1'}`;
  await mongoose.connect(mongoUri);
  // Ensure indexes are created
  await Course.init();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Course.deleteMany({});
});

describe('Course Model', () => {
  describe('Schema Validation', () => {
    test('should create a valid course with all required fields', async () => {
      const courseData = {
        slug: 'introduction-to-ayurveda',
        title: 'Introduction to Ayurveda',
        description: 'A comprehensive introduction to Ayurvedic principles'
      };

      const course = new Course(courseData);
      const savedCourse = await course.save();

      expect(savedCourse._id).toBeDefined();
      expect(savedCourse.slug).toBe(courseData.slug);
      expect(savedCourse.title).toBe(courseData.title);
      expect(savedCourse.description).toBe(courseData.description);
      expect(savedCourse.price).toBe(0);
      expect(savedCourse.isPaid).toBe(false);
      expect(savedCourse.enrollmentCount).toBe(0);
      expect(savedCourse.rating).toBe(0);
      expect(savedCourse.lessons).toEqual([]);
      expect(savedCourse.createdAt).toBeDefined();
      expect(savedCourse.updatedAt).toBeDefined();
    });

    test('should fail validation when slug is missing', async () => {
      const course = new Course({
        title: 'Test Course',
        description: 'Test description'
      });

      await expect(course.save()).rejects.toThrow();
    });

    test('should fail validation when title is missing', async () => {
      const course = new Course({
        slug: 'test-course',
        description: 'Test description'
      });

      await expect(course.save()).rejects.toThrow();
    });

    test('should fail validation when description is missing', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course'
      });

      await expect(course.save()).rejects.toThrow();
    });

    test('should fail validation with invalid slug format', async () => {
      const course = new Course({
        slug: 'Invalid Slug!',
        title: 'Test Course',
        description: 'Test description'
      });

      await expect(course.save()).rejects.toThrow();
    });

    test('should convert slug to lowercase', async () => {
      const course = new Course({
        slug: 'TEST-COURSE',
        title: 'Test Course',
        description: 'Test description'
      });

      const savedCourse = await course.save();
      expect(savedCourse.slug).toBe('test-course');
    });

    test('should trim whitespace from fields', async () => {
      const course = new Course({
        slug: '  test-course  ',
        title: '  Test Course  ',
        description: '  Test description  '
      });

      const savedCourse = await course.save();
      expect(savedCourse.slug).toBe('test-course');
      expect(savedCourse.title).toBe('Test Course');
      expect(savedCourse.description).toBe('Test description');
    });
  });

  describe('Slug Uniqueness Constraint', () => {
    test('should enforce unique slug constraint', async () => {
      await new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description'
      }).save();

      const duplicateCourse = new Course({
        slug: 'test-course',
        title: 'Another Course',
        description: 'Another description'
      });

      await expect(duplicateCourse.save()).rejects.toThrow();
    });
  });

  describe('Level Field', () => {
    test('should accept beginner level', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description',
        level: 'beginner'
      });

      const savedCourse = await course.save();
      expect(savedCourse.level).toBe('beginner');
    });

    test('should accept intermediate level', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description',
        level: 'intermediate'
      });

      const savedCourse = await course.save();
      expect(savedCourse.level).toBe('intermediate');
    });

    test('should accept advanced level', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description',
        level: 'advanced'
      });

      const savedCourse = await course.save();
      expect(savedCourse.level).toBe('advanced');
    });

    test('should reject invalid level', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description',
        level: 'expert'
      });

      await expect(course.save()).rejects.toThrow();
    });
  });

  describe('Price and isPaid Fields', () => {
    test('should default price to 0 and isPaid to false', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description'
      });

      const savedCourse = await course.save();
      expect(savedCourse.price).toBe(0);
      expect(savedCourse.isPaid).toBe(false);
    });

    test('should accept positive price', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description',
        price: 999,
        isPaid: true
      });

      const savedCourse = await course.save();
      expect(savedCourse.price).toBe(999);
      expect(savedCourse.isPaid).toBe(true);
    });

    test('should reject negative price', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description',
        price: -100
      });

      await expect(course.save()).rejects.toThrow();
    });
  });

  describe('Payment Methods Field', () => {
    test('should default paymentMethods to empty array for free course', async () => {
      const course = new Course({
        slug: 'free-course',
        title: 'Free Course',
        description: 'Test description',
        price: 0,
        isPaid: false
      });

      const savedCourse = await course.save();
      expect(savedCourse.paymentMethods).toEqual([]);
    });

    test('should set default paymentMethods for paid course', async () => {
      const course = new Course({
        slug: 'paid-course',
        title: 'Paid Course',
        description: 'Test description',
        price: 999,
        isPaid: true
      });

      const savedCourse = await course.save();
      expect(savedCourse.paymentMethods).toEqual(['upi', 'card', 'netbanking']);
    });

    test('should normalize paymentMethods and remove duplicates', async () => {
      const course = new Course({
        slug: 'normalized-methods',
        title: 'Normalized Methods',
        description: 'Test description',
        price: 499,
        isPaid: true,
        paymentMethods: [' UPI ', 'card', 'UPI', 'netbanking']
      });

      const savedCourse = await course.save();
      expect(savedCourse.paymentMethods).toEqual(['upi', 'card', 'netbanking']);
    });

    test('should reject invalid payment method values', async () => {
      const course = new Course({
        slug: 'invalid-method',
        title: 'Invalid Method',
        description: 'Test description',
        price: 799,
        isPaid: true,
        paymentMethods: ['cash']
      });

      await expect(course.save()).rejects.toThrow();
    });
  });

  describe('Enrollment Count and Rating Fields', () => {
    test('should default enrollmentCount to 0 and rating to 0', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description'
      });

      const savedCourse = await course.save();
      expect(savedCourse.enrollmentCount).toBe(0);
      expect(savedCourse.rating).toBe(0);
    });

    test('should accept valid enrollmentCount', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description',
        enrollmentCount: 100
      });

      const savedCourse = await course.save();
      expect(savedCourse.enrollmentCount).toBe(100);
    });

    test('should reject negative enrollmentCount', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description',
        enrollmentCount: -10
      });

      await expect(course.save()).rejects.toThrow();
    });

    test('should accept valid rating between 0 and 5', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description',
        rating: 4.5
      });

      const savedCourse = await course.save();
      expect(savedCourse.rating).toBe(4.5);
    });

    test('should reject rating above 5', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description',
        rating: 6
      });

      await expect(course.save()).rejects.toThrow();
    });

    test('should reject negative rating', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description',
        rating: -1
      });

      await expect(course.save()).rejects.toThrow();
    });
  });

  describe('Lessons Array', () => {
    test('should default lessons to empty array', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description'
      });

      const savedCourse = await course.save();
      expect(savedCourse.lessons).toEqual([]);
    });

    test('should accept valid lessons array', async () => {
      const lessons = [
        {
          lessonId: 'lesson-1',
          title: 'Introduction',
          titleMr: 'परिचय',
          duration: 30,
          orderIndex: 1,
          topicSlug: 'intro-topic'
        },
        {
          lessonId: 'lesson-2',
          title: 'Core Concepts',
          duration: 45,
          orderIndex: 2
        }
      ];

      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description',
        lessons
      });

      const savedCourse = await course.save();
      expect(savedCourse.lessons).toHaveLength(2);
      expect(savedCourse.lessons[0].lessonId).toBe('lesson-1');
      expect(savedCourse.lessons[0].title).toBe('Introduction');
      expect(savedCourse.lessons[0].titleMr).toBe('परिचय');
      expect(savedCourse.lessons[0].duration).toBe(30);
      expect(savedCourse.lessons[0].orderIndex).toBe(1);
      expect(savedCourse.lessons[0].topicSlug).toBe('intro-topic');
      expect(savedCourse.lessons[1].lessonId).toBe('lesson-2');
    });

    test('should fail validation when lesson is missing required fields', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description',
        lessons: [
          {
            title: 'Introduction',
            orderIndex: 1
          }
        ]
      });

      await expect(course.save()).rejects.toThrow();
    });

    test('should reject lesson with negative duration', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description',
        lessons: [
          {
            lessonId: 'lesson-1',
            title: 'Introduction',
            duration: -10,
            orderIndex: 1
          }
        ]
      });

      await expect(course.save()).rejects.toThrow();
    });
  });

  describe('Bilingual Support', () => {
    test('should store both English and Marathi titles', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Introduction to Ayurveda',
        titleMr: 'आयुर्वेदाचा परिचय',
        description: 'A comprehensive course',
        descriptionMr: 'एक सर्वसमावेशक अभ्यासक्रम'
      });

      const savedCourse = await course.save();
      expect(savedCourse.title).toBe('Introduction to Ayurveda');
      expect(savedCourse.titleMr).toBe('आयुर्वेदाचा परिचय');
      expect(savedCourse.description).toBe('A comprehensive course');
      expect(savedCourse.descriptionMr).toBe('एक सर्वसमावेशक अभ्यासक्रम');
    });
  });

  describe('Duration Field', () => {
    test('should accept valid duration string', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description',
        duration: '10 hrs'
      });

      const savedCourse = await course.save();
      expect(savedCourse.duration).toBe('10 hrs');
    });

    test('should accept numeric duration string', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description',
        duration: '25'
      });

      const savedCourse = await course.save();
      expect(savedCourse.duration).toBe('25');
    });
  });

  describe('Indexes', () => {
    test('should have slug index', async () => {
      const indexes = await Course.collection.getIndexes();
      expect(indexes).toHaveProperty('slug_1');
    });

    test('should have isPaid index', async () => {
      const indexes = await Course.collection.getIndexes();
      expect(indexes).toHaveProperty('isPaid_1');
    });

    test('should have level index', async () => {
      const indexes = await Course.collection.getIndexes();
      expect(indexes).toHaveProperty('level_1');
    });
  });

  describe('New Course Fields', () => {
    test('should accept longDescription field', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Short description',
        longDescription: 'This is a much longer and more detailed description of the course content.'
      });

      const savedCourse = await course.save();
      expect(savedCourse.longDescription).toBe('This is a much longer and more detailed description of the course content.');
    });

    test('should default totalLessons and totalModules to 0', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description'
      });

      const savedCourse = await course.save();
      expect(savedCourse.totalLessons).toBe(0);
      expect(savedCourse.totalModules).toBe(0);
    });

    test('should accept totalLessons and totalModules', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description',
        totalLessons: 15,
        totalModules: 4
      });

      const savedCourse = await course.save();
      expect(savedCourse.totalLessons).toBe(15);
      expect(savedCourse.totalModules).toBe(4);
    });

    test('should default students to 0', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description'
      });

      const savedCourse = await course.save();
      expect(savedCourse.students).toBe(0);
    });

    test('should accept students count', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description',
        students: 1250
      });

      const savedCourse = await course.save();
      expect(savedCourse.students).toBe(1250);
    });

    test('should default tags to empty array', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description'
      });

      const savedCourse = await course.save();
      expect(savedCourse.tags).toEqual([]);
    });

    test('should accept tags array', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description',
        tags: ['Beginner Friendly', 'Theory', 'Practical']
      });

      const savedCourse = await course.save();
      expect(savedCourse.tags).toEqual(['Beginner Friendly', 'Theory', 'Practical']);
    });

    test('should default modules to empty array', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description'
      });

      const savedCourse = await course.save();
      expect(savedCourse.modules).toEqual([]);
    });

    test('should accept modules with topics', async () => {
      const modules = [
        {
          title: 'Introduction',
          topics: [
            { title: 'What is Ayurveda?', description: 'Basic introduction' },
            { title: 'History', description: 'Historical background' }
          ]
        },
        {
          title: 'Core Concepts',
          topics: [
            { title: 'Doshas', description: 'Understanding doshas' }
          ]
        }
      ];

      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description',
        modules
      });

      const savedCourse = await course.save();
      expect(savedCourse.modules).toHaveLength(2);
      expect(savedCourse.modules[0].title).toBe('Introduction');
      expect(savedCourse.modules[0].topics).toHaveLength(2);
      expect(savedCourse.modules[0].topics[0].title).toBe('What is Ayurveda?');
      expect(savedCourse.modules[1].topics).toHaveLength(1);
    });

    test('should default thumbnail to placeholder', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description'
      });

      const savedCourse = await course.save();
      expect(savedCourse.thumbnail).toBe('/images/course-placeholder.jpg');
    });

    test('should accept custom thumbnail', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description',
        thumbnail: '/images/ayurveda-course.jpg'
      });

      const savedCourse = await course.save();
      expect(savedCourse.thumbnail).toBe('/images/ayurveda-course.jpg');
    });

    test('should default language to English and Marathi', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description'
      });

      const savedCourse = await course.save();
      expect(savedCourse.language).toEqual(['English', 'Marathi']);
    });

    test('should default isPublished to true', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description'
      });

      const savedCourse = await course.save();
      expect(savedCourse.isPublished).toBe(true);
    });

    test('should accept isPublished false', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description',
        isPublished: false
      });

      const savedCourse = await course.save();
      expect(savedCourse.isPublished).toBe(false);
    });

    test('should set isFree based on isPaid and price', async () => {
      const freeCourse = new Course({
        slug: 'free-course',
        title: 'Free Course',
        description: 'Test description',
        price: 0,
        isPaid: false
      });

      const savedFreeCourse = await freeCourse.save();
      expect(savedFreeCourse.isFree).toBe(true);

      const paidCourse = new Course({
        slug: 'paid-course',
        title: 'Paid Course',
        description: 'Test description',
        price: 999,
        isPaid: true
      });

      const savedPaidCourse = await paidCourse.save();
      expect(savedPaidCourse.isFree).toBe(false);
    });
  });

  describe('Timestamps', () => {
    test('should automatically set createdAt and updatedAt', async () => {
      const course = new Course({
        slug: 'test-course',
        title: 'Test Course',
        description: 'Test description'
      });

      const savedCourse = await course.save();
      expect(savedCourse.createdAt).toBeInstanceOf(Date);
      expect(savedCourse.updatedAt).toBeInstanceOf(Date);
    });
  });
});
