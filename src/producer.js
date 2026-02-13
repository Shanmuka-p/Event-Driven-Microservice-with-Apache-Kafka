const { producer } = require('./kafkaClient');
const config = require('./config');

const publishEvent = async (event) => {
    try {
        await producer.send({
            topic: config.topic,
            messages: [
                { value: JSON.stringify(event) }
            ],
        });
        console.log(`[PRODUCER] Sent event: ${event.eventId}`);
    } catch (error) {
        console.error('[PRODUCER] Error sending event:', error);
        throw error;
    }
};

module.exports = { publishEvent };