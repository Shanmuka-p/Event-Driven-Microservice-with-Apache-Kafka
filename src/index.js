const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { producer } = require('./kafkaClient');
const { publishEvent } = require('./producer');
const { startConsumer } = require('./consumer');
const store = require('./store');
const config = require('./config');

const app = express();
app.use(bodyParser.json());

// 1. GENERATE EVENT API
app.post('/events/generate', async (req, res) => {
    const { userId, eventType, payload } = req.body;

    if (!userId || !eventType) {
        return res.status(400).json({ error: 'userId and eventType are required' });
    }

    const newEvent = {
        eventId: uuidv4(),
        userId,
        eventType,
        timestamp: new Date().toISOString(),
        payload: payload || {}
    };

    try {
        await publishEvent(newEvent);
        res.status(201).json({
            message: 'Event published',
            eventId: newEvent.eventId
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to publish event' });
    }
});

// 2. QUERY PROCESSED EVENTS API
app.get('/events/processed', (req, res) => {
    const events = store.getEvents();
    res.json(events);
});

// STARTUP SEQUENCE
const start = async () => {
    try {
        // Connect to Kafka
        await producer.connect();
        console.log('[KAFKA] Producer connected');

        // Start Consumer
        await startConsumer();
        console.log('[KAFKA] Consumer started');

        // Start HTTP Server
        app.listen(config.port, () => {
            console.log(`[SERVER] Running on port ${config.port}`);
        });
    } catch (error) {
        console.error('Failed to start service:', error);
        process.exit(1);
    }
};

start();