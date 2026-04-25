const mongoose = require('mongoose');

const shlokaSchema = new mongoose.Schema({
  devanagari: {
    type: String,
    trim: true
  },
  transliteration: {
    type: String,
    trim: true
  },
  translation: {
    type: String,
    trim: true
  },
  translationMr: {
    type: String,
    trim: true
  },
  source: {
    type: String,
    trim: true
  }
}, { _id: false });

const topicSchema = new mongoose.Schema({
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
  subjectSlug: {
    type: String,
    required: [true, 'Subject slug is required'],
    lowercase: true,
    trim: true
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
  difficulty: {
    type: String,
    enum: {
      values: ['beginner', 'intermediate', 'advanced'],
      message: '{VALUE} is not a valid difficulty level'
    }
  },
  estimatedMins: {
    type: Number,
    required: [true, 'Estimated minutes is required'],
    min: [1, 'Estimated minutes must be at least 1']
  },
  orderIndex: {
    type: Number,
    required: [true, 'Order index is required']
  },
  
  // Content fields (English)
  introduction: {
    type: String,
    required: [true, 'Introduction is required'],
    trim: true,
    minlength: [100, 'Introduction must be at least 100 characters']
  },
  historicalContext: {
    type: String,
    required: [true, 'Historical context is required'],
    trim: true
  },
  coreExplanation: {
    type: String,
    required: [true, 'Core explanation is required'],
    trim: true
  },
  clinicalApplications: {
    type: String,
    required: [true, 'Clinical applications is required'],
    trim: true
  },
  modernComparison: {
    type: String,
    required: [true, 'Modern comparison is required'],
    trim: true
  },
  summary: {
    type: [String],
    default: []
  },
  furtherReading: {
    type: [String],
    default: []
  },
  
  // Content fields (Marathi)
  introductionMr: {
    type: String,
    trim: true
  },
  historicalContextMr: {
    type: String,
    trim: true
  },
  coreExplanationMr: {
    type: String,
    trim: true
  },
  clinicalApplicationsMr: {
    type: String,
    trim: true
  },
  modernComparisonMr: {
    type: String,
    trim: true
  },
  summaryMr: {
    type: [String],
    default: []
  },
  furtherReadingMr: {
    type: [String],
    default: []
  },
  
  // Shloka subdocument
  shloka: {
    type: shlokaSchema,
    default: null
  },
  
  // Quiz questions
  quizQuestions: [{
    questionId: {
      type: String,
      required: true
    },
    question: {
      type: String,
      required: true,
      trim: true
    },
    questionMr: {
      type: String,
      trim: true
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: function(v) {
          return Array.isArray(v) && v.length === 4;
        },
        message: 'Quiz question must have exactly 4 options'
      }
    },
    optionsMr: {
      type: [String],
      validate: {
        validator: function(v) {
          return !v || (Array.isArray(v) && v.length === 4);
        },
        message: 'Marathi options must have exactly 4 options if provided'
      }
    },
    correctOption: {
      type: Number,
      required: true,
      min: 0,
      max: 3
    }
  }],
  
  // Flashcards
  flashcards: [{
    front: {
      type: String,
      required: true,
      trim: true
    },
    frontMr: {
      type: String,
      trim: true
    },
    back: {
      type: String,
      required: true,
      trim: true
    },
    backMr: {
      type: String,
      trim: true
    }
  }],
  
  // Video support
  videoUrl: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Create indexes
topicSchema.index({ slug: 1 }, { unique: true });
topicSchema.index({ subjectSlug: 1 });
topicSchema.index({ difficulty: 1 });

// Create text index for search
topicSchema.index({
  title: 'text',
  introduction: 'text',
  coreExplanation: 'text'
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
