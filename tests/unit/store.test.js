const { addEvent, getEvents, clear } = require('../../src/store');

describe('Event Store Idempotency', () => {
    beforeEach(() => clear());

    test('should store only unique events', () => {
        const event = { eventId: '1', userId: 'u1' };

        expect(addEvent(event)).toBe(true);
        expect(addEvent(event)).toBe(false);

        const events = getEvents();
        expect(events.length).toBe(1);
    });
});