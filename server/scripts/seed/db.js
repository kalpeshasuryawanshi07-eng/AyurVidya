const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

async function connect() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurveda-learning';
  await mongoose.connect(uri);
  console.log(`[seed] Connected to MongoDB: ${uri}`);
}

async function disconnect() {
  await mongoose.connection.close();
  console.log('[seed] MongoDB connection closed');
}

module.exports = {
  connect,
  disconnect
};
