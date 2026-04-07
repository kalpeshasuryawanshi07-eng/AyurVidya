const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
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
  score: {
    type: Number,
    required: [true, 'Score is required'],
    min: [0, 'Score cannot be negative'],
    max: [100, 'Score cannot exceed 100']
  },
  totalQuestions: {
    type: Number,
    required: [true, 'Total questions is required'],
    min: [1, 'Total questions must be at least 1']
  },
  correctAnswers: {
    type: Number,
    required: [true, 'Correct answers count is required'],
    min: [0, 'Correct answers cannot be negative']
  },
  answers: [{
    questionId: {
      type: String,
      required: true
    },
    selectedOption: {
      type: Number,
      required: true
    },
    correct: {
      type: Boolean,
      required: true
    }
  }],
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create index on userId for general queries
quizResultSchema.index({ userId: 1 });

// Create index on topicSlug for topic-specific queries
quizResultSchema.index({ topicSlug: 1 });

// Create compound index on userId + submittedAt for user history queries
quizResultSchema.index({ userId: 1, submittedAt: 1 });

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

module.exports = QuizResult;
