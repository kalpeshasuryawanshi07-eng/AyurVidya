const mongoose = require('mongoose');
const config = require('./env');

/**
 * Connect to MongoDB database
 * Implements connection error handling, event listeners, and proper logging
 */
const connectDB = async () => {
  try {
    // Connection options
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30s for Atlas cold starts
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    };

    // Connect to MongoDB
    const conn = await mongoose.connect(config.mongodbUri, options);

    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    console.log(`✓ Database: ${conn.connection.name}`);
    console.log(`✓ Environment: ${config.nodeEnv}`);

    // Connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connection established');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB connection disconnected');
    });

    // Handle application termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to application termination');
      process.exit(0);
    });

    return conn;
  } catch (error) {
    console.error('✗ MongoDB Connection Failed');
    console.error(`Error: ${error.message}`);
    
    // Log additional error details in development
    if (config.nodeEnv === 'development') {
      console.error('Stack trace:', error.stack);
    }
    
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
