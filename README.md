# Webz Sync - NestJS Webhose.io Integration (News API)

This NestJS project integrates with Webz.io (formerly Webhose.io) to fetch news posts from their News API and store them in a PostgreSQL database. The fetched posts are saved as string values, and unit tests are provided for the functionality.

## Prerequisites

Before starting, ensure you have the following installed:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (for local development if you want to avoid using Docker)
- [PostgreSQL](https://www.postgresql.org/) (for storing the fetched posts)

## Setup

### 1. Clone the repository

Start by cloning this project to your local machine:

```bash
git clone https://github.com/your-repo/webz-sync.git
cd webz-sync
```

### 2. Copy .env.example to .env
Open the .env file and update the following environment variables with your database credentials and Webz.io API key:
```bash
cp .env.example .env
```
### 4. Install dependencies
```bash
  npm install
```
### 5. Run migrations

```bash
  npm run typeorm migration:run
```
### 6. Start the application

You can start the application using Docker Compose or run it locally with Node.js.

#### Option 1: Using Docker Compose

```bash
docker-compose up --build
```

#### Option 2: Running Locally (without Docker)

```bash
npm run start:dev
```

### 7. Run Unit Tests
```bash
npm run test
```