require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Course = require('../../models/Course');
const fs = require('fs');
const path = require('path');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const exportAllCourses = async () => {
  try {
    await connectDB();

    // Get all courses
    const courses = await Course.find({});
    
    console.log(`Found ${courses.length} courses in database\n`);
    
    const exportDir = path.join(__dirname, '../seed/exports');
    
    // Create exports directory if it doesn't exist
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
      console.log('Created exports directory\n');
    }
    
    let totalExported = 0;
    
    for (const course of courses) {
      console.log(`\n=== Exporting: ${course.title} ===`);
      console.log(`Slug: ${course.slug}`);
      console.log(`Lessons: ${course.lessons.length}`);
      
      // Create the JSON structure
      const exportData = {
        course_title: course.title,
        course_slug: course.slug,
        description: course.description,
        level: course.level,
        duration: course.duration,
        price: course.price,
        instructor: course.instructor,
        category: course.category,
        tags: course.tags,
        thumbnail: course.thumbnail,
        total_lessons: course.lessons.length,
        exported_at: new Date().toISOString(),
        lessons: course.lessons.map((lesson, index) => ({
          lesson_number: index + 1,
          lesson_id: lesson.lessonId,
          title: lesson.title,
          duration: lesson.duration,
          content: lesson.content,
          content_length: lesson.content.length,
          video_url: lesson.videoUrl,
          order: lesson.order
        }))
      };
      
      // Save to file
      const filename = `${course.slug}_export.json`;
      const filepath = path.join(exportDir, filename);
      fs.writeFileSync(filepath, JSON.stringify(exportData, null, 2));
      
      console.log(`✓ Exported to: ${filename}`);
      console.log(`  Total content: ${exportData.lessons.reduce((sum, l) => sum + l.content_length, 0)} characters`);
      
      totalExported++;
    }
    
    // Create a summary file
    const summary = {
      export_date: new Date().toISOString(),
      total_courses_exported: totalExported,
      courses: courses.map(c => ({
        title: c.title,
        slug: c.slug,
        lessons: c.lessons.length,
        level: c.level,
        filename: `${c.slug}_export.json`
      }))
    };
    
    const summaryPath = path.join(exportDir, '_export_summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    
    console.log(`\n\n=== EXPORT COMPLETE ===`);
    console.log(`Total courses exported: ${totalExported}`);
    console.log(`Export directory: ${exportDir}`);
    console.log(`Summary file: _export_summary.json`);
    
    console.log(`\nExported files:`);
    courses.forEach(c => {
      console.log(`  - ${c.slug}_export.json (${c.lessons.length} lessons)`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

exportAllCourses();
