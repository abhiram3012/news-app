const express = require("express");
const axios = require("axios");
const NewsArticle = require("../models/NewsArticle");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://newsapi.org/v2/everything", {
            params: {
                domains: "wsj.com",
                apiKey: "d37b71ec77ca4325b9ad79d96c59ee27" // Your API key directly
            }
        });

        const articles = response.data.articles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
            publishedAt: article.publishedAt,
            source: article.source
        }));

        // Prevent duplicates by checking if the article already exists based on the 'url'
        const insertPromises = articles.map(article => {
            return NewsArticle.updateOne(
                { url: article.url },
                { $setOnInsert: article },
                { upsert: true }
            );
        });

        await Promise.all(insertPromises);

        const savedArticles = await NewsArticle.find().limit(20);

        res.json(savedArticles);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch news" });
    }
});

module.exports = router;
