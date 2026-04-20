const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
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
      'https://localhost:3000',
      'https://127.0.0.1:3000',
      'https://ayurvidya.in',
      'https://www.ayurvidya.in',
      'https://ayur-vidya.in',
      'https://www.ayur-vidya.in',
      'https://api.ayur-vidya.in',
      'https://Ayur-Vidya.in',
      'https://www.Ayur-Vidya.in',
      config.corsOrigin
    ].map(o => o?.toLowerCase()).filter(Boolean);

    app.use(cors({
      origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps)
        if (!origin) return callback(null, true);
        
        const lowerOrigin = origin.toLowerCase();
        
        // Allow anything from ayur-vidya.in, ayurvidya.in, or vercel.app
        const isAllowed = allowedOrigins.includes(lowerOrigin) || 
                         lowerOrigin.includes('ayur-vidya.in') || 
                         lowerOrigin.includes('ayurvidya.in') || 
                         lowerOrigin.includes('vercel.app') ||
                         lowerOrigin.includes('localhost');

        if (isAllowed) {
          callback(null, true);
        } else {
          console.error(`CORS Blocked for origin: ${origin}`);
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"]
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));
    app.use(rateLimiter);
    app.use(sanitizeRequest);

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.status(200).json({ 
        status: 'ok', 
        uptime: process.uptime(),
        message: 'Server is running',
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

    // 404 handler for unknown routes (replaces static serving)
    app.use((req, res) => {
      res.status(404).json({ error: "Route not found" });
    });

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
