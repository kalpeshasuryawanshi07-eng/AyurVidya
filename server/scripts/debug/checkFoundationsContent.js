const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const Course = require('../../models/Course');

async function checkFoundationsContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Find Foundations of Ayurveda course
    const course = await Course.findOne({ 
      $or: [
        { slug: 'foundations-of-ayurveda' },
        { title: /foundations/i }
      ]
    });

    if (!course) {
      console.log('❌ Foundations of Ayurveda course NOT FOUND in database');
      console.log('\nSearching for all courses...');
      const allCourses = await Course.find({}, 'title slug');
      console.log('\nAll courses in database:');
      allCourses.forEach((c, i) => {
        console.log(`${i + 1}. ${c.title} (${c.slug})`);
      });
      return;
    }

    console.log('✅ Course Found:', course.title);
    console.log('Slug:', course.slug);
    console.log('Total Lessons:', course.lessons?.length || 0);
    console.log('Published:', course.published);
    console.log('\n=== Lesson Details ===\n');

    if (!course.lessons || course.lessons.length === 0) {
      console.log('❌ NO LESSONS found in this course!');
      return;
    }

    course.lessons.forEach((lesson, index) => {
      const contentLength = lesson.content?.length || 0;
      const hasContent = contentLength > 500;
      const status = hasContent ? '✅' : '❌';
      
      console.log(`${status} Lesson ${index + 1}: ${lesson.title}`);
      console.log(`   ID: ${lesson.lessonId}`);
      console.log(`   Content Length: ${contentLength} chars`);
      if (contentLength > 0 && contentLength < 500) {
        console.log(`   ⚠️  WARNING: Content too short (placeholder?)`);
        console.log(`   Content: ${lesson.content.substring(0, 100)}...`);
      }
      console.log('');
    });

    // Summary
    const lessonsWithContent = course.lessons.filter(l => l.content?.length > 500).length;
    const lessonsWithoutContent = course.lessons.length - lessonsWithContent;

    console.log('\n=== SUMMARY ===');
    console.log(`Total Lessons: ${course.lessons.length}`);
    console.log(`✅ With Content (>500 chars): ${lessonsWithContent}`);
    console.log(`❌ Without Content: ${lessonsWithoutContent}`);
    console.log(`Published: ${course.published ? 'YES' : 'NO'}`);

    if (!course.published) {
      console.log('\n⚠️  ISSUE: Course is NOT PUBLISHED - it won\'t be visible on website!');
    }

    if (lessonsWithoutContent > 0) {
      console.log(`\n⚠️  ISSUE: ${lessonsWithoutContent} lessons have no content or placeholder content`);
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

checkFoundationsContent();
