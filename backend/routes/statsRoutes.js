const express = require("express");
const router = express.Router();
const ArticleStats = require("../models/ArticleStats");

router.get("/top-liked", async (req, res) => {
  try {
    const topArticles = await ArticleStats.find()
      .sort({ like: -1 })
      .limit(10);
    res.json(topArticles);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/top-disliked", async (req, res) => {
  try {
    const topDisliked = await ArticleStats.find()
      .sort({ dislike: -1 })
      .limit(10);
    res.json(topDisliked);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/most-engaged", async (req, res) => {
  try {
    const topEngaged = await ArticleStats.aggregate([
      {
        $addFields: {
          engagement: { $add: ["$like", "$dislike"] }
        }
      },
      { $sort: { engagement: -1 } },
      { $limit: 10 }
    ]);
    res.json(topEngaged);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// ❗ MOVE THIS TO THE BOTTOM
router.get("/:articleId", async (req, res) => {
  try {
    const stats = await ArticleStats.findOne({ articleId: req.params.articleId });
    if (!stats) return res.json({ like: 0, dislike: 0 });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
