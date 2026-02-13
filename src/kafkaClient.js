const { Kafka } = require('kafkajs');
const config = require('./config');

const kafka = new Kafka({
    clientId: 'event-driven-microservice',
    brokers: [config.kafkaBroker]
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: config.groupId });

module.exports = { kafka, producer, consumer };