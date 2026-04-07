require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Progress = require('../../models/Progress');
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

const cleanupNadiProgress = async () => {
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
    console.log('\nValid lesson IDs:');
    validLessonIds.forEach((id, index) => {
      console.log(`  ${index + 1}. ${id}`);
    });
    
    // Find all progress records for Nadi Pariksha lessons
    const allNadiProgress = await Progress.find({
      topicSlug: { $regex: /^nadi-/ }
    });
    
    console.log(`\nTotal Nadi Pariksha progress records found: ${allNadiProgress.length}`);
    
    // Identify invalid progress records (lessons 16-38 that were deleted)
    const invalidProgress = allNadiProgress.filter(
      progress => !validLessonIds.includes(progress.topicSlug)
    );
    
    console.log(`Invalid progress records (for deleted lessons): ${invalidProgress.length}`);
    
    if (invalidProgress.length > 0) {
      console.log('\nInvalid lesson IDs to be deleted:');
      const uniqueInvalidIds = [...new Set(invalidProgress.map(p => p.topicSlug))];
      uniqueInvalidIds.forEach(id => {
        console.log(`  - ${id}`);
      });
      
      // Delete invalid progress records
      const deleteResult = await Progress.deleteMany({
        topicSlug: { $in: uniqueInvalidIds }
      });
      
      console.log(`\n✓ Deleted ${deleteResult.deletedCount} invalid progress records`);
    } else {
      console.log('\n✓ No invalid progress records found - database is clean!');
    }
    
    // Verify the cleanup
    const remainingNadiProgress = await Progress.find({
      topicSlug: { $regex: /^nadi-/ }
    });
    
    console.log(`\nRemaining Nadi Pariksha progress records: ${remainingNadiProgress.length}`);
    console.log('All remaining records are for valid lessons (1-15)');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

cleanupNadiProgress();
