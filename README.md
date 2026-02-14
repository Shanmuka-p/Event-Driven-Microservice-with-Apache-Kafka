# Event-Driven Microservice with Apache Kafka

## Overview

This project is a foundational microservice built using Node.js and Express that acts as both an Apache Kafka producer and consumer. It demonstrates event-driven architecture principles such as asynchronous communication, decoupling, scalability, idempotency, and error handling. The service exposes REST APIs to generate user activity events and retrieve processed events.

## Architecture Diagram

```
+-----------------+      +-----------------+      +-----------------+
|   API Client    |----->|   Node.js API   |<---->|      Kafka      |
+-----------------+      +-----------------+      +-----------------+
                         |    (Producer)   |      |      Topic      |
                         +-----------------+      +-----------------+
                                |
                                v
+-----------------+      +-----------------+
| In-Memory Store |<-----|  Kafka Consumer |
+-----------------+      +-----------------+
```

## Tech Stack

- Node.js
- Express.js
- Apache Kafka
- Zookeeper
- Docker
- Docker Compose
- Jest

## Features

- **Event Generation:** Generate user activity events via a REST API.
- **Event Consumption:** Consume and process events from a Kafka topic.
- **Idempotency:** Ensure that duplicate events are not processed.
- **In-Memory Storage:** Store processed events in memory.
- **Dockerized Environment:** Run the entire stack using Docker Compose.
- **Unit and Integration Tests:** Ensure code quality and reliability.

## Folder Structure

```
.
├── docker-compose.yml
├── Dockerfile
├── package.json
├── src
│   ├── config.js
│   ├── consumer.js
│   ├── index.js
│   ├── kafkaClient.js
│   ├── producer.js
│   └── store.js
└── tests
    ├── integration.test.js
    └── unit
        └── store.test.js
```

## Setup Instructions

1. Clone the repository.
2. Create a `.env` file based on the `.env.example` file.
3. Run `docker-compose up -d` to start the services.

## Environment Variables

| Variable          | Description               | Default Value |
| ----------------- | ------------------------- | ------------- |
| `KAFKA_BROKER`    | Kafka broker address      | `kafka:9092`  |
| `KAFKA_CLIENT_ID` | Kafka client ID           | `my-app`      |
| `KAFKA_TOPIC`     | Kafka topic for events    | `user-events` |
| `PORT`            | Port for the API server   | `3000`        |

## API Documentation

### POST /events/generate

Publishes a `UserEvent` to the Kafka topic.

**Request Body:**

```json
{
  "userId": "user123",
  "eventType": "LOGIN",
  "payload": {
    "ip": "127.0.0.1"
  }
}
```

**Response:**

```json
{
  "message": "Event published successfully",
  "eventId": "e6a5c1f0-1b2f-4c3d-a4e5-f6a7b8c9d0e1"
}
```

### GET /events/processed

Returns all processed events from the in-memory store.

**Response:**

```json
[
  {
    "eventId": "e6a5c1f0-1b2f-4c3d-a4e5-f6a7b8c9d0e1",
    "userId": "user123",
    "eventType": "LOGIN",
    "timestamp": "2023-10-27T10:00:00.000Z",
    "payload": {
      "ip": "127.0.0.1"
    }
  }
]
```

## Example Requests and Responses

**Generate a LOGIN event:**

```bash
curl -X POST http://localhost:3000/events/generate \
-H "Content-Type: application/json" \
-d '{
  "userId": "user456",
  "eventType": "LOGIN",
  "payload": {
    "ip": "192.168.1.1"
  }
}'
```

**Response:**

```json
{
  "message": "Event published successfully",
  "eventId": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
}
```

## Testing Instructions

To run the tests, execute the following command:

```bash
npm run test
```

## Error Handling Strategy

The service includes basic error handling for API requests and Kafka operations. In case of an error, a 500 status code is returned with a descriptive error message.

## Idempotency Explanation

Idempotency is achieved by assigning a unique `eventId` to each event. The consumer checks if an event with the same `eventId` has already been processed before storing it.

## Design Decisions

- **In-Memory Storage:** For simplicity, processed events are stored in memory. In a production environment, a database would be a more suitable choice.
- **Single Service:** Both the producer and consumer are part of the same service. For larger applications, they could be separated into different services.

## Future Improvements

- **Dead Letter Queue (DLQ):** Implement a DLQ for handling failed messages.
- **Database:** Replace in-memory storage with a persistent database like PostgreSQL or MongoDB.
-- **Monitoring:** Add monitoring and logging to track the health of the service.

## How to Run with Docker

```bash
docker-compose up -d
```

## How to Run Tests

```bash
docker-compose exec api npm run test
```

## Screenshots / Demo Section

(Placeholder for screenshots or a demo of the service in action)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.