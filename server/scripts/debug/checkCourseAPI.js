require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Course = require('../../models/Course');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const checkCourseAPI = async () => {
  try {
    await connectDB();

    const course = await Course.findOne({ slug: 'nadi-pariksha-clinical-diagnosis' });
    
    if (!course) {
      console.error('Course not found!');
      process.exit(1);
    }

    console.log('=== COURSE DATA (as returned by API) ===');
    console.log('Title:', course.title);
    console.log('Slug:', course.slug);
    console.log('Duration:', course.duration);
    console.log('Total lessons in array:', course.lessons.length);
    console.log('\nLesson IDs:');
    course.lessons.forEach((lesson, index) => {
      console.log(`  ${index + 1}. ${lesson.lessonId} - ${lesson.title}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkCourseAPI();
