require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Course = require('../../models/Course');
const dravyagunaData = require('../seed/dravyaguna_vigyan_mastery.json');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const compareStructure = async () => {
  try {
    await connectDB();

    const course = await Course.findOne({ slug: 'dravyaguna-vigyan-mastery' });
    
    if (!course) {
      console.error('Dravyaguna course not found!');
      process.exit(1);
    }

    console.log('=== CURRENT DATABASE LESSONS ===');
    course.lessons.forEach((lesson, index) => {
      console.log(`${index + 1}. ${lesson.title} (${lesson.lessonId})`);
    });
    
    console.log('\n=== JSON FILE TOPICS ===');
    let topicIndex = 1;
    dravyagunaData.modules.forEach((module, modIndex) => {
      console.log(`\nModule ${modIndex + 1}: ${module.module_title}`);
      module.topics.forEach((topic) => {
        console.log(`  ${topicIndex}. ${topic.topic_name}`);
        topicIndex++;
      });
    });
    
    console.log(`\n=== SUMMARY ===`);
    console.log(`Database lessons: ${course.lessons.length}`);
    console.log(`JSON topics: ${topicIndex - 1}`);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

compareStructure();
