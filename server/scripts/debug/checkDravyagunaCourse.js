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

const checkDravyagunaCourse = async () => {
  try {
    await connectDB();

    const course = await Course.findOne({ slug: 'dravyaguna-vigyan-mastery' });
    
    if (!course) {
      console.error('Dravyaguna course not found!');
      process.exit(1);
    }

    console.log('Course:', course.title);
    console.log('Total lessons:', course.lessons.length);
    console.log('\nLesson titles:');
    course.lessons.forEach((lesson, index) => {
      console.log(`${index + 1}. ${lesson.title} (${lesson.lessonId}) - ${lesson.content.length} chars`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkDravyagunaCourse();
