import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() && !loading) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="search-bar-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Search for images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="search-button"
          disabled={loading || !searchTerm.trim()}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

