const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  term: {
    type: String,
    required: true,
    index: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Index for efficient top searches query
searchHistorySchema.index({ term: 1, timestamp: -1 });

module.exports = mongoose.model('SearchHistory', searchHistorySchema);

