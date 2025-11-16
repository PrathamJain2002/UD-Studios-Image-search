# OAuth Callback URLs Fix Guide

## Problem

You're seeing this error from GitHub:
> "The redirect_uri is not associated with this application."

This happens because your GitHub OAuth app is configured with a localhost callback URL, but your app is now deployed to Render.

## Solution: Update OAuth Callback URLs

You need to update the callback URLs in **all three OAuth providers** (Google, Facebook, GitHub) to point to your Render backend URL.

### Your Backend URL
```
https://ud-studios-image-search.onrender.com
```

---

## Step-by-Step Instructions

### 1. GitHub OAuth

1. Go to GitHub → **Settings** → **Developer settings** → **OAuth Apps**
2. Click on your OAuth app
3. Update **Authorization callback URL** to:
   ```
   https://ud-studios-image-search.onrender.com/api/auth/github/callback
   ```
4. Update **Homepage URL** to:
   ```
   https://ud-studios-image-search.vercel.app
   ```
5. Click **Update application**

### 2. Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 Client ID
5. Under **Authorized redirect URIs**, add:
   ```
   https://ud-studios-image-search.onrender.com/api/auth/google/callback
   ```
6. You can keep the localhost one for local development, or remove it
7. Click **Save**

### 3. Facebook OAuth

**Step-by-Step Instructions:**

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **My Apps** in the top right
3. Select your app from the list
4. In the left sidebar, look for **Settings** → **Basic**
   - If you don't see it, try **Products** → **Facebook Login** → **Settings**
5. Scroll down to find these fields:

   **Option A: If you see "Valid OAuth Redirect URIs" field:**
   - Add your callback URL:
     ```
     https://ud-studios-image-search.onrender.com/api/auth/facebook/callback
     ```
   
   **Option B: If you don't see "Valid OAuth Redirect URIs":**
   - Go to **Products** in the left sidebar
   - Find **Facebook Login** (if not added, click **+ Add Product** and add Facebook Login)
   - Click **Facebook Login** → **Settings**
   - Look for **Valid OAuth Redirect URIs** or **OAuth Redirect URIs**
   - Add:
     ```
     https://ud-studios-image-search.onrender.com/api/auth/facebook/callback
     ```

6. **Site URL** (in Settings → Basic):
   - Find the **Site URL** field
   - Update it to:
     ```
     https://ud-studios-image-search.vercel.app
     ```
   - If you don't see Site URL, look for **App Domains** and add:
     ```
     ud-studios-image-search.vercel.app
     ```

7. Click **Save Changes** at the bottom

**Alternative Method (New Facebook Interface):**

If you're using the new Facebook interface:
1. Go to your app dashboard
2. Click **Settings** → **Basic** (left sidebar)
3. Scroll to **App Domains** section
4. Add: `ud-studios-image-search.vercel.app`
5. Go to **Products** → **Facebook Login** → **Settings**
6. Under **Client OAuth Settings**, find **Valid OAuth Redirect URIs**
7. Add: `https://ud-studios-image-search.onrender.com/api/auth/facebook/callback`
8. Click **Save Changes**

**If Facebook Login Product is Not Added:**
1. In your app dashboard, click **+ Add Product** (or **Get Started** next to Facebook Login)
2. Click **Set Up** on Facebook Login
3. This will add the Facebook Login product
4. Then follow the steps above to add the redirect URI

---

## Quick Reference: All Callback URLs

| Provider | Callback URL |
|----------|-------------|
| **GitHub** | `https://ud-studios-image-search.onrender.com/api/auth/github/callback` |
| **Google** | `https://ud-studios-image-search.onrender.com/api/auth/google/callback` |
| **Facebook** | `https://ud-studios-image-search.onrender.com/api/auth/facebook/callback` |

---

## Supporting Both Local and Production

If you want to test locally AND in production, you can add **both** callback URLs:

### GitHub
Add both:
- `http://localhost:5000/api/auth/github/callback` (for local dev)
- `https://ud-studios-image-search.onrender.com/api/auth/github/callback` (for production)

### Google
Add both to **Authorized redirect URIs**:
- `http://localhost:5000/api/auth/google/callback`
- `https://ud-studios-image-search.onrender.com/api/auth/google/callback`

### Facebook
Add both to **Valid OAuth Redirect URIs**:
- `http://localhost:5000/api/auth/facebook/callback`
- `https://ud-studios-image-search.onrender.com/api/auth/facebook/callback`

---

## After Updating

1. **Wait a few minutes** - OAuth providers sometimes cache settings
2. **Clear browser cookies** for your site (optional but recommended)
3. **Try logging in again** from your deployed frontend

---

## Troubleshooting

### Still Getting Errors?

1. **Double-check the URLs** - They must match EXACTLY (including `https://` and no trailing slashes)
2. **Check Render logs** - Make sure your backend is running
3. **Verify environment variables** on Render:
   - `CLIENT_URL` should be: `https://ud-studios-image-search.vercel.app`
   - All OAuth credentials should be set correctly

### Common Mistakes

❌ **Wrong**: `https://ud-studios-image-search.onrender.com/api/auth/github/callback/` (trailing slash)
✅ **Correct**: `https://ud-studios-image-search.onrender.com/api/auth/github/callback`

❌ **Wrong**: `http://ud-studios-image-search.onrender.com/...` (http instead of https)
✅ **Correct**: `https://ud-studios-image-search.onrender.com/...`

❌ **Wrong**: `ud-studios-image-search.onrender.com/...` (missing protocol)
✅ **Correct**: `https://ud-studios-image-search.onrender.com/...`

---

## Testing

After updating all callback URLs:

1. Go to your frontend: `https://ud-studios-image-search.vercel.app`
2. Try logging in with each provider:
   - ✅ Google
   - ✅ Facebook  
   - ✅ GitHub
3. You should be redirected back to your app after successful authentication

---

**Note**: The callback URLs in your code are relative paths (`/api/auth/{provider}/callback`), so they automatically use your Render domain. You only need to update the OAuth provider settings, not the code.

