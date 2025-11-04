const express = require('express');
const SearchHistory = require('../models/SearchHistory');
const router = express.Router();

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: 'Authentication required' });
};

// Get user's search history
router.get('/history', isAuthenticated, async (req, res) => {
  try {
    const history = await SearchHistory.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(50)
      .select('term timestamp')
      .lean();

    res.json({ history });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

