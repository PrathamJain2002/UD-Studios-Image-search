const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: process.env.CLIENT_URL || 'http://localhost:3000/login' }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL || 'http://localhost:3000');
  }
);

// Facebook OAuth routes
router.get('/facebook',
  passport.authenticate('facebook', { scope: [] })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: process.env.CLIENT_URL || 'http://localhost:3000/login' }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL || 'http://localhost:3000');
  }
);

// GitHub OAuth routes
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: process.env.CLIENT_URL || 'http://localhost:3000/login' }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL || 'http://localhost:3000');
  }
);

// Get current user
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        provider: req.user.provider
      }
    });
  } else {
    res.json({ authenticated: false });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;

