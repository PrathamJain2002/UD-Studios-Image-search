const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
      if (err) {
        console.error('Google OAuth error:', err);
        return res.status(500).json({ 
          error: 'Authentication failed', 
          details: process.env.NODE_ENV === 'development' ? err.message : undefined 
        });
      }
      if (!user) {
        console.error('Google OAuth: No user returned', info);
        return res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/login?error=auth_failed`);
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error('Login error:', err);
          return res.status(500).json({ 
            error: 'Login failed', 
            details: process.env.NODE_ENV === 'development' ? err.message : undefined 
          });
        }
        return res.redirect(process.env.CLIENT_URL || 'http://localhost:3000');
      });
    })(req, res, next);
  }
);

// Facebook OAuth routes
router.get('/facebook',
  passport.authenticate('facebook', { scope: [] })
);

router.get('/facebook/callback',
  (req, res, next) => {
    passport.authenticate('facebook', (err, user, info) => {
      if (err) {
        console.error('Facebook OAuth error:', err);
        return res.status(500).json({ 
          error: 'Authentication failed', 
          details: process.env.NODE_ENV === 'development' ? err.message : undefined 
        });
      }
      if (!user) {
        console.error('Facebook OAuth: No user returned', info);
        return res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/login?error=auth_failed`);
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error('Login error:', err);
          return res.status(500).json({ 
            error: 'Login failed', 
            details: process.env.NODE_ENV === 'development' ? err.message : undefined 
          });
        }
        return res.redirect(process.env.CLIENT_URL || 'http://localhost:3000');
      });
    })(req, res, next);
  }
);

// GitHub OAuth routes
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback',
  (req, res, next) => {
    passport.authenticate('github', (err, user, info) => {
      if (err) {
        console.error('GitHub OAuth error:', err);
        return res.status(500).json({ 
          error: 'Authentication failed', 
          details: process.env.NODE_ENV === 'development' ? err.message : undefined 
        });
      }
      if (!user) {
        console.error('GitHub OAuth: No user returned', info);
        return res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/login?error=auth_failed`);
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error('Login error:', err);
          return res.status(500).json({ 
            error: 'Login failed', 
            details: process.env.NODE_ENV === 'development' ? err.message : undefined 
          });
        }
        return res.redirect(process.env.CLIENT_URL || 'http://localhost:3000');
      });
    })(req, res, next);
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

