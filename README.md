# Event-Driven-Microservice-with-Apache-Kafka
Objective
Build a foundational microservice that acts as both an Apache Kafka producer and consumer. This task aims to provide deep, practical experience with event-driven architecture, a critical paradigm for building scalable and resilient distributed systems. You will learn Apache Kafka fundamentals, including topics, producers, consumers, consumer groups, and message serialization. Furthermore, you will implement core concepts of event definition, publishing, and consumption, alongside handling idempotency and basic error management in a distributed messaging environment. This project will solidify your skills in building resilient, scalable backend components crucial for modern high-performing applications and prepare you for advanced backend engineering roles.

Description
Background
Modern distributed systems require scalable and fault-tolerant communication mechanisms. Traditional synchronous API calls can become bottlenecks and introduce tight coupling between services. Event-driven architectures, powered by message brokers like Apache Kafka, offer a robust solution by decoupling services and enabling asynchronous communication. This approach is fundamental for building highly performant and resilient microservices.

In this task, you will build a core microservice that embodies event-driven principles. This service will act as both a producer, publishing events, and a consumer, processing events. This pattern is common in scenarios like user activity tracking, log aggregation, or real-time data processing, where responsiveness and eventual consistency are critical. Mastering this pattern is essential for any backend developer aiming for senior roles in companies building large-scale, distributed applications.

Implementation Guidelines
To successfully complete this task, consider the following architectural and design guidelines. Your focus should be on creating a robust, maintainable, and observable event-driven component.

Service Architecture
Design a single microservice with distinct components for API handling, Kafka production, and Kafka consumption. Ensure clear separation of concerns, allowing for independent development and testing of each part.

Event-Driven Principles
Adhere to event-driven principles: events should be immutable facts, and consumers should be designed for idempotency. Each event should represent a significant change of state within the system and contain all necessary data for its consumers to process it without requiring additional lookups to the original source.

Message Broker Integration
Utilize Apache Kafka as your central message broker. Understand the concepts of topics, partitions, producers, consumers, and consumer groups. Your producer should be resilient to temporary Kafka unavailability, and your consumer should be able to resume processing from the last committed offset.

Data Persistence
For the consumer's processed events, use a simple in-memory data structure. While production systems would use a database, the focus here is on event processing and idempotency, so an in-memory store is sufficient to demonstrate functionality.

Error Handling and Resiliency
Implement comprehensive error handling for both Kafka producer and consumer operations. For the producer, this includes handling failed message deliveries. For the consumer, this involves gracefully managing malformed messages or processing failures without crashing. Consider retry mechanisms for transient errors.

API Design
Design a clean, RESTful API endpoint for generating events. Ensure appropriate HTTP status codes and clear request/response payloads. For the endpoint querying processed events, use a simple GET request returning a JSON array.

Containerization
The entire solution, including Kafka and Zookeeper, must be containerized using Docker and orchestrated with Docker Compose. This ensures a consistent development and evaluation environment. Define appropriate health checks for all services.

Testing
Implement both unit and integration tests. Unit tests should cover individual components like event publishing logic, event processing logic, and idempotency checks. Integration tests should verify the end-to-end flow: event generation, Kafka communication, and event consumption/storage.

Implementation Details
This section outlines the specific steps and structural requirements for your project.

#### Phase 1 (Days 1-2): Setup and Producer Service
Objective: Set up the development environment, Docker Compose for Kafka, and implement the API endpoint to publish events.

