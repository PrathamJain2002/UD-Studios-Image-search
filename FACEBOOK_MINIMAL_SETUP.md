# Facebook OAuth - Minimal Required Setup

## What You Actually Need

You only need **TWO things** for Facebook OAuth to work:

1. ✅ **App Domains** (in Settings → Basic)
2. ✅ **Valid OAuth Redirect URI** (in Facebook Login → Settings)

That's it! Site URL and Platform settings are **optional**.

---

## Step 1: Set App Domains (REQUIRED)

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **My Apps** → Select your app
3. Go to **Settings** → **Basic** (left sidebar)
4. Scroll down to find **App Domains** field
5. Add:
   ```
   ud-studios-image-search.vercel.app
   ```
   - ✅ **Correct**: `ud-studios-image-search.vercel.app`
   - ❌ **Wrong**: `https://ud-studios-image-search.vercel.app` (no https://)
   - ❌ **Wrong**: `ud-studios-image-search.vercel.app/` (no trailing slash)

6. Click **Save Changes**

---

## Step 2: Set Redirect URI (REQUIRED)

1. In your app dashboard, go to **Products** (left sidebar)
2. If you see **Facebook Login**, click it
   - If you DON'T see it, click **+ Add Product** → Find **Facebook Login** → Click **Set Up**
3. Click **Facebook Login** → **Settings**
4. Scroll to **Client OAuth Settings** section
5. Find **Valid OAuth Redirect URIs** field
6. Add:
   ```
   https://ud-studios-image-search.onrender.com/api/auth/facebook/callback
   ```
   - ✅ **Must start with**: `https://`
   - ✅ **Must match exactly** (including the full path)

7. Click **Save Changes**

---

## That's It!

You don't need:
- ❌ Site URL (if field doesn't exist, that's fine)
- ❌ Platform settings (if button doesn't exist, that's fine)
- ❌ Privacy Policy URL (optional)

**Only App Domains + Redirect URI are required!**

---

## Verify It's Working

1. **Wait 5-10 minutes** after saving (Facebook caches settings)
2. **Clear your browser cache**
3. **Try Facebook login** from your app

---

## If You Still Get HTTPS Error

### Check 1: App Domains Format
- Must be: `ud-studios-image-search.vercel.app`
- No `https://`, no `http://`, no trailing slash

### Check 2: Redirect URI Format
- Must be: `https://ud-studios-image-search.onrender.com/api/auth/facebook/callback`
- Must start with `https://` (not `http://`)
- Must include the full path `/api/auth/facebook/callback`

### Check 3: App Status
1. Go to **Settings** → **Basic**
2. Check **App Status** at the top
3. Should be **Live** or **Development** (not disabled)

### Check 4: Facebook Login Product
- Make sure **Facebook Login** product is added
- Go to **Products** → **Facebook Login** → **Settings**
- Verify redirect URI is saved

---

## Troubleshooting

### "I can't find App Domains field"
- It's in **Settings** → **Basic**
- Scroll down - it might be below other fields
- Make sure you're looking at the right app

### "I can't find Facebook Login"
- Click **+ Add Product** (should be visible in Products section)
- Or look for **Get Started** button next to Facebook Login
- If still not visible, your app might need to be in Development mode

### "Redirect URI field is grayed out"
- Make sure **Facebook Login** product is fully set up
- Check if your app is in the correct mode (Development/Live)
- Try refreshing the page

---

## Quick Reference

| What | Where | Value |
|------|-------|-------|
| **App Domains** | Settings → Basic | `ud-studios-image-search.vercel.app` |
| **Redirect URI** | Products → Facebook Login → Settings | `https://ud-studios-image-search.onrender.com/api/auth/facebook/callback` |

---

**Remember**: Facebook primarily checks **App Domains** and **Redirect URI**. If both are set correctly with HTTPS in the redirect URI, it should work even without Site URL or Platform settings.

