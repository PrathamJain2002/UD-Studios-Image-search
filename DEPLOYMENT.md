# Deployment Guide: Vercel & Render

This guide will help you deploy your Image Search OAuth application to Vercel (frontend) and Render (backend).

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Deploying Backend to Render](#deploying-backend-to-render)
3. [Deploying Frontend to Vercel](#deploying-frontend-to-vercel)
4. [Alternative: Full Stack on Render](#alternative-full-stack-on-render)
5. [Environment Variables Setup](#environment-variables-setup)
6. [OAuth Callback URLs Configuration](#oauth-callback-urls-configuration)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account (for connecting repositories)
- ✅ MongoDB Atlas account (free tier works) or MongoDB database URL
- ✅ OAuth credentials from Google, Facebook, and GitHub
- ✅ Unsplash API access key
- ✅ Vercel account (free tier available)
- ✅ Render account (free tier available)

---

## Deploying Backend to Render

### Step 1: Prepare Your Repository

1. **Push your code to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

### Step 2: Create MongoDB Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist IP addresses (use `0.0.0.0/0` for Render)
5. Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

### Step 3: Deploy Backend on Render

1. **Sign in to Render**: Go to [render.com](https://render.com) and sign in with GitHub

2. **Create a New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing your project

3. **Configure the Service**:
   - **Name**: `image-search-backend` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or choose a paid plan)

4. **Add Environment Variables** (click "Advanced" → "Add Environment Variable"):
   ```
   NODE_ENV=production
   PORT=10000
   CLIENT_URL=https://your-frontend-url.vercel.app
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/image-search-oauth
   SESSION_SECRET=your-very-long-random-secret-string-here
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   FACEBOOK_APP_ID=your-facebook-app-id
   FACEBOOK_APP_SECRET=your-facebook-app-secret
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   UNSPLASH_ACCESS_KEY=your-unsplash-access-key
   ```

5. **Create the Service**: Click "Create Web Service"

6. **Note Your Backend URL**: Render will provide a URL like `https://image-search-backend.onrender.com`

   ⚠️ **Important**: On the free tier, Render services spin down after 15 minutes of inactivity. The first request after spin-down may take 30-60 seconds.

---

## Deploying Frontend to Vercel

### Step 1: Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### Step 2: Deploy via Vercel Dashboard

1. **Sign in to Vercel**: Go to [vercel.com](https://vercel.com) and sign in with GitHub

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Project**:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build` (should auto-detect)
   - **Output Directory**: `build` (should auto-detect)
   - **Install Command**: `npm install`

4. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add:
     ```
     REACT_APP_API_URL=https://your-backend-url.onrender.com
     ```
   - Replace `your-backend-url.onrender.com` with your actual Render backend URL

5. **Deploy**: Click "Deploy"

6. **Note Your Frontend URL**: Vercel will provide a URL like `https://your-project.vercel.app`

### Alternative: Deploy via CLI

```bash
cd client
vercel
# Follow the prompts
# When asked for environment variables, add:
# REACT_APP_API_URL=https://your-backend-url.onrender.com
```

---

## Alternative: Full Stack on Render

If you prefer to host both frontend and backend on Render:

### Backend (Same as above)

Follow the backend deployment steps above.

### Frontend on Render

1. **Create a Static Site**:
   - Click "New +" → "Static Site"
   - Connect your GitHub repository

2. **Configure**:
   - **Name**: `image-search-frontend`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

3. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

4. **Create Static Site**

---

## Environment Variables Setup

### Backend Environment Variables (Render)

Create a `.env` file locally for reference, but **never commit it**. Use Render's environment variables instead:

```env
NODE_ENV=production
PORT=10000
CLIENT_URL=https://your-frontend-url.vercel.app
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/image-search-oauth
SESSION_SECRET=generate-a-long-random-string-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
UNSPLASH_ACCESS_KEY=your-unsplash-access-key
```

### Frontend Environment Variables (Vercel)

```env
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

**Note**: In React, environment variables must start with `REACT_APP_` to be accessible in the browser.

---

## OAuth Callback URLs Configuration

After deployment, update your OAuth provider callback URLs:

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to your OAuth 2.0 Client
3. Add authorized redirect URIs:
   - `https://your-backend-url.onrender.com/api/auth/google/callback`

### Facebook OAuth

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Select your app
3. Settings → Basic
4. Add Valid OAuth Redirect URIs:
   - `https://your-backend-url.onrender.com/api/auth/facebook/callback`
5. Update Site URL:
   - `https://your-frontend-url.vercel.app`

### GitHub OAuth

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Select your OAuth app
3. Update Authorization callback URL:
   - `https://your-backend-url.onrender.com/api/auth/github/callback`
4. Update Homepage URL:
   - `https://your-frontend-url.vercel.app`

---

## Troubleshooting

### Backend Issues

#### MongoDB Connection Errors
- Verify your MongoDB Atlas connection string
- Check that your IP is whitelisted (use `0.0.0.0/0` for Render)
- Ensure database user credentials are correct

#### OAuth Callback Errors
- Verify callback URLs match exactly in OAuth provider settings
- Check that `CLIENT_URL` environment variable matches your frontend URL
- Ensure URLs use `https://` (not `http://`)

#### Session/Cookie Issues
- Verify `SESSION_SECRET` is set and is a long random string
- Check that `NODE_ENV=production` is set (enables secure cookies)
- Ensure CORS is configured correctly with your frontend URL

### Frontend Issues

#### API Connection Errors
- Verify `REACT_APP_API_URL` is set correctly in Vercel
- Check that the backend URL is accessible (try opening it in a browser)
- Ensure CORS is configured on the backend to allow your frontend domain

#### Build Errors
- Check that all dependencies are in `package.json`
- Verify Node.js version compatibility
- Review build logs in Vercel dashboard

### Render Free Tier Limitations

- **Cold Starts**: Services spin down after 15 minutes of inactivity
- **First Request**: May take 30-60 seconds after spin-down
- **Solution**: Use a paid plan or set up a cron job to ping your service

### CORS Issues

If you see CORS errors:

1. **Backend**: Verify `CLIENT_URL` in Render environment variables matches your frontend URL exactly
2. **Frontend**: Ensure `REACT_APP_API_URL` is set correctly
3. **Check**: Both URLs should use `https://` in production

---

## Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables set correctly
- [ ] OAuth callback URLs updated
- [ ] MongoDB connection working
- [ ] Frontend can communicate with backend
- [ ] OAuth login working for all providers
- [ ] Image search functionality working
- [ ] Search history saving correctly

---

## Quick Reference: URLs to Update

After deployment, update these in your OAuth providers:

| Provider | Callback URL |
|----------|-------------|
| Google | `https://your-backend.onrender.com/api/auth/google/callback` |
| Facebook | `https://your-backend.onrender.com/api/auth/facebook/callback` |
| GitHub | `https://your-backend.onrender.com/api/auth/github/callback` |

---

## Need Help?

- **Render Documentation**: https://render.com/docs
- **Vercel Documentation**: https://vercel.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com

---

**Note**: Remember to never commit `.env` files or sensitive credentials to your repository!

