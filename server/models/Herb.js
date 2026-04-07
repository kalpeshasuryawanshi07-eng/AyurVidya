const mongoose = require('mongoose');

const doshaEffectSchema = new mongoose.Schema({
  vata: {
    type: String,
    enum: {
      values: ['increases', 'decreases', 'balances', 'neutral'],
      message: '{VALUE} is not a valid dosha effect'
    }
  },
  pitta: {
    type: String,
    enum: {
      values: ['increases', 'decreases', 'balances', 'neutral'],
      message: '{VALUE} is not a valid dosha effect'
    }
  },
  kapha: {
    type: String,
    enum: {
      values: ['increases', 'decreases', 'balances', 'neutral'],
      message: '{VALUE} is not a valid dosha effect'
    }
  }
}, { _id: false });

const synonymSchema = new mongoose.Schema({
  name: { en: String, mr: String },
  nature: String, // e.g., morphological, botanical, etc.
  meaning: { en: String, mr: String }
}, { _id: false });

const researchDetailedSchema = new mongoose.Schema({
  action: { en: String, mr: String },
  mechanism: { en: String, mr: String },
  evidenceLevel: { type: String, enum: ['A', 'B', 'C'] }
}, { _id: false });

const vivaPrepSchema = new mongoose.Schema({
  etymology: { en: String, mr: String },
  ganas: {
    charaka: [String],
    sushruta: [String],
    vagbhata: [String]
  },
  vivaQuestions: [{
    question: { en: String, mr: String },
    answer: { en: String, mr: String }
  }],
  rasaPanchakaSummary: { en: String, mr: String }
}, { _id: false });

const herbSchema = new mongoose.Schema({
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
  commonName: {
    type: String,
    required: [true, 'Common name is required'],
    trim: true
  },
  commonNameMr: {
    type: String,
    trim: true
  },
  botanicalName: {
    type: String,
    required: [true, 'Botanical name is required'],
    trim: true
  },
  family: {
    type: String,
    trim: true
  },
  sanskritName: {
    type: String,
    trim: true
  },
  vernacularNames: {
    en: [String],
    mr: [String],
    hi: [String]
  },
  
  // High-level summary
  about: {
    en: { type: String, trim: true },
    mr: { type: String, trim: true }
  },
  
  // Morphology
  morphology: {
    habit: { en: String, mr: String },
    leaves: { en: String, mr: String },
    flowers: { en: String, mr: String },
    fruits: { en: String, mr: String },
    distribution: { en: String, mr: String }
  },

  // Ayurvedic properties
  rasa: {
    type: [String],
    default: []
  },
  guna: {
    type: [String],
    default: []
  },
  virya: {
    type: String,
    trim: true,
    default: ''
  },
  vipaka: {
    type: String,
    trim: true
  },
  prabhava: {
    type: String,
    trim: true
  },
  doshaEffect: {
    type: doshaEffectSchema,
    default: null
  },
  pharmacodynamicsExplanation: {
    en: String,
    mr: String
  },
  doshaEffectExplanation: {
    en: String,
    mr: String
  },
  
  // Therapeutic Actions
  therapeuticActions: {
    doshaKarma: { en: String, mr: String },
    dhatuKarma: { en: String, mr: String },
    generalActions: { en: String, mr: String }
  },

  // Usage information
  partsUsed: {
    type: [String],
    default: []
  },
  partsData: {
    root: { benefits: { en: String, mr: String }, uses: { en: String, mr: String } },
    stem: { benefits: { en: String, mr: String }, uses: { en: String, mr: String } },
    leaf: { benefits: { en: String, mr: String }, uses: { en: String, mr: String } },
    flower: { benefits: { en: String, mr: String }, uses: { en: String, mr: String } },
    fruit: { benefits: { en: String, mr: String }, uses: { en: String, mr: String } },
    seed: { benefits: { en: String, mr: String }, uses: { en: String, mr: String } }
  },
  medicinalUses: {
    type: String,
    required: [true, 'Medicinal uses is required'],
    trim: true
  },
  medicinalUsesMr: {
    type: String,
    trim: true
  },
  preparations: {
    type: String,
    trim: true
  },
  preparationsMr: {
    type: String,
    trim: true
  },
  dosage: {
    type: String,
    trim: true
  },
  dosageDetails: {
    time: { en: String, mr: String },
    anupana: { en: String, mr: String }
  },
  indications: {
    en: [String],
    mr: [String]
  },
  contraindications: {
    type: String,
    trim: true
  },
  contraindicationsMr: {
    type: String,
    trim: true
  },
  habitat: {
    climate: { en: String, mr: String },
    seasonality: { en: String, mr: String }
  },
  relatedHerbs: [String], // Slugs of related herbs
  chemicalProfile: {
    en: String,
    mr: String
  },
  modernResearch: {
    type: String,
    trim: true
  },
  modernResearchDetailed: [researchDetailedSchema],
  vivaPrep: vivaPrepSchema,
  synonymsDetailed: [synonymSchema],
  drugInteractions: {
    en: String,
    mr: String
  },

  // High-Density Academic Fields
  classicalKarmas: [{
    name: { en: String, mr: String },
    details: { en: String, mr: String }
  }],
  formulations: [{
    name: { en: String, mr: String },
    details: { en: String, mr: String }
  }],
  phytochemistry: [{
    name: { en: String, mr: String },
    details: { en: String, mr: String }
  }],
  
  category: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Create indexes
herbSchema.index({ slug: 1 }, { unique: true });
herbSchema.index({ category: 1 });

// Create text index for search
herbSchema.index({
  commonName: 'text',
  botanicalName: 'text',
  sanskritName: 'text'
});

const Herb = mongoose.model('Herb', herbSchema);

module.exports = Herb;
