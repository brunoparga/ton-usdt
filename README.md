# TON-USDT Exchange Rate Tracker

A full-stack TypeScript application for tracking TON/USDT cryptocurrency exchange rates.

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript + Vitest
- **Backend**: Express.js + TypeScript + Jest + Winston
- **Runtime**: Node.js 22 (LTS)
- **Package Manager**: npm 10
- **Containerization**: Docker + Docker Compose
- **Testing**: Vitest (frontend) + Jest (backend)

## Getting Started

### Prerequisites

- Node.js 22.x (LTS) or higher
- npm 10.x or higher
- Docker and Docker Compose (for containerized deployment)

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
