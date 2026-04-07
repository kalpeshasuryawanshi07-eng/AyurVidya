const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const Course = require('../../models/Course');

async function publishFoundationsCourse() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Find and update Foundations of Ayurveda course
    const result = await Course.updateOne(
      { slug: 'foundations-of-ayurveda' },
      { $set: { isPublished: true } }
    );

    if (result.matchedCount === 0) {
      console.log('❌ Course not found');
      return;
    }

    console.log('✅ Course published successfully!');
    console.log(`Modified ${result.modifiedCount} document(s)`);

    // Verify
    const course = await Course.findOne({ slug: 'foundations-of-ayurveda' }, 'title isPublished');
    console.log('\nVerification:');
    console.log(`Title: ${course.title}`);
    console.log(`Published: ${course.isPublished}`);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

publishFoundationsCourse();
