const express = require("express");
const NewsArticle = require("../models/NewsArticle");

const router = express.Router();

// Like an article
router.post("/:id/like", async (req, res) => {
    try {
        const article = await NewsArticle.findById(req.params.id);
        if (!article) return res.status(404).json({ error: "Article not found" });

        article.likes += 1;
        await article.save();
        res.json({ message: "Liked", likes: article.likes });
    } catch (err) {
        res.status(500).json({ error: "Error liking article" });
    }
});

// Dislike an article
router.post("/:id/dislike", async (req, res) => {
    try {
        const article = await NewsArticle.findById(req.params.id);
        if (!article) return res.status(404).json({ error: "Article not found" });

        article.dislikes += 1;
        await article.save();
        res.json({ message: "Disliked", dislikes: article.dislikes });
    } catch (err) {
        res.status(500).json({ error: "Error disliking article" });
    }
});

module.exports = router;
