const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const Course = require('../../models/Course');

async function checkCourseLessons() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get all courses
    const courses = await Course.find({});
    
    console.log('\n=== COURSE LESSONS CHECK ===\n');
    
    for (const course of courses) {
      console.log(`\nCourse: ${course.title}`);
      console.log(`Slug: ${course.slug}`);
      console.log(`Lessons array exists: ${Array.isArray(course.lessons)}`);
      console.log(`Number of lessons: ${course.lessons?.length || 0}`);
      
      if (course.lessons && course.lessons.length > 0) {
        console.log('First lesson:', JSON.stringify(course.lessons[0], null, 2));
      } else {
        console.log('⚠️ NO LESSONS FOUND');
      }
      console.log('---');
    }

    await mongoose.disconnect();
    console.log('\n✓ Check complete');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkCourseLessons();
