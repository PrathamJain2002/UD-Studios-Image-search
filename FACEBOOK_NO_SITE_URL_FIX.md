# Facebook OAuth Fix - When Site URL Field Doesn't Exist

## The Problem

You're getting the HTTPS error, but you **don't see a "Site URL" field** in Facebook app settings.

## Solution: App Domains is the Key Field

**The most important field is "App Domains"** - this is what Facebook uses to verify your domain.

### Step-by-Step Fix

1. **Go to Facebook Developers**: https://developers.facebook.com/
2. **Click "My Apps"** (top right) → Select your app
3. **Go to Settings → Basic** (left sidebar)
4. **Find "App Domains" field**
5. **Add your domain** (without https://):
   ```
   ud-studios-image-search.vercel.app
   ```
6. **Save Changes**

### Add Website Platform (Alternative to Site URL)

If you want to add a website URL (similar to Site URL):

1. In **Settings → Basic**, scroll down
2. Look for **+ Add Platform** button
3. Click it → Select **Website**
4. Enter:
   ```
   https://ud-studios-image-search.vercel.app
   ```
5. **Save Changes**

### Most Important: Redirect URI

The redirect URI **MUST** use HTTPS:

1. Go to **Products → Facebook Login → Settings**
2. Find **Valid OAuth Redirect URIs**
3. Make sure it's:
   ```
   https://ud-studios-image-search.onrender.com/api/auth/facebook/callback
   ```
   - Must start with `https://`
   - Must match exactly

## What Facebook Actually Checks

Facebook checks these in order:
1. ✅ **App Domains** - Must match your domain
2. ✅ **Redirect URI** - Must use HTTPS
3. ⚠️ **Site URL/Website Platform** - Optional, but helpful

## If You Still Get the Error

### Check 1: App Domains Format
- ✅ **Correct**: `ud-studios-image-search.vercel.app`
- ❌ **Wrong**: `https://ud-studios-image-search.vercel.app`
- ❌ **Wrong**: `ud-studios-image-search.vercel.app/`

### Check 2: Redirect URI Format
- ✅ **Correct**: `https://ud-studios-image-search.onrender.com/api/auth/facebook/callback`
- ❌ **Wrong**: `http://ud-studios-image-search.onrender.com/...`
- ❌ **Wrong**: Missing `/api/auth/facebook/callback`

### Check 3: App Status
1. Go to **Settings → Basic**
2. Check **App Status**:
   - Should be **Live** (if public)
   - Or **Development** (if testing)
3. Make sure app is not disabled

### Check 4: Facebook Login Product
1. Make sure **Facebook Login** product is added
2. Go to **Products → Facebook Login → Settings**
3. Verify redirect URI is set correctly

## Minimal Required Settings

For Facebook OAuth to work, you **MUST** have:

1. ✅ **App Domains**: `ud-studios-image-search.vercel.app`
2. ✅ **Redirect URI**: `https://ud-studios-image-search.onrender.com/api/auth/facebook/callback`
3. ✅ **App ID** and **App Secret** (in your backend .env)

**Site URL is optional** - if the field doesn't exist, that's fine!

## Testing After Fix

1. **Save all changes**
2. **Wait 5-10 minutes** (Facebook caches settings)
3. **Clear browser cache and cookies**
4. **Try Facebook login again**

## Still Not Working?

### Verify Your Backend is HTTPS

1. Open in browser: `https://ud-studios-image-search.onrender.com/api/health`
2. Check the address bar - should show 🔒 (lock icon)
3. If it shows "Not Secure", there's an HTTPS issue with Render

### Verify Your Frontend is HTTPS

1. Open in browser: `https://ud-studios-image-search.vercel.app`
2. Check the address bar - should show 🔒 (lock icon)
3. If it shows "Not Secure", there's an HTTPS issue with Vercel

### Check Facebook App Review

1. Go to **App Review** in left sidebar
2. Some permissions might require app review
3. For basic login, you usually don't need review

---

**Remember**: **App Domains** is the most important field. If that's set correctly with HTTPS redirect URI, Facebook should accept the connection even without Site URL.

