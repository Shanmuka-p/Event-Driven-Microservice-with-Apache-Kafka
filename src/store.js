// In-memory storage
const processedEvents = [];
// Set for O(1) idempotency lookups
const processedEventIds = new Set();

const addEvent = (event) => {
    // IDEMPOTENCY CHECK: If ID exists, skip
    if (processedEventIds.has(event.eventId)) {
        return false;
    }

    processedEvents.push(event);
    processedEventIds.add(event.eventId);
    return true;
};

const getEvents = () => processedEvents;

module.exports = { addEvent, getEvents };