# Quick Deployment Guide

## 🚀 Quick Start

### Backend on Render (5 minutes)

1. **Push code to GitHub**
2. **Go to Render.com** → New Web Service
3. **Connect GitHub repo**
4. **Configure**:
   - Root Directory: `server`
   - Build: `npm install`
   - Start: `npm start`
5. **Add Environment Variables** (see DEPLOYMENT.md for full list)
6. **Deploy** → Copy your backend URL

### Frontend on Vercel (3 minutes)

1. **Go to Vercel.com** → Add New Project
2. **Import GitHub repo**
3. **Configure**:
   - Root Directory: `client`
   - Framework: Create React App
4. **Add Environment Variable**:
   - `REACT_APP_API_URL` = `https://your-backend.onrender.com`
5. **Deploy** → Copy your frontend URL

### Update OAuth Callbacks

Update callback URLs in Google, Facebook, and GitHub:
- `https://your-backend.onrender.com/api/auth/{provider}/callback`

---

## 📝 Required Environment Variables

### Backend (Render)
```
NODE_ENV=production
PORT=10000
CLIENT_URL=https://your-frontend.vercel.app
MONGODB_URI=mongodb+srv://...
SESSION_SECRET=random-string
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
FACEBOOK_APP_ID=...
FACEBOOK_APP_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
UNSPLASH_ACCESS_KEY=...
```

### Frontend (Vercel)
```
REACT_APP_API_URL=https://your-backend.onrender.com
```

---

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

