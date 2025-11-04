const express = require('express');
const axios = require('axios');
const SearchHistory = require('../models/SearchHistory');
const router = express.Router();

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: 'Authentication required' });
};

// Search images via Unsplash API
router.post('/search', isAuthenticated, async (req, res) => {
  try {
    const { term } = req.body;
    
    if (!term || term.trim() === '') {
      return res.status(400).json({ error: 'Search term is required' });
    }

    const searchTerm = term.trim();

    // Save search history
    const searchHistory = new SearchHistory({
      userId: req.user._id,
      term: searchTerm,
      timestamp: new Date()
    });
    await searchHistory.save();

    // Fetch images from Unsplash API
    const unsplashUrl = `https://api.unsplash.com/search/photos`;
    const response = await axios.get(unsplashUrl, {
      params: {
        query: searchTerm,
        per_page: 30,
        page: 1
      },
      headers: {
        'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    });

    const images = response.data.results.map(img => ({
      id: img.id,
      url: img.urls.regular,
      thumb: img.urls.thumb,
      small: img.urls.small,
      description: img.description || img.alt_description || 'No description',
      author: img.user.name,
      authorUrl: img.user.links.html,
      likes: img.likes,
      width: img.width,
      height: img.height
    }));

    res.json({
      term: searchTerm,
      total: response.data.total,
      results: images.length,
      images
    });
  } catch (error) {
    console.error('Search error:', error);
    if (error.response) {
      return res.status(error.response.status).json({ 
        error: 'Unsplash API error', 
        message: error.response.data?.errors?.[0] || 'Failed to fetch images' 
      });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get top 5 most frequent search terms
router.get('/top-searches', async (req, res) => {
  try {
    const topSearches = await SearchHistory.aggregate([
      {
        $group: {
          _id: '$term',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      },
      {
        $project: {
          term: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    res.json({ topSearches });
  } catch (error) {
    console.error('Top searches error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

