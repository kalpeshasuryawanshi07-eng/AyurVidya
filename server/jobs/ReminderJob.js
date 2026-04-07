const cron = require('node-cron');
const User = require('../models/User');
const Course = require('../models/Course'); // To get some topic data for tips
const EmailService = require('../services/EmailService');

const startReminderJob = () => {
  // Run every morning at 8:00 AM
  cron.schedule('0 8 * * *', async () => {
    console.log('Running daily learning reminder job...');
    
    try {
      const verifiedUsers = await User.find({ isVerified: true });
      
      const tips = [
        "Did you know? Brahmi is excellent for memory and cognitive function.",
        "Ashwagandha helps the body manage stress and improves vitality.",
        "Triphala is a classic formula for digestive health and detoxification.",
        "Practice 'Dinacharya' (daily routine) to maintain balance of Doshas.",
        "Sipping warm water throughout the day helps clear 'Ama' (toxins)."
      ];

      for (const user of verifiedUsers) {
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        try {
          await EmailService.sendDailyReminder(user.name, user.email, randomTip);
        } catch (err) {
          console.error(`Failed to send reminder to ${user.email}:`, err);
        }
      }
      
      console.log(`Reminder job completed. Sent to ${verifiedUsers.length} users.`);
    } catch (error) {
      console.error('Error in daily reminder job:', error);
    }
  });
};

module.exports = { startReminderJob };
