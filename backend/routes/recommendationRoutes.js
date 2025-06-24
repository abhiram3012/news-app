const express = require("express");
const router = express.Router();
const axios = require("axios");

const NewsArticle = require("../models/NewsArticle");
const ArticleStats = require("../models/ArticleStats");

router.get("/recommend", async (req, res) => {
  try {
    // Step 1: Generate tags for articles that don't have any
    const untaggedArticles = await NewsArticle.find({ tags: { $exists: false } }).limit(10);

    for (let article of untaggedArticles) {
      const prompt = `Extract 3 relevant tags for this news headline: "${article.title}". Tags should be lowercase, single-word, and related to the topic. Return the tags as a comma-separated list.`;

      const response = await axios.post("http://localhost:11434/api/generate", {
        model: "gemma3:1b", // or whichever model you're running locally
        prompt,
        stream: false
      });

      const tagsRaw = response.data?.response || "";
      const tags = tagsRaw
        .split(",")
        .map(tag => tag.trim().toLowerCase())
        .filter(Boolean);

      article.tags = tags;
      await article.save();
      console.log(`✅ Tagged: ${article.title} => [${tags.join(", ")}]`);
    }

    // Step 2: Fetch top liked article IDs
    const topLiked = await ArticleStats.find().sort({ like: -1 }).limit(5);
    const likedArticleIds = topLiked.map(a => a.articleId);

    const likedArticles = await NewsArticle.find({
      articleId: { $in: likedArticleIds }
    });

    const likedTags = likedArticles.flatMap(article => article.tags || []);
    const uniqueTags = [...new Set(likedTags)];

    console.log(`🔍 Searching using tags: [${uniqueTags.join(", ")}]`);

    // Step 3: Recommend articles with matching tags
    let recommendedArticles = [];

    if (uniqueTags.length > 0) {
      recommendedArticles = await NewsArticle.find({
        articleId: { $nin: likedArticleIds },
        tags: { $in: uniqueTags }
      }).limit(5);
    }

    // Step 4: Fallback if no tag-based recommendations found
    if (recommendedArticles.length === 0) {
      console.log("⚠️ No tag-based matches found. Returning latest articles as fallback.");
      recommendedArticles = await NewsArticle.find({
        articleId: { $nin: likedArticleIds }
      }).sort({ publishedAt: -1 }).limit(5);
    }

    res.json({ recommendations: recommendedArticles });

  } catch (error) {
    console.error("❌ Recommendation error:", error.message || error);
    res.status(500).json({ error: "Failed to generate recommendations" });
  }
});

module.exports = router;
