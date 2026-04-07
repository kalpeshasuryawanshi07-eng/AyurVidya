const mongoose = require('mongoose');
const User = require('../../models/User');
const Course = require('../../models/Course');
require('dotenv').config();

async function finalCheck() {
  try {
    console.log('\n=== FINAL WEBSITE VERIFICATION ===\n');
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurveda-learning');
    console.log('✓ Database connected\n');
    
    // 1. Check admin user
    console.log('1. Admin User Check:');
    const admin = await User.findOne({ role: 'admin' });
    if (admin) {
      console.log(`   ✓ Admin exists: ${admin.email}`);
      console.log(`   ✓ Name: ${admin.name}`);
      console.log(`   ✓ Role: ${admin.role}`);
    } else {
      console.log('   ✗ No admin user found!');
    }
    
    // 2. Check courses
    console.log('\n2. Courses Check:');
    const courses = await Course.find();
    console.log(`   ✓ Total courses: ${courses.length}`);
    
    let totalLessons = 0;
    let completeCourses = 0;
    
    courses.forEach(course => {
      const lessonCount = course.lessons.length;
      totalLessons += lessonCount;
      
      const hasContent = course.lessons.every(l => l.content && l.content.length > 1000);
      if (hasContent) completeCourses++;
      
      console.log(`   ${hasContent ? '✓' : '~'} ${course.title}: ${lessonCount} lessons`);
    });
    
    console.log(`\n   Total lessons: ${totalLessons}`);
    console.log(`   Complete courses: ${completeCourses}/${courses.length}`);
    
    // 3. Check users
    console.log('\n3. Users Check:');
    const userCount = await User.countDocuments();
    const adminCount = await User.countDocuments({ role: 'admin' });
    const studentCount = await User.countDocuments({ role: 'student' });
    console.log(`   ✓ Total users: ${userCount}`);
    console.log(`   ✓ Admins: ${adminCount}`);
    console.log(`   ✓ Students: ${studentCount}`);
    
    // 4. Summary
    console.log('\n=== VERIFICATION SUMMARY ===\n');
    
    const allGood = admin && courses.length >= 4 && totalLessons >= 100;
    
    if (allGood) {
      console.log('✓✓✓ ALL CHECKS PASSED ✓✓✓');
      console.log('\nWebsite is ready to use!');
      console.log('\nAdmin Login:');
      console.log(`  Email: ${admin.email}`);
      console.log('  Password: Admin@123456');
      console.log('\nAccess admin panel at: http://localhost:3000/admin');
    } else {
      console.log('⚠ Some issues found:');
      if (!admin) console.log('  - No admin user');
      if (courses.length < 4) console.log('  - Missing courses');
      if (totalLessons < 100) console.log('  - Insufficient lesson content');
    }
    
    await mongoose.disconnect();
    console.log('\n✓ Database disconnected\n');
    
  } catch (error) {
    console.error('Error:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

finalCheck();
