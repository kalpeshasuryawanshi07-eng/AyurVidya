require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Enrollment = require('../../models/Enrollment');
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

const cleanupNadiEnrollments = async () => {
  try {
    await connectDB();

    // Get the Nadi Pariksha course
    const course = await Course.findOne({ slug: 'nadi-pariksha-clinical-diagnosis' });
    
    if (!course) {
      console.error('Nadi Pariksha course not found!');
      process.exit(1);
    }

    console.log('Course found:', course.title);
    console.log('Current lessons:', course.lessons.length);
    
    // Get all valid lesson IDs (the 15 lessons that still exist)
    const validLessonIds = course.lessons.map(lesson => lesson.lessonId);
    console.log('\nValid lesson IDs:', validLessonIds);
    
    // Find all enrollments for this course
    const enrollments = await Enrollment.find({ courseId: course._id });
    
    console.log(`\nTotal enrollments found: ${enrollments.length}`);
    
    if (enrollments.length === 0) {
      console.log('No enrollments to clean up');
      process.exit(0);
    }
    
    let updatedCount = 0;
    
    for (const enrollment of enrollments) {
      const originalCompletedCount = enrollment.completedLessons.length;
      
      // Filter out invalid lesson IDs (lessons 16-38 that were deleted)
      const validCompletedLessons = enrollment.completedLessons.filter(
        lessonId => validLessonIds.includes(lessonId)
      );
      
      const newCompletedCount = validCompletedLessons.length;
      
      if (originalCompletedCount !== newCompletedCount) {
        console.log(`\nEnrollment ${enrollment._id}:`);
        console.log(`  Original completed: ${originalCompletedCount}`);
        console.log(`  Valid completed: ${newCompletedCount}`);
        console.log(`  Removed: ${originalCompletedCount - newCompletedCount} invalid lesson IDs`);
        
        // Update the enrollment
        enrollment.completedLessons = validCompletedLessons;
        
        // Recalculate progress percentage
        enrollment.progress = Math.round((newCompletedCount / course.lessons.length) * 100);
        
        // Update completion status
        enrollment.isCompleted = newCompletedCount === course.lessons.length;
        
        await enrollment.save();
        updatedCount++;
      }
    }
    
    console.log(`\n✓ Updated ${updatedCount} enrollment(s)`);
    console.log('All enrollments now reference only valid lessons (1-15)');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

cleanupNadiEnrollments();
