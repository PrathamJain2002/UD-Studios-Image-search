# Image Search & Multi-Select - MERN + OAuth Project

A full-stack MERN application with OAuth authentication that allows users to search images from Unsplash API, select multiple images, view top searches, and maintain a personal search history.

## 🎯 Features

- **OAuth Authentication**: Login with Google, Facebook, or GitHub using Passport.js
- **Image Search**: Search images from Unsplash API (authentication required)
- **Top Searches Banner**: Display top 5 most frequent search terms across all users
- **Multi-Select Grid**: 4-column responsive grid with checkbox overlays for image selection
- **Selection Counter**: Dynamic counter showing number of selected images
- **Search History**: Personal search history sidebar with clickable search terms
- **Responsive Design**: Modern UI that works on desktop, tablet, and mobile

## 📁 Project Structure

```
UD Studios Image search+OAuth/
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Dashboard.js
│   │   │   ├── TopSearches.js
│   │   │   ├── SearchBar.js
│   │   │   ├── ImageGrid.js
│   │   │   └── SearchHistory.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── server/                 # Express backend
│   ├── config/
│   │   └── passport.js     # OAuth strategies
│   ├── models/
│   │   ├── User.js
│   │   └── SearchHistory.js
│   ├── routes/
│   │   ├── auth.js         # OAuth routes
│   │   ├── search.js       # Search & top-searches endpoints
│   │   └── history.js      # User history endpoint
│   ├── server.js
│   └── package.json
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- OAuth credentials from Google, Facebook, and GitHub
- Unsplash API access key

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `server` directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/image-search-oauth
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/image-search-oauth

# Session Secret (generate a random string)
SESSION_SECRET=your-session-secret-key-here-change-in-production

# OAuth Credentials - Google
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# OAuth Credentials - Facebook
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret

# OAuth Credentials - GitHub
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Unsplash API
UNSPLASH_ACCESS_KEY=your-unsplash-access-key
```

4. Start the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the React app:
```bash
npm start
```

The app will run on `http://localhost:3000`

## 🔑 Getting OAuth Credentials

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Select "Web application"
6. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
7. Copy Client ID and Client Secret

### Facebook OAuth

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add "Facebook Login" product
4. Go to Settings → Basic
5. Add site URL: `http://localhost:3000`
6. Add valid OAuth redirect URI: `http://localhost:5000/api/auth/facebook/callback`
7. Copy App ID and App Secret

### GitHub OAuth

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Application name: Your app name
4. Homepage URL: `http://localhost:3000`
5. Authorization callback URL: `http://localhost:5000/api/auth/github/callback`
6. Copy Client ID and Client Secret

### Unsplash API

1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create a new application
3. Copy the Access Key

## 📡 API Endpoints

### Authentication Endpoints

#### GET `/api/auth/google`
Initiates Google OAuth login

#### GET `/api/auth/google/callback`
Google OAuth callback (handled by Passport)

#### GET `/api/auth/facebook`
Initiates Facebook OAuth login

#### GET `/api/auth/facebook/callback`
Facebook OAuth callback (handled by Passport)

#### GET `/api/auth/github`
Initiates GitHub OAuth login

#### GET `/api/auth/github/callback`
GitHub OAuth callback (handled by Passport)

#### GET `/api/auth/user`
Get current authenticated user

**Response:**
```json
{
  "authenticated": true,
  "user": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "avatar": "https://...",
    "provider": "google"
  }
}
```

#### POST `/api/auth/logout`
Logout current user

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

### Search Endpoints

#### POST `/api/search`
Search images from Unsplash (requires authentication)

**Headers:**
- Cookie: Session cookie (set automatically)

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
      "id": "image_id",
      "url": "https://images.unsplash.com/...",
      "thumb": "https://images.unsplash.com/...",
      "small": "https://images.unsplash.com/...",
      "description": "Image description",
      "author": "Author Name",
      "authorUrl": "https://unsplash.com/@author",
      "likes": 123,
      "width": 1920,
      "height": 1080
    }
  ]
}
```

#### GET `/api/top-searches`
Get top 5 most frequent search terms (no authentication required)

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
    }
  ]
}
```

### History Endpoints

#### GET `/api/history`
Get authenticated user's search history

**Headers:**
- Cookie: Session cookie (requires authentication)

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
    }
  ]
}
```

## 📝 cURL Examples

### Get Current User
```bash
curl -X GET http://localhost:5000/api/auth/user \
  -b cookies.txt \
  -c cookies.txt
```

### Search Images
```bash
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -d '{"term": "nature"}' \
  -b cookies.txt \
  -c cookies.txt
```

### Get Top Searches
```bash
curl -X GET http://localhost:5000/api/top-searches
```

### Get Search History
```bash
curl -X GET http://localhost:5000/api/history \
  -b cookies.txt \
  -c cookies.txt
```

### Logout
```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -b cookies.txt \
  -c cookies.txt
```

## 🎨 Features in Detail

### Top Searches Banner
- Displays at the top of the dashboard
- Shows top 5 most frequent search terms across all users
- Auto-refreshes every 30 seconds
- Shows search count for each term

### Search Functionality
- Authenticated users can search images
- Results displayed in a 4-column responsive grid
- Shows "You searched for X — N results" message
- Each search is saved to user's history

### Multi-Select
- Checkbox overlay on each image
- Click image to select/deselect
- "Select All" / "Deselect All" button
- Dynamic counter: "Selected: X images"
- Selected images highlighted with border

### Search History
- Personal search history in sidebar
- Clickable search terms to re-search
- Shows relative timestamps (e.g., "2h ago", "3d ago")
- Sticky sidebar for easy access

## 🛠️ Technologies Used

### Backend
- **Express.js**: Web framework
- **MongoDB + Mongoose**: Database and ODM
- **Passport.js**: Authentication middleware
- **Passport Google OAuth20**: Google authentication
- **Passport Facebook**: Facebook authentication
- **Passport GitHub2**: GitHub authentication
- **Express Session**: Session management
- **Axios**: HTTP client for Unsplash API
- **CORS**: Cross-origin resource sharing

### Frontend
- **React**: UI library
- **React Router DOM**: Routing
- **Axios**: HTTP client
- **React Icons**: Icon library

## 📸 Screenshots

The application includes:
1. **OAuth Login Page**: Beautiful login page with Google, Facebook, and GitHub buttons
2. **Top Searches Banner**: Purple gradient banner showing top 5 searches
3. **Dashboard**: Search bar, image grid, and history sidebar
4. **Multi-Select Grid**: 4-column grid with checkbox overlays
5. **Search History**: Sidebar with clickable history items

## 🔒 Security Notes

- Session cookies are httpOnly and secure in production
- OAuth credentials should never be committed to version control
- Use environment variables for all sensitive data
- MongoDB connection string should be kept secure

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or MongoDB Atlas connection string is correct
- Check firewall settings if using cloud MongoDB

### OAuth Callback Errors
- Verify callback URLs match exactly in OAuth provider settings
- Ensure `CLIENT_URL` in `.env` matches your frontend URL

### CORS Issues
- Check that `CLIENT_URL` in server `.env` matches your React app URL
- Ensure credentials are enabled in axios requests

### Unsplash API Errors
- Verify API key is correct
- Check API rate limits (50 requests per hour for demo apps)

## 📄 License

This project is created for internship/educational purposes.

## 👤 Author

Created as part of UD Studios internship task.

---

**Note**: Remember to add your `.env` files to `.gitignore` and never commit sensitive credentials!

