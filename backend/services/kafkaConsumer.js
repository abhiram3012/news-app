// services/kafkaConsumer.js
const { Kafka } = require('kafkajs');
const ArticleStats = require("../models/ArticleStats"); // import

const kafka = new Kafka({
  clientId: 'user-action-consumer',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'user-action-group' });

const articleStats = {}; // { articleId: { like: X, dislike: Y } }

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-actions', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const msg = message.value.toString();
      try {
        const data = JSON.parse(msg);
        const { articleId, action } = data;
        // inside eachMessage
        const stats = await ArticleStats.findOne({ articleId });
        if (!stats) {
            await ArticleStats.create({
                articleId,
                [action]: 1,
        });
        } else {
            stats[action] += 1;
            await stats.save();
        }

        if (!articleStats[articleId]) {
          articleStats[articleId] = { like: 0, dislike: 0 };
        }

        if (action === 'like' || action === 'dislike') {
          articleStats[articleId][action]++;
        }

        console.clear();
        console.log("📊 Article Stats:");
        console.table(articleStats);
      } catch (err) {
        console.error('❌ Failed to parse message:', msg);
      }
    },
  });
};

module.exports = { run };
