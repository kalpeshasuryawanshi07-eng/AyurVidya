const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const Course = require('../../models/Course');

async function quickFix() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Update the course to be published
    const result = await Course.updateOne(
      { slug: 'foundations-of-ayurveda' },
      { $set: { isPublished: true } }
    );

    console.log('Update result:', result);

    // Verify
    const course = await Course.findOne({ slug: 'foundations-of-ayurveda' });
    console.log('\nCourse:', course.title);
    console.log('isPublished:', course.isPublished);
    console.log('Lessons:', course.lessons.length);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
  }
}

quickFix();
