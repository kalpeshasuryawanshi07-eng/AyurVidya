const fs = require('fs');
const path = require('path');

const seedDir = path.join(__dirname, '../seed');

// Files to KEEP (essential for seeding database)
const filesToKeep = [
  'README.md',
  'seedCourses.js',
  'seedHerbs.js',
  'seedSubjects.js',
  'seedTopics.js',
  'seedAdmin.js',
  'index.js',
  'db.js',
  'seedAllCoursesWithContent.js',
  // JSON data files (source of truth)
  'foundations_of_ayurveda.json',
  'dravyaguna_vigyan_mastery.json',
  'nadi_pariksha_clinical_diagnosis.json',
  // Supporting data files
  'subjectContentData.js',
  'topicListData.js',
  'knowledgeEngine.js',
  'quizGenerator.js',
  'batch_update_herbs.js'
];

// Files to DELETE (temporary/one-time scripts that have already been executed)
const filesToDelete = [
  'addNadiLessons13to20.js',
  'addRemainingNadiContent.js',
  'completeAllNadiLessons.js',
  'finalNadiContentUpdate.js',
  'keepOnly15Lessons.js',
  'loadFoundationsContent.js',
  'loadNadiParikshaContent.js',
  'nadi_lessons_16_to_38_template.json',
  'nadi_pariksha_complete_export.json',
  'replaceDravyagunaContent.js',
  'replaceNadiContent.js',
  'updateLesson15.js'
];

console.log('=== SEED FOLDER CLEANUP ===\n');

console.log('Files to KEEP (essential):');
filesToKeep.forEach(file => {
  const filepath = path.join(seedDir, file);
  if (fs.existsSync(filepath)) {
    console.log(`  ✓ ${file}`);
  } else {
    console.log(`  ✗ ${file} (not found)`);
  }
});

console.log('\nFiles to DELETE (temporary/already executed):');
let deletedCount = 0;
filesToDelete.forEach(file => {
  const filepath = path.join(seedDir, file);
  if (fs.existsSync(filepath)) {
    try {
      fs.unlinkSync(filepath);
      console.log(`  ✓ Deleted: ${file}`);
      deletedCount++;
    } catch (error) {
      console.log(`  ✗ Failed to delete: ${file} - ${error.message}`);
    }
  } else {
    console.log(`  - ${file} (already deleted)`);
  }
});

console.log(`\n=== CLEANUP COMPLETE ===`);
console.log(`Deleted ${deletedCount} unnecessary files`);
console.log(`\nThe exports/ folder has been kept for backup purposes.`);
console.log(`You can manually delete it if you don't need the exported JSON backups.`);