#### Step 1.1: Project Initialization and Docker Setup
Initialize a new project using your preferred language (Node.js/Express, Python/FastAPI, Java/Spring Boot).
Create a docker-compose.yml file in the root directory. This file must define:
zookeeper service (e.g., confluentinc/cp-zookeeper:7.4.0)
kafka service (e.g., confluentinc/cp-kafka:7.4.0) linked to Zookeeper
Your application service (e.g., app-service)
Configure environment variables for Kafka within docker-compose.yml (e.g., KAFKA_ADVERTISED_LISTENERS, KAFKA_LISTENERS).
Add basic health checks for Kafka and Zookeeper in docker-compose.yml.
Create a Dockerfile for your application service.
Create an .env.example file documenting all environment variables used by your application.
#### Step 1.2: Define Event Schema
Define a UserEvent structure (JSON object) for messages to be published to Kafka.
{
  "eventId": "UUID_STRING",
  "userId": "STRING",
  "eventType": "LOGIN | LOGOUT | PRODUCT_VIEW",
  "timestamp": "ISO_8601_STRING",
  "payload": {}
}
eventId: A unique identifier for the event (e.g., UUID).
userId: Identifier for the user performing the action.
eventType: A string indicating the type of user activity.
timestamp: The time the event occurred, in ISO 8601 format.
payload: A generic JSON object for additional event-specific data.
#### Step 1.3: Implement Kafka Producer API
Create an API endpoint POST /events/generate.
This endpoint should accept a JSON body matching the UserEvent structure (excluding eventId and timestamp which can be generated by the service).
Generate a unique eventId and set the timestamp upon receiving the request.
Validate the incoming payload to ensure userId and eventType are present.
Publish the complete UserEvent to a Kafka topic named user-activity-events.
Return a 201 Created status with the published event's eventId on success, or appropriate error status codes (e.g., 400 Bad Request, 500 Internal Server Error) on failure.
#### Phase 2 (Days 3-4): Consumer Service and Idempotency
Objective: Implement the Kafka consumer to process events and ensure idempotency.

#### Step 2.1: Implement Kafka Consumer
Develop a Kafka consumer client that connects to the Kafka broker.
Subscribe the consumer to the user-activity-events topic.
Configure the consumer to be part of a user-activity-consumer-group.
Upon receiving a UserEvent message, the consumer should:
Log the eventId, userId, and eventType to standard output.
Store the event in an in-memory data structure (e.g., a simple array or list of processed events).
#### Step 2.2: Implement Idempotency
Modify the consumer's event processing logic to ensure that if the same UserEvent (identified by eventId) is received multiple times, it is processed and stored only once.
Use the eventId to check if an event has already been processed and stored in the in-memory data structure before adding it.
#### Phase 3 (Days 5-7): Query API, Testing, and Documentation
Objective: Expose an API to query processed events, add comprehensive tests, and finalize documentation.

#### Step 3.1: Implement Query API
Add a GET /events/processed API endpoint to your service.
This endpoint should retrieve and return all unique UserEvent objects currently stored in the in-memory data structure, as a JSON array.
#### Step 3.2: Testing
Unit Tests:
Write unit tests for the event publishing logic (e.g., generateEvent, publishToKafka functions).
Write unit tests for the event processing logic, specifically testing the idempotency mechanism.
Integration Tests:
Develop integration tests that spin up the entire docker-compose environment (Kafka, Zookeeper, your service).
These tests should:
Call POST /events/generate multiple times with various UserEvent payloads (including duplicates).
Wait for the consumer to process messages (consider a short delay or polling mechanism).
Call GET /events/processed and assert that the returned list contains only unique events and matches the expected count.
Verify that API endpoints return correct HTTP status codes and data structures.
#### Step 3.3: Documentation and Deployment
Update the README.md with:
Project title and description.
Detailed setup instructions (cloning, docker-compose up).
Instructions on how to run the producer API and verify consumed events.
Instructions on how to run unit and integration tests.
API documentation (endpoints, request/response examples).
Basic architectural overview.
Ensure docker-compose.yml, Dockerfile, .env.example, and your code are production-ready in terms of structure and comments.
Submission Instructions
Your submission must include a link to a GitHub repository (or similar). The repository must contain:

Application Code: All source code for your event-driven microservice.
README.md: A comprehensive README that acts as project documentation. It must include clear setup instructions, how to run the application, how to use the API endpoints, how to run tests, and an overview of your design decisions. Screenshots and a video demo (optional, but highly recommended for bonus points) demonstrating functionality.
docker-compose.yml: A fully functional Docker Compose file that orchestrates your application service, Apache Kafka, and Zookeeper, ensuring a one-command setup (docker-compose up).
Dockerfile(s): Dockerfile(s) for your application service(s).
.env.example: An example environment file detailing all required environment variables.
tests/: A directory containing all unit and integration tests.
ARCHITECTURE.md (Optional): A separate document detailing your architectural choices, including diagrams if applicable.
Ensure your docker-compose.yml successfully starts all services, and that your tests can be run via docker-compose exec commands.

Evaluation Overview
Your submission will be thoroughly evaluated based on several criteria to assess your technical proficiency and adherence to best practices. We will run automated tests against your deployed application to verify the functionality of API endpoints, the correct publication and consumption of Kafka events, and the implementation of idempotency. Automated code analysis will be performed to assess code quality, adherence to design patterns, error handling, and security considerations. Finally, expert reviewers will manually assess your project's overall architecture, the clarity and completeness of your documentation (especially the README.md), and your conceptual understanding as demonstrated in the submission questionnaire. Your ability to provide a consistent and well-documented solution that can be easily set up and tested will be paramount.

