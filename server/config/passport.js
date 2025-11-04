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
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ provider: 'google', providerId: profile.id });
    
    if (!user) {
      user = new User({
        provider: 'google',
        providerId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        avatar: profile.photos[0]?.value
      });
      await user.save();
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/api/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ provider: 'facebook', providerId: profile.id });
    
    if (!user) {
      user = new User({
        provider: 'facebook',
        providerId: profile.id,
        email: profile.emails?.[0]?.value || `${profile.id}@facebook.com`,
        name: profile.displayName,
        avatar: profile.photos?.[0]?.value
      });
      await user.save();
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/api/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ provider: 'github', providerId: profile.id });
    
    if (!user) {
      user = new User({
        provider: 'github',
        providerId: profile.id,
        email: profile.emails?.[0]?.value || `${profile.username}@github.com`,
        name: profile.displayName || profile.username,
        avatar: profile.photos?.[0]?.value
      });
      await user.save();
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

module.exports = passport;

