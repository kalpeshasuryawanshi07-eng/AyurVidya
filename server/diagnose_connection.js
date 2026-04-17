const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Explicitly load .env from the current directory
dotenv.config({ path: path.join(__dirname, '.env') });

async function diagnose() {
  console.log('--- DATABASE DIAGNOSTIC ---');
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('❌ MONGODB_URI is MISSING in .env');
    process.exit(1);
  }

  console.log('Checking URI pattern...');
  if (uri.startsWith('mongodb+srv://')) {
    console.log('✅ URI appears to be a MongoDB ATLAS connection string.');
  } else if (uri.startsWith('mongodb://localhost') || uri.startsWith('mongodb://127.0.0.1')) {
    console.warn('⚠️ URI appears to be a LOCAL MongoDB connection string.');
  } else {
    console.log('ℹ️ URI is using a standard connection format.');
  }

  try {
    console.log('Attempting to connect...');
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`✅ Connected successfully!`);
    console.log(`📡 Host: ${conn.connection.host}`);
    console.log(`🗄️ Database Name: ${conn.connection.name}`);
    
    // Check if it's Atlas or Local
    if (conn.connection.host.includes('mongodb.net')) {
      console.log('🚀 RESULT: You ARE connected to MongoDB ATLAS.');
    } else {
      console.log('🏠 RESULT: You are connected to a LOCAL database.');
    }

  } catch (err) {
    console.error(`❌ Connection Failed: ${err.message}`);
  } finally {
    await mongoose.connection.close();
    console.log('---------------------------');
  }
}

diagnose();
