# GitHub OAuth Troubleshooting Guide

## Common Issues and Solutions

### 1. Check Environment Variables

Make sure your `.env` file in the `server` directory has:

```env
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

**To verify:**
- Check your server console when it starts - it will warn if credentials are missing
- Make sure there are no extra spaces or quotes around the values

### 2. Verify GitHub OAuth App Settings

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Check your OAuth app configuration:
   - **Authorization callback URL** must be exactly: `http://localhost:5000/api/auth/github/callback`
   - Make sure the Client ID and Client Secret match your `.env` file

### 3. Check Server Console Logs

After the fix, the server will now log:
- The full GitHub profile structure
- Any errors that occur during authentication
- Whether a new user was created or existing user found

**Look for these messages:**
- `GitHub profile: {...}` - Shows the profile data received
- `GitHub OAuth error: ...` - Shows authentication errors
- `New GitHub user created: ...` - Confirms user creation
- `GitHub OAuth strategy error: ...` - Shows strategy-level errors

### 4. Common Error Scenarios

#### Error: "Authentication failed"
- **Cause**: GitHub credentials are incorrect or callback URL mismatch
- **Solution**: 
  - Verify Client ID and Secret in `.env`
  - Check callback URL in GitHub OAuth app settings matches exactly

#### Error: "Login failed" 
- **Cause**: Session/cookie issue
- **Solution**:
  - Check `SESSION_SECRET` is set in `.env`
  - Clear browser cookies and try again
  - Make sure MongoDB is connected

#### Error: Database validation error
- **Cause**: Missing required fields (email, name)
- **Solution**: 
  - The updated code now has better fallbacks for missing data
  - Check console logs to see what profile data is received

### 5. Test the Flow

1. **Start your server**: `cd server && npm start`
2. **Check console**: Should see "MongoDB connected" and no warnings about GitHub credentials
3. **Try GitHub login**: Click "Sign in with GitHub"
4. **Watch console**: You should see the GitHub profile logged
5. **Check response**: Should redirect to your frontend, not show JSON error

### 6. Debug Steps

If still getting errors:

1. **Check MongoDB connection**:
   ```bash
   # Test if MongoDB is running
   # If using local MongoDB:
   mongosh
   # If using Atlas, check connection string
   ```

2. **Verify the callback is being hit**:
   - The URL `http://localhost:5000/api/auth/github/callback?code=...` should be called
   - Check server logs when this URL is accessed

3. **Test with curl** (optional):
   ```bash
   # This won't work for OAuth, but you can test if server is running:
   curl http://localhost:5000/api/health
   ```

4. **Check browser console**:
   - Open browser DevTools → Network tab
   - Try GitHub login
   - Check what response you get from the callback

### 7. Profile Data Structure

The updated code now handles different GitHub profile structures:
- `profile.username` - GitHub username
- `profile.displayName` - Display name (may be null)
- `profile._json.name` - Full name from GitHub API
- `profile._json.avatar_url` - Avatar URL
- `profile.emails[0].value` - Email (if available with user:email scope)
- `profile._json.email` - Email from profile (if public)

### 8. Still Not Working?

If you're still getting errors after trying the above:

1. **Share the console output** - The new logging will show exactly what's happening
2. **Check the error message** - The improved error handling shows more details in development mode
3. **Verify all environment variables** are set correctly
4. **Make sure MongoDB is running** and accessible

---

## Quick Checklist

- [ ] `GITHUB_CLIENT_ID` set in `.env`
- [ ] `GITHUB_CLIENT_SECRET` set in `.env`
- [ ] GitHub OAuth app callback URL matches: `http://localhost:5000/api/auth/github/callback`
- [ ] MongoDB is connected (check server logs)
- [ ] Server restarted after making changes
- [ ] Browser cookies cleared (if session issues)
- [ ] Check server console for detailed error messages

---

## What Changed in the Fix

1. **Better error handling**: Now shows detailed errors in development mode
2. **Improved profile parsing**: Handles different GitHub profile structures
3. **Better logging**: Logs the full profile to help debug
4. **Fallback values**: Uses fallbacks if email/name/avatar are missing
5. **Type conversion**: Converts profile.id to string to match schema

Try the GitHub login again and check your server console for the detailed logs!

