const request = require('supertest');
const baseURL = 'http://localhost:3000';

describe('Event Microservice Integration', () => {
    it('should publish an event and consume it', async () => {
        // 1. Publish Event
        const eventData = {
            userId: "test_user_1",
            eventType: "LOGIN",
            payload: { device: "mobile" }
        };

        const res = await request(baseURL)
            .post('/events/generate')
            .send(eventData);

        expect(res.status).toBe(201);
        const eventId = res.body.eventId;

        // 2. Wait for Consumer to process (async nature of Kafka)
        await new Promise(r => setTimeout(r, 2000));

        // 3. Verify Consumption
        const getRes = await request(baseURL).get('/events/processed');

        expect(getRes.status).toBe(200);
        const processedEvents = getRes.body;

        const found = processedEvents.find(e => e.eventId === eventId);
        expect(found).toBeDefined();
        expect(found.userId).toBe("test_user_1");
    }, 10000); // Increased timeout for Kafka
});