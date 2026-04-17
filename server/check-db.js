require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

async function test() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ayurveda-learning');
  
  // Find the first user
  const User = require('./models/User');
  const user = await User.findOne({});
  if(!user) {
    console.log("No user found");
    process.exit();
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'ayurvidya-super-secret-key-2026', { expiresIn: '1h' });
  
  const urls = [
    '/api/progress/me',
    '/api/progress/streak',
    '/api/bookmarks',
    '/api/courses/my',
    '/api/quiz/stats/me',
    '/api/certificates/my'
  ];

  for(let path of urls) {
    const res = await fetch(`http://localhost:5000${path}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log(`${path}: ${res.status}`);
    if(!res.ok) {
       console.log(await res.text());
    }
  }
  process.exit();
}
test();
