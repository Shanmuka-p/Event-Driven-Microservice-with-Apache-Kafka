require('dotenv').config();

module.exports = {
    kafkaBroker: process.env.KAFKA_BROKER || 'localhost:9092',
    topic: process.env.KAFKA_TOPIC || 'user-activity-events',
    groupId: process.env.KAFKA_GROUP_ID || 'user-activity-consumer-group',
    port: process.env.PORT || 3000
};