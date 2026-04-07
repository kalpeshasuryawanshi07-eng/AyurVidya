# Ayurveda Learning Platform - Backend API

Express + MongoDB backend for the Ayurveda learning platform.

## 1. Setup

### Prerequisites
- Node.js 18+
- MongoDB 6+

### Install
```bash
npm install
```

### Environment
```bash
cp .env.example .env
```

Update `.env` values before running in production.

### Run
```bash
# development
npm run dev

# production
npm start
```

### Health Check
- `GET /health`

Example response:
```json
{
  "status": "ok",
  "message": "Server is running",
  "database": "connected",
  "environment": "development"
}
```

## 2. Scripts

```bash
npm run dev
npm start
npm test
npm run seed
npm run seed:subjects
npm run seed:topics
npm run seed:herbs
npm run seed:admin
```

## 3. Environment Variables

### Required
- `MONGODB_URI`: MongoDB connection URI
- `JWT_SECRET`: JWT signing secret

### Optional
- `PORT` (default `5000`)
- `NODE_ENV` (default `development`)
- `JWT_EXPIRES_IN` (default `7d`)
- `CORS_ORIGIN` (default `http://localhost:3000`)
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RATE_LIMIT_WINDOW_MS` (default `900000`)
- `RATE_LIMIT_MAX_REQUESTS` (default `100`)
- `DEFAULT_ADMIN_NAME`
- `DEFAULT_ADMIN_EMAIL`
- `DEFAULT_ADMIN_PASSWORD`
- `DEFAULT_ADMIN_LANG`
- `RESET_DEFAULT_ADMIN_PASSWORD` (`true` to reset seeded admin password)

## 4. Security

- `helmet` enabled globally.
- Global rate limiting enabled (`100 requests / 15 min / IP` by default).
- `express-validator` request validation on route boundaries.
- Request sanitization middleware removes suspicious keys (e.g. `$where`, dotted keys) from params/query/body.
- JWT auth with role-based authorization for admin routes.

## 5. Authentication

Use bearer token:
```http
Authorization: Bearer <jwt_token>
```

Auth lifecycle:
1. Register or login to receive JWT.
2. Send JWT on protected routes.
3. Server returns `401` for invalid/expired/missing token.

## 6. Standard Response Format

### Success
```json
{
  "status": "success",
  "message": "Human readable message",
  "data": {}
}
```

### Error
```json
{
  "status": "error",
  "message": "Human readable error",
  "errors": ["Detailed error item"]
}
```

## 7. API Endpoints

Base prefix: `/api`

### 7.1 Auth
- `POST /auth/register` (public)
- `POST /auth/login` (public)
- `GET /auth/me` (auth required)
- `PATCH /auth/profile` (auth required)

Register request:
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "StrongPassword123"
}
```

Login response data:
```json
{
  "user": {
    "_id": "...",
    "name": "User Name",
    "email": "user@example.com",
    "role": "student",
    "preferredLang": "en"
  },
  "token": "jwt"
}
```

### 7.2 Subjects and Topics
- `GET /subjects` (public, query: `year`)
- `GET /subjects/:slug` (public, query: `lang=en|mr`)
- `GET /topics` (public, query: `subjectSlug`, `difficulty`, `page`, `limit`)
- `GET /topics/:slug` (public, query: `lang=en|mr`)

Topic response `data`:
```json
{
  "topic": {
    "slug": "basic-principles-topic-001",
    "subjectSlug": "basic-principles",
    "title": "...",
    "introduction": "...",
    "historicalContext": "...",
    "coreExplanation": "...",
    "clinicalApplications": "...",
    "modernComparison": "...",
    "summary": ["..."],
    "furtherReading": ["..."],
    "shloka": {
      "devanagari": "...",
      "transliteration": "...",
      "translation": "...",
      "source": "..."
    }
  },
  "navigation": {
    "previous": { "slug": "...", "title": "..." },
    "next": { "slug": "...", "title": "..." }
  }
}
```

### 7.3 Quiz and Flashcards
- `GET /topics/:slug/quiz` (public, query: `lang`)
- `GET /topics/:slug/flashcards` (public, query: `lang`)
- `POST /quiz/submit` (auth required)
- `GET /quiz/stats/me` (auth required)

Quiz submit request:
```json
{
  "topicSlug": "basic-principles-topic-001",
  "answers": [
    { "questionId": "basic-principles-topic-001-q1", "selectedOption": 0 }
  ]
}
```

### 7.4 Progress
- `POST /progress/complete` (auth required)
- `GET /progress/me` (auth required, optional query: `subjectSlug`)
- `GET /progress/streak` (auth required)

