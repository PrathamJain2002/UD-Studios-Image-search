# GitHub OAuth Callback URL Error - Troubleshooting

## The Error

You're seeing:
> "The `redirect_uri` is not associated with this application."

Even after setting the callback URL in GitHub OAuth app settings.

## Common Causes

### 1. Callback URL is Truncated or Incomplete

**Check your GitHub settings:**
- The callback URL must be **exactly**: 
  ```
  https://ud-studios-image-search.onrender.com/api/auth/github/callback
  ```
- Make sure it's not cut off (like `/github/cal` instead of `/github/callback`)
- Make sure there are no trailing spaces

### 2. URL Not Saved Properly

**Steps to fix:**
1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Click on your OAuth app
3. **Delete** the current callback URL completely
4. **Type it fresh** (don't copy-paste):
   ```
   https://ud-studios-image-search.onrender.com/api/auth/github/callback
   ```
5. Click **Update application**
6. **Wait 2-3 minutes** for GitHub to update

### 3. Multiple Callback URLs

If you have multiple callback URLs:
- Make sure the production one is listed
- You can have both:
  - `http://localhost:5000/api/auth/github/callback` (for local dev)
  - `https://ud-studios-image-search.onrender.com/api/auth/github/callback` (for production)

### 4. Case Sensitivity or Special Characters

- Make sure the URL is **exactly** as shown
- No extra spaces before or after
- All lowercase (URLs are case-sensitive for paths)
- Make sure `callback` is spelled correctly (not `cal` or `callbak`)

## Step-by-Step Fix

### Step 1: Verify Current Setting

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Click your app
3. Look at **Authorization callback URL** field
4. **Copy the entire URL** and check:
   - Does it end with `/callback`? (not `/cal` or anything else)
   - Does it start with `https://`?
   - Is it exactly: `https://ud-studios-image-search.onrender.com/api/auth/github/callback`?

### Step 2: Clear and Re-enter

1. **Select all text** in the Authorization callback URL field
2. **Delete it completely**
3. **Type it fresh** (character by character to avoid typos):
   ```
   https://ud-studios-image-search.onrender.com/api/auth/github/callback
   ```
4. **Double-check** it's exactly right
5. Click **Update application**

### Step 3: Wait and Test

1. **Wait 2-3 minutes** (GitHub caches settings)
2. **Clear your browser cache**
3. **Try GitHub login again**

## Verify Your Backend is Running

Make sure your Render backend is accessible:

1. Open in browser: `https://ud-studios-image-search.onrender.com/api/health`
2. You should see: `{"status":"OK","message":"Server is running"}`
3. If it doesn't load, your backend might be down

## Check Your Code

Verify your server is using the correct callback path:

**In `server/config/passport.js`:**
```javascript
callbackURL: process.env.GITHUB_CALLBACK_URL || "/api/auth/github/callback"
```

**In `server/routes/auth.js`:**
```javascript
router.get('/github/callback', ...)
```

The path should be `/api/auth/github/callback` (relative path is fine - it will use your Render domain automatically).

## Common Mistakes

### ❌ Wrong Callback URL
```
https://ud-studios-image-search.onrender.com/api/auth/github/cal
```
**Problem**: Truncated - missing `lback`

### ❌ Wrong Callback URL
```
https://ud-studios-image-search.onrender.com/api/auth/github/callback/
```
**Problem**: Trailing slash

### ❌ Wrong Callback URL
```
http://ud-studios-image-search.onrender.com/api/auth/github/callback
```
**Problem**: Using `http://` instead of `https://`

### ❌ Wrong Callback URL
```
https://ud-studios-image-search.vercel.app/api/auth/github/callback
```
**Problem**: Using frontend URL instead of backend URL

### ✅ Correct Callback URL
```
https://ud-studios-image-search.onrender.com/api/auth/github/callback
```

## Testing Checklist

- [ ] Callback URL is exactly: `https://ud-studios-image-search.onrender.com/api/auth/github/callback`
- [ ] No trailing slash
- [ ] No extra spaces
- [ ] Starts with `https://`
- [ ] Ends with `/callback` (not `/cal` or anything else)
- [ ] Uses Render backend URL (not Vercel frontend URL)
- [ ] Clicked "Update application" button
- [ ] Waited 2-3 minutes
- [ ] Cleared browser cache
- [ ] Backend is running and accessible

## Still Not Working?

### Option 1: Check Render Logs

1. Go to Render dashboard
2. Click on your backend service
3. Check **Logs** tab
4. Look for any errors when you try to login
5. You should see: `GitHub profile received: {...}` if the callback is working

### Option 2: Test the Callback URL Directly

1. Try accessing: `https://ud-studios-image-search.onrender.com/api/auth/github/callback`
2. You should get redirected (this is normal - it expects OAuth parameters)
3. If you get a 404, the route isn't set up correctly

### Option 3: Verify Environment Variables

On Render, check your environment variables:
- `GITHUB_CLIENT_ID` - should be set
- `GITHUB_CLIENT_SECRET` - should be set
- `CLIENT_URL` - should be `https://ud-studios-image-search.vercel.app`

### Option 4: Create a New OAuth App

If nothing works, try creating a fresh OAuth app:
1. Delete the old one (or just create a new one)
2. Set everything from scratch
3. Make sure callback URL is correct from the start

---

**Most Common Issue**: The callback URL is truncated or has a typo. Double-check it's exactly `https://ud-studios-image-search.onrender.com/api/auth/github/callback` with no extra characters.

