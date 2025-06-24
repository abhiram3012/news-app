const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    likedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: "NewsArticle" }],
    dislikedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: "NewsArticle" }]
});

module.exports = mongoose.model("User", UserSchema);
