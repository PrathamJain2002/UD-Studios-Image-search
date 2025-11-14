import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TopSearches.css';
import API_URL from '../config/api';

const TopSearches = () => {
  const [topSearches, setTopSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopSearches();
    // Refresh every 30 seconds
    const interval = setInterval(fetchTopSearches, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchTopSearches = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/top-searches`);
      setTopSearches(response.data.topSearches);
    } catch (error) {
      console.error('Failed to fetch top searches:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="top-searches-banner">
        <div className="top-searches-content">
          <span className="top-searches-label">Top Searches:</span>
          <span className="loading-text">Loading...</span>
        </div>
      </div>
    );
  }

  if (topSearches.length === 0) {
    return null;
  }

  return (
    <div className="top-searches-banner">
      <div className="top-searches-content">
        <span className="top-searches-label">🔥 Top Searches:</span>
        <div className="top-searches-list">
          {topSearches.map((item, index) => (
            <span key={index} className="top-search-item">
              <span className="search-rank">#{index + 1}</span>
              <span className="search-term">{item.term}</span>
              <span className="search-count">({item.count})</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSearches;

