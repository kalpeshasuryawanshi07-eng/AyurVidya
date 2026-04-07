const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User ID is required'],
    ref: 'User'
  },
  topicSlug: {
    type: String,
    required: [true, 'Topic slug is required'],
    lowercase: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: true
  },
  completedAt: {
    type: Date,
    default: Date.now
  },
  timeSpent: {
    type: Number,
    default: 0,
    min: [0, 'Time spent cannot be negative']
  }
}, {
  timestamps: true
});

// Create compound unique index on userId + topicSlug
progressSchema.index({ userId: 1, topicSlug: 1 }, { unique: true });

// Create index on userId + completedAt for streak calculation
progressSchema.index({ userId: 1, completedAt: 1 });

// Create index on userId for general queries
progressSchema.index({ userId: 1 });

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
