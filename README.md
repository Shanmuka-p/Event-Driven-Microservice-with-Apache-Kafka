# Event-Driven Microservice with Apache Kafka

A robust microservice that acts as both a Kafka Producer and Consumer, demonstrating Event-Driven Architecture, Idempotency, and Docker orchestration.

## Features

- **Producer API:** REST endpoint to generate and publish events to Kafka.
- **Consumer Worker:** Listens to Kafka topics and processes events.
- **Idempotency:** Ensures duplicate events are not processed twice.
- **In-Memory Store:** Stores processed events for verification.
- **Dockerized:** Full environment (Kafka, Zookeeper, App) setup with one command.

## Prerequisites

- Docker & Docker Compose

## Setup & Run

1. **Start the services:**
   ```bash
   docker-compose up --build -d
   ```
