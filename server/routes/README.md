# API Routes Documentation

## Authentication Routes (`/api/auth`)

### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation:**
- `name`: Required, 2-100 characters
- `email`: Required, valid email format
- `password`: Required, minimum 6 characters

**Success Response (201):**
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "preferredLang": "en",
      "createdAt": "...",
      "updatedAt": "..."
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400`: Validation failed or email already registered
- `500`: Server error

---

### POST /api/auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation:**
- `email`: Required, valid email format
- `password`: Required

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "preferredLang": "en"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400`: Validation failed
- `401`: Invalid credentials
- `500`: Server error

---

### GET /api/auth/me
Get current user profile (protected route).

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Profile retrieved successfully",
  "data": {
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "preferredLang": "en",
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
}
```

**Error Responses:**
- `401`: No token provided or invalid token
- `404`: User not found
- `500`: Server error

---

### PATCH /api/auth/profile
Update user profile (protected route).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Jane Doe",
  "preferredLang": "mr"
}
```

**Validation:**
- `name`: Optional, 2-100 characters
- `preferredLang`: Optional, must be "en" or "mr"

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "_id": "...",
      "name": "Jane Doe",
      "email": "john@example.com",
      "role": "student",
      "preferredLang": "mr",
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
}
```

**Error Responses:**
- `400`: Validation failed
- `401`: No token provided or invalid token
- `404`: User not found
- `500`: Server error

---

## Error Response Format

All error responses follow this format:

```json
{
  "status": "error",
  "message": "Error description",
  "errors": ["Detailed error message 1", "Detailed error message 2"]
}
```
