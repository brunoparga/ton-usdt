# TON-USDT Exchange Rate Tracker

A full-stack TypeScript application for tracking TON/USDT cryptocurrency exchange rates with a clean, modern interface.

## Purpose

This application provides a lightweight solution for monitoring TON/USDT cryptocurrency prices. Built with modern web technologies for fast development and deployment, featuring both frontend and backend components.

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript
- **Backend**: Express.js + TypeScript
- **Runtime**: Node.js 22 (LTS)
- **Package Manager**: npm 10

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
├── backend/
│   ├── src/
│   │   ├── index.ts         # Express server entry point
│   │   ├── app.ts           # Express app configuration
│   │   └── __tests__/       # Backend test files
│   ├── Dockerfile           # Backend Docker configuration
│   ├── package.json         # Backend dependencies
│   ├── jest.config.js       # Jest test configuration
│   └── tsconfig.json        # TypeScript configuration
├── frontend/
│   ├── src/
│   │   ├── App.tsx          # Main application component
│   │   ├── App.test.tsx     # Frontend test file
│   │   ├── App.css          # Application styles
│   │   ├── main.tsx         # Application entry point
│   │   └── test/            # Test setup files
│   ├── public/              # Static assets
│   ├── Dockerfile           # Frontend Docker configuration
│   ├── nginx.conf           # Nginx configuration
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.ts       # Vite configuration
│   ├── vitest.config.ts     # Vitest test configuration
│   └── tsconfig.json        # TypeScript configuration
├── docker-compose.yml       # Docker Compose configuration
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## Features

### Frontend
- **Currency Exchange Interface**: TON/USDT pair selection with smart switching
- **Exchange Rate Display**: Real-time rate calculation from backend API
- **Source Selection**: CoinGecko integration with extensible architecture
- **Time Selection**: Current rates with future historical data support
- **Modern React**: Built with React 18 and TypeScript
- **Fast Development**: Vite for instant hot module replacement
- **Clean UI**: Compact, professional interface

### Backend
- **Exchange Rate API**: Get TON/USDT exchange rates
- **CORS Enabled**: Frontend-backend communication
- **Health Check**: Server status endpoint
- **Hard-coded Rates**: 123.45 TON/USDT for development
- **TypeScript**: Full type safety

## API Endpoints

### GET /api/exchange-rate
Get exchange rate between two currencies.

**Parameters:**
- `from` (required): Source currency (TON, USDT)
- `to` (required): Target currency (TON, USDT)

**Example:**
```bash
curl "http://localhost:3001/api/exchange-rate?from=TON&to=USDT"
```

**Response:**
```json
{
  "from": "TON",
  "to": "USDT", 
  "rate": 123.45,
  "source": "CoinGecko",
  "timestamp": "2025-09-02T09:30:07.326Z"
}
```

### GET /api/health
Check server health status.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-09-02T09:31:19.021Z"
}
```

## Current Status

✅ **Full-Stack Complete**: 
- Frontend: React app with currency exchange interface
- Backend: Express API with exchange rate endpoints
- Integration: Frontend fetches data from backend API
- TypeScript: Both frontend and backend converted to TypeScript
- **Testing**: Comprehensive unit tests for both frontend and backend
- **Docker**: Full containerization with Docker Compose
- **Production Ready**: Optimized Docker images with health checks

🔄 **Next Steps**:
- Real CoinGecko API integration
- In-memory caching
- SQLite database for historical data
- CI/CD pipeline setup

## License

Unlicensed. Copyright © 2025 Bruno Parga. All rights reserved.
