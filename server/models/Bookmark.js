const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false
});

// Create compound unique index on userId + topicSlug
bookmarkSchema.index({ userId: 1, topicSlug: 1 }, { unique: true });

// Create index on userId for general queries
bookmarkSchema.index({ userId: 1 });

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;
