# Webz Sync - NestJS Webz.io Integration (News API)

This NestJS project integrates with Webz.io (formerly Webhose.io) to fetch news posts from their News API and store them in a PostgreSQL database. The fetched posts are saved as string values, and unit tests are provided for the functionality.

## Prerequisites

Before starting, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)  
  For containerizing and running the application.

- [Docker Compose](https://docs.docker.com/compose/install/)  
  To manage multi-container applications.

- [PostgreSQL](https://www.postgresql.org/)  
  Used for storing fetched posts and other database-related data.

> **Note:** If you are using Docker, you do not need to install Node.js, npm, or Yarn locally, as the application will run inside the Docker container.

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

### 3. Start the application

You can start the application using Docker Compose or run it locally with Node.js.

#### Option 1: Using Docker Compose (Recommended)

This option eliminates the need to install dependencies or Node.js locally. Simply run:

```bash
docker-compose up --build
```

#### Option 2: Running Locally (without Docker)

If you choose to run the application locally, follow these steps:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run migrations:
   ```bash
   npm run typeorm migration:run
   ```

3. Start the application:
   ```bash
   npm run start:dev
   ```

### 4. Run Unit Tests

To run the unit tests, use the following command:

```bash
npm run test
```
