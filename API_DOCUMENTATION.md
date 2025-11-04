# API Documentation

This document provides detailed API endpoint documentation with examples.

## Base URL
```
http://localhost:5000/api
```

## Authentication

All endpoints except `/api/top-searches` and `/api/health` require authentication via session cookies. Authentication is handled through OAuth providers.

---

## Endpoints

### 1. Health Check

**GET** `/api/health`

Check if the server is running.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

**cURL:**
```bash
curl http://localhost:5000/api/health
```

---

### 2. Get Current User

**GET** `/api/auth/user`

Get the currently authenticated user information.

**Authentication:** Required (via session cookie)

**Response (Authenticated):**
```json
{
  "authenticated": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://lh3.googleusercontent.com/...",
    "provider": "google"
  }
}
```

**Response (Not Authenticated):**
```json
{
  "authenticated": false
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/auth/user \
  -b cookies.txt \
  -c cookies.txt
```

---

### 3. OAuth Login Endpoints

#### Google OAuth

**GET** `/api/auth/google`

Initiates Google OAuth login flow.

**Response:** Redirects to Google OAuth page

**cURL:**
```bash
curl -L http://localhost:5000/api/auth/google
```

**GET** `/api/auth/google/callback`

OAuth callback endpoint (handled automatically by Passport.js).

---

#### Facebook OAuth

**GET** `/api/auth/facebook`

Initiates Facebook OAuth login flow.

**Response:** Redirects to Facebook OAuth page

**cURL:**
```bash
curl -L http://localhost:5000/api/auth/facebook
```

**GET** `/api/auth/facebook/callback`

OAuth callback endpoint (handled automatically by Passport.js).

---

#### GitHub OAuth

**GET** `/api/auth/github`

Initiates GitHub OAuth login flow.

**Response:** Redirects to GitHub OAuth page

**cURL:**
```bash
curl -L http://localhost:5000/api/auth/github
```

**GET** `/api/auth/github/callback`

OAuth callback endpoint (handled automatically by Passport.js).

---

### 4. Logout

**POST** `/api/auth/logout`

Logout the current user and destroy session.

**Authentication:** Required (via session cookie)

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -b cookies.txt \
  -c cookies.txt
```

---

### 5. Search Images

**POST** `/api/search`

Search for images using Unsplash API. Requires authentication.

**Authentication:** Required (via session cookie)

**Request Body:**
```json
{
  "term": "nature"
}
```

**Response:**
```json
{
  "term": "nature",
  "total": 10000,
  "results": 30,
  "images": [
    {
      "id": "LBI7cgq3pbM",
      "url": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080",
      "thumb": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200",
      "small": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
      "description": "Beautiful nature landscape",
      "author": "John Smith",
      "authorUrl": "https://unsplash.com/@johnsmith",
      "likes": 1234,
      "width": 1920,
      "height": 1080
    }
  ]
}
```

**Error Response (No term):**
```json
{
  "error": "Search term is required"
}
```

**Error Response (Not Authenticated):**
```json
{
  "error": "Authentication required"
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -d '{"term": "nature"}' \
  -b cookies.txt \
  -c cookies.txt
```

---

### 6. Get Top Searches

**GET** `/api/top-searches`

Get the top 5 most frequent search terms across all users.

**Authentication:** Not required

**Response:**
```json
{
  "topSearches": [
    {
      "term": "nature",
      "count": 45
    },
    {
      "term": "mountains",
      "count": 32
    },
    {
      "term": "ocean",
      "count": 28
    },
    {
      "term": "sunset",
      "count": 25
    },
    {
      "term": "forest",
      "count": 20
    }
  ]
}
```

**Response (No searches yet):**
```json
{
  "topSearches": []
}
```

**cURL:**
```bash
curl http://localhost:5000/api/top-searches
```

---

### 7. Get User Search History

**GET** `/api/history`

Get the authenticated user's search history (last 50 searches).

**Authentication:** Required (via session cookie)

**Response:**
```json
{
  "history": [
    {
      "term": "nature",
      "timestamp": "2024-01-15T10:30:00.000Z"
    },
    {
      "term": "mountains",
      "timestamp": "2024-01-14T15:20:00.000Z"
    },
    {
      "term": "ocean",
      "timestamp": "2024-01-13T09:15:00.000Z"
    }
  ]
}
```

**Error Response (Not Authenticated):**
```json
{
  "error": "Authentication required"
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/history \
  -b cookies.txt \
  -c cookies.txt
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request (missing/invalid parameters)
- `401` - Unauthorized (authentication required)
- `500` - Internal Server Error

---

## Session Management

The application uses Express sessions with cookies. When making requests:

1. First, authenticate via OAuth (redirects automatically)
2. Session cookie is set automatically
3. Include cookies in subsequent requests using `-b cookies.txt -c cookies.txt` in cURL

In browsers, cookies are handled automatically by the browser.

---

## Rate Limits

- **Unsplash API**: 50 requests per hour for demo applications
- **Search Endpoint**: No server-side rate limiting (relies on Unsplash limits)

---

## Notes

- All timestamps are in ISO 8601 format (UTC)
- Image URLs are from Unsplash CDN
- Search history is limited to the last 50 searches per user
- Top searches are calculated in real-time from all search history records

