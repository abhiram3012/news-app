const express = require("express");
const kafka = require("../services/kafkaProducer");

const router = express.Router();

// Send like event to Kafka
router.post("/:id/like", async (req, res) => {
    try {
        kafka.sendMessage("user-actions", JSON.stringify({ articleId: req.params.id, action: "like" }));
        res.json({ message: "Like event sent to Kafka" });
    } catch (err) {
        res.status(500).json({ error: "Kafka error" });
    }
});

// Send dislike event to Kafka
router.post("/:id/dislike", async (req, res) => {
    try {
        kafka.sendMessage("user-actions", JSON.stringify({ articleId: req.params.id, action: "dislike" }));
        res.json({ message: "Dislike event sent to Kafka" });
    } catch (err) {
        res.status(500).json({ error: "Kafka error" });
    }
});

module.exports = router;
