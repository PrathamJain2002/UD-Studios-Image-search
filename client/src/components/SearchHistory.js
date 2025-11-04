import React from 'react';
import './SearchHistory.css';

const SearchHistory = ({ history, onSearchClick }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  if (history.length === 0) {
    return (
      <div className="search-history-container">
        <h3 className="history-title">Search History</h3>
        <div className="empty-history">
          <p>No search history yet.</p>
          <p className="empty-hint">Start searching to see your history here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-history-container">
      <h3 className="history-title">Search History</h3>
      <div className="history-list">
        {history.map((item, index) => (
          <div
            key={index}
            className="history-item"
            onClick={() => onSearchClick(item.term)}
          >
            <div className="history-term">{item.term}</div>
            <div className="history-timestamp">{formatDate(item.timestamp)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;