### 7.5 Bookmarks
- `GET /bookmarks` (auth required, query: `page`, `limit`)
- `POST /bookmarks` (auth required)
- `DELETE /bookmarks/:topicSlug` (auth required)

Bookmark create request:
```json
{
  "topicSlug": "basic-principles-topic-001"
}
```

### 7.6 Notes
- `GET /notes` (auth required)
- `GET /notes/:topicSlug` (auth required)
- `POST /notes` (auth required)

Note upsert request:
```json
{
  "topicSlug": "basic-principles-topic-001",
  "content": "My revision notes..."
}
```

### 7.7 Herbs
- `GET /herbs` (public, query: `category`, `search`, `lang`, `page`, `limit`)
- `GET /herbs/:slug` (public, query: `lang`)

### 7.8 Courses
- `GET /courses` (public, query: `lang`)
- `GET /courses/:slug` (public, query: `lang`)
- `GET /courses/my` (auth required, query: `lang`)
- `POST /courses/:slug/enroll` (auth required, free courses only)
- `POST /courses/:slug/lessons/:lessonId/complete` (auth required)
- `GET /courses/:slug/progress` (auth required)

### 7.9 Payment
- `POST /payment/create-order` (auth required)
- `POST /payment/verify` (auth required)
- `GET /payment/history` (auth required)

Create order request:
```json
{
  "courseId": "mongo_object_id"
}
```

Verify payment request:
```json
{
  "razorpayOrderId": "order_xxx",
  "razorpayPaymentId": "pay_xxx",
  "razorpaySignature": "signature"
}
```

### 7.10 Search
- `GET /search` (public, query: `q`, `lang`, `page`, `limit`)

### 7.11 Admin (admin role required)
- `GET /admin/stats`
- `GET /admin/users`
- `PATCH /admin/users/:id`
- `DELETE /admin/users/:id`
- `GET /admin/courses`
- `POST /admin/courses`
- `PUT /admin/courses/:id`
- `DELETE /admin/courses/:id`

## 8. Database Schema (Overview)

### User
- `name`, `email`, `password(hash)`, `role`, `preferredLang`, timestamps

### Subject
- `slug`, `title`, `titleMr`, `description`, `descriptionMr`, `icon`, `colorHex`, `year`, `orderIndex`, `topicCount`

### Topic
- `slug`, `subjectSlug`, `title`, `titleMr`, `difficulty`, `estimatedMins`, `orderIndex`
- Content fields in EN + MR
- `shloka`, `quizQuestions`, `flashcards`

### Herb
- `slug`, `commonName`, `commonNameMr`, `botanicalName`, `sanskritName`
- `rasa`, `guna`, `virya`, `vipaka`, `doshaEffect`
- `partsUsed`, `medicinalUses`, `preparations`, `dosage`, `contraindications`, `modernResearch`, `category`

### Course
- `slug`, `title`, `description`, `level`, `duration`, `lessons[]`, `price`, `isPaid`, `enrollmentCount`, `rating`

### Enrollment
- `userId`, `courseId`, `enrolledAt`, `completedLessons[]`, `progress`, `lastAccessedAt`

### Payment
- `userId`, `courseId`, `razorpayOrderId`, `razorpayPaymentId`, `razorpaySignature`, `amount`, `currency`, `status`, `paidAt`

### Progress
- `userId`, `topicSlug`, `completed`, `completedAt`, `timeSpent`

### Bookmark
- `userId`, `topicSlug`, `createdAt`

### Note
- `userId`, `topicSlug`, `content`, `updatedAt`

### QuizResult
- `userId`, `topicSlug`, `score`, `totalQuestions`, `correctAnswers`, `answers[]`, `submittedAt`

## 9. Seeding Workflow

### Seed all
```bash
npm run seed
```

### Seed by module
```bash
npm run seed:subjects
npm run seed:topics
npm run seed:herbs
npm run seed:admin
```

What seeding does:
- Inserts/updates 10 subjects.
- Inserts/updates 221 topic documents with bilingual fields, shloka metadata, quiz, and flashcards.
- Inserts/updates herb encyclopedia starter set.
- Creates or updates default admin user.

## 10. Troubleshooting

### Server does not start
- Verify `.env` exists and required variables are present.
- Ensure MongoDB is running and reachable from `MONGODB_URI`.

### 401 Unauthorized
- Check JWT token format (`Bearer <token>`).
- Re-login if token expired.

### 403 Forbidden on admin endpoints
- Ensure user role is `admin`.

### Payment errors
- Confirm Razorpay keys are set correctly.
- Use test mode keys in non-production environments.

### Seed script errors
- Ensure `MONGODB_URI` is valid.
- Ensure model validation constraints are not violated by edited seed data.
