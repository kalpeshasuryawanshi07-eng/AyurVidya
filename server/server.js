const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/env');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');
const sanitizeRequest = require('./middleware/sanitize');
const { startReminderJob } = require('./jobs/ReminderJob');

// Initialize Express app
const app = express();

// Connect to database before starting server
const startServer = async () => {
  try {
    // Initialize database connection
    await connectDB();

    // Middleware
    app.use(helmet());
    
    // CORS configuration - allow multiple origins
    const allowedOrigins = [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://ayurvidya.in',
      'https://www.ayurvidya.in',
      'https://Ayur-Vidya.in',
      'https://www.Ayur-Vidya.in',
      'https://ayur-vidya-3wbybo5v1-kalpeshasuryawanshi07-7026s-projects.vercel.app',
      'https://ayur-vidya-8iw0yfvlo-kalpeshasuryawanshi07-7026s-projects.vercel.app',
      config.corsOrigin // Also allow environment variable
    ].filter(Boolean);

    app.use(cors({
      origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Check if origin is in allowed list or matches Vercel pattern
        if (allowedOrigins.includes(origin) || origin.includes('vercel.app')) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
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

    // Serve static assets in production
    if (config.nodeEnv === 'production') {
      const path = require('path');
      const clientBuildPath = path.join(__dirname, '../client/build');
      
      app.use(express.static(clientBuildPath));
      
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(clientBuildPath, 'index.html'));
      });
      
      console.log('✓ Serving static files from:', clientBuildPath);
    }

    // Error handling middleware (must be last)
    app.use(errorHandler);

    // Start server
    const PORT = config.port;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✓ Server is running on port ${PORT}`);
      console.log(`✓ CORS enabled for all Vercel deployments and configured origins`);

      // Initialize Cron Jobs
      startReminderJob();
      console.log(`✓ Daily learning reminders scheduled at 8:00 AM daily`);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Start the server
startServer();

module.exports = app;
