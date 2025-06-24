const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "news-app",
    brokers: [process.env.KAFKA_BROKER]
});

const producer = kafka.producer();
producer.connect();

const sendMessage = async (topic, message) => {
    await producer.send({
        topic,
        messages: [{ value: message }]
    });
    console.log("Message sent to Kafka:", message);
};

module.exports = { sendMessage };
