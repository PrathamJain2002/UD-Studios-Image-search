import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import TopSearches from './TopSearches';
import SearchBar from './SearchBar';
import ImageGrid from './ImageGrid';
import SearchHistory from './SearchHistory';
import API_URL from '../config/api';

const Dashboard = ({ user, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [selectedImages, setSelectedImages] = useState(new Set());
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/history`);
      setHistory(response.data.history);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    }
  };

  const handleSearch = async (term) => {
    if (!term || term.trim() === '') return;
    
    setLoading(true);
    setSelectedImages(new Set());
    
    try {
      const response = await axios.post(`${API_URL}/api/search`, {
        term: term.trim()
      });
      
      setSearchTerm(response.data.term);
      setSearchResults(response.data);
      fetchHistory(); // Refresh history after search
    } catch (error) {
      console.error('Search failed:', error);
      alert('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (imageId) => {
    setSelectedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (searchResults && searchResults.images) {
      if (selectedImages.size === searchResults.images.length) {
        setSelectedImages(new Set());
      } else {
        setSelectedImages(new Set(searchResults.images.map(img => img.id)));
      }
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Image Search</h1>
          <div className="user-info">
            <img 
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} 
              alt={user.name}
              className="user-avatar"
            />
            <span className="user-name">{user.name}</span>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <TopSearches />

      <div className="dashboard-content">
        <main className="main-content">
          <SearchBar onSearch={handleSearch} loading={loading} />
          
          {searchResults && (
            <>
              <div className="search-info">
                <p className="search-message">
                  You searched for <strong>"{searchResults.term}"</strong> — {searchResults.results} results
                </p>
                <div className="selection-controls">
                  <span className="selected-count">
                    Selected: {selectedImages.size} image{selectedImages.size !== 1 ? 's' : ''}
                  </span>
                  {searchResults.images.length > 0 && (
                    <button 
                      className="select-all-btn"
                      onClick={handleSelectAll}
                    >
                      {selectedImages.size === searchResults.images.length ? 'Deselect All' : 'Select All'}
                    </button>
                  )}
                </div>
              </div>
              
              <ImageGrid
                images={searchResults.images}
                selectedImages={selectedImages}
                onImageSelect={handleImageSelect}
              />
            </>
          )}

          {!searchResults && (
            <div className="welcome-message">
              <h2>Welcome, {user.name}!</h2>
              <p>Start searching for images using the search bar above.</p>
            </div>
          )}
        </main>

        <aside className="sidebar">
          <SearchHistory history={history} onSearchClick={handleSearch} />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;

