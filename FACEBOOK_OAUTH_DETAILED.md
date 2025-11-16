# Facebook OAuth Settings - Detailed Guide

## Where to Find Facebook OAuth Settings

Facebook's interface can be confusing. Here's exactly where to find everything:

## Method 1: Through Settings → Basic

1. **Go to Facebook Developers**: https://developers.facebook.com/
2. **Click "My Apps"** (top right corner)
3. **Select your app**
4. **In the left sidebar**, click **Settings** → **Basic**
5. Scroll down to find:
   - **App Domains**: Add `ud-studios-image-search.vercel.app`
   - **Site URL**: Add `https://ud-studios-image-search.vercel.app`

## Method 2: Through Facebook Login Product

The redirect URI is usually in the Facebook Login product settings:

1. **In your app dashboard**, look at the left sidebar
2. Find **Products** section
3. Look for **Facebook Login**
   - If you see it, click on it
   - If you DON'T see it, click **+ Add Product** → Find **Facebook Login** → Click **Set Up**
4. Click **Facebook Login** → **Settings**
5. Scroll to **Client OAuth Settings** section
6. Find **Valid OAuth Redirect URIs** field
7. Add:
   ```
   https://ud-studios-image-search.onrender.com/api/auth/facebook/callback
   ```
8. Click **Save Changes**

## Visual Guide

### Step 1: App Dashboard
```
Facebook Developers Dashboard
├── My Apps (top right)
│   └── Your App Name
│       ├── Settings
│       │   └── Basic ← Site URL here
│       └── Products
│           └── Facebook Login ← Redirect URI here
```

### Step 2: Settings → Basic
Look for these fields:
- **App Domains**: `ud-studios-image-search.vercel.app`
- **Site URL**: `https://ud-studios-image-search.vercel.app`
- **Privacy Policy URL**: (optional, but recommended)

### Step 3: Facebook Login → Settings
Look for:
- **Valid OAuth Redirect URIs**: 
  ```
  https://ud-studios-image-search.onrender.com/api/auth/facebook/callback
  ```

## Common Issues

### "I don't see Facebook Login in Products"
**Solution**: 
1. Click **+ Add Product** (or **Get Started** button)
2. Find **Facebook Login**
3. Click **Set Up**
4. Now you'll see Facebook Login in the sidebar

### "I don't see 'Valid OAuth Redirect URIs' field"
**Solution**:
1. Make sure you're in **Facebook Login** → **Settings** (not just Settings → Basic)
2. Scroll down to **Client OAuth Settings** section
3. The field might be called:
   - "Valid OAuth Redirect URIs"
   - "OAuth Redirect URIs"
   - "Redirect URIs"
   - "Client OAuth Login" → "Valid OAuth Redirect URIs"

### "The field is grayed out or disabled"
**Solution**:
1. Make sure your app is in **Development** or **Live** mode
2. Check if you need to add **Facebook Login** product first
3. Some fields require the app to be in a specific mode

## Quick Checklist

- [ ] App Domains set to: `ud-studios-image-search.vercel.app`
- [ ] Site URL set to: `https://ud-studios-image-search.vercel.app`
- [ ] Facebook Login product is added
- [ ] Valid OAuth Redirect URI added: `https://ud-studios-image-search.onrender.com/api/auth/facebook/callback`
- [ ] All changes saved

## Alternative: Using Facebook Login Quickstart

If you're still having trouble:

1. Go to **Facebook Login** → **Quickstart**
2. Select **Web** platform
3. Follow the setup wizard
4. It will guide you to add the redirect URI

## Still Can't Find It?

1. **Take a screenshot** of your Facebook app dashboard
2. Check if your app is in **Development Mode** (might limit some settings)
3. Make sure you're an **Admin** or **Developer** of the app
4. Try a different browser or clear cache

## Important Notes

- **App Domains** should NOT include `https://` or `http://`
- **Site URL** should include `https://`
- **Redirect URI** must match EXACTLY (including `https://` and the full path)
- Changes may take a few minutes to propagate

---

**Need more help?** Facebook's official docs: https://developers.facebook.com/docs/facebook-login/web

