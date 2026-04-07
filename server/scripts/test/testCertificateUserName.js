const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const Certificate = require('../../models/Certificate');
const User = require('../../models/User');
const Course = require('../../models/Course');

async function testCertificateUserName() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find a certificate
    const certificate = await Certificate.findOne()
      .populate('userId', 'name email')
      .populate('courseId', 'title slug');

    if (!certificate) {
      console.log('No certificates found in database');
      return;
    }

    console.log('\n=== Certificate Details ===');
    console.log('Certificate Number:', certificate.certificateNumber);
    console.log('User ID:', certificate.userId?._id);
    console.log('User Name:', certificate.userId?.name);
    console.log('User Email:', certificate.userId?.email);
    console.log('Course:', certificate.courseId?.title);
    console.log('Grade:', certificate.grade);
    console.log('Issued At:', certificate.issuedAt);

    if (certificate.userId?.name) {
      console.log('\n✅ SUCCESS: User name is properly populated!');
      console.log(`Certificate will display: "${certificate.userId.name}"`);
    } else {
      console.log('\n❌ ERROR: User name is NOT populated');
      console.log('Certificate will display: "Student" (fallback)');
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

testCertificateUserName();
