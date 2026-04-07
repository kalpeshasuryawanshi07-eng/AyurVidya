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

const checkLesson = async () => {
  try {
    await connectDB();

    const course = await Course.findOne({ slug: 'dravyaguna-vigyan-mastery' });
    
    if (!course) {
      console.error('Dravyaguna course not found!');
      process.exit(1);
    }

    // Check first lesson
    const lesson1 = course.lessons[0];
    console.log('=== LESSON 1 ===');
    console.log('Title:', lesson1.title);
    console.log('Lesson ID:', lesson1.lessonId);
    console.log('Content length:', lesson1.content.length);
    console.log('\nFirst 500 characters of content:');
    console.log(lesson1.content.substring(0, 500));
    
    // Check lesson 4
    const lesson4 = course.lessons[3];
    console.log('\n\n=== LESSON 4 ===');
    console.log('Title:', lesson4.title);
    console.log('Lesson ID:', lesson4.lessonId);
    console.log('Content length:', lesson4.content.length);
    console.log('\nFirst 500 characters of content:');
    console.log(lesson4.content.substring(0, 500));

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkLesson();
