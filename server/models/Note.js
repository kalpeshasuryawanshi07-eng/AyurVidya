const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
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
  content: {
    type: String,
    required: [true, 'Note content is required'],
    maxlength: [10000, 'Note content cannot exceed 10000 characters']
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create compound unique index on userId + topicSlug
noteSchema.index({ userId: 1, topicSlug: 1 }, { unique: true });

// Create index on userId for general queries
noteSchema.index({ userId: 1 });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
