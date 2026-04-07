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

const exportNadiToJSON = async () => {
  try {
    await connectDB();

    const course = await Course.findOne({ slug: 'nadi-pariksha-clinical-diagnosis' });
    
    if (!course) {
      console.error('Nadi Pariksha course not found!');
      process.exit(1);
    }

    console.log('Course found:', course.title);
    console.log('Total lessons:', course.lessons.length);
    
    // Create the JSON structure
    const exportData = {
      course_title: course.title,
      course_slug: course.slug,
      description: course.description,
      level: course.level,
      duration: course.duration,
      price: course.price,
      instructor: course.instructor,
      total_lessons: course.lessons.length,
      lessons: course.lessons.map((lesson, index) => ({
        lesson_number: index + 1,
        lesson_id: lesson.lessonId,
        title: lesson.title,
        duration: lesson.duration,
        content: lesson.content,
        content_length: lesson.content.length
      }))
    };
    
    // Save the complete export to a new file
    const exportFilePath = path.join(__dirname, '../seed/nadi_pariksha_complete_export.json');
    fs.writeFileSync(exportFilePath, JSON.stringify(exportData, null, 2));
    
    console.log(`\n✓ Exported ${course.lessons.length} lessons to: ${exportFilePath}`);
    
    // Read existing JSON file if it exists and append
    const jsonFilePath = path.join(__dirname, '../seed/nadi_pariksha_clinical_diagnosis.json');
    
    if (fs.existsSync(jsonFilePath)) {
      console.log('\nExisting JSON file found - appending MongoDB lessons...');
      const fileContent = fs.readFileSync(jsonFilePath, 'utf8');
      const existingData = JSON.parse(fileContent);
      
      // Count existing topics
      let existingTopicCount = 0;
      if (existingData.modules && Array.isArray(existingData.modules)) {
        existingTopicCount = existingData.modules.reduce((sum, module) => {
          return sum + (module.topics ? module.topics.length : 0);
        }, 0);
      }
      console.log(`Existing file has ${existingTopicCount} topics in ${existingData.modules?.length || 0} modules`);
      
      // Create a new module with MongoDB exported lessons
      const mongoDBModule = {
        module_title: "MongoDB Exported Lessons (Current Database Content)",
        topics: exportData.lessons.map(lesson => ({
          topic_name: lesson.title,
          lesson_id: lesson.lesson_id,
          duration: lesson.duration,
          content: lesson.content,
          content_length: lesson.content_length,
          source: 'mongodb_export',
          exported_at: new Date().toISOString()
        }))
      };
      
      // Append the new module
      if (!existingData.modules) {
        existingData.modules = [];
      }
      existingData.modules.push(mongoDBModule);
      
      // Update course metadata
      existingData.last_updated = new Date().toISOString();
      existingData.total_lessons = course.lessons.length;
      existingData.duration = course.duration;
      
      fs.writeFileSync(jsonFilePath, JSON.stringify(existingData, null, 2));
      console.log(`✓ Appended ${exportData.lessons.length} lessons as new module to: ${jsonFilePath}`);
      console.log(`  Total modules in file now: ${existingData.modules.length}`);
    } else {
      // Create new file with just the export
      fs.writeFileSync(jsonFilePath, JSON.stringify(exportData, null, 2));
      console.log(`✓ Created new file: ${jsonFilePath}`);
    }
    
    // Print summary
    console.log('\n=== EXPORT SUMMARY ===');
    console.log(`Course: ${course.title}`);
    console.log(`Lessons exported: ${course.lessons.length}`);
    console.log(`\nLesson details:`);
    exportData.lessons.forEach(lesson => {
      console.log(`  ${lesson.lesson_number}. ${lesson.title} (${lesson.lesson_id}) - ${lesson.content_length} chars`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

exportNadiToJSON();
