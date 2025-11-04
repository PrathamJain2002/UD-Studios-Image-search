import React from 'react';
import './ImageGrid.css';

const ImageGrid = ({ images, selectedImages, onImageSelect }) => {
  if (!images || images.length === 0) {
    return (
      <div className="no-results">
        <p>No images found. Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="image-grid">
      {images.map((image) => {
        const isSelected = selectedImages.has(image.id);
        return (
          <div
            key={image.id}
            className={`image-card ${isSelected ? 'selected' : ''}`}
            onClick={() => onImageSelect(image.id)}
          >
            <div className="image-wrapper">
              <img
                src={image.url}
                alt={image.description}
                loading="lazy"
                className="grid-image"
              />
              <div className="image-overlay">
                <div className={`checkbox ${isSelected ? 'checked' : ''}`}>
                  {isSelected && (
                    <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  )}
                </div>
              </div>
            </div>
            <div className="image-info">
              <p className="image-description" title={image.description}>
                {image.description || 'No description'}
              </p>
              <div className="image-meta">
                <span className="image-author">by {image.author}</span>
                <span className="image-likes">❤️ {image.likes}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;

