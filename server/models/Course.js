const mongoose = require('mongoose');

const PAYMENT_METHOD_VALUES = ['upi', 'card', 'netbanking', 'wallet', 'emi', 'paylater'];
const DEFAULT_PAYMENT_METHODS = ['upi', 'card', 'netbanking'];

const normalizePaymentMethods = (methods) => {
  if (!Array.isArray(methods)) return methods;

  return Array.from(
    new Set(
      methods
        .map((method) => String(method || '').trim().toLowerCase())
        .filter(Boolean)
    )
  );
};

const lessonSchema = new mongoose.Schema({
  lessonId: {
    type: String,
    required: [true, 'Lesson ID is required'],
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Lesson title is required'],
    trim: true
  },
  titleMr: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    trim: true
  },
  contentMr: {
    type: String,
    trim: true
  },
  isFree: {
    type: Boolean,
    default: false
  },
  videoUrl: {
    type: String,
    trim: true
  },
  duration: {
    type: Number,
    min: [1, 'Duration must be at least 1 minute']
  },
  orderIndex: {
    type: Number,
    required: [true, 'Order index is required']
  },
  topicSlug: {
    type: String,
    lowercase: true,
    trim: true
  }
}, { _id: false });

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Topic title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Topic description is required'],
    trim: true
  }
}, { _id: false });

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Module title is required'],
    trim: true
  },
  topics: {
    type: [topicSchema],
    default: []
  }
}, { _id: false });

const courseSchema = new mongoose.Schema({
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
  longDescription: {
    type: String,
    trim: true
  },
  level: {
    type: String,
    enum: {
      values: ['beginner', 'intermediate', 'advanced'],
      message: '{VALUE} is not a valid level'
    }
  },
  duration: {
    type: String,
    trim: true
  },
  totalLessons: {
    type: Number,
    default: 0,
    min: [0, 'Total lessons cannot be negative']
  },
  totalModules: {
    type: Number,
    default: 0,
    min: [0, 'Total modules cannot be negative']
  },
  students: {
    type: Number,
    default: 0,
    min: [0, 'Students count cannot be negative']
  },
  tags: {
    type: [String],
    default: []
  },
  lessons: {
    type: [lessonSchema],
    default: []
  },
  modules: {
    type: [moduleSchema],
    default: []
  },
  thumbnail: {
    type: String,
    default: '/images/course-placeholder.jpg'
  },
  language: {
    type: [String],
    default: ['English', 'Marathi']
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    default: 0,
    min: [0, 'Price cannot be negative']
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  isFree: {
    type: Boolean,
    default: function() {
      return !this.isPaid || this.price === 0;
    }
  },
  paymentMethods: {
    type: [String],
    enum: {
      values: PAYMENT_METHOD_VALUES,
      message: '{VALUE} is not a valid payment method'
    },
    default: function paymentMethodDefault() {
      return this.isPaid ? [...DEFAULT_PAYMENT_METHODS] : [];
    },
    set: normalizePaymentMethods
  },
  enrollmentCount: {
    type: Number,
    default: 0,
    min: [0, 'Enrollment count cannot be negative']
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5']
  }
}, {
  timestamps: true
});

courseSchema.pre('validate', function setPaymentMethods(next) {
  const isPaidCourse = this.isPaid && (this.price || 0) > 0;

  if (!isPaidCourse) {
    this.paymentMethods = [];
    return next();
  }

  if (!Array.isArray(this.paymentMethods) || this.paymentMethods.length === 0) {
    this.paymentMethods = [...DEFAULT_PAYMENT_METHODS];
  }

  return next();
});

courseSchema.statics.PAYMENT_METHOD_VALUES = PAYMENT_METHOD_VALUES;
courseSchema.statics.DEFAULT_PAYMENT_METHODS = DEFAULT_PAYMENT_METHODS;

// Create indexes
courseSchema.index({ slug: 1 }, { unique: true });
courseSchema.index({ isPaid: 1 });
courseSchema.index({ level: 1 });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
