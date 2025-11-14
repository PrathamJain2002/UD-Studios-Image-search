# CORS Error Fix Guide

## Understanding the Error

The error you're seeing:
```
Access to XMLHttpRequest at 'https://ud-studios-image-search.onrender.com/api/auth/user' 
from origin 'https://ud-studios-image-search.vercel.app' has been blocked by CORS policy: 
The 'Access-Control-Allow-Origin' header has a value 'http://localhost:3000' 
that is not equal to the supplied origin.
```

**What this means:**
- Your frontend is deployed at: `https://ud-studios-image-search.vercel.app`
- Your backend is deployed at: `https://ud-studios-image-search.onrender.com`
- The backend's CORS configuration is set to only allow `http://localhost:3000`
- The browser blocks the request because the origins don't match

## Solution: Update Environment Variables on Render

### Step 1: Update CLIENT_URL on Render

1. Go to your Render dashboard: https://dashboard.render.com
2. Navigate to your backend service (`ud-studios-image-search`)
3. Click on **Environment** tab
4. Find the `CLIENT_URL` environment variable
5. **Update it to**: `https://ud-studios-image-search.vercel.app`
   - Make sure there are no trailing slashes
   - Make sure it's exactly: `https://ud-studios-image-search.vercel.app`
6. Click **Save Changes**
7. Render will automatically redeploy your service

### Step 2: Verify the Change

After redeployment:
1. Check your Render service logs
2. You should see the server start successfully
3. Try accessing your frontend again

## Multiple Origins Support

The updated code now supports multiple origins. If you want to allow both development and production:

**On Render, set CLIENT_URL to:**
```
http://localhost:3000,https://ud-studios-image-search.vercel.app
```

This allows:
- Local development: `http://localhost:3000`
- Production: `https://ud-studios-image-search.vercel.app`

## Quick Checklist

- [ ] Go to Render dashboard
- [ ] Navigate to your backend service
- [ ] Open Environment tab
- [ ] Update `CLIENT_URL` to: `https://ud-studios-image-search.vercel.app`
- [ ] Save changes (service will auto-redeploy)
- [ ] Wait for redeployment to complete
- [ ] Test your frontend again

## Additional Notes

### If You Have Multiple Frontend URLs

If you deploy to multiple domains (e.g., vercel.app and a custom domain), separate them with commas:

```
https://ud-studios-image-search.vercel.app,https://your-custom-domain.com
```

### OAuth Callback URLs

After fixing CORS, also make sure your OAuth callback URLs are updated:

**Google OAuth:**
- Callback URL: `https://ud-studios-image-search.onrender.com/api/auth/google/callback`

**Facebook OAuth:**
- Callback URL: `https://ud-studios-image-search.onrender.com/api/auth/facebook/callback`

**GitHub OAuth:**
- Callback URL: `https://ud-studios-image-search.onrender.com/api/auth/github/callback`

### Testing

After updating, test:
1. Open your frontend: `https://ud-studios-image-search.vercel.app`
2. Check browser console - CORS errors should be gone
3. Try logging in with OAuth
4. Check Network tab - API calls should succeed

---

**Note**: The code has been updated to support multiple origins, so you can now easily add both development and production URLs.