Common Mistakes To Avoid
Incomplete Docker Setup: Ensure docker-compose.yml orchestrates all services (Kafka, Zookeeper, app) and includes health checks.
Lack of Idempotency: Failing to ensure events are processed only once, leading to data inconsistencies.
Poor Error Handling: Crashing consumers/producers on transient errors or malformed messages.
Hardcoded Configuration: Storing sensitive or environment-specific configurations directly in code instead of using environment variables.
Insufficient Testing: Not providing both unit and integration tests to cover the core event flow.
Vague Documentation: A README.md that lacks clear setup instructions, API details, or explanations of design decisions.
Schema Evolution Oversight: While not a core requirement, ignoring how event schemas might change in a real-world scenario (even if just a thought in the questionnaire).
Blocking Operations in Consumer: Performing long-running synchronous operations within the consumer, impacting processing throughput.
FAQ
Q: Can I use a database instead of an in-memory store for processed events? A: While a database would be used in a production environment, for this task, an in-memory store is required to simplify scope and focus on Kafka and idempotency. However, feel free to mention database considerations in your ARCHITECTURE.md or questionnaire.

Q: Which programming language and framework should I use? A: You are free to choose any language and framework you are proficient in (e.g., Node.js with Express, Python with FastAPI/Flask, Java with Spring Boot, Go with Gin). The task is stack-agnostic.

Q: Do I need to implement a Dead Letter Queue (DLQ)? A: While a DLQ is excellent for production, for this task, robust error logging and graceful consumer shutdown on critical errors are sufficient. You can discuss DLQ in your questionnaire or ARCHITECTURE.md as an extension.

Q: How do I handle Kafka client configuration? A: All Kafka client configurations (broker URLs, topic names) should be externalized via environment variables and loaded by your application.

Q: What specific Kafka version should I use in docker-compose.yml? A: You can use any recent stable version, e.g., confluentinc/cp-kafka:7.4.0 and confluentinc/cp-zookeeper:7.4.0. Ensure they are compatible.

Q: How should I run the tests? A: Your README.md should specify the exact commands to run unit and integration tests, preferably using docker-compose exec to run tests within your service container.

Core Requirements
The application must be containerized using Docker, with a Dockerfile for the service.
A docker-compose.yml file must be provided to orchestrate the application service, Kafka broker, and Zookeeper.
The docker-compose.yml must include health checks for all services (application, Kafka, Zookeeper).
The application service must expose a RESTful API endpoint, POST /events/generate, that accepts a JSON payload representing an event.
Upon receiving a request to POST /events/generate, the service must publish a UserEvent to a Kafka topic named user-activity-events.
The UserEvent payload must include eventId (UUID), userId (string), eventType (e.g., 'LOGIN', 'LOGOUT', 'PRODUCT_VIEW'), timestamp (ISO string), and payload (arbitrary JSON object).
The service must implement a Kafka consumer that subscribes to the user-activity-events topic.
The consumer must be configured to be part of a user-activity-consumer-group.
The consumer must process each UserEvent received from the user-activity-events topic.
For each processed event, the consumer must log the eventId, userId, and eventType to standard output.
The consumer must store the processed event in a simple in-memory data structure (e.g., a List or Array) to track processed events.
The service must expose a GET /events/processed API endpoint that returns a list of all events successfully processed by the consumer.
The GET /events/processed endpoint response must be JSON formatted and include the eventId, userId, eventType, and timestamp for each event.
The consumer must handle duplicate messages by ensuring that an event with the same eventId is processed and stored only once (idempotency).
The service must have robust error handling for Kafka production failures (e.g., log errors, retry mechanisms for transient errors).
The service must have robust error handling for Kafka consumption failures (e.g., log errors, graceful handling of malformed messages without crashing the consumer).
All configurations (e.g., Kafka broker URL, topic names, consumer group IDs) must be managed via environment variables.
The project must include unit tests for the event publishing logic.
The project must include unit tests for the event consumption and idempotency logic.
The project must include integration tests that verify an event published via POST /events/generate is successfully consumed and retrievable via GET /events/processed.
A README.md file must provide clear instructions for setup, running the application, and running tests.
