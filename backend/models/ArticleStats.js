// models/ArticleStats.js
const mongoose = require("mongoose");

const ArticleStatsSchema = new mongoose.Schema({
    articleId: String,
    like: { type: Number, default: 0 },
    dislike: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
  });
  

module.exports = mongoose.model("ArticleStats", ArticleStatsSchema);
