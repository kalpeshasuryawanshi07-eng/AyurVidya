const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Topic = require('./models/Topic');

dotenv.config();

async function verifyQuizzes() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurveda-learning';
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
    
    // Check for topics with fewer than 5 questions
    const insufficientQuizzes = await Topic.find({ "quizQuestions.4": { "$exists": false } });
    
    if (insufficientQuizzes.length === 0) {
      console.log('SUCCESS: All topics have 5 or more quiz questions.');
    } else {
      console.log(`FAILURE: ${insufficientQuizzes.length} topics have fewer than 5 questions.`);
    }
    
    // Check a sample of topics for uniqueness and relevance
    const sampleTopics = await Topic.find().limit(5);
    console.log('\n--- Sample Topic Quiz Check ---');
    sampleTopics.forEach(topic => {
      console.log(`\nTopic: ${topic.title} (${topic.slug})`);
      console.log(`Questions: ${topic.quizQuestions.length}`);
      topic.quizQuestions.slice(0, 2).forEach((q, i) => {
        console.log(`  Q${i+1}: ${q.question}`);
      });
    });
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error verifying quizzes:', error);
  }
}

verifyQuizzes();
