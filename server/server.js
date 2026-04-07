const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/env');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');
const sanitizeRequest = require('./middleware/sanitize');

// Initialize Express app
const app = express();

// Connect to database before starting server
const startServer = async () => {
  try {
    // Initialize database connection
    await connectDB();

    // Middleware
    app.use(helmet());
    app.use(cors({
      origin: config.corsOrigin,
      credentials: true,
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));
    app.use(rateLimiter);
    app.use(sanitizeRequest);

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({ 
        status: 'ok', 
        message: 'Server is running',
        database: 'connected',
        environment: config.nodeEnv
      });
    });

    // API routes
    const authRoutes = require('./routes/auth');
    const topicsRoutes = require('./routes/topics');
    const subjectsRoutes = require('./routes/subjects');
    const progressRoutes = require('./routes/progress');
    const bookmarksRoutes = require('./routes/bookmarks');
    const notesRoutes = require('./routes/notes');
    const quizRoutes = require('./routes/quiz');
    const herbsRoutes = require('./routes/herbs');
    const coursesRoutes = require('./routes/courses');
    const paymentRoutes = require('./routes/payment');
    const adminRoutes = require('./routes/admin');
    const searchRoutes = require('./routes/search');
    const certificatesRoutes = require('./routes/certificates');
    
    app.use('/api/auth', authRoutes);
    app.use('/api/topics', topicsRoutes);
    app.use('/api/subjects', subjectsRoutes);
    app.use('/api/progress', progressRoutes);
    app.use('/api/bookmarks', bookmarksRoutes);
    app.use('/api/notes', notesRoutes);
    app.use('/api', quizRoutes);
    app.use('/api/herbs', herbsRoutes);
    app.use('/api/courses', coursesRoutes);
    app.use('/api/payment', paymentRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/search', searchRoutes);
    app.use('/api/certificates', certificatesRoutes);

    // Error handling middleware (must be last)
    app.use(errorHandler);

    // Start server
    const PORT = config.port;
    app.listen(PORT, () => {
      console.log(`✓ Server running in ${config.nodeEnv} mode on port ${PORT}`);
      console.log(`✓ CORS enabled for: ${config.corsOrigin}`);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Start the server
startServer();

module.exports = app;
