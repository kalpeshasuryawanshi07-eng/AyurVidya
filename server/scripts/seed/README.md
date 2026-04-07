# Seed Scripts Documentation

This directory contains all database seeding scripts for the Ayurveda Learning Platform.

## Course Seeding Scripts

### Main Scripts

#### `seedAllCoursesWithContent.js`
**Purpose**: Seeds all 6 Ayurveda courses with complete structure and content.

**Usage**:
```bash
node server/scripts/seed/seedAllCoursesWithContent.js
```

**What it does**:
- Clears all existing courses
- Seeds 6 courses with modules, topics, and lessons
- Dravyaguna course has full content (12 lessons)
- Other courses have placeholder content that can be expanded

**Courses included**:
1. Foundations of Ayurveda (28 lessons)
2. Dravyaguna Vigyan Mastery (12 lessons - COMPLETE)
3. Nadi Pariksha & Clinical Diagnosis (38 lessons)
4. Panchakarma: Complete Detox Therapies (44 lessons)
5. Ayurvedic Diet & Daily Lifestyle (32 lessons)
6. Rasa Shastra - Mineral Medicine (36 lessons)

#### `seedDravyagunaWithContent.js`
**Purpose**: Seeds only the Dravyaguna course with complete comprehensive content.

**Usage**:
```bash
node server/scripts/seed/seedDravyagunaWithContent.js
```

**What it does**:
- Deletes existing Dravyaguna course
- Seeds Dravyaguna with 12 fully detailed lessons
- Each lesson has 5,000-11,000 characters of content
- All lessons are FREE

#### `seedCourses.js`
**Purpose**: Legacy seed file with course structure only (no lesson content).

**Usage**:
```bash
node server/scripts/seed/seedCourses.js
```

**Note**: This file is kept for reference but `seedAllCoursesWithContent.js` is recommended.

### Verification Scripts

#### `verifyAllCourses.js`
**Purpose**: Verifies all courses in the database and shows content status.

**Usage**:
```bash
node server/scripts/seed/verifyAllCourses.js
```

**Output**:
- Lists all courses
- Shows lesson counts
- Indicates which lessons have full content vs placeholders
- Displays course metadata (price, rating, students, etc.)

#### `verifyDravyaguna.js`
**Purpose**: Detailed verification of Dravyaguna course content.

**Usage**:
```bash
node server/scripts/seed/verifyDravyaguna.js
```

#### `verifyOneCourse.js`
**Purpose**: Verify a specific course by slug.

**Usage**:
```bash
node server/scripts/seed/verifyOneCourse.js
```

## Other Seeding Scripts

### Subject & Topic Scripts

#### `seedSubjects.js`
Seeds Ayurveda subjects (Dravyaguna, Rasa Shastra, etc.)

#### `seedTopics.js`
Seeds topics within subjects

#### `subjectContentData.js`
Contains subject content data

#### `topicListData.js`
Contains topic list data

### Herb Scripts

#### `seedHerbs.js`
Seeds medicinal herb database

#### `batch_update_herbs.js`
Batch updates herb data

### Admin Scripts

#### `seedAdmin.js`
Seeds admin user accounts

### Database Restoration Scripts

#### `restore_database_academic.js`
Restores academic content database

#### `restore_database_final.js`
Final database restoration script

### Utility Scripts

#### `db.js`
Database connection utility

#### `knowledgeEngine.js`
Knowledge base engine for content generation

#### `quizGenerator.js`
Generates quiz questions from content

#### `check_api.js`
API endpoint verification

## Recommended Workflow

### Initial Setup
1. Run `seedAllCoursesWithContent.js` to populate all courses
2. Run `verifyAllCourses.js` to confirm seeding

### Development
1. Modify course content in seed files
2. Re-run specific seed script
3. Verify changes with verification script

### Adding Content to Placeholder Lessons
1. Edit `seedAllCoursesWithContent.js`
2. Find the course and lesson you want to expand
3. Replace placeholder content with full content
4. Re-run the seed script
5. Verify with `verifyAllCourses.js`

## Content Guidelines

### Lesson Content Structure
```javascript
{
  lessonId: 'course-module-lesson',
  title: 'Lesson Title',
  content: `# Lesson Title

## Introduction
Brief overview of the lesson

## Main Content
Detailed explanation with:
- Definitions
- Clinical applications
- Examples
- Case studies

## Exam Strategy
Tips for answering exam questions

## Practice Exercises
Questions to test understanding

## What's Next?
Preview of next lesson`,
  isFree: true,
  duration: 18, // minutes
  orderIndex: 1
}
```

### Content Requirements
- **Length**: 5,000-8,000 characters (minimum 5,000)
- **Format**: Markdown
- **No bold formatting**: Remove all ** markers
- **Structure**: Clear sections with headers
- **Clinical focus**: Practical applications
- **Exam-oriented**: Include exam strategies

## Database Schema

### Course Schema
```javascript
{
  slug: String,
  title: String,
  description: String,
  longDescription: String,
  level: 'beginner' | 'intermediate' | 'advanced',
  isPaid: Boolean,
  isFree: Boolean,
  price: Number,
  duration: String,
  totalLessons: Number,
  totalModules: Number,
  students: Number,
  rating: Number,
  tags: [String],
  thumbnail: String,
  language: [String],
  isPublished: Boolean,
  modules: [ModuleSchema],
  lessons: [LessonSchema]
}
```

### Lesson Schema
```javascript
{
  lessonId: String,
  title: String,
  titleMr: String, // Marathi translation
  content: String,
  contentMr: String, // Marathi translation
  isFree: Boolean,
  videoUrl: String,
  duration: Number, // minutes
  orderIndex: Number,
  topicSlug: String
}
```

## Troubleshooting

### Port Already in Use
If you get "EADDRINUSE" error:
```bash
# Windows
Get-Process -Name node | Stop-Process -Force

# Linux/Mac
killall node
```

### MongoDB Connection Error
Check:
1. MongoDB is running
2. Connection string in `.env` is correct
3. Database name matches

### Courses Not Showing
1. Run verification script to check database
2. Check server logs for errors
3. Verify API endpoint: `http://localhost:5000/api/courses`

## Future Enhancements

### Planned Features
1. Automated content generation for placeholder lessons
2. Marathi translations for all content
3. Video URL integration
4. Quiz generation from lesson content
5. Progress tracking integration

### Content Expansion Priority
1. Foundations of Ayurveda (most students)
2. Panchakarma (most lessons)
3. Nadi Pariksha (advanced level)
4. Diet & Lifestyle (practical application)
5. Rasa Shastra (specialized content)

## Support

For issues or questions:
1. Check this README
2. Review verification script output
3. Check server logs
4. Consult main project documentation
