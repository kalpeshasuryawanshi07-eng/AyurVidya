const request = require('supertest');
const express = require('express');
const coursesRoutes = require('./courses');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

jest.mock('../models/Course');
jest.mock('../models/Enrollment');
jest.mock('../services/LanguageService');
jest.mock('../middleware/auth', () => ({
  authenticate: (req, res, next) => {
    if (req.headers.authorization === 'Bearer valid-token') {
      req.user = { userId: 'user123', role: 'student' };
      next();
    } else {
      res.status(401).json({ status: 'error', message: 'No token provided', errors: ['Authorization header must be in format: Bearer <token>'] });
    }
  }
}));

describe('Courses Routes', () => {
  let app;
  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/courses', coursesRoutes);
    jest.clearAllMocks();
  });

  describe('POST /api/courses/:slug/lessons/:lessonId/complete', () => {
    it('should mark lesson as complete and update progress', async () => {
      const mockCourse = { _id: 'course1', slug: 'ayurveda-basics', lessons: [{ lessonId: 'lesson1', title: 'Lesson 1' }, { lessonId: 'lesson2', title: 'Lesson 2' }, { lessonId: 'lesson3', title: 'Lesson 3' }] };
      const mockEnrollment = { userId: 'user123', courseId: 'course1', completedLessons: [], progress: 0, lastAccessedAt: null, save: jest.fn().mockResolvedValue(true) };
      Course.findOne.mockResolvedValue(mockCourse);
      Enrollment.findOne.mockResolvedValue(mockEnrollment);
      const response = await request(app).post('/api/courses/ayurveda-basics/lessons/lesson1/complete').set('Authorization', 'Bearer valid-token');
      expect(response.status).toBe(200);
      expect(mockEnrollment.completedLessons).toContain('lesson1');
      expect(mockEnrollment.progress).toBe(33);
    });
  });

  describe('GET /api/courses/:slug/progress', () => {
    it('should return user progress for a course', async () => {
      const mockCourse = { _id: 'course1', slug: 'ayurveda-basics', lessons: [{ lessonId: 'lesson1' }, { lessonId: 'lesson2' }, { lessonId: 'lesson3' }] };
      const mockEnrollment = { userId: 'user123', courseId: 'course1', completedLessons: ['lesson1', 'lesson2'], progress: 67, lastAccessedAt: new Date('2024-01-01'), save: jest.fn().mockResolvedValue(true) };
      Course.findOne.mockResolvedValue(mockCourse);
      Enrollment.findOne.mockResolvedValue(mockEnrollment);
      const response = await request(app).get('/api/courses/ayurveda-basics/progress').set('Authorization', 'Bearer valid-token');
      expect(response.status).toBe(200);
      expect(response.body.data.progress).toBe(67);
    });
  });
});
