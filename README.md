# TON-USDT Exchange Rate Tracker

A full-stack TypeScript application for tracking TON/USDT cryptocurrency exchange rates.

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript + Vitest
- **Backend**: Express.js + TypeScript + Jest + Winston
- **Database**: PostgreSQL with Prisma ORM
- **Runtime**: Node.js 22 (LTS)
- **Package Manager**: npm 10
- **Containerization**: Docker + Docker Compose
- **Testing**: Vitest (frontend) + Jest (backend)

### Framework Choices

**Backend - Express.js**: Chosen for its simplicity and minimal overhead. Express provides a lightweight, unopinionated framework that allows for clean architecture without unnecessary complexity. It's well-suited for REST APIs and integrates seamlessly with TypeScript and our caching requirements.

**Frontend - React 18**: Selected for its component-based architecture, excellent TypeScript support, and robust ecosystem. React's hooks and functional components provide clean state management for our exchange rate display requirements.

**Database - PostgreSQL**: Chosen for its reliability, ACID compliance, and excellent TypeScript integration through Prisma ORM. PostgreSQL provides robust data integrity for financial data storage.

## Getting Started

### Prerequisites

- Node.js 22.x (LTS) or higher
- npm 10.x or higher
- Docker and Docker Compose (for containerized deployment)

### Database Setup

The application uses PostgreSQL as the primary database. Database configuration is handled automatically through Docker Compose, but you can also set up a local PostgreSQL instance if needed.

**Docker Database (Recommended):**
The `docker-compose.yml` file includes a PostgreSQL service that automatically:
- Creates a database named `ton_usdt`
- Sets up user `postgres` with password `password`
- Exposes the database on port `5432`
- Persists data in a Docker volume

**Manual Database Setup (Optional):**
If you prefer to run PostgreSQL locally:
```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt-get install postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE ton_usdt;
CREATE USER postgres WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE ton_usdt TO postgres;
\q
```

### Option 1: Docker Deployment (Recommended)

1. Build and start all services:
   ```bash
   docker-compose up --build
   ```

2. Access the application:
   - Frontend: `http://localhost`
   - Backend API: `http://localhost:3001`

3. Stop the services:
   ```bash
   docker-compose down
   ```

### Option 2: Local Development

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

4. Backend runs on `http://localhost:3001`

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## Testing

### Frontend Tests

Run frontend tests using Vitest:

```bash
cd frontend
npm test                   # Run tests once
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage report
npm run test:ui            # Run tests with UI interface
```

### Backend Tests

Run backend tests using Jest:

```bash
cd backend
npm test                  # Run tests once
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Run tests with coverage report
```

## Project Structure

```
ton-usdt/
├── backend/src/
│   ├── config/currency.ts             # Currency configuration
│   ├── providers/                     # Exchange rate providers
│   ├── services/                      # Business logic
│   ├── controllers/                   # HTTP handlers
│   └── middleware/                    # Cross-cutting concerns
├── frontend/src/
│   ├── config/currency.ts             # Frontend currency config
│   └── App.tsx                        # Main component
└── docker-compose.yml                 # Container orchestration
```

## Features

- **Real-time Exchange Rates**: TON/USDT rates via CoinGecko API
- **Clean Architecture**: Modular design with separated concerns
- **Type Safety**: Full TypeScript implementation
- **Input Validation**: Comprehensive request validation
- **Error Handling**: User-friendly error messages
- **Caching**: In-memory rate caching
- **Testing**: Comprehensive test coverage

## Architecture

- **Controllers**: HTTP request handling
- **Services**: Business logic and provider management  
- **Providers**: Exchange rate data sources (CoinGecko)
- **Config**: Centralized currency and application configuration
- **Middleware**: Error handling, logging, validation

## API

### GET /api/exchange-rate
Get TON/USDT exchange rate.

**Parameters:**
- `from`: TON or USDT
- `to`: TON or USDT  
- `provider`: coingecko (default)

**Example:**
```bash
curl "http://localhost:3001/api/exchange-rate?from=TON&to=USDT"
```

**Response:**
```json
{
  "from": "TON",
  "to": "USDT", 
  "rate": 2.45,
  "source": "CoinGecko",
  "timestamp": "2025-09-02T09:30:07.326Z"
}
```


## License

Unlicensed. Copyright © 2025 Bruno Parga. All rights reserved.
