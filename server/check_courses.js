const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');

dotenv.config();

async function checkCourses() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const count = await Course.countDocuments();
    console.log(`Number of courses: ${count}`);
    
    if (count === 0) {
      console.log('No courses found in database.');
    } else {
      const courses = await Course.find();
      console.log('Courses:', JSON.stringify(courses, null, 2));
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error checking courses:', error);
  }
}

checkCourses();
