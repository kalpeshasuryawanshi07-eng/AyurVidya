const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        // Slug format: lowercase, alphanumeric with hyphens, no spaces
        return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v);
      },
      message: props => `${props.value} is not a valid slug format`
    }
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  titleMr: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  descriptionMr: {
    type: String,
    trim: true
  },
  icon: {
    type: String,
    trim: true
  },
  colorHex: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        // Validate hex color format (#RRGGBB or #RGB)
        return !v || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v);
      },
      message: props => `${props.value} is not a valid hex color`
    }
  },
  year: {
    type: Number,
    min: [1, 'Year must be between 1 and 5'],
    max: [5, 'Year must be between 1 and 5']
  },
  orderIndex: {
    type: Number,
    required: [true, 'Order index is required']
  },
  topicCount: {
    type: Number,
    default: 0,
    min: [0, 'Topic count cannot be negative']
  }
}, {
  timestamps: true
});

// Create indexes
subjectSchema.index({ slug: 1 }, { unique: true });
subjectSchema.index({ orderIndex: 1 });
subjectSchema.index({ year: 1 });

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
