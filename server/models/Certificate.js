const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course ID is required']
  },
  certificateNumber: {
    type: String,
    required: [true, 'Certificate number is required'],
    unique: true
  },
  issuedAt: {
    type: Date,
    default: Date.now
  },
  completionDate: {
    type: Date,
    required: [true, 'Completion date is required']
  },
  grade: {
    type: String,
    enum: ['A+', 'A', 'B+', 'B', 'C', 'Pass'],
    default: 'Pass'
  },
  score: {
    type: Number,
    min: 0,
    max: 100
  },
  verificationCode: {
    type: String,
    required: [true, 'Verification code is required'],
    unique: true
  }
}, {
  timestamps: true
});

// Create compound unique index on userId and courseId
certificateSchema.index({ userId: 1, courseId: 1 }, { unique: true });
certificateSchema.index({ userId: 1 });

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
