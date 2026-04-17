const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables - assuming run from 'server' folder
dotenv.config({ path: path.join(__dirname, '../server/.env') });

const Course = require('./models/Course');
const AdminService = require('./services/AdminService');

async function verify() {
  try {
    console.log('Connecting to MongoDB...');
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error('MONGODB_URI not found in .env');
    
    await mongoose.connect(mongoUri);
    console.log('Connected.');

    const testSlug = 'test-course-automation-' + Date.now();
    
    // 1. Test Creation
    console.log('\n--- Testing Course Creation ---');
    const courseData = {
      slug: testSlug,
      title: 'Automation Test Course',
      description: 'Testing pre-save hooks for lessons count',
      lessons: [
        { lessonId: 'L1', title: 'Lesson 1', orderIndex: 1 },
        { lessonId: 'L2', title: 'Lesson 2', orderIndex: 2 }
      ],
      modules: [
        { title: 'Module 1', topics: [] }
      ]
    };

    const createdCourse = await AdminService.createCourse(courseData);
    console.log('Created Course Total Lessons:', createdCourse.totalLessons);
    console.log('Created Course Total Modules:', createdCourse.totalModules);

    if (createdCourse.totalLessons !== 2) throw new Error('Failed: totalLessons should be 2');
    if (createdCourse.totalModules !== 1) throw new Error('Failed: totalModules should be 1');

    // 2. Test Update
    console.log('\n--- Testing Course Update ---');
    const updates = {
      lessons: [
        ...courseData.lessons,
        { lessonId: 'L3', title: 'Lesson 3', orderIndex: 3 }
      ]
    };

    const updatedCourse = await AdminService.updateCourse(createdCourse._id, updates);
    console.log('Updated Course Total Lessons:', updatedCourse.totalLessons);

    if (updatedCourse.totalLessons !== 3) throw new Error('Failed: totalLessons should be 3');

    console.log('\n✅ Verification Successful!');

    // Cleanup
    await Course.findByIdAndDelete(createdCourse._id);
    console.log('Cleanup done.');

  } catch (error) {
    console.error('\n❌ Verification Failed:', error.message);
  } finally {
    await mongoose.connection.close();
  }
}

verify();
