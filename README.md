# TON-USDT Exchange Rate Tracker

A full-stack TypeScript application for tracking TON/USDT cryptocurrency exchange rates with a clean, modern interface.

## Purpose

This application provides a lightweight solution for monitoring TON/USDT cryptocurrency prices. Built with modern web technologies for fast development and deployment, featuring both frontend and backend components.

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
├── backend/
│   ├── src/
│   │   ├── index.ts                    # Server entry point
│   │   ├── app.ts                      # Express app factory
│   │   ├── types.ts                    # TypeScript type definitions
│   │   ├── config/
│   │   │   └── index.ts               # Configuration management
│   │   ├── controllers/
│   │   │   └── exchangeController.ts  # HTTP request handlers
│   │   ├── services/
│   │   │   └── exchangeService.ts     # Business logic
│   │   ├── middleware/
│   │   │   └── errorHandler.ts        # Error handling middleware
│   │   ├── middleware.ts              # Middleware exports
│   │   ├── routes.ts                  # Route definitions
│   │   ├── validation.ts              # Input validation utilities
│   │   ├── constants.ts               # Application constants
│   │   ├── logger.ts                  # Winston logging configuration
│   │   └── __tests__/                 # Backend test files
│   ├── Dockerfile                     # Backend Docker configuration
│   ├── package.json                   # Backend dependencies
│   ├── jest.config.js                 # Jest test configuration
│   └── tsconfig.json                  # TypeScript configuration
├── frontend/
│   ├── src/
│   │   ├── App.tsx                    # Main application component
│   │   ├── App.test.tsx               # Frontend test file
│   │   ├── App.css                    # Application styles
│   │   ├── main.tsx                   # Application entry point
│   │   └── test/                      # Test setup files
│   ├── public/                        # Static assets
│   ├── Dockerfile                     # Frontend Docker configuration
│   ├── nginx.conf                     # Nginx configuration
│   ├── package.json                   # Frontend dependencies
│   ├── vite.config.ts                 # Vite configuration
│   ├── vitest.config.ts               # Vitest test configuration
│   └── tsconfig.json                  # TypeScript configuration
├── docker-compose.yml                 # Docker Compose configuration
├── .gitignore                         # Git ignore rules
└── README.md                          # This file
```

## Features

### Frontend
- **Currency Exchange Interface**: TON/USDT pair selection with smart switching
- **Exchange Rate Display**: Real-time rate calculation from backend API
- **Loading States**: Proper loading indicators and error handling
- **Error Handling**: User-friendly error messages and feedback
- **Source Selection**: CoinGecko integration with extensible architecture
- **Time Selection**: Current rates with future historical data support
- **Modern React**: Built with React 18 and TypeScript
- **Fast Development**: Vite for instant hot module replacement
- **Clean UI**: Compact, professional interface
- **Comprehensive Testing**: Vitest with React Testing Library

### Backend
- **Structured Architecture**: Clean separation of concerns with controllers, services, and middleware
- **Exchange Rate API**: Get TON/USDT exchange rates with validation
- **Input Validation**: Comprehensive input sanitization and validation
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Logging**: Winston-based structured logging with request tracking
- **Rate Limiting**: Protection against abuse with configurable limits
- **CORS Enabled**: Frontend-backend communication
- **Health Check**: Server status endpoint
- **Configuration Management**: Environment-based configuration
- **Hard-coded Rates**: 123.45 TON/USDT for development
- **TypeScript**: Full type safety with dedicated type definitions
- **Comprehensive Testing**: Jest with Supertest for API testing

## Backend Architecture

The backend follows a clean, layered architecture pattern:

### **Controllers** (`/controllers/`)
- Handle HTTP requests and responses
- Validate input parameters
- Call appropriate services
- Return formatted responses

### **Services** (`/services/`)
- Contain business logic
- Process data and calculations
- Throw meaningful errors
- Independent of HTTP layer

### **Middleware** (`/middleware/`)
- Cross-cutting concerns (logging, rate limiting, error handling)
- Request/response processing
- Security and monitoring

### **Configuration** (`/config/`)
- Environment-based settings
- Centralized configuration management
- Easy deployment across environments

### **Types** (`/types.ts`)
- TypeScript interface definitions
- Shared type contracts
- Better IDE support and type safety

### **Validation** (`/validation.ts`)
- Input sanitization and validation
- Reusable validation utilities
- Consistent error messages

## API Endpoints

### GET /api/exchange-rate
Get exchange rate between two currencies.

**Parameters:**
- `from` (required): Source currency (TON, USDT) - must be uppercase
- `to` (required): Target currency (TON, USDT) - must be uppercase

**Validation:**
- Currency codes must be uppercase letters only
- Cannot request same currency for both from and to
- Missing parameters return 400 error
- Invalid currency format returns 400 error
- Unsupported currency pairs return 404 error

**Example:**
```bash
curl "http://localhost:3001/api/exchange-rate?from=TON&to=USDT"
```

**Success Response (200):**
```json
{
  "from": "TON",
  "to": "USDT", 
  "rate": 123.45,
  "source": "CoinGecko",
  "timestamp": "2025-09-02T09:30:07.326Z"
}
```

**Error Response (400/404):**
```json
{
  "error": "Invalid 'from' parameter: Currency must contain only uppercase letters"
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
- Frontend: React app with currency exchange interface and error handling
- Backend: Structured Express API with comprehensive validation and logging
- Integration: Frontend fetches data from backend API with proper error handling
- TypeScript: Both frontend and backend with full type safety
- **Testing**: Comprehensive unit tests (10 backend, 9 frontend tests)
- **Docker**: Full containerization with Docker Compose and health checks
- **Architecture**: Clean separation of concerns with controllers, services, and middleware
- **Security**: Rate limiting, input validation, and proper error handling
- **Logging**: Structured logging with Winston for debugging and monitoring
- **Production Ready**: Optimized Docker images with proper configuration management

🔄 **Next Steps**:
- Real CoinGecko API integration
- In-memory caching with Redis
- SQLite database for historical data
- CI/CD pipeline setup
- API documentation with Swagger/OpenAPI
- Performance monitoring and metrics

## License

Unlicensed. Copyright © 2025 Bruno Parga. All rights reserved.
