const { consumer } = require('./kafkaClient');
const config = require('./config');
const store = require('./store');

const startConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: config.topic, fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            try {
                const event = JSON.parse(message.value.toString());

                // Idempotency check happens inside addEvent
                const isNew = store.addEvent(event);

                if (isNew) {
                    console.log(`[CONSUMER] Processed: ${event.eventId} | ${event.eventType} | ${event.userId}`);
                } else {
                    console.log(`[CONSUMER] Duplicate skipped: ${event.eventId}`);
                }
            } catch (error) {
                console.error('[CONSUMER] Error processing message:', error);
                // In production, you would send this to a Dead Letter Queue (DLQ)
            }
        },
    });
};

module.exports = { startConsumer };