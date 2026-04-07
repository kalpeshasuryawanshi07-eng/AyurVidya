const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const Course = require('../../models/Course');
const LanguageService = require('../../services/LanguageService');

async function testCourseAPI() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Simulate what the API does
    const slug = 'foundations-of-ayurveda';
    const lang = 'en';

    console.log('\n=== SIMULATING API CALL ===\n');
    console.log(`GET /api/courses/${slug}?lang=${lang}`);

    // Find course by slug
    const course = await Course.findOne({ slug });

    if (!course) {
      console.log('❌ Course not found');
      return;
    }

    console.log('\n✓ Course found in database');
    console.log(`Title: ${course.title}`);
    console.log(`Lessons in DB: ${course.lessons?.length || 0}`);

    // Apply language selection (what the API does)
    const courseObj = course.toObject();
    console.log('\n--- Before LanguageService ---');
    console.log(`Lessons: ${courseObj.lessons?.length || 0}`);
    console.log('First lesson:', courseObj.lessons?.[0]?.title);

    const localizedCourse = LanguageService.selectContent(courseObj, lang);
    
    console.log('\n--- After LanguageService ---');
    console.log(`Lessons: ${localizedCourse.lessons?.length || 0}`);
    console.log('First lesson:', localizedCourse.lessons?.[0]?.title);

    // Check if lessons is an array
    console.log('\n--- Type Checks ---');
    console.log(`Is array: ${Array.isArray(localizedCourse.lessons)}`);
    console.log(`Type: ${typeof localizedCourse.lessons}`);
    
    if (localizedCourse.lessons && localizedCourse.lessons.length > 0) {
      console.log('\n✓ Lessons are present and accessible');
    } else {
      console.log('\n❌ Lessons are missing or empty after language service');
    }

    await mongoose.disconnect();
    console.log('\n✓ Test complete');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

testCourseAPI();
