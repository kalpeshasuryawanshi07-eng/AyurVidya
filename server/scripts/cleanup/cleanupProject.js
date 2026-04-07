const fs = require('fs');
const path = require('path');

console.log('=== PROJECT CLEANUP ===\n');

// Files to delete
const filesToDelete = [
  // Temporary seed files
  'server/scripts/seed/checkAdmin.js',
  'server/scripts/seed/checkDatabaseContent.js',
  'server/scripts/seed/checkFoundationsContent.js',
  'server/scripts/seed/checkLessonIds.js',
  'server/scripts/seed/checkNadiParikshaContent.js',
  'server/scripts/seed/check_api.js',
  'server/scripts/seed/fixRemainingLessons.js',
  'server/scripts/seed/fix_batch_3_final.js',
  'server/scripts/seed/fix_double_brace.js',
  'server/scripts/seed/fix_seed.js',
  'server/scripts/seed/foundationsLessons17to28.js',
  'server/scripts/seed/foundationsLessons7to16.js',
  'server/scripts/seed/nadiParikshaLessons13to28.js',
  'server/scripts/seed/nadiParikshaLessons16to24.js',
  'server/scripts/seed/nadiParikshaLessons1to12.js',
  'server/scripts/seed/nadiParikshaLessons22to24.js',
  'server/scripts/seed/nadiParikshaLessons25to38.js',
  'server/scripts/seed/nadiParikshaLessons5to12.js',
  'server/scripts/seed/nadiParikshaLessons9to12.js',
  'server/scripts/seed/nadiParikshaLessons9to20.js',
  'server/scripts/seed/reconstruct_batch_2.js',
  'server/scripts/seed/reconstruct_batch_3_p1.js',
  'server/scripts/seed/reconstruct_batch_3_p2.js',
  'server/scripts/seed/reconstruct_full.js',
  'server/scripts/seed/reconstruct_seed_final.js',
  'server/scripts/seed/restore_database_academic.js',
  'server/scripts/seed/restore_database_final.js',
  'server/scripts/seed/testAdminLogin.js',
  'server/scripts/seed/updateNadiParikshaBatch1.js',
  'server/scripts/seed/verifyAllCourses.js',
  'server/scripts/seed/verifyCourses.js',
  'server/scripts/seed/verifyDravyaguna.js',
  'server/scripts/seed/verifyOneCourse.js',
  'server/scripts/seed/verifyUniqueLessons.js',
  'server/scripts/seed/addMissingLesson.js',
  'server/scripts/seed/cleanupNadiPariksha.js',
  'server/scripts/seed/completeFoundationsContent.js',
  'server/scripts/seed/completeNadiParikshaContent.js',
  'server/scripts/seed/seedCoursesWithContent.js',
  'server/scripts/seed/seedDietLifestyleWithContent.js',
  'server/scripts/seed/seedDravyagunaWithContent.js',
  'server/scripts/seed/updateFoundationsComplete.js',
  'server/scripts/seed/updateFoundationsLessons2to6.js',
  'server/scripts/seed/updateFoundationsLessons7to16.js',
  'server/scripts/seed/updateFoundationsLessons17to28.js',
  'server/scripts/seed/updateNadiParikshaComplete.js',
  'server/scripts/seed/updateNadiParikshaLessons1to15.js',
  
  // Documentation files
  'server/ALL_COURSES_SEEDED_SUMMARY.md',
  'server/AUTHENTICATION_CHECKPOINT_REPORT.md',
  'server/BACKEND_API_CHECKPOINT_REPORT.md',
  'server/FOUNDATIONS_COMPLETE_SUMMARY.md',
  'server/NADI_PARIKSHA_BATCH1_SUMMARY.md',
  'server/NADI_PARIKSHA_COMPLETE.md',
  'server/NADI_PARIKSHA_COMPLETE_SUMMARY.md',
  'server/NADI_PARIKSHA_FINAL_SUMMARY.md',
  'server/NADI_PARIKSHA_SESSION_COMPLETE.md',
  'server/NADI_PARIKSHA_SESSION_SUMMARY.md',
  'server/SESSION_COMPLETE_SUMMARY.md'
];

let deletedCount = 0;
let notFoundCount = 0;

console.log('Deleting files...\n');

filesToDelete.forEach(file => {
  const filePath = path.join(__dirname, '../..', '..', file);
  
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`✓ Deleted: ${file}`);
      deletedCount++;
    } else {
      console.log(`⊘ Not found: ${file}`);
      notFoundCount++;
    }
  } catch (error) {
    console.log(`✗ Error deleting ${file}:`, error.message);
  }
});

console.log('\n=== CLEANUP COMPLETE ===');
console.log(`Deleted: ${deletedCount} files`);
console.log(`Not found: ${notFoundCount} files`);
console.log(`\nEssential files preserved:`);
console.log('  ✓ seedAdmin.js');
console.log('  ✓ seedCourses.js');
console.log('  ✓ seedHerbs.js');
console.log('  ✓ seedSubjects.js');
console.log('  ✓ seedTopics.js');
console.log('  ✓ seedAllCoursesWithContent.js');
console.log('  ✓ index.js');
console.log('  ✓ db.js');
