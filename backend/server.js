require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const newsRoutes = require("./routes/newsRoutes");
const userRoutes = require("./routes/userRoutes");
const kafkaRoutes = require("./routes/kafkaRoutes");
const statsRoutes = require("./routes/statsRoutes");
const recommendationRoutes = require('./routes/recommendationRoutes');

const { run: startKafkaConsumer } = require("./services/kafkaConsumer"); // 👈 Import Kafka consumer

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Kafka Consumer - Start it in background
startKafkaConsumer()
  .then(() => console.log("✅ Kafka consumer running..."))
  .catch((err) => console.error("❌ Failed to start Kafka consumer:", err));

// API Routes
app.use("/api/news", newsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/kafka", kafkaRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/recommend", recommendationRoutes);

// Start Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
