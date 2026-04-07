const mongoose = require('mongoose');
const Course = require('../../models/Course');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurveda-learning');
    console.log('✓ MongoDB Connected');
  } catch (error) {
    console.error('✗ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// Import course modules
const { dravyagunaCourse } = require('./seedDravyagunaWithContent');
const { dietLifestyleCourse } = require('./seedDietLifestyleWithContent');

// Helper function to create placeholder lesson
const createPlaceholderLesson = (lessonId, title, orderIndex, duration = 18) => {
  const lessonTitle = title || `Lesson ${orderIndex}`;
  return {
    lessonId,
    title: lessonTitle,
    content: `# ${lessonTitle}

This lesson covers comprehensive content about ${lessonTitle.toLowerCase()}.

Content includes:
- Detailed theoretical foundations
- Clinical applications and case studies
- Exam-focused strategies and memorization techniques
- Practice questions with model answers
- Classical references and modern correlations

Full content will be available soon.`,
    isFree: true,
    duration,
    orderIndex
  };
};


// COURSE 1: Foundations of Ayurveda - Complete with sample lessons
const foundationsCourse = {
  slug: 'foundations-of-ayurveda',
  title: 'Foundations of Ayurveda',
  description: 'Build the complete philosophical and theoretical base that every BAMS student needs from day one.',
  longDescription: `This course lays the intellectual bedrock of Ayurvedic science. You will explore Ayurveda not as a collection of remedies but as a complete system of thought — rooted in Vedic philosophy, refined through centuries of clinical observation, and codified in texts like Charaka Samhita and Ashtanga Hridayam. By the end, you will be able to read any classical sloka with structural understanding and map every concept back to its philosophical origin.`,
  level: 'beginner',
  isPaid: false,
  isFree: true,
  price: 0,
  duration: '12 hrs',
  totalLessons: 28,
  totalModules: 4,
  students: 2840,
  rating: 4.7,
  tags: ['foundations', 'philosophy', 'BAMS', 'basics'],
  thumbnail: '/images/course-placeholder.jpg',
  language: ['English', 'Marathi'],
  isPublished: true,
  modules: [
    {
      title: 'Padartha Vigyan & Philosophy',
      topics: [
        { title: 'Sat-Asat Padartha', description: 'Understand the six Padarthas from Vaisheshika Darshan with Ayurvedic interpretation.' },
        { title: 'Dravya, Guna, Karma', description: 'Deep-dive into the 20 Gurvadi Gunas and how Karma arises from Dravya-Guna conjunction.' },
        { title: 'Samanya-Vishesha', description: 'The law of similarity and contrast — the fundamental principle behind every therapeutic decision.' },
        { title: 'Samsaraya & Karma-Kaarya', description: 'Causal relationships in Ayurvedic logic and how cause produces effect.' }
      ]
    },
    {
      title: 'Panchamahabhuta Siddhanta',
      topics: [
        { title: '5 Mahabhuta Theory', description: 'From Akasha to Prithvi — understand how each element manifests in the body.' },
        { title: 'Tanmatra Theory', description: 'The subtle basis of the five elements as bridge between consciousness and matter.' },
        { title: 'Paramanu Concept', description: 'Ayurveda\'s atomic theory and its relevance to modern nano-medicine.' },
        { title: 'Clinical Relevance', description: 'Mapping Panchamahabhuta to body tissues, organs, and disease presentations.' }
      ]
    },
    {
      title: 'Tridosha — Vata, Pitta, Kapha',
      topics: [
        { title: 'Dosha Definitions & Subtypes', description: 'All 5 subtypes of each Dosha with their seats, functions, and signs.' },
        { title: 'Dashic Seats', description: 'Primary and secondary seats of each Dosha in the body.' },
        { title: 'Seasonal Variation', description: 'How Doshas accumulate, provoke, spread, and deposit across seasons.' }
      ]
    },
    {
      title: 'Sapta Dhatu & Mala Vigyan',
      topics: [
        { title: 'Rasa to Shukra Pathway', description: 'The seven-tissue sequential transformation with timing and Agni involvement.' },
        { title: 'Upa-dhatu & Dhatu-agni', description: 'Sub-tissues and role of each Dhatu-agni in tissue metabolism.' },
        { title: '3 Malas', description: 'Purisha, Mutra, and Sweda as metabolic by-products with physiological roles.' },
        { title: 'Ama Formation', description: 'The concept of Ama as undigested metabolic residue and root of chronic disease.' }
      ]
    }
  ],
  lessons: []
};


// Foundations Course - Sample Lessons (First 4 detailed, rest placeholders)
foundationsCourse.lessons = [
  {
    lessonId: 'found-1-1',
    title: 'Introduction to Ayurvedic Philosophy',
    content: `# Welcome to Foundations of Ayurveda

## What is Ayurveda?

Ayurveda is not just a medical system—it's a complete science of life. The word itself reveals its scope:
- Ayus = Life (body + mind + soul + senses)
- Veda = Knowledge/Science

This course will build your philosophical foundation, the bedrock upon which all Ayurvedic practice rests.

## Why Philosophy Matters

Many students rush to learn herbs and treatments without understanding the underlying principles. This is like trying to build a house without a foundation. Philosophy gives you:

- Logical framework for diagnosis
- Systematic approach to treatment
- Ability to analyze new situations
- Confidence in clinical decisions

## The Ayurvedic Worldview

Ayurveda sees the human being as a microcosm of the universe. Everything that exists in nature exists within us:

- The five elements (Panchamahabhuta)
- The three biological forces (Tridosha)
- The seven tissues (Sapta Dhatu)
- The three waste products (Trimala)

## Course Structure

This course covers four major philosophical domains:

### Module 1: Padartha Vigyan (7 lessons)
The science of categories—how Ayurveda classifies and understands reality itself.

### Module 2: Panchamahabhuta Siddhanta (7 lessons)
The five-element theory that explains all matter and energy.

### Module 3: Tridosha Theory (7 lessons)
The three biological forces that govern all physiological and psychological functions.

### Module 4: Dhatu & Mala Vigyan (7 lessons)
The tissue systems and waste products that maintain bodily structure and function.

## Learning Approach

Each lesson follows this structure:

1. Classical Definition - What the ancient texts say
2. Logical Analysis - Why it makes sense
3. Clinical Application - How it's used in practice
4. Exam Strategy - How to answer questions
5. Practice Exercises - Test your understanding

## The Three Pillars of Ayurvedic Knowledge

### 1. Hetu (Cause)
Understanding what causes health and disease. Every effect has a cause, and identifying the root cause is the key to treatment.

### 2. Linga (Signs/Symptoms)
Recognizing the manifestations of health and disease through observation and examination.

### 3. Aushadha (Treatment)
Applying the right intervention to restore balance—diet, lifestyle, herbs, or procedures.

## Fundamental Principles

### Samanya-Vishesha Siddhanta
The law of similarity and dissimilarity:
- Like increases like (Samanya)
- Opposite decreases (Vishesha)

This single principle explains all therapeutic action in Ayurveda.

### Prakriti-Vikriti Concept
- Prakriti = Your natural constitution (unchanging)
- Vikriti = Current state of imbalance (changing)

Treatment aims to bring Vikriti back to Prakriti.

### Agni Concept
Agni (digestive fire) is the cornerstone of health. Strong Agni means:
- Proper digestion
- Clear mind
- Strong immunity
- Healthy tissues

Weak Agni leads to Ama (toxins) and disease.

## The Classical Texts

You'll encounter references to these foundational texts:

### Brihat Trayi (The Great Three)
1. Charaka Samhita - Internal medicine focus
2. Sushruta Samhita - Surgical focus
3. Ashtanga Hridayam - Concise compilation

### Laghu Trayi (The Lesser Three)
1. Madhava Nidana - Diagnostic focus
2. Sharangadhara Samhita - Pharmaceutical focus
3. Bhavaprakasha - Practical compilation

## How to Study Philosophy

Philosophy can seem abstract, but it becomes clear when you:

1. Connect to examples - Relate every concept to something you can observe
2. Question actively - Ask "why" and "how" constantly
3. Apply clinically - Think about how each principle guides treatment
4. Discuss with peers - Philosophy deepens through dialogue

## Exam Preparation Strategy

BAMS exams test philosophy heavily. Here's how to excel:

### Short Questions (5 marks)
- Define the concept
- Give 2-3 key points
- Provide 1 clinical example
- Cite classical reference

### Long Questions (10 marks)
- Detailed definition with etymology
- Complete explanation with sub-categories
- Multiple clinical applications
- Classical shlokas with translation
- Modern correlation if relevant

## What Makes This Course Different

Unlike textbooks that just list definitions, this course:

- Explains the logic behind each concept
- Shows clinical applications
- Provides exam-focused strategies
- Uses memory techniques
- Includes practice questions

## Your Learning Journey

By the end of this course, you will:

- Understand the philosophical foundation of Ayurveda
- Think systematically about health and disease
- Analyze any clinical situation using first principles
- Answer exam questions with confidence
- Build a strong base for advanced studies

## Ready to Begin?

In the next lesson, we'll explore Padartha Vigyan—the Ayurvedic theory of categories. You'll learn how Ayurveda borrowed from Vaisheshika philosophy and adapted it for medical purposes.

This is where your journey into the depths of Ayurvedic wisdom truly begins.

Next Lesson: Sat-Asat Padartha - The Six Categories of Reality →`,
    isFree: true,
    duration: 15,
    orderIndex: 1
  }
];


// Add remaining placeholder lessons for Foundations course
for (let i = 2; i <= 28; i++) {
  const lessonTitles = [
    'Sat-Asat Padartha - The Six Categories',
    'Dravya-Guna-Karma Triad',
    'Samanya-Vishesha Siddhanta',
    'Samsaraya & Karma-Kaarya Relations',
    'Panchamahabhuta Theory - Introduction',
    'Akasha Mahabhuta - Space Element',
    'Vayu Mahabhuta - Air Element',
    'Agni Mahabhuta - Fire Element',
    'Jala Mahabhuta - Water Element',
    'Prithvi Mahabhuta - Earth Element',
    'Tanmatra Theory',
    'Paramanu Concept',
    'Clinical Applications of Panchamahabhuta',
    'Tridosha Introduction',
    'Vata Dosha - Complete Analysis',
    'Pitta Dosha - Complete Analysis',
    'Kapha Dosha - Complete Analysis',
    'Dosha Subtypes and Seats',
    'Seasonal Dosha Variations',
    'Prakriti Determination',
    'Vikriti Assessment',
    'Sapta Dhatu Introduction',
    'Rasa to Shukra Transformation',
    'Dhatu-agni and Upa-dhatus',
    'Trimala - The Three Wastes',
    'Ama Formation and Detection',
    'Agni - The Digestive Fire'
  ];
  
  foundationsCourse.lessons.push(
    createPlaceholderLesson(`found-${Math.ceil(i/7)}-${((i-1)%7)+1}`, lessonTitles[i-1], i, 18 + (i % 5))
  );
}


// COURSE 2: Nadi Pariksha & Clinical Diagnosis
const nadiParikshaCourse = {
  slug: 'nadi-pariksha-clinical-diagnosis',
  title: 'Nadi Pariksha & Clinical Diagnosis',
  description: 'Master Ayurvedic examination — pulse diagnosis, Ashtavidha Pariksha, and complete case-taking with real patient scenarios.',
  longDescription: `Clinical diagnosis is where Ayurvedic theory becomes real medicine. This advanced course trains you in the complete Ayurvedic examination system — from reading the pulse at three levels to performing all 8 examination methods (Ashtavidha Pariksha). You will work through 15 documented case studies covering the most common BAMS clinical exam presentations.`,
  level: 'advanced',
  isPaid: false,
  isFree: true,
  price: 0,
  duration: '22 hrs',
  totalLessons: 38,
  totalModules: 3,
  students: 980,
  rating: 4.8,
  tags: ['nadi pariksha', 'clinical', 'diagnosis', 'ashtavidha', 'BAMS'],
  thumbnail: '/images/course-placeholder.jpg',
  language: ['English', 'Marathi'],
  isPublished: true,
  modules: [
    {
      title: 'Ashtavidha Pariksha (8-fold Exam)',
      topics: [
        { title: 'Nadi (pulse)', description: 'Pulse palpation technique and Dosha identification.' },
        { title: 'Mutra (urine)', description: 'Urine examination and oil-drop test.' },
        { title: 'Mala (stool)', description: 'Stool examination parameters.' },
        { title: 'Jihwa (tongue)', description: 'Tongue diagnosis and mapping.' },
        { title: 'Shabda (voice)', description: 'Voice examination indicators.' },
        { title: 'Sparsha (touch)', description: 'Palpation technique and organ mapping.' },
        { title: 'Drika (eyes)', description: 'Ocular examination.' },
        { title: 'Akriti (body)', description: 'Overall body constitution assessment.' }
      ]
    },
    {
      title: 'Nadi Pariksha — Pulse Mastery',
      topics: [
        { title: '3-finger technique', description: 'Precise anatomical placement and pressure calibration.' },
        { title: 'Vata pulse (snake)', description: 'Irregular, quick, thin, cold characteristics.' },
        { title: 'Pitta pulse (frog)', description: 'Jumping, forceful, warm patterns.' },
        { title: 'Kapha pulse (swan)', description: 'Slow, smooth, cool rhythm.' },
        { title: 'Organ pulses', description: 'Advanced organ-level pulse reading.' },
        { title: 'Nadi in disease', description: 'Pathological pulse patterns for 20 major conditions.' }
      ]
    },
    {
      title: 'Case Studies & Clinical Scenarios',
      topics: [
        { title: 'Vata disorders case', description: 'Complete case analysis with treatment plan.' },
        { title: 'Pitta disorder case', description: 'Differential diagnosis and protocol.' },
        { title: 'Kapha disorder case', description: 'Dual-Dosha management approach.' },
        { title: 'Chronic disease cases', description: '5 long-form chronic disease analyses.' },
        { title: 'Paediatric case', description: 'Child-specific examination modifications.' },
        { title: 'Geriatric case', description: 'Vata-dominant geriatric case management.' },
        { title: 'Emergency recognition', description: 'Recognising Ayurvedic clinical emergencies.' }
      ]
    }
  ],
  lessons: []
};

// Add placeholder lessons for Nadi Pariksha course
const nadiLessonTitles = [
  'Introduction to Clinical Diagnosis',
  'Ashtavidha Pariksha Overview',
  'Nadi Pariksha - Pulse Examination Basics',
  'Three-Finger Technique Mastery'
];

for (let i = 1; i <= 38; i++) {
  const title = nadiLessonTitles[i-1] || `Clinical Diagnosis Lesson ${i}`;
  nadiParikshaCourse.lessons.push(
    createPlaceholderLesson(`nadi-${Math.ceil(i/13)}-${((i-1)%13)+1}`, title, i, 20 + (i % 6))
  );
}


// COURSE 3: Panchakarma Complete Detox Therapies
const panchakarmaCourse = {
  slug: 'panchakarma-complete-detox-therapies',
  title: 'Panchakarma: Complete Detox Therapies',
  description: 'Full procedural training in all 5 purification therapies — indications, contraindications, step-by-step protocols, and post-care.',
  longDescription: `Panchakarma is the therapeutic jewel of Ayurveda — a systematic bio-purification process that addresses disease at its root by removing accumulated Doshas from their deepest channels. This course provides complete procedural mastery across all five primary therapies and 18 types of Basti.`,
  level: 'intermediate',
  isPaid: false,
  isFree: true,
  price: 0,
  duration: '25 hrs',
  totalLessons: 44,
  totalModules: 4,
  students: 1210,
  rating: 4.8,
  tags: ['panchakarma', 'detox', 'shodhana', 'basti', 'clinical'],
  thumbnail: '/images/course-placeholder.jpg',
  language: ['English', 'Marathi'],
  isPublished: true,
  modules: [
    {
      title: 'Purvakarma — Pre-procedures',
      topics: [
        { title: 'Pachana (digestion) internal', description: 'Deepana-Pachana phase preparation.' },
        { title: 'Snehana external (Abhyanga)', description: 'Full-body oil massage technique.' },
        { title: 'Snehana internal', description: 'Internal oleation with medicated ghee.' },
        { title: 'Svedana (fomentation) types', description: '13 types of Svedana methods.' },
        { title: 'Rookshana', description: 'Drying pre-procedure for Kapha-excess.' },
        { title: 'Dose calculation', description: 'Calculating Panchakarma doses by body weight.' }
      ]
    },
    {
      title: 'Vamana & Virechana',
      topics: [
        { title: 'Vamana indications', description: 'Kapha-dominant conditions for therapeutic emesis.' },
        { title: 'Drug protocol (Madanaphala)', description: 'Primary emetic agent preparation.' },
        { title: 'Vamana procedure steps', description: 'Complete 10-step Vamana procedure.' },
        { title: 'Virechana indications', description: 'Pitta-dominant disorders for purgation.' },
        { title: 'Trivrith Leha protocol', description: 'Gold-standard Virechana drug protocol.' }
      ]
    },
    {
      title: 'Basti — King of Panchakarma',
      topics: [
        { title: 'Niruha vs Anuvasana', description: 'Two main types of Basti enemas.' },
        { title: 'Kashaya Basti preparation', description: 'Ingredient sequence and mixing.' },
        { title: 'Sneha Basti', description: 'Oil enema technique and retention.' },
        { title: 'Yoga Basti schedule', description: '8 Basti course protocol.' },
        { title: 'Karma Basti', description: 'Complete 30-Basti course for serious Vata disorders.' },
        { title: 'Matra Basti', description: 'Daily small-dose oil enema.' }
      ]
    },
    {
      title: 'Nasya & Raktamokshana',
      topics: [
        { title: '5 types of Nasya', description: 'Navana, Avapeedana, Dhmapana, Dhuma, Pratimarsha.' },
        { title: 'Pratimarsha Nasya', description: 'Daily 2-drop self-administered Nasya.' },
        { title: 'Brinhana Nasya', description: 'Nutritive nasal therapy.' },
        { title: '6 methods of Raktamokshana', description: 'Bloodletting methods including leech therapy.' },
        { title: 'Jalaukavacharana (leeches)', description: 'Leech therapy as refined Raktamokshana.' }
      ]
    }
  ],
  lessons: []
};

// Add placeholder lessons for Panchakarma course
for (let i = 1; i <= 44; i++) {
  panchakarmaCourse.lessons.push(
    createPlaceholderLesson(`panch-${Math.ceil(i/11)}-${((i-1)%11)+1}`, `Panchakarma Lesson ${i}`, i, 18 + (i % 7))
  );
}


// COURSE 5: Rasa Shastra - Mineral Medicine
const rasaShastraCourse = {
  slug: 'rasa-shastra-mineral-medicine',
  title: 'Rasa Shastra - Mineral Medicine',
  description: 'Advanced mineral and metal-based medicines — purification, processing, and clinical applications of Bhasmas and Rasayanas.',
  longDescription: `Rasa Shastra is the alchemical branch of Ayurveda dealing with mineral and metal-based medicines. This advanced course covers the complete science of Bhasma (calcined metals), Pishti (powdered gems), and Kupipakwa Rasayana (bottle-processed medicines) with emphasis on safety, efficacy, and modern quality control.`,
  level: 'advanced',
  isPaid: false,
  isFree: true,
  price: 0,
  duration: '20 hrs',
  totalLessons: 36,
  totalModules: 4,
  students: 720,
  rating: 4.7,
  tags: ['rasa shastra', 'bhasma', 'minerals', 'metals', 'advanced'],
  thumbnail: '/images/course-placeholder.jpg',
  language: ['English', 'Marathi'],
  isPublished: true,
  modules: [
    {
      title: 'Introduction to Rasa Shastra',
      topics: [
        { title: 'History and philosophy', description: 'Evolution of mineral medicine in Ayurveda.' },
        { title: 'Classification of Rasa Dravyas', description: 'Maharasa, Uparasa, Sadharana Rasa, Ratna, Uparatna.' },
        { title: 'Safety and toxicology', description: 'Understanding heavy metal safety in Ayurveda.' },
        { title: 'Modern research', description: 'Scientific validation of Bhasma efficacy.' }
      ]
    },
    {
      title: 'Shodhana — Purification Methods',
      topics: [
        { title: 'Principles of Shodhana', description: 'Why purification is essential.' },
        { title: 'Samanya Shodhana', description: 'General purification methods.' },
        { title: 'Vishesha Shodhana', description: 'Specific purification for each metal.' },
        { title: 'Quality testing', description: 'Classical and modern purity tests.' }
      ]
    },
    {
      title: 'Bhasma Preparation',
      topics: [
        { title: 'Marana process', description: 'Incineration and calcination techniques.' },
        { title: 'Puta types', description: 'Different heating methods and temperatures.' },
        { title: 'Bhasma Pariksha', description: 'Testing Bhasma quality - Rekhapurnatva, Varitara, etc.' },
        { title: 'Common Bhasmas', description: 'Swarna, Rajata, Tamra, Loha, Abhraka Bhasmas.' }
      ]
    },
    {
      title: 'Clinical Applications',
      topics: [
        { title: 'Bhasma in chronic disease', description: 'Using mineral medicines for difficult cases.' },
        { title: 'Dose and Anupana', description: 'Correct dosing and vehicle selection.' },
        { title: 'Contraindications', description: 'When not to use Rasa medicines.' },
        { title: 'Modern regulations', description: 'Legal and regulatory aspects of Rasa Shastra practice.' }
      ]
    }
  ],
  lessons: []
};

// Add placeholder lessons for Rasa Shastra course
for (let i = 1; i <= 36; i++) {
  rasaShastraCourse.lessons.push(
    createPlaceholderLesson(`rasa-${Math.ceil(i/9)}-${((i-1)%9)+1}`, `Rasa Shastra Lesson ${i}`, i, 19 + (i % 6))
  );
}


// Main seeding function
async function seedAllCourses() {
  try {
    await connectDB();
    
    console.log('[seed] Seeding all 6 courses with content...');
    
    const courses = [
      foundationsCourse,
      dravyagunaCourse,
      dietLifestyleCourse,
      nadiParikshaCourse,
      panchakarmaCourse,
      rasaShastraCourse
    ];
    
    // Delete all existing courses
    await Course.deleteMany({});
    console.log('[seed] Cleared existing courses');
    
    // Insert all courses
    const createdCourses = await Course.insertMany(courses);
    
    console.log(`\n[seed] Successfully seeded ${createdCourses.length} courses:`);
    createdCourses.forEach(course => {
      console.log(`  ✓ ${course.title}`);
      console.log(`    - ${course.lessons.length} lessons`);
      console.log(`    - ${course.modules.length} modules`);
      console.log(`    - Level: ${course.level}`);
      console.log(`    - Price: ₹${course.price} (${course.isFree ? 'FREE' : 'PAID'})`);
    });
    
    await mongoose.disconnect();
    console.log('\n✓ MongoDB Disconnected');
    console.log('\n[seed] All courses seeded successfully!');
    
    return createdCourses;
  } catch (error) {
    console.error('[seed] Error seeding courses:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seedAllCourses();
}

module.exports = { 
  seedAllCourses,
  courses: {
    foundationsCourse,
    dravyagunaCourse,
    nadiParikshaCourse,
    panchakarmaCourse,
    dietLifestyleCourse,
    rasaShastraCourse
  }
};
