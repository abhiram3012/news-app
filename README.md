# 📰 Personalized News Recommendation System

A real-time, LLM-powered news recommendation platform built with the MERN stack, Apache Kafka, and **Ollama** (Gemma model). This system captures user feedback and leverages local LLM inference via Ollama to generate prompt-based recommendations — without relying on cloud-based APIs.

---

## 🚀 Features

- 🔁 Real-time tracking of user likes/dislikes using Apache Kafka
- 🧠 Local LLM (Gemma via Ollama) for personalized prompt-driven suggestions
- 🌐 MERN Stack: MongoDB, Express, React, Node.js
- 🔒 Runs entirely locally — no external API calls to OpenAI or others
- 🧩 Kafka decouples feedback and inference layers for scalability

---

## 🧱 Tech Stack

| Frontend | Backend | Streaming | LLM Engine | Database |
|----------|---------|-----------|------------|----------|
| React.js | Node.js + Express | Apache Kafka | Ollama (Gemma) | MongoDB |

---

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/abhiram3012/news-recommendation.git
cd news-recommendation
