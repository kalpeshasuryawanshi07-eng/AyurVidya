const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../../../');

// Unnecessary documentation/summary files to delete
const filesToDelete = [
  'FOUNDATIONS_COURSE_LOADED.md',
  'NADI_PARIKSHA_CONTENT_UPDATE.md',
  'FOUNDATIONS_COMPLETE.md',
  'CERTIFICATE_BUTTON_ADDED.md',
  'COURSE_LESSONS_DEBUG.md',
  'PROGRESS_AND_CERTIFICATE_SUMMARY.md',
  'CERTIFICATE_AND_PROGRESS_TRACKING.md',
  'CERTIFICATE_USER_NAME_FIX.md',
  'DASHBOARD_CERTIFICATES_ADDED.md',
  'CERTIFICATE_VIEW_FIX.md',
  'WEBSITE_STATUS_REPORT.md',
  'CLEANUP_AND_FIX_REPORT.md'
];

console.log('=== REMOVING UNNECESSARY DOCUMENTATION FILES ===\n');

let deletedCount = 0;
let notFoundCount = 0;

filesToDelete.forEach(file => {
  const filepath = path.join(rootDir, file);
  if (fs.existsSync(filepath)) {
    try {
      fs.unlinkSync(filepath);
      console.log(`✓ Deleted: ${file}`);
      deletedCount++;
    } catch (error) {
      console.log(`✗ Failed to delete: ${file} - ${error.message}`);
    }
  } else {
    console.log(`- Not found: ${file}`);
    notFoundCount++;
  }
});

console.log(`\n=== CLEANUP COMPLETE ===`);
console.log(`Deleted: ${deletedCount} files`);
console.log(`Not found: ${notFoundCount} files`);
console.log(`\nAll temporary summary and documentation files have been removed.`);
