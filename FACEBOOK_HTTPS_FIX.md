# Facebook HTTPS Security Error Fix

## The Error

Facebook is showing:
> "Facebook has detected that UD Studios image search isn't using a secure connection to transfer information."

## Why This Happens

Facebook requires **HTTPS** for all OAuth connections in production. This error means:
- Your Site URL might be set to `http://` instead of `https://`
- Your App Domains might be incorrect
- Your redirect URI might not be using HTTPS
- Facebook is detecting an insecure connection

## Solution: Update Facebook App Settings

### Step 1: Update App Domains (Required)

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **My Apps** → Select your app
3. Go to **Settings** → **Basic**
4. Find **App Domains** field (this is the main one you need)
5. Add (without https://):
   ```
   ud-studios-image-search.vercel.app
   ```
   - ❌ **Wrong**: `https://ud-studios-image-search.vercel.app`
   - ✅ **Correct**: `ud-studios-image-search.vercel.app`

### Step 2: Alternative Fields (If Site URL Doesn't Exist)

If you don't see "Site URL", look for these alternative fields in **Settings** → **Basic**:

**Note**: The most important fields are:
1. **App Domains** - Must be set correctly
2. **Redirect URI** - Must use HTTPS

**Site URL and Platform settings are OPTIONAL**. If those fields/buttons don't exist in your Facebook app interface, that's completely fine! Facebook will work with just App Domains and the HTTPS redirect URI.

### Step 3: Verify Redirect URI is HTTPS

1. Go to **Products** → **Facebook Login** → **Settings**
2. Find **Valid OAuth Redirect URIs**
3. Make sure it's HTTPS:
   ```
   https://ud-studios-image-search.onrender.com/api/auth/facebook/callback
   ```
   - ❌ **Wrong**: `http://ud-studios-image-search.onrender.com/...`
   - ✅ **Correct**: `https://ud-studios-image-search.onrender.com/...`

### Step 4: Check App Settings

1. In **Settings** → **Basic**, scroll down
2. Make sure **App Mode** is set correctly:
   - For production: Should be **Live** (if your app is public)
   - For testing: Can be **Development**

### Step 5: Save and Wait

1. Click **Save Changes**
2. **Wait 5-10 minutes** for Facebook to update
3. Clear your browser cache
4. Try logging in again

## Quick Checklist

- [ ] **App Domains** is set to: `ud-studios-image-search.vercel.app` (without https://)
- [ ] **Redirect URI** uses `https://` (not `http://`)
- [ ] **Website Platform** added (if Site URL doesn't exist)
- [ ] All changes saved
- [ ] Waited 5-10 minutes for propagation
- [ ] Cleared browser cache

## Verify Your URLs

Make sure all these are correct:

| Setting | Value | Required? |
|---------|-------|------------|
| **App Domains** | `ud-studios-image-search.vercel.app` | ✅ **REQUIRED** |
| **Redirect URI** | `https://ud-studios-image-search.onrender.com/api/auth/facebook/callback` | ✅ **REQUIRED** |
| **Site URL** | `https://ud-studios-image-search.vercel.app` | ⚠️ Optional (if field exists) |
| **Website Platform** | `https://ud-studios-image-search.vercel.app` | ⚠️ Alternative to Site URL |

## Common Mistakes

### ❌ Wrong Site URL
```
http://ud-studios-image-search.vercel.app
```
**Problem**: Missing 's' in https

### ❌ Wrong App Domains
```
https://ud-studios-image-search.vercel.app
```
**Problem**: Should NOT include https://

### ❌ Wrong Redirect URI
```
http://ud-studios-image-search.onrender.com/api/auth/facebook/callback
```
**Problem**: Using HTTP instead of HTTPS

## Additional Checks

### 1. Verify Your Backend is Using HTTPS

Check your Render service:
- Render automatically provides HTTPS
- Your backend URL should be: `https://ud-studios-image-search.onrender.com`
- If it's not HTTPS, there's a problem with your Render deployment

### 2. Verify Your Frontend is Using HTTPS

Check your Vercel deployment:
- Vercel automatically provides HTTPS
- Your frontend URL should be: `https://ud-studios-image-search.vercel.app`
- If it's not HTTPS, check your Vercel settings

### 3. Check Facebook App Status

1. Go to **Settings** → **Basic**
2. Check **App Status**:
   - Should be **Live** for production
   - Or **Development** for testing
3. Make sure your app is not restricted or disabled

## Still Not Working?

### Option 1: Re-check All Settings

1. Double-check every URL uses `https://` (except App Domains)
2. Make sure there are no typos
3. Ensure no trailing slashes

### Option 2: Test in Browser

1. Open your frontend: `https://ud-studios-image-search.vercel.app`
2. Check the browser address bar - it should show a lock icon (🔒)
3. If it shows "Not Secure", there's an HTTPS issue

### Option 3: Check Render/Vercel Settings

**Render:**
- Render automatically provides HTTPS
- Check your Render service logs
- Make sure the service is running

**Vercel:**
- Vercel automatically provides HTTPS
- Check your Vercel deployment
- Make sure the deployment is successful

## Testing

After updating:

1. **Wait 5-10 minutes** (Facebook caches settings)
2. **Clear browser cache and cookies**
3. **Try Facebook login again**
4. **Check browser console** for any errors

## If You're Still Getting the Error

1. **Screenshot your Facebook app settings** (Settings → Basic)
2. **Check your browser's address bar** - does it show HTTPS?
3. **Verify Render service is running** and accessible via HTTPS
4. **Check Facebook App Review status** - some features require app review

---

**Important**: Facebook is very strict about HTTPS. Make sure EVERY URL uses `https://` (except App Domains which should NOT have a protocol).

