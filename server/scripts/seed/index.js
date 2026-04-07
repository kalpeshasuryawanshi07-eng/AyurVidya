const { seedSubjects } = require('./seedSubjects');
const { seedTopics, generateAllTopics } = require('./seedTopics');
const { seedHerbs } = require('./seedHerbs');
const { seedAdmin } = require('./seedAdmin');
const { seedCourses } = require('./seedCourses');

async function seedAll() {
  console.log('[seed] Starting full database seed...');
  console.log(`[seed] Planned topic count: ${generateAllTopics().length}`);

  await seedSubjects();
  await seedTopics();
  await seedHerbs();
  await seedAdmin();
  await seedCourses();

  console.log('[seed] Full database seed completed');
}

if (require.main === module) {
  seedAll()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('[seed] Seeding failed:', error);
      process.exit(1);
    });
}

module.exports = {
  seedAll
};
