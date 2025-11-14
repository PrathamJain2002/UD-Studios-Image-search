const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.warn('Warning: Google OAuth credentials not configured');
}

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('Google profile received:', {
      id: profile.id,
      displayName: profile.displayName,
      email: profile.emails?.[0]?.value,
      hasPhotos: !!profile.photos?.[0]
    });
    
    let user = await User.findOne({ provider: 'google', providerId: profile.id });
    
    if (!user) {
      // Validate required fields
      if (!profile.emails || !profile.emails[0] || !profile.emails[0].value) {
        throw new Error('Google profile missing email');
      }
      
      user = new User({
        provider: 'google',
        providerId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName || 'Google User',
        avatar: profile.photos?.[0]?.value
      });
      await user.save();
      console.log('New Google user created:', user);
    } else {
      console.log('Existing Google user found:', user);
    }
    
    return done(null, user);
  } catch (error) {
    console.error('Google OAuth strategy error:', error);
    return done(error, null);
  }
}));

// Facebook OAuth Strategy
if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) {
  console.warn('Warning: Facebook OAuth credentials not configured');
}

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL || "/api/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('Facebook profile received:', {
      id: profile.id,
      displayName: profile.displayName,
      email: profile.emails?.[0]?.value,
      hasPhotos: !!profile.photos?.[0]
    });
    
    let user = await User.findOne({ provider: 'facebook', providerId: profile.id });
    
    if (!user) {
      user = new User({
        provider: 'facebook',
        providerId: profile.id,
        email: profile.emails?.[0]?.value || `${profile.id}@facebook.com`,
        name: profile.displayName || 'Facebook User',
        avatar: profile.photos?.[0]?.value
      });
      await user.save();
      console.log('New Facebook user created:', user);
    } else {
      console.log('Existing Facebook user found:', user);
    }
    
    return done(null, user);
  } catch (error) {
    console.error('Facebook OAuth strategy error:', error);
    return done(error, null);
  }
}));

// GitHub OAuth Strategy
if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  console.warn('Warning: GitHub OAuth credentials not configured');
}

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL || "/api/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // GitHub profile structure is different - check profile._json for additional data
    console.log('GitHub profile:', JSON.stringify(profile, null, 2));
    
    let user = await User.findOne({ provider: 'github', providerId: profile.id.toString() });
    
    if (!user) {
      // GitHub profile structure: profile.username, profile.displayName, profile._json.avatar_url
      // Email might be in profile.emails array or profile._json.email
      const email = profile.emails?.[0]?.value || 
                   profile._json?.email || 
                   `${profile.username}@github.com`;
      
      const name = profile.displayName || 
                  profile._json?.name || 
                  profile.username || 
                  'GitHub User';
      
      const avatar = profile._json?.avatar_url || 
                    profile.photos?.[0]?.value || 
                    `https://github.com/${profile.username}.png`;
      
      user = new User({
        provider: 'github',
        providerId: profile.id.toString(),
        email: email,
        name: name,
        avatar: avatar
      });
      await user.save();
      console.log('New GitHub user created:', user);
    } else {
      console.log('Existing GitHub user found:', user);
    }
    
    return done(null, user);
  } catch (error) {
    console.error('GitHub OAuth strategy error:', error);
    return done(error, null);
  }
}));

module.exports = passport;

