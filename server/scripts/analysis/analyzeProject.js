const fs = require('fs');
const path = require('path');

console.log('=== PROJECT ANALYSIS ===\n');

// 1. Check for useless/temporary seed files
console.log('1. TEMPORARY/USELESS SEED FILES:\n');

const seedDir = path.join(__dirname, '../seed');
const seedFiles = fs.readdirSync(seedDir);

const temporaryPatterns = [
  /nadiParikshaLessons\d+to\d+\.js$/,
  /foundationsLessons\d+to\d+\.js$/,
  /updateFoundationsLessons\d+to\d+\.js$/,
  /updateNadiParikshaBatch\d+\.js$/,
  /fix.*\.js$/,
  /reconstruct.*\.js$/,
  /restore.*\.js$/,
  /check.*\.js$/,
  /verify.*\.js$/,
  /test.*\.js$/
];

const uselessFiles = [];
seedFiles.forEach(file => {
  if (temporaryPatterns.some(pattern => pattern.test(file))) {
    uselessFiles.push(path.join('server/scripts/seed', file));
  }
});

console.log('Files that can be deleted:');
uselessFiles.forEach(file => console.log(`  - ${file}`));

// 2. Check for documentation files
console.log('\n2. DOCUMENTATION/SUMMARY FILES:\n');

const serverDir = path.join(__dirname, '../..');
const serverFiles = fs.readdirSync(serverDir);

const docFiles = serverFiles.filter(file => 
  file.endsWith('.md') && 
  !file.includes('README') &&
  (file.includes('SUMMARY') || file.includes('CHECKPOINT') || file.includes('COMPLETE') || file.includes('SESSION'))
);

console.log('Documentation files (can be archived):');
docFiles.forEach(file => console.log(`  - server/${file}`));

// 3. List essential seed files to keep
console.log('\n3. ESSENTIAL SEED FILES TO KEEP:\n');

const essentialFiles = [
  'server/scripts/seed/seedAdmin.js',
  'server/scripts/seed/seedCourses.js',
  'server/scripts/seed/seedHerbs.js',
  'server/scripts/seed/seedSubjects.js',
  'server/scripts/seed/seedTopics.js',
  'server/scripts/seed/seedAllCoursesWithContent.js',
  'server/scripts/seed/index.js',
  'server/scripts/seed/db.js',
  'server/scripts/seed/README.md'
];

console.log('Keep these files:');
essentialFiles.forEach(file => console.log(`  ✓ ${file}`));

console.log('\n=== ANALYSIS COMPLETE ===');
console.log(`\nTotal useless files: ${uselessFiles.length}`);
console.log(`Total doc files: ${docFiles.length}`);
console.log(`Total to keep: ${essentialFiles.length}`);
