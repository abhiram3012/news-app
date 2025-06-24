const mongoose = require("mongoose");

const NewsArticleSchema = new mongoose.Schema({
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    publishedAt: Date,
    source: { id: String, name: String },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 }
});

module.exports = mongoose.model("NewsArticle", NewsArticleSchema);
